// Compartilhar versículo: menu nativo do celular → área de transferência → WhatsApp.
import { useI18n } from 'vue-i18n'
import { showToast } from '~/lib/state'

export function useShare() {
  const { t } = useI18n()

  async function copy(text: string, okMessage: string) {
    try {
      await navigator.clipboard.writeText(text)
      showToast(okMessage)
      return true
    } catch {
      return false
    }
  }

  async function shareVerse(text: string, reference: string) {
    const url = location.origin + location.pathname
    const body = `“${text}” ${reference} (${t('meta.bible')})`
    if (navigator.share) {
      try {
        await navigator.share({ title: t('share.title'), text: body, url })
        return
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return
      }
    }
    if (await copy(`${body}\n${url}`, t('share.copied'))) return
    window.open(`https://wa.me/?text=${encodeURIComponent(`${body}\n${url}`)}`, '_blank', 'noopener')
  }

  async function copyText(text: string, okMessage: string) {
    if (!(await copy(text, okMessage))) showToast(t('share.copyFailed'))
  }

  return { shareVerse, copyText }
}
