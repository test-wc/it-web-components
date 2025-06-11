// scripts/generate-icon-map.js
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = path.resolve('node_modules/bootstrap-italia/src/svg');
const OUTPUT_DIR = path.resolve('src/icons');
const REGISTRY_PATH = path.resolve('src/icon-registry.ts');

console.log('🧩 Generating individual icon modules...');

// Assicurati che la cartella icons esista
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.svg'));
const registryEntries = [];

files.forEach((file) => {
  const name = file.replace('.svg', '');
  const fullPath = path.join(SOURCE_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf-8').replace(/`/g, '\\`'); // Escape backticks

  const modulePath = path.join(OUTPUT_DIR, `${name}.ts`);
  const exportContent = `// Auto-generated icon module
const svg = \`${content}\`;
export default svg;
`;
  fs.writeFileSync(modulePath, exportContent, 'utf-8');
  console.log(`✅ ${name}`);

  registryEntries.push(`  '${name}': () => import('./icons/${name}.js')`);
});

const registryTS = `
// 🛑 AUTO-GENERATED FILE — do not edit manually!
export type IconLoader = () => Promise<{ default: string }>;

export const registry = {
${registryEntries.join(',\n')}
} as const;

export type AvailableIcons = keyof typeof registry;

/**
 * Get a dynamic icon loader by name.
 */
export const getIcon = (name: AvailableIcons): IconLoader | undefined =>
  registry[name];
`;

fs.writeFileSync(REGISTRY_PATH, registryTS.trim(), 'utf-8');
console.log(`\n📦 ${files.length} icons registered in ${REGISTRY_PATH}`);
