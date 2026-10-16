<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SITE, waLink } from '~/data/site'
import { useShare } from '~/composables/useShare'

const { t } = useI18n()
const { copyText } = useShare()
</script>

<template>
  <footer class="bg-ceu-night px-gutter pb-[calc(48px+var(--safe-bottom))] pt-14 text-ceu-bg">
    <div class="mx-auto flex max-w-site flex-col gap-[22px]">
      <p class="display m-0 text-[30px] leading-[1.1]">{{ t('footer.title') }}</p>
      <div class="flex flex-wrap gap-2.5">
        <div class="flex items-center gap-1 rounded-full bg-sage-500 p-1 pr-1.5 text-ceu-ink">
          <a
            v-magnetic="0.2"
            :href="waLink(t('wa.contact'))"
            target="_blank"
            rel="noopener"
            class="flex min-h-[42px] items-center gap-2.5 rounded-full px-4 text-[15px] font-bold no-underline transition-colors hover:bg-sage-600"
            :data-cursor="t('cursor.open')"
          >
            <AppIcon name="chat" />
            <span>{{ SITE.whatsapp.display }}</span>
          </a>
          <button
            type="button"
            class="icon-btn size-[42px] bg-ceu-ink/10 text-ceu-ink hover:bg-ceu-ink/20"
            :aria-label="t('footer.copy')"
            :title="t('footer.copy')"
            @click="copyText(SITE.whatsapp.copy, t('share.phoneCopied'))"
          >
            <AppIcon name="copy" :size="17" />
          </button>
        </div>
        <a
          v-magnetic="0.2"
          :href="SITE.instagram.url"
          target="_blank"
          rel="noopener"
          class="pill bg-clay-500 px-5 text-[15px] text-ceu-ink hover:bg-clay-400"
          :data-cursor="t('cursor.open')"
        >
          <AppIcon name="instagram" />
          <span>{{ SITE.instagram.handle }}</span>
        </a>
      </div>
      <p class="mb-0 mt-3 text-[13px] text-sand-500">{{ t('meta.bibleNote') }}</p>
    </div>
  </footer>
</template>
