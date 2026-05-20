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

$projectDir = Split-Path -Parent $projectPath
$dllPath = Join-Path $projectDir "bin\Debug\net9.0\Sc2ModTool.dll"

$needsBuild = $true
if (Test-Path $dllPath) {
    $dllTime = (Get-Item -LiteralPath $dllPath).LastWriteTimeUtc
    $latestSourceTime = (Get-ChildItem -LiteralPath $projectDir -Recurse -File | Where-Object {
        $_.Extension -in ".cs", ".csproj" -and
        $_.FullName -notmatch '\\bin\\' -and
        $_.FullName -notmatch '\\obj\\'
    } | Measure-Object -Property LastWriteTimeUtc -Maximum).Maximum

    if ($null -ne $latestSourceTime -and $dllTime -ge $latestSourceTime) {
        $needsBuild = $false
    }
}

if ($needsBuild) {
    & dotnet build $projectPath --nologo
    if ($LASTEXITCODE -ne 0) {
        throw "dotnet build failed."
    }
}

$argList = @($dllPath, $Command, "--mod-root", $ModRoot)

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
