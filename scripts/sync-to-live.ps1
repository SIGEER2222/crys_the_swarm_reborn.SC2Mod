param(
    [string]$SourceModPath = (Join-Path $PSScriptRoot "..\\crys_the_swarm_reborn.SC2Mod"),
    [string]$TargetModPath = "E:\\SC2\\SC2new\\StarCraft II\\Mods\\crys_the_swarm_reborn.SC2Mod"
)

$source = [System.IO.Path]::GetFullPath($SourceModPath)
$target = $TargetModPath

if (-not (Test-Path $source)) {
    throw "Source mod path not found: $source"
}

if (-not (Test-Path $target)) {
    throw "Target mod path not found: $target"
}

Write-Host "Sync source :" $source
Write-Host "Sync target :" $target

robocopy $source $target /E /R:1 /W:1 /NFL /NDL /NP /MT:8
$exitCode = $LASTEXITCODE

if ($exitCode -ge 8) {
    throw "robocopy failed with exit code $exitCode"
}

Write-Host "Sync completed."
