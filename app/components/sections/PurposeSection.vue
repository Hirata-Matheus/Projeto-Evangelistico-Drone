<script setup lang="ts">
// Propósito: a frase acende palavra por palavra com a rolagem (data-words) e o sol nasce no canto.
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from '~/lib/motion'
import { useGsap } from '~/composables/useGsap'

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)
const sun = ref<HTMLElement | null>(null)

useGsap(root, ({ motion }) => {
  if (!motion) return
  gsap.from(sun.value, { scale: 0, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'top 30%', scrub: true } })
})
</script>

<template>
  <section
    id="proposito"
    ref="root"
    class="relative overflow-hidden bg-ceu-ink px-gutter pb-[clamp(112px,13vw,190px)] pt-[clamp(104px,13vw,180px)] text-ceu-bg"
  >
    <div ref="sun" class="pointer-events-none absolute -right-[120px] -top-[120px] aspect-square w-[clamp(340px,40vw,640px)] rounded-full bg-clay-500" aria-hidden="true" />
    <div data-parallax class="pointer-events-none absolute -left-[50px] bottom-[120px] aspect-square w-[120px] rounded-full bg-sage-600" aria-hidden="true" />
    <div class="relative mx-auto flex max-w-site flex-col gap-7">
      <p data-reveal class="m-0 max-w-[32ch] text-lg leading-[1.6] text-sand-300 text-pretty">{{ t('purpose.lead') }}</p>
      <p data-words class="display mx-0 mb-0 mt-4 max-w-[16ch] text-[clamp(38px,6.8vw,104px)] leading-[1.02]">
        {{ t('purpose.statement') }}
        <span class="text-clay-400">{{ t('purpose.highlight') }}</span>
      </p>
      <figure data-reveal class="mx-0 mb-0 mt-3 flex max-w-[640px] flex-col gap-3">
        <blockquote class="m-0 text-[19px] font-semibold leading-[1.5] text-sand-200 text-pretty">“{{ t('purpose.verse.t') }}”</blockquote>
        <figcaption class="ref text-clay-400">{{ t('purpose.verse.r') }}</figcaption>
      </figure>
    </div>
  </section>
</template>
