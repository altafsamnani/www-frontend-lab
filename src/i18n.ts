import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { localize } from '@vee-validate/i18n'
import dateTimeFormats from '@/locales/rules/dateTimeFormats'
import en from '@/locales/en.json'
import nl from '@/locales/nl.json'

let i18n

export const SUPPORT_LOCALES = ['en', 'nl']

export function setI18nLanguage(locale) {
  loadLocaleMessages(locale)
  i18n.global.locale.value = locale

  localize(locale)

  document.querySelector('html').setAttribute('lang', locale)
  localStorage.setItem('lang', locale)
}

export async function loadLocaleMessages(locale) {
  // load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.json`)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

export default function setupI18n() {
  if (!i18n) {
    const locale = localStorage.getItem('lang') || 'nl'

    i18n = createI18n({
      globalInjection: true,
      legacy: false,
      locale: locale,
      fallbackLocale: 'en',
      datetimeFormats: dateTimeFormats()
    })

    setI18nLanguage(locale)
  }
  return i18n
}
