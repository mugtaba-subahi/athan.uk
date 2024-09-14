import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  modules: ["@vite-pwa/nuxt", "@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,mjs,html,png,svg,ico}'],
    },
  },

  alias: {
    "!api": resolve(__dirname, "./api"),
    "!utils": resolve(__dirname, "./utils"),
    "!config": resolve(__dirname, "./config"),
    "!assets": resolve(__dirname, "./assets"),
    "!stores": resolve(__dirname, "./stores"),
    "!globals": resolve(__dirname, "./globals"),
    "!components": resolve(__dirname, "./components"),
    "!controllers": resolve(__dirname, "./controllers")
  },

  $meta: {
    title: "Athan",
    htmlAttrs: [{ lang: "en" }],
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { name: "viewport", content: "width=device-width,initial-scale=1.0,user-scalable=no" },
      { name: "theme-color", content: "#031b4b" },
      { name: "description", content: "London prayer times" },
      { name: "msapplication-TileColor", content: "#603cba" },
      { name: "msapplication-config", content: "/icons/browserconfig.xml" }
    ],
    link: [
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", sizes: "16x16", href: "/icons/favicon-16x16.png" },
      { rel: "icon", sizes: "32x32", href: "/icons/favicon-32x32.png" },
      { rel: "shortcut icon", href: "/icons/favicon.ico" },
      { rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", color: "#603cba" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/icons/icon-mask-120x120.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/icons/icon-mask-152x152.png" },
      { rel: "apple-touch-icon", sizes: "192x192", href: "/icons/icon-mask-192x192.png" }
    ]
  },

  googleFonts: {
    families: {
      Roboto: [400]
    }
  },

  tailwindcss: {
    config: {
      content: ["~/components/*.vue"],
      theme: {
        extend: {
          colors: {
            midnight: "#031b4b",
            aurora: "#660ca1",
            ocean: "#0d6cda"
          }
        }
      }
    }
  },

  compatibilityDate: "2024-09-14",
});