param(
    [string]$Commander = "Alarak",
    [string]$BankPath = "$env:USERPROFILE\Documents\StarCraft II\Banks\CampaignXCore.SC2Bank",
    [switch]$CreateIfMissing = $true,
    [switch]$Backup = $true
)

$ErrorActionPreference = "Stop"

function New-BankDocument {
    $doc = New-Object System.Xml.XmlDocument
    $decl = $doc.CreateXmlDeclaration("1.0", "utf-8", $null)
    [void]$doc.AppendChild($decl)
    $bank = $doc.CreateElement("Bank")
    [void]$bank.SetAttribute("version", "1")
    [void]$doc.AppendChild($bank)
    return $doc
}

if ((-not (Test-Path -LiteralPath $BankPath)) -and (-not $CreateIfMissing)) {
    throw "Bank file not found: $BankPath"
}

if (Test-Path -LiteralPath $BankPath) {
    [xml]$doc = Get-Content -LiteralPath $BankPath -Raw
}
else {
    $dir = Split-Path -Parent $BankPath
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    $doc = New-BankDocument
}

$bankNode = $doc.Bank
if (-not $bankNode) {
    throw "Invalid bank format: missing <Bank> root in $BankPath"
}

if ($Backup -and (Test-Path -LiteralPath $BankPath)) {
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    Copy-Item -LiteralPath $BankPath -Destination "$BankPath.$stamp.bak" -Force
}

$section = $bankNode.SelectSingleNode("Section[@name='Ach']")
if (-not $section) {
    $section = $doc.CreateElement("Section")
    [void]$section.SetAttribute("name", "Ach")
    [void]$bankNode.AppendChild($section)
}

$key = $section.SelectSingleNode("Key[@name='Commander']")
if (-not $key) {
    $key = $doc.CreateElement("Key")
    [void]$key.SetAttribute("name", "Commander")
    [void]$section.AppendChild($key)
}

$value = $key.SelectSingleNode("Value")
if (-not $value) {
    $value = $doc.CreateElement("Value")
    [void]$key.AppendChild($value)
}

while ($value.Attributes.Count -gt 0) {
    [void]$value.RemoveAttributeAt(0)
}
[void]$value.SetAttribute("string", $Commander)

$settings = New-Object System.Xml.XmlWriterSettings
$settings.Encoding = New-Object System.Text.UTF8Encoding($false)
$settings.Indent = $true
$settings.NewLineChars = "`r`n"
$settings.NewLineHandling = [System.Xml.NewLineHandling]::Replace
$writer = [System.Xml.XmlWriter]::Create($BankPath, $settings)
$doc.Save($writer)
$writer.Dispose()

Write-Output "BANK_PATH=$BankPath"
Write-Output "COMMANDER=$Commander"
