import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({autoImport: true})
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, "src/") }]
  },
})
