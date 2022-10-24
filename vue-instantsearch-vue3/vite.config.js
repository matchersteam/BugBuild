import path from 'path'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [vue(),
  //   AutoImport({
  //     imports: [
  //       'vue',
  //       'vue-router'
  //     ],
  //     vueTemplate: true
  //   })
  ],
  // optimizeDeps: {
  //   include: [
  //     'vue',
  //     'vue-router',
  //     '@vueuse/core',
  //     '@vueuse/head'
  //   ],
  //   exclude: [
  //     'vue-demi',
  //     'vue-instantsearch'
  //   ]
  // }
  // ssr: {
  //   // TODO: workaround until they support native ESM
  //   noExternal: ['vue-instantsearch']
  // },
  // ssgOptions: {
  //   script: 'async',
  //   formatting: 'minify'
  // }
});
