<script setup lang="ts">
// O "joia" que pula e balança depois de autorizar.
import { ref } from 'vue'
import { gsap } from '~/lib/motion'
import { useGsap } from '~/composables/useGsap'

const el = ref<HTMLElement | null>(null)

useGsap(el, ({ motion }) => {
  if (!motion) return
  gsap.fromTo(el.value, { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.5)' })
  gsap.to(el.value, { rotate: -12, y: -6, yoyo: true, repeat: -1, duration: 0.6, ease: 'sine.inOut', delay: 1 })
})
</script>

<template>
  <div ref="el" class="grid aspect-square w-[132px] place-items-center rounded-full bg-clay-500 text-ceu-ink" aria-hidden="true">
    <AppIcon name="thumbs-up" :size="60" :stroke="2.4" />
  </div>
</template>
