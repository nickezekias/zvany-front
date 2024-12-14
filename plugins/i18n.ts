import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import fr from '../locales/fr.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: import.meta.env.VITE_I18N_LOCALE, // set locale
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE, // set fallback locale
    messages: {
      en,
      fr
    }
  })

  vueApp.use(i18n)
})