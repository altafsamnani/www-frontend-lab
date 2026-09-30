<template>
  <Card>
    <template #title>
      <h3 class="text-lg font-semibold">{{ $t('offers.form.customerInfo') }}</h3>
    </template>
    <template #content>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex flex-col gap-2 md:col-span-2">
          <label for="customerCompany" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerCompany') }}
          </label>
          <vee-field
            as="InputText"
            name="customerCompany"
            id="customerCompany"
            class="w-full"
            maxlength="100"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerCompany" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="customerName" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerName') }}
          </label>
          <vee-field
            as="InputText"
            name="customerName"
            id="customerName"
            class="w-full"
            maxlength="150"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerName" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="customerEmail" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerEmail') }}
          </label>
          <vee-field
            as="InputText"
            name="customerEmail"
            id="customerEmail"
            type="email"
            class="w-full"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerEmail" />
        </div>

        <div class="flex flex-col gap-2 md:col-span-2">
          <label for="customerAddress" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerAddress') }}
          </label>
          <vee-field
            as="InputText"
            name="customerAddress"
            id="customerAddress"
            class="w-full"
            maxlength="75"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerAddress" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="customerZipcode" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerZipcode') }}
          </label>
          <vee-field
            as="InputText"
            name="customerZipcode"
            id="customerZipcode"
            class="w-full"
            maxlength="7"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerZipcode" />
        </div>

        <div class="flex flex-col gap-2">
          <label for="customerCity" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerCity') }}
          </label>
          <vee-field
            as="InputText"
            name="customerCity"
            id="customerCity"
            class="w-full"
            maxlength="75"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerCity" />
        </div>

        <div class="flex flex-col gap-2 md:col-span-2">
          <label for="customerCountry" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('offers.form.customerCountry') }}
          </label>
          <vee-field
            as="InputText"
            name="customerCountry"
            id="customerCountry"
            class="w-full"
            maxlength="75"
          />
          <ErrorMessage class="error text-sm text-red-500" name="customerCountry" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { Field as VeeField, ErrorMessage } from 'vee-validate'
  import Card from 'primevue/card'
</script>
