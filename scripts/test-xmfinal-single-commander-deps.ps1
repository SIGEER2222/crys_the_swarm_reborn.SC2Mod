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
    [string[]]$SkipModules = @(
        "XMMutator",
        "XMNeut",
        "XMMira",
        "XMMengsk",
        "XMProbe",
        "XMSCV",
        "XMTychus",
        "XMDehaka",
        "XMStukov",
        "XMShop",
        "XMNova",
        "XMSwann",
        "XMStetmann"
    ),
    [string]$MapClick = "1",
    [string]$MapName = "",
    [string]$Commander = "Alarak",
    [int]$MapEntryTimeoutSec = 40,
    [int]$PollIntervalMs = 2000,
    [int]$EscapeCount = 10,
    [int]$CloseDelaySec = 20,
    [bool]$VisibleVerifyWindow = $true,
    [string]$OutputRoot = "",
    [switch]$MutateXMFinalDependencies = $false,
    [switch]$UseLauncherRoute = $false,
    [switch]$LaunchGame = $true,
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe"
)

$ErrorActionPreference = "Stop"

$SkipModules = @(
    $SkipModules |
        ForEach-Object { $_ -split "," } |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -ne "" }
)
$skipLookup = @{}
foreach ($skipModule in $SkipModules) {
    $skipLookup[$skipModule] = $true
}

$Modules = @(
    $Modules |
        ForEach-Object { $_ -split "," } |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -ne "" } |
        Where-Object { -not $skipLookup.ContainsKey($_) }
)
if ($Modules.Count -eq 0) {
    throw "No modules left to test after SkipModules filtering."
}

$sourceRoot = Join-Path $WorkspaceRoot "合作指挥官版起义狂潮\Mods\XM"
$defaultOutputRoot = Join-Path $WorkspaceRoot "tmp\sc2-live-verify"
if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $OutputRoot = $defaultOutputRoot
}
if (-not (Test-Path -LiteralPath $OutputRoot)) {
    New-Item -ItemType Directory -Force -Path $OutputRoot | Out-Null
}
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

function Convert-ToSingleQuotedPowerShellLiteral {
    param([string]$Value)
    return "'" + ($Value -replace "'", "''") + "'"
}

function Invoke-Verify {
    param(
        [string]$Module,
        [string[]]$Arguments
    )

    if (-not $VisibleVerifyWindow) {
        return & pwsh @Arguments 2>&1
    }

    $pwshPath = (Get-Command pwsh -ErrorAction Stop).Source
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $logPath = Join-Path $OutputRoot ("tmp_{0}_visible_verify_{1}.log" -f $Module.ToLowerInvariant(), $stamp)
    $runnerPath = Join-Path ([IO.Path]::GetTempPath()) ("sc2-visible-verify-{0}-{1}.ps1" -f $Module.ToLowerInvariant(), $stamp)
    $argumentListLiteral = ($Arguments | ForEach-Object { Convert-ToSingleQuotedPowerShellLiteral -Value $_ }) -join ", "
    $workspaceLiteral = Convert-ToSingleQuotedPowerShellLiteral -Value $WorkspaceRoot
    $pwshLiteral = Convert-ToSingleQuotedPowerShellLiteral -Value $pwshPath
    $logLiteral = Convert-ToSingleQuotedPowerShellLiteral -Value $logPath
    $titleLiteral = Convert-ToSingleQuotedPowerShellLiteral -Value ("SC2 verify $Module")

    $runner = @"
`$ErrorActionPreference = 'Continue'
`$Host.UI.RawUI.WindowTitle = $titleLiteral
Set-Location -LiteralPath $workspaceLiteral
Write-Host "SC2 verify module: $Module"
Write-Host "Close this PowerShell window to stop the current module test."
Write-Host "Log file: $logPath"
& $pwshLiteral @($argumentListLiteral) 2>&1 | Tee-Object -FilePath $logLiteral
`$exitCode = if (`$LASTEXITCODE -ne `$null) { `$LASTEXITCODE } else { 0 }
Write-Host ""
Write-Host "Module test finished. This window closes in $CloseDelaySec seconds."
Start-Sleep -Seconds $CloseDelaySec
exit `$exitCode
"@

    $runner | Set-Content -LiteralPath $runnerPath -Encoding UTF8
    $process = Start-Process -FilePath $pwshPath -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $runnerPath) -WindowStyle Normal -Wait -PassThru
    Remove-Item -LiteralPath $runnerPath -Force -ErrorAction SilentlyContinue

    $output = @()
    if (Test-Path -LiteralPath $logPath) {
        $output += Get-Content -LiteralPath $logPath -ErrorAction SilentlyContinue
    }
    else {
        $output += "VISIBLE_VERIFY_LOG_MISSING=$logPath"
    }

    $output += "VISIBLE_VERIFY_LOG=$logPath"
    if ($process.ExitCode -ne 0) {
        $output += "VISIBLE_VERIFY_EXIT_CODE=$($process.ExitCode)"
    }
    return $output
}

$baselineInfoBytes = $null
if ($MutateXMFinalDependencies) {
    if (-not (Test-Path -LiteralPath $xmFinalInfo)) {
        throw "Missing source DocumentInfo: $xmFinalInfo"
    }

    $baselineInfoBytes = Read-Bytes -Path $xmFinalInfo
}

$results = New-Object System.Collections.Generic.List[object]
$restored = $false

try {
    if ($MutateXMFinalDependencies) {
        Sync-Directory -Source $xmFinalSource -Target $xmFinalLive
    }

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

        if ($MutateXMFinalDependencies) {
            Write-Bytes -Path $xmFinalInfo -Bytes $baselineInfoBytes

            $dependency = "file:Mods\XM\$module.SC2Mod"
            Add-DependencyToDocumentInfo -Path $xmFinalInfo -Dependency $dependency
            & $syncHeaderScript -DocumentRoot $xmFinalSource -TargetDocumentRoot $xmFinalLive | Out-Null

            Copy-Item -LiteralPath $xmFinalInfo -Destination (Join-Path $xmFinalLive "DocumentInfo") -Force
        }

        $commanderName = $module.Substring(2)
        & $setBankScript -Commander $commanderName -Backup:$false | Out-Null
        $loadPollIntervalSec = [math]::Max(1, [int][math]::Ceiling($PollIntervalMs / 1000.0))

        $verifyArgs = @(
            "-NoProfile",
            "-ExecutionPolicy", "Bypass",
            "-File", $liveVerifyScript,
            "-LaunchGame:$true",
            "-RestartExisting:$true",
            "-CloseGame:$true",
            "-DirectMap:$(-not $UseLauncherRoute)",
            "-MapClick", $MapClick,
            "-MapName", $MapName,
            "-Commander", $commanderName,
            "-InitialLoadWaitMs", 5000,
            "-LoadWaitMinSec", $MapEntryTimeoutSec,
            "-LoadWaitMaxSec", $MapEntryTimeoutSec,
            "-LoadPollIntervalSec", $loadPollIntervalSec,
            "-EscapeCount", $EscapeCount,
            "-ProbeTopBarButtons", "",
            "-ProbeCommandCardSlots", "",
            "-OutputPrefix", $module.ToLowerInvariant(),
            "-OutputRoot", $OutputRoot
        )

        $output = Invoke-Verify -Module $module -Arguments $verifyArgs
        $signal = ($output | Select-String -Pattern '^LOAD_WAIT_SIGNAL=' | ForEach-Object { $_.Line.Split('=', 2)[1] } | Select-Object -First 1)
        $log = ($output | Select-String -Pattern '^LATEST_SCRIPT_ERROR=' | ForEach-Object { $_.Line.Split('=', 2)[1] } | Select-Object -First 1)
        $visibleExit = ($output | Select-String -Pattern '^VISIBLE_VERIFY_EXIT_CODE=' | ForEach-Object { $_.Line.Split('=', 2)[1] } | Select-Object -First 1)
        $entryScreenshot = ($output | Select-String -Pattern '^ENTRY_SCREENSHOT=' | ForEach-Object { $_.Line.Split('=', 2)[1] } | Select-Object -First 1)
        if (-not $signal) {
            $signal = "launch-error"
        }

        $status = "review"
        if ($signal -eq "script-error" -or $visibleExit) {
            $status = "fail"
        }
        elseif (-not $entryScreenshot) {
            $status = "fail"
        }

        $results.Add([pscustomobject]@{
            Module = $module
            Status = $status
            Signal = $signal
            Log = $log
            EntryScreenshot = $entryScreenshot
        }) | Out-Null

        $output | ForEach-Object { Write-Host $_ }
    }
}
finally {
    if ($MutateXMFinalDependencies -and $baselineInfoBytes) {
        Write-Bytes -Path $xmFinalInfo -Bytes $baselineInfoBytes
        Copy-Item -LiteralPath $xmFinalInfo -Destination (Join-Path $xmFinalLive "DocumentInfo") -Force -ErrorAction SilentlyContinue
        $restored = $true
    }
}

$results | Format-Table -AutoSize
if (($results | Where-Object { $_.Status -eq "fail" }).Count -gt 0) {
    throw "One or more single-commander dependency tests failed."
}

Write-Output "ALL_SINGLE_COMMANDER_DEP_TESTS_COMPLETED=1"
Write-Output "ENTRY_SCREENSHOTS_REQUIRE_REVIEW=1"
