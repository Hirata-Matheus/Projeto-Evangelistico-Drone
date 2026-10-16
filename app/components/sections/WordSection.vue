<script setup lang="ts">
// "Sua palavra de agora": versículo sorteado (troca com Motion), atalhos para os temas
// e cartão que pode ser arrastado para o lado para sortear outro.
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion, type PanInfo } from 'motion-v'
import { scrollToSection } from '~/lib/motion'
import { verseIndex } from '~/lib/state'
import { THEMES, PURPOSE_CHIP } from '~/data/themes'
import { useShare } from '~/composables/useShare'

const { t, tm } = useI18n()
const { shareVerse } = useShare()

const total = computed(() => (tm('verses') as unknown[]).length)
const verse = computed(() => ({ t: t(`verses.${verseIndex.value}.t`), r: t(`verses.${verseIndex.value}.r`) }))

const chips = [...THEMES.map((th) => ({ id: th.id, ...th.chip })), { id: 'proposito', ...PURPOSE_CHIP }]

function another() {
  if (total.value < 2) return
  let next = verseIndex.value
  while (next === verseIndex.value) next = Math.floor(Math.random() * total.value)
  verseIndex.value = next
}

function onDragEnd(_e: PointerEvent, info: PanInfo) {
  if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 500) another()
}

onMounted(() => {
  verseIndex.value = Math.floor(Math.random() * total.value)
})
</script>

<template>
  <section id="palavra" class="bg-ceu-bg px-[clamp(20px,5vw,64px)] pb-[clamp(56px,8vw,120px)] pt-[clamp(24px,3vw,48px)]">
    <div class="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(28px,5vw,72px)]">
      <div class="flex flex-col gap-6 px-1">
        <h2 data-split class="display m-0 text-[clamp(40px,6vw,84px)] leading-none">{{ t('word.title') }}</h2>
        <p data-reveal class="m-0 text-[15px] font-bold text-sand-700">{{ t('word.question') }}</p>
        <div data-stagger class="flex flex-wrap gap-2">
          <button
            v-for="c in chips"
            :key="c.id"
            v-magnetic="0.2"
            type="button"
            class="chip min-h-11 cursor-pointer rounded-full px-[18px] font-sans text-[15px] font-bold transition-colors duration-200"
            :style="{ '--c-bg': c.bg, '--c-fg': c.fg, '--c-active': c.active, '--c-border': c.border ?? 'transparent' }"
            :data-cursor="t('cursor.go')"
            @click="scrollToSection(c.id)"
          >
            {{ t(`themes.${c.id}.chip`) }}
          </button>
        </div>
      </div>

      <div data-card class="relative flex flex-col gap-7 overflow-hidden rounded-blob bg-sage-700 px-[26px] pb-[26px] pt-9 text-ceu-bg">
        <div class="absolute -right-[50px] -top-[50px] aspect-square w-40 rounded-full bg-sage-600" aria-hidden="true" />
        <div class="relative min-h-[236px]" aria-live="polite">
          <AnimatePresence mode="wait" :initial="false">
            <motion.figure
              :key="verseIndex"
              class="m-0 flex cursor-grab flex-col gap-[18px] active:cursor-grabbing"
              drag="x"
              :drag-constraints="{ left: 0, right: 0 }"
              :drag-elastic="0.55"
              :data-cursor="t('cursor.drag')"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }"
              :exit="{ opacity: 0, y: -16, transition: { duration: 0.22, ease: 'easeIn' } }"
              @drag-end="onDragEnd"
            >
              <span class="display h-[34px] text-[72px] leading-[0.6] text-sage-300" aria-hidden="true">“</span>
              <blockquote class="m-0 select-none text-2xl font-semibold leading-[1.38] text-pretty">{{ verse.t }}</blockquote>
              <figcaption class="ref text-sage-200">{{ verse.r }}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <p class="relative -mt-3 mb-0 hidden font-mono text-xs text-sage-300 [@media(hover:none)]:block">← {{ t('word.swipe') }} →</p>
        <div class="relative flex flex-wrap gap-2.5">
          <button v-magnetic="0.25" type="button" class="pill border-0 bg-ceu-bg text-ceu-night hover:bg-clay-200 active:bg-clay-300" @click="another">
            <AppIcon name="refresh" />
            <span>{{ t('word.another') }}</span>
          </button>
          <button
            v-magnetic="0.25"
            type="button"
            class="pill border-2 border-solid border-sage-300 bg-transparent text-ceu-bg hover:bg-sage-800 active:bg-sage-900"
            :data-cursor="t('cursor.share')"
            @click="shareVerse(verse.t, verse.r)"
          >
            <AppIcon name="share" />
            <span>{{ t('word.share') }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chip {
  background: var(--c-bg);
  color: var(--c-fg);
  border: 2px solid var(--c-border);
}
.chip:hover,
.chip:active {
  background: var(--c-active);
}
</style>
