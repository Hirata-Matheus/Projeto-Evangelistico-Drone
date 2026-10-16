<script setup lang="ts">
// Seletor de idioma. Só aparece quando há mais de um idioma em i18n/index.ts (hoje só pt-BR).
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion } from 'motion-v'
import { onClickOutside } from '@vueuse/core'
import { LOCALES, saveLocale, type LocaleCode } from '~/i18n'

const { t, locale } = useI18n()
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const current = computed(() => LOCALES.find((l) => l.code === locale.value) ?? LOCALES[0])

onClickOutside(root, () => (open.value = false))

function pick(code: LocaleCode) {
  locale.value = code
  saveLocale(code)
  open.value = false
}
</script>

<template>
  <div v-if="LOCALES.length > 1" ref="root" class="relative" @keydown.esc="open = false">
    <button
      type="button"
      class="flex min-h-9 items-center gap-1.5 rounded-full bg-ceu-bg/10 px-3 font-mono text-xs font-semibold tracking-[0.1em] text-ceu-bg"
      :aria-label="t('a11y.language')"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <AppIcon name="globe" :size="14" :stroke="2.4" />
      {{ current.short }}
      <AppIcon name="chevron-down" :size="14" :stroke="2.4" />
    </button>
    <AnimatePresence>
      <motion.ul
        v-if="open"
        role="listbox"
        class="glass absolute right-0 top-[calc(100%+8px)] z-10 m-0 min-w-[170px] list-none rounded-2xl p-1.5"
        :initial="{ opacity: 0, y: -8, scale: 0.96 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -6, scale: 0.98 }"
        :transition="{ duration: 0.2 }"
      >
        <li v-for="l in LOCALES" :key="l.code">
          <button
            type="button"
            role="option"
            :aria-selected="l.code === locale"
            class="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ceu-bg hover:bg-ceu-bg/10"
            @click="pick(l.code)"
          >
            {{ l.label }}
            <AppIcon v-if="l.code === locale" name="check" :size="14" />
          </button>
        </li>
      </motion.ul>
    </AnimatePresence>
  </div>
</template>
