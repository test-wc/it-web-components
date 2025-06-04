import baseConfig from '@it-web-components/test-config/web-test-runner.config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  ...baseConfig,
  rootDir: __dirname,
  files: 'test/**/*.test.ts',
};
