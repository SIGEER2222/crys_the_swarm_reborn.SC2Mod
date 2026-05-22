param(
    [string]$BankPath = 'tools\XMAbathurDebug.sample.SC2Bank'
)

$ErrorActionPreference = 'Stop'

$result = & "$PSScriptRoot\parse-abathur-debug-bank.ps1" -BankPath $BankPath -AsJson | ConvertFrom-Json

if ($result.Start.Commander -ne 'Abathur') { throw "Expected Commander Abathur" }
if ($result.Start.CommandCenter -ne 'Hatchery') { throw "Expected CommandCenter Hatchery" }
if ($result.Start.Worker -ne 'Drone') { throw "Expected Worker Drone" }
if ($result.Start.SecondUnit -ne 'Overlord') { throw "Expected SecondUnit Overlord" }
if ($result.Units.Hatchery.Count -ne 1) { throw "Expected Hatchery count 1" }
if ($result.Units.Drone.Count -ne 6) { throw "Expected Drone count 6" }
if ($result.Panel.Exists -ne 1) { throw "Expected Panel Exists 1" }
if ($result.Biomass.DropTrigger -ne 1) { throw "Expected Biomass DropTrigger 1" }

'OK parse-abathur-debug-bank sample test passed'
