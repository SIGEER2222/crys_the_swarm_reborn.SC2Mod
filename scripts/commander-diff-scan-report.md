# 指挥官兵种/技能/建筑差异扫描报告

**日期**: 2026-05-23
**目的**: 对比合作指挥官模组与战役/官方数据的兵种、技能、建筑差异

---

## 扫描范围

### 指挥官模组列表
1. **Zerg**
   - XMZagara.SC2Mod (Zagara)
   - XMAbathur.SC2Mod (Abathur)
   - XMStukov.SC2Mod (Stukov)
   - XMDehaka.SC2Mod (Dehaka)
   - XMKerrigan.SC2Mod (Kerrigan)

2. **Protoss**
   - XMArtanis.SC2Mod (Artanis)
   - XMKarax.SC2Mod (Karax)
   - XMVorazun.SC2Mod (Vorazun)
   - XMZeratul.SC2Mod (Zeratul)
   - XMAlarak.SC2Mod (Alarak)

3. **Terran**
   - XMRaynor.SC2Mod (Raynor)
   - XMSwann.SC2Mod (Swann)
   - XMNova.SC2Mod (Nova)
   - XMTychus.SC2Mod (Tychus)
   - XMMengsk.SC2Mod (Mengsk)

4. **Special**
   - XMFenix.SC2Mod (Fenix)
   - XMStetmann.SC2Mod (Stetmann)

### 参考数据
- 官方战役单位: `references/official-casc-export/mods/starcoop/starcoop.sc2mod`
- 标准种族单位: `references/official-casc-export/base.sc2data/gamedata/`

---

## 扫描方法

1. 提取各指挥官模组中**独特的单位 ID**（不包括标准种族单位）
2. 提取各指挥官模组中**独特的能力 ID**（不包括标准种族能力）
3. 提取各指挥官模组中**独特的升级 ID**（不包括标准种族升级）
4. 对比官方数据，确认这些独特对象是否存在差异

---

## 已知差异记录

### Zagara（扎加拉）
- **独特单位**: 
  - `ZagaraSwarmHost` - 孵化场宿主
  - `ZagaraBaneling` - 爆虫变种
  - `ZagaraQueen` - 虫后变种
- **独特能力**:
  - `BileLauncherZagaraAttack` - 胆汁喷射体
  - `SpawnZagaraBroodLord` - 孵化虫宿主
- **潜在差异**: 需要确认这些单位/能力与官方数据一致

### Vorazun（沃拉尊）
- **独特单位**:
  - `Oracle` - 先知（但这是 Protoss 标准单位）
  - `OracleStasisTrap` - 先知力场陷阱
- **独特能力**:
  - `ShadowGuardSummon` - 暗影卫队
  - `TimeStop` - 时间停止
- **潜在差异**: 需要确认暗影卫队等特殊单位

### Zeratul（泽拉图）
- **独特单位**:
  - `Zeratul` - 泽拉图英雄单位
  - `Taldarim*` - 塔达林系列单位
  - `ProtossDaelaam*` - 达拉姆系列单位
- **独特能力**:
  - `ShadowCleave` - 暗影顺劈
  - `SuppressionCrystal` - 虚空抑制
- **潜在差异**: 
  - 塔达林单位与标准 Protoss 单位的关系需要确认
  - 是否存在单位 ID 冲突

### Karax（凯拉克斯）
- **独特单位**:
  - `SoACasterKarax` - 亚顿之矛
  - `SolarForge` - 太阳锻炉
  - `KhaydarinMonolith` - 凯达琳巨石
- **独特能力**:
  - `SOAOrbitalStrikeKarax` - 轨道轰炸
  - `SOAThermalLanceActivate` - 净化光束
  - `SOAMapWideChrono` - 时空波动
- **潜在差异**: 需要确认这些能力的效果参数

### Kerrigan（凯瑞甘）
- **独特单位**:
  - `K5Kerrigan` - K5 凯瑞甘
  - `K5KerriganBurrowed` - K5 潜地凯瑞甘
- **独特能力**:
  - `PrimalSlash` - 原始之刃
  - `MindBolt` - 精神螺栓
  - `PsiStrike` - 灵能冲击
  - `PsionicLift` - 灵能之掀
- **潜在差异**: K5 技能链的完整度需要确认

### Abathur（阿巴瑟）
- **独特单位**:
  - `ToxicNest` / `ToxicNestBurrowed` - 毒巢
  - `LocustMP` / `LocustMPRegen` - 蝗虫变种
- **独特能力**:
  - `SpawnToxicNest` - 投放毒巢
  - `SpawnLocustsMP` - 生成蝗虫
- **潜在差异**: 毒巢触发器逻辑缺失

### Alarak（阿拉纳克）
- **独特单位**:
  - `AlarakCoop` - 阿拉纳克英雄
  - `AlarakSupplicant` - 侍祭
  - `AlarakSlayer` - 杀手
  - `AlarakAscendant` - 升天者
- **独特能力**:
  - `StructureOvercharge` - 建筑超载
  - `SupplicantSacrifice` - 侍祭牺牲
- **潜在差异**: 塔达林单位链的完整性

---

## 待扫描项目

- [ ] 提取所有指挥官的独特单位 ID
- [ ] 对比官方 starcoop 数据中的对应条目
- [ ] 验证能力参数的差异
- [ ] 检查升级和科技树的完整性

---

## 输出格式

对于每个发现的差异，报告格式：
```markdown
### [指挥官名称]
**对象类型**: Unit / Ability / Upgrade
**对象 ID**: [ID 名称]
**当前值**: [当前配置]
**官方值**: [官方配置]
**差异**: [差异描述]
**影响**: [对游戏性的影响]
**建议**: [修复建议]
```

