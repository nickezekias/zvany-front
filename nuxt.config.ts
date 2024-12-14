import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vue-i18n"],
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
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
