import type { RouterConfig } from '@nuxt/schema'
import { SECTION_IDS } from '~/data/themes'

export default {
  routes: (routes) => [
    ...routes,
    // Atalhos curtos (bons para QR Codes impressos): /oracao → /#oracao, /esperanca → /#esperanca…
    {
      path: `/:secao(${SECTION_IDS.join('|')})`,
      redirect: (to) => ({ path: '/', hash: `#${String(to.params.secao)}`, replace: true })
    },
    // Links antigos (ex.: /Palavra%20do%20Ceu%20v2.dc.html#palavra) e endereços desconhecidos voltam para o início,
    // mantendo a âncora.
    {
      path: '/:pathMatch(.*)*',
      redirect: (to) => ({ path: '/', hash: to.hash, replace: true })
    }
  ],
  // A rolagem é feita pelo Lenis (ver pages/index.vue), não pelo vue-router.
  scrollBehavior: () => false
} satisfies RouterConfig
