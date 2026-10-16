// Núcleo de animação: GSAP (+ ScrollTrigger e SplitText) e rolagem suave com Lenis.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Consultas usadas com gsap.matchMedia() e window.matchMedia(). */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px)',
  fine: '(hover: hover) and (pointer: fine)'
} as const

export const prefersReduced = () => window.matchMedia(MQ.reduce).matches
/** Há mouse (ou trackpad) de verdade? Cursor personalizado e botões magnéticos dependem disso. */
export const finePointer = () => window.matchMedia(MQ.fine).matches

/** Espera as fontes (para o SplitText medir as linhas certas), sem travar em rede lenta. */
export function fontsReady(timeout = 1200) {
  const ready = document.fonts?.ready ?? Promise.resolve()
  return Promise.race([ready, new Promise((res) => setTimeout(res, timeout))])
}

let lenis: Lenis | null = null
let locks = 0
const raf = (time: number) => lenis?.raf(time * 1000)

export function initSmoothScroll() {
  if (lenis || prefersReduced()) return lenis
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.2 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  if (locks > 0) lenis.stop()
  return lenis
}

export function destroySmoothScroll() {
  gsap.ticker.remove(raf)
  lenis?.destroy()
  lenis = null
}

export const getLenis = () => lenis

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

export function scrollToTarget(target: string | HTMLElement | number, { immediate = false, offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, duration: 1.6, easing: easeOutQuart, force: true })
    return
  }
  let y = 0
  if (typeof target === 'number') y = target
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (!el) return
    y = el.getBoundingClientRect().top + window.scrollY + offset
  }
  window.scrollTo({ top: y, behavior: immediate || prefersReduced() ? 'auto' : 'smooth' })
}

export const scrollToSection = (id: string, opts?: { immediate?: boolean }) => scrollToTarget(`#${id}`, opts)

/** Trava a rolagem (Lenis + nativa). Pode ser chamada em pares por vários donos. */
export function lockScroll(on: boolean) {
  locks = Math.max(0, locks + (on ? 1 : -1))
  const locked = locks > 0
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export { gsap, ScrollTrigger, SplitText }
