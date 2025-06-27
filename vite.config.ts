/**
 * 插件配置
 * electron: 用于打包electron应用
 * vue: 用于打包vue应用
 * electron-builder: 用于打包electron应用的安装包
 * author: yuanjun
 * date: 2025-06-20
*/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import electron from 'vite-plugin-electron'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), electron([
    {
      entry: 'src/electron/main/index.ts',
      vite: {
        build: {
          outDir: 'dist-electron/main',
        },
      }
    },
    {
      entry: 'src/electron/preload/index.ts',
      vite: {
        build: {
          outDir: 'dist-electron/preload',
        },
      }
    }
  ])],
})
