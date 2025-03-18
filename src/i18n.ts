import { ref, nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { localize } from '@vee-validate/i18n'
import dateTimeFormats from '@/locales/rules/dateTimeFormats'
import { getConfig } from './http/config'
import en from '@/locales/en.json'
import nl from '@/locales/nl.json'

let i18n
export const messages = ref([])
export const SUPPORT_LOCALES = ['en', 'nl']

export function setI18nLanguage(locale) {
  i18n.global.locale.value = locale
  localize(locale)
  document.querySelector('html').setAttribute('lang', locale)
  localStorage.setItem('lang', locale)
  loadLocaleMessages(locale)
  loadAsyncLocaleMessages(locale)
}

export async function loadLocaleMessages(locale) {
  // load locale messages with dynamic import
  messages.value = await import(`./locales/${locale}.json`)
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.value.default)

  return nextTick()
}

export async function loadAsyncLocaleMessages(locale) {
  // load locale messages with dynamic import
  const { data } = await getConfig()
  // set locale and locale message
  i18n.global.mergeLocaleMessage(locale, data)

  return nextTick()
}

export default function setupI18n() {
  if (!i18n) {
    const locale = localStorage.getItem('lang') || 'nl'

    i18n = createI18n({
      globalInjection: true,
      legacy: false, // you must set `false`, to use Composition API
      locale: locale,
      allbackWarn: false,
      warnHtmlInMessage: 'off',
      silentTranslationWarn: true,
      fallbackLocale: 'en',
      datetimeFormats: dateTimeFormats()
    })

    setI18nLanguage(locale)
  }
  return i18n
}
