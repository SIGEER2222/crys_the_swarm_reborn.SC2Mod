param(
    [string]$LogPath = "tools\abathur_debug_sample.log"
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $LogPath)) {
    throw "Log file not found: $LogPath"
}

$result = & "$PSScriptRoot\parse-abathur-debug-log.ps1" -LogPath $LogPath -AsJson | ConvertFrom-Json

if ($result.Commander -ne 'Abathur') {
    throw "Expected Commander=Abathur, got $($result.Commander)"
}

if ($result.Start.CommandCenter -ne 'Hatchery') {
    throw "Expected CommandCenter=Hatchery, got $($result.Start.CommandCenter)"
}

if ($result.Start.Worker -ne 'Drone') {
    throw "Expected Worker=Drone, got $($result.Start.Worker)"
}

if ($result.Start.SecondUnit -ne 'Overlord') {
    throw "Expected SecondUnit=Overlord, got $($result.Start.SecondUnit)"
}

if ($result.Units.Hatchery.count -ne 1) {
    throw "Expected Hatchery count=1, got $($result.Units.Hatchery.count)"
}

if ($result.Units.Drone.count -ne 6) {
    throw "Expected Drone count=6, got $($result.Units.Drone.count)"
}

if ($result.Panel.exists -ne 1) {
    throw "Expected panel exists=1, got $($result.Panel.exists)"
}

if ($result.Biomass.dropTrigger -ne 1) {
    throw "Expected biomass dropTrigger=1, got $($result.Biomass.dropTrigger)"
}

if ($result.Biomass.pickupTrigger -ne 1) {
    throw "Expected biomass pickupTrigger=1, got $($result.Biomass.pickupTrigger)"
}

'OK parse-abathur-debug-log sample test passed'
