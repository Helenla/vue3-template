import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@views', replacement: resolve(__dirname, 'src/views') },
      { find: '@services', replacement: resolve(__dirname, 'src/services') },
      { find: '@images', replacement: resolve(__dirname, 'src/assets/img') },
      { find: '@scss', replacement: resolve(__dirname, 'src/assets/scss') },
    ]
  },

  // css预处理
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/mixin.scss"; @import "src/assets/scss/variable.scss";`
      }
    }
  },

  plugins: [vue()],
})
