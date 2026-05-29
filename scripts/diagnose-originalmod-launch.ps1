param(
    [string]$LiveRoot = "E:\SC2\SC2new\StarCraft II",
    [string]$OutputRoot = ""
)

$ErrorActionPreference = "Stop"

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $OutputRoot = Join-Path (Split-Path -Parent $PSScriptRoot) "tmp\launch-diagnostics"
}

Ensure-Directory -Path $OutputRoot

$switcher = Join-Path $LiveRoot "Support64\SC2Switcher_x64.exe"
$launcherMap = Join-Path $LiveRoot "Maps\XM\Launcher.SC2Map"
$testBenchMap = Join-Path $LiveRoot "Maps\XM\CommanderTestBench.SC2Map"
$variablesPath = Join-Path $env:USERPROFILE "Documents\StarCraft II\Variables.txt"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportPath = Join-Path $OutputRoot ("launch-diagnostics-{0}.md" -f $timestamp)

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# Originalmod Launch Diagnostics")
$lines.Add("")
$lines.Add(("generated_at={0}" -f (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")))
$lines.Add(("switcher={0}" -f $switcher))
$lines.Add(("launcher_map={0}" -f $launcherMap))
$lines.Add(("testbench_map={0}" -f $testBenchMap))
$lines.Add(("variables_txt={0}" -f $variablesPath))
$lines.Add("")

foreach ($path in @($switcher, $launcherMap, $testBenchMap, $variablesPath)) {
    $exists = Test-Path -LiteralPath $path
    $lines.Add(("{0} exists={1}" -f $path, $exists))
}

$cases = @(
    @{ Name = "direct_testbench"; Args = @($testBenchMap) },
    @{ Name = "launcher_map"; Args = @($launcherMap) }
)

foreach ($case in $cases) {
    Get-Process -Name "SC2_x64" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Get-Process -Name "SC2Switcher_x64" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2

    $lines.Add("")
    $lines.Add(("## {0}" -f $case.Name))
    $lines.Add(("args={0}" -f ($case.Args -join " | ")))

    $proc = Start-Process -FilePath $switcher -ArgumentList $case.Args -PassThru
    Start-Sleep -Seconds 5

    $alive = Get-Process -Id $proc.Id -ErrorAction SilentlyContinue
    if ($alive) {
        $lines.Add(("alive=1 pid={0} title={1}" -f $alive.Id, $alive.MainWindowTitle))
    }
    else {
        $proc.WaitForExit()
        $lines.Add(("alive=0 exit_code={0}" -f $proc.ExitCode))
    }

    $sc2 = Get-Process | Where-Object { $_.ProcessName -like "SC2*" } | Select-Object ProcessName, Id, MainWindowTitle
    if ($sc2) {
        $lines.Add("child_processes:")
        foreach ($item in $sc2) {
            $lines.Add(("- {0} id={1} title={2}" -f $item.ProcessName, $item.Id, $item.MainWindowTitle))
        }
    }
    else {
        $lines.Add("child_processes: none")
    }
}

Set-Content -LiteralPath $reportPath -Value $lines -Encoding UTF8
Write-Output $reportPath
