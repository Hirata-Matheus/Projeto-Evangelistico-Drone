<script setup lang="ts">
// Autorização de imagem. "Sim" pede nome e sobrenome e registra na planilha Google
// (composables/useConsentRecord.ts); a resposta também fica salva no aparelho (localStorage).
// As trocas de estado são animadas com Motion.
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion } from 'motion-v'
import { ScrollTrigger } from '~/lib/motion'
import { consent, consentName, setConsent } from '~/lib/state'
import { SITE } from '~/data/site'
import { useConsentRecord, normalizeName, isValidName } from '~/composables/useConsentRecord'

const { t } = useI18n()
const { record } = useConsentRecord()

const enter = { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
const leave = { opacity: 0, y: -10, transition: { duration: 0.2 } }

const step = ref<'ask' | 'form'>('ask')
const view = computed(() => consent.value ?? step.value)

// Formulário
const first = ref('')
const last = ref('')
const website = ref('') // campo-isca invisível contra robôs
const submitted = ref(false)
const sending = ref(false)
const error = ref('')
const firstInput = ref<HTMLInputElement | null>(null)

function fieldError(value: string, requiredKey: string) {
  const v = normalizeName(value)
  if (!v) return t(requiredKey)
  return isValidName(v) ? '' : t('consent.form.invalid')
}
const firstError = computed(() => (submitted.value ? fieldError(first.value, 'consent.form.requiredFirst') : ''))
const lastError = computed(() => (submitted.value ? fieldError(last.value, 'consent.form.requiredLast') : ''))

function openForm() {
  error.value = ''
  submitted.value = false
  step.value = 'form'
}

async function submit() {
  submitted.value = true
  error.value = ''
  if (firstError.value || lastError.value) return
  const name = { first: normalizeName(first.value), last: normalizeName(last.value) }
  sending.value = true
  try {
    await record(name, 'autorizou', website.value)
    setConsent('yes', name)
    step.value = 'ask'
  } catch (e) {
    console.error('[autorização]', e)
    error.value = t('consent.form.error')
  } finally {
    sending.value = false
  }
}

// "Mudar minha resposta" depois de autorizar registra a revogação na planilha antes de voltar.
async function changeAnswer() {
  error.value = ''
  if (consent.value === 'yes' && consentName.value) {
    sending.value = true
    try {
      await record(consentName.value, 'revogou')
    } catch (e) {
      console.error('[autorização]', e)
      error.value = t('consent.form.error')
      return
    } finally {
      sending.value = false
    }
  }
  first.value = consentName.value?.first ?? first.value
  last.value = consentName.value?.last ?? last.value
  setConsent(null)
  step.value = 'ask'
}

const thanksTitle = computed(() =>
  consentName.value ? t('consent.thanksTitleNamed', { name: consentName.value.first }) : t('consent.thanksTitle')
)

watch(view, async (v) => {
  // A altura da seção muda: recalcula os gatilhos de rolagem abaixo dela.
  setTimeout(() => ScrollTrigger.refresh(), 700)
  if (v === 'form') {
    await nextTick()
    setTimeout(() => firstInput.value?.focus({ preventScroll: true }), 320)
  }
})
</script>

<template>
  <section id="autorizacao" class="bg-ceu-bg px-5 pb-[clamp(64px,8vw,120px)] pt-[clamp(80px,10vw,140px)]">
    <div data-card class="mx-auto flex max-w-[720px] flex-col gap-5 rounded-blob bg-ceu-surface px-[clamp(24px,4vw,56px)] py-[clamp(36px,4vw,56px)]">
      <span class="eyebrow bg-ceu-ink text-ceu-bg">{{ t('consent.badge') }}</span>
      <h2 class="display m-0 text-[clamp(32px,8vw,44px)] leading-[1.05]">{{ t('consent.title') }}</h2>
      <i18n-t keypath="consent.text" tag="p" class="m-0 text-[17px] leading-[1.6] text-sand-800 text-pretty" scope="global">
        <template #handle>
          <a :href="SITE.instagram.url" target="_blank" rel="noopener" class="font-bold text-clay-700">{{ SITE.instagram.handle }}</a>
        </template>
      </i18n-t>

      <AnimatePresence mode="wait" :initial="false">
        <motion.div
          v-if="view === 'ask'"
          key="ask"
          class="mt-1.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-2.5"
          :initial="{ opacity: 0, y: 12 }"
          :animate="enter"
          :exit="leave"
        >
          <button
            v-magnetic="0.15"
            type="button"
            class="min-h-14 cursor-pointer rounded-full border-0 bg-clay-600 font-sans text-lg font-bold text-white transition-colors hover:bg-clay-700 active:bg-clay-800"
            @click="openForm"
          >
            {{ t('consent.yes') }}
          </button>
          <button
            v-magnetic="0.15"
            type="button"
            class="min-h-14 cursor-pointer rounded-full border-2 border-solid border-sand-500 bg-transparent font-sans text-[17px] font-bold text-sand-800 transition-colors hover:bg-sand-300 active:bg-sand-400"
            @click="setConsent('no')"
          >
            {{ t('consent.no') }}
          </button>
        </motion.div>

        <motion.form
          v-else-if="view === 'form'"
          key="form"
          class="mt-1 flex flex-col gap-4"
          novalidate
          :initial="{ opacity: 0, y: 12 }"
          :animate="enter"
          :exit="leave"
          @submit.prevent="submit"
        >
          <p class="m-0 text-base font-semibold text-sand-800">{{ t('consent.form.lead') }}</p>
          <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3">
            <div class="flex flex-col gap-1.5">
              <label for="autorizacao-nome" class="text-sm font-bold text-sand-800">{{ t('consent.form.first') }}</label>
              <input
                id="autorizacao-nome"
                ref="firstInput"
                v-model="first"
                class="field"
                :class="{ 'is-invalid': firstError }"
                type="text"
                name="given-name"
                autocomplete="given-name"
                autocapitalize="words"
                enterkeyhint="next"
                maxlength="60"
                required
                :aria-invalid="!!firstError"
                :aria-describedby="firstError ? 'erro-nome' : undefined"
                :disabled="sending"
              />
              <span v-if="firstError" id="erro-nome" class="text-sm font-semibold text-clay-800">{{ firstError }}</span>
            </div>
            <div class="flex flex-col gap-1.5">
              <label for="autorizacao-sobrenome" class="text-sm font-bold text-sand-800">{{ t('consent.form.last') }}</label>
              <input
                id="autorizacao-sobrenome"
                v-model="last"
                class="field"
                :class="{ 'is-invalid': lastError }"
                type="text"
                name="family-name"
                autocomplete="family-name"
                autocapitalize="words"
                enterkeyhint="send"
                maxlength="60"
                required
                :aria-invalid="!!lastError"
                :aria-describedby="lastError ? 'erro-sobrenome' : undefined"
                :disabled="sending"
              />
              <span v-if="lastError" id="erro-sobrenome" class="text-sm font-semibold text-clay-800">{{ lastError }}</span>
            </div>
          </div>
          <!-- Isca para robôs: invisível para pessoas e leitores de tela -->
          <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] h-px w-px opacity-0" />

          <p v-if="error" class="m-0 rounded-2xl bg-clay-200 px-4 py-3 text-sm font-semibold text-clay-800" role="alert">{{ error }}</p>

          <div class="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2.5">
            <button
              type="submit"
              class="min-h-14 cursor-pointer rounded-full border-0 bg-clay-600 px-4 font-sans text-base font-bold leading-tight text-white sm:flex-1 sm:px-7 sm:text-lg transition-colors hover:bg-clay-700 active:bg-clay-800 disabled:cursor-wait disabled:opacity-70"
              :disabled="sending"
            >
              {{ sending ? t('consent.form.sending') : t('consent.form.submit') }}
            </button>
            <button
              type="button"
              class="min-h-12 cursor-pointer rounded-full border-0 bg-transparent px-5 font-sans text-base font-bold text-sand-700 hover:bg-sand-300 disabled:opacity-50 sm:min-h-14"
              :disabled="sending"
              @click="step = 'ask'"
            >
              {{ t('consent.form.back') }}
            </button>
          </div>
          <p class="m-0 text-[13px] text-sand-700">{{ t('consent.form.note') }}</p>
        </motion.form>

        <motion.div
          v-else-if="view === 'yes'"
          key="yes"
          class="flex flex-col items-center gap-[18px] pt-3 text-center"
          :initial="{ opacity: 0, y: 12 }"
          :animate="enter"
          :exit="leave"
        >
          <ConsentThumb />
          <p class="display m-0 text-[clamp(28px,6vw,34px)] leading-[1.08]">{{ thanksTitle }}</p>
          <i18n-t keypath="consent.thanksText" tag="p" class="m-0 text-[15px] text-sand-700" scope="global">
            <template #handle>
              <a :href="SITE.instagram.url" target="_blank" rel="noopener" class="font-bold text-clay-700">{{ SITE.instagram.handle }}</a>
            </template>
          </i18n-t>
          <p v-if="error" class="m-0 rounded-2xl bg-clay-200 px-4 py-3 text-sm font-semibold text-clay-800" role="alert">{{ error }}</p>
          <button
            type="button"
            class="cursor-pointer border-0 bg-transparent p-2.5 font-sans text-sm text-sand-700 underline underline-offset-[3px] disabled:cursor-wait"
            :disabled="sending"
            @click="changeAnswer"
          >
            {{ sending ? t('consent.form.sending') : t('consent.change') }}
          </button>
        </motion.div>

        <motion.div v-else key="no" class="flex flex-col gap-2.5 pt-1.5" :initial="{ opacity: 0, y: 12 }" :animate="enter" :exit="leave">
          <p class="display m-0 text-[28px] leading-[1.1]">{{ t('consent.declinedTitle') }}</p>
          <p class="m-0 text-base leading-[1.6] text-sand-700">{{ t('consent.declinedText') }}</p>
          <button type="button" class="cursor-pointer self-start border-0 bg-transparent px-0 py-2.5 font-sans text-sm text-sand-700 underline underline-offset-[3px]" @click="changeAnswer">
            {{ t('consent.change') }}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  </section>
</template>

<style scoped>
.field {
  min-height: 52px;
  width: 100%;
  border: 2px solid theme('colors.sand.400');
  border-radius: 16px;
  background: theme('colors.ceu.bg');
  padding: 0 16px;
  font: inherit;
  font-size: 17px; /* 16px ou mais: o iPhone não dá zoom ao focar */
  font-weight: 600;
  color: theme('colors.ceu.ink');
  caret-color: theme('colors.clay.600');
  transition: border-color 0.2s;
}
.field:hover {
  border-color: theme('colors.sand.600');
}
.field:focus-visible {
  outline: none;
  border-color: theme('colors.clay.600');
  box-shadow: 0 0 0 3px color-mix(in srgb, theme('colors.clay.500') 25%, transparent);
}
.field.is-invalid {
  border-color: theme('colors.clay.700');
}
.field:disabled {
  opacity: 0.6;
}
</style>
