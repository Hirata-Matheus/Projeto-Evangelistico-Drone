<script setup lang="ts">
// Barra fina no topo mostrando quanto da página já foi lido.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from '~/lib/motion'

const bar = ref<HTMLElement | null>(null)
let st: ScrollTrigger | null = null

onMounted(() => {
  st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      if (bar.value) bar.value.style.transform = `scaleX(${self.progress})`
    }
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <div ref="bar" class="pointer-events-none fixed inset-x-0 top-0 z-[55] h-1 origin-left scale-x-0 bg-clay-500" aria-hidden="true" />
</template>
