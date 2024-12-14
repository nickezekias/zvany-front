import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f2faff',
      100: '#c2e7ff',
      200: '#91d3ff',
      300: '#61c0ff',
      400: '#30acff',
      500: '#0099ff',
      600: '#0082d9',
      700: '#006bb3',
      800: '#00548c',
      900: '#003d66',
      950: '#002640',
    },
  },
})

export default {
  ripple: true,
  inputVariant: 'outlined',
  preset: MyPreset,
  theme: {
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
}
