export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss','@pinia/nuxt'],

  css: ['~/assets/css/tailwind.css'],

  // ✅ ย้าย config postcss มาที่นี่แทน postcss.config.js
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
