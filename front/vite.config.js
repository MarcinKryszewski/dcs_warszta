import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.PUBLIC_URL,
  server: {
    port: process.env.PORT,
    strictPort: true,    
    open: true
  },
})
