param(
    [string]$Root = (Join-Path $PSScriptRoot '..\..\原始mod\Mods\XM\XMFinal.SC2Mod\Base.SC2Data'),
    [int]$MaxLines = 1000,
    [string[]]$Extensions = @('.galaxy')
)

$ErrorActionPreference = 'Stop'

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
