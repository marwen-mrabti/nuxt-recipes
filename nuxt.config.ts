/* eslint-disable node/no-process-env */
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "nuxt-csurf",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system", // light | dark | system
    fallback: "dark",
    classSuffix: "", // produces <html class="dark"> not class="dark-mode"
  },

  runtimeConfig: {
    DummyApi: {
      baseUrl: process.env.NUXT_DUMMYAPI_BASE_URL,
    },
  },

  alias: {
    "~/*": "./app/*",
    "@/*": "./*",
  },

  routeRules: {
    "/": {
      prerender: true,
    },
  },

  experimental: {
    viewTransition: true,
  },
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  shadcn: {
    componentDir: "~/components/ui",
  },
});
