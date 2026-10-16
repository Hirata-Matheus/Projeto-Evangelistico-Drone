<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { MotionConfig } from 'motion-v'
import { initSmoothScroll, destroySmoothScroll, scrollToSection, ScrollTrigger } from '~/lib/motion'
import { splash, startSession } from '~/lib/state'

const { t, locale } = useI18n()

// Antes do primeiro render: consentimento salvo e se a abertura deve aparecer.
startSession()

useHead(() => ({
  title: t('meta.title'),
  htmlAttrs: { lang: locale.value },
  meta: [{ name: 'description', content: t('meta.description') }]
}))

const refresh = () => ScrollTrigger.refresh()

onMounted(() => {
  initSmoothScroll()
  document.fonts?.ready.then(refresh)
  window.addEventListener('load', refresh, { once: true })
})
onBeforeUnmount(destroySmoothScroll)
</script>

<template>
  <MotionConfig reduced-motion="user">
    <a class="skip-link" href="#palavra" @click.prevent="scrollToSection('palavra')">{{ t('a11y.skip') }}</a>
    <SplashScreen v-if="splash === 'show'" />
    <ScrollProgress />
    <CustomCursor />
    <main id="conteudo" class="overflow-x-clip">
      <NuxtPage />
    </main>
    <SiteFooter />
    <AppToast />
  </MotionConfig>
</template>
