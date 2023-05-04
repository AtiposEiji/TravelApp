import fs from 'fs';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/generic-resets.scss"; @import "./src/assets/scss/specific-resets.scss";; @import "./src/assets/scss/responsive-layout"; @import "./src/assets/scss/palette-colors";`,
      }
    }
  },
  server: {
    https: {
      key: fs.readFileSync('./certs/localhost+1-key.pem'),
      cert: fs.readFileSync('./certs/localhost+1.pem'),
    }
  }
})