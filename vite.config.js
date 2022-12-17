import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

export default defineConfig(() => {

  const env = loadEnv(null, process.cwd())

  return {
    plugins: [
      svelte(),
      WindiCSS()
    ],
    build: {
      emptyOutDir: false,
      outDir: './public/',
      assetsDir: env.VITE_BUILD_DIR,
      manifest: true,
      rollupOptions: {
        input: `./${env.VITE_RESOURCES_DIR}/${env.VITE_ENTRY_FILE}`
      }
    },
    server: {
      origin: env.VITE_ORIGIN,
      port: env.VITE_PORT,
      strictPort: true,
      hmr: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, `./${env.VITE_RESOURCES_DIR}`)
      }
    }
  }
})

