param(
    [string]$Root = '',
    [int]$MaxLines = 1000,
    [string[]]$Extensions = @('.galaxy')
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($Root)) {
    $repoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\..')
    $scenarioRoots = @(Get-ChildItem -LiteralPath $repoRoot.Path -Directory | Where-Object {
            (Test-Path -LiteralPath (Join-Path $_.FullName ([System.IO.Path]::Combine('Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data')))) -and
            (Test-Path -LiteralPath (Join-Path $_.FullName ([System.IO.Path]::Combine('Maps', 'XM', 'CommanderTestBench.SC2Map'))))
        })

    if ($scenarioRoots.Count -eq 0) {
        $scenarioRoots = @(Get-ChildItem -LiteralPath $repoRoot.Path -Directory | Where-Object {
                Test-Path -LiteralPath (Join-Path $_.FullName ([System.IO.Path]::Combine('Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data')))
            })
    }

    if ($scenarioRoots.Count -eq 0) {
        throw "Could not locate XMFinal.SC2Mod under top-level scenario directories. Pass -Root explicitly."
    }

    $scenarioRoot = $scenarioRoots | Sort-Object @{ Expression = { $_.Name.Length } }, Name | Select-Object -First 1
    $Root = Join-Path $scenarioRoot.FullName ([System.IO.Path]::Combine('Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data'))
}

$resolvedRoot = (Resolve-Path -LiteralPath $Root).Path
$normalizedExtensions = $Extensions | ForEach-Object {
    if ($_.StartsWith('.')) {
        $_
    }
    else {
        ".$_"
    }
}

$files = Get-ChildItem -LiteralPath $resolvedRoot -Recurse -File |
    Where-Object { $normalizedExtensions -contains $_.Extension } |
    Sort-Object FullName

$results = foreach ($file in $files) {
    [pscustomobject]@{
        Lines = [System.IO.File]::ReadAllLines($file.FullName).Length
        File = $file.FullName.Substring($resolvedRoot.Length).TrimStart('\', '/')
    }
}

Write-Host ("Checked {0} file(s) under {1}. Limit: {2} lines." -f $results.Count, $resolvedRoot, $MaxLines)
$results |
    Sort-Object -Property @{Expression = 'Lines'; Descending = $true}, @{Expression = 'File'; Ascending = $true} |
    Format-Table -AutoSize

$violations = @($results | Where-Object { $_.Lines -gt $MaxLines })
if ($violations.Count -gt 0) {
    Write-Host ''
    Write-Host 'Line-limit violations:' -ForegroundColor Red
    $violations |
        Sort-Object -Property @{Expression = 'Lines'; Descending = $true}, @{Expression = 'File'; Ascending = $true} |
        Format-Table -AutoSize
    exit 1
}

Write-Host 'Line-limit check passed.'
