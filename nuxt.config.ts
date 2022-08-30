import { resolve } from "path";
import { defineNuxtConfig } from "nuxt";
import { VitePWA } from "vite-plugin-pwa";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  components: true,

  meta: {
    title: "Athan",
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { name: "viewport", content: "width=device-width,initial-scale=1.0,user-scalable=no" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/img/icons/icon-180x180.png" }
    ]
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

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/robots"],
  buildModules: ["nuxt-purgecss", "@nuxtjs/google-fonts"],

  googleFonts: {
    families: {
      Roboto: [400]
    }
  },

  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true
        }
      })
    ]
  }
});
