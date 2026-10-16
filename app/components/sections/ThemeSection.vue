<script setup lang="ts">
// Uma seção de tema (Encorajamento, Consolo…). Cores em data/themes.ts, textos em themes.<id>.
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Theme } from '~/data/themes'
import { useShare } from '~/composables/useShare'

const props = defineProps<{ theme: Theme }>()
const { t } = useI18n()
const { shareVerse } = useShare()

const key = computed(() => `themes.${props.theme.id}`)
const vars = computed(() => {
  const s = props.theme.section
  return {
    '--s-bg': s.bg,
    '--s-fg': s.fg,
    '--s-muted': s.muted ?? s.fg,
    '--s-card': s.card,
    '--s-ref': s.ref,
    '--s-btn': s.btn,
    '--s-btn-fg': s.btnFg,
    '--s-btn-active': s.btnActive
  }
})
</script>

<template>
  <section :id="theme.id" class="section-pad relative overflow-hidden bg-[--s-bg] text-[--s-fg]" :style="vars">
    <div data-parallax class="pointer-events-none absolute aspect-square rounded-full" :style="theme.blob" aria-hidden="true" />
    <div class="split-grid relative mx-auto max-w-site gap-[clamp(24px,5vw,80px)]" :class="{ 'pb-20': theme.id === 'esperanca' }">
      <h2 data-split class="display m-0 text-[clamp(40px,5.4vw,72px)] leading-[0.98] [--wdth:102]">{{ t(`${key}.title`) }}</h2>
      <div class="flex flex-col gap-6">
        <p data-reveal class="m-0 max-w-[36ch] text-[clamp(18px,1.5vw,21px)] leading-[1.6] text-[--s-muted] text-pretty">{{ t(`${key}.text`) }}</p>
        <figure data-card class="mx-0 mb-0 mt-2 flex flex-col gap-3.5 rounded-blob bg-[--s-card] px-6 pb-5 pt-7">
          <blockquote class="m-0 text-[clamp(22px,1.9vw,27px)] font-semibold leading-[1.4] text-pretty">“{{ t(`${key}.verse.t`) }}”</blockquote>
          <div class="flex items-center justify-between gap-3">
            <figcaption class="ref text-[--s-ref]">{{ t(`${key}.verse.r`) }}</figcaption>
            <button
              type="button"
              class="icon-btn share-btn"
              :aria-label="t('share.label')"
              :data-cursor="t('cursor.share')"
              @click="shareVerse(t(`${key}.verse.t`), t(`${key}.verse.r`))"
            >
              <AppIcon name="share" />
            </button>
          </div>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.share-btn {
  background: var(--s-btn);
  color: var(--s-btn-fg);
}
.share-btn:hover,
.share-btn:active {
  background: var(--s-btn-active);
}
</style>
