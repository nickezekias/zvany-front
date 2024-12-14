import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
// import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vue-i18n"],
  },
  compatibilityDate: "2024-11-01",
  css: ["primeicons/primeicons.css", "~/assets/css/main.css"],
  devtools: { enabled: true },
  // typescript: { typeCheck: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt", "@primevue/nuxt-module"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    autoImport: true,
    components: {
      prefix: "Prime",
    },
    importTheme: { from: "@/lib/primevue.ts" },
    options: {
      ripple: true,
      inputVariant: "outlined",
    },
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
});
