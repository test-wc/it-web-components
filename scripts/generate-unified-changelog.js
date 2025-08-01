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
 * Legge e parsing un file CHANGELOG.md
 */
function parseChangelog(filePath) {
  if (!existsSync(filePath)) return null;

  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const versions = [];
  let currentVersion = null;
  let currentContent = [];

  for (const line of lines) {
    if (line.match(/^## /)) {
      if (currentVersion) {
        versions.push({
          version: currentVersion,
          content: currentContent.join('\n').trim(),
        });
      }
      currentVersion = line.replace(/^## /, '').trim();
      currentContent = [];
    } else if (currentVersion) {
      currentContent.push(line);
    }
  }

  if (currentVersion) {
    versions.push({
      version: currentVersion,
      content: currentContent.join('\n').trim(),
    });
  }

  return versions;
}

/**
 * Ottiene tutti i pacchetti con changelog
 */
function getPackagesWithChangelogs() {
  const packagesDir = join(rootDir, 'packages');
  const packages = [];

  try {
    const packageDirs = execSync('ls packages/', { cwd: rootDir, encoding: 'utf8' }).trim().split('\n');

    for (const dir of packageDirs) {
      const packageJsonPath = join(packagesDir, dir, 'package.json');
      const changelogPath = join(packagesDir, dir, 'CHANGELOG.md');

      if (existsSync(packageJsonPath) && existsSync(changelogPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        const changelog = parseChangelog(changelogPath);

        if (changelog && changelog.length > 0) {
          packages.push({
            name: packageJson.name,
            displayName: packageJson.name.replace('@italia/', ''),
            changelog,
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
 * Genera il changelog unificato
 */
function generateUnifiedChangelog() {
  console.log('📝 Generazione changelog unificato...');

  const packages = getPackagesWithChangelogs();
  if (packages.length === 0) {
    console.log('⚠️ Nessun package con changelog trovato');
    return;
  }

  // Ottieni tutte le versioni uniche
  const allVersions = new Set();
  packages.forEach((pkg) => {
    pkg.changelog.forEach((entry) => {
      allVersions.add(entry.version);
    });
  });

  // Ordina le versioni (assumendo versioni semantiche)
  const sortedVersions = Array.from(allVersions).sort((a, b) => {
    // Parsing semplice delle versioni per ordinamento
    const parseVersion = (v) => {
      const parts = v.split('.').map(Number);
      return parts[0] * 10000 + parts[1] * 100 + parts[2];
    };
    return parseVersion(b) - parseVersion(a);
  });

  // Genera il contenuto del changelog unificato
  let unifiedContent = '# Design Web Components Changelog\n\n';
  unifiedContent += 'Questo changelog raccoglie tutte le modifiche di tutti i pacchetti del monorepo.\n\n';

  for (const version of sortedVersions) {
    unifiedContent += `## ${version}\n\n`;

    let hasChanges = false;

    for (const pkg of packages) {
      const versionEntry = pkg.changelog.find((entry) => entry.version === version);
      if (versionEntry && versionEntry.content.trim()) {
        if (!hasChanges) {
          hasChanges = true;
        }

        unifiedContent += `### \`${pkg.displayName}\`\n\n`;
        unifiedContent += `${versionEntry.content}\n\n`;
      }
    }

    if (!hasChanges) {
      unifiedContent += '_Nessuna modifica significativa in questa versione._\n\n';
    }
  }

  // Scrivi il file
  const unifiedChangelogPath = join(rootDir, 'CHANGELOG.md');
  writeFileSync(unifiedChangelogPath, unifiedContent);

  console.log(`✅ Changelog unificato generato: ${unifiedChangelogPath}`);
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateUnifiedChangelog();
}
