// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-csurf',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    dummyApi: {
      baseUrl: process.env.NUXT_RECIPES_BASE_URL
    }
  },

  routeRules: {
    '/': {
      prerender: true
    }
  },

  experimental: {
    viewTransition: true
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss()]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
