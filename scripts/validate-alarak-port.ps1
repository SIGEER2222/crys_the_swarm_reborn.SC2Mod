param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [switch]$RequireLauncherCandidate
)

& (Join-Path $PSScriptRoot "validate-alarak-port-fixed.ps1") `
    -WorkspaceRoot $WorkspaceRoot `
    -RequireLauncherCandidate:$RequireLauncherCandidate
