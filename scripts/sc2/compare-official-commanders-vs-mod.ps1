param(
    [string]$OfficialCommandersRoot,
    [string]$ModRoot,
    [string]$OutputDir,
    [string[]]$Commanders,
    [switch]$IncludeCatalogDiff
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$nodeScript = Join-Path $scriptRoot "compare-official-commanders-vs-mod.mjs"

if (-not (Test-Path -LiteralPath $nodeScript -PathType Leaf)) {
    throw "Node script not found: $nodeScript"
}

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    throw "Node.js is required to run $nodeScript"
}

$nodeArgs = @($nodeScript)

if (-not [string]::IsNullOrWhiteSpace($OfficialCommandersRoot)) {
    $nodeArgs += @("--official-root", $OfficialCommandersRoot)
}

if (-not [string]::IsNullOrWhiteSpace($ModRoot)) {
    $nodeArgs += @("--mod-root", $ModRoot)
}

if (-not [string]::IsNullOrWhiteSpace($OutputDir)) {
    $nodeArgs += @("--output-dir", $OutputDir)
}

if ($Commanders -and $Commanders.Count -gt 0) {
    $expandedCommanders = @()
    foreach ($commander in $Commanders) {
        $expandedCommanders += @($commander.Split(",") | ForEach-Object { $_.Trim() } | Where-Object { $_ })
    }

    if ($expandedCommanders.Count -gt 0) {
        $nodeArgs += @("--commanders", ($expandedCommanders -join ","))
    }
}

if ($IncludeCatalogDiff) {
    $nodeArgs += "--include-catalog-diff"
}

& $node.Source @nodeArgs
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
