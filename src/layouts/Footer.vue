<template>
  <footer class="bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700">
    <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div class="flex items-center gap-2">
            <i class="pi pi-shield text-primary-600 dark:text-primary-400"></i>
            <span class="text-sm font-medium text-surface-700 dark:text-surface-300">
              {{ t('footer.securityWholesaler') }}
            </span>
          </div>
          <nav class="flex flex-wrap gap-4 md:gap-6" aria-label="Footer navigation">
            <a
              href="https://osec.nl/algemene-voorwaarden.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {{ t('footer.termsAndConditions') }}
            </a>
            <a
              href="https://osec.nl/page/privacy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {{ t('footer.privacyStatement') }}
            </a>
          </nav>
        </div>
        <div class="mt-6 md:mt-0">
          <p class="text-sm text-surface-500 dark:text-surface-400">
            &copy; {{ currentYear }} Osec B.V. {{ t('footer.allRightsReserved') }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const currentYear = computed(() => new Date().getFullYear())
</script>
