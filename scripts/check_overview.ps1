$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$path = Join-Path $repo "docs\Commander docs\Commander docs status-2026-05-23.md"
Write-Host "Trying: $path"
if (Test-Path $path) { Write-Host "Found at repo" } else {
    $path = Join-Path $repo "docs\zh-hans\Commander docs status-2026-05-23.md"
    Write-Host "Trying alt: $path"
}
