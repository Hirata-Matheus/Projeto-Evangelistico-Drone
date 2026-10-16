<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { toast } from '~/lib/state'
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-[calc(24px+var(--safe-bottom))] z-[70] flex justify-center px-4" aria-live="polite" role="status">
    <AnimatePresence>
      <motion.div
        v-if="toast"
        :key="toast"
        class="glass whitespace-nowrap rounded-full px-[22px] py-3.5 text-[15px] font-semibold text-ceu-bg shadow-[0_12px_32px_color-mix(in_srgb,#2e2b25_22%,transparent)]"
        :initial="{ opacity: 0, y: 24, scale: 0.92 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: 12, scale: 0.96 }"
        :transition="{ type: 'spring', stiffness: 420, damping: 30 }"
      >
        {{ toast }}
      </motion.div>
    </AnimatePresence>
  </div>
</template>
