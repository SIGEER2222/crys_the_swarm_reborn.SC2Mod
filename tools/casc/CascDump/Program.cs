using System.Text;
using CascLib.NET;

static int Usage()
{
    Console.Error.WriteLine("""
        CascDump usage:
          dotnet run --project tools/casc/CascDump -- list <storage> [limit]
          dotnet run --project tools/casc/CascDump -- search <storage> <out.tsv> <keyword> [keyword...]
          dotnet run --project tools/casc/CascDump -- extract <storage> <out-dir> <file-list.txt>
        """);
    return 2;
}

static bool LooksTextFile(string name)
{
    string n = name.ToLowerInvariant();
    return n.EndsWith(".xml", StringComparison.Ordinal) ||
        n.EndsWith(".galaxy", StringComparison.Ordinal) ||
        n.EndsWith(".txt", StringComparison.Ordinal) ||
        n.EndsWith(".sc2locale", StringComparison.Ordinal) ||
        n.EndsWith(".sc2components", StringComparison.Ordinal) ||
        n.EndsWith(".json", StringComparison.Ordinal);
}

static string SafePath(string fileName)
{
    foreach (char c in Path.GetInvalidPathChars())
    {
        fileName = fileName.Replace(c, '_');
    }

    return fileName
        .Replace(':', '_')
        .Replace('/', Path.DirectorySeparatorChar)
        .Replace('\\', Path.DirectorySeparatorChar);
}

static bool ContainsAny(string haystack, IReadOnlyList<string> needles)
{
    foreach (string needle in needles)
    {
        if (haystack.Contains(needle, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
    }

    return false;
}

if (args.Length < 2)
{
    return Usage();
}

string command = args[0].ToLowerInvariant();
string storagePath = args[1];

if (!Directory.Exists(storagePath))
{
    Console.Error.WriteLine($"Storage path does not exist: {storagePath}");
    return 1;
}

try
{
    using var storage = new CascStorage(storagePath);
    Console.Error.WriteLine($"Opened {storagePath}");
    Console.Error.WriteLine($"Product={storage.Product.CodeName} Build={storage.Product.BuildNumber} Local={storage.LocalFileCount} Total={storage.TotalFileCount}");

    if (command == "list")
    {
        int limit = args.Length >= 3 && int.TryParse(args[2], out int parsedLimit) ? parsedLimit : 200;
        int count = 0;

        foreach (var file in storage)
        {
            Console.WriteLine($"{file.FileName}\t{file.FileSize}\t{file.NameType}\t{file.IsFileAvailable}");
            count++;
            if (count >= limit)
            {
                break;
            }
        }

        return 0;
    }

    if (command == "search")
    {
        if (args.Length < 4)
        {
            return Usage();
        }

        string reportPath = args[2];
        string[] keywords = args.Skip(3).ToArray();
        Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(reportPath))!);

        int scanned = 0;
        int matched = 0;

        using var report = new StreamWriter(reportPath, false, new UTF8Encoding(false));
        report.WriteLine("File\tSize\tMatchedBy\tSnippet");

        foreach (var file in storage)
        {
            string fileName = file.FileName ?? "";
            if (!file.IsFileAvailable || !LooksTextFile(fileName))
            {
                continue;
            }

            scanned++;
            string matchedBy = "";
            string snippet = "";

            if (ContainsAny(fileName, keywords))
            {
                matchedBy = "path";
            }
            else if (file.FileSize <= 16 * 1024 * 1024)
            {
                try
                {
                    using var stream = storage.OpenFile(fileName);
                    using var reader = new StreamReader(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true, leaveOpen: false);
                    string content = reader.ReadToEnd();
                    foreach (string keyword in keywords)
                    {
                        int index = content.IndexOf(keyword, StringComparison.OrdinalIgnoreCase);
                        if (index >= 0)
                        {
                            matchedBy = keyword;
                            int start = Math.Max(0, index - 80);
                            int length = Math.Min(content.Length - start, keyword.Length + 160);
                            snippet = content.Substring(start, length).Replace('\t', ' ').Replace('\r', ' ').Replace('\n', ' ');
                            break;
                        }
                    }
                }
                catch (Exception ex)
                {
                    snippet = "read-error: " + ex.GetType().Name;
                }
            }

            if (matchedBy.Length == 0)
            {
                continue;
            }

            matched++;
            report.WriteLine($"{fileName}\t{file.FileSize}\t{matchedBy}\t{snippet}");
        }

        Console.Error.WriteLine($"Scanned text files={scanned}; matched={matched}; report={reportPath}");
        return 0;
    }

    if (command == "extract")
    {
        if (args.Length != 4)
        {
            return Usage();
        }

        string outDir = args[2];
        string listPath = args[3];
        Directory.CreateDirectory(outDir);

        int extracted = 0;
        foreach (string raw in File.ReadLines(listPath))
        {
            string fileName = raw.Trim();
            if (fileName.Length == 0 || fileName.StartsWith('#'))
            {
                continue;
            }

            string target = Path.Combine(outDir, SafePath(fileName));
            Directory.CreateDirectory(Path.GetDirectoryName(target)!);

            using var input = storage.OpenFile(fileName);
            using var output = File.Create(target);
            input.CopyTo(output);
            extracted++;
            Console.WriteLine($"{fileName}\t{target}");
        }

        Console.Error.WriteLine($"Extracted={extracted}; out={outDir}");
        return 0;
    }
}
catch (Exception ex)
{
    Console.Error.WriteLine(ex);
    return 1;
}

return Usage();
