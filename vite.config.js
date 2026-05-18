import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const BACKEND = env.VITE_API_URL || "http://192.168.1.27:5000";

  const proxyConfig = {
    target: BACKEND,
    changeOrigin: true,
    secure: false,
    timeout: 120000,
    proxyTimeout: 120000,
    configure: (proxy) => {
      proxy.on('error', (err) => {
        // Only log genuine connection failures (e.g. backend offline)
        if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
          console.error('[Proxy] ⚠️  Backend unreachable at', BACKEND, '— frontend will use local data fallback.');
        }
      });
      proxy.on('proxyRes', (proxyRes, req) => {
        // Log 404s quietly at debug level — these are expected missing backend routes
        if (proxyRes.statusCode === 404) {
          console.debug(`[Proxy] 404 ${req.url} — backend route not yet implemented, using local fallback.`);
        } else if (proxyRes.statusCode >= 500) {
          console.error(`[Proxy] ❌ ${proxyRes.statusCode} ${req.url}`);
        }
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
