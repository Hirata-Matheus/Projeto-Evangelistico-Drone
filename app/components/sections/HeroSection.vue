<script setup lang="ts">
// Abertura: sol, título que sobe linha por linha e a rota do drone, que se desenha conforme a rolagem
// ("ela desceu do céu até as suas mãos").
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap, SplitText, scrollToSection } from '~/lib/motion'
import { introReady } from '~/lib/state'
import { SITE } from '~/data/site'
import { useGsap } from '~/composables/useGsap'

const { t } = useI18n()

const root = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const sunOuter = ref<HTMLElement | null>(null)
const sunInner = ref<HTMLElement | null>(null)
const routeIntro = ref<HTMLElement | null>(null)
const routeScroll = ref<SVGSVGElement | null>(null)
const drone = ref<HTMLElement | null>(null)
const droneInner = ref<HTMLElement | null>(null)

useGsap(
  root,
  ({ motion }) => {
    if (!motion || !title.value) return

    const split = SplitText.create(title.value, { type: 'lines', mask: 'lines' })
    split.masks.forEach((m) => Object.assign((m as HTMLElement).style, { paddingBottom: '0.22em', marginBottom: '-0.22em' }))
    gsap.set(title.value, { visibility: 'visible' })

    // Entrada: fica pausada até a tela de abertura começar a sair.
    const intro = gsap.timeline({ paused: true, onComplete: () => split.revert() })
    intro
      .from(sunInner.value, { scale: 0.2, yPercent: 40, duration: 1.6, ease: 'power3.out' }, 0)
      .from(split.lines, { yPercent: 120, rotate: 3, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.1)
      .from('[data-hero-fade]', { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.3)
      .from(routeIntro.value, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.6, ease: 'power2.inOut' }, 0.4)
      .from(drone.value, { scale: 0, rotate: -90, duration: 1, ease: 'back.out(2)' }, 0.5)
    introReady().then(() => intro.play())

    gsap.to(droneInner.value, { y: -7, rotate: 7, yoyo: true, repeat: -1, duration: 1.6, ease: 'sine.inOut' })

    // Rolagem: o conteúdo sobe e apaga, o sol cresce e a rota termina de se desenhar.
    const scrub = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(content.value, { y: -90, opacity: 0.15, ease: 'none', scrollTrigger: scrub })
    gsap.to(sunOuter.value, { yPercent: -25, scale: 1.15, ease: 'none', scrollTrigger: scrub })
    gsap.fromTo(
      routeScroll.value,
      { clipPath: 'inset(0% 0% 58% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom 35%', scrub: 0.6 } }
    )
  },
  { waitFonts: true }
)
</script>

<template>
  <header ref="root" class="relative flex min-h-svh flex-col overflow-hidden bg-ceu-night text-ceu-bg">
    <!-- Sol: o de fora reage à rolagem, o de dentro faz a entrada -->
    <div
      ref="sunOuter"
      class="pointer-events-none absolute aspect-square"
      style="right: clamp(-420px, -38vw, -140px); bottom: clamp(-300px, -22vw, -90px); width: clamp(420px, 110vw, 860px)"
    >
      <div ref="sunInner" class="size-full rounded-full bg-clay-500" />
    </div>
    <div data-parallax class="pointer-events-none absolute -left-[60px] top-[22svh] aspect-square w-[clamp(150px,16vw,260px)] rounded-full bg-sage-600" />

    <!-- Rota do drone (SVG): a entrada revela o começo, a rolagem desenha o resto -->
    <div ref="routeIntro" class="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg ref="routeScroll" class="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M80 15 C 70 30, 92 38, 78 52 S 52 66, 62 80 S 50 96, 46 104"
          fill="none"
          stroke="#f5ead8"
          stroke-opacity="0.55"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-dasharray="0 13"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <div class="absolute left-[80%] top-[15%] -translate-x-1/2 -translate-y-1/2">
        <div ref="drone">
          <div ref="droneInner" class="grid size-14 place-items-center rounded-full bg-ceu-bg text-ceu-night shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
            <AppIcon name="drone" :size="30" :stroke="2" />
          </div>
        </div>
      </div>
    </div>

    <div
      ref="content"
      class="relative mx-auto flex w-full max-w-site flex-1 flex-col px-gutter pb-[calc(28px+var(--safe-bottom))] pt-[calc(18px+var(--safe-top))]"
    >
      <div data-hero-fade class="flex items-center justify-between gap-3">
        <a
          :href="SITE.instagram.url"
          target="_blank"
          rel="noopener"
          class="rounded-full bg-ceu-bg/[0.12] px-3.5 py-2 text-sm font-bold text-ceu-bg no-underline backdrop-blur-sm transition-colors hover:bg-ceu-bg/20"
          :data-cursor="t('cursor.open')"
        >
          {{ SITE.instagram.handle }}
        </a>
        <div class="flex items-center gap-3">
          <span class="font-mono text-xs font-semibold tracking-[0.14em] text-sand-400">{{ t('meta.bible') }}</span>
          <LanguageSwitcher />
        </div>
      </div>

      <div class="flex flex-1 flex-col justify-center gap-[22px] py-12">
        <span data-hero-fade class="eyebrow bg-ceu-bg text-ceu-night">{{ t('hero.badge') }}</span>
        <h1 ref="title" data-split="intro" class="display m-0 max-w-[11ch] text-[clamp(50px,9.4vw,144px)] leading-[0.96]">
          {{ t('hero.title') }}
        </h1>
        <p data-hero-fade class="m-0 max-w-[30ch] text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-sand-200 text-pretty">
          {{ t('hero.lead') }}
        </p>
      </div>

      <div data-hero-fade class="self-start">
        <a
          v-magnetic
          href="#encorajamento"
          class="pill bg-ceu-ink text-ceu-bg hover:bg-black"
          :data-cursor="t('cursor.go')"
          @click.prevent="scrollToSection('encorajamento')"
        >
          <AppIcon name="arrow-down" />
          <span>{{ t('hero.cta') }}</span>
        </a>
      </div>
    </div>
  </header>
</template>
