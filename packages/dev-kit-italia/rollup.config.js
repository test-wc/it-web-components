import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      sourcemap: true,
      entryFileNames: 'src/[name].js',
    },
    plugins: [
      resolve(),
      typescript({
        module: 'NodeNext',
      }),
    ],
    external: [/^lit(\/|$)/],
  },
  {
    input: 'src/styles.js',
    output: {
      dir: 'dist',
      sourcemap: true,
      output: { file: 'dev-kit-italia-styles.js', format: 'esm' },
    },
    plugins: [
      resolve(),
      copy({
        targets: [{ src: 'assets/*', dest: 'dist/assets' }],
      }),
      scss({
        fileName: 'dev-kit-italia.css',
        //  outputStyle: 'compressed',
      }),
    ],
  },
  {
    input: 'elements.ts',
    output: {
      dir: 'dist',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({
        module: 'NodeNext',
      }),
    ],
  },
];
