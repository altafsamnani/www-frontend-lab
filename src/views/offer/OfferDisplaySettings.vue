<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-file-pdf text-primary text-xl"></i>
        <h3 class="text-lg font-semibold">{{ $t('offers.form.displaySettings') }}</h3>
      </div>
      <p class="text-surface-500 mt-1 text-sm font-normal">
        {{ $t('offers.form.displaySettingsSubtitle') }}
      </p>
    </template>
    <template #content>
      <div class="space-y-6">
        <!-- PDF Layout Section -->
        <div
          class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
        >
          <div class="mb-3 flex items-start gap-3">
            <i class="pi pi-palette mt-0.5 text-xl text-blue-600 dark:text-blue-400"></i>
            <div class="flex-1">
              <h4 class="text-surface-900 dark:text-surface-0 mb-1 font-semibold">
                {{ $t('offers.form.layout') }}
              </h4>
              <p class="text-surface-600 dark:text-surface-400 mb-3 text-sm">
                {{ $t('offers.form.layoutHint') }}
              </p>
            </div>
          </div>
          <vee-field name="layout" v-slot="{ value, setValue }">
            <Select
              :model-value="value"
              @update:model-value="setValue"
              id="layout"
              :options="layoutOptions"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            />
          </vee-field>
          <ErrorMessage class="error mt-1 text-sm text-red-500" name="layout" />
        </div>

        <!-- Display Options Section -->
        <div class="border-surface-200 dark:border-surface-700 rounded-lg border p-4">
          <h4
            class="text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2 font-semibold"
          >
            <i class="pi pi-eye text-surface-600"></i>
            {{ $t('offers.form.visibilityOptions') }}
          </h4>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <VCheckbox name="showFrontPage" :model-value="true">
              {{ $t('offers.form.includeFrontPage') }}
            </VCheckbox>

            <VCheckbox name="showLastPage" :model-value="true">
              {{ $t('offers.form.includeLastPage') }}
            </VCheckbox>

            <VCheckbox name="hidePricePp" :model-value="true">
              {{ $t('offers.form.hidePricePerPiece') }}
            </VCheckbox>
          </div>
        </div>

        <!-- Divider -->
        <Divider />

        <!-- Content Section -->
        <div>
          <h4
            class="text-surface-900 dark:text-surface-0 mb-4 flex items-center gap-2 font-semibold"
          >
            <i class="pi pi-file-edit text-surface-600"></i>
            {{ $t('offers.form.pdfContent') }}
          </h4>

          <!-- Front Page Subject -->
          <div class="mb-4 flex flex-col gap-2">
            <label for="subject" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.frontPageSubject') }}
            </label>
            <vee-field
              as="InputText"
              name="subject"
              id="subject"
              class="w-full"
              :placeholder="$t('offers.form.frontPageSubjectPlaceholder')"
              maxlength="75"
            />
            <ErrorMessage class="error text-sm text-red-500" name="subject" />
          </div>

          <!-- Text Areas for Front and Last Page -->
          <div class="mb-4 flex flex-col gap-2">
            <label for="frontText" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.frontPageText') }}
            </label>
            <vee-field
              as="Textarea"
              name="frontText"
              id="frontText"
              :placeholder="$t('offers.form.frontPagePlaceholder')"
              rows="4"
              class="w-full"
            />
            <ErrorMessage class="error text-sm text-red-500" name="frontText" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="lastText" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.lastPageText') }}
            </label>
            <vee-field
              as="Textarea"
              name="lastText"
              id="lastText"
              :placeholder="$t('offers.form.lastPagePlaceholder')"
              rows="4"
              class="w-full"
            />
            <ErrorMessage class="error text-sm text-red-500" name="lastText" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { Field as VeeField, ErrorMessage } from 'vee-validate'
  import Card from 'primevue/card'
  import Select from 'primevue/select'
  import Divider from 'primevue/divider'
  import VCheckbox from '@/components/forms/VCheckbox.vue'

  const { t } = useI18n()

  const layoutOptions = computed(() => [
    { label: t('offers.form.layoutExtended'), value: 1 },
    { label: t('offers.form.layoutExtendedNoSub'), value: 4 },
    { label: t('offers.form.layoutCompact'), value: 2 },
    { label: t('offers.form.layoutTotalOnly'), value: 3 },
  ])
</script>
