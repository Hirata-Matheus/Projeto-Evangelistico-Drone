// Animações de rolagem guiadas por atributos, para não espalhar GSAP por todas as seções:
//   data-reveal    sobe e aparece ao entrar na tela
//   data-split     título que sobe linha por linha (SplitText com máscara)
//   data-words     frase que acende palavra por palavra conforme a rolagem
//   data-card      cartão que chega girando, preso à rolagem
//   data-stagger   filhos aparecem em sequência
//   data-parallax  círculo decorativo com parallax e escala
import type { Ref } from 'vue'
import { gsap, SplitText } from '~/lib/motion'
import { useGsap } from './useGsap'

export function useScrollReveal(root: Ref<HTMLElement | null>) {
  useGsap(
    root,
    ({ motion, desktop }) => {
      if (!motion || !root.value) return
      const all = <T extends HTMLElement = HTMLElement>(sel: string) => Array.from(root.value!.querySelectorAll<T>(sel))

      all('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      })

      all('[data-card]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 140, rotate: i % 2 ? 5 : -5, scale: 0.86, opacity: 0 },
          { y: 0, rotate: 0, scale: 1, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 105%', end: 'top 55%', scrub: 0.6 } }
        )
      })

      all('[data-stagger]').forEach((el) => {
        gsap.from(el.children, { y: 24, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.06, ease: 'back.out(1.8)', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })

      all('[data-split]:not([data-split="intro"])').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
        // Folga para acentos e descendentes não serem cortados pela máscara
        split.masks.forEach((m) => Object.assign((m as HTMLElement).style, { paddingBottom: '0.22em', marginBottom: '-0.22em' }))
        gsap.set(el, { visibility: 'visible' })
        gsap.from(split.lines, {
          yPercent: 120,
          rotate: 3,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onComplete: () => split.revert()
        })
      })

      all('[data-words]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.14, y: 14 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: 0.5 } }
        )
      })

      // No celular o deslocamento é menor, para os círculos não "pularem" na tela estreita.
      const [fromY, toY, fromS, toS] = desktop ? [35, -45, 0.55, 1.2] : [22, -28, 0.7, 1.1]
      all('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: fromY, scale: fromS },
          { yPercent: toY, scale: toS, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.8 } }
        )
      })
    },
    { waitFonts: true, responsive: true }
  )
}
