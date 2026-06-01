<#
.SYNOPSIS
Launch an XM map with a specific commander by updating CampaignXCore and opening the map directly.

.EXAMPLE
  .\scripts\launch-xm-map.ps1 -Commander Kerrigan -MapPath "E:\SC2\SC2new\StarCraft II\Maps\XM\ttosh03b.SC2Map"
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Commander,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$MapPath,

    [string]$BankPath = "",
    [string]$SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe"
)

$ErrorActionPreference = "Stop"

function Get-CampaignXCoreBankPaths {
    param([string]$ExplicitPath)

    if ($ExplicitPath) {
        if (-not (Test-Path -LiteralPath $ExplicitPath)) {
            throw "BankPath not found: $ExplicitPath"
        }
        return @((Resolve-Path -LiteralPath $ExplicitPath).Path)
    }

    $paths = New-Object System.Collections.Generic.List[string]

    $liveBank = Join-Path $env:USERPROFILE "Documents\StarCraft II\Banks\CampaignXCore.SC2Bank"
    if (Test-Path -LiteralPath $liveBank) {
        $paths.Add((Resolve-Path -LiteralPath $liveBank).Path)
    }

    $root = Join-Path $env:USERPROFILE "Documents\StarCraft II\Accounts"
    if (-not (Test-Path -LiteralPath $root)) {
        throw "StarCraft II accounts root not found: $root"
    }

    $candidate = Get-ChildItem -LiteralPath $root -Recurse -File -Filter "CampaignXCore.SC2Bank" |
        Where-Object { $_.FullName -notmatch '\\backup\\' } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if (-not $candidate) {
        throw "CampaignXCore.SC2Bank not found under $root"
    }

    $accountBank = $candidate.FullName
    if ($paths.Count -eq 0 -or ($paths -notcontains $accountBank)) {
        $paths.Add($accountBank)
    }

    return $paths.ToArray()
}

function Set-BankCommander {
    param(
        [string]$Path,
        [string]$Value
    )

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return
    }

    [xml]$xml = Get-Content -LiteralPath $Path -Raw

    $bank = $xml.SelectSingleNode("/Bank")
    if (-not $bank) {
        throw "Invalid bank file: missing <Bank> root."
    }

    $section = $xml.SelectSingleNode("/Bank/Section[@name='Ach']")
    if (-not $section) {
        $section = $xml.CreateElement("Section")
        $null = $section.SetAttribute("name", "Ach")
        $null = $bank.AppendChild($section)
    }

    $key = $xml.SelectSingleNode("/Bank/Section[@name='Ach']/Key[@name='Commander']")
    if (-not $key) {
        $key = $xml.CreateElement("Key")
        $null = $key.SetAttribute("name", "Commander")
        $null = $section.AppendChild($key)
    }

    $valueNode = $xml.SelectSingleNode("/Bank/Section[@name='Ach']/Key[@name='Commander']/Value")
    if (-not $valueNode) {
        $valueNode = $xml.CreateElement("Value")
        $null = $valueNode.SetAttribute("string", $Value)
        $null = $key.AppendChild($valueNode)
    }

    $null = $valueNode.RemoveAttribute("int")
    $null = $valueNode.SetAttribute("string", $Value)

    $xml.Save($Path)
}

function Stop-RunningSc2 {
    $processNames = @("SC2_x64", "SC2Switcher_x64")

    foreach ($processName in $processNames) {
        $running = Get-Process -Name $processName -ErrorAction SilentlyContinue
        if (-not $running) {
            continue
        }

        foreach ($proc in $running) {
            try {
                Stop-Process -Id $proc.Id -Force -ErrorAction Stop
            }
            catch {
                Write-Warning "Could not stop $processName (PID $($proc.Id)): $($_.Exception.Message)"
            }
        }
    }

    Start-Sleep -Seconds 2
}

Stop-RunningSc2

if (-not (Test-Path -LiteralPath $SwitcherPath)) {
    throw "SwitcherPath not found: $SwitcherPath"
}

if (-not (Test-Path -LiteralPath $MapPath)) {
    throw "MapPath not found: $MapPath"
}

foreach ($bankFile in (Get-CampaignXCoreBankPaths -ExplicitPath $BankPath)) {
    Set-BankCommander -Path $bankFile -Value $Commander
}

Write-Host "Launching map: $MapPath"
Write-Host "Commander: $Commander"

& $SwitcherPath $MapPath
