import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative base so it works on GitHub Pages, Firebase Hosting, AWS S3, or any subpath
  server: {
    port: 3000,
    open: true
  }
});
