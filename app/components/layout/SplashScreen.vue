<script setup lang="ts">
// Tela de abertura: aparece uma vez por visita (sessionStorage), fecha sozinha ou com um toque.
// Ao sair, libera as animações do topo da página (portão em lib/state.ts).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap, SplitText, fontsReady, lockScroll, prefersReduced } from '~/lib/motion'
import { splash, releaseIntro } from '~/lib/state'

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)
const sun = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

let timer: ReturnType<typeof setTimeout> | undefined
let closing = false
let ctx: gsap.Context | null = null

function close() {
  if (closing) return
  closing = true
  clearTimeout(timer)
  lockScroll(false)
  releaseIntro()
  if (prefersReduced() || !root.value) {
    splash.value = 'gone'
    return
  }
  // A cortina sobe (clip-path) enquanto o topo da página já começa a animar por baixo.
  gsap.to(root.value, {
    clipPath: 'inset(0% 0% 100% 0%)',
    duration: 0.9,
    ease: 'expo.inOut',
    onComplete: () => {
      splash.value = 'gone'
    }
  })
}

onMounted(async () => {
  lockScroll(true)
  timer = setTimeout(close, 2600)
  if (prefersReduced()) return

  ctx = gsap.context(() => {
    gsap.fromTo(sun.value, { scale: 0 }, { scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.6)' })
  }, root.value!)

  await fontsReady(700)
  if (closing || !title.value) return
  ctx.add(() => {
    // Letras chegam estreitas (wdth 62) e se abrem até a largura normal do Archivo.
    const split = SplitText.create(title.value!, { type: 'words,chars' })
    gsap.set(title.value, { visibility: 'visible' })
    gsap.from(split.chars, { yPercent: 70, opacity: 0, '--wdth': 62, duration: 0.9, stagger: 0.022, ease: 'power3.out', delay: 0.15 })
  })
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  ctx?.revert()
  if (!closing) {
    lockScroll(false)
    releaseIntro()
  }
})
</script>

<template>
  <div
    ref="root"
    class="fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center gap-8 overflow-hidden bg-ceu-night p-8 text-center text-ceu-bg [clip-path:inset(0_0_0_0)]"
    role="button"
    tabindex="0"
    :aria-label="t('splash.hint')"
    @click="close"
    @keydown.enter.space.prevent="close"
  >
    <div ref="sun" class="aspect-square w-[140px] rounded-full bg-clay-500" />
    <p ref="title" data-split="intro" class="display m-0 max-w-[12ch] text-[clamp(34px,9vw,44px)] leading-[1.05]">
      {{ t('splash.title') }}
    </p>
    <p class="m-0 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-sand-400">{{ t('splash.hint') }}</p>
  </div>
</template>
