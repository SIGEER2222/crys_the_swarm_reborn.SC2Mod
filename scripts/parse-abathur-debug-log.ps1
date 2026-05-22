param(
    [string]$LogPath,
    [switch]$AsJson
)

$ErrorActionPreference = 'Stop'

function Convert-XmAbaValue {
    param([string]$Value)
    if ($Value -match '^-?\d+$') { return [int]$Value }
    if ($Value -match '^-?\d+\.\d+$') { return [double]$Value }
    return $Value
}

function Read-XmAbaFields {
    param([string]$Payload)
    $fields = @{}
    foreach ($match in [regex]::Matches($Payload, '(\w+)=([^\s]+)')) {
        $fields[$match.Groups[1].Value] = Convert-XmAbaValue $match.Groups[2].Value
    }
    return $fields
}

if (-not $LogPath) {
    $gameLogs = Join-Path $env:USERPROFILE 'Documents\StarCraft II\GameLogs'
    $latest = Get-ChildItem -LiteralPath $gameLogs -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $latest) { throw "No GameLogs found under $gameLogs" }
    $LogPath = $latest.FullName
}

if (-not (Test-Path -LiteralPath $LogPath)) {
    throw "Log file not found: $LogPath"
}

$commander = $null
$map = $null
$start = @{}
$units = @{}
$structures = @{}
$panel = @{}
$biomass = @{}
$raw = New-Object System.Collections.Generic.List[string]

foreach ($line in Get-Content -LiteralPath $LogPath) {
    $match = [regex]::Match($line, '\[XM_ABA\]\[(\w+)\]\s*(.*)$')
    if (-not $match.Success) { continue }

    $section = $match.Groups[1].Value
    $payload = $match.Groups[2].Value
    $fields = Read-XmAbaFields $payload
    [void]$raw.Add($line)

    if ($section -eq 'START') {
        if ($fields.ContainsKey('commander')) { $commander = $fields['commander'] }
        if ($fields.ContainsKey('map')) { $map = $fields['map'] }
        if ($fields.ContainsKey('commandCenter')) { $start['CommandCenter'] = $fields['commandCenter'] }
        if ($fields.ContainsKey('worker')) { $start['Worker'] = $fields['worker'] }
        if ($fields.ContainsKey('secondUnit')) { $start['SecondUnit'] = $fields['secondUnit'] }
        continue
    }

    if ($section -eq 'UNIT') {
        if (-not $fields.ContainsKey('type')) { continue }
        $type = [string]$fields['type']
        $copy = @{}
        foreach ($key in @($fields.Keys)) {
            if ($key -ne 'type') { $copy[$key] = $fields[$key] }
        }
        $units[$type] = $copy
        if ($copy.ContainsKey('structure') -and $copy['structure'] -eq 1) { $structures[$type] = $copy }
        continue
    }

    if ($section -eq 'PANEL') {
        foreach ($key in @($fields.Keys)) { $panel[$key] = $fields[$key] }
        continue
    }

    if ($section -eq 'BIOMASS') {
        foreach ($key in @($fields.Keys)) { $biomass[$key] = $fields[$key] }
        continue
    }
}

$result = [pscustomobject]@{
    Source = (Resolve-Path -LiteralPath $LogPath).Path
    Commander = $commander
    Map = $map
    Start = [pscustomobject]$start
    Units = [pscustomobject]$units
    Structures = [pscustomobject]$structures
    Panel = [pscustomobject]$panel
    Biomass = [pscustomobject]$biomass
    Raw = $raw.ToArray()
}

if ($AsJson) {
    $result | ConvertTo-Json -Depth 8
    exit 0
}

Write-Output 'Abathur debug log summary'
Write-Output '========================='
Write-Output "Source: $($result.Source)"
Write-Output "Commander: $($result.Commander)"
Write-Output "Map: $($result.Map)"
Write-Output "Start: commandCenter=$($result.Start.CommandCenter) worker=$($result.Start.Worker) secondUnit=$($result.Start.SecondUnit)"
Write-Output "Panel: caster=$($result.Panel.caster) exists=$($result.Panel.exists) buttons=$($result.Panel.buttons)"
Write-Output "Biomass: dropTrigger=$($result.Biomass.dropTrigger) pickupTrigger=$($result.Biomass.pickupTrigger) pickups=$($result.Biomass.pickups)"
Write-Output ''
Write-Output 'Units:'
foreach ($key in @($units.Keys)) {
    $unit = $units[$key]
    Write-Output "- $key count=$($unit['count']) minerals=$($unit['minerals']) gas=$($unit['gas']) supply=$($unit['supply']) hp=$($unit['hp']) armor=$($unit['armor']) structure=$($unit['structure'])"
}
