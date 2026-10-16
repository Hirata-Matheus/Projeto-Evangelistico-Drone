// Os seis temas da página: cores do botão (chip) e da seção de cada um.
// Os textos ficam em i18n/locales/*, na chave themes.<id>.
import type { CSSProperties } from 'vue'

export interface ThemeChip {
  bg: string
  fg: string
  active: string
  border?: string
}

export interface Theme {
  id: string
  chip: ThemeChip
  section: {
    bg: string
    fg: string
    muted?: string
    card: string
    ref: string
    btn: string
    btnFg: string
    btnActive: string
  }
  /** Círculo decorativo com parallax. */
  blob: CSSProperties
}

export const THEMES: Theme[] = [
  {
    id: 'encorajamento',
    chip: { bg: '#d67f48', fg: '#201e1d', active: '#b2622d' },
    section: { bg: '#d67f48', fg: '#201e1d', card: '#f5ead8', ref: '#8c491a', btn: '#ebddc5', btnFg: '#201e1d', btnActive: '#dcd3c4' },
    blob: { right: '-90px', top: '-70px', width: 'clamp(280px, 72vw, 532px)', background: '#f6a06b' }
  },
  {
    id: 'consolo',
    chip: { bg: '#8fa073', fg: '#201e1d', active: '#728157' },
    section: { bg: '#8fa073', fg: '#201e1d', card: '#f5ead8', ref: '#56633f', btn: '#ebddc5', btnFg: '#201e1d', btnActive: '#dcd3c4' },
    blob: { left: '-100px', bottom: '-60px', width: 'clamp(260px, 67vw, 494px)', background: '#aebf92' }
  },
  {
    id: 'cura',
    chip: { bg: '#ebddc5', fg: '#201e1d', active: '#dcd3c4' },
    section: { bg: '#f5ead8', fg: '#201e1d', card: '#ebddc5', ref: '#8c491a', btn: '#f5ead8', btnFg: '#201e1d', btnActive: '#dcd3c4' },
    blob: { right: '-70px', top: '40px', width: 'clamp(220px, 56vw, 418px)', background: '#ffc6a5' }
  },
  {
    id: 'esperanca',
    chip: { bg: '#2e2b25', fg: '#f5ead8', active: '#474238' },
    section: { bg: '#2e2b25', fg: '#f5ead8', muted: '#eee7db', card: '#474238', ref: '#f6a06b', btn: '#645c50', btnFg: '#f5ead8', btnActive: '#82796a' },
    blob: { left: '0', right: '0', margin: '0 auto', bottom: '-180px', width: 'clamp(360px, 92vw, 684px)', background: '#b2622d' }
  },
  {
    id: 'amor',
    chip: { bg: '#ffc6a5', fg: '#201e1d', active: '#f6a06b' },
    section: { bg: '#ffc6a5', fg: '#201e1d', card: '#f5ead8', ref: '#8c491a', btn: '#ebddc5', btnFg: '#201e1d', btnActive: '#dcd3c4' },
    blob: { right: '-60px', bottom: '-40px', width: 'clamp(240px, 62vw, 456px)', background: '#f6a06b' }
  },
  {
    id: 'salvacao',
    chip: { bg: '#56633f', fg: '#f5ead8', active: '#3d472b' },
    section: { bg: '#56633f', fg: '#f5ead8', muted: '#eee7db', card: '#3d472b', ref: '#ccdbb2', btn: '#56633f', btnFg: '#f5ead8', btnActive: '#728157' },
    blob: { left: '-80px', top: '-60px', width: 'clamp(240px, 62vw, 456px)', background: '#728157' }
  }
]

/** "Propósito" não é uma seção de tema, mas aparece entre os chips. */
export const PURPOSE_CHIP: ThemeChip = { bg: 'transparent', fg: '#201e1d', active: '#eee7db', border: '#201e1d' }

/** Todas as âncoras da página, na ordem. Usadas nos atalhos /oracao → /#oracao. */
export const SECTION_IDS = ['palavra', ...THEMES.map((t) => t.id), 'oracao', 'proposito', 'autorizacao']
