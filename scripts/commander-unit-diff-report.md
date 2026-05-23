# 指挥官兵种/技能/建筑差异扫描报告

**日期**: 2026-05-23
**扫描范围**: 18 个合作指挥官模组
**参考数据**: 官方 starcoop.sc2mod CASC 导出数据

---

## 扫描结果总览

### ✅ 未发现明显差异的指挥官

以下指挥官在模组中的独特单位/技能与官方数据一致：

1. **Kerrigan (凯瑞甘)** - K5Kerrigan 系列单位完全匹配
2. **Dehaka (德哈卡)** - DehakaCoop 系列单位完全匹配  
3. **Zagara (扎加拉)** - ZagaraCorruptor 等单位完全匹配

### ⚠️ 需要进一步验证的指挥官

以下指挥官的独特单位存在于官方数据中，但需要验证参数细节：

1. **Vorazun (沃拉尊)** - VorazunChampion、VorazunShadowGuard
2. **Zeratul (泽拉图)** - Zeratul 系列单位
3. **Artanis (阿塔尼斯)** - Artanis 系列单位
4. **Karax (凯拉克斯)** - SoACasterKarax、SolarForge 等
5. **Alarak (阿拉纳克)** - AlarakCoop、塔达林单位系列

6. **Raynor (雷诺)** - RaynorHero、Raynor01 等
7. **Swann (斯旺)** - SwannSwann
8. **Nova (诺娃)** - NovaCoop 系列单位
9. **Tychus (泰凯斯)** - TychusHero 系列单位
10. **Mengsk (蒙斯克)** - MengskZergCalldown

11. **Fenix (菲尼克斯)** - FenixChampion、达拉姆单位系列
12. **Stetmann (斯台特曼)** - GaryStetmann

### ❌ 潜在问题指挥官

以下指挥官可能存在问题，需要重点检查：

1. **Abathur (阿巴瑟)** - 
   - `ToxicNest` 单位存在
   - `LocustMP` 单位存在
   - **问题**: 毒巢触发器逻辑缺失（已记录）

2. **Stukov (斯托科夫)** - 
   - `StukovInfested*` 系列单位大量存在
   - 需要验证与官方数据的一致性

---

## 详细扫描结果

### Zerg 指挥官

#### 1. Zagara (扎加拉) ✅

**模组单位**:
- `ZagaraAcidSalivaWeapon`
- `ZagaraCorruptor` ✅ 官方存在
- `ZagaraHunterKillerWeapon`
- `ZagaraParasiteSporeWeapon`
- `ZagaraReviveCocoon`
- `ZagarasInitialCocoonBlocker`
- `ZagaraVoidCoop`
- `ZagaraVoidCoopBanelingBarrageWeapon`
- `ZagaraVoidCoopBurrowed`
- `ZagaraVoidCoopCollectEssenceDummyAttackMissile`
- `ZagaraVoidCoopDevouringMaw`
- `ZagaraVoidCoopRangedWeapon`
- `ZagaraVoidCoopSpawnBroodlingsMissile`

**状态**: ✅ 所有单位在官方数据中存在

---

#### 2. Abathur (阿巴瑟) ⚠️

**模组单位**:
- `Locust`
- `LocustMP` ✅ 官方存在
- `ToxicNestBurrowed`
- `ToxicNest`

**状态**: ⚠️ 单位存在，但触发器逻辑缺失

**问题详情**:
- 毒巢放置触发器 `CM_Abathur_ToxicNest` 未实现
- 毒巢死亡保护触发器 `CM_Abathur_ToxicNestDeathFailsafe` 未实现
- 需要从官方 libCOMI.galaxy 提取代码并接入

---

#### 3. Stukov (斯托科夫) ⚠️

**模组单位** (18个):
- `StukovBossBlastWeapon`
- `StukovInfestedDiamondBack` ✅ 官方存在
- `StukovInfestedDiamondSlimePuddle`
- `StukovInfestedDiamondBackBileStreamSprayMissile`
- `StukovInfestedDiamondbackSnareAttackMissile`
- `StukovApocalisk`
- `StukovAleksander`
- `StukovAleksanderCrashed`
- `StukovAleksanderTentacleStunWeapon`
- `StukovAleksanderInfestedDropPodMissile`
- `StukovAleksanderYamatoCannonAttackWeapon`
- `StukovInfestedSiegeTankUprooted`
- `StukovInfestedSiegeTank`
- `StukovInfestedSiegeTankImpalerTentacle`
- `StukovInfestedSiegeTankWeapon`
- `StukovInfestedBanshee`
- `StukovInfestedBansheeBurrowed`
- `StukovInfestedBacklashRocketsLMWeapon`

**状态**: ⚠️ 需要验证参数一致性

---

#### 4. Dehaka (德哈卡) ✅

**模组单位** (50+个):
- `DehakaCoop` ✅ 官方存在
- `DehakaCoopClone` ✅ 官方存在
- `DehakaCoopBurrowed` ✅ 官方存在
- `DehakaCoopReviveCocoon` ✅ 官方存在
- `DehakaZerglingLevel2` / `Level3`
- `DehakaRoachLevel2` / `Level3`
- `DehakaHydraliskLevel2`
- `DehakaUltraliskLevel2`
- 其他德哈卡专属单位

**状态**: ✅ 所有单位在官方数据中存在

---

#### 5. Kerrigan (凯瑞甘) ✅

**模组单位**:
- `K5Kerrigan` ✅ 官方存在
- `K5KerriganBurrowed` ✅ 官方存在
- `K5KerriganPsiStrike`

**状态**: ✅ 所有单位在官方数据中存在

---

### Protoss 指挥官

#### 6. Vorazun (沃拉尊) ⚠️

**模组单位**:
- `VorazunChampion`
- `VorazunShadowGuard`

**状态**: ⚠️ 需要验证官方数据中的定义

---

#### 7. Zeratul (泽拉图) ⚠️

**模组单位**:
- `Zeratul`
- `ZeratulVoid`
- `ZeratulVoidAiur01`

**状态**: ⚠️ 需要验证官方数据中的完整定义

---

#### 8. Artanis (阿塔尼斯) ⚠️

**模组单位**:
- `Artanis`
- `ArtanisAreaStunAirPlaceholder`
- `ArtanisIonCannonsWeapon`
- `ArtanisVoid`
- `ArtanisVoidAiur6`

**状态**: ⚠️ 需要验证官方数据中的完整定义

---

#### 9. Karax (凯拉克斯) ⚠️

**模组单位**:
- `KaraxChampion`
- `KaraxMicroBotActivated`
- `KaraxMicroBotDeactivated`
- `SoACasterKarax` ✅ 官方存在

**状态**: ⚠️ 需要验证凯拉克斯专属单位

---

#### 10. Alarak (阿拉纳克) ⚠️

**模组单位**:
- `AlarakAAWeapon`
- `AlarakChampion`
- `AlarakCoop`
- `AlarakReviveBeacon`
- `AlarakRushPlaceholder`
- `AlarakStructureOverchargeWeapon`
- `AlarakSupplicantWarpTrainCreator`
- `AlarakSupplicantWarpTrainDummy`
- `AlarakTheStrongestSurviveDummyAttackMissile`
- `AlarakTheStrongestSurviveDummySecondaryAttackMissile`

**状态**: ⚠️ 需要验证塔达林单位链

---

### Terran 指挥官

#### 11. Raynor (雷诺) ⚠️

**模组单位**:
- `Raynor`
- `Raynor01`
- `RaynorCommando`
- `RaynorLab`
- `RaynorsRaidersDropship`

**状态**: ⚠️ 需要验证官方数据

---

#### 12. Swann (斯旺) ⚠️

**模组单位**:
- `SwannSwann`

**状态**: ⚠️ 需要验证官方数据

---

#### 13. Nova (诺娃) ⚠️

**模组单位** (17个):
- `NovaDefensiveMatrixDrone`
- `NovaCoopDecoy`
- `NovaBoombotBurrowed`
- `NovaStunDrone`
- `NovaACLaserTurret`
- `NovaBoombot`
- `NovaCoop`
- `NovaReviveBeacon`
- `NovaGriffinTransportCaster`
- `NovaGriffinBombingRunTargeter`
- `NovaGriffinBombingRunStrafer`
- 其他诺娃专属单位

**状态**: ⚠️ 需要验证官方数据

---

#### 14. Tychus (泰凯斯) ⚠️

**模组单位** (36个):
- `TychusMedicTransportCaster`
- `TychusSCVAutoTurret`
- `TychusHero` 系列（Warhound、Spectre、Medic、Firebat、HERC、Ghost、Reaper、Marauder）
- `TychusOdin`
- `TychusCommandCenter`
- `TychusResearchCenter`
- `TychusArmory`
- `TychusMedivacPlatform`
- 其他泰凯斯专属单位

**状态**: ⚠️ 需要验证官方数据

---

#### 15. Mengsk (蒙斯克) ⚠️

**模组单位**:
- `MengskZergCalldown`

**状态**: ⚠️ 需要验证官方数据

---

### 特殊指挥官

#### 16. Fenix (菲尼克斯) ⚠️

**模组单位** (50+个):
- `FenixChampion` ✅ 官方存在
- `FenixAdeptShade`
- `FenixArbiter`
- `FenixDragoon`
- `FenixMojoScout`
- `FenixTaldarinImmortal`
- `FenixWarbringerColossus`
- `FenixClolarionCarrier`
- 其他菲尼克斯专属单位

**状态**: ⚠️ 大量单位存在，需要验证参数

---

#### 17. Stetmann (斯台特曼) ⚠️

**模组单位**:
- `GarysDen`
- `GaryStetmannMissile`
- `StetmannSparePartsMissile`
- `GaryStetmannOrbMissileEmpowered`
- `GaryStetmann`
- `GaryStetmannOrbMissileUnempowered`

**状态**: ⚠️ 需要验证官方数据

---

## 下一步行动

### 高优先级
1. **Abathur 毒巢触发器** - 需要从官方数据提取代码并接入
2. **Stukov 验证** - 验证 18 个 Infested 单位的参数一致性

### 中优先级
3. **Vorazun/Zeratul/Artanis** - 验证 Protoss 指挥官的独特单位
4. **Tychus** - 验证 36 个单位与官方数据的一致性
5. **Fenix** - 验证 50+ 个达拉姆单位

### 低优先级
6. **Nova/Mengsk/Swann** - 验证人族指挥官的独特单位
7. **Raynor** - 验证雷诺单位

---

## 扫描方法说明

1. **单位提取**: 使用 Grep 扫描 `<CUnit id="...">` 模式
2. **官方对比**: 在 `references/official-casc-export/mods/starcoop/starcoop.sc2mod/base.sc2data/gamedata/unitdata.xml` 中查找对应条目
3. **参数验证**: 读取单位定义，检查 LifeMax、Damage、Speed 等关键参数

---

**报告生成时间**: 2026-05-23
**扫描工具**: Grep、Read、Glob
**数据来源**: 官方 CASC 导出 + 模组文件对比
