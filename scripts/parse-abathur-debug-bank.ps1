param(
    [string]$BankPath,
    [switch]$AsJson
)

$ErrorActionPreference = 'Stop'

function Get-BankValue {
    param($Key)
    $value = $Key.Value
    if (-not $value) { return $null }
    if ($null -ne $value.string) { return [string]$value.string }
    if ($null -ne $value.int) { return [int]$value.int }
    if ($null -ne $value.fixed) { return [double]$value.fixed }
    return $null
}

if (-not $BankPath) {
    $accounts = Join-Path $env:USERPROFILE 'Documents\StarCraft II\Accounts'
    $bank = Get-ChildItem -LiteralPath $accounts -Recurse -File -Filter 'XMAbathurDebug.SC2Bank' -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1
    if (-not $bank) { throw "XMAbathurDebug.SC2Bank not found under $accounts" }
    $BankPath = $bank.FullName
}

if (-not (Test-Path -LiteralPath $BankPath)) {
    throw "Bank file not found: $BankPath"
}

[xml]$xml = Get-Content -LiteralPath $BankPath -Raw
$result = [ordered]@{
    Source = (Resolve-Path -LiteralPath $BankPath).Path
    Start = [ordered]@{}
    Units = [ordered]@{}
    Structures = [ordered]@{}
    Panel = [ordered]@{}
    Biomass = [ordered]@{}
}

foreach ($section in $xml.Bank.Section) {
    $sectionName = [string]$section.name
    $target = [ordered]@{}
    foreach ($key in @($section.Key)) {
        $target[[string]$key.name] = Get-BankValue $key
    }

    if ($sectionName -eq 'Start') {
        $result.Start = $target
    }
    elseif ($sectionName -like 'Unit_*') {
        $unitType = $sectionName.Substring(5)
        $result.Units[$unitType] = $target
        if ($target.Contains('Structure') -and $target.Structure -eq 1) {
            $result.Structures[$unitType] = $target
        }
    }
    elseif ($sectionName -eq 'Panel') {
        $result.Panel = $target
    }
    elseif ($sectionName -eq 'Biomass') {
        $result.Biomass = $target
    }
}

$obj = [pscustomobject]$result
if ($AsJson) {
    $obj | ConvertTo-Json -Depth 8
    exit 0
}

Write-Output 'Abathur debug bank summary'
Write-Output '=========================='
Write-Output "Source: $($obj.Source)"
Write-Output "Commander: $($obj.Start.Commander)"
Write-Output "Map: $($obj.Start.Map)"
Write-Output "Start: commandCenter=$($obj.Start.CommandCenter) worker=$($obj.Start.Worker) secondUnit=$($obj.Start.SecondUnit)"
Write-Output "Panel: caster=$($obj.Panel.Caster) exists=$($obj.Panel.Exists) buttons=$($obj.Panel.Buttons)"
Write-Output "Biomass: dropTrigger=$($obj.Biomass.DropTrigger) pickupTrigger=$($obj.Biomass.PickupTrigger) pickups=$($obj.Biomass.Pickups)"
Write-Output ''
Write-Output 'Units:'
foreach ($unitType in @($result.Units.Keys)) {
    $unit = $result.Units[$unitType]
    Write-Output "- $unitType count=$($unit.Count) minerals=$($unit.Minerals) gas=$($unit.Gas) supply=$($unit.Supply) hp=$($unit.HP) structure=$($unit.Structure)"
}
