import resolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';

import typescript from '@rollup/plugin-typescript';

import { litScss } from 'rollup-plugin-scss-lit';

import path from 'path';

// import externalGlobals from 'rollup-plugin-external-globals';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['src/index.ts', 'src/it-video.ts'],
  output: {
    dir: 'dist',
    sourcemap: true,
    entryFileNames: 'src/[name].js',
  },
  plugins: [
    resolve(),
    commonjs({}),
    // externalGlobals({
    //   global: 'window',
    //   'global/window': 'window',
    //   'global/document': 'document',
    //   videojs: 'videojs',
    // }),

    typescript({
      tsconfig: './tsconfig.build.json',
      module: 'NodeNext',
    }),

    litScss({
      minify: process.env.NODE_ENV === 'production',
      options: {
        loadPaths: ['node_modules'],
        silenceDeprecations: ['import'],
      },
    }),
  ],
  external: [/^lit(\/|$)/],
};
