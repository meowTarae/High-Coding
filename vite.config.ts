import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/public': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/public/, ''),
        },
        '/ai': {
          target: env.VITE_AI_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/ai/, ''),
        },
      },
    },
  };
});
