import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Dig.ferdigheter-nettside/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['draape.png'],
      manifest: {
        name: 'Den digitale dråpen - Helse Sør-Øst',
        short_name: 'Nano-learning',
        description: 'Mange bekker små... Hver dråpe av kunnskap bygger din digitale kompetanse.',
        theme_color: '#f4f8fc',
        background_color: '#f4f8fc',
        display: 'standalone',
        icons: [
          {
            src: 'draape.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'draape.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
