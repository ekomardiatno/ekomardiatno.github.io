import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import seoHtmlPlugin from "./vite/seo-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      injectRegister: "auto",
      workbox: {
        // MUST stay null. sw.js is served from / so its scope is the whole
        // origin and cannot be narrowed. Setting navigateFallback would
        // register a NavigationRoute matching every in-scope navigation and
        // return the EMDEV shell for /copek/, /pingwin/, /phpmyadmin and
        // /serenchat/ — unrecoverable by reload under autoUpdate, and
        // invisible in the nginx logs.
        navigateFallback: null,
        // Defence in depth, in case the line above is ever flipped.
        navigateFallbackDenylist: [
          /^\/pingwin/,
          /^\/copek/,
          /^\/phpmyadmin/,
          /^\/serenchat/,
          /^\/empidgeon/,
          /^\/apotek/,
          /^\/emtrade/,
          /^\/yt-extractor/,
          /^\/whatsapp-api/,
          /^\/emvite-node/,
          /^\/copek-node/,
          /^\/midtrans/,
        ],
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
      },
      manifest: {
        id: "/",
        lang: "en",
        name: "EMDEV",
        short_name: "EMDEV",
        description: "EMDEV Landing Page",
        theme_color: "#fb2c36",
        background_color: "#0f172b",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    // Must stay last: it clones the final index.html (hashed assets + PWA tags)
    // and emits before vite-plugin-pwa globs dist/ for the precache manifest.
    seoHtmlPlugin(),
  ],
  base: "/",
});
