import resolve from '@rollup/plugin-node-resolve';

import copy from 'rollup-plugin-copy';

import commonjs from '@rollup/plugin-commonjs';

import typescript from '@rollup/plugin-typescript';

import { litScss } from 'rollup-plugin-scss-lit';

// import externalGlobals from 'rollup-plugin-external-globals';

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
    copy({
      targets: [{ src: 'assets/*', dest: 'dist/assets' }],
    }),
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
