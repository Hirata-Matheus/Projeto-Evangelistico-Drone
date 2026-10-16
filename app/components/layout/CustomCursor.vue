<script setup lang="ts">
// Cursor em forma de mira de drone. Só aparece com mouse e sem "reduzir movimento".
// Cresce sobre links e botões; data-cursor="Texto" mostra um rótulo dentro dele.
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap, finePointer, prefersReduced } from '~/lib/motion'

const el = ref<HTMLElement | null>(null)
const enabled = ref(false)
const active = ref(false)
const hidden = ref(true)
const label = ref('')
let xTo: gsap.QuickToFunc | null = null
let yTo: gsap.QuickToFunc | null = null

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]'

function move(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  hidden.value = false
  xTo?.(e.clientX)
  yTo?.(e.clientY)
}
function over(e: PointerEvent) {
  const target = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null
  active.value = !!target
  label.value = target?.dataset.cursor ?? ''
}
function out(e: PointerEvent) {
  if (!e.relatedTarget) hidden.value = true
}

onMounted(async () => {
  if (!finePointer() || prefersReduced()) return
  enabled.value = true
  await nextTick()
  document.documentElement.classList.add('has-cursor')
  xTo = gsap.quickTo(el.value, 'x', { duration: 0.35, ease: 'power3' })
  yTo = gsap.quickTo(el.value, 'y', { duration: 0.35, ease: 'power3' })
  window.addEventListener('pointermove', move, { passive: true })
  document.addEventListener('pointerover', over)
  document.addEventListener('pointerout', out)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-cursor')
  window.removeEventListener('pointermove', move)
  document.removeEventListener('pointerover', over)
  document.removeEventListener('pointerout', out)
})
</script>

<template>
  <div v-if="enabled" ref="el" class="cursor" :class="{ 'is-active': active, 'is-hidden': hidden }" aria-hidden="true">
    <div class="cursor-ring">
      <span>{{ label }}</span>
    </div>
  </div>
</template>
