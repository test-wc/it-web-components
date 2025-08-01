#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Ottiene tutti i pacchetti pubblicabili
 */
function getPublishablePackages() {
  const packagesDir = join(rootDir, 'packages');
  const packages = [];

  try {
    const packageDirs = execSync('ls packages/', { cwd: rootDir, encoding: 'utf8' }).trim().split('\n');

    for (const dir of packageDirs) {
      const packageJsonPath = join(packagesDir, dir, 'package.json');

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

        // Escludi pacchetti privati o di configurazione
        if (
          !packageJson.private &&
          !packageJson.name.includes('test-config') &&
          !packageJson.name.includes('typescript-config')
        ) {
          packages.push({
            name: packageJson.name,
            version: packageJson.version,
            path: join(packagesDir, dir),
            changelogPath: join(packagesDir, dir, 'CHANGELOG.md'),
          });
        }
      }
    }
  } catch (error) {
    console.log('⚠️ Errore nel leggere i pacchetti:', error.message);
  }

  return packages;
}

/**
 * Controlla se un changelog ha solo entry "version bump" per una versione
 */
function hasOnlyVersionBump(changelogPath, version) {
  if (!existsSync(changelogPath)) return false;

  const content = readFileSync(changelogPath, 'utf8');
  const versionRegex = new RegExp(`## ${version.replace(/\./g, '\\.')}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`);
  const match = content.match(versionRegex);

  if (!match) return false;

  const versionContent = match[1].trim();
  // Controlla se contiene solo sezioni vuote o "version bump"
  const hasRealChanges =
    versionContent.includes('### Patch Changes') &&
    !versionContent.toLowerCase().includes('version bump') &&
    versionContent
      .split('\n')
      .some(
        (line) =>
          line.trim() &&
          !line.includes('### Patch Changes') &&
          !line.includes('Updated dependencies') &&
          !line.includes('- @'),
      );

  return !hasRealChanges;
}

/**
 * Aggiunge entry "version bump" ai changelog che ne hanno bisogno
 */
function addVersionBumpEntries() {
  console.log('📝 Controllo pacchetti per version bump entries...');

  const packages = getPublishablePackages();
  let updatedPackages = 0;

  for (const pkg of packages) {
    if (existsSync(pkg.changelogPath)) {
      const changelogContent = readFileSync(pkg.changelogPath, 'utf8');

      // Trova la prima versione nel changelog
      const versionMatch = changelogContent.match(/## ([\d.]+)/);
      if (versionMatch && hasOnlyVersionBump(pkg.changelogPath, versionMatch[1])) {
        // Sostituisci il contenuto vuoto con version bump
        const updatedContent = changelogContent.replace(
          new RegExp(
            `(## ${versionMatch[1].replace(/\./g, '\\.')}\\s*\\n\\s*### Patch Changes\\s*\\n)((?:\\s*- Updated dependencies[\\s\\S]*?)?)(\\s*(?=\\n## |$))`,
          ),
          `$1\n- Version bump only\n$2$3`,
        );

        if (updatedContent !== changelogContent) {
          writeFileSync(pkg.changelogPath, updatedContent);
          console.log(`✅ Aggiunta entry "version bump" a ${pkg.name}`);
          updatedPackages += 1;
        }
      }
    }
  }

  if (updatedPackages === 0) {
    console.log('ℹ️ Nessun pacchetto necessita di version bump entries');
  } else {
    console.log(`✅ Aggiornati ${updatedPackages} changelog con version bump entries`);
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  addVersionBumpEntries();
}

export { addVersionBumpEntries };
