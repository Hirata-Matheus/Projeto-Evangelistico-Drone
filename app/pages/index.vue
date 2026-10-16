<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { scrollToSection } from '~/lib/motion'
import { introReady } from '~/lib/state'
import { THEMES, SECTION_IDS } from '~/data/themes'
import { useScrollReveal } from '~/composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)
const route = useRoute()

useScrollReveal(root)

// Âncoras: /#oracao, links antigos e atalhos (/oracao) chegam aqui com o hash.
function goToHash(hash: string, immediate: boolean) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (SECTION_IDS.includes(id)) scrollToSection(id, { immediate })
}

onMounted(async () => {
  if (!route.hash) return
  await introReady()
  requestAnimationFrame(() => goToHash(route.hash, true))
})
watch(
  () => route.hash,
  (hash) => hash && goToHash(hash, false)
)
</script>

<template>
  <div ref="root">
    <HeroSection />
    <WordSection />
    <ThemeSection v-for="theme in THEMES" :key="theme.id" :theme="theme" />
    <PrayerSection />
    <PurposeSection />
    <ConsentSection />
  </div>
</template>
