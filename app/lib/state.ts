// Estado compartilhado da página, só com ref() do Vue (sem Pinia).
import { ref } from 'vue'
import { SITE } from '~/data/site'

export type SplashState = 'show' | 'gone'
export type Consent = 'yes' | 'no' | null

type Area = 'local' | 'session'
const area = (a: Area) => (a === 'local' ? window.localStorage : window.sessionStorage)

/** localStorage/sessionStorage sem quebrar em navegação privada ou com armazenamento bloqueado. */
export const store = {
  get(a: Area, key: string): string | null {
    try {
      return area(a).getItem(key)
    } catch {
      return null
    }
  },
  set(a: Area, key: string, value: string | null) {
    try {
      if (value == null) area(a).removeItem(key)
      else area(a).setItem(key, value)
    } catch {}
  }
}

export const splash = ref<SplashState>('gone')
export const consent = ref<Consent>(null)
export interface ConsentName {
  first: string
  last: string
}
/** Nome de quem autorizou neste aparelho (também foi enviado para a planilha). */
export const consentName = ref<ConsentName | null>(null)
export const verseIndex = ref(0)
export const toast = ref('')

// Portão das animações de entrada: a abertura segura a animação do topo até começar a sair.
let gate: Promise<void> | null = null
let openGate: (() => void) | null = null

export function holdIntro() {
  gate = new Promise((res) => (openGate = res))
}

export function releaseIntro() {
  openGate?.()
  openGate = null
  gate = null
}

export const introReady = () => gate ?? Promise.resolve()

/** Lê o que ficou salvo deste aparelho. Chamado uma vez, antes do primeiro render. */
export function startSession() {
  if (SITE.rememberConsent) {
    const saved = store.get('local', SITE.storage.consent)
    const name = parseName(store.get('local', SITE.storage.consentName))
    // "Sim" salvo sem nome (versão antiga, antes do formulário) conta como não respondido.
    if (saved === 'yes' && name) {
      consent.value = 'yes'
      consentName.value = name
    } else consent.value = saved === 'no' ? 'no' : null
  }
  // A abertura aparece uma vez por visita (sessionStorage).
  if (SITE.showIntro && store.get('session', SITE.storage.intro) !== '1') {
    splash.value = 'show'
    holdIntro()
    store.set('session', SITE.storage.intro, '1')
  }
}

/** Grava a resposta. No "sim", o nome vai junto (para mostrar o agradecimento e permitir revogar). */
export function setConsent(value: Consent, name: ConsentName | null = null) {
  const keepName = value === 'yes' ? name : null
  if (value == null) store.set('local', SITE.storage.consent, null)
  else if (SITE.rememberConsent) store.set('local', SITE.storage.consent, value)
  store.set('local', SITE.storage.consentName, keepName && SITE.rememberConsent ? JSON.stringify(keepName) : null)
  consent.value = value
  consentName.value = keepName
}

function parseName(raw: string | null): ConsentName | null {
  try {
    const v = raw ? JSON.parse(raw) : null
    return typeof v?.first === 'string' && typeof v?.last === 'string' ? { first: v.first, last: v.last } : null
  } catch {
    return null
  }
}

let toastTimer: ReturnType<typeof setTimeout> | undefined
export function showToast(message: string, ms = 2200) {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), ms)
}
