import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import path from 'path'
import manifest from './public/manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Exclude storybook stories
      exclude: '/**/*.stories.@(js|jsx|ts|tsx)',
      // Use React's JSX transform
      jsxRuntime: 'automatic',
      // Fast refresh is not supported with CRXJS
      fastRefresh: false
    }),
    crx({ manifest })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
        port: 3001
    }
  },
  build: {
    rollupOptions: {
        input: {
            popup: 'index.html',
            settings: 'settings.html',
        }
    }
  }
}) 