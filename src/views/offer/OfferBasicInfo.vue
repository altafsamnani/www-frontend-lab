<template>
  <Card>
    <template #title>
      <h3 class="text-lg font-semibold">{{ $t('offers.form.basicInfo') }}</h3>
    </template>
    <template #content>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label for="offerNumber" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.offerNumber') }}
          </label>
          <vee-field
            as="InputText"
            name="offerNumber"
            id="offerNumber"
            class="w-full"
            :placeholder="$t('offers.form.offerNumberPlaceholder')"
            maxlength="30"
          />
          <ErrorMessage class="error text-sm text-red-500" name="offerNumber" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="offerDate" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.date') }} <span class="text-red-500">*</span>
          </label>
          <vee-field name="offerDate" v-slot="{ value, setValue }">
            <DatePicker
              :model-value="value"
              @update:model-value="setValue"
              id="offerDate"
              dateFormat="dd-mm-yy"
              class="w-full"
            />
          </vee-field>
          <ErrorMessage class="error text-sm text-red-500" name="offerDate" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { Field as VeeField, ErrorMessage } from 'vee-validate'
  import Card from 'primevue/card'
  import DatePicker from 'primevue/datepicker'
</script>
