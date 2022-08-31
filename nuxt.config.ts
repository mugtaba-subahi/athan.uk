import { resolve } from "path";
import { defineNuxtConfig } from "nuxt";
import { VitePWA } from "vite-plugin-pwa";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  components: true,

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  buildModules: ["@nuxtjs/google-fonts"],

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

  vite: {
    plugins: [
      VitePWA({
        workbox: {
          globPatterns: ["**/*.{js,css,html}"],
          navigateFallback: null
        }
      })
    ]
  },

  meta: {
    title: "Athan",
    htmlAttrs: [{ lang: "en" }],
    // script: [{ src: "/sw.js" }],
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { name: "viewport", content: "width=device-width,initial-scale=1.0,user-scalable=no" },
      { name: "theme-color", content: "#031b4b" },
      { name: "description", content: "My Awesome App description" }
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "mask-icon", sizes: "32x32", href: "/img/icons/icon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/icons/icon-180x180.png" }
    ]
  },

  googleFonts: {
    families: {
      Roboto: [400]
    }
  }
});
