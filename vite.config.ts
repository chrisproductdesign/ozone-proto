import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@playground': path.resolve(__dirname, 'playground'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@design-system': path.resolve(__dirname, 'src/design-system'),
    },
  },
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
});
