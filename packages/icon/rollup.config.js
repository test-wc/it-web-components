import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { litScss } from 'rollup-plugin-scss-lit';
import copy from 'rollup-plugin-copy';
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['src/index.ts', 'src/it-icon.ts'],
  // input: 'src/index.ts',
  output: {
    dir: 'dist',
    sourcemap: true,
    entryFileNames: 'src/[name].js',
  },
  plugins: [
    resolve(),
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
    copy({
      targets: [{ src: 'src/icon-registry.ts', dest: 'dist/src' }],
      hook: 'writeBundle',
    }),
  ],
  external: [/^lit(\/|$)/],
};
