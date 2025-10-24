import Vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 2999,
    host: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: process.env.DEV_SERVER_TARGET ?? 'http://localhost:3399',
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
