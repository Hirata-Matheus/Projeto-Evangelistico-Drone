// gsap.matchMedia() preso ao componente: tudo que for criado no setup (tweens, ScrollTriggers,
// SplitText) é desfeito ao desmontar, e refeito se "reduzir movimento" ou a largura da tela mudar.
import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import { gsap, MQ, fontsReady } from '~/lib/motion'

export interface MotionConditions {
  motion: boolean
  reduce: boolean
  desktop: boolean
}

interface Options {
  /** Espera as fontes carregarem antes do setup (necessário para o SplitText). */
  waitFonts?: boolean
  /** Reage à troca celular/computador (refaz o setup ao cruzar 768px). */
  responsive?: boolean
}

export function useGsap(
  scope: Ref<HTMLElement | null | undefined>,
  setup: (conditions: MotionConditions, ctx: gsap.Context) => void | (() => void),
  { waitFonts = false, responsive = false }: Options = {}
) {
  let mm: gsap.MatchMedia | null = null
  let alive = true

  onMounted(async () => {
    if (waitFonts) await fontsReady()
    if (!alive || !scope.value) return
    mm = gsap.matchMedia(scope.value)
    const queries: Record<string, string> = { motion: MQ.motion, reduce: MQ.reduce }
    if (responsive) queries.desktop = MQ.desktop
    mm.add(queries, (ctx) => {
      const c = ctx.conditions as Partial<MotionConditions>
      return setup({ motion: !!c.motion, reduce: !!c.reduce, desktop: responsive ? !!c.desktop : window.matchMedia(MQ.desktop).matches }, ctx)
    })
  })

  onBeforeUnmount(() => {
    alive = false
    mm?.revert()
    mm = null
  })
}
