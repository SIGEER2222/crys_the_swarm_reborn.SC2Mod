param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [switch]$RequireLauncherCandidate,
    [switch]$RequireXMFinalDependency
)

& (Join-Path $PSScriptRoot "validate-coop-commander-current.ps1") `
    -WorkspaceRoot $WorkspaceRoot `
    -Commander "Zagara" `
    -RequireLauncherCandidate:$RequireLauncherCandidate `
    -RequireXMFinalDependency:$RequireXMFinalDependency
