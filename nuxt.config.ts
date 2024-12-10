// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@primevue/nuxt-module','@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Lexend: [400, 700], 
    },
    display: 'swap'
  },

  css: [
    '~/assets/css/main.css'
  ]
})