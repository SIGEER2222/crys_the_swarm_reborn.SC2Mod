# 阿巴瑟指挥官落地工作交接

生成时间：2026-05-22

## 目标

让合作指挥官版起义狂潮中的 `Abathur` 指挥官能够在任务图中真正落地，包括：

- Bank 中能被任务识别为当前指挥官；
- 标准基地图能创建 `Hatchery / Drone / Overlord`；
- 无基地剧情图不再落入默认兵种分支，而是有阿巴瑟专属开局单位；
- 后续可继续补面板、生物质机制和更多地图适配。

## 工作区和游戏目录

仓库根目录：

```text
C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo
```

主要工程目录：

```text
C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮
```

游戏目录：

```text
E:\SC2\SC2new\StarCraft II
```

SC2 Bank 实际目录：

```text
C:\Users\22448\Documents\StarCraft II\Banks
```

调试 Bank：

```text
C:\Users\22448\Documents\StarCraft II\Banks\XMAbathurDebug.SC2Bank
```

当前验证用的 Campaign Bank：

```text
C:\Users\22448\Documents\StarCraft II\Banks\CampaignXCore.SC2Bank
```

## 已修改文件

当前 `git diff --stat` 显示 5 个文件变更，共 130 行新增：

```text
合作指挥官版起义狂潮/Maps/XM/traynor01.SC2Map/MapScript.galaxy
合作指挥官版起义狂潮/Maps/XM/ttosh03b.SC2Map/MapScript.galaxy
合作指挥官版起义狂潮/Maps/XM/tvalerian01.SC2Map/MapScript.galaxy
合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146.galaxy
合作指挥官版起义狂潮/Mods/XM/XMFinal.SC2Mod/Base.SC2Data/LibE0EAE146_h.galaxy
```

## 全局库改动

文件：

```text
合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\LibE0EAE146.galaxy
合作指挥官版起义狂潮\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\LibE0EAE146_h.galaxy
```

### 新增诊断函数

新增了以下函数声明和实现：

```galaxy
void libE0EAE146_gf_AbathurDebugOutput (string lp_payload);
void libE0EAE146_gf_AbathurEarlySnapshot (string lp_phase);
void libE0EAE146_gf_AbathurDebugBankUnitType (bank lp_bank, string lp_unitType);
void libE0EAE146_gf_AbathurDebugUnitType (string lp_unitType);
void libE0EAE146_gf_AbathurDebugSnapshot ();
```

其中 `libE0EAE146_gf_AbathurEarlySnapshot` 目标是写 `XMAbathurDebug.SC2Bank`，记录：

- 当前阶段；
- 当前 Commander；
- 当前 Map；
- `CommanderAch` 中读到的 `CommandCenter / Worker / SecondUnit`。

当前最新版函数设计为多阶段累积写入：

- `Early/LastPhase`：最后阶段；
- `Phase_<phase>`：每个阶段一个 Section。

### 插入诊断点

已在 `libE0EAE146_gf_Initialize` 中读取 `CampaignXCore` 后调用：

```galaxy
libE0EAE146_gf_AbathurEarlySnapshot("Initialize");
```

已在 `libE0EAE146_gf_InitializeBase` 中补 Commander 读取兜底，并调用：

```galaxy
if ((libE0EAE146_gv_commander == "")) {
    libE0EAE146_gv_commander = BankValueGetAsString(BankLastCreated(), "Ach", "Commander");
}
libE0EAE146_gf_AbathurEarlySnapshot("InitializeBase");
```

已在阿巴瑟基地分支内调用：

```galaxy
libE0EAE146_gf_AbathurDebugSnapshot();
```

### 注意

曾经短暂加过“Commander 为空默认写成 Abathur”的逻辑，但已经回退。当前版本不会强制影响其他指挥官。

## 无基地剧情图改动

扫描结果显示，标准基地图多数走 `libE0EAE146_gf_InitializeBase`，真正需要单图补阿巴瑟分支的关键无基地剧情图是：

```text
traynor01.SC2Map
ttosh03b.SC2Map
tvalerian01.SC2Map
```

### traynor01

文件：

```text
合作指挥官版起义狂潮\Maps\XM\traynor01.SC2Map\MapScript.galaxy
```

位置：`gt_Init03Units_Func`，在 Stetmann 分支后新增：

```galaxy
else if (auto935BE165_val == "Abathur") {
    BankLoad("XMAbathurDebug", 1);
    BankValueSetFromString(BankLastCreated(), "MapLocal", "traynor01Init03Units", "1");
    BankSave(BankLastCreated());
    libE0EAE146_gf_AbathurEarlySnapshot("traynor01Init03Units");
    libNtve_gf_CreateUnitsWithDefaultFacing(2, "Hydralisk", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(55)));
    libNtve_gf_CreateUnitsWithDefaultFacing(4, "Zergling", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(56)));
    libNtve_gf_CreateUnitsWithDefaultFacing(1, "Queen", 0, gv_p7_MISSINGSOLDIERS, RegionGetCenter(RegionFromId(58)));
}
```

说明：

- `MapLocal/traynor01Init03Units` 是后来加的本地 Bank 标记，用来绕过疑似旧 `XMFinal` 库加载问题，直接确认地图脚本分支是否执行；
- 这一步尚未完成最终验证。

### ttosh03b

文件：

```text
合作指挥官版起义狂潮\Maps\XM\ttosh03b.SC2Map\MapScript.galaxy
```

位置：`gt_IntroSequence_Func`，在 Stetmann 分支后新增：

```galaxy
else if (auto2F29E444_val == "Abathur") {
    libNtve_gf_CreateUnitsWithDefaultFacing(1, "CoopCasterAbathur", c_unitCreateIgnorePlacement, 1, RegionGetBoundsMin(RegionEntireMap()));
    lib67C0F0E7_gf_CU_GPInit(1, "Abathur", UnitLastCreated(), null);
    lib67C0F0E7_gf_CU_GPShowHide(true, 1, c_transitionDurationDefault);
    libE0EAE146_gf_AbathurEarlySnapshot("ttosh03bInit03Units");
    libNtve_gf_CreateUnitsWithDefaultFacing(1, "Hydralisk", 0, 1, PointFromId(29));
    gv_nova = UnitLastCreated();
    libNtve_gf_CreateUnitsWithDefaultFacing(4, "Zergling", 0, 1, PointFromId(29));
    libNtve_gf_CreateUnitsWithDefaultFacing(2, "RoachVile", 0, 1, PointFromId(29));
}
```

说明：

- 该图原本类似 Nova/Tosh 英雄开局逻辑；
- 阿巴瑟分支创建 `CoopCasterAbathur` 并初始化全局面板；
- 使用 `Hydralisk / Zergling / RoachVile` 给玩家作为开局战斗单位。

### tvalerian01

文件：

```text
合作指挥官版起义狂潮\Maps\XM\tvalerian01.SC2Map\MapScript.galaxy
```

位置：`gt_Init03Units_Func`，在 Stetmann 分支后新增：

```galaxy
else if (auto412F2E68_val == "Abathur") {
    libE0EAE146_gf_AbathurEarlySnapshot("tvalerian01Init03Units");
    libNtve_gf_CreateUnitsWithDefaultFacing(4, "Hydralisk", 0, gv_p12_MOEBIUS, PointFromId(385406063));
    libNtve_gf_CreateUnitsWithDefaultFacing(2, "RoachVile", 0, gv_p12_MOEBIUS, PointFromId(855382681));
    libNtve_gf_CreateUnitsWithDefaultFacing(4, "Hydralisk", 0, gv_p12_MOEBIUS, PointFromId(898485624));
    libNtve_gf_CreateUnitsWithDefaultFacing(2, "Queen", 0, gv_p12_MOEBIUS, PointFromId(95514741));
    libNtve_gf_CreateUnitsWithDefaultFacing(4, "Zergling", 0, gv_p12_MOEBIUS, PointFromId(95514741));
    libNtve_gf_CreateUnitsWithDefaultFacing(2, "Hydralisk", 0, gv_p12_MOEBIUS, PointFromId(95514741));
    libNtve_gf_CreateUnitsWithDefaultFacing(4, "Zergling", 0, gv_p12_MOEBIUS, PointFromId(1089641768));
    libNtve_gf_CreateUnitsWithDefaultFacing(6, "Baneling", 0, gv_p12_MOEBIUS, PointFromId(1089641768));
    libNtve_gf_CreateUnitsWithDefaultFacing(3, "RoachVile", 0, gv_p12_MOEBIUS, PointFromId(665));
    libNtve_gf_CreateUnitsWithDefaultFacing(3, "Hydralisk", 0, gv_p12_MOEBIUS, PointFromId(344935602));
}
```

说明：

- 该图原逻辑是根据当前指挥官替换敌方/莫比斯阵容；
- 阿巴瑟分支采用虫族阵容替换 Stetmann 风格单位。

## 已做的验证

### 1. Campaign Bank 指挥官切换

已多次直接把：

```text
C:\Users\22448\Documents\StarCraft II\Banks\CampaignXCore.SC2Bank
```

中的：

```text
Ach / Commander
```

设置为：

```text
Abathur
```

验证命令类似：

```powershell
[xml]$xml=Get-Content -LiteralPath $bank -Raw
(($xml.Bank.Section | Where-Object { $_.name -eq 'Ach' }).Key | Where-Object { $_.name -eq 'Commander' }).Value.string
```

确认输出为：

```text
Abathur
```

### 2. 启动和点击流程

正确启动流程是：

```powershell
Start-Process -FilePath "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe" -ArgumentList '"E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map"' -WorkingDirectory "E:\SC2\SC2new\StarCraft II"
```

不要直接启动 `StarCraft II.exe`。

Launcher 第一张图点击坐标：

```text
x=275, y=205
```

这个点击会进入：

```text
XM/traynor01
```

### 3. 目前 Bank 验证结果

最近一次 `XMAbathurDebug.SC2Bank` 内容仍为旧结构：

```xml
<?xml version="1.0" encoding="utf-8"?>
<Bank version="1">
    <Section name="Early">
        <Key name="Commander">
            <Value string="Abathur"/>
        </Key>
        <Key name="CommandCenter">
            <Value string="Hatchery"/>
        </Key>
        <Key name="Phase">
            <Value string="Initialize"/>
        </Key>
        <Key name="Worker">
            <Value string="Drone"/>
        </Key>
        <Key name="Map">
            <Value string="XM/traynor01"/>
        </Key>
        <Key name="SecondUnit">
            <Value string="Overlord"/>
        </Key>
    </Section>
</Bank>
```

这说明：

- 当前任务图确实识别到了 `Commander=Abathur`；
- `CommanderAch` 数据能正确读出 `Hatchery / Drone / Overlord`；
- 但全局库里的新版多阶段诊断没有生效，Bank 仍是旧结构；
- 也尚未确认 `traynor01Init03Units` 分支是否执行到。

## 重要问题：疑似旧 XMFinal 库加载源

现象：

1. 工作区 `LibE0EAE146.galaxy` 已经改成多阶段 Bank：
   - 有 `Early/LastPhase`；
   - 有 `Phase_<phase>`；
2. 游戏目录：

```text
E:\SC2\SC2new\StarCraft II\Mods\XM\XMFinal.SC2Mod\Base.SC2Data\LibE0EAE146.galaxy
```

也确认包含新版代码：

```text
LastPhase
Phase_
```

3. 但是实际运行后 `XMAbathurDebug.SC2Bank` 仍写出旧结构：

```text
Early/Phase = Initialize
```

推断：

- `traynor01` 实际运行时可能仍加载了旧版 `LibE0EAE146`；
- 或 SC2 对 Mod 依赖使用了某个缓存/单文件包/其他源；
- 清理过部分缓存，但未解决。

已确认 `traynor01.DocumentInfo` 依赖如下：

```xml
<Dependencies>
    <Value>bnet:自由之翼剧情 (战役)/0.0/999,file:Campaigns/LibertyStory.SC2Campaign</Value>
    <Value>bnet:虚空之遗 (战役)/0.0/999,file:Campaigns/Void.SC2Campaign</Value>
    <Value>file:Mods\XM\XMFinal.SC2Mod</Value>
</Dependencies>
```

## 游戏目录同步注意事项

直接 `Copy-Item` 写 `E:\SC2...` 会被工具沙箱拒绝。

可用 `robocopy` 同步，例如：

```powershell
robocopy "C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Maps\XM\traynor01.SC2Map" "E:\SC2\SC2new\StarCraft II\Maps\XM\traynor01.SC2Map" MapScript.galaxy /IS /IT /R:1 /W:1 /NP
```

`robocopy` 返回码 `1` 通常表示复制成功，不是失败。

已确认游戏目录的 `traynor01` 脚本包含最新阿巴瑟分支：

```text
E:\SC2\SC2new\StarCraft II\Maps\XM\traynor01.SC2Map\MapScript.galaxy
```

其中包含：

```text
auto935BE165_val == "Abathur"
traynor01Init03Units
```

## 下一步建议

### 优先级 1：验证地图本地 Bank 标记

当前最后一步已经在工作区 `traynor01` 的阿巴瑟分支中加入本地 Bank 标记：

```galaxy
BankLoad("XMAbathurDebug", 1);
BankValueSetFromString(BankLastCreated(), "MapLocal", "traynor01Init03Units", "1");
BankSave(BankLastCreated());
```

但尚未完成同步和验证。

下一步应该：

1. 用 `robocopy /IS /IT` 强制同步 `traynor01.SC2Map\MapScript.galaxy` 到游戏目录；
2. 删除旧 `XMAbathurDebug.SC2Bank`；
3. 确认 `CampaignXCore.SC2Bank` 的 `Ach/Commander=Abathur`；
4. 用 `SC2Switcher_x64.exe` 启动 `Launcher.SC2Map`；
5. 点击第一张图坐标 `275,205`；
6. 等待一段时间，关闭 `SC2_x64`；
7. 读取 `XMAbathurDebug.SC2Bank`；
8. 如果出现：

```xml
<Section name="MapLocal">
    <Key name="traynor01Init03Units">
        <Value string="1"/>
    </Key>
</Section>
```

则说明 `traynor01` 的阿巴瑟开局兵分支实际执行成功。

### 优先级 2：解决旧 XMFinal 加载问题

如果本地标记写入成功，但全局 `Phase_Initialize` 仍不出现，则说明：

- 地图脚本新代码能运行；
- 但库脚本仍是旧版。

下一步应查：

- 是否存在被 SC2 加载的单文件 `XMFinal.SC2Mod`；
- 是否存在 MPQ/缓存中的旧 `LibE0EAE146.galaxy`；
- `SC2Switcher` 是否运行 `Versions\Base96883\SC2_x64.exe` 时从另一个工作目录解析 `file:Mods\XM\XMFinal.SC2Mod`。

可以搜索全盘旧版函数结构，特征是：

```text
BankValueSetFromString(lv_bank, "Early", "Phase", lp_phase)
```

当前新版本应为：

```text
BankValueSetFromString(lv_bank, "Early", "LastPhase", lp_phase)
BankValueSetFromString(lv_bank, lv_section, "Phase", lp_phase)
```

### 优先级 3：给 ttosh03b / tvalerian01 加本地标记

如果继续用本地 Bank 标记验证地图脚本分支，建议也给：

```text
ttosh03bInit03Units
tvalerian01Init03Units
```

加类似：

```galaxy
BankLoad("XMAbathurDebug", 1);
BankValueSetFromString(BankLastCreated(), "MapLocal", "ttosh03bInit03Units", "1");
BankSave(BankLastCreated());
```

这样即使旧 `XMFinal` 库未解决，也能确认单图阿巴瑟分支是否执行。

### 优先级 4：标准基地图验证

标准基地图目标是验证 `InitializeBase` 后是否真正落地：

- `Hatchery`；
- `Drone`；
- `Overlord`；
- `CoopCasterAbathur` 面板；
- 生物质触发器。

但这依赖全局 `LibE0EAE146` 新诊断函数真正加载。因此应先解决旧库加载问题，或者在某张标准基地图的地图脚本本地写 Bank 标记和单位计数。

## 当前状态总结

已经确认：

- `Abathur` 可以被 Campaign Bank 设置并被任务图读到；
- `CommanderAch` 数据返回 `Hatchery / Drone / Overlord`；
- 三张关键无基地剧情图已补阿巴瑟分支；
- `traynor01` 游戏目录脚本已确认包含阿巴瑟分支；
- 尚未完成 `MapLocal/traynor01Init03Units` 的最终运行验证；
- 全局 `XMFinal` 新诊断函数疑似未被实际加载，需要后续定位加载源。

## 不要做的事

- 不要直接启动 `StarCraft II.exe`；用户要求启动 `Launcher.SC2Map`。
- 正确方式是 `SC2Switcher_x64.exe + Launcher.SC2Map`。
- 不要假设 `XMAbathurDebug.SC2Bank` 在 `Accounts` 目录，它实际在：

```text
C:\Users\22448\Documents\StarCraft II\Banks\XMAbathurDebug.SC2Bank
```

## 推荐接手命令片段

设置 Commander：

```powershell
$bank='C:\Users\22448\Documents\StarCraft II\Banks\CampaignXCore.SC2Bank'
[xml]$xml=Get-Content -LiteralPath $bank -Raw
$key=(($xml.Bank.Section | Where-Object { $_.name -eq 'Ach' }).Key | Where-Object { $_.name -eq 'Commander' })
$key.Value.string='Abathur'
$xml.Save($bank)
```

同步 traynor01 单文件：

```powershell
robocopy "C:\Users\22448\Downloads\重生虫心0.71汉化版（新）\reborn_workrepo\合作指挥官版起义狂潮\Maps\XM\traynor01.SC2Map" "E:\SC2\SC2new\StarCraft II\Maps\XM\traynor01.SC2Map" MapScript.galaxy /IS /IT /R:1 /W:1 /NP
```

启动 Launcher：

```powershell
Start-Process -FilePath "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe" -ArgumentList '"E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map"' -WorkingDirectory "E:\SC2\SC2new\StarCraft II"
```

读取调试 Bank：

```powershell
Get-Content -LiteralPath "C:\Users\22448\Documents\StarCraft II\Banks\XMAbathurDebug.SC2Bank" -Raw
```
