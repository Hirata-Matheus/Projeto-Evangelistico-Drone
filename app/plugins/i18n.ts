import { createAppI18n } from '~/i18n'

export default defineNuxtPlugin({
  name: 'i18n',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(createAppI18n())
  }
})
