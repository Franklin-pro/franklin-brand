// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@primevue/nuxt-module','@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      WorkSans: [400, 700], // Replace with your desired font and weights
    },
    display: 'swap'
  },

  css: [
    '~/assets/css/main.css'
  ]
})