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
    // "@peterbud/nuxt-query",
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

  routeRules: {
    "/": {
      prerender: true,
    },
  },

  image: {
    quality: 75,
    format: ["webp"],
    domains: ["dummyjson.com"],
    providers: {
      dummyjson: {
        name: "dummyjson",
        provider: "@@/providers/dummyjson.ts",
        options: {
          baseURL: process.env.NUXT_DUMMYAPI_BASE_URL,
        },
      },
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

  // nuxtQuery: {
  //   devtools: true,
  //   queryClientOptions: {
  //     defaultOptions: {
  //       queries: {
  //         retry: 3,
  //         retryDelay: 500,
  //         staleTime: 1000 * 60 * 5, // ! the data will be considered stale after 15 minutes
  //         gcTime: 1000 * 60 * 30, // ! the cache will be cleared after 30 minute of inactivity
  //         refetchOnWindowFocus: true,
  //         throwOnError: (_error: any, query: { state: { data: any } }) => {
  //           return typeof query.state.data === "undefined";
  //         },
  //         networkMode: "offlineFirst",
  //       },
  //     },
  //   },
  // },
});
