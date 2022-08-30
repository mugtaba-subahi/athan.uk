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
        },
        manifest: {
          name: "Salah",
          short_name: "Salah",
          theme_color: "#031b4b",
          background_color: "#311473",
          display: "fullscreen",
          orientation: "portrait",
          scope: "/",
          start_url: "/index.html",
          icons: [
            {
              src: "img/icons/icon-180x180.png",
              sizes: "180x180",
              type: "image/png"
            },
            {
              src: "img/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "img/icons/icon-384x384.png",
              sizes: "384x384",
              type: "image/png"
            }
          ]
        }
      })
    ]
  }

  // pwa: {
  //   workbox: {
  //     enabled: true
  //   },
  //   meta: {
  //     title: "Salah1x-title",
  //     author: "Salah1x-author",
  //     mobileAppIOS: false,
  //     appleStatusBarStyle: "black-translucent"
  //   },

  //   icon: {
  //        fileName: 'app-icon.png',
  //   },
  //   icon: {
  //     sizes: [64, 120, 144, 152, 192, 384, 512]
  //   }
  // },
});
