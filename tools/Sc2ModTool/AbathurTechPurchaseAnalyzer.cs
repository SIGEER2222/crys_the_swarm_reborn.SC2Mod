using System.Text;
using System.Text.Json;
using System.Xml;

namespace Sc2ModTool;

/// <summary>
/// 阿巴瑟科技购买系统分析器
/// </summary>
public sealed class AbathurTechPurchaseAnalyzer
{
    private readonly string _modRoot;
    private readonly Dictionary<string, XmlDocument> _xmlCache = new(StringComparer.OrdinalIgnoreCase);

    public AbathurTechPurchaseAnalyzer(string modRoot)
    {
        _modRoot = modRoot;
    }

    public List<AbathurPurchaseTech> GetAllPurchaseTechs()
    {
        var abilDoc = LoadXml("Base.SC2Data/GameData/AbilData.xml");
        var unitDoc = LoadXml("Base.SC2Data/GameData/UnitData.xml");
        var buttonDoc = LoadXml("Base.SC2Data/GameData/ButtonData.xml");
        var effectDoc = LoadXml("Base.SC2Data/GameData/EffectData.xml");
        var behaviorDoc = LoadXml("Base.SC2Data/GameData/BehaviorData.xml");

        var purchaseAbilities = FindPurchaseAbilities(abilDoc);
        var results = new List<AbathurPurchaseTech>();

        foreach (var ability in purchaseAbilities)
        {
            var tech = AnalyzePurchaseAbility(ability, unitDoc, buttonDoc, effectDoc, behaviorDoc);
            if (tech != null)
                results.Add(tech);
        }

        return results.OrderBy(t => t.UnitName).ThenBy(t => t.TechName).ToList();
    }

    public Dictionary<string, List<AbathurPurchaseTech>> GetTechsByUnit()
    {
        return GetAllPurchaseTechs()
            .GroupBy(t => t.UnitName)
            .ToDictionary(g => g.Key, g => g.ToList());
    }

    public void PrintSummary()
    {
        var byUnit = GetTechsByUnit();

        Console.OutputEncoding = Encoding.UTF8;
        Console.WriteLine("=== 阿巴瑟科技购买系统汇总 ===\n");

        foreach (var (unitName, techs) in byUnit.OrderBy(x => x.Key))
        {
            Console.WriteLine($"【{unitName}】({techs.First().UnitId})");
            Console.WriteLine($"  科技数量: {techs.Count}");

            foreach (var tech in techs)
            {
                var costStr = (tech.CostMinerals, tech.CostVespene) switch
                {
                    (> 0, > 0) => $"[{tech.CostMinerals}/{tech.CostVespene}]",
                    (> 0, 0) => $"[{tech.CostMinerals}/0]",
                    (0, > 0) => $"[0/{tech.CostVespene}]",
                    _ => "[免费]"
                };
                Console.WriteLine($"    • {tech.TechName} {costStr}");
                if (!string.IsNullOrEmpty(tech.EffectDescription))
                    Console.WriteLine($"      效果: {tech.EffectDescription}");
            }
            Console.WriteLine();
        }

        Console.WriteLine($"总计: {byUnit.Count} 个单位, {byUnit.Sum(x => x.Value.Count)} 项科技");
    }

    public void PrintJson()
    {
        var json = JsonSerializer.Serialize(GetAllPurchaseTechs(), new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        Console.WriteLine(json);
    }

    public void ExportToFile(string outputPath)
    {
        var json = JsonSerializer.Serialize(GetAllPurchaseTechs(), new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        File.WriteAllText(outputPath, json);
        Console.WriteLine($"已导出到: {outputPath}");
    }

    // ── 查找所有 Purchase 能力 ──────────────────────────────────

    private static List<XmlElement> FindPurchaseAbilities(XmlDocument abilDoc)
    {
        var results = new List<XmlElement>();
        var root = abilDoc.DocumentElement;
        if (root == null) return results;

        var nodes = root.SelectNodes("//*[contains(@id, 'Purchase')]");
        if (nodes == null) return results;

        foreach (XmlNode node in nodes)
            if (node is XmlElement el)
                results.Add(el);

        return results;
    }

    // ── 分析单个 Purchase 能力 ──────────────────────────────────

    private AbathurPurchaseTech? AnalyzePurchaseAbility(
        XmlElement ability, XmlDocument unitDoc, XmlDocument buttonDoc,
        XmlDocument effectDoc, XmlDocument behaviorDoc)
    {
        var abilityId = ability.GetAttribute("id");
        if (string.IsNullOrEmpty(abilityId)) return null;

        var buttonFace = GetButtonFace(ability);
        var displayName = GetButtonDisplayName(buttonFace, buttonDoc) ?? abilityId;
        var (unitId, unitName) = FindUnitUsingAbility(abilityId, unitDoc);
        var (minerals, vespene) = GetAbilityCost(ability);
        var effectDesc = ResolveEffectDescription(ability, effectDoc, behaviorDoc);

        return new AbathurPurchaseTech
        {
            AbilityId = abilityId,
            TechName = displayName,
            UnitId = unitId,
            UnitName = unitName,
            ButtonFace = buttonFace,
            CostMinerals = minerals,
            CostVespene = vespene,
            EffectDescription = effectDesc
        };
    }

    // ── 成本解析 ────────────────────────────────────────────────

    private static (int minerals, int vespene) GetAbilityCost(XmlElement ability)
    {
        var costNode = ability.SelectSingleNode("./Cost");
        if (costNode is not XmlElement cost) return (0, 0);

        int minerals = 0, vespene = 0;

        var mNode = cost.SelectSingleNode("./Resource[@index='Minerals']");
        if (mNode is XmlElement mEl && int.TryParse(mEl.GetAttribute("value"), out var m))
            minerals = m;

        var vNode = cost.SelectSingleNode("./Resource[@index='Vespene']");
        if (vNode is XmlElement vEl && int.TryParse(vEl.GetAttribute("value"), out var v))
            vespene = v;

        return (minerals, vespene);
    }

    // ── 效果解析链：Ability → Effect → Behavior → Modification ──

    private string? ResolveEffectDescription(
        XmlElement ability, XmlDocument effectDoc, XmlDocument behaviorDoc)
    {
        // 1) 从 Ability 取 Effect 引用
        var effectRef = ability.SelectSingleNode("./Effect[@index='0']")?.Attributes?["value"]?.Value;
        if (string.IsNullOrEmpty(effectRef)) return null;

        // 2) 在 EffectData 中找到效果
        var effectEl = effectDoc.SelectSingleNode($"//*[@id={ToXPathLiteral(effectRef)}]") as XmlElement;
        if (effectEl == null) return effectRef;

        var effectType = effectEl.LocalName;
        var parts = new List<string>();

        if (effectType == "CEffectSet")
        {
            // CEffectSet: 递归展开所有子效果
            var subEffects = effectEl.SelectNodes("./EffectArray");
            if (subEffects != null)
            {
                foreach (XmlNode subNode in subEffects)
                {
                    var subRef = subNode.Attributes?["value"]?.Value;
                    if (string.IsNullOrEmpty(subRef)) continue;

                    var subEl = effectDoc.SelectSingleNode($"//*[@id={ToXPathLiteral(subRef)}]") as XmlElement;
                    if (subEl == null) continue;

                    var subDesc = DescribeSingleEffect(subEl, effectDoc, behaviorDoc);
                    if (!string.IsNullOrEmpty(subDesc))
                        parts.Add(subDesc);
                }
            }
        }
        else
        {
            var desc = DescribeSingleEffect(effectEl, effectDoc, behaviorDoc);
            if (!string.IsNullOrEmpty(desc))
                parts.Add(desc);
        }

        return parts.Count > 0 ? string.Join("; ", parts) : effectRef;
    }

    private string? DescribeSingleEffect(XmlElement effectEl, XmlDocument effectDoc, XmlDocument behaviorDoc)
    {
        var effectType = effectEl.LocalName;

        if (effectType == "CEffectApplyBehavior")
        {
            var behaviorRef = effectEl.SelectSingleNode("./Behavior")?.Attributes?["value"]?.Value;
            if (string.IsNullOrEmpty(behaviorRef)) return null;

            var behaviorEl = behaviorDoc.SelectSingleNode($"//*[@id={ToXPathLiteral(behaviorRef)}]") as XmlElement;
            if (behaviorEl == null) return behaviorRef;

            return DescribeBuffModification(behaviorEl);
        }

        if (effectType == "CEffectModifyUnit")
        {
            var vitalEl = effectEl.SelectSingleNode("./VitalArray") as XmlElement;
            if (vitalEl == null) return null;

            var index = vitalEl.GetAttribute("index");
            var change = vitalEl.SelectSingleNode("./Change")?.Attributes?["value"]?.Value ?? "?";

            return index switch
            {
                "Life" => $"立即恢复{change}生命",
                "Energy" => $"立即恢复{change}能量",
                "Shield" => $"立即恢复{change}护盾",
                _ => $"恢复{index}+{change}"
            };
        }

        return null;
    }

    /// <summary>
    /// 把 CBehaviorBuff 下的 Modification 子节点翻译成可读文本
    /// </summary>
    private static string DescribeBuffModification(XmlElement buffEl)
    {
        var parts = new List<string>();
        var mod = buffEl.SelectSingleNode("./Modification");

        if (mod == null)
        {
            // 没有Modification的Buff是标记型Buff，尝试从ID推断含义
            return InferBuffPurpose(buffEl.GetAttribute("id"));
        }

        // 解析子节点形式的Modification
        foreach (XmlNode child in mod.ChildNodes)
        {
            if (child is not XmlElement el) continue;
            var desc = DescribeModificationEntry(el);
            if (!string.IsNullOrEmpty(desc))
                parts.Add(desc);
        }

        // 解析属性形式的Modification（如 <Modification SightBonus="2"/>）
        if (parts.Count == 0 && mod.Attributes != null)
        {
            foreach (XmlAttribute attr in mod.Attributes)
            {
                var desc = DescribeModificationEntry(attr.Name, attr.Value);
                if (!string.IsNullOrEmpty(desc))
                    parts.Add(desc);
            }
        }

        return parts.Count > 0 ? string.Join("; ", parts) : InferBuffPurpose(buffEl.GetAttribute("id"));
    }

    private static string InferBuffPurpose(string buffId)
    {
        return buffId switch
        {
            var id when id.Contains("FleshyAbundance") => "治疗技能增强(受治疗单位受伤降低)",
            var id when id.Contains("Plaguebearer") => "解锁瘟疫使者能力",
            var id when id.Contains("MutagenicFission") => "解锁突变裂变能力",
            var id when id.Contains("ImposingPresence") => "解锁威严存在能力",
            var id when id.Contains("MimeticMembrane") => "周期性隐身(拟态膜)",
            _ => buffId
        };
    }

    private static string? DescribeModificationEntry(string tag, string value)
    {
        return tag switch
        {
            "LifeArmorBonus" => $"护甲+{value}",
            "SightBonus" => $"视野+{value}",
            "MoveSpeedMultiplier" => $"移速x{value}",
            "AttackSpeedMultiplier" => $"攻速x{value}",
            "RangedWeaponRange" => $"射程+{value}",
            _ => null
        };
    }

    private static string? DescribeModificationEntry(XmlElement el)
    {
        var tag = el.LocalName;
        var value = el.GetAttribute("value");
        var index = el.GetAttribute("index");

        return tag switch
        {
            "LifeArmorBonus" => $"护甲+{value}",
            "LifeMax" => $"生命值+{value}",
            "VitalMaxArray" when index == "Life" => $"生命值+{value}",
            "VitalMaxArray" when index == "Shield" => $"护盾+{value}",
            "VitalMaxArray" when index == "Energy" => $"能量上限+{value}",
            "VitalRegenArray" when index == "Life" => $"生命回复+{value}/s",
            "VitalRegenArray" when index == "Energy" => $"能量回复+{value}/s",
            "VitalMaxIncreaseAffectsCurrentArray" => null, // 辅助属性，跳过
            "MoveSpeedMultiplier" => $"移速x{value}",
            "AttackSpeedMultiplier" => $"攻速x{value}",
            "SightBonus" => $"视野+{value}",
            "RangedWeaponRange" when value.StartsWith("-") => $"射程{value}",
            "RangedWeaponRange" => $"射程+{value}",
            "DamageDealtFraction" => $"{index}伤害+{value}",
            "DamageDealtAttributeScaled" => $"对重甲额外伤害+{value}",
            "DamageTakenFraction" => $"{index}受伤{value}",
            "WeaponDamageArray" => $"武器伤害[{index}]修改",
            "VitalDamageLeechArray" when index == "Life" => $"生命偷取",
            "AbilLinkDisableArray" => null, // 禁用能力，跳过
            _ => null
        };
    }

    // ── 按钮与单位查找 ──────────────────────────────────────────

    private static string? GetButtonFace(XmlElement ability)
    {
        var cmd = ability.SelectSingleNode(".//CmdButtonArray[@index='Execute']");
        return cmd?.Attributes?["DefaultButtonFace"]?.Value;
    }

    private static string? GetButtonDisplayName(string? buttonFace, XmlDocument buttonDoc)
    {
        if (string.IsNullOrEmpty(buttonFace)) return null;
        var btn = buttonDoc.SelectSingleNode($"//CButton[@id={ToXPathLiteral(buttonFace)}]") as XmlElement;
        if (btn == null) return buttonFace;

        var nameEl = btn.SelectSingleNode("./Name") as XmlElement;
        return nameEl?.GetAttribute("value") ?? buttonFace;
    }

    private static (string unitId, string unitName) FindUnitUsingAbility(string abilityId, XmlDocument unitDoc)
    {
        var units = unitDoc.SelectNodes($"//CUnit[AbilArray/@Link={ToXPathLiteral(abilityId)}]");
        if (units != null && units.Count > 0 && units[0] is XmlElement unit)
        {
            var id = unit.GetAttribute("id");
            var nameEl = unit.SelectSingleNode("./Name") as XmlElement;
            var name = nameEl?.GetAttribute("value") ?? id;
            return (id, name);
        }
        return ("Unknown", "Unknown");
    }

    // ── 工具方法 ────────────────────────────────────────────────

    private XmlDocument LoadXml(string relativePath)
    {
        if (!_xmlCache.TryGetValue(relativePath, out var doc))
        {
            var fullPath = Path.Combine(_modRoot, relativePath);
            doc = new XmlDocument();
            doc.Load(fullPath);
            _xmlCache[relativePath] = doc;
        }
        return doc;
    }

    private static string ToXPathLiteral(string value)
    {
        if (!value.Contains('\'')) return $"'{value}'";
        if (!value.Contains('"')) return $"\"{value}\"";
        throw new InvalidOperationException("XPath literal cannot contain both quote types");
    }
}

/// <summary>
/// 阿巴瑟科技购买项
/// </summary>
public sealed class AbathurPurchaseTech
{
    public string AbilityId { get; set; } = string.Empty;
    public string TechName { get; set; } = string.Empty;
    public string UnitId { get; set; } = string.Empty;
    public string UnitName { get; set; } = string.Empty;
    public string? ButtonFace { get; set; }
    public int CostMinerals { get; set; }
    public int CostVespene { get; set; }
    public string? EffectDescription { get; set; }
}
