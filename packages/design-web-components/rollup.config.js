import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
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
      output: { file: 'design-web-components-styles.js', format: 'esm' },
    },
    plugins: [
      resolve(),
      scss({
        fileName: 'design-web-components.css',
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
