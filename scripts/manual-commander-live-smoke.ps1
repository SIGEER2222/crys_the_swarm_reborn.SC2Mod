param(
    [string[]]$Commanders = @(
        'Raynor',
        'Kerrigan',
        'Fenix',
        'Artanis',
        'Karax',
        'Vorazun',
        'Zagara',
        'Zeratul',
        'Abathur',
        'AbathurReborn',
        'Alarak'
    ),
    [string]$MapName = '自由日',
    [string]$MapFile = 'traynor01.SC2Map',
    [int]$LoadWaitSec = 55,
    [switch]$SyncLive = $true,
    [string]$Sc2Root = 'E:\SC2\SC2new\StarCraft II',
    [string]$WorkspaceRoot = '',
    [string]$OutputRoot = ''
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class Ui {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
  [DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);
  public const uint LEFTDOWN = 0x0002;
  public const uint LEFTUP = 0x0004;
  public const uint KEYUP = 0x0002;
}
"@

if ([string]::IsNullOrWhiteSpace($WorkspaceRoot)) {
    $WorkspaceRoot = Split-Path -Parent $PSScriptRoot
}
if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $OutputRoot = Join-Path $WorkspaceRoot 'tmp\manual-commander-live-smoke'
}
if (-not (Test-Path -LiteralPath $OutputRoot)) {
    New-Item -ItemType Directory -Force -Path $OutputRoot | Out-Null
}

$scenarioRoot = Join-Path $WorkspaceRoot '合作指挥官版起义狂潮'
$sourceModsRoot = Join-Path $scenarioRoot 'Mods\XM'
$sourceMapsRoot = Join-Path $scenarioRoot 'Maps\XM'
$liveModsRoot = Join-Path $Sc2Root 'Mods\XM'
$liveMapsRoot = Join-Path $Sc2Root 'Maps\XM'
$launcherPath = Join-Path $Sc2Root 'Support64\SC2Switcher_x64.exe'
$mapPath = Join-Path $Sc2Root ("Maps\XM\" + $MapFile)
$bankPath = Join-Path $env:USERPROFILE 'Documents\StarCraft II\Banks\CampaignXCore.SC2Bank'
$gameLogsRoot = Join-Path $env:USERPROFILE 'Documents\StarCraft II\GameLogs'

function Invoke-RoboCopy {
    param([string]$Source, [string]$Dest)
    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Missing source: $Source"
    }
    if (-not (Test-Path -LiteralPath $Dest)) {
        New-Item -ItemType Directory -Force -Path $Dest | Out-Null
    }
    $args = @($Source, $Dest, '/E', '/NFL', '/NDL', '/NJH', '/NJS', '/NP', '/R:1', '/W:1')
    & robocopy @args | Out-Null
    if ($LASTEXITCODE -ge 8) {
        throw "Robocopy failed with exit code $LASTEXITCODE for $Source -> $Dest"
    }
}

function Sync-LiveContent {
    Invoke-RoboCopy -Source $sourceModsRoot -Dest $liveModsRoot
    Invoke-RoboCopy -Source $sourceMapsRoot -Dest $liveMapsRoot
}

function Stop-Sc2 {
    Stop-Process -Name 'SC2_x64' -Force -ErrorAction SilentlyContinue
    Stop-Process -Name 'SC2Switcher_x64' -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

function Start-DirectMap {
    Stop-Sc2
    if (-not (Test-Path -LiteralPath $mapPath)) {
        throw "Map file not found: $mapPath"
    }
    & $launcherPath $mapPath
}

function Get-Sc2Process {
    Get-Process SC2_x64 -ErrorAction SilentlyContinue | Select-Object -First 1
}

function Wait-Sc2Window {
    param([int]$TimeoutSec = 120)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $proc = Get-Sc2Process
        if ($proc -and $proc.MainWindowHandle -ne 0) {
            $rect = New-Object Ui+RECT
            if ([Ui]::GetWindowRect([IntPtr]$proc.MainWindowHandle, [ref]$rect)) {
                if ((($rect.Right - $rect.Left) -ge 1000) -and (($rect.Bottom - $rect.Top) -ge 700)) {
                    return $proc
                }
            }
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)
    throw 'SC2 window did not become ready.'
}

function Focus-Sc2Window {
    param([System.Diagnostics.Process]$Process)
    $hwnd = [IntPtr]$Process.MainWindowHandle
    [Ui]::ShowWindowAsync($hwnd, 9) | Out-Null
    Start-Sleep -Milliseconds 200
    [Ui]::BringWindowToTop($hwnd) | Out-Null
    [Ui]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 400
    $rect = New-Object Ui+RECT
    [Ui]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
    return $rect
}

function Click-At {
    param([int]$X, [int]$Y, [int]$DelayMs = 350)
    [Ui]::SetCursorPos($X, $Y) | Out-Null
    Start-Sleep -Milliseconds 60
    [Ui]::mouse_event([Ui]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 40
    [Ui]::mouse_event([Ui]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds $DelayMs
}

function DoubleClick-At {
    param([int]$X, [int]$Y, [int]$DelayMs = 350)
    Click-At -X $X -Y $Y -DelayMs 100
    Click-At -X $X -Y $Y -DelayMs $DelayMs
}

function Press-Key {
    param([byte]$VirtualKey)
    [Ui]::keybd_event($VirtualKey, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 50
    [Ui]::keybd_event($VirtualKey, 0, [Ui]::KEYUP, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 250
}

function Press-Escape {
    Press-Key -VirtualKey 0x1B
}

function Save-Screenshot {
    param([string]$Name, [Ui+RECT]$Rect)
    $w = $Rect.Right - $Rect.Left
    $h = $Rect.Bottom - $Rect.Top
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen(
        [System.Drawing.Point]::new($Rect.Left, $Rect.Top),
        [System.Drawing.Point]::Empty,
        [System.Drawing.Size]::new($w, $h)
    )
    $path = Join-Path $OutputRoot ("{0}_{1}.png" -f $Name, (Get-Date -Format 'yyyyMMdd-HHmmss'))
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    return $path
}

function Get-BankDoc {
    if (-not (Test-Path -LiteralPath $bankPath)) {
        throw "Bank file not found: $bankPath"
    }
    $xml = New-Object System.Xml.XmlDocument
    $xml.PreserveWhitespace = $true
    $xml.Load($bankPath)
    return $xml
}

function Backup-BankFile {
    $backup = Join-Path $OutputRoot ("CampaignXCore.SC2Bank.backup_{0}" -f (Get-Date -Format 'yyyyMMdd-HHmmss'))
    Copy-Item -LiteralPath $bankPath -Destination $backup -Force
    return $backup
}

function Get-BankCommander {
    $xml = Get-BankDoc
    $value = $xml.SelectSingleNode('/Bank/Section[@name="Ach"]/Key[@name="Commander"]/Value')
    if (-not $value) {
        return $null
    }
    return $value.GetAttribute('string')
}

function Set-BankCommander {
    param([string]$Commander)
    $xml = Get-BankDoc
    $value = $xml.SelectSingleNode('/Bank/Section[@name="Ach"]/Key[@name="Commander"]/Value')
    if (-not $value) {
        throw 'Commander value node not found in bank.'
    }
    $value.SetAttribute('string', $Commander)
    $settings = New-Object System.Xml.XmlWriterSettings
    $settings.Encoding = New-Object System.Text.UTF8Encoding($false)
    $settings.Indent = $true
    $settings.IndentChars = '    '
    $settings.NewLineChars = "`r`n"
    $settings.NewLineHandling = [System.Xml.NewLineHandling]::Replace
    $writer = [System.Xml.XmlWriter]::Create($bankPath, $settings)
    $xml.Save($writer)
    $writer.Close()
}

function Wait-BankCommander {
    param([string]$Expected, [int]$TimeoutSec = 5)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    do {
        $actual = Get-BankCommander
        if ($actual -eq $Expected) {
            return $actual
        }
        Start-Sleep -Milliseconds 250
    } while ((Get-Date) -lt $deadline)
    throw "Bank commander mismatch. expected=$Expected actual=$(Get-BankCommander)"
}

function Get-BaseClickPoint {
    param([Ui+RECT]$Rect)
    $width = $Rect.Right - $Rect.Left
    $height = $Rect.Bottom - $Rect.Top
    return @(
        [int]($Rect.Left + ($width * 0.49)),
        [int]($Rect.Top + ($height * 0.63))
    )
}

function Get-WorkerClickPoint {
    param([Ui+RECT]$Rect)
    $width = $Rect.Right - $Rect.Left
    $height = $Rect.Bottom - $Rect.Top
    return @(
        [int]($Rect.Left + ($width * 0.59)),
        [int]($Rect.Top + ($height * 0.67))
    )
}

function Get-LatestLogFiles {
    param([datetime]$Since)
    if (-not (Test-Path -LiteralPath $gameLogsRoot)) {
        return @()
    }
    return @(Get-ChildItem -LiteralPath $gameLogsRoot -File |
        Where-Object { $_.LastWriteTime -ge $Since.AddSeconds(-2) } |
        Sort-Object LastWriteTime)
}

function Get-RecentAlertSummary {
    param([datetime]$Since)
    $alerts = Get-LatestLogFiles -Since $Since | Where-Object { $_.Name -like '*Alerts.txt' } | Select-Object -Last 1
    if (-not $alerts) {
        return ''
    }
    $lines = Get-Content -LiteralPath $alerts.FullName -ErrorAction SilentlyContinue |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    return (($lines | Select-Object -Last 8) -join ' | ')
}

function Get-RecentScriptErrorSummary {
    param([datetime]$Since)
    $matches = Get-LatestLogFiles -Since $Since | Where-Object { $_.Name -match 'ScriptError|Errors' }
    if (-not $matches) {
        return ''
    }
    $chunks = foreach ($file in $matches) {
        $tail = (Get-Content -LiteralPath $file.FullName -ErrorAction SilentlyContinue | Select-Object -Last 5) -join ' | '
        if (-not [string]::IsNullOrWhiteSpace($tail)) {
            '{0}: {1}' -f $file.Name, $tail
        }
    }
    return ($chunks -join ' || ')
}

function Capture-InGameEvidence {
    param(
        [string]$Commander,
        [System.Diagnostics.Process]$Process
    )
    $rect = Focus-Sc2Window -Process $Process
    $overviewShot = Save-Screenshot -Name ($Commander + '_overview') -Rect $rect
    $basePt = Get-BaseClickPoint -Rect $rect
    DoubleClick-At -X $basePt[0] -Y $basePt[1] -DelayMs 900
    $rect = Focus-Sc2Window -Process (Get-Sc2Process)
    $baseShot = Save-Screenshot -Name ($Commander + '_base') -Rect $rect
    $workerPt = Get-WorkerClickPoint -Rect $rect
    DoubleClick-At -X $workerPt[0] -Y $workerPt[1] -DelayMs 900
    $rect = Focus-Sc2Window -Process (Get-Sc2Process)
    $workerShot = Save-Screenshot -Name ($Commander + '_worker') -Rect $rect
    return @{
        Overview = $overviewShot
        Base = $baseShot
        Worker = $workerShot
    }
}

if ($SyncLive) {
    Sync-LiveContent
}

$bankBackup = Backup-BankFile
$summary = New-Object System.Collections.Generic.List[string]
$summary.Add("# Manual Commander Live Smoke")
$summary.Add("Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$summary.Add("Map: $MapName")
$summary.Add("MapFile: $MapFile")
$summary.Add("Bank: $bankPath")
$summary.Add("BankBackup: $bankBackup")
$summary.Add("")

foreach ($commander in $Commanders) {
    $start = Get-Date
    $summary.Add("## $commander")

    Set-BankCommander -Commander $commander
    $bankCommander = Wait-BankCommander -Expected $commander

    Start-DirectMap
    $proc = Wait-Sc2Window
    for ($i = 0; $i -lt 8; $i++) {
        Press-Escape
    }
    Start-Sleep -Seconds $LoadWaitSec

    $evidence = Capture-InGameEvidence -Commander $commander -Process (Get-Sc2Process)
    $alerts = Get-RecentAlertSummary -Since $start
    $errors = Get-RecentScriptErrorSummary -Since $start

    $summary.Add("- bank commander: $bankCommander")
    $summary.Add("- overview screenshot: $($evidence.Overview)")
    $summary.Add("- base screenshot: $($evidence.Base)")
    $summary.Add("- worker screenshot: $($evidence.Worker)")
    $summary.Add("- alerts tail: $alerts")
    $summary.Add("- script error tail: $errors")
    $summary.Add("- notes: visual review should confirm commander-specific base, worker, and early units/buildings.")

    Stop-Sc2
    $summary.Add("- elapsed: $([int]((Get-Date) - $start).TotalSeconds)s")
    $summary.Add("")
}

$reportPath = Join-Path $OutputRoot ("report_{0}.md" -f (Get-Date -Format 'yyyyMMdd-HHmmss'))
$summary | Set-Content -LiteralPath $reportPath -Encoding UTF8
Write-Output "REPORT=$reportPath"
