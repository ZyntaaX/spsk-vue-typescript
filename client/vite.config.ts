import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// /** @type {import('vite').UserConfig} */
// export default (mode: any ) => {
  // process.env = {...process.env, ...loadEnv(mode, '../')}; // Points to root .env in monorepo
  export default /**return */ defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    host: true,
    port: parseInt(process.env.VITE_CLIENT_PORT ?? '9000'),
  },
  envDir: '../', // Points to root .env in monorepo
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// }