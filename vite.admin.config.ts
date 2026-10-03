import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Builds the private admin dashboard as its own site (dist-admin/), deployed
// separately from the public website and protected by Cloudflare Access.
export default defineConfig({
  root: path.resolve(__dirname, 'admin'),
  publicDir: path.resolve(__dirname, 'admin/public'),
  envDir: __dirname,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, 'dist-admin'),
    emptyOutDir: true
  }
});
