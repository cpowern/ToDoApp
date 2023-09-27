// ts-ignore
import ClickAway from 'vue3-click-away'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ClickAway)
})
