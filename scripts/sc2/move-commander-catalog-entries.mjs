import fs from 'fs';
import path from 'path';
import process from 'process';

function parseArgs(argv) {
  const args = {
    dryRun: false,
    commander: '',
    finalRoot: '',
    moduleRoot: '',
    files: '',
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (current === '--dry-run') {
      args.dryRun = true;
      continue;
    }
    if (current === '--commander') {
      args.commander = argv[++i] || '';
      continue;
    }
    if (current === '--final-root') {
      args.finalRoot = argv[++i] || '';
      continue;
    }
    if (current === '--module-root') {
      args.moduleRoot = argv[++i] || '';
      continue;
    }
    if (current === '--files') {
      args.files = argv[++i] || '';
      continue;
    }
    throw new Error(`Unknown argument: ${current}`);
  }

  return args;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseEntries(text) {
  const entries = [];
  const re = /\n(\s*<([A-Za-z][\w]*)\b[^>]*\bid="([^"]+)"[\s\S]*?\n\s*<\/\2>)/g;
  let match;
  while ((match = re.exec(text))) {
    entries.push({
      block: match[1],
      tag: match[2],
      id: match[3],
      start: match.index + 1,
      end: match.index + 1 + match[1].length,
    });
  }
  return entries;
}

function rootCloseTagName(text) {
  const match = text.match(/<\/([A-Za-z][\w]*)>\s*$/);
  if (!match) {
    throw new Error('Could not locate the root closing tag.');
  }
  return match[1];
}

function insertBeforeRootClose(text, block) {
  const closeTag = rootCloseTagName(text);
  const marker = `</${closeTag}>`;
  const index = text.lastIndexOf(marker);
  if (index < 0) {
    throw new Error(`Could not locate closing tag ${marker}.`);
  }
  const prefix = text.slice(0, index).replace(/\s*$/, '');
  const suffix = text.slice(index);
  const newline = prefix.endsWith('\r\n') || suffix.startsWith('\r\n') ? '\r\n' : '\n';
  return `${prefix}${newline}${block}${newline}${suffix}`;
}

function createEmptyDocumentLike(text) {
  const xmlDeclMatch = text.match(/<\?xml[^>]*\?>/i);
  const rootOpenMatch = text.match(/<([A-Za-z][\w]*)\b[^>]*>/);
  if (!rootOpenMatch) {
    throw new Error('Could not detect root tag for creating a missing module file.');
  }
  const rootName = rootOpenMatch[1];
  const xmlDecl = xmlDeclMatch ? `${xmlDeclMatch[0]}\n` : '';
  return `${xmlDecl}<${rootName}>\n</${rootName}>\n`;
}

function replaceExactBlock(text, oldBlock, newBlock) {
  const index = text.indexOf(oldBlock);
  if (index < 0) {
    return null;
  }
  return `${text.slice(0, index)}${newBlock}${text.slice(index + oldBlock.length)}`;
}

function makeDehakaMatcher() {
  const prefixes = [
    'Dehaka',
    'Dehhaka',
    'Glevig',
    'Murvar',
    'Dakrun',
    'CoopMurvar',
    'CommanderPrestigeDehaka',
    'K5Primal',
    'HaveK5Primal',
    'LearnDehaka',
    'HaveDehaka',
    'CountUpgradeDehaka',
    'LearnPrimal',
    'HavePrimal',
    'CountUpgradePrimal',
    'ResearchDehaka',
    'DehakaLevel',
    'DehakaLearn',
    'DehakaSummon',
    'DehakaTrain',
    'DehakaMutalisk',
    'DehakaRoach',
    'DehakaHydralisk',
    'DehakaUltralisk',
    'DehakaDrone',
    'DehakaBarracks',
    'DehakaHatchery',
    'DehakaCreeper',
    'DehakaNydus',
    'DehakaTownHall',
    'DehakaPrimal',
    'Primal',
    'PrimalSlash',
    'PrimalHydralisk',
    'PrimalRoach',
    'PrimalMutalisk',
    'PrimalUltralisk',
    'PrimalZergling',
    'PrimalSwarmHost',
    'PrimalGuardian',
    'PrimalImpaler',
    'PrimalRavasaur',
    'PrimalNeedleSpines',
    'PrimalUnitMerge',
    'PrimalReconstitution',
    'PrimalHeal',
    'PrimalTownHall',
    'PrimalEgg',
    'PrimalWurm',
    'PrimalBuilding',
    'PrimalCombat',
    'PrimalBoss',
    'PrimalArmor',
    'PrimalWeapons',
    'PrimalMutation',
    'PrimalSlashTarget',
    'PrimalSlashUpgraded',
    'PrimalHydraliskToMutalisk',
    'PrimalHydraliskImpalerMerge',
    'PrimalRoachGuardianMerge',
    'PrimalRoachLevel2Merge',
    'PrimalSwarmHostMerge',
    'PrimalUltraliskLevel2Merge',
    'PrimalZerglingRavasaurMerge',
    'PrimalMutaliskLevel2Merge',
    'PrimalGuardianPassive',
    'PrimalImpalerPassive',
    'PrimalRavasaurRange',
    'PrimalRavasaurVSArmor',
    'PrimalUltraliskBash',
    'PrimalUltraliskCrashingCharge',
    'PrimalMutaliskRespawnOnDeath',
    'PrimalSlashTargetFilters',
    'PrimalSlashTargetChecksClose',
    'PrimalSlashUpgradedMover',
    'PrimalTownHallWeapon',
    'DehakaCoop',
    'CoopCasterDehaka',
  ];

  return (id) => prefixes.some((prefix) => id.startsWith(prefix));
}

function getCommanderMatcher(commander) {
  if (commander !== 'Dehaka') {
    throw new Error(`No matcher configured for commander: ${commander}`);
  }
  return makeDehakaMatcher();
}

function unique(array) {
  return [...new Set(array)];
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.commander) {
    throw new Error('Usage: node scripts/sc2/move-commander-catalog-entries.mjs --commander Dehaka [--dry-run]');
  }

  const repoRoot = process.cwd();
  const finalRoot = args.finalRoot
    ? path.resolve(repoRoot, args.finalRoot)
    : path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM', 'XMFinal.SC2Mod', 'Base.SC2Data', 'GameData');
  const moduleRoot = args.moduleRoot
    ? path.resolve(repoRoot, args.moduleRoot)
    : path.join(repoRoot, '合作指挥官版起义狂潮', 'Mods', 'XM', `XM${args.commander}.SC2Mod`, 'Base.SC2Data', 'GameData');

  const explicitFiles = args.files
    ? args.files.split(',').map((item) => item.trim()).filter(Boolean)
    : null;
  const skipFiles = new Set([
    'UserData.xml',
    'GameData.xml',
    'ModData.xml',
    'RaceData.xml',
    'ArmyCategoryData.xml',
    'ArmyUnitData.xml',
    'characterdata.xml',
    'datacollectiondata.xml',
    'herodata.xml',
    'locationdata.xml',
    'playerresponsedata.xml',
    'skindata.xml',
    'texturedata.xml',
  ]);

  const matcher = getCommanderMatcher(args.commander);
  const fileNames = unique(
    explicitFiles || fs.readdirSync(finalRoot).filter((name) => name.toLowerCase().endsWith('.xml'))
  ).filter((name) => !skipFiles.has(name)).sort();

  const report = [];

  for (const fileName of fileNames) {
    const finalPath = path.join(finalRoot, fileName);
    if (!fs.existsSync(finalPath)) {
      continue;
    }

    const modulePath = path.join(moduleRoot, fileName);
    const finalText = fs.readFileSync(finalPath, 'utf8');
    const finalEntries = parseEntries(finalText);
    if (finalEntries.length === 0) {
      continue;
    }

    const targetEntries = finalEntries.filter((entry) => matcher(entry.id));
    if (targetEntries.length === 0) {
      continue;
    }

    let nextFinalText = finalText;
    let nextModuleText = fs.existsSync(modulePath)
      ? fs.readFileSync(modulePath, 'utf8')
      : createEmptyDocumentLike(finalText);
    const moved = [];
    const replaced = [];
    const inserted = [];

    for (const entry of targetEntries) {
      const moduleEntries = parseEntries(nextModuleText);
      const existing = moduleEntries.find((candidate) => candidate.id === entry.id);
      if (existing) {
        const updatedModuleText = replaceExactBlock(nextModuleText, existing.block, entry.block);
        if (updatedModuleText && updatedModuleText !== nextModuleText) {
          nextModuleText = updatedModuleText;
          replaced.push(entry.id);
        }
      } else {
        nextModuleText = insertBeforeRootClose(nextModuleText, entry.block);
        inserted.push(entry.id);
      }

      const updatedFinalText = replaceExactBlock(nextFinalText, entry.block, '');
      if (updatedFinalText === null) {
        throw new Error(`Could not remove ${entry.id} from ${fileName}.`);
      }
      nextFinalText = updatedFinalText;
      moved.push(entry.id);
    }

    if (!args.dryRun) {
      fs.writeFileSync(finalPath, nextFinalText, 'utf8');
      fs.writeFileSync(modulePath, nextModuleText, 'utf8');
    }

    report.push({
      file: fileName,
      moved: moved.length,
      inserted,
      replaced,
      ids: moved,
    });
  }

  const totalMoved = report.reduce((sum, item) => sum + item.moved, 0);
  const verb = args.dryRun ? 'DRY-RUN' : 'MOVED';
  console.log(`${verb} ${totalMoved} entries for ${args.commander}.`);
  for (const item of report) {
    console.log(`${item.file}: moved=${item.moved}, inserted=${item.inserted.length}, replaced=${item.replaced.length}`);
  }
  if (args.dryRun) {
    console.log('No files were written.');
  }
}

main();
