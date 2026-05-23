
$source = "c:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Mods\XM\XMKarax.SC2Mod"
$targets = @("XMZagara.SC2Mod", "XMVorazun.SC2Mod", "XMZeratul.SC2Mod")

foreach ($target in $targets) {
    $dest = Join-Path (Split-Path -Parent $source) $target
    
    # Copy base files
    Copy-Item -Path "$source\DocumentHeader" -Destination "$dest\" -Force
    Copy-Item -Path "$source\GameData.version" -Destination "$dest\" -Force
    Copy-Item -Path "$source\GameText.version" -Destination "$dest\" -Force
    Copy-Item -Path "$source\PreloadAssetDB.txt" -Destination "$dest\" -Force
    Copy-Item -Path "$source\Triggers.version" -Destination "$dest\" -Force
    
    # Create directories
    New-Item -ItemType Directory -Path "$dest\Base.SC2Data\GameData" -Force | Out-Null
    New-Item -ItemType Directory -Path "$dest\zhCN.SC2Data\LocalizedData" -Force | Out-Null
    
    # Create DocumentInfo
    $docInfo = @"
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;DocInfo&gt;
    &lt;Dependencies&gt;
        &lt;Value&gt;file:Mods\XM\XMCore.SC2Mod&lt;/Value&gt;
    &lt;/Dependencies&gt;
&lt;/DocInfo&gt;
"@
    $docInfo | Set-Content -Path "$dest\DocumentInfo" -Encoding UTF8
    
    Write-Host "Created base structure for $target"
}
