import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Optional Vite dev server plugin to handle /api requests directly if Express server is offline
function devApiFallbackPlugin() {
  return {
    name: 'dev-api-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith('/api')) return next()

        // If request is GET /api/menu
        if (req.method === 'GET' && req.url.startsWith('/api/menu')) {
          try {
            const menuPath = path.join(__dirname, 'server', 'data', 'menu.json')
            if (fs.existsSync(menuPath)) {
              const data = JSON.parse(fs.readFileSync(menuPath, 'utf-8'))
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ success: true, count: data.length, data }))
            }
          } catch (e) {
            console.error(e)
          }
        }

        // If request is GET /api/reviews
        if (req.method === 'GET' && req.url.startsWith('/api/reviews')) {
          try {
            const revPath = path.join(__dirname, 'server', 'data', 'reviews.json')
            if (fs.existsSync(revPath)) {
              const data = JSON.parse(fs.readFileSync(revPath, 'utf-8'))
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ success: true, count: data.length, data }))
            }
          } catch (e) {
            console.error(e)
          }
        }

        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiFallbackPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
