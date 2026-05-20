using System.Text;
using System.Text.Json;
using System.Xml;
using System.Xml.XPath;

return await Cli.RunAsync(args);

internal static class Cli
{
    public static async Task<int> RunAsync(string[] args)
    {
        try
        {
            if (args.Length == 0 || IsHelp(args[0]))
            {
                PrintHelp();
                return 0;
            }

            var command = args[0].ToLowerInvariant();
            var options = ParseOptions(args.Skip(1).ToArray());

            switch (command)
            {
                case "find":
                    RunFind(options);
                    return 0;
                case "apply":
                    await RunApplyAsync(options);
                    return 0;
                default:
                    throw new InvalidOperationException($"未知命令: {command}");
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex.Message);
            return 1;
        }
    }

    private static void RunFind(Dictionary<string, string> options)
    {
        var modRoot = RequireOption(options, "mod-root");
        var id = RequireOption(options, "id");
        var files = EnumerateCatalogFiles(modRoot).ToList();
        var matches = new List<ObjectMatch>();

        foreach (var file in files)
        {
            var doc = XmlHelpers.Load(file);
            var root = doc.DocumentElement ?? throw new InvalidOperationException($"XML 缺少根节点: {file}");
            var found = root.SelectNodes($"//*[@id='{EscapeForXPath(id)}']");
            if (found is null)
            {
                continue;
            }

            foreach (XmlNode node in found)
            {
                matches.Add(new ObjectMatch(
                    Path.GetRelativePath(modRoot, file),
                    node.Name,
                    node.Attributes?["id"]?.Value ?? string.Empty));
            }
        }

        if (matches.Count == 0)
        {
            Console.WriteLine($"未找到 id={id}");
            return;
        }

        foreach (var match in matches.OrderBy(m => m.File))
        {
            Console.WriteLine($"{match.File}\t{match.NodeName}\t{match.Id}");
        }
    }

    private static async Task RunApplyAsync(Dictionary<string, string> options)
    {
        var modRoot = RequireOption(options, "mod-root");
        var patchPath = RequireOption(options, "patch");
        var whatIf = options.ContainsKey("what-if");

        var patchJson = await File.ReadAllTextAsync(patchPath, Encoding.UTF8);
        var patch = JsonSerializer.Deserialize<PatchDocument>(patchJson, JsonOptions.Default)
            ?? throw new InvalidOperationException($"无法读取 patch: {patchPath}");

        var runner = new PatchRunner(modRoot, whatIf);
        runner.Apply(patch);
    }

    private static IEnumerable<string> EnumerateCatalogFiles(string modRoot)
    {
        var gameDataRoot = Path.Combine(modRoot, "Base.SC2Data", "GameData");
        if (!Directory.Exists(gameDataRoot))
        {
            throw new DirectoryNotFoundException($"不存在 GameData 目录: {gameDataRoot}");
        }

        return Directory.EnumerateFiles(gameDataRoot, "*.xml", SearchOption.TopDirectoryOnly);
    }

    private static Dictionary<string, string> ParseOptions(string[] args)
    {
        var result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        for (var i = 0; i < args.Length; i++)
        {
            var arg = args[i];
            if (!arg.StartsWith("--", StringComparison.Ordinal))
            {
                throw new InvalidOperationException($"无法识别参数: {arg}");
            }

            var key = arg[2..];
            if (i == args.Length - 1 || args[i + 1].StartsWith("--", StringComparison.Ordinal))
            {
                result[key] = "true";
                continue;
            }

            result[key] = args[i + 1];
            i++;
        }

        return result;
    }

    private static string RequireOption(Dictionary<string, string> options, string key)
    {
        if (!options.TryGetValue(key, out var value) || string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException($"缺少参数 --{key}");
        }

        return value;
    }

    private static bool IsHelp(string arg) =>
        arg.Equals("help", StringComparison.OrdinalIgnoreCase) ||
        arg.Equals("--help", StringComparison.OrdinalIgnoreCase) ||
        arg.Equals("-h", StringComparison.OrdinalIgnoreCase);

    private static string EscapeForXPath(string value) => value.Replace("'", "&apos;");

    private static void PrintHelp()
    {
        Console.WriteLine("Sc2ModTool");
        Console.WriteLine();
        Console.WriteLine("用法:");
        Console.WriteLine("  find  --mod-root <path> --id <ObjectId>");
        Console.WriteLine("  apply --mod-root <path> --patch <patch.json> [--what-if]");
        Console.WriteLine();
        Console.WriteLine("patch 支持的操作:");
        Console.WriteLine("  setXmlAttribute");
        Console.WriteLine("  setStringValue");
    }
}

internal sealed class PatchRunner
{
    private readonly string _modRoot;
    private readonly bool _whatIf;
    private readonly Dictionary<string, XmlDocument> _xmlCache = new(StringComparer.OrdinalIgnoreCase);
    private readonly HashSet<string> _dirtyXmlFiles = new(StringComparer.OrdinalIgnoreCase);
    private readonly Dictionary<string, StringTableFile> _stringCache = new(StringComparer.OrdinalIgnoreCase);
    private readonly HashSet<string> _dirtyStringFiles = new(StringComparer.OrdinalIgnoreCase);

    public PatchRunner(string modRoot, bool whatIf)
    {
        _modRoot = modRoot;
        _whatIf = whatIf;
    }

    public void Apply(PatchDocument patch)
    {
        if (patch.Operations.Count == 0)
        {
            Console.WriteLine("patch 没有操作，跳过。");
            return;
        }

        Console.WriteLine($"Patch: {patch.Name ?? "(unnamed)"}");

        foreach (var operation in patch.Operations)
        {
            ApplyOperation(operation);
        }

        if (_whatIf)
        {
            Console.WriteLine("what-if 模式，不写回文件。");
            return;
        }

        SaveAll();
    }

    private void ApplyOperation(PatchOperation operation)
    {
        switch (operation.Type)
        {
            case "setXmlAttribute":
                ApplySetXmlAttribute(operation);
                break;
            case "setStringValue":
                ApplySetStringValue(operation);
                break;
            default:
                throw new InvalidOperationException($"不支持的操作类型: {operation.Type}");
        }
    }

    private void ApplySetXmlAttribute(PatchOperation operation)
    {
        var relativeFile = RequireValue(operation.File, nameof(operation.File), operation.Type);
        var objectId = RequireValue(operation.ObjectId, nameof(operation.ObjectId), operation.Type);
        var attribute = RequireValue(operation.Attribute, nameof(operation.Attribute), operation.Type);
        var value = RequireValue(operation.Value, nameof(operation.Value), operation.Type);
        var xpath = string.IsNullOrWhiteSpace(operation.XPath) ? "." : operation.XPath!;
        var fullPath = GetFullPath(relativeFile);
        var doc = GetXmlDocument(fullPath);
        var objectNode = XmlHelpers.FindObjectNode(doc, objectId, operation.ObjectType);
        var targetNode = XmlHelpers.SelectOrCreateNode(objectNode, xpath, operation.CreatePath);
        var currentValue = targetNode.Attributes?[attribute]?.Value;

        if (currentValue == value)
        {
            Console.WriteLine($"[skip] {relativeFile} :: {objectId} :: {xpath} @{attribute} 已经是 {value}");
            return;
        }

        XmlHelpers.SetAttribute(targetNode, attribute, value);
        _dirtyXmlFiles.Add(fullPath);
        Console.WriteLine($"[xml ] {relativeFile} :: {objectId} :: {xpath} @{attribute} = {value}");
    }

    private void ApplySetStringValue(PatchOperation operation)
    {
        var relativeFile = RequireValue(operation.File, nameof(operation.File), operation.Type);
        var key = RequireValue(operation.Key, nameof(operation.Key), operation.Type);
        var value = RequireValue(operation.Value, nameof(operation.Value), operation.Type);
        var fullPath = GetFullPath(relativeFile);
        var table = GetStringTable(fullPath);

        if (table.TryGetValue(key, out var currentValue) && currentValue == value)
        {
            Console.WriteLine($"[skip] {relativeFile} :: {key} 已经是目标值");
            return;
        }

        table.SetValue(key, value);
        _dirtyStringFiles.Add(fullPath);
        Console.WriteLine($"[text] {relativeFile} :: {key} = {value}");
    }

    private void SaveAll()
    {
        foreach (var file in _dirtyXmlFiles.OrderBy(x => x, StringComparer.OrdinalIgnoreCase))
        {
            XmlHelpers.Save(_xmlCache[file], file);
            Console.WriteLine($"[save] {Path.GetRelativePath(_modRoot, file)}");
        }

        foreach (var file in _dirtyStringFiles.OrderBy(x => x, StringComparer.OrdinalIgnoreCase))
        {
            _stringCache[file].Save();
            Console.WriteLine($"[save] {Path.GetRelativePath(_modRoot, file)}");
        }
    }

    private XmlDocument GetXmlDocument(string fullPath)
    {
        if (!_xmlCache.TryGetValue(fullPath, out var doc))
        {
            doc = XmlHelpers.Load(fullPath);
            _xmlCache[fullPath] = doc;
        }

        return doc;
    }

    private StringTableFile GetStringTable(string fullPath)
    {
        if (!_stringCache.TryGetValue(fullPath, out var table))
        {
            table = StringTableFile.Load(fullPath);
            _stringCache[fullPath] = table;
        }

        return table;
    }

    private string GetFullPath(string relativeFile)
    {
        var fullPath = Path.GetFullPath(Path.Combine(_modRoot, relativeFile));
        if (!File.Exists(fullPath))
        {
            throw new FileNotFoundException($"目标文件不存在: {relativeFile}", fullPath);
        }

        return fullPath;
    }

    private static string RequireValue(string? value, string fieldName, string operationType)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException($"{operationType} 缺少字段 {fieldName}");
        }

        return value;
    }
}

internal static class XmlHelpers
{
    public static XmlDocument Load(string path)
    {
        var doc = new XmlDocument
        {
            PreserveWhitespace = true
        };

        using var stream = File.OpenRead(path);
        using var reader = XmlReader.Create(stream, new XmlReaderSettings
        {
            IgnoreWhitespace = false
        });
        doc.Load(reader);
        return doc;
    }

    public static XmlNode FindObjectNode(XmlDocument doc, string objectId, string? objectType)
    {
        var root = doc.DocumentElement ?? throw new InvalidOperationException("XML 缺少根节点");
        var xpath = string.IsNullOrWhiteSpace(objectType)
            ? $"//*[@id='{EscapeXPathLiteral(objectId)}']"
            : $"//{objectType}[@id='{EscapeXPathLiteral(objectId)}']";

        var nodes = root.SelectNodes(xpath);
        if (nodes is null || nodes.Count == 0)
        {
            throw new InvalidOperationException($"未找到对象 id={objectId}");
        }
        if (nodes.Count > 1)
        {
            throw new InvalidOperationException($"对象 id={objectId} 命中多个节点，请补充 objectType");
        }

        return nodes[0]!;
    }

    public static XmlNode SelectOrCreateNode(XmlNode objectNode, string xpath, bool createPath)
    {
        if (xpath == ".")
        {
            return objectNode;
        }

        var node = objectNode.SelectSingleNode(xpath);
        if (node is not null)
        {
            return node;
        }

        if (!createPath)
        {
            throw new InvalidOperationException($"XPath 未命中且未开启 createPath: {xpath}");
        }

        return CreateSimplePath(objectNode, xpath);
    }

    public static void SetAttribute(XmlNode node, string attribute, string value)
    {
        if (node is not XmlElement element)
        {
            throw new InvalidOperationException("目标节点不是元素节点，无法设置属性");
        }

        element.SetAttribute(attribute, value);
    }

    public static void Save(XmlDocument doc, string path)
    {
        using var writer = XmlWriter.Create(path, new XmlWriterSettings
        {
            Encoding = new UTF8Encoding(false),
            Indent = false,
            NewLineHandling = NewLineHandling.None
        });
        doc.Save(writer);
    }

    private static XmlNode CreateSimplePath(XmlNode objectNode, string xpath)
    {
        if (!xpath.StartsWith("./", StringComparison.Ordinal))
        {
            throw new InvalidOperationException($"createPath 目前只支持 ./A/B 这种简单路径: {xpath}");
        }

        var segments = xpath[2..]
            .Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        if (segments.Length == 0 || segments.Any(s => s.Contains('[') || s.Contains('@')))
        {
            throw new InvalidOperationException($"createPath 目前不支持谓词路径: {xpath}");
        }

        var doc = objectNode.OwnerDocument ?? throw new InvalidOperationException("节点不属于任何文档");
        var current = objectNode;

        foreach (var segment in segments)
        {
            var next = current.SelectSingleNode(segment);
            if (next is null)
            {
                if (current is not XmlElement currentElement)
                {
                    throw new InvalidOperationException("无法在非元素节点下创建子节点");
                }

                var indent = DetectIndentBefore(currentElement);
                var child = doc.CreateElement(segment);
                current.AppendChild(doc.CreateTextNode(indent.ChildIndent));
                current.AppendChild(child);
                current.AppendChild(doc.CreateTextNode(indent.ClosingIndent));
                next = child;
            }

            current = next;
        }

        return current;
    }

    private static (string ChildIndent, string ClosingIndent) DetectIndentBefore(XmlElement element)
    {
        var currentIndent = element.PreviousSibling is XmlWhitespace ws
            ? ws.Value
            : Environment.NewLine;

        var deeperIndent = currentIndent + "    ";
        return (deeperIndent, currentIndent ?? Environment.NewLine);
    }

    private static string EscapeXPathLiteral(string value)
    {
        if (!value.Contains('\''))
        {
            return value;
        }

        if (!value.Contains('"'))
        {
            return $"\"{value}\"";
        }

        throw new InvalidOperationException("当前实现暂不支持同时包含单双引号的 XPath 字面量");
    }
}

internal sealed class StringTableFile
{
    private readonly string _path;
    private readonly List<string> _lines;
    private readonly Dictionary<string, int> _indexByKey;

    private StringTableFile(string path, List<string> lines, Dictionary<string, int> indexByKey)
    {
        _path = path;
        _lines = lines;
        _indexByKey = indexByKey;
    }

    public static StringTableFile Load(string path)
    {
        var lines = File.ReadAllLines(path, Encoding.UTF8).ToList();
        var indexByKey = new Dictionary<string, int>(StringComparer.Ordinal);

        for (var i = 0; i < lines.Count; i++)
        {
            var line = lines[i];
            if (string.IsNullOrWhiteSpace(line) || line.StartsWith('#'))
            {
                continue;
            }

            var splitIndex = line.IndexOf('=');
            if (splitIndex <= 0)
            {
                continue;
            }

            var key = line[..splitIndex];
            if (!indexByKey.ContainsKey(key))
            {
                indexByKey[key] = i;
            }
        }

        return new StringTableFile(path, lines, indexByKey);
    }

    public bool TryGetValue(string key, out string value)
    {
        if (_indexByKey.TryGetValue(key, out var lineIndex))
        {
            var line = _lines[lineIndex];
            value = line[(line.IndexOf('=') + 1)..];
            return true;
        }

        value = string.Empty;
        return false;
    }

    public void SetValue(string key, string value)
    {
        var newLine = $"{key}={value}";
        if (_indexByKey.TryGetValue(key, out var lineIndex))
        {
            _lines[lineIndex] = newLine;
            return;
        }

        _indexByKey[key] = _lines.Count;
        _lines.Add(newLine);
    }

    public void Save()
    {
        File.WriteAllText(_path, string.Join("\r\n", _lines) + "\r\n", new UTF8Encoding(false));
    }
}

internal sealed record ObjectMatch(string File, string NodeName, string Id);

internal sealed class PatchDocument
{
    public string? Name { get; init; }
    public List<PatchOperation> Operations { get; init; } = [];
}

internal sealed class PatchOperation
{
    public string Type { get; init; } = string.Empty;
    public string? File { get; init; }
    public string? ObjectId { get; init; }
    public string? ObjectType { get; init; }
    public string? XPath { get; init; }
    public string? Attribute { get; init; }
    public string? Value { get; init; }
    public string? Key { get; init; }
    public bool CreatePath { get; init; }
}

internal static class JsonOptions
{
    public static readonly JsonSerializerOptions Default = new()
    {
        PropertyNameCaseInsensitive = true,
        ReadCommentHandling = JsonCommentHandling.Skip,
        AllowTrailingCommas = true
    };
}
