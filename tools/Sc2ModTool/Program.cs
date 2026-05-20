using System.Text;
using System.Text.Json;
using System.Xml;

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
                    throw new InvalidOperationException($"Unknown command: {command}");
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
            var root = doc.DocumentElement ?? throw new InvalidOperationException($"Missing XML root: {file}");
            var found = root.SelectNodes($"//*[@id={XmlHelpers.ToXPathLiteral(id)}]");
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
            Console.WriteLine($"No matches for id={id}");
            return;
        }

        foreach (var match in matches.OrderBy(m => m.File, StringComparer.OrdinalIgnoreCase))
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
            ?? throw new InvalidOperationException($"Unable to parse patch file: {patchPath}");

        var runner = new PatchRunner(modRoot, whatIf);
        runner.Apply(patch);
    }

    private static IEnumerable<string> EnumerateCatalogFiles(string modRoot)
    {
        var gameDataRoot = Path.Combine(modRoot, "Base.SC2Data", "GameData");
        if (!Directory.Exists(gameDataRoot))
        {
            throw new DirectoryNotFoundException($"GameData directory not found: {gameDataRoot}");
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
                throw new InvalidOperationException($"Unknown option syntax: {arg}");
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
            throw new InvalidOperationException($"Missing required option --{key}");
        }

        return value;
    }

    private static bool IsHelp(string arg) =>
        arg.Equals("help", StringComparison.OrdinalIgnoreCase) ||
        arg.Equals("--help", StringComparison.OrdinalIgnoreCase) ||
        arg.Equals("-h", StringComparison.OrdinalIgnoreCase);

    private static void PrintHelp()
    {
        Console.WriteLine("Sc2ModTool");
        Console.WriteLine();
        Console.WriteLine("Usage:");
        Console.WriteLine("  find  --mod-root <path> --id <ObjectId>");
        Console.WriteLine("  apply --mod-root <path> --patch <patch.json> [--what-if]");
        Console.WriteLine();
        Console.WriteLine("Supported patch operations:");
        Console.WriteLine("  setXmlAttribute");
        Console.WriteLine("  appendObject");
        Console.WriteLine("  insertChild");
        Console.WriteLine("  setStringValue");
        Console.WriteLine("  replaceTextInFile");
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
    private readonly Dictionary<string, PlainTextFile> _textCache = new(StringComparer.OrdinalIgnoreCase);
    private readonly HashSet<string> _dirtyTextFiles = new(StringComparer.OrdinalIgnoreCase);

    public PatchRunner(string modRoot, bool whatIf)
    {
        _modRoot = modRoot;
        _whatIf = whatIf;
    }

    public void Apply(PatchDocument patch)
    {
        if (patch.Operations.Count == 0)
        {
            Console.WriteLine("Patch has no operations.");
            return;
        }

        Console.WriteLine($"Patch: {patch.Name ?? "(unnamed)"}");

        foreach (var operation in patch.Operations)
        {
            ApplyOperation(operation);
        }

        if (_whatIf)
        {
            Console.WriteLine("What-if mode, no files written.");
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
            case "appendObject":
                ApplyAppendObject(operation);
                break;
            case "insertChild":
                ApplyInsertChild(operation);
                break;
            case "setStringValue":
                ApplySetStringValue(operation);
                break;
            case "replaceTextInFile":
                ApplyReplaceTextInFile(operation);
                break;
            default:
                throw new InvalidOperationException($"Unsupported operation type: {operation.Type}");
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
            Console.WriteLine($"[skip] {relativeFile} :: {objectId} :: {xpath} @{attribute} already {value}");
            return;
        }

        XmlHelpers.SetAttribute(targetNode, attribute, value);
        _dirtyXmlFiles.Add(fullPath);
        Console.WriteLine($"[xml ] {relativeFile} :: {objectId} :: {xpath} @{attribute} = {value}");
    }

    private void ApplyAppendObject(PatchOperation operation)
    {
        var relativeFile = RequireValue(operation.File, nameof(operation.File), operation.Type);
        var xml = RequireValue(operation.Xml, nameof(operation.Xml), operation.Type);
        var fullPath = GetFullPath(relativeFile);
        var doc = GetXmlDocument(fullPath);
        var fragment = XmlHelpers.ImportFragmentElement(doc, xml);
        var fragmentId = fragment.GetAttribute("id");

        if (!string.IsNullOrWhiteSpace(fragmentId))
        {
            var existing = XmlHelpers.TryFindObjectNode(doc, fragmentId, fragment.Name);
            if (existing is not null)
            {
                if (!XmlHelpers.AreElementsEquivalent(existing, fragment))
                {
                    throw new InvalidOperationException($"Object id already exists with different content: {fragmentId}");
                }

                Console.WriteLine($"[skip] {relativeFile} :: object {fragmentId} already exists");
                return;
            }
        }
        else
        {
            var root = doc.DocumentElement ?? throw new InvalidOperationException($"Missing XML root: {relativeFile}");
            if (XmlHelpers.HasEquivalentDirectChild(root, fragment))
            {
                Console.WriteLine($"[skip] {relativeFile} :: equivalent root object already exists");
                return;
            }
        }

        if (!string.IsNullOrWhiteSpace(operation.AfterObjectId))
        {
            var anchor = XmlHelpers.FindObjectNode(doc, operation.AfterObjectId!, operation.AfterObjectType);
            XmlHelpers.InsertElementAfter(anchor, fragment);
            Console.WriteLine($"[xml+] {relativeFile} :: append object after {operation.AfterObjectId}");
        }
        else
        {
            var root = doc.DocumentElement ?? throw new InvalidOperationException($"Missing XML root: {relativeFile}");
            XmlHelpers.AppendElement(root, fragment);
            Console.WriteLine($"[xml+] {relativeFile} :: append object at root");
        }

        _dirtyXmlFiles.Add(fullPath);
    }

    private void ApplyInsertChild(PatchOperation operation)
    {
        var relativeFile = RequireValue(operation.File, nameof(operation.File), operation.Type);
        var objectId = RequireValue(operation.ObjectId, nameof(operation.ObjectId), operation.Type);
        var xml = RequireValue(operation.Xml, nameof(operation.Xml), operation.Type);
        var fullPath = GetFullPath(relativeFile);
        var doc = GetXmlDocument(fullPath);
        var objectNode = XmlHelpers.FindObjectNode(doc, objectId, operation.ObjectType);
        var fragment = XmlHelpers.ImportFragmentElement(doc, xml);

        if (!string.IsNullOrWhiteSpace(operation.UniqueXPath) && objectNode.SelectSingleNode(operation.UniqueXPath!) is not null)
        {
            Console.WriteLine($"[skip] {relativeFile} :: {objectId} :: unique child already exists");
            return;
        }

        if (XmlHelpers.HasEquivalentDirectChild(objectNode, fragment))
        {
            Console.WriteLine($"[skip] {relativeFile} :: {objectId} :: equivalent child already exists");
            return;
        }

        if (!string.IsNullOrWhiteSpace(operation.AfterXPath))
        {
            var anchor = objectNode.SelectSingleNode(operation.AfterXPath!);
            if (anchor is null)
            {
                throw new InvalidOperationException($"Anchor XPath not found for insertChild: {operation.AfterXPath}");
            }

            XmlHelpers.InsertElementAfter(anchor, fragment);
            Console.WriteLine($"[xml+] {relativeFile} :: {objectId} :: insert child after {operation.AfterXPath}");
        }
        else
        {
            XmlHelpers.AppendElement(objectNode, fragment);
            Console.WriteLine($"[xml+] {relativeFile} :: {objectId} :: append child");
        }

        _dirtyXmlFiles.Add(fullPath);
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
            Console.WriteLine($"[skip] {relativeFile} :: {key} already target value");
            return;
        }

        table.SetValue(key, value);
        _dirtyStringFiles.Add(fullPath);
        Console.WriteLine($"[text] {relativeFile} :: {key} = {value}");
    }

    private void ApplyReplaceTextInFile(PatchOperation operation)
    {
        var relativeFile = RequireValue(operation.File, nameof(operation.File), operation.Type);
        var find = RequireValue(operation.Find, nameof(operation.Find), operation.Type);
        var replace = RequireValue(operation.Replace, nameof(operation.Replace), operation.Type);
        var fullPath = GetFullPath(relativeFile);
        var textFile = GetTextFile(fullPath);
        var normalizedContent = NormalizeLineEndings(textFile.Content);
        var normalizedFind = NormalizeLineEndings(find);
        var normalizedReplace = NormalizeLineEndings(replace);

        if (!textFile.Content.Contains(find, StringComparison.Ordinal))
        {
            if (textFile.Content.Contains(replace, StringComparison.Ordinal) ||
                normalizedContent.Contains(normalizedReplace, StringComparison.Ordinal))
            {
                Console.WriteLine($"[skip] {relativeFile} :: replacement already applied");
                return;
            }

            throw new InvalidOperationException($"Find text not found in {relativeFile}");
        }

        var count = CountOccurrences(textFile.Content, find);
        if (operation.ExpectedCount.HasValue && count != operation.ExpectedCount.Value)
        {
            throw new InvalidOperationException(
                $"Expected {operation.ExpectedCount.Value} occurrences in {relativeFile}, found {count}");
        }

        textFile.Content = textFile.Content.Replace(find, replace, StringComparison.Ordinal);
        _dirtyTextFiles.Add(fullPath);
        Console.WriteLine($"[text] {relativeFile} :: replaced {count} occurrence(s)");
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

        foreach (var file in _dirtyTextFiles.OrderBy(x => x, StringComparer.OrdinalIgnoreCase))
        {
            _textCache[file].Save();
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

    private PlainTextFile GetTextFile(string fullPath)
    {
        if (!_textCache.TryGetValue(fullPath, out var textFile))
        {
            textFile = PlainTextFile.Load(fullPath);
            _textCache[fullPath] = textFile;
        }

        return textFile;
    }

    private string GetFullPath(string relativeFile)
    {
        var fullPath = Path.GetFullPath(Path.Combine(_modRoot, relativeFile));
        if (!File.Exists(fullPath))
        {
            throw new FileNotFoundException($"Target file does not exist: {relativeFile}", fullPath);
        }

        return fullPath;
    }

    private static string RequireValue(string? value, string fieldName, string operationType)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException($"{operationType} is missing required field: {fieldName}");
        }

        return value;
    }

    private static int CountOccurrences(string text, string value)
    {
        var count = 0;
        var startIndex = 0;

        while (true)
        {
            var index = text.IndexOf(value, startIndex, StringComparison.Ordinal);
            if (index < 0)
            {
                return count;
            }

            count++;
            startIndex = index + value.Length;
        }
    }

    private static string NormalizeLineEndings(string text)
    {
        return text.Replace("\r\n", "\n", StringComparison.Ordinal)
            .Replace("\r", "\n", StringComparison.Ordinal);
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
        var root = doc.DocumentElement ?? throw new InvalidOperationException("Missing XML root");
        var xpath = string.IsNullOrWhiteSpace(objectType)
            ? $"//*[@id={ToXPathLiteral(objectId)}]"
            : $"//{objectType}[@id={ToXPathLiteral(objectId)}]";

        var nodes = root.SelectNodes(xpath);
        if (nodes is null || nodes.Count == 0)
        {
            throw new InvalidOperationException($"Object not found: {objectId}");
        }

        if (nodes.Count > 1)
        {
            throw new InvalidOperationException($"Multiple objects matched id={objectId}. Provide objectType.");
        }

        return nodes[0]!;
    }

    public static XmlElement? TryFindObjectNode(XmlDocument doc, string objectId, string? objectType)
    {
        var root = doc.DocumentElement ?? throw new InvalidOperationException("Missing XML root");
        var xpath = string.IsNullOrWhiteSpace(objectType)
            ? $"//*[@id={ToXPathLiteral(objectId)}]"
            : $"//{objectType}[@id={ToXPathLiteral(objectId)}]";

        return root.SelectSingleNode(xpath) as XmlElement;
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
            throw new InvalidOperationException($"XPath not found and createPath is false: {xpath}");
        }

        return CreateSimplePath(objectNode, xpath);
    }

    public static void SetAttribute(XmlNode node, string attribute, string value)
    {
        if (node is not XmlElement element)
        {
            throw new InvalidOperationException("Target node is not an element");
        }

        element.SetAttribute(attribute, value);
    }

    public static XmlElement ImportFragmentElement(XmlDocument ownerDocument, string xml)
    {
        var fragmentDoc = new XmlDocument
        {
            PreserveWhitespace = true
        };

        fragmentDoc.LoadXml($"<Root>{xml}</Root>");
        var elements = fragmentDoc.DocumentElement?
            .ChildNodes
            .OfType<XmlElement>()
            .ToList() ?? [];

        if (elements.Count != 1)
        {
            throw new InvalidOperationException("XML fragment must contain exactly one root element");
        }

        return (XmlElement)ownerDocument.ImportNode(elements[0], true);
    }

    public static void AppendElement(XmlNode parent, XmlElement newElement)
    {
        var doc = parent.OwnerDocument ?? parent as XmlDocument ?? throw new InvalidOperationException("Missing owner document");
        var closingWhitespace = parent.LastChild as XmlWhitespace;
        var childIndent = DetectChildIndent(parent);
        var closingIndent = DetectClosingIndent(parent);

        if (closingWhitespace is not null)
        {
            parent.InsertBefore(doc.CreateWhitespace(childIndent), closingWhitespace);
            parent.InsertBefore(newElement, closingWhitespace);
            return;
        }

        parent.AppendChild(doc.CreateWhitespace(childIndent));
        parent.AppendChild(newElement);
        parent.AppendChild(doc.CreateWhitespace(closingIndent));
    }

    public static void InsertElementAfter(XmlNode anchor, XmlElement newElement)
    {
        var parent = anchor.ParentNode ?? throw new InvalidOperationException("Anchor node has no parent");
        var doc = anchor.OwnerDocument ?? throw new InvalidOperationException("Anchor node has no owner document");
        var nextSibling = anchor.NextSibling;
        var childIndent = DetectChildIndent(parent);

        if (nextSibling is null)
        {
            AppendElement(parent, newElement);
            return;
        }

        parent.InsertBefore(doc.CreateWhitespace(childIndent), nextSibling);
        parent.InsertBefore(newElement, nextSibling);
    }

    public static bool HasEquivalentDirectChild(XmlNode parent, XmlElement candidate)
    {
        foreach (var child in parent.ChildNodes.OfType<XmlElement>())
        {
            if (AreElementsEquivalent(child, candidate))
            {
                return true;
            }
        }

        return false;
    }

    public static bool AreElementsEquivalent(XmlElement left, XmlElement right)
    {
        if (!left.Name.Equals(right.Name, StringComparison.Ordinal))
        {
            return false;
        }

        if (left.Attributes.Count != right.Attributes.Count)
        {
            return false;
        }

        foreach (XmlAttribute leftAttribute in left.Attributes)
        {
            var rightAttribute = right.Attributes[leftAttribute.Name];
            if (rightAttribute is null || !rightAttribute.Value.Equals(leftAttribute.Value, StringComparison.Ordinal))
            {
                return false;
            }
        }

        var leftChildren = GetSignificantChildren(left).ToList();
        var rightChildren = GetSignificantChildren(right).ToList();

        if (leftChildren.Count != rightChildren.Count)
        {
            return false;
        }

        for (var i = 0; i < leftChildren.Count; i++)
        {
            var leftChild = leftChildren[i];
            var rightChild = rightChildren[i];

            if (leftChild.NodeType != rightChild.NodeType)
            {
                return false;
            }

            if (leftChild is XmlElement leftElement && rightChild is XmlElement rightElement)
            {
                if (!AreElementsEquivalent(leftElement, rightElement))
                {
                    return false;
                }

                continue;
            }

            if (!leftChild.Value!.Equals(rightChild.Value, StringComparison.Ordinal))
            {
                return false;
            }
        }

        return true;
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

    public static string ToXPathLiteral(string value)
    {
        if (!value.Contains('\''))
        {
            return $"'{value}'";
        }

        if (!value.Contains('"'))
        {
            return $"\"{value}\"";
        }

        throw new InvalidOperationException("XPath literal cannot contain both quote types");
    }

    private static XmlNode CreateSimplePath(XmlNode objectNode, string xpath)
    {
        if (!xpath.StartsWith("./", StringComparison.Ordinal))
        {
            throw new InvalidOperationException($"createPath currently supports only ./A/B paths: {xpath}");
        }

        var segments = xpath[2..]
            .Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        if (segments.Length == 0 || segments.Any(s => s.Contains('[') || s.Contains('@')))
        {
            throw new InvalidOperationException($"createPath does not support predicate paths: {xpath}");
        }

        var doc = objectNode.OwnerDocument ?? throw new InvalidOperationException("Node has no owner document");
        var current = objectNode;

        foreach (var segment in segments)
        {
            var next = current.SelectSingleNode(segment);
            if (next is null)
            {
                if (current is not XmlElement)
                {
                    throw new InvalidOperationException("Cannot create child under a non-element node");
                }

                var child = doc.CreateElement(segment);
                AppendElement(current, child);
                next = child;
            }

            current = next;
        }

        return current;
    }

    private static IEnumerable<XmlNode> GetSignificantChildren(XmlElement element)
    {
        foreach (XmlNode child in element.ChildNodes)
        {
            if (child is XmlWhitespace)
            {
                continue;
            }

            if (child is XmlText textNode && string.IsNullOrWhiteSpace(textNode.Value))
            {
                continue;
            }

            yield return child;
        }
    }

    private static string DetectChildIndent(XmlNode parent)
    {
        foreach (var child in parent.ChildNodes.OfType<XmlElement>())
        {
            if (child.PreviousSibling is XmlWhitespace ws)
            {
                return ws.Value ?? (Environment.NewLine + "    ");
            }
        }

        return DetectOwnIndent(parent) + "    ";
    }

    private static string DetectClosingIndent(XmlNode parent)
    {
        if (parent.LastChild is XmlWhitespace ws)
        {
            return ws.Value ?? Environment.NewLine;
        }

        return DetectOwnIndent(parent);
    }

    private static string DetectOwnIndent(XmlNode node)
    {
        if (node.PreviousSibling is XmlWhitespace ws)
        {
            return ws.Value ?? Environment.NewLine;
        }

        if (node.ParentNode is XmlNode parent && parent.PreviousSibling is XmlWhitespace parentWs)
        {
            return (parentWs.Value ?? Environment.NewLine) + "    ";
        }

        return Environment.NewLine;
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

internal sealed class PlainTextFile
{
    private readonly string _path;

    private PlainTextFile(string path, string content)
    {
        _path = path;
        Content = content;
    }

    public string Content { get; set; }

    public static PlainTextFile Load(string path)
    {
        return new PlainTextFile(path, File.ReadAllText(path, Encoding.UTF8));
    }

    public void Save()
    {
        File.WriteAllText(_path, Content, new UTF8Encoding(false));
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
    public string? Xml { get; init; }
    public string? AfterObjectId { get; init; }
    public string? AfterObjectType { get; init; }
    public string? AfterXPath { get; init; }
    public string? UniqueXPath { get; init; }
    public string? Find { get; init; }
    public string? Replace { get; init; }
    public int? ExpectedCount { get; init; }
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
