import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const outputDir = path.resolve('dist/bundle');

export default [
  {
    input: 'dist/mega-bundle.js',
    output: {
      file: path.join(outputDir, 'bundle.esm.js'),
      format: 'esm',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
  {
    input: 'dist/mega-bundle.js',
    output: {
      file: path.join(outputDir, 'bundle.umd.js'),
      format: 'umd',
      name: 'ItWebComponents', // nome global per UMD
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
];
