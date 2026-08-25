<template>
  <div class="bg-surface-100 dark:bg-surface-950 flex min-h-screen flex-col">
    <!-- Branded top bar -->
    <header class="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
      <img src="@/assets/logo.svg" alt="Osec B.V." class="h-8 w-auto dark:hidden" />
      <img src="@/assets/logo_white.png" alt="Osec B.V." class="hidden h-8 w-auto dark:block" />

      <div class="flex items-center gap-1">
        <Button
          icon="pi pi-globe"
          severity="secondary"
          text
          rounded
          size="small"
          :aria-label="$t('languages.' + $i18n.locale)"
          aria-haspopup="true"
          aria-controls="offer_locale_menu"
          @click="toggleLocale"
        />
        <Menu ref="localeMenu" id="offer_locale_menu" :model="localeItems" :popup="true">
          <template #item="{ item }">
            <a
              class="hover:bg-surface-100 dark:hover:bg-surface-800 flex cursor-pointer items-center px-4 py-2"
              @click="handleLocaleClick(item.language)"
            >
              <span :class="{ 'font-semibold': $i18n.locale === item.language }">
                {{ $t('languages.' + item.language) }}
              </span>
            </a>
          </template>
        </Menu>

        <Button
          :icon="theme === 'light' ? 'pi pi-sun' : 'pi pi-moon'"
          severity="secondary"
          text
          rounded
          size="small"
          :aria-label="$t('login.toggle_dark_mode')"
          @click="toggleDarkMode"
        />
      </div>
    </header>

    <!-- Content -->
    <main class="flex flex-1 items-start justify-center px-4 pt-4 pb-12 sm:pt-8">
      <div class="w-full max-w-lg">
        <!-- Loading -->
        <div
          v-if="loading"
          class="border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900 flex flex-col items-center gap-3 rounded-2xl border py-16 shadow-sm"
        >
          <i class="pi pi-spin pi-spinner text-primary text-2xl"></i>
          <p class="text-surface-500">{{ t('rmaOffer.loading') }}</p>
        </div>

        <!-- Not found / invalid link -->
        <div
          v-else-if="!offer"
          class="border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900 rounded-2xl border px-6 py-12 text-center shadow-sm sm:px-8"
        >
          <div
            class="bg-surface-100 dark:bg-surface-800 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          >
            <i class="pi pi-link text-surface-400 text-2xl"></i>
          </div>
          <h1 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
            {{ t('rmaOffer.notFoundTitle') }}
          </h1>
          <p class="text-surface-500 mx-auto mt-2 max-w-sm text-sm">{{ t('rmaOffer.notFound') }}</p>
        </div>

        <!-- Offer -->
        <div
          v-else
          class="border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900 overflow-hidden rounded-2xl border shadow-sm"
        >
          <!-- Card header -->
          <div
            class="border-surface-200 dark:border-surface-700 flex items-start gap-3 border-b px-6 py-5 sm:px-8"
          >
            <div
              class="bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            >
              <i class="pi pi-sync text-lg"></i>
            </div>
            <div>
              <h1 class="text-surface-900 dark:text-surface-0 text-xl font-bold">
                {{ t('rmaOffer.title') }}
              </h1>
              <p class="text-surface-500 mt-0.5 text-sm">
                {{ t('rmaOffer.subtitle', { number: offer.rmaNumber }) }}
              </p>
            </div>
          </div>

          <div class="px-6 py-6 sm:px-8">
            <!-- Product comparison -->
            <div class="space-y-2">
              <div class="border-surface-200 dark:border-surface-700 rounded-xl border p-4">
                <p class="text-surface-400 text-xs font-semibold tracking-wide uppercase">
                  {{ t('rmaOffer.original') }}
                </p>
                <p class="text-surface-700 dark:text-surface-200 mt-1 font-medium">
                  {{ offer.article || '—' }}
                </p>
              </div>

              <div class="flex justify-center">
                <span
                  class="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-full"
                >
                  <i class="pi pi-arrow-down text-xs"></i>
                </span>
              </div>

              <div class="border-primary/30 bg-primary/5 rounded-xl border p-4">
                <p class="text-primary text-xs font-semibold tracking-wide uppercase">
                  {{ t('rmaOffer.replacement') }}
                </p>
                <p class="text-surface-900 dark:text-surface-0 mt-1 font-semibold">
                  {{ offer.replacementName }}
                </p>
                <p class="text-surface-500 text-sm">{{ offer.replacementArticle }}</p>

                <div
                  class="border-primary/20 mt-4 flex items-end justify-between gap-4 border-t pt-4"
                >
                  <div>
                    <p class="text-surface-500 text-xs">{{ t('rmaOffer.quantity') }}</p>
                    <p class="text-surface-800 dark:text-surface-100 mt-0.5 font-medium">
                      {{ offer.quantity }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-surface-500 text-xs">{{ t('rmaOffer.price') }}</p>
                    <p class="text-primary mt-0.5 text-2xl leading-none font-bold">
                      {{ offer.offerPrice ? '€ ' + offer.offerPrice : '—' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirmation (already responded or just submitted) -->
            <Message
              v-if="offer.responded || submitted"
              :severity="effectiveChoice === 'accepted' ? 'success' : 'info'"
              :closable="false"
              icon="pi pi-check-circle"
              class="mt-6"
            >
              {{
                effectiveChoice === 'accepted'
                  ? t('rmaOffer.thanksAccepted')
                  : t('rmaOffer.thanksDeclined')
              }}
            </Message>

            <!-- Decision form -->
            <form v-else class="mt-6 space-y-5" @submit.prevent="submit">
              <p class="text-surface-900 dark:text-surface-0 font-medium">
                {{ t('rmaOffer.question') }}
              </p>

              <div class="space-y-3">
                <label
                  class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors"
                  :class="
                    choice === 'accepted'
                      ? 'border-primary bg-primary/5 ring-primary ring-1'
                      : 'border-surface-200 hover:border-surface-300 dark:border-surface-700 dark:hover:border-surface-600'
                  "
                >
                  <RadioButton v-model="choice" inputId="accept" value="accepted" class="mt-0.5" />
                  <span class="flex flex-col">
                    <span class="text-surface-900 dark:text-surface-0 font-medium">{{
                      t('rmaOffer.accept')
                    }}</span>
                    <span class="text-surface-500 mt-0.5 text-sm">{{
                      t('rmaOffer.acceptHint')
                    }}</span>
                  </span>
                </label>

                <label
                  class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors"
                  :class="
                    choice === 'declined'
                      ? 'border-primary bg-primary/5 ring-primary ring-1'
                      : 'border-surface-200 hover:border-surface-300 dark:border-surface-700 dark:hover:border-surface-600'
                  "
                >
                  <RadioButton v-model="choice" inputId="decline" value="declined" class="mt-0.5" />
                  <span class="flex flex-col">
                    <span class="text-surface-900 dark:text-surface-0 font-medium">{{
                      t('rmaOffer.decline')
                    }}</span>
                    <span class="text-surface-500 mt-0.5 text-sm">{{
                      t('rmaOffer.declineHint')
                    }}</span>
                  </span>
                </label>
              </div>

              <!-- Return option (only when declining) -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out overflow-hidden"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-24 opacity-100"
                leave-active-class="transition-all duration-200 ease-in overflow-hidden"
                leave-from-class="max-h-24 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <label
                  v-if="choice === 'declined'"
                  class="bg-surface-100 dark:bg-surface-800 flex cursor-pointer items-start gap-3 rounded-lg p-3"
                >
                  <Checkbox
                    v-model="wantsReturn"
                    inputId="wantsReturn"
                    :binary="true"
                    class="mt-0.5"
                  />
                  <span class="text-surface-600 dark:text-surface-300 text-sm">{{
                    t('rmaOffer.wantsReturn')
                  }}</span>
                </label>
              </Transition>

              <div class="flex flex-col gap-1.5">
                <label for="ref" class="text-surface-700 dark:text-surface-200 text-sm font-medium">
                  {{ t('rmaOffer.reference') }}
                </label>
                <InputText
                  id="ref"
                  v-model="customerRef"
                  class="w-full"
                  :placeholder="t('rmaOffer.referencePlaceholder')"
                />
              </div>

              <Button
                type="submit"
                :label="t('rmaOffer.submit')"
                :loading="saving"
                :disabled="!choice"
                fluid
                size="large"
              />
            </form>
          </div>
        </div>

        <!-- Footer note -->
        <p class="text-surface-400 mt-6 text-center text-xs">{{ t('rmaOffer.footer') }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { setI18nLanguage } from '@/i18n'
  import { getSupportedLocales } from '@/includes/helpers'
  import { useRmaOfferStore } from '@/stores/rmaOffers'
  import Button from '@/volt/Button.vue'
  import Message from '@/volt/Message.vue'
  import Menu from 'primevue/menu'
  import RadioButton from 'primevue/radiobutton'
  import Checkbox from 'primevue/checkbox'
  import InputText from 'primevue/inputtext'

  interface PublicOffer {
    rmaNumber: string
    article: string | null
    replacementArticle: string | null
    replacementName: string | null
    quantity: number
    offerPrice: string | null
    status: string
    responded: boolean
  }

  const route = useRoute()
  const { t } = useI18n()
  const offerStore = useRmaOfferStore()

  const token = String(route.params.token || '')
  const loading = ref(true)
  const saving = ref(false)
  const submitted = ref(false)
  const choice = ref<'accepted' | 'declined' | null>(null)
  const wantsReturn = ref(false)
  const customerRef = ref('')

  const offer = ref<PublicOffer | null>(null)
  const effectiveChoice = ref<string | null>(null)

  const submit = async () => {
    if (!choice.value) return
    saving.value = true
    await offerStore.respond(token, {
      choice: choice.value,
      customerRef: customerRef.value || null,
      wantsReturn: choice.value === 'declined' ? wantsReturn.value : false,
    })
    effectiveChoice.value = choice.value
    submitted.value = true
    saving.value = false
  }

  // Theme handling (standalone public page — apply persisted preference)
  const theme = ref('light')

  const applyTheme = (value: string) => {
    document.querySelector('html')?.setAttribute('data-theme', value)
    document.querySelector('html')?.setAttribute('class', value)
  }

  const toggleDarkMode = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    applyTheme(theme.value)
  }

  // Locale handling
  const localeMenu = ref()
  const localeItems = ref(getSupportedLocales(t))

  const toggleLocale = (event: Event) => {
    localeMenu.value.toggle(event)
  }

  const handleLocaleClick = (selectedLocale: string) => {
    setI18nLanguage(selectedLocale)
  }

  onMounted(async () => {
    theme.value =
      !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : localStorage.getItem('theme') || 'light'
    applyTheme(theme.value)

    try {
      await offerStore.fetchOffer(token)
      offer.value = offerStore.offer
      if (offer.value) {
        effectiveChoice.value = offer.value.status
      }
    } catch {
      // Invalid or expired link — the not-found state handles this gracefully.
      offer.value = null
    } finally {
      loading.value = false
    }
  })
</script>
