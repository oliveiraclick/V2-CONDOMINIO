

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Garante caminhos absolutos para deploy na raiz do domínio
  build: {
    outDir: 'dist',
  }
});