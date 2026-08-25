<template>
  <Card>
    <template #title>
      <h3 class="text-lg font-semibold">{{ $t('offers.form.shippingInfo') }}</h3>
    </template>
    <template #content>
      <div class="space-y-4">
        <!-- Checkbox at the top -->
        <div
          class="bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 flex items-center gap-2 rounded-lg border p-3"
        >
          <Checkbox
            v-model="copyFromCustomer"
            @update:model-value="handleCopyToggle"
            :binary="true"
            inputId="sameAsCustomer"
          />
          <label
            for="sameAsCustomer"
            class="text-surface-700 dark:text-surface-300 cursor-pointer text-sm font-medium"
          >
            {{ $t('offers.form.sameAsCustomerAddress') }}
          </label>
        </div>

        <!-- Show shipping form only when checkbox is unchecked -->
        <div v-if="!copyFromCustomer" class="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
          <div class="flex flex-col gap-2 md:col-span-2">
            <label for="shippingCompany" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingCompany') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingCompany"
              id="shippingCompany"
              class="w-full"
              maxlength="100"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingCompany" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="shippingName" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingName') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingName"
              id="shippingName"
              class="w-full"
              maxlength="75"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingName" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="shippingEmail" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingEmail') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingEmail"
              id="shippingEmail"
              type="email"
              class="w-full"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingEmail" />
          </div>

          <div class="flex flex-col gap-2 md:col-span-2">
            <label for="shippingAddress" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingAddress') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingAddress"
              id="shippingAddress"
              class="w-full"
              maxlength="75"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingAddress" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="shippingZipcode" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingZipcode') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingZipcode"
              id="shippingZipcode"
              class="w-full"
              maxlength="7"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingZipcode" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="shippingCity" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingCity') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingCity"
              id="shippingCity"
              class="w-full"
              maxlength="75"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingCity" />
          </div>

          <div class="flex flex-col gap-2 md:col-span-2">
            <label for="shippingCountry" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('offers.form.shippingCountry') }}
            </label>
            <vee-field
              as="InputText"
              name="shippingCountry"
              id="shippingCountry"
              class="w-full"
              maxlength="75"
            />
            <ErrorMessage class="error text-sm text-red-500" name="shippingCountry" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { Field as VeeField, ErrorMessage, useForm } from 'vee-validate'
  import Card from 'primevue/card'
  import Checkbox from 'primevue/checkbox'

  const { setFieldValue, values } = useForm()
  const copyFromCustomer = ref(true)

  // Initialize shipping fields with customer data on mount
  onMounted(() => {
    if (copyFromCustomer.value && setFieldValue && values) {
      const currentValues = values as any
      setFieldValue('shippingCompany', currentValues.customerCompany || '')
      setFieldValue('shippingName', currentValues.customerName || '')
      setFieldValue('shippingEmail', currentValues.customerEmail || '')
      setFieldValue('shippingAddress', currentValues.customerAddress || '')
      setFieldValue('shippingZipcode', currentValues.customerZipcode || '')
      setFieldValue('shippingCity', currentValues.customerCity || '')
      setFieldValue('shippingCountry', currentValues.customerCountry || 'Nederland')
    }
  })

  const handleCopyToggle = (value: boolean) => {
    copyFromCustomer.value = value
    if (value && setFieldValue) {
      const currentValues = values as any
      setFieldValue('shippingCompany', currentValues.customerCompany || '')
      setFieldValue('shippingName', currentValues.customerName || '')
      setFieldValue('shippingEmail', currentValues.customerEmail || '')
      setFieldValue('shippingAddress', currentValues.customerAddress || '')
      setFieldValue('shippingZipcode', currentValues.customerZipcode || '')
      setFieldValue('shippingCity', currentValues.customerCity || '')
      setFieldValue('shippingCountry', currentValues.customerCountry || '')
    } else if (!value && setFieldValue) {
      setFieldValue('shippingCompany', '')
      setFieldValue('shippingName', '')
      setFieldValue('shippingEmail', '')
      setFieldValue('shippingAddress', '')
      setFieldValue('shippingZipcode', '')
      setFieldValue('shippingCity', '')
      setFieldValue('shippingCountry', '')
    }
  }

  // Watch customer fields and auto-update shipping fields when checkbox is checked
  watch(
    () => values,
    (newValues: any) => {
      if (copyFromCustomer.value && setFieldValue) {
        setFieldValue('shippingCompany', newValues.customerCompany || '')
        setFieldValue('shippingName', newValues.customerName || '')
        setFieldValue('shippingEmail', newValues.customerEmail || '')
        setFieldValue('shippingAddress', newValues.customerAddress || '')
        setFieldValue('shippingZipcode', newValues.customerZipcode || '')
        setFieldValue('shippingCity', newValues.customerCity || '')
        setFieldValue('shippingCountry', newValues.customerCountry || '')
      }
    },
    { deep: true }
  )
</script>
