
$ErrorActionPreference = "Stop"

# Hardcoded full paths to avoid encoding issues
$GameStringsSource = "C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\references\official-casc-export\mods\starcoop\starcoop.sc2mod\zhcn.sc2data\localizeddata\gamestrings.txt"
$GameStringsTarget = "C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMZagara.SC2Mod\zhCN.SC2Data\LocalizedData\GameStrings.txt"
$SummaryPath = "C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\references\official-zagara-import-summary.tsv"

Write-Host "Reading import summary from: $SummaryPath"
$objectIds = @{}
Get-Content $SummaryPath | Select-Object -Skip 1 | ForEach-Object {
    $parts = $_.Split("`t")
    if ($parts.Length -ge 1 -and $parts[0]) {
        $objectIds[$parts[0]] = $true
    }
}

Write-Host "Collected $($objectIds.Count) unique ObjectIds"

# Define patterns for Zagara-related content
$zagPatterns = @(
    "Zagara",
    "Baneling", 
    "Scourge", 
    "SwarmHost",
    "Locust",
    "Corruptor",
    "BroodLord",
    "Hydralisk",
    "Viper",
    "Infestor",
    "Roach",
    "Ravager",
    "Lurker",
    "Overseer",
    "Overlord",
    "Mutalisk",
    "Guardian",
    "Devourer",
    "CreepTumor",
    "InfestedTerran"
)

Write-Host "Reading game strings from: $GameStringsSource"
$selectedLines = @()
Get-Content $GameStringsSource -Encoding UTF8 | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line -match "^[0-9]+=$") {
        return
    }
    
    $key = ""
    if ($line -match "^([^=]+)=(.*)$") {
        $key = $matches[1]
    }
    
    # Check if this line is related to Zagara
    $isRelated = $false
    
    # Check ObjectId pattern in the key
    foreach ($id in $objectIds.Keys) {
        if ($key -match [regex]::Escape($id)) {
            $isRelated = $true
            break
        }
    }
    
    # Check Zagara-related patterns
    if (-not $isRelated) {
        foreach ($pattern in $zagPatterns) {
            if ($key -match [regex]::Escape($pattern)) {
                $isRelated = $true
                break
            }
        }
    }
    
    if ($isRelated) {
        $selectedLines += $line
    }
}

Write-Host "Writing $($selectedLines.Count) lines to: $GameStringsTarget"
$selectedLines | Set-Content $GameStringsTarget -Encoding UTF8

Write-Host "Done! Successfully imported $($selectedLines.Count) Zagara-related game strings."
