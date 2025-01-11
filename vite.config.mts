import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgrPlugin({ svgrOptions: { icon: true } }),
  ],
  build: {
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: true,
  },
  base: './',
});
