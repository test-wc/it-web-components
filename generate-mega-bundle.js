import fs from 'fs';
import path from 'path';

const packagesDir = path.resolve('packages');
const outputDir = path.resolve('dist');
const megaEntryFile = path.join(outputDir, 'mega-bundle.js');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const packages = fs.readdirSync(packagesDir).filter(pkg => {
  // verifica che esista il dist/index.js per quel pacchetto
  console.log(pkg);
  const indexPath = path.join(packagesDir, pkg, 'dist', 'src', 'index.js');
  console.log(indexPath);
  return fs.existsSync(indexPath);
});
console.log(packages);
const exports = packages
  .map(pkg => {
    return `export * from '@it-web-components/${pkg}';`;
  })
  .join('\n');

fs.writeFileSync(megaEntryFile, exports);
console.log(`Mega bundle entry point generated at ${megaEntryFile}`);
