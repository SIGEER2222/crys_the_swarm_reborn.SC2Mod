const fs = require('fs');
const path = require('path');

const MARKDOWN_DIR = path.join(__dirname, 'markdown');
const OUTPUT_DIR = path.join(__dirname, '兵种');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 从文件名提取指挥官名称
function extractCommanderName(filename) {
  const match = filename.match(/^(.+?)\.md$/);
  return match ? match[1] : filename.replace('.md', '');
}

// 解析主要部队部分
function parseMainUnits(content, commanderName) {
  const units = [];
  const buildings = [];
  
  // 查找主要部队部分
  const mainUnitsMatch = content.match(/## 主要部队([\s\S]*?)(?=##|$)/);
  if (!mainUnitsMatch) return { units, buildings };
  
  const sectionContent = mainUnitsMatch[1];
  
  // 提取每一个条目（通常以图片链接开始）
  const itemPattern = /\[!\[.*?\]\(.*?\)\]\(.*?\)([\s\S]*?)(?=\[!\[|$)/g;
  let match;
  
  while ((match = itemPattern.exec(sectionContent)) !== null) {
    const itemText = match[1].trim();
    if (!itemText) continue;
    
    // 尝试提取名称
    const nameMatch = itemText.match(/^(.+?)[。\n]/);
    let name = nameMatch ? nameMatch[1].trim() : itemText.substring(0, 50).trim();
    
    // 检查是否有链接中的名称
    const linkNameMatch = match[0].match(/\[([^\]]+?)\]\(https:\/\/starcraft\.huijiwiki\.com/);
    if (linkNameMatch && linkNameMatch[1]) {
      name = linkNameMatch[1];
    }
    
    // 判断是单位还是建筑
    const isBuilding = /建筑/.test(itemText) || 
      /爬虫/.test(name) || /巢穴/.test(name) || 
      /网络/.test(name) || /晶体/.test(name) ||
      /炮台/.test(name) || /充能器/.test(name) ||
      /巨石/.test(name) || /工厂/.test(name) ||
      /兵营/.test(name) || /车间/.test(name) ||
      /星门/.test(name) || /圣堂/.test(name);
    
    const item = {
      name: name,
      commander: commanderName,
      description: itemText
    };
    
    if (isBuilding) {
      buildings.push(item);
    } else {
      units.push(item);
    }
  }
  
  return { units, buildings };
}

// 解析威望部分
function parsePrestiges(content, commanderName) {
  const prestiges = [];
  
  // 查找威望专精部分
  const prestigeSection = content.match(/## 威望专精([\s\S]*?)(?=##|$)/);
  
  if (prestigeSection) {
    const sectionContent = prestigeSection[1];
    
    // 威望1、2、3的名称通常是连续的非空行
    // 尝试提取三个威望
    const lines = sectionContent.split('\n').filter(line => line.trim());
    
    // 威望通常按顺序排列，每个威望有中文名称和英文名称
    let prestigeIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('优点') && !line.startsWith('缺点') && 
          !line.match(/^[a-zA-Z\s]+$/)) { // 不是纯英文，说明是中文威望名称
        // 找到中文名称
        const chineseName = line;
        let englishName = '';
        let description = '';
        
        // 下一行可能是英文名称
        if (i + 1 < lines.length && lines[i + 1].trim().match(/^[a-zA-Z\s]+$/)) {
          englishName = lines[i + 1].trim();
        }
        
        // 收集后续的优点缺点描述
        let j = i + (englishName ? 2 : 1);
        while (j < lines.length && !lines[j].match(/[\u4e00-\u9fa5]{3,}/) && 
               !lines[j].match(/^[a-zA-Z\s]{5,}$/)) {
          description += lines[j] + '\n';
          j++;
        }
        
        prestigeIndex++;
        if (prestigeIndex <= 3) { // 只取前3个威望
          prestiges.push({
            id: prestigeIndex,
            name: chineseName,
            englishName: englishName,
            commander: commanderName,
            description: description.trim()
          });
        }
        
        i = j - 1; // 跳到下一个可能的威望
      }
    }
  }
  
  return prestiges;
}

// 解析英雄/指挥官信息
function parseHero(content, commanderName) {
  // 查找英雄相关部分
  const heroSection = content.match(/刀锋女王|原始虫群领袖|太阳核心|雷诺|[^#]+指挥官[^\n]+/);
  
  return {
    name: commanderName,
    description: heroSection ? heroSection[0] : '',
    commander: commanderName
  };
}

// 处理单个指挥官文件
function processCommanderFile(filename) {
  const filepath = path.join(MARKDOWN_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  const commanderName = extractCommanderName(filename);
  
  console.log(`正在解析: ${commanderName}`);
  
  const { units, buildings } = parseMainUnits(content, commanderName);
  const prestiges = parsePrestiges(content, commanderName);
  const hero = parseHero(content, commanderName);
  
  return {
    commander: commanderName,
    units,
    buildings,
    prestiges,
    hero
  };
}

// 保存数据
function saveData(allData) {
  // 1. 保存总数据JSON
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'all_commanders_data.json'),
    JSON.stringify(allData, null, 2),
    'utf-8'
  );
  
  // 2. 按指挥官分文件夹保存
  allData.forEach(commanderData => {
    const commanderDir = path.join(OUTPUT_DIR, commanderData.commander);
    if (!fs.existsSync(commanderDir)) {
      fs.mkdirSync(commanderDir, { recursive: true });
    }
    
    // 保存单位
    if (commanderData.units.length > 0) {
      fs.writeFileSync(
        path.join(commanderDir, 'units.json'),
        JSON.stringify(commanderData.units, null, 2),
        'utf-8'
      );
    }
    
    // 保存建筑
    if (commanderData.buildings.length > 0) {
      fs.writeFileSync(
        path.join(commanderDir, 'buildings.json'),
        JSON.stringify(commanderData.buildings, null, 2),
        'utf-8'
      );
    }
    
    // 保存威望
    if (commanderData.prestiges.length > 0) {
      fs.writeFileSync(
        path.join(commanderDir, 'prestiges.json'),
        JSON.stringify(commanderData.prestiges, null, 2),
        'utf-8'
      );
    }
    
    // 保存英雄信息
    fs.writeFileSync(
      path.join(commanderDir, 'hero.json'),
      JSON.stringify(commanderData.hero, null, 2),
      'utf-8'
    );
  });
  
  // 3. 保存合并的单位列表
  const allUnits = allData.flatMap(c => c.units);
  const allBuildings = allData.flatMap(c => c.buildings);
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'all_units.json'),
    JSON.stringify(allUnits, null, 2),
    'utf-8'
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'all_buildings.json'),
    JSON.stringify(allBuildings, null, 2),
    'utf-8'
  );
  
  // 4. 生成Markdown汇总
  let summaryMarkdown = '# 星际争霸2合作指挥官数据汇总\n\n';
  
  allData.forEach(commanderData => {
    summaryMarkdown += `## ${commanderData.commander}\n\n`;
    
    if (commanderData.units.length > 0) {
      summaryMarkdown += '### 单位\n\n';
      commanderData.units.forEach(unit => {
        summaryMarkdown += `- **${unit.name}**\n`;
      });
      summaryMarkdown += '\n';
    }
    
    if (commanderData.buildings.length > 0) {
      summaryMarkdown += '### 建筑\n\n';
      commanderData.buildings.forEach(building => {
        summaryMarkdown += `- **${building.name}**\n`;
      });
      summaryMarkdown += '\n';
    }
    
    if (commanderData.prestiges.length > 0) {
      summaryMarkdown += '### 威望\n\n';
      commanderData.prestiges.forEach(prestige => {
        summaryMarkdown += `- **${prestige.name}**${prestige.englishName ? ` (${prestige.englishName})` : ''}\n`;
      });
      summaryMarkdown += '\n';
    }
  });
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'SUMMARY.md'),
    summaryMarkdown,
    'utf-8'
  );
}

// 主函数
function main() {
  console.log('开始解析指挥官数据...\n');
  
  const mdFiles = fs.readdirSync(MARKDOWN_DIR).filter(f => f.endsWith('.md'));
  console.log(`找到 ${mdFiles.length} 个指挥官文件\n`);
  
  const allData = [];
  
  for (const file of mdFiles) {
    try {
      const data = processCommanderFile(file);
      allData.push(data);
    } catch (e) {
      console.error(`处理 ${file} 时出错:`, e);
    }
  }
  
  console.log(`\n共解析 ${allData.length} 个指挥官数据`);
  
  saveData(allData);
  
  console.log(`\n数据已保存至: ${OUTPUT_DIR}`);
}

main();
