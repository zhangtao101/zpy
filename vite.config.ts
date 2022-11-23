import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      createSvgIconsPlugin({
          // 指定需要缓存的图标文件夹
          iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
          // 指定symbolId格式
          symbolId: 'icon-[dir]-[name]',
        }),
      // 增加下面的配置项,这样在运行时就能检查eslint规范
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/assets/style/global-variables.scss" as *;`,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  server: {
    port: 9527,
    open: true,
    proxy: {
      '/trail': {
        target: 'http://eip.api.glead.apps:12001',
        //target: 'http://127.0.0.1:12001',
        changeOrigin: true,
        rewrite: path =>path.replace(/^\/trail/, ''),
      }
    }
  },
  esbuild: false,
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        // 删除console
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        // 拆分单独模块
        manualChunks: {
          'element-plus': ['element-plus'],
        },
      },
    },
  },
})
