import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://100.67.241.99:5000",
        changeOrigin: true,
        secure: false,
        timeout: 120000,
        proxyTimeout: 120000
      },
    },
  },
})
