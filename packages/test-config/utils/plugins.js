import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'url';
import { rollupAdapter as baseRollupAdapter } from '@web/dev-server-rollup';
import { litScss } from 'rollup-plugin-scss-lit';
import path from 'path';
import fs from 'fs';

export const configuredVisualRegressionPlugin = () =>
  visualRegressionPlugin({
    update: process.argv.includes('--update-visual-baseline'),
    diffOptions: {
      threshold: 0,
    },
    // TODO: verify
    // baseDir: 'test/visual',
    buildCache: true,
    getBaselineName: ({ browser, name }) => {
      const nameParts = name.split(' - ');
      return path.join('screenshots-baseline', browser, ...nameParts);
    },
    getDiffName: ({ browser, name }) => {
      const nameParts = name.split(' - ');
      return path.join('screenshots-actual', 'diff', browser, ...nameParts);
    },
    getFailedName: ({ browser, name }) => {
      const nameParts = name.split(' - ');
      return path.join('screenshots-actual', 'updates', browser, ...nameParts);
    },
  });

export const rollupAdapter = () =>
  baseRollupAdapter(
    litScss({
      include: ['**/*.scss'],
      options: { loadPaths: ['node_modules'] },
    }),
  );

export const esBuildPlugin = () => {
  const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
  const tsconfigRaw = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  console.log(`=== esbuildPlugin using ${tsconfigPath} tsconfig: ===`);
  console.log(JSON.stringify(tsconfigRaw, null, 2));
  console.log(
    `=== If extends doesn't work, check that @web/dev-server-esbuild is EXACTLY at version 1.0.2`,
  );

  // Presume che il tsconfig sia nella root del pacchetto
  return esbuildPlugin({
    ts: true,
    tsconfig: tsconfigPath,
  });
};
