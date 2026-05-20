param(
    [Parameter(Position = 0)]
    [string]$Command = "help",

    [string]$Id,
    [string]$Patch,
    [string]$ModRoot,
    [switch]$WhatIf
)

$ErrorActionPreference = "Stop"

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if ([string]::IsNullOrWhiteSpace($ModRoot)) {
    $ModRoot = Join-Path $scriptRoot "..\crys_the_swarm_reborn.SC2Mod"
}

$projectPath = Join-Path $scriptRoot "..\tools\Sc2ModTool\Sc2ModTool.csproj"
if (-not (Test-Path $projectPath)) {
    throw "Tool project not found: $projectPath"
}

$argList = @("run", "--project", $projectPath, "--", $Command, "--mod-root", $ModRoot)

switch ($Command.ToLowerInvariant()) {
    "find" {
        if ([string]::IsNullOrWhiteSpace($Id)) {
            throw "find requires -Id."
        }
        $argList += @("--id", $Id)
    }
    "apply" {
        if ([string]::IsNullOrWhiteSpace($Patch)) {
            throw "apply requires -Patch."
        }
        $argList += @("--patch", $Patch)
        if ($WhatIf) {
            $argList += "--what-if"
        }
    }
    "help" {
    }
    default {
        throw "Unknown command: $Command. Supported: find / apply / help"
    }
}

& dotnet @argList
