import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      WindiCSS()
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  server:{
    host:'localhost',
    port:8000,
    proxy:{
      '/api': {
        target: 'http://120.26.208.222:8088/',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
