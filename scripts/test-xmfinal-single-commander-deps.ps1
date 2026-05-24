param(
    [string[]]$Modules = @(
        "XMAbathur",
        "XMKerrigan",
        "XMFenix",
        "XMArtanis",
        "XMKarax",
        "XMZagara",
        "XMVorazun",
        "XMZeratul"
    ),
    [string]$MapClick = "1",
    [string]$Commander = "Alarak",
    [int]$MapEntryTimeoutSec = 120,
    [int]$PollIntervalMs = 2000,
    [int]$EscapeCount = 10,
    [int]$CloseDelaySec = 20,
    [switch]$LaunchGame = $true,
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe"
)

$ErrorActionPreference = "Stop"

$Modules = @(
    $Modules |
        ForEach-Object { $_ -split "," } |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -ne "" }
)

$sourceRoot = Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Mods\XM"
$liveRoot = Join-Path $LiveRoot "Mods\XM"
$liveMapRoot = Join-Path $LiveRoot "Maps\XM"
$xmFinalSource = Join-Path $sourceRoot "XMFinal.SC2Mod"
$xmFinalLive = Join-Path $liveRoot "XMFinal.SC2Mod"
$xmFinalInfo = Join-Path $xmFinalSource "DocumentInfo"
$xmFinalHeader = Join-Path $xmFinalSource "DocumentHeader"
$syncHeaderScript = Join-Path $PSScriptRoot "sync-sc2-documentheader-deps.ps1"
$setBankScript = Join-Path $PSScriptRoot "set-campaignxcore-commander.ps1"
$liveVerifyScript = Join-Path $PSScriptRoot "live-verify-abathur.ps1"
$syncLiveScript = Join-Path $PSScriptRoot "sync-alarak-live.ps1"

function Read-Bytes {
    param([string]$Path)
    return [IO.File]::ReadAllBytes($Path)
}

function Write-Bytes {
    param(
        [string]$Path,
        [byte[]]$Bytes
    )
    [IO.File]::WriteAllBytes($Path, $Bytes)
}

function Save-Text {
    param(
        [string]$Path,
        [string]$Text
    )
    $utf8 = New-Object System.Text.UTF8Encoding($true)
    [IO.File]::WriteAllText($Path, $Text, $utf8)
}

function Add-DependencyToDocumentInfo {
    param(
        [string]$Path,
        [string]$Dependency
    )

    [xml]$doc = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
    $deps = $doc.DocInfo.Dependencies
    if (-not $deps) {
        throw "Missing <Dependencies> node in $Path"
    }

    $exists = @($deps.Value | Where-Object { $_ -eq $Dependency }).Count -gt 0
    if (-not $exists) {
        $value = $doc.CreateElement("Value")
        $value.InnerText = $Dependency
        [void]$deps.AppendChild($value)
    }

    $settings = New-Object System.Xml.XmlWriterSettings
    $settings.Encoding = New-Object System.Text.UTF8Encoding($true)
    $settings.Indent = $true
    $settings.NewLineChars = "`r`n"
    $settings.NewLineHandling = [System.Xml.NewLineHandling]::Replace
    $writer = [System.Xml.XmlWriter]::Create($Path, $settings)
    try {
        $doc.Save($writer)
    }
    finally {
        $writer.Dispose()
    }
}

function Sync-Directory {
    param(
        [string]$Source,
        [string]$Target
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Source path not found: $Source"
    }
    if (-not (Test-Path -LiteralPath $Target)) {
        New-Item -ItemType Directory -Force -Path $Target | Out-Null
    }

    $robocopy = Get-Command robocopy -ErrorAction SilentlyContinue
    if ($robocopy) {
        & $robocopy.Source $Source $Target /E /R:1 /W:1 /NFL /NDL /NP /MT:8 | Out-Null
        if ($LASTEXITCODE -ge 8) {
            throw "robocopy failed while syncing '$Source' to '$Target' with exit code $LASTEXITCODE"
        }
        return
    }

    Get-ChildItem -LiteralPath $Source -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($Source.Length).TrimStart('\')
        $destination = Join-Path $Target $relative
        $destinationDir = Split-Path -Parent $destination
        if (-not (Test-Path -LiteralPath $destinationDir)) {
            New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
        }
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    }
}

if (-not (Test-Path -LiteralPath $xmFinalInfo)) {
    throw "Missing source DocumentInfo: $xmFinalInfo"
}
if (-not (Test-Path -LiteralPath $xmFinalHeader)) {
    throw "Missing source DocumentHeader: $xmFinalHeader"
}

$baselineInfoBytes = Read-Bytes -Path $xmFinalInfo
$baselineHeaderBytes = Read-Bytes -Path $xmFinalHeader

$results = New-Object System.Collections.Generic.List[object]
$restored = $false

try {
    Sync-Directory -Source $xmFinalSource -Target $xmFinalLive

    foreach ($module in $Modules) {
        $moduleSource = Join-Path $sourceRoot ($module + ".SC2Mod")
        $moduleLive = Join-Path $liveRoot ($module + ".SC2Mod")
        if (-not (Test-Path -LiteralPath $moduleSource)) {
            $results.Add([pscustomobject]@{
                Module = $module
                Status = "missing-module"
                Signal = ""
                Log = ""
            }) | Out-Null
            continue
        }

        Sync-Directory -Source $moduleSource -Target $moduleLive

        Write-Bytes -Path $xmFinalInfo -Bytes $baselineInfoBytes
        Write-Bytes -Path $xmFinalHeader -Bytes $baselineHeaderBytes

        $dependency = "file:Mods\XM\$module.SC2Mod"
        Add-DependencyToDocumentInfo -Path $xmFinalInfo -Dependency $dependency
        & $syncHeaderScript -DocumentRoot $xmFinalSource | Out-Null

        Copy-Item -LiteralPath $xmFinalInfo -Destination (Join-Path $xmFinalLive "DocumentInfo") -Force
        Copy-Item -LiteralPath $xmFinalHeader -Destination (Join-Path $xmFinalLive "DocumentHeader") -Force

        $commanderName = $module.Substring(2)
        & $setBankScript -Commander $commanderName -Backup:$false | Out-Null

        $verifyArgs = @(
            "-NoProfile",
            "-ExecutionPolicy", "Bypass",
            "-File", $liveVerifyScript,
            "-LaunchGame:$true",
            "-RestartExisting:$true",
            "-CloseGame:$true",
            "-MapClick", $MapClick,
            "-Commander", $commanderName,
            "-InitialLoadWaitMs", 12000,
            "-EscapeCount", $EscapeCount,
            "-OutputPrefix", $module.ToLowerInvariant()
        )

        $output = & pwsh @verifyArgs 2>&1
        $signal = ($output | Select-String -Pattern '^MAP_ENTRY_SIGNAL=' | ForEach-Object { $_.Line.Split('=', 2)[1] } | Select-Object -First 1)
        $log = ($output | Select-String -Pattern '^LATEST_SCRIPT_ERROR=' | ForEach-Object { $_.Line.Split('=', 2)[1] } | Select-Object -First 1)
        if (-not $signal) {
            $signal = "launch-error"
        }

        $results.Add([pscustomobject]@{
            Module = $module
            Status = if ($signal -eq "alerts") { "pass" } else { "fail" }
            Signal = $signal
            Log = $log
        }) | Out-Null

        $output | ForEach-Object { Write-Host $_ }
    }
}
finally {
    Write-Bytes -Path $xmFinalInfo -Bytes $baselineInfoBytes
    Write-Bytes -Path $xmFinalHeader -Bytes $baselineHeaderBytes
    Copy-Item -LiteralPath $xmFinalInfo -Destination (Join-Path $xmFinalLive "DocumentInfo") -Force -ErrorAction SilentlyContinue
    Copy-Item -LiteralPath $xmFinalHeader -Destination (Join-Path $xmFinalLive "DocumentHeader") -Force -ErrorAction SilentlyContinue
    $restored = $true
}

$results | Format-Table -AutoSize
if (($results | Where-Object { $_.Status -ne "pass" }).Count -gt 0) {
    throw "One or more single-commander dependency tests failed."
}

Write-Output "ALL_SINGLE_COMMANDER_DEP_TESTS_PASSED=1"
