import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../packages/**/stories/**/*.mdx', '../packages/**/stories/**/*.stories.@(js|ts|tsx|jsx|mjs)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/experimental-addon-test'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  staticDirs: ['./assets'],
  docs: {
    defaultName: 'Documentazione',
  },
  viteFinal: async (config) => {
    config.css = config.css || {};
    config.css.preprocessorOptions = config.css.preprocessorOptions || {};
    config.css.preprocessorOptions.scss = {
      // Modificare gli import ora significherebbe una riscrittura pesante di bootstrap-italia.
      silenceDeprecations: ['import'],
    };
    return config;
  },
};
export default config;
