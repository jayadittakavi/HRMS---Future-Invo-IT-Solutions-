import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND = "http://192.168.1.29:5000";

const proxyConfig = {
  target: BACKEND,
  changeOrigin: true,
  secure: false,
  timeout: 120000,
  proxyTimeout: 120000,
  configure: (proxy) => {
    proxy.on('error', (err) => {
      console.error('[Proxy Error]', err.message);
    });
    // We do NOT remove the Origin header here, as some backends use it for CSRF/Security validation.
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    proxy: {
      "/api": proxyConfig,
      "/auth": proxyConfig,
    },
  },
})
