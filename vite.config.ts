import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base 指向 GitHub Pages 项目站点路径（JaronTam.github.io/philo-tech/）
export default defineConfig({
  base: '/philo-tech/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
  },
});
