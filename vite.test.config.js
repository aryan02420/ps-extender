import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    host: true,
    port: 8080,
    strictPort: true,
    open: false
  },
  build: {
    outDir: 'demo',
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        studentStationPreference: resolve(__dirname, 'test/StudentStationPreference.aspx.html')
      }
    }
  }
})