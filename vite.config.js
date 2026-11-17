import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        en: fileURLToPath(new URL('./index.html', import.meta.url)),
        ru: fileURLToPath(new URL('./ru/index.html', import.meta.url)),
      },
    },
  },
});
