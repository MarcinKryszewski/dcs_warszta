import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.PUBLIC_URL,
  server: {
    port: process.env.PORT,
    strictPort: true,    
    open: true
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
})
