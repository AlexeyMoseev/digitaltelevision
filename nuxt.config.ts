// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@pinia/nuxt'],
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  compatibilityDate: '2025-07-15',
  nitro: {
    routeRules: {
      '/proxy/materials': {
        proxy: `${process.env.API_BASE_URL}/api/test/materials/moseev`
      },
      '/proxy/materials/save': {
        proxy: `${process.env.API_BASE_URL}/api/test/materials/moseev/save`
      }
    }
  },
  typescript: {
    typeCheck: true
  },
  eslint: {
    checker: true
  },
  fonts: {
    families: [
      {
        name: 'FuturaPT',
        provider: 'local',
        src: '/fonts/FuturaPT-Book.ttf',
        weight: 400,
        style: 'normal'
      },
      {
        name: 'FuturaPT',
        provider: 'local',
        src: '/fonts/FuturaPT-Medium.ttf',
        weight: 450,
        style: 'normal'
      },
      {
        name: 'SourceSans3',
        provider: 'local',
        src: '/fonts/SourceSans3-SemiBold.ttf',
        weight: 600,
        style: 'normal'
      }
    ]
  }
})
