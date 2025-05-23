import {
  chromium,
  firefox,
  webkit,
  configuredVisualRegressionPlugin,
  rollupAdapter,
  esBuildPlugin,
} from '@it-web-components/test-config/utils';
import {
  a11ySnapshotPlugin,
  sendKeysPlugin,
  sendMousePlugin,
  setViewportPlugin,
} from '@web/test-runner-commands/plugins';
import { fileURLToPath } from 'url';

const filteredLogs = ['Running in dev mode', 'Lit is in dev mode'];

/** @type {import("@web/test-runner").TestRunnerConfig} */
export default {
  rootDir: '.',
  /** Test files to run */
  files: 'packages/**/test/**/*.test.ts',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 1,

  /** Amount of test files per browser to test concurrently */
  concurrency: 3,

  /** Browsers to run tests on */
  browsers: [chromium, firefox, webkit],

  testFramework: {
    config: {
      timeout: 5000,
    },
  },
  coverageConfig: {
    include: ['packages/*/src/**/*.ts'],
    // exclude does not work for node_modules: https://github.com/modernweb-dev/web/issues/2637
    // exclude: ['**/node_modules/**','**/*.test.js'],
  },
  mimeTypes: {
    '**/*.json': 'js',
    '**/*.scss': 'js',
    '**/*.css': 'js',
    '**/*.svg': 'js',
  },
  plugins: [
    rollupAdapter(),
    esBuildPlugin(),
    configuredVisualRegressionPlugin(),
    a11ySnapshotPlugin(),
    sendKeysPlugin(),
    sendMousePlugin(),
    setViewportPlugin(),
  ],
  testRunnerHtml: testFramework => `
    <html lang="en-US">
      <head></head>
      <body>
        <script>
          window.process = {env: { NODE_ENV: "production" }}
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  // See documentation for all available options
};
