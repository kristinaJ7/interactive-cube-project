import { defineConfig } from 'vite';

export default defineConfig({
  base: '/interactive-cube-project/', // ОБЯЗАТЕЛЬНО с / в начале и конце
  build: {
    outDir: 'dist', // папка сборки
    assetsDir: 'assets' // папка для ресурсов (по умолчанию)
  }
});
