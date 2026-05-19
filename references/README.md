# 参考资料索引

这些资料是当前工作直接相关的本地副本。

## 官方资料

- `official-data-module-tutorial.html`
  来源：Blizzard 官方 Data Module 教程
  作用：确认数据编辑器里能力、效果、行为、按钮、需求的标准组织方式

- `official-sc2-5.0-patchnotes.html`
  来源：Blizzard 官方 5.0 patch notes
  作用：确认 5.0 后新增的数据/触发能力，尤其是：
  `Unit Add Ability`
  `Unit Remove Ability`
  `UnitAbilityChangeLink`
  `Ability Replace`

## Galaxy / API 参考

- `mapster-catalog-field-value-modify.html`
  作用：查 `CatalogFieldValueModify` 的参数和行为

- `mapster-unit-ability-change-link.html`
  作用：查单个单位把旧能力切成新能力的 API

- `mapster-unit-ability-add.html`
  作用：查单个单位新增能力的 API

- `mapster-galaxy-reference-index.html`
  作用：本地总索引，后续需要别的 API 时可以直接从这里搜

## 当前结论

- 改“施法距离”应该作用于 `Abil,xxx,Range[0]`
- 但 `Upgrade` / `CatalogFieldValueModify` 更偏玩家级或单位类型级
- 如果要做“只影响当前这一只单位”，优先考虑：
  1. 给单位新增专用能力
  2. 用 `UnitAbilityChangeLink` 切换为长施法版能力
  3. 或用 5.0 的 `Ability Replace`
