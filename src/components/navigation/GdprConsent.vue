<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputSwitch from 'primevue/inputswitch'

const { t } = useI18n()

const STORAGE_KEY = 'osec_gdpr_consent'
const EXPIRY_MS = 13 * 30 * 24 * 60 * 60 * 1000 // 13 months

interface ConsentData {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp: number
}

const bannerVisible = ref(false)
const dialogVisible = ref(false)

const preferences = reactive({
  analytics: false,
  marketing: false,
  functional: false
})

function loadConsent(): ConsentData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null

    const parsed = JSON.parse(data) as ConsentData
    if (Date.now() - parsed.timestamp > EXPIRY_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function storeConsent(analytics: boolean, marketing: boolean, functional: boolean) {
  const data: ConsentData = {
    essential: true,
    analytics,
    marketing,
    functional,
    timestamp: Date.now()
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage error
  }
  bannerVisible.value = false
  dialogVisible.value = false
}

function onAcceptAll() {
  storeConsent(true, true, true)
}

function onRejectNonEssential() {
  storeConsent(false, false, false)
}

function onOpenDialog() {
  dialogVisible.value = true
}

function onSavePreferences() {
  storeConsent(preferences.analytics, preferences.marketing, preferences.functional)
}

onMounted(() => {
  const existing = loadConsent()
  if (existing) {
    preferences.analytics = existing.analytics
    preferences.marketing = existing.marketing
    preferences.functional = existing.functional
  } else {
    bannerVisible.value = true
  }
})
</script>

<template>
  <div
    v-if="bannerVisible"
    class="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 shadow-lg p-4"
  >
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-start gap-3">
            <i class="pi pi-shield text-xl text-primary-600"></i>
            <div>
              <h2 class="text-base font-semibold text-surface-900 dark:text-white">
                {{ t('cookies.title') }}
              </h2>
              <p class="mt-1 text-sm text-surface-600 dark:text-surface-400">
                {{ t('cookies.description') }}
                <a
                  href="https://osec.nl/page/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-600 hover:underline font-medium"
                >
                  {{ t('cookies.learnMore') }}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
          <Button
            :label="t('cookies.customize')"
            severity="secondary"
            outlined
            size="small"
            @click="onOpenDialog"
          />
          <Button
            :label="t('cookies.rejectNonEssential')"
            severity="secondary"
            size="small"
            @click="onRejectNonEssential"
          />
          <Button
            :label="t('cookies.acceptAll')"
            severity="primary"
            size="small"
            @click="onAcceptAll"
          />
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="dialogVisible"
    :header="t('cookies.preferencesTitle')"
    modal
    :style="{ width: '32rem' }"
  >
    <div class="flex flex-col gap-4">
      <p class="text-sm text-surface-600 dark:text-surface-400">
        {{ t('cookies.preferencesDescription') }}
      </p>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
          <div class="flex-1 mr-4">
            <h4 class="text-sm font-medium">{{ t('cookies.essential.title') }}</h4>
            <p class="text-xs text-surface-500 mt-1">{{ t('cookies.essential.description') }}</p>
          </div>
          <InputSwitch :model-value="true" disabled />
        </div>

        <div class="flex items-center justify-between p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
          <div class="flex-1 mr-4">
            <h4 class="text-sm font-medium">{{ t('cookies.analytics.title') }}</h4>
            <p class="text-xs text-surface-500 mt-1">{{ t('cookies.analytics.description') }}</p>
          </div>
          <InputSwitch v-model="preferences.analytics" />
        </div>

        <div class="flex items-center justify-between p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
          <div class="flex-1 mr-4">
            <h4 class="text-sm font-medium">{{ t('cookies.marketing.title') }}</h4>
            <p class="text-xs text-surface-500 mt-1">{{ t('cookies.marketing.description') }}</p>
          </div>
          <InputSwitch v-model="preferences.marketing" />
        </div>

        <div class="flex items-center justify-between p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
          <div class="flex-1 mr-4">
            <h4 class="text-sm font-medium">{{ t('cookies.functional.title') }}</h4>
            <p class="text-xs text-surface-500 mt-1">{{ t('cookies.functional.description') }}</p>
          </div>
          <InputSwitch v-model="preferences.functional" />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          :label="t('common.cancel')"
          severity="secondary"
          outlined
          @click="dialogVisible = false"
        />
        <Button
          :label="t('cookies.savePreferences')"
          severity="primary"
          @click="onSavePreferences"
        />
      </div>
    </template>
  </Dialog>
</template>
