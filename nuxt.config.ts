// Palavra do Céu — Nuxt 4 em modo SPA (gerado como site estático e publicado na Vercel).
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },

  // Componentes pelo nome do arquivo, sem prefixo da pasta (layout/SplashScreen.vue → <SplashScreen>).
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],

  // Tailwind 3 roda como plugin do PostCSS, com Autoprefixer depois dele.
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Uma palavra do céu para você',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Você escaneou o QR Code do drone. Deus tem uma palavra para você hoje.' },
        { name: 'theme-color', content: '#2e2b25' },
        { property: 'og:title', content: 'Uma palavra do céu para você' },
        { property: 'og:description', content: 'Você escaneou o QR Code do drone. Deus tem uma palavra para você hoje.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      // URL do Google Apps Script que grava as autorizações na planilha.
      // Defina NUXT_PUBLIC_CONSENT_SHEET_URL no .env e na Vercel (ver README).
      consentSheetUrl: ''
    }
  },

  nitro: {
    // Saída estática pura em .output/public (o vercel.json cuida das rotas).
    preset: 'static'
  },

  vite: {
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    build: {
      rollupOptions: {
        output: {
          // Bibliotecas de animação em arquivos próprios: mudam pouco e ficam no cache do navegador.
          manualChunks(id) {
            if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'vendor-gsap'
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'vendor-motion'
          }
        }
      }
    },
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'lenis', 'motion-v', 'vue-i18n']
    }
  }
})
