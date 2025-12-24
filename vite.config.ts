import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    host: true
  }
})
