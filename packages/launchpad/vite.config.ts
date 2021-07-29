import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

export default defineConfig({
  base: './',
  build: {
    minify: false,
  },
  optimizeDeps: {
    include: ['@apollo/client/core'],
    exclude: ['@apollo/client'],
  },
  plugins: [
    vue(),
    vueJsx(),
    ViteIcons(),
    PurgeIcons(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    WindiCSS(),
  ],
})
