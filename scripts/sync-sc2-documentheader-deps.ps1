param(
    [Parameter(Mandatory = $true)]
    [string]$DocumentRoot
)

$ErrorActionPreference = "Stop"

$resolvedRoot = (Resolve-Path -LiteralPath $DocumentRoot).Path
$documentHeaderPath = Join-Path $resolvedRoot "DocumentHeader"
$documentInfoPath = Join-Path $resolvedRoot "DocumentInfo"

if (-not (Test-Path -LiteralPath $documentHeaderPath)) {
    throw "DocumentHeader not found: $documentHeaderPath"
}
if (-not (Test-Path -LiteralPath $documentInfoPath)) {
    throw "DocumentInfo not found: $documentInfoPath"
}

[xml]$documentInfo = Get-Content -LiteralPath $documentInfoPath -Raw -Encoding UTF8
$dependencyValues = @(
    $documentInfo.DocInfo.Dependencies.Value |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
        ForEach-Object { $_.Trim() }
)

$headerBytes = [IO.File]::ReadAllBytes($documentHeaderPath)
$magic = [Text.Encoding]::ASCII.GetString($headerBytes, 0, [Math]::Min(4, $headerBytes.Length))
if ($magic -ne "H2CS") {
    Write-Output "SKIPPED_NON_H2CS=$documentHeaderPath"
    exit 0
}

if ($headerBytes.Length -lt 0x30) {
    throw "DocumentHeader is too short to contain a dependency table: $documentHeaderPath"
}

$currentCount = [BitConverter]::ToInt32($headerBytes, 0x2C)
$cursor = 0x30
for ($i = 0; $i -lt $currentCount; $i++) {
    while ($cursor -lt $headerBytes.Length -and $headerBytes[$cursor] -ne 0) {
        $cursor++
    }
    if ($cursor -ge $headerBytes.Length) {
        throw "DocumentHeader dependency table is truncated: $documentHeaderPath"
    }
    $cursor++
}

$prefixBytes = New-Object byte[] 0x2C
[Array]::Copy($headerBytes, 0, $prefixBytes, 0, 0x2C)
$countBytes = [BitConverter]::GetBytes([int]$dependencyValues.Count)
$dependencyBytes = New-Object System.Collections.Generic.List[byte]
foreach ($dependency in $dependencyValues) {
    $dependencyBytes.AddRange([Text.Encoding]::UTF8.GetBytes($dependency))
    $dependencyBytes.Add(0)
}

$suffixLength = $headerBytes.Length - $cursor
$newBytes = New-Object byte[] (0x2C + 4 + $dependencyBytes.Count + $suffixLength)
[Array]::Copy($prefixBytes, 0, $newBytes, 0, $prefixBytes.Length)
[Array]::Copy($countBytes, 0, $newBytes, 0x2C, 4)
[Array]::Copy($dependencyBytes.ToArray(), 0, $newBytes, 0x30, $dependencyBytes.Count)
[Array]::Copy($headerBytes, $cursor, $newBytes, 0x30 + $dependencyBytes.Count, $suffixLength)

[IO.File]::WriteAllBytes($documentHeaderPath, $newBytes)

Write-Output "UPDATED_DOCUMENTHEADER=$documentHeaderPath"
Write-Output "DEPENDENCY_COUNT=$($dependencyValues.Count)"
