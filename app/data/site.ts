// Contatos, chaves de armazenamento e comportamento da página. Mude aqui, não nos componentes.
export const SITE = {
  instagram: { handle: '@_hrdrone', url: 'https://instagram.com/_hrdrone' },
  whatsapp: { number: '5518998104185', display: '(18) 99810-4185', copy: '+55 18 99810-4185' },

  /** Tela de abertura "Uma palavra do céu para você" (uma vez por visita). */
  showIntro: true,
  /** Guarda a resposta da autorização de imagem neste aparelho. */
  rememberConsent: true,

  // As mesmas chaves do protótipo, para quem já respondeu não ser perguntado de novo.
  storage: {
    consent: 'hrdrone_consent',
    consentName: 'hrdrone_consent_name',
    intro: 'hrdrone_intro',
    locale: 'hrdrone_locale'
  }
} as const

export const waLink = (text: string, number: string = SITE.whatsapp.number) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`
