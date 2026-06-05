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
    [string]$SwitcherPath = "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe",
    [switch]$SkipXMFinalCommanderDependencyFilter
)

$ErrorActionPreference = "Stop"

$commanderAliases = @{
    "Nove" = "Nova"
}

$commanderPrivateDependencies = @{
    "Abathur" = "file:Mods\XM\XMAbathur.SC2Mod"
    "AbathurReborn" = "file:Mods\XM\XMAbathurReborn.SC2Mod"
    "Alarak" = "file:Mods\XM\XMAlarak.SC2Mod"
    "Artanis" = "file:Mods\XM\XMArtanis.SC2Mod"
    "Dehaka" = "file:Mods\XM\XMDehaka.SC2Mod"
    "Fenix" = "file:Mods\XM\XMFenix.SC2Mod"
    "Karax" = "file:Mods\XM\XMKarax.SC2Mod"
    "Kerrigan" = "file:Mods\XM\XMKerrigan.SC2Mod"
    "Mengsk" = "file:Mods\XM\XMMengsk.SC2Mod"
    "Mira" = "file:Mods\XM\XMMira.SC2Mod"
    "Nova" = "file:Mods\XM\XMNova.SC2Mod"
    "Probe" = "file:Mods\XM\XMProbe.SC2Mod"
    "Raynor" = "file:Mods\XM\XMRaynor.SC2Mod"
    "SCV" = "file:Mods\XM\XMSCV.SC2Mod"
    "Stetmann" = "file:Mods\XM\XMStetmann.SC2Mod"
    "Stukov" = "file:Mods\XM\XMStukov.SC2Mod"
    "Swann" = "file:Mods\XM\XMSwann.SC2Mod"
    "Tychus" = "file:Mods\XM\XMTychus.SC2Mod"
    "Vorazun" = "file:Mods\XM\XMVorazun.SC2Mod"
    "Zagara" = "file:Mods\XM\XMZagara.SC2Mod"
    "Zeratul" = "file:Mods\XM\XMZeratul.SC2Mod"
}

function Resolve-CommanderName {
    param([string]$Name)

    if ($commanderAliases.ContainsKey($Name)) {
        return $commanderAliases[$Name]
    }

    if ($commanderPrivateDependencies.ContainsKey($Name)) {
        return $Name
    }

    throw "Unknown commander '$Name'. Known commanders: $((@($commanderPrivateDependencies.Keys) + @($commanderAliases.Keys) | Sort-Object) -join ', ')"
}

function Get-WorkspaceRoot {
    return (Split-Path -Parent $PSScriptRoot)
}

function Get-LiveRootFromMapPath {
    param([string]$Path)

    $fullPath = [System.IO.Path]::GetFullPath($Path)
    $marker = "\Maps\"
    $index = $fullPath.IndexOf($marker, [System.StringComparison]::OrdinalIgnoreCase)
    if ($index -lt 0) {
        throw "Could not infer StarCraft II live root from MapPath: $Path"
    }

    return $fullPath.Substring(0, $index)
}

function Get-ActiveDocumentInfoDependencies {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "DocumentInfo not found: $Path"
    }

    $text = Get-Content -LiteralPath $Path -Raw
    $activeText = [regex]::Replace($text, '<!--[\s\S]*?-->', '')
    return @([regex]::Matches($activeText, '<Value>([^<]+)</Value>') | ForEach-Object {
        $_.Groups[1].Value
    })
}

function Set-DocumentInfoDependencies {
    param(
        [string]$Path,
        [string[]]$Dependencies
    )

    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add('<?xml version="1.0" encoding="utf-8"?>')
    $lines.Add('<DocInfo>')
    $lines.Add('    <Dependencies>')
    foreach ($dependency in $Dependencies) {
        $lines.Add("        <Value>$dependency</Value>")
    }
    $lines.Add('    </Dependencies>')
    $lines.Add('</DocInfo>')

    Set-Content -LiteralPath $Path -Value ($lines -join "`r`n") -NoNewline -Encoding UTF8
}

function Test-ByteSequenceAt {
    param(
        [byte[]]$Bytes,
        [int]$Offset,
        [byte[]]$Needle
    )

    if ($Offset + $Needle.Length -gt $Bytes.Length) {
        return $false
    }

    for ($i = 0; $i -lt $Needle.Length; $i++) {
        if ($Bytes[$Offset + $i] -ne $Needle[$i]) {
            return $false
        }
    }

    return $true
}

function Find-DocumentHeaderDependencyStart {
    param([byte[]]$Bytes)

    $markers = @(
        [System.Text.Encoding]::UTF8.GetBytes("file:"),
        [System.Text.Encoding]::UTF8.GetBytes("bnet:")
    )

    for ($offset = 4; $offset -lt $Bytes.Length; $offset++) {
        foreach ($marker in $markers) {
            if (-not (Test-ByteSequenceAt -Bytes $Bytes -Offset $offset -Needle $marker)) {
                continue
            }

            $count = [System.BitConverter]::ToUInt32($Bytes, $offset - 4)
            if (($count -gt 0) -and ($count -lt 128)) {
                return $offset
            }
        }
    }

    throw "DocumentHeader dependency table not found."
}

function Get-DocumentHeaderDependencyEndOffset {
    param(
        [byte[]]$Bytes,
        [int]$Start,
        [uint32]$Count
    )

    $offset = $Start
    for ($index = 0; $index -lt $Count; $index++) {
        while (($offset -lt $Bytes.Length) -and ($Bytes[$offset] -ne 0)) {
            $offset++
        }
        if ($offset -ge $Bytes.Length) {
            throw "DocumentHeader dependency string is not null-terminated."
        }
        $offset++
    }

    return $offset
}

function Set-DocumentHeaderDependencies {
    param(
        [string]$Path,
        [string[]]$Dependencies
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "DocumentHeader not found: $Path"
    }

    [byte[]]$bytes = [System.IO.File]::ReadAllBytes($Path)
    $dependencyStart = Find-DocumentHeaderDependencyStart -Bytes $bytes
    $countOffset = $dependencyStart - 4
    $currentCount = [System.BitConverter]::ToUInt32($bytes, $countOffset)
    $dependencyEnd = Get-DocumentHeaderDependencyEndOffset -Bytes $bytes -Start $dependencyStart -Count $currentCount
    $dependencyBytes = [System.Text.Encoding]::UTF8.GetBytes((($Dependencies -join "`0") + "`0"))
    $countBytes = [System.BitConverter]::GetBytes([uint32]$Dependencies.Count)
    $stream = New-Object System.IO.MemoryStream

    $stream.Write($bytes, 0, $countOffset)
    $stream.Write($countBytes, 0, $countBytes.Length)
    $stream.Write($dependencyBytes, 0, $dependencyBytes.Length)
    $stream.Write($bytes, $dependencyEnd, $bytes.Length - $dependencyEnd)

    [System.IO.File]::WriteAllBytes($Path, $stream.ToArray())
}

function Set-LiveXMFinalCommanderDependencies {
    param(
        [string]$CommanderName,
        [string]$MapFilePath
    )

    if (-not $commanderPrivateDependencies.ContainsKey($CommanderName)) {
        Write-Warning "No XMFinal commander dependency mapping for '$CommanderName'; leaving live XMFinal dependencies unchanged."
        return
    }

    $workspaceRoot = Get-WorkspaceRoot
    $sourceDocumentInfo = Join-Path $workspaceRoot "合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\DocumentInfo"
    $liveRoot = Get-LiveRootFromMapPath -Path $MapFilePath
    $liveXMFinalRoot = Join-Path $liveRoot "Mods\XM\XMFinal.SC2Mod"
    $liveDocumentInfo = Join-Path $liveXMFinalRoot "DocumentInfo"
    $liveDocumentHeader = Join-Path $liveXMFinalRoot "DocumentHeader"
    $selectedDependency = $commanderPrivateDependencies[$CommanderName]
    $allCommanderDependencies = @($commanderPrivateDependencies.Values)
    $sourceDependencies = Get-ActiveDocumentInfoDependencies -Path $sourceDocumentInfo
    $filteredDependencies = New-Object System.Collections.Generic.List[string]

    foreach ($dependency in $sourceDependencies) {
        if (($dependency -in $allCommanderDependencies) -and ($dependency -ne $selectedDependency)) {
            continue
        }
        $filteredDependencies.Add($dependency)
    }

    if ($sourceDependencies -notcontains $selectedDependency) {
        Write-Warning "Selected dependency '$selectedDependency' is not active in source XMFinal DocumentInfo; leaving live XMFinal dependencies unchanged."
        return
    }

    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    Copy-Item -LiteralPath $liveDocumentInfo -Destination "$liveDocumentInfo.bak-launch-$stamp" -Force
    Copy-Item -LiteralPath $liveDocumentHeader -Destination "$liveDocumentHeader.bak-launch-$stamp" -Force
    Set-DocumentInfoDependencies -Path $liveDocumentInfo -Dependencies $filteredDependencies.ToArray()
    Set-DocumentHeaderDependencies -Path $liveDocumentHeader -Dependencies $filteredDependencies.ToArray()

    Write-Host "XMFinal live dependencies filtered for ${CommanderName}: $($filteredDependencies.Count)"
}

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
$Commander = Resolve-CommanderName -Name $Commander

if (-not (Test-Path -LiteralPath $SwitcherPath)) {
    throw "SwitcherPath not found: $SwitcherPath"
}

if (-not (Test-Path -LiteralPath $MapPath)) {
    throw "MapPath not found: $MapPath"
}

if (-not $SkipXMFinalCommanderDependencyFilter) {
    Set-LiveXMFinalCommanderDependencies -CommanderName $Commander -MapFilePath $MapPath
}

foreach ($bankFile in (Get-CampaignXCoreBankPaths -ExplicitPath $BankPath)) {
    Set-BankCommander -Path $bankFile -Value $Commander
}

Write-Host "Launching map: $MapPath"
Write-Host "Commander: $Commander"

& $SwitcherPath $MapPath
