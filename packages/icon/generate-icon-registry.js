// scripts/generate-icon-registry.js
import fs from 'fs';
import path from 'path';

const SVG_DIR = path.resolve('node_modules/bootstrap-italia/src/svg');
const REGISTRY_PATH = path.resolve('src/icon-registry.ts');

console.log('🛠️ Generating dynamic icon registry...');

const files = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'));

const imports = files.map((file) => {
  const name = file.replace('.svg', '');
  return `  '${name}': 'node_modules/bootstrap-italia/src/svg/${file}'`;
});

const output = `
// 🛑 AUTO-GENERATED FILE — do not edit manually!
export type IconLoader = () => Promise<any>;

const registry = {
${imports.join(',\n')}
} as const;

export type AvailableIcons = keyof typeof registry

/**
 * Get a dynamic icon loader by name.
 */
export const getIcon = (name: AvailableIcons): IconLoader | undefined => () => import(registry[name])

`;

fs.writeFileSync(REGISTRY_PATH, output.trim(), 'utf8');

console.log(`✅ ${files.length} icons registered in ${REGISTRY_PATH}`);
