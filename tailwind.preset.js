// Preset do Tailwind do Palavra do Céu: a paleta "Organic" do protótipo (areia, terracota e sálvia)
// e as três fontes do projeto. Só acrescenta ao tema padrão, não remove nada.
export default {
  theme: {
    extend: {
      colors: {
        ceu: {
          bg: '#f5ead8',
          surface: '#ebddc5',
          ink: '#201e1d',
          night: '#2e2b25'
        },
        sand: {
          100: '#f9f4ed',
          200: '#eee7db',
          300: '#dcd3c4',
          400: '#c0b6a5',
          500: '#a19786',
          600: '#82796a',
          700: '#645c50',
          800: '#474238',
          900: '#2e2b25'
        },
        clay: {
          100: '#fff2eb',
          200: '#ffe1d0',
          300: '#ffc6a5',
          400: '#f6a06b',
          500: '#d67f48',
          600: '#b2622d',
          700: '#8c491a',
          800: '#643312',
          900: '#402310'
        },
        sage: {
          100: '#f0fae1',
          200: '#e1eecc',
          300: '#ccdbb2',
          400: '#aebf92',
          500: '#8fa073',
          600: '#728157',
          700: '#56633f',
          800: '#3d472b',
          900: '#272e1b'
        }
      },
      fontFamily: {
        display: ['Archivo', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      maxWidth: { site: '1180px' },
      borderRadius: { blob: '28px' },
      spacing: { gutter: 'clamp(24px, 5vw, 64px)' },
      transitionTimingFunction: { soft: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    }
  }
}
