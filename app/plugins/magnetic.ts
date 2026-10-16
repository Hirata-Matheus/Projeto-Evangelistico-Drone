// v-magnetic: o botão "puxa" em direção ao mouse. Uso: v-magnetic ou v-magnetic="0.2" (força).
// Só funciona com mouse e sem "reduzir movimento"; no celular não faz nada.
import type { Directive } from 'vue'
import { gsap, finePointer, prefersReduced } from '~/lib/motion'

interface MagneticState {
  move: (e: PointerEvent) => void
  leave: () => void
}

const states = new WeakMap<HTMLElement, MagneticState>()

const vMagnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (!finePointer() || prefersReduced()) return
    const strength = typeof binding.value === 'number' ? binding.value : 0.32
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * strength)
      yTo((e.clientY - r.top - r.height / 2) * strength * 1.2)
    }
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: true })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    states.set(el, { move, leave })
  },
  unmounted(el) {
    const s = states.get(el)
    if (!s) return
    el.removeEventListener('pointermove', s.move)
    el.removeEventListener('pointerleave', s.leave)
    gsap.killTweensOf(el)
    states.delete(el)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('magnetic', vMagnetic)
})
