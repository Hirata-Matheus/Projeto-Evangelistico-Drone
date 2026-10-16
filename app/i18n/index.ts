// vue-i18n 11 (Composition API). Para adicionar um idioma: crie locales/<código>.ts com as mesmas
// chaves de pt-BR.ts e registre em LOCALES. O seletor de idioma aparece sozinho quando houver mais de um.
import { createI18n } from 'vue-i18n'
import { SITE } from '~/data/site'
import ptBR from './locales/pt-BR'

export type MessageSchema = typeof ptBR

export const LOCALES = [
  { code: 'pt-BR', label: 'Português', short: 'PT' }
] as const

export type LocaleCode = (typeof LOCALES)[number]['code']

export const DEFAULT_LOCALE: LocaleCode = 'pt-BR'

const messages: Record<LocaleCode, MessageSchema> = {
  'pt-BR': ptBR
}

const isLocale = (code: unknown): code is LocaleCode => LOCALES.some((l) => l.code === code)

/** Idioma salvo no localStorage → idioma do navegador → padrão. */
export function detectLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem(SITE.storage.locale)
    if (isLocale(saved)) return saved
  } catch {}
  for (const lang of navigator.languages ?? [navigator.language]) {
    const match = LOCALES.find((l) => l.code === lang) ?? LOCALES.find((l) => l.code.split('-')[0] === lang.split('-')[0])
    if (match) return match.code
  }
  return DEFAULT_LOCALE
}

export function saveLocale(code: LocaleCode) {
  try {
    localStorage.setItem(SITE.storage.locale, code)
  } catch {}
}

export function createAppI18n() {
  return createI18n<[MessageSchema], LocaleCode, false>({
    legacy: false,
    globalInjection: true,
    locale: detectLocale(),
    fallbackLocale: DEFAULT_LOCALE,
    messages
  })
}
