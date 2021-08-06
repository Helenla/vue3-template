import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import visualizer from "rollup-plugin-visualizer"

export default ({ mode }) => {
  const plugins = [vue()];

  /**
   * 打包分析
   * 在vite.config中不能使用 import.meta.env
   * 但是用 loadEnv(mode, process.cwd()) 可获取 env 中的数据
   */
  if (loadEnv(mode, process.cwd()).VITE_VIS) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: '/'
    },

    // 路径简写
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
          additionalData: `
            @import "src/assets/scss/mixin.scss";
            @import "src/assets/scss/variable.scss";`
        }
      }
    },
  
    // 插件
    plugins
  })
}
