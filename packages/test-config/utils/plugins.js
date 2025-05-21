import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'url';
import { rollupAdapter as baseRollupAdapter } from '@web/dev-server-rollup';
import { litScss } from 'rollup-plugin-scss-lit';

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

export const esBuildPlugin = () =>
  esbuildPlugin({
    ts: true,
    tsconfig: fileURLToPath(new URL('../tsconfig.json', import.meta.url)),
  });
