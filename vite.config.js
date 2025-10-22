import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/games_hub',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});