import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // 1. DYNAMIC FIX: Enable Nitro compiling ONLY when on Vercel
  nitro: process.env.VERCEL ? true : false,

  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      allowedHosts: [""] 
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
          type: 'module'
        },
        manifest: {
          name: 'Speak Sphere',
          short_name: 'SpeakSphere',
          description: 'One-tap daily practice',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ]
  }
});