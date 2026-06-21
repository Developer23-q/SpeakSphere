import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // 1. Tell Vite to accept the ngrok proxy connection
    server: {
      allowedHosts: ["pebbly-mutilator-luxury.ngrok-free.dev"] 
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        // 2. Force the service worker to generate during 'npm run dev'
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
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ]
  }
});