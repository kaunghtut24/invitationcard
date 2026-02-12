import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Root directory (current directory)
  root: '.',
  
  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',
    
    // Clean output directory before build
    emptyOutDir: true,
    
    // Static asset handling
    assetsDir: 'assets',
    
    // Production optimizations
    target: 'es2018',
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 4096,
    
    // Copy all files from public directory if exists
    // and handle assets properly
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
  },
  
  // Static asset handling
  publicDir: 'assets',
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
});
