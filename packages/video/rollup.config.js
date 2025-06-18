import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import { litScss } from 'rollup-plugin-scss-lit';

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
    resolve({
      browser: true, // importantissimo per pacchetti che usano window/browser API
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      module: 'NodeNext',
    }),
    litScss({
      minify: process.env.NODE_ENV === 'production',
      // options: {
      //   loadPaths: ['node_modules'],
      //   silenceDeprecations: ['import'],
      // },
    }),
  ],
  external: [/^lit(\/|$)/],
};
