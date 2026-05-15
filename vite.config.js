import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  const BACKEND = env.VITE_API_URL || "http://127.0.0.1:5000";

  const proxyConfig = {
    target: BACKEND,
    changeOrigin: true,
    secure: false,
    timeout: 120000,
    proxyTimeout: 120000,
    configure: (proxy) => {
      proxy.on('error', (err) => {
        console.error('[Proxy Error]', err.message, 'Target:', BACKEND);
      });
    }
  };

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      strictPort: false,
      proxy: {
        "/api": proxyConfig,
        "/auth": proxyConfig,
      },
    },
  }
})
