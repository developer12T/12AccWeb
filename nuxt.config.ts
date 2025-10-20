export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {

    public: {
      API_URL: process.env.API_URL
    },
    
    M3_HOST: process.env.M3_HOST,
    M3_DATABASE: process.env.M3_DATABASE,
    M3_USER: process.env.M3_USER,
    M3_PASSWORD: process.env.M3_PASSWORD,


  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  css: ["~/assets/css/tailwind.css"],

  // ✅ ย้าย config postcss มาที่นี่แทน postcss.config.js
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
