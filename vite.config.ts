import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

const require = createRequire(import.meta.url)

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['ckeditor5-premium-features', 'ckeditor5-vue', 'vue-chartjs', 'chart.js']
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
          'vendor-primevue': ['primevue'],
          'vendor-chart': ['vue-chartjs', 'chart.js'],
          'vendor-utils': ['axios', 'dayjs', 'moment', 'vee-validate']
        }
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
