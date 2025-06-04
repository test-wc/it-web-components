// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist/it-button',
    lib: {
      entry: 'src/it-button.ts',
      name: 'ItButton',
      fileName: format => `it-button.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [/lit/, /@italia\/globals/],
    },
  },
});
