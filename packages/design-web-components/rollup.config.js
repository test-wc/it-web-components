import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

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
