import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  build: {
    outDir: 'dist',  // Ensures the output is in "dist"
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
