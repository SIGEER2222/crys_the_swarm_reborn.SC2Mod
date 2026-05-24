const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

const HTML_DIR = path.join(__dirname, '网页');
const MD_DIR = path.join(__dirname, 'markdown');

// 确保输出目录存在
if (!fs.existsSync(MD_DIR)) {
  fs.mkdirSync(MD_DIR, { recursive: true });
}

// 初始化Turndown
const turndown = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// 获取所有HTML文件
function getHtmlFiles() {
  const files = fs.readdirSync(HTML_DIR);
  return files.filter(f => f.endsWith('.html') && !f.startsWith('.'));
}

// 从文件名提取指挥官名称
function extractCommanderName(filename) {
  const match = filename.match(/^(.+?)\s+-/);
  return match ? match[1] : filename.replace('.html', '');
}

// 提取主要内容
function extractMainContent(dom) {
  const doc = dom.window.document;
  
  // 尝试找到主要内容区域
  let content = null;
  
  // MediaWiki常见的内容容器
  const selectors = [
    '#mw-content-text',
    '.mw-parser-output',
    'article',
    'main',
    '.content',
    '#content'
  ];
  
  for (const selector of selectors) {
    content = doc.querySelector(selector);
    if (content) break;
  }
  
  if (!content) {
    // 如果找不到，尝试使用body
    content = doc.body;
  }
  
  return content;
}

// 清理不需要的元素
function cleanUpContent(content) {
  // 移除脚本和样式
  const elementsToRemove = content.querySelectorAll('script, style, noscript, iframe, nav, header, footer, aside');
  elementsToRemove.forEach(el => el.remove());
  
  // 移除可能的导航和侧边栏
  const possibleNavElements = content.querySelectorAll('.nav, .sidebar, .toc, #toc, .navigation');
  possibleNavElements.forEach(el => el.remove());
  
  return content;
}

// 处理单个HTML文件
function processHtmlFile(filename) {
  const filepath = path.join(HTML_DIR, filename);
  const html = fs.readFileSync(filepath, 'utf-8');
  const dom = new JSDOM(html);
  
  const commanderName = extractCommanderName(filename);
  console.log(`正在处理: ${commanderName}`);
  
  // 提取主要内容
  let content = extractMainContent(dom);
  
  if (!content) {
    console.log(`  警告: 未能提取 ${commanderName} 的内容`);
    return;
  }
  
  // 清理内容
  content = cleanUpContent(content);
  
  // 获取HTML
  const contentHtml = content.innerHTML;
  
  // 转换为Markdown
  let markdown = turndown.turndown(contentHtml);
  
  // 添加标题
  markdown = `# ${commanderName}\n\n` + markdown;
  
  // 清理多余的空行
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  
  // 保存Markdown
  const mdFilename = commanderName + '.md';
  const mdPath = path.join(MD_DIR, mdFilename);
  fs.writeFileSync(mdPath, markdown, 'utf-8');
  
  console.log(`  已保存: ${mdFilename}`);
}

// 主函数
function main() {
  console.log('开始转换HTML到Markdown...\n');
  
  const htmlFiles = getHtmlFiles();
  console.log(`找到 ${htmlFiles.length} 个HTML文件\n`);
  
  for (const file of htmlFiles) {
    try {
      processHtmlFile(file);
    } catch (e) {
      console.error(`处理 ${file} 时出错:`, e);
    }
  }
  
  console.log('\n转换完成！');
  console.log(`Markdown文件保存在: ${MD_DIR}`);
}

main();
