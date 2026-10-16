// Registra a autorização de imagem na planilha Google (via Google Apps Script).
// O código do script está em google-apps-script/Code.gs; a URL vem de NUXT_PUBLIC_CONSENT_SHEET_URL.
import { useI18n } from 'vue-i18n'
import type { ConsentName } from '~/lib/state'

export type ConsentStatus = 'autorizou' | 'revogou'

/** Nome ou sobrenome: letras (com acento), espaço, hífen e apóstrofo; de 2 a 60 caracteres. */
const NAME_RE = /^\p{L}[\p{L}\p{M}' -]*$/u
export const normalizeName = (v: string) => v.trim().replace(/\s+/g, ' ')
export const isValidName = (v: string) => v.length >= 2 && v.length <= 60 && NAME_RE.test(v)

export function useConsentRecord() {
  const { public: config } = useRuntimeConfig()
  const { locale } = useI18n()

  async function record(name: ConsentName, status: ConsentStatus, honeypot = '') {
    const url = config.consentSheetUrl as string
    if (!url) throw new Error('NUXT_PUBLIC_CONSENT_SHEET_URL não configurada (ver README).')

    const controller = new AbortController()
    // O Apps Script pode levar vários segundos na primeira chamada depois de um tempo parado.
    const timer = setTimeout(() => controller.abort(), 30000)
    try {
      // Corpo em text/plain: o navegador não faz "preflight" e o Apps Script aceita sem CORS extra.
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ nome: name.first, sobrenome: name.last, status, idioma: locale.value, website: honeypot }),
        signal: controller.signal
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`)
    } finally {
      clearTimeout(timer)
    }
  }

  return { record }
}
