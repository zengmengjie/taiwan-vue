import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import twLocale from './tw'

Vue.use(VueI18n)

const messages = {
  EN: {
    ...enLocale
  },
  TW: {
    ...twLocale
  }
}


const i18n = new VueI18n({
  locale: 'TW', // set locale
  messages // set locale messages
})

export default i18n
