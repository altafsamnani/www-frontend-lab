import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

const require = createRequire( import.meta.url );

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      }
    }
  },
  plugins: [  
    vue(),
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } ),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
