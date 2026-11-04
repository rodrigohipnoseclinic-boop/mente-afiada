import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icone.svg", "icone-192.png", "icone-512.png"],
      manifest: {
        name: "Mente Afiada",
        short_name: "Mente Afiada",
        description:
          "Caça-palavras e quiz de neurociências, neurofisiologia, hipnose clínica e comportamento humano.",
        lang: "pt-BR",
        theme_color: "#58cc02",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "icone-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icone-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icone-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        navigateFallback: "index.html",
      },
    }),
  ],
});
