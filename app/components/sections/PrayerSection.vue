<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { waLink } from '~/data/site'

const { t } = useI18n()
</script>

<template>
  <section id="oracao" class="section-pad bg-sage-200 text-ceu-ink">
    <div class="split-grid mx-auto max-w-site gap-[clamp(28px,5vw,80px)]">
      <div class="flex flex-col gap-6">
        <span data-reveal class="eyebrow bg-sage-700 text-ceu-bg">{{ t('prayer.badge') }}</span>
        <h2 data-split class="display m-0 text-[clamp(40px,6vw,88px)] leading-none">{{ t('prayer.title') }}</h2>
        <p data-reveal class="m-0 text-lg leading-[1.6] text-sage-800">{{ t('prayer.lead') }}</p>
        <div data-reveal class="self-start">
          <a
            v-magnetic
            :href="waLink(t('wa.prayer'))"
            target="_blank"
            rel="noopener"
            class="pill min-h-[52px] bg-sage-700 px-6 text-ceu-bg hover:bg-sage-800 active:bg-sage-900"
            :data-cursor="t('cursor.open')"
          >
            <AppIcon name="chat" :size="20" />
            <span>{{ t('prayer.cta') }}</span>
          </a>
        </div>
      </div>
      <div data-card class="flex flex-col gap-4 rounded-blob bg-sand-100 px-[clamp(24px,3vw,44px)] py-[clamp(30px,3vw,48px)]">
        <p class="m-0 text-[clamp(20px,1.8vw,26px)] font-semibold leading-[1.55] text-pretty">{{ t('prayer.text') }}</p>
      </div>
    </div>
  </section>
</template>
