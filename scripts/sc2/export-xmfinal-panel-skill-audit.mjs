import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const xmfinalRoot = path.join(root, "原始mod", "Mods", "XM", "XMFinal.SC2Mod", "Base.SC2Data");
const xmfinalGameData = path.join(xmfinalRoot, "GameData");
const officialMirrorRoot = path.join(root, "游戏数据", "官方SC2原始文本镜像");
const defaultOutputDir = path.join(
  root,
  "docs",
  "每日进度",
  "2026-05-29-原始mod-wiki指挥官对比",
  "panel-skills",
);

const officialGameDataRoots = [
  path.join(officialMirrorRoot, "mods", "starcoop", "starcoop.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "starcoop", "commanders", "arcturusmengsk.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "mods", "starcoop", "commanders", "egonstetmann.sc2mod", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "void.sc2campaign", "base.sc2data", "gamedata"),
  path.join(officialMirrorRoot, "campaigns", "voidstory.sc2campaign", "base.sc2data", "gamedata"),
];

const officialStringFiles = [
  path.join(officialMirrorRoot, "mods", "starcoop", "starcoop.sc2mod", "zhcn.sc2data", "localizeddata", "gamestrings.txt"),
  path.join(officialMirrorRoot, "mods", "starcoop", "commanders", "arcturusmengsk.sc2mod", "zhcn.sc2data", "localizeddata", "gamestrings.txt"),
  path.join(officialMirrorRoot, "mods", "starcoop", "commanders", "egonstetmann.sc2mod", "zhcn.sc2data", "localizeddata", "gamestrings.txt"),
  path.join(officialMirrorRoot, "campaigns", "void.sc2campaign", "zhcn.sc2data", "localizeddata", "gamestrings.txt"),
  path.join(officialMirrorRoot, "campaigns", "voidstory.sc2campaign", "zhcn.sc2data", "localizeddata", "gamestrings.txt"),
];

const catalogFiles = new Map([
  ["ability", "AbilData.xml"],
  ["behavior", "BehaviorData.xml"],
  ["button", "ButtonData.xml"],
  ["effect", "EffectData.xml"],
  ["requirement", "RequirementData.xml"],
  ["unit", "UnitData.xml"],
  ["weapon", "WeaponData.xml"],
]);

const catalogKindAliases = new Map([
  ["Abil", "ability"],
  ["Behavior", "behavior"],
  ["Button", "button"],
  ["Effect", "effect"],
  ["Requirement", "requirement"],
  ["Unit", "unit"],
  ["Weapon", "weapon"],
]);

const tagKinds = new Map([
  ["CButton", "button"],
  ["CRequirement", "requirement"],
  ["CUnit", "unit"],
  ["CWeaponLegacy", "weapon"],
]);

const commanderNames = new Map([
  ["Abathur", "阿巴瑟"],
  ["Alarak", "阿拉纳克"],
  ["Artanis", "阿塔尼斯"],
  ["Dehaka", "德哈卡"],
  ["Fenix", "菲尼克斯"],
  ["Horner", "霍纳与汉"],
  ["Karax", "凯拉克斯"],
  ["Kerrigan", "凯瑞甘"],
  ["Mengsk", "蒙斯克"],
  ["Nova", "诺娃"],
  ["Raynor", "雷诺"],
  ["Stetmann", "斯台特曼"],
  ["Stukov", "斯托科夫"],
  ["Swann", "斯旺"],
  ["Tychus", "泰凯斯"],
  ["Vorazun", "沃拉尊"],
  ["Zagara", "扎加拉"],
  ["Zeratul", "泽拉图"],
]);

const scopeCommanders = new Set([
  "Abathur",
  "Alarak",
  "Artanis",
  "Dehaka",
  "Fenix",
  "Horner",
  "Karax",
  "Kerrigan",
  "Mengsk",
  "Nova",
  "Raynor",
  "Stetmann",
  "Stukov",
  "Swann",
  "Tychus",
  "Vorazun",
  "Zagara",
  "Zeratul",
]);

const panelNameOverrides = new Map([
  ["Abathur:mend", "愈合"],
  ["Abathur:toxic_nest", "孵化剧毒巢穴"],
  ["Alarak:death_fleet", "死亡舰队"],
  ["Alarak:structure_overcharge", "建筑超载"],
  ["Artanis:orbital_strike_activate", "轨道轰炸：打开目标模式"],
  ["Artanis:orbital_strike_execute", "轨道轰炸：落点执行"],
  ["Artanis:power_field", "能量场"],
  ["Artanis:shield_overcharge", "护盾超载"],
  ["Artanis:solar_bombardment", "太阳轰炸"],
  ["Artanis:solar_bombardment_execute", "太阳轰炸：落点执行"],
  ["Fenix:arbiter_suit", "塞布罗斯仲裁者战甲"],
  ["Fenix:dragoon_suit", "太阳能龙骑士战甲"],
  ["Fenix:praetor_suit", "执政官战甲"],
  ["Karax:chrono_wave", "时空波动"],
  ["Karax:orbital_strike", "轨道轰炸"],
  ["Karax:purifier_beam", "净化光束"],
  ["Karax:solar_lance_activate", "太阳能射线枪：打开目标模式"],
  ["Karax:solar_lance_execute", "太阳能射线枪：划线执行"],
  ["Kerrigan:assimilation_aura", "吸收光环"],
  ["Kerrigan:immobilization_wave", "定身波"],
  ["Kerrigan:maelstrom", "毁灭漩涡"],
  ["Horner:air_fleet_activate", "呼叫舰队：打开目标模式"],
  ["Horner:air_fleet_target", "呼叫舰队：落点执行"],
  ["Horner:mag_mines", "磁力地雷"],
  ["Horner:precision_strike", "精确打击"],
  ["Horner:precision_strike_dummy", "精确打击：平台计时占位"],
  ["Horner:space_station", "空间站调度"],
  ["Mengsk:bunker_drop", "强制征召"],
  ["Mengsk:contaminated_strike", "辐射打击"],
  ["Mengsk:dogs_of_war_level1", "战争恶犬：等级1"],
  ["Mengsk:dogs_of_war_level2", "战争恶犬：等级2"],
  ["Mengsk:dogs_of_war_level3", "战争恶犬：等级3"],
  ["Mengsk:dogs_of_war_level4", "战争恶犬：等级4"],
  ["Mengsk:nuclear_annihilation", "核弹天劫"],
  ["Nova:griffin_bombing_run", "格里芬轰炸"],
  ["Nova:griffin_transport", "格里芬运输"],
  ["Nova:holo_decoy", "全息诱饵"],
  ["Nova:tactical_nuke", "战术核弹"],
  ["Raynor:banshee_airstrike", "女妖空袭"],
  ["Raynor:hyperion", "休伯利安号"],
  ["Stetmann:hugs", "切换成“艾的呵护”设定"],
  ["Stetmann:juice", "切换成“艾的滋润”设定"],
  ["Stetmann:speed", "切换成“艾的急切”设定"],
  ["Stetmann:stetellite", "部署艾星"],
  ["Stukov:aleksander", "亚历山大号"],
  ["Stukov:apocalisk", "末日巨兽"],
  ["Stukov:infest_structure", "感染建筑"],
  ["Stukov:infest_structure_upgraded", "感染建筑（升级）"],
  ["Stukov:psi_emitter", "部署灵能发射器"],
  ["Swann:combat_drop", "作战空投"],
  ["Swann:concentrated_beam", "汇聚射线"],
  ["Swann:laser_drill_attack", "德拉肯激光钻机攻击"],
  ["Swann:pulse_cannon", "脉冲炮"],
  ["Tychus:medivac_transport", "医疗运输机空运"],
  ["Tychus:odin_barrage", "巨炮乱射"],
  ["Tychus:odin_calldown", "空投奥丁"],
  ["Tychus:odin_nuke", "红色按钮"],
  ["Vorazun:black_hole", "黑洞"],
  ["Vorazun:dark_pylon", "黑暗水晶塔"],
  ["Vorazun:shadow_guard", "暗影卫队"],
  ["Vorazun:time_stop", "时间停止"],
  ["Vorazun:time_stop_prestige", "时间停止（威望版）"],
  ["Zagara:baneling_barrage", "爆虫弹幕"],
  ["Zagara:hunter_killers", "猎杀者"],
  ["Zagara:mass_frenzy", "群体狂暴"],
  ["Zagara:roach_drop", "感染空投"],
  ["Zeratul:avatar_essence", "精华化身"],
  ["Zeratul:avatar_form", "形体化身"],
  ["Zeratul:dark_archon_legion", "塞达斯军团"],
  ["Zeratul:karass_legion", "特布鲁斯军团"],
  ["Zeratul:khaydarin_monolith", "部署超维空间巨石"],
  ["Zeratul:mapwide_stasis", "静滞射线"],
  ["Zeratul:mohandar_legion", "佐拉亚军团"],
  ["Zeratul:rally_legendary_legion", "指引传奇军团"],
  ["Zeratul:suppression_crystal", "虚空抑制晶体"],
]);

const effectNotes = new Map([
  ["Abathur:mend", "愈合：立即治疗友方生物、机械单位和建筑，并追加持续治疗；升级后最多储存 3 次使用次数。"],
  ["Abathur:toxic_nest", "孵化剧毒巢穴：在指定点生成可铺菌毯的剧毒巢穴，触发后对附近敌方地面单位造成伤害。"],
  ["Alarak:death_fleet", "召唤死亡舰队母舰；本地能力节点显示初始冷却 600 秒、使用冷却 360 秒，并要求场上没有阿拉纳克母舰。"],
  ["Alarak:structure_overcharge", "给友方建筑或相位模式战争棱镜充能；本地效果链显示伤害 40、持续 45 秒、搜索半径 15。"],
  ["Artanis:orbital_strike_activate", "打开亚顿之矛轨道轰炸目标模式；真正落点由 execute 能力处理。"],
  ["Artanis:orbital_strike_execute", "对目标点发射轨道轰炸；官方战役依赖提供该能力，当前本地 profile 已登记。"],
  ["Artanis:power_field", "在指定点投放能量场，用于折跃和供能。"],
  ["Artanis:shield_overcharge", "全地图护盾超载；官方战役依赖提供该能力，按钮和需求已接入 profile。"],
  ["Artanis:solar_bombardment", "发起太阳轰炸/扫射类面板能力；execute 项负责落点执行。"],
  ["Artanis:solar_bombardment_execute", "太阳轰炸执行项；当前作为 profile metadata 检查，不直接发射实机效果。"],
  ["Fenix:arbiter_suit", "折跃菲尼克斯塞布罗斯仲裁者战甲；本地能力节点显示初始冷却 240 秒、换甲冷却 15 秒。"],
  ["Fenix:dragoon_suit", "折跃菲尼克斯太阳能龙骑士战甲；本地能力节点显示初始冷却 240 秒、换甲冷却 15 秒。"],
  ["Fenix:praetor_suit", "折跃菲尼克斯执政官战甲；本地能力节点显示初始冷却 240 秒、换甲冷却 15 秒。"],
  ["Karax:chrono_wave", "时空波动影响全图友方单位/建筑；本地行为显示持续 20 秒，速度/冷却/生产等倍率为 2。"],
  ["Karax:orbital_strike", "凯拉克斯轨道轰炸；本地能力节点显示能量消耗 5，冷却/充能链接到独立冷却键。"],
  ["Karax:purifier_beam", "净化光束；本地能力节点显示初始冷却 450 秒、使用冷却 360 秒。"],
  ["Karax:solar_lance_activate", "太阳能射线枪目标模式；本地 activate 节点显示冷却 120 秒。"],
  ["Karax:solar_lance_execute", "太阳能射线枪划线执行；当前执行节点只有效果入口，费用主要在 activate/目标模式链上。"],
  ["Kerrigan:assimilation_aura", "吸收光环：附近敌人死亡掉落资源；本地能力节点显示冷却 120 秒。"],
  ["Kerrigan:immobilization_wave", "定身波：全屏控制/伤害链；本地能力节点显示初始冷却 600 秒、使用冷却 180 秒，前置眩晕 1.625 秒。"],
  ["Kerrigan:maelstrom", "毁灭漩涡：本地能力节点显示消耗 100 能量、冷却 120 秒，行为持续 9 秒、每 0.5 秒搜索半径 4。"],
  ["Horner:air_fleet_activate", "呼叫舰队目标模式：打开舰队轰炸落点选择；执行链由 air_fleet_target 负责。"],
  ["Horner:air_fleet_target", "呼叫舰队：舰队在目标区域进行打击；本地 profile 检查目标 dummy/按钮/caster 是否齐全。"],
  ["Horner:mag_mines", "磁力地雷：从顶部条投放磁力地雷；本地能力为 HHTrainTopBar 的 Build1 项。"],
  ["Horner:precision_strike", "精确打击：调用轰炸机平台对目标区域进行轰炸；同排 dummy 用于无平台/计时状态展示。"],
  ["Horner:precision_strike_dummy", "精确打击占位：显示轰炸机平台计时/不可用状态，不代表实际轰炸执行。"],
  ["Horner:space_station", "空间站调度：在目标区域召唤雇佣兵空间站并进行范围支援。"],
  ["Mengsk:bunker_drop", "强制征召：向目标位置空投补给地堡/征召支援。"],
  ["Mengsk:contaminated_strike", "辐射打击：大地碎裂炮向目标区域发射污染弹，造成区域伤害/污染效果。"],
  ["Mengsk:dogs_of_war_level1", "战争恶犬等级1：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。"],
  ["Mengsk:dogs_of_war_level2", "战争恶犬等级2：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。"],
  ["Mengsk:dogs_of_war_level3", "战争恶犬等级3：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。"],
  ["Mengsk:dogs_of_war_level4", "战争恶犬等级4：按当前帝国天命层级召唤异虫支援；等级越高单位规模越大。"],
  ["Mengsk:nuclear_annihilation", "核弹天劫：向目标区域连续投放核弹级打击；需要对应等级/非威望锁定状态。"],
  ["Nova:griffin_bombing_run", "格里芬轰炸：对目标线/区域实施轰炸；当前本地能力为 execute 节点。"],
  ["Nova:griffin_transport", "格里芬运输：装载并运输诺娃部队；当前 profile 只检查 load 能力和按钮。"],
  ["Nova:holo_decoy", "全息诱饵：在目标位置投放诱饵单位，需要诺娃作战服。"],
  ["Nova:tactical_nuke", "战术核弹：从幽灵学院/隐形套装链路发射核弹，使用 charge/cooldown 控制。"],
  ["Raynor:banshee_airstrike", "呼叫 5 架隐形黄昏之翼；本地能力节点显示初始冷却 240 秒、使用冷却 240 秒。"],
  ["Raynor:hyperion", "召唤可控休伯利安号；本地能力节点显示初始冷却 300 秒、使用冷却 360 秒。"],
  ["Stetmann:hugs", "艾的呵护：切换斯台特区到生命恢复配置，给范围内友方单位提供治疗向增益。"],
  ["Stetmann:juice", "艾的滋润：切换斯台特区到能量恢复配置，给范围内友方单位提供能量恢复向增益。"],
  ["Stetmann:speed", "艾的急切：切换斯台特区到移动速度配置，给范围内友方单位提供加速向增益。"],
  ["Stetmann:stetellite", "部署艾星：在目标点部署斯台特卫星，展开斯台特区。"],
  ["Stukov:aleksander", "亚历山大号：召唤可控制的 UED 旗舰支援，具备感染/控制相关效果。"],
  ["Stukov:apocalisk", "末日巨兽：召唤末日巨兽；拥有潜地冲锋、范围伤害与对空攻击。"],
  ["Stukov:infest_structure", "感染建筑：使目标敌方建筑失效并生成感染体；升级版本效果更强。"],
  ["Stukov:infest_structure_upgraded", "感染建筑（升级）：升级后的感染建筑顶部条能力，强化感染/生成效果。"],
  ["Stukov:psi_emitter", "灵能发射器：设置感染人群的集结/行军目标点。"],
  ["Swann:combat_drop", "作战空投：在目标区域投放斯旺的战斗支援部队。"],
  ["Swann:concentrated_beam", "汇聚射线：激光钻机发射直线高伤害射线。"],
  ["Swann:laser_drill_attack", "激光钻机攻击：命令德拉肯激光钻机攻击指定目标。"],
  ["Swann:pulse_cannon", "脉冲炮：激光钻机发射大范围高伤害脉冲炮。"],
  ["Tychus:medivac_transport", "医疗运输机空运：立即把目标区域不法之徒运输到指定位置，下机获得治疗和隐身，受击后效果消失。"],
  ["Tychus:odin_barrage", "巨炮乱射：大范围击晕敌人，并在持续时间内造成多段伤害。"],
  ["Tychus:odin_calldown", "空投奥丁：将奥丁空投到目标位置，落地造成伤害；奥丁由泰凯斯驾驶，可持续一段时间。"],
  ["Tychus:odin_nuke", "红色按钮：向目标位置呼叫聚变打击，延迟后对大范围目标造成高额伤害。"],
  ["Vorazun:black_hole", "黑洞；本地能力节点显示消耗 25 能量，效果链来自黑洞能力。"],
  ["Vorazun:dark_pylon", "召唤黑暗水晶塔；本地建造项显示消耗 25 能量、建造 3 秒、冷却 60 秒。"],
  ["Vorazun:shadow_guard", "召唤暗影卫队；本地效果显示生成 2 个 VorazunShadowGuard，能力消耗 50 能量、初始/使用冷却 180 秒。"],
  ["Vorazun:time_stop", "时间停止：冻结所有敌人；官方战役/合作文本提供效果说明，当前 profile 已接 ability/button/requirement/caster。"],
  ["Vorazun:time_stop_prestige", "时间停止威望版：本地能力节点显示初始冷却 300 秒、使用冷却 300 秒，并复用时间停止按钮。"],
  ["Zagara:baneling_barrage", "爆虫弹幕：扎加拉向目标区域投放/发射爆虫，对地面区域造成爆炸伤害。"],
  ["Zagara:hunter_killers", "猎杀者：召唤猎杀者支援扎加拉作战。"],
  ["Zagara:mass_frenzy", "群体狂暴：提高友方单位的攻击速度和移动速度。"],
  ["Zagara:roach_drop", "感染空投：向战场空投装有蟑螂的孢子，蟑螂一段时间后死亡。"],
  ["Zeratul:avatar_essence", "精华化身：泽拉图终极神器分支之一，通过终极折跃训练能力召唤。"],
  ["Zeratul:avatar_form", "形体化身：泽拉图终极神器分支之一，通过终极折跃训练能力召唤。"],
  ["Zeratul:dark_archon_legion", "塞达斯军团：折跃传奇军团分支，生成黑暗执政官相关支援。"],
  ["Zeratul:karass_legion", "特布鲁斯军团：折跃传奇军团分支，生成狂热者/特布鲁斯相关支援。"],
  ["Zeratul:khaydarin_monolith", "部署超维空间巨石：在目标位置部署超维空间巨石防御建筑。"],
  ["Zeratul:mapwide_stasis", "静滞射线：发射线形静滞射线，使命中的敌人无法移动、攻击或受到伤害。"],
  ["Zeratul:mohandar_legion", "佐拉亚军团：折跃传奇军团分支，生成虚空辉光舰相关支援。"],
  ["Zeratul:rally_legendary_legion", "指引传奇军团：重定向已召唤传奇军团的集结/攻击目标。"],
  ["Zeratul:suppression_crystal", "虚空抑制晶体：部署晶体并提供抑制场，压制范围内敌人。"],
]);

const targetModeNames = new Map([
  ["build_point", "建造点"],
  ["instant", "瞬发"],
  ["line", "划线目标"],
  ["point", "点目标"],
  ["unit", "单位目标"],
  ["toggle", "目标模式开关"],
  ["unit_or_structure", "单位/建筑目标"],
]);

function parseArgs() {
  const args = new Map();
  for (let i = 2; i < process.argv.length; i += 1) {
    const item = process.argv[i];
    if (!item.startsWith("--")) {
      continue;
    }
    const key = item.slice(2);
    const next = process.argv[i + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, true);
    }
  }
  return args;
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function writeText(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

function stripXmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function parseAttrs(text) {
  const attrs = new Map();
  for (const match of text.matchAll(/\b([A-Za-z0-9_]+)\s*=\s*"([^"]*)"/g)) {
    attrs.set(match[1], match[2]);
  }
  return attrs;
}

function parseCatalogNodes(text, fileName, sourceLabel) {
  const nodes = [];
  const cleanText = stripXmlComments(text);
  const catalogOpen = cleanText.indexOf("<Catalog");
  const catalogStart = catalogOpen >= 0 ? cleanText.indexOf(">", catalogOpen) + 1 : 0;
  const catalogEnd = cleanText.lastIndexOf("</Catalog>");
  const endLimit = catalogEnd >= 0 ? catalogEnd : cleanText.length;
  let index = catalogStart;

  while (index < endLimit) {
    const startIndex = cleanText.indexOf("<", index);
    if (startIndex < 0 || startIndex >= endLimit) {
      break;
    }
    if (cleanText.startsWith("<?", startIndex) || cleanText.startsWith("<!", startIndex)) {
      const tagEnd = cleanText.indexOf(">", startIndex);
      if (tagEnd < 0) {
        break;
      }
      index = tagEnd + 1;
      continue;
    }

    const openEnd = cleanText.indexOf(">", startIndex);
    if (openEnd < 0) {
      throw new Error(`Unclosed catalog opening tag in ${fileName}`);
    }

    const openTag = cleanText.slice(startIndex, openEnd + 1);
    const openMatch = openTag.match(/^<([A-Za-z0-9_]+)\b/);
    if (!openMatch) {
      index = openEnd + 1;
      continue;
    }

    const tag = openMatch[1];
    const idMatch = openTag.match(/\bid="([^"]+)"/);
    let endIndex = openEnd + 1;
    if (!openTag.endsWith("/>")) {
      const closeTag = `</${tag}>`;
      const closeIndex = cleanText.indexOf(closeTag, endIndex);
      if (closeIndex < 0) {
        throw new Error(`Unclosed catalog node ${tag}${idMatch ? ` id=${idMatch[1]}` : ""} in ${fileName}`);
      }
      endIndex = closeIndex + closeTag.length;
    }

    if (idMatch) {
      nodes.push({
        fileName,
        sourceLabel,
        tag,
        id: idMatch[1],
        text: cleanText.slice(startIndex, endIndex),
      });
    }
    index = endIndex;
  }

  return nodes;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function catalogKindForTag(tag) {
  if (tagKinds.has(tag)) {
    return tagKinds.get(tag);
  }
  if (tag.startsWith("CAbil")) {
    return "ability";
  }
  if (tag.startsWith("CBehavior")) {
    return "behavior";
  }
  if (tag.startsWith("CEffect")) {
    return "effect";
  }
  return undefined;
}

function readCatalogIndex(kind, sourceRoots) {
  const index = new Map();
  for (const sourceRoot of sourceRoots) {
    for (const file of walk(sourceRoot.root)) {
      if (!file.toLowerCase().endsWith(".xml")) {
        continue;
      }
      const relativeFile = path.relative(sourceRoot.root, file).replaceAll("\\", "/");
      const nodes = parseCatalogNodes(readText(file), relativeFile, sourceRoot.label);
      for (const node of nodes) {
        if (catalogKindForTag(node.tag) !== kind) {
          continue;
        }
        if (!index.has(node.id)) {
          index.set(node.id, []);
        }
        index.get(node.id).push(node);
      }
    }
  }
  return index;
}

function readAllCatalogs() {
  const localRoots = [{ root: xmfinalGameData, label: "本地 XMFinal" }];
  const officialRoots = officialGameDataRoots
    .filter((dir) => fs.existsSync(dir))
    .map((dir) => ({
      root: dir,
      label: path.relative(root, dir).replaceAll("\\", "/"),
    }));

  const local = new Map();
  const official = new Map();
  for (const kind of catalogFiles.keys()) {
    local.set(kind, readCatalogIndex(kind, localRoots));
    official.set(kind, readCatalogIndex(kind, officialRoots));
  }
  return { local, official };
}

function lastNode(index, kind, id) {
  const nodes = index.get(kind)?.get(id) ?? [];
  return nodes.length > 0 ? nodes[nodes.length - 1] : undefined;
}

function firstNode(index, kind, id) {
  const nodes = index.get(kind)?.get(id) ?? [];
  return nodes.length > 0 ? nodes[0] : undefined;
}

function catalogNode(indexes, kind, id) {
  return lastNode(indexes.local, kind, id) ?? firstNode(indexes.official, kind, id);
}

function catalogStatus(indexes, kind, id) {
  if (!id) {
    return "未使用";
  }
  const localNode = lastNode(indexes.local, kind, id);
  if (localNode) {
    return `本地 ${localNode.tag}`;
  }
  const officialNode = firstNode(indexes.official, kind, id);
  if (officialNode) {
    return `依赖/官方 ${officialNode.tag}`;
  }
  return "缺失";
}

function parsePanelEntries() {
  const file = path.join(xmfinalRoot, "LibE0EAE146_CommanderPanels.galaxy");
  const text = readText(file);
  const re = /XMTestBench_CheckPanelProfile\([^,]+,\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)"/g;
  const seen = new Set();
  const entries = [];
  for (const match of text.matchAll(re)) {
    const [, commander, panelId, abilityId, buttonId, requirementId, casterId, targetMode, note] = match;
    const key = `${commander}:${panelId}:${abilityId}:${buttonId}:${requirementId}:${casterId}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    entries.push({ commander, panelId, abilityId, buttonId, requirementId, casterId, targetMode, note });
  }
  return entries.filter((entry) => scopeCommanders.has(entry.commander));
}

function readLocalizedStrings() {
  const strings = new Map();
  for (const file of officialStringFiles) {
    if (!fs.existsSync(file)) {
      continue;
    }
    for (const line of readText(file).split(/\r?\n/)) {
      const index = line.indexOf("=");
      if (index <= 0) {
        continue;
      }
      const key = line.slice(0, index);
      if (!key.startsWith("Button/")) {
        continue;
      }
      if (!strings.has(key)) {
        strings.set(key, line.slice(index + 1));
      }
    }
  }
  return strings;
}

function stripEnglishMirror(text) {
  const marker = " /// ";
  const index = text.indexOf(marker);
  return index >= 0 ? text.slice(0, index) : text;
}

function cleanGameText(text, indexes) {
  if (!text) {
    return "";
  }
  return resolveDataRefs(stripEnglishMirror(text), indexes)
    .replace(/<n\s*\/?>/g, " ")
    .replace(/<IMG\b[^>]*>/g, "")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getString(strings, key, indexes) {
  return cleanGameText(strings.get(key) ?? "", indexes);
}

function directChildBlocks(text, tagName) {
  const blocks = [];
  const re = new RegExp(`<${tagName}\\b([^>/]*)(?:/>|>([\\s\\S]*?)</${tagName}>)`, "g");
  for (const match of text.matchAll(re)) {
    blocks.push({
      attrs: parseAttrs(match[1]),
      inner: match[2] ?? "",
      full: match[0],
    });
  }
  return blocks;
}

function tagValue(block, tagName) {
  const nested = block.inner.match(new RegExp(`<${tagName}\\b([^>/]*)(?:/>|>([\\s\\S]*?)</${tagName}>)`));
  if (!nested) {
    return undefined;
  }
  const attrs = parseAttrs(nested[1]);
  return attrs.get("value") ?? attrs.get("Value") ?? nested[2]?.trim();
}

function segmentTag(segment) {
  const match = segment.match(/^([A-Za-z0-9_]+)(?:\[([^\]]+)])?$/);
  if (!match) {
    return { name: segment, index: undefined };
  }
  return { name: match[1], index: normalizeIndex(match[2]) };
}

function normalizeIndex(index) {
  if (index === undefined) {
    return undefined;
  }
  if (index === "0") {
    return "0";
  }
  if (index === "1") {
    return "Shields";
  }
  if (index === "2") {
    return "Energy";
  }
  return index;
}

function blockMatchesIndex(block, wantedIndex) {
  if (wantedIndex === undefined) {
    return true;
  }
  const index = block.attrs.get("index") ?? block.attrs.get("Index");
  if (index === wantedIndex) {
    return true;
  }
  return wantedIndex === "0" && index === undefined;
}

function valueFromBlock(block) {
  return block.attrs.get("value")
    ?? block.attrs.get("Value")
    ?? block.attrs.get("TimeUse")
    ?? block.attrs.get("Amount")
    ?? block.attrs.get("Duration")
    ?? block.inner.trim()
    ?? undefined;
}

function fieldValueFromNode(node, fieldPath) {
  if (!node) {
    return undefined;
  }
  const segments = fieldPath.split(".");
  let blocks = [{ inner: node.text, attrs: new Map(), full: node.text }];
  for (let i = 0; i < segments.length; i += 1) {
    const { name, index } = segmentTag(segments[i]);
    const next = [];
    for (const block of blocks) {
      for (const child of directChildBlocks(block.inner, name)) {
        if (blockMatchesIndex(child, index)) {
          next.push(child);
        }
      }
    }
    if (next.length === 0) {
      if (i === segments.length - 1) {
        const attrValue = blocks
          .map((block) => block.attrs.get(name) ?? block.attrs.get(name[0]?.toUpperCase() + name.slice(1)))
          .find((value) => value !== undefined);
        if (attrValue !== undefined) {
          return attrValue;
        }
      }
      return undefined;
    }
    blocks = next;
  }
  return valueFromBlock(blocks[0]);
}

function catalogFieldValue(indexes, catalogKind, id, fieldPath) {
  const kind = catalogKindAliases.get(catalogKind) ?? catalogKind;
  const candidates = [
    ...[...(indexes.local.get(kind)?.get(id) ?? [])].reverse(),
    ...(indexes.official.get(kind)?.get(id) ?? []),
  ];
  for (const node of candidates) {
    const value = fieldValueFromNode(node, fieldPath);
    if (value !== undefined && value !== "") {
      return value;
    }
    const bracketFallback = fieldPath.replace(/\[[^\]]+]/g, "");
    if (bracketFallback !== fieldPath) {
      const fallbackValue = fieldValueFromNode(node, bracketFallback);
      if (fallbackValue !== undefined && fallbackValue !== "") {
        return fallbackValue;
      }
    }
  }
  return undefined;
}

function resolveDataRefs(text, indexes) {
  return text.replace(/<d\b([^>]*)\/>/g, (_, rawAttrs) => {
    const attrs = parseAttrs(rawAttrs);
    if (attrs.has("time")) {
      return `${attrs.get("time")}秒`;
    }
    const ref = attrs.get("ref");
    if (!ref) {
      return "";
    }
    const value = resolveRefExpression(ref, indexes);
    return value ?? `[未解析:${ref}]`;
  });
}

function resolveRefExpression(ref, indexes) {
  let allResolved = true;
  const replaced = ref.replace(/\b(Abil|Behavior|Effect|Unit|Weapon),([A-Za-z0-9_]+),([A-Za-z0-9_.\[\]]+)/g, (match, kind, id, field) => {
    const value = catalogFieldValue(indexes, kind, id, field);
    if (value === undefined || Number.isNaN(Number(value))) {
      allResolved = false;
      return match;
    }
    return value;
  });
  if (!allResolved) {
    return undefined;
  }
  if (!/^[0-9+\-*/().\s]+$/.test(replaced)) {
    return replaced;
  }
  try {
    const value = Function(`"use strict"; return (${replaced});`)();
    if (!Number.isFinite(value)) {
      return undefined;
    }
    return Math.abs(value - Math.round(value)) < 0.000001 ? String(Math.round(value)) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  } catch {
    return undefined;
  }
}

function formatSeconds(value) {
  if (value === undefined || value === "") {
    return undefined;
  }
  return `${value} 秒`;
}

function describeCost(abilityNode) {
  if (!abilityNode) {
    return "未找到能力节点";
  }
  const parts = [];
  const costBlocks = directChildBlocks(abilityNode.text, "Cost");
  for (const costBlock of costBlocks) {
    for (const vital of directChildBlocks(costBlock.inner, "Vital")) {
      const index = vital.attrs.get("index") ?? vital.attrs.get("Index");
      const label = index === "Energy" || index === "2" ? "能量" : index === "Vespene" ? "瓦斯" : index === "Minerals" ? "晶体矿" : index;
      const value = valueFromBlock(vital);
      if (label && value !== undefined) {
        parts.push(`${label} ${value}`);
      }
    }
    for (const cooldown of directChildBlocks(costBlock.inner, "Cooldown")) {
      const timeStart = cooldown.attrs.get("TimeStart") ?? tagValue(cooldown, "TimeStart");
      const timeUse = cooldown.attrs.get("TimeUse") ?? tagValue(cooldown, "TimeUse");
      const location = cooldown.attrs.get("Location") ?? tagValue(cooldown, "Location");
      const link = cooldown.attrs.get("Link") ?? tagValue(cooldown, "Link");
      const pieces = [];
      if (timeStart !== undefined) {
        pieces.push(`初始 ${formatSeconds(timeStart)}`);
      }
      if (timeUse !== undefined) {
        pieces.push(`使用 ${formatSeconds(timeUse)}`);
      }
      if (location) {
        pieces.push(`位置 ${location}`);
      }
      if (link) {
        pieces.push(`链接 ${link}`);
      }
      if (pieces.length > 0) {
        parts.push(`冷却 ${pieces.join("，")}`);
      }
    }
    for (const charge of directChildBlocks(costBlock.inner, "Charge")) {
      const countMax = charge.attrs.get("CountMax") ?? tagValue(charge, "CountMax");
      const countUse = charge.attrs.get("CountUse") ?? tagValue(charge, "CountUse");
      const timeStart = charge.attrs.get("TimeStart") ?? tagValue(charge, "TimeStart");
      const timeUse = charge.attrs.get("TimeUse") ?? tagValue(charge, "TimeUse");
      const link = charge.attrs.get("Link") ?? tagValue(charge, "Link");
      const pieces = [];
      if (countMax !== undefined) {
        pieces.push(`最大 ${countMax}`);
      }
      if (countUse !== undefined) {
        pieces.push(`每次 ${countUse}`);
      }
      if (timeStart !== undefined) {
        pieces.push(`初始恢复 ${formatSeconds(timeStart)}`);
      }
      if (timeUse !== undefined) {
        pieces.push(`恢复 ${formatSeconds(timeUse)}`);
      }
      if (link) {
        pieces.push(`链接 ${link}`);
      }
      if (pieces.length > 0) {
        parts.push(`充能 ${pieces.join("，")}`);
      }
    }
  }
  for (const info of directChildBlocks(abilityNode.text, "InfoArray")) {
    const unit = info.attrs.get("Unit");
    const time = info.attrs.get("Time");
    const pieces = [];
    if (unit) {
      pieces.push(`建造 ${unit}`);
    }
    if (time) {
      pieces.push(`建造时间 ${formatSeconds(time)}`);
    }
    for (const vital of directChildBlocks(info.inner, "Vital")) {
      const index = vital.attrs.get("index") ?? vital.attrs.get("Index");
      const label = index === "Energy" || index === "2" ? "能量" : index === "Vespene" ? "瓦斯" : index === "Minerals" ? "晶体矿" : index;
      const value = valueFromBlock(vital);
      if (label && value !== undefined) {
        pieces.push(`${label} ${value}`);
      }
    }
    for (const cooldown of directChildBlocks(info.inner, "Cooldown")) {
      const timeUse = cooldown.attrs.get("TimeUse") ?? tagValue(cooldown, "TimeUse");
      if (timeUse !== undefined) {
        pieces.push(`冷却 ${formatSeconds(timeUse)}`);
      }
    }
    if (pieces.length > 0) {
      parts.push(pieces.join("，"));
    }
  }
  return parts.length > 0 ? [...new Set(parts)].join("；") : "无显式费用/冷却字段";
}

function summarizeAbilityNode(node) {
  if (!node) {
    return "";
  }
  const pieces = [];
  const range = fieldValueFromNode(node, "Range");
  if (range !== undefined) {
    pieces.push(`射程 ${range}`);
  }
  const effect = fieldValueFromNode(node, "Effect");
  if (effect !== undefined) {
    pieces.push(`主效果 ${effect}`);
  }
  const cursorEffect = fieldValueFromNode(node, "CursorEffect");
  if (cursorEffect !== undefined) {
    pieces.push(`目标效果 ${cursorEffect}`);
  }
  const producedUnits = directChildBlocks(node.text, "ProducedUnitArray").map((block) => valueFromBlock(block)).filter(Boolean);
  if (producedUnits.length > 0) {
    pieces.push(`产物 ${producedUnits.join(", ")}`);
  }
  return pieces.join("；");
}

function tooltipForEntry(entry, strings, indexes) {
  const candidates = [
    `Button/Tooltip/${entry.buttonId}`,
    `Button/Tooltip/${entry.abilityId}`,
  ];
  for (const candidate of candidates) {
    const text = getString(strings, candidate, indexes);
    if (text) {
      return text;
    }
  }
  return "";
}

function nameForEntry(entry, strings, indexes) {
  const override = panelNameOverrides.get(`${entry.commander}:${entry.panelId}`);
  if (override) {
    return override;
  }
  const candidates = [
    `Button/Name/${entry.buttonId}`,
    `Button/Name/${entry.abilityId}`,
  ];
  for (const candidate of candidates) {
    const text = getString(strings, candidate, indexes);
    if (text) {
      return text;
    }
  }
  return entry.panelId;
}

function statusForEntry(entry, indexes) {
  const statuses = [
    ["ability", entry.abilityId],
    ["button", entry.buttonId],
    ["requirement", entry.requirementId],
    ["unit", entry.casterId],
  ].filter(([, id]) => id);
  const missing = statuses.filter(([kind, id]) => catalogStatus(indexes, kind, id) === "缺失");
  return missing.length === 0
    ? "profile 已接；ability/button/requirement/caster 可解析；未实机施法"
    : `profile 已接；缺 ${missing.map(([kind, id]) => `${kind}:${id}`).join(", ")}`;
}

function toRow(entry, strings, indexes) {
  const abilityNode = catalogNode(indexes, "ability", entry.abilityId);
  const note = effectNotes.get(`${entry.commander}:${entry.panelId}`) ?? "";
  const tooltip = tooltipForEntry(entry, strings, indexes);
  return {
    commander: commanderNames.get(entry.commander) ?? entry.commander,
    commanderId: entry.commander,
    panelName: nameForEntry(entry, strings, indexes),
    panelId: entry.panelId,
    abilityId: entry.abilityId,
    abilityCatalog: catalogStatus(indexes, "ability", entry.abilityId),
    buttonId: entry.buttonId,
    buttonCatalog: catalogStatus(indexes, "button", entry.buttonId),
    requirementId: entry.requirementId || "",
    requirementCatalog: catalogStatus(indexes, "requirement", entry.requirementId),
    casterId: entry.casterId,
    casterCatalog: catalogStatus(indexes, "unit", entry.casterId),
    targetMode: targetModeNames.get(entry.targetMode) ?? entry.targetMode,
    cost: describeCost(abilityNode),
    abilitySummary: summarizeAbilityNode(abilityNode),
    effect: [tooltip, note].filter(Boolean).join("；"),
    status: statusForEntry(entry, indexes),
  };
}

function tsvEscape(value) {
  return String(value ?? "").replaceAll("\t", " ").replaceAll(/\r?\n/g, " ");
}

function renderTsv(rows) {
  const headers = [
    "指挥官",
    "面板技能",
    "panelId",
    "abilityId",
    "abilityCatalog",
    "buttonId",
    "buttonCatalog",
    "requirementId",
    "requirementCatalog",
    "casterId",
    "casterCatalog",
    "目标方式",
    "费用/冷却/充能",
    "能力节点摘要",
    "具体效果",
    "当前状态",
  ];
  const lines = [headers.join("\t")];
  for (const row of rows) {
    lines.push([
      row.commander,
      row.panelName,
      row.panelId,
      row.abilityId,
      row.abilityCatalog,
      row.buttonId,
      row.buttonCatalog,
      row.requirementId,
      row.requirementCatalog,
      row.casterId,
      row.casterCatalog,
      row.targetMode,
      row.cost,
      row.abilitySummary,
      row.effect,
      row.status,
    ].map(tsvEscape).join("\t"));
  }
  return `${lines.join("\n")}\n`;
}

function renderMarkdown(rows) {
  const lines = [];
  const scopeNames = [...scopeCommanders].map((commander) => commanderNames.get(commander) ?? commander).join("、");
  lines.push("# XMFinal 原始mod指挥官面板技能审计");
  lines.push("");
  lines.push(`生成时间：${new Date().toISOString()}`);
  lines.push("");
  lines.push("## 结论");
  lines.push("");
  lines.push(`- 范围：${scopeNames}。`);
  lines.push("- 当前 `LibE0EAE146_CommanderPanels.galaxy` 已为这些指挥官登记面板技能 profile。");
  lines.push("- 本表检查 ability、button、requirement、caster Catalog 是否能从本地 XMFinal 或其官方依赖解析，并列出费用、冷却、充能和可读效果。");
  lines.push("- 注意：当前 smoke 只读取 Catalog metadata，不向 SC2 实机发出施法命令；目标选择、隐藏 caster、actor 播放和效果落地仍需要进图验证。");
  lines.push("");

  for (const commanderId of scopeCommanders) {
    const commanderRows = rows.filter((row) => row.commanderId === commanderId);
    if (commanderRows.length === 0) {
      continue;
    }
    lines.push(`## ${commanderRows[0].commander}`);
    lines.push("");
    lines.push("| 面板技能 | ability | button | requirement | caster | 费用/冷却/充能 | 具体效果 | 状态 |");
    lines.push("|---|---|---|---|---|---|---|---|");
    for (const row of commanderRows) {
      lines.push(`| ${md(row.panelName)} | ${md(row.abilityId)} | ${md(row.buttonId)} | ${md(row.requirementId || "无")} | ${md(row.casterId)} | ${md(row.cost)} | ${md(row.effect || row.abilitySummary || "无")} | ${md(row.status)} |`);
    }
    lines.push("");
  }

  lines.push("## 剩余风险");
  lines.push("");
  lines.push("- `profile 已接` 只代表测试台能扫到条目，并且 Catalog metadata 可解析；它不等价于进图后按钮一定出现、目标模式一定正确、效果一定播放。");
  lines.push("- 阿塔尼斯、沃拉尊的部分 SOA 技能来自 `Void.SC2Campaign` 依赖；XMFinal 的 `DocumentInfo` 已依赖该战役包，但仍要实机验证目标模式和按钮状态。");
  lines.push("- 凯瑞甘、雷诺、阿拉纳克、凯拉克斯等技能已把合作 Catalog 节点导入 XMFinal，但部分效果链还依赖 actor/model/sound/validator 的递归闭包，当前静态审计只能证明没有硬缺 ID。");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function md(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\r", " ")
    .replaceAll("\n", " ")
    .trim();
}

function main() {
  const args = parseArgs();
  const outputDir = args.get("output-dir") ? path.resolve(String(args.get("output-dir"))) : defaultOutputDir;
  const indexes = readAllCatalogs();
  const strings = readLocalizedStrings();
  const entries = parsePanelEntries();
  const rows = entries
    .map((entry) => toRow(entry, strings, indexes))
    .sort((a, b) => a.commanderId.localeCompare(b.commanderId) || a.panelId.localeCompare(b.panelId));

  writeText(path.join(outputDir, "xmfinal-panel-skill-audit.tsv"), renderTsv(rows));
  writeText(path.join(outputDir, "xmfinal-panel-skill-audit.md"), renderMarkdown(rows));

  const missingRows = rows.filter((row) => row.status.includes("缺 "));
  console.log(`XMFINAL_PANEL_SKILL_ROWS=${rows.length}`);
  console.log(`XMFINAL_PANEL_SKILL_MISSING_ROWS=${missingRows.length}`);
  console.log(`XMFINAL_PANEL_SKILL_OUTPUT=${path.relative(root, outputDir).replaceAll("\\", "/")}`);
}

main();
