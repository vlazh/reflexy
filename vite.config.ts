import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  // esbuild: {},
  envPrefix: ['VITE_', 'APP_'],
  plugins: [basicSsl()],
  clearScreen: false,
  root: 'src/elements/dev/',
  // base: '/',
  base: env.mode === 'dev' ? './' : './',
  // html: { cspNonce: '*' },
  server: {
    strictPort: true,
    port: 8080,
  },
  preview: {
    strictPort: true,
    port: 8080,
  },
}));
