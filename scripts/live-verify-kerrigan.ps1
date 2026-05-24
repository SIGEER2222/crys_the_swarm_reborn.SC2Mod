param(
    [string]$MapName = "thanson01.SC2Map",
    [string[]]$Commanders = @("Kerrigan"),
    [switch]$AllCommanders = $false,
    [switch]$ContinueOnError = $true,
    [int]$InterRunDelayMs = 1500,
    [string]$OutputPrefixPrefix = "",
    [switch]$Prepare = $true,
    [switch]$LaunchGame = $true,
    [switch]$RestartExisting = $true,
    [switch]$CloseGame = $true,
    [int]$InitialLoadWaitMs = 16000,
    [int]$MapEntryTimeoutSec = 180,
    [int]$PollIntervalMs = 2000,
    [int]$EscapeCount = 12,
    [switch]$SelectHero = $true,
    [double[]]$HeroSelectRatio = @(0.974, 0.683),
    [string]$KeySequence = "",
    [switch]$ClickCommandCard = $true,
    [string]$CommandCardSlots = "7",
    [string]$TargetClicks = "0.50,0.50",
    [int]$PostEntryWaitMs = 3500,
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$Sc2SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe"
)

$ErrorActionPreference = "Stop"

$runtimeCommanderOrder = @(
    "Abathur",
    "Raynor",
    "Kerrigan",
    "Alarak",
    "Artanis",
    "Zagara",
    "Fenix",
    "Vorazun",
    "Karax",
    "Zeratul",
    "Stukov",
    "Dehaka",
    "Tychus",
    "Mira",
    "Nova",
    "Mengsk",
    "Swann",
    "Stetmann"
)

function Resolve-CommanderSpec {
    param([string]$CommanderSpec)

    if ([string]::IsNullOrWhiteSpace($CommanderSpec)) {
        throw "Commander spec cannot be empty."
    }

    $trimmed = $CommanderSpec.Trim()
    $normalized = $trimmed.ToLowerInvariant()

    switch ($normalized) {
        "mira" {
            return [pscustomobject]@{
                Commander = "Mira"
                DisplayName = "Han & Horner"
                Prefix = "han_horner"
            }
        }
        "han & horner" {
            return [pscustomobject]@{
                Commander = "Mira"
                DisplayName = "Han & Horner"
                Prefix = "han_horner"
            }
        }
        "hanandhorner" {
            return [pscustomobject]@{
                Commander = "Mira"
                DisplayName = "Han & Horner"
                Prefix = "han_horner"
            }
        }
        "horner" {
            return [pscustomobject]@{
                Commander = "Mira"
                DisplayName = "Han & Horner"
                Prefix = "han_horner"
            }
        }
    }

    $canonical = $runtimeCommanderOrder | Where-Object {
        $_.Equals($trimmed, [System.StringComparison]::OrdinalIgnoreCase)
    } | Select-Object -First 1

    if (-not $canonical) {
        throw "Unsupported commander spec: $CommanderSpec"
    }

    return [pscustomobject]@{
        Commander = $canonical
        DisplayName = $canonical
        Prefix = $canonical.ToLowerInvariant()
    }
}

function Get-ResolvedCommanders {
    param(
        [string[]]$RequestedCommanders,
        [switch]$UseAll
    )

    $source = if ($UseAll) { $runtimeCommanderOrder } else { $RequestedCommanders }
    $seen = @{}
    $resolved = @()

    foreach ($item in $source) {
        $entry = Resolve-CommanderSpec -CommanderSpec $item
        if ($seen.ContainsKey($entry.Commander)) {
            continue
        }
        $seen[$entry.Commander] = $true
        $resolved += $entry
    }

    if ($resolved.Count -eq 0) {
        throw "No commanders selected."
    }

    return $resolved
}

function Parse-VerifyOutput {
    param([string[]]$Lines)

    $result = @{}
    foreach ($line in $Lines) {
        if ($line -match '^([A-Z0-9_]+)=(.*)$') {
            $result[$matches[1]] = $matches[2]
        }
    }
    return $result
}

$verifyScript = Join-Path $PSScriptRoot "live-verify-alarak.ps1"
$syncScript = Join-Path $PSScriptRoot "sync-all-to-live.ps1"
$setCommanderScript = Join-Path $PSScriptRoot "set-campaignxcore-commander.ps1"
$bankPath = "$env:USERPROFILE\Documents\StarCraft II\Banks\CampaignXCore.SC2Bank"
$resolvedCommanders = Get-ResolvedCommanders -RequestedCommanders $Commanders -UseAll:$AllCommanders

if ($Prepare) {
    & $syncScript -WorkspaceRoot $WorkspaceRoot -LiveRoot $LiveRoot -Maps @($MapName) -SkipLauncher
}

$results = @()

for ($index = 0; $index -lt $resolvedCommanders.Count; $index++) {
    $entry = $resolvedCommanders[$index]
    $outputPrefix = if ([string]::IsNullOrWhiteSpace($OutputPrefixPrefix)) {
        $entry.Prefix
    }
    else {
        "{0}_{1}" -f $OutputPrefixPrefix, $entry.Prefix
    }

    Write-Output ("===== VERIFY_START commander={0} runtime={1} map={2} index={3}/{4} =====" -f $entry.DisplayName, $entry.Commander, $MapName, ($index + 1), $resolvedCommanders.Count)
    & $setCommanderScript -Commander $entry.Commander -BankPath $bankPath | Write-Output

    try {
        $lines = & $verifyScript `
            -MapName $MapName `
            -Commander $entry.Commander `
            -OutputPrefix $outputPrefix `
            -Prepare:$false `
            -LaunchGame:$LaunchGame `
            -RestartExisting:$RestartExisting `
            -CloseGame:$CloseGame `
            -InitialLoadWaitMs $InitialLoadWaitMs `
            -MapEntryTimeoutSec $MapEntryTimeoutSec `
            -PollIntervalMs $PollIntervalMs `
            -EscapeCount $EscapeCount `
            -SelectHero:$SelectHero `
            -HeroSelectRatio $HeroSelectRatio `
            -KeySequence $KeySequence `
            -ClickCommandCard:$ClickCommandCard `
            -CommandCardSlots $CommandCardSlots `
            -TargetClicks $TargetClicks `
            -PostEntryWaitMs $PostEntryWaitMs `
            -WorkspaceRoot $WorkspaceRoot `
            -LiveRoot $LiveRoot `
            -Sc2SwitcherPath $Sc2SwitcherPath 2>&1 | ForEach-Object { $_.ToString() }

        $lines | Write-Output
        $parsed = Parse-VerifyOutput -Lines $lines
        $status = "ok"
        if ($parsed["MAP_ENTRY_SIGNAL"] -eq "timeout" -or $parsed["MAP_ENTRY_SIGNAL"] -eq "script-error" -or $parsed.ContainsKey("LATEST_SCRIPT_ERROR")) {
            $status = "warning"
        }

        $results += [pscustomobject]@{
            Commander = $entry.DisplayName
            RuntimeCommander = $entry.Commander
            Status = $status
            MapEntrySignal = $parsed["MAP_ENTRY_SIGNAL"]
            BeforeScreenshot = $parsed["BEFORE_SCREENSHOT"]
            AfterScreenshot = $parsed["AFTER_SCREENSHOT"]
            PostClickScreenshot = $parsed["POSTCLICK_SCREENSHOT"]
            SelectedHeroScreenshot = $parsed["SELECTED_HERO_SCREENSHOT"]
            LatestAlerts = $parsed["LATEST_ALERTS"]
            LatestScriptError = $parsed["LATEST_SCRIPT_ERROR"]
        }
    }
    catch {
        Write-Output ("VERIFY_EXCEPTION={0}" -f $_.Exception.Message)
        $results += [pscustomobject]@{
            Commander = $entry.DisplayName
            RuntimeCommander = $entry.Commander
            Status = "error"
            MapEntrySignal = ""
            BeforeScreenshot = ""
            AfterScreenshot = ""
            PostClickScreenshot = ""
            SelectedHeroScreenshot = ""
            LatestAlerts = ""
            LatestScriptError = $_.Exception.Message
        }

        if (-not $ContinueOnError) {
            throw
        }
    }

    $current = $results[-1]
    Write-Output ("===== VERIFY_END commander={0} runtime={1} status={2} signal={3} =====" -f $current.Commander, $current.RuntimeCommander, $current.Status, $current.MapEntrySignal)

    if ($InterRunDelayMs -gt 0 -and $index -lt ($resolvedCommanders.Count - 1)) {
        Start-Sleep -Milliseconds $InterRunDelayMs
    }
}

Write-Output "===== VERIFY_SUMMARY ====="
foreach ($result in $results) {
    Write-Output ("SUMMARY commander={0} runtime={1} status={2} signal={3}" -f $result.Commander, $result.RuntimeCommander, $result.Status, $result.MapEntrySignal)
    if (-not [string]::IsNullOrWhiteSpace($result.LatestScriptError)) {
        Write-Output ("SUMMARY_SCRIPT_ERROR commander={0} path={1}" -f $result.Commander, $result.LatestScriptError)
    }
    if (-not [string]::IsNullOrWhiteSpace($result.AfterScreenshot)) {
        Write-Output ("SUMMARY_AFTER_SCREENSHOT commander={0} path={1}" -f $result.Commander, $result.AfterScreenshot)
    }
}
