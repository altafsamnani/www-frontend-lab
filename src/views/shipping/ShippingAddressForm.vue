<template>
  <RightLayout :title="isEditMode ? $t('shipping.addresses.edit') : $t('shipping.addresses.add')"
    :subtitle="isEditMode ? $t('shipping.addresses.editSubtitle') : $t('shipping.addresses.addSubtitle')">

    <div class="">
      <vee-form class="flex flex-col gap-10" :validation-schema="validationSchema" @submit="handleSubmit">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label for="companyName" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.companyName') }} *
              </label>
              <vee-field as="InputText" name="companyName" id="companyName" class="w-full" v-model="form.companyName" />
              <ErrorMessage class="error text-red-500 text-sm" name="companyName" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="name" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.contactPerson') }}
              </label>
              <vee-field as="InputText" name="name" id="name" class="w-full" v-model="form.name" />
              <ErrorMessage class="error text-red-500 text-sm" name="name" />
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="firstname" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.firstname') }}
              </label>
              <vee-field as="InputText" name="firstname" id="firstname" class="w-full" v-model="form.firstname" />
              <ErrorMessage class="error text-red-500 text-sm" name="firstname" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="lastname" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.lastname') }}
              </label>
              <vee-field as="InputText" name="lastname" id="lastname" class="w-full" v-model="form.lastname" />
              <ErrorMessage class="error text-red-500 text-sm" name="lastname" />
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="country" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.country') }} *
              </label>
              <vee-field name="country" v-model="form.country" v-slot="{ value, setValue }">
                <CountrySelect :model-value="value || 'NL'" @update:model-value="setValue"
                  :placeholder="$t('shipping.addresses.form.selectCountry')"
                  :header-text="$t('shipping.addresses.form.availableCountries')" class="w-full" />
              </vee-field>
              <ErrorMessage class="error text-red-500 text-sm" name="country" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
              <label for="zipcode" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.zipcode') }} *
              </label>
              <vee-field as="InputText" name="zipcode" id="zipcode" class="w-full" v-model="form.zipcode"
                @blur="lookupAddress" />
              <ErrorMessage class="error text-red-500 text-sm" name="zipcode" />
            </div>
            <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
              <label for="number" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.houseNumber') }} *
              </label>
              <vee-field as="InputText" name="number" id="number" class="w-full" v-model="form.number"
                @blur="lookupAddress" />
              <ErrorMessage class="error text-red-500 text-sm" name="number" />
            </div>
            <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
              <label for="numberExt" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.extension') }}
              </label>
              <vee-field as="InputText" name="numberExt" id="numberExt" class="w-full" v-model="form.numberExt" />
              <ErrorMessage class="error text-red-500 text-sm" name="numberExt" />
            </div>
          </div>

          <div v-if="lookupError" class="text-red-500 text-sm">
            {{ lookupError }}
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="street" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.street') }} *
              </label>
              <vee-field as="InputText" name="street" id="street" class="w-full" v-model="form.street"
                :readonly="addressLookupEnabled" />
              <ErrorMessage class="error text-red-500 text-sm" name="street" />
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="city" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.city') }} *
              </label>
              <vee-field as="InputText" name="city" id="city" class="w-full" v-model="form.city"
                :readonly="addressLookupEnabled" />
              <ErrorMessage class="error text-red-500 text-sm" name="city" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="phone" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.phone') }}
              </label>
              <vee-field as="InputText" name="phone" id="phone" class="w-full" v-model="form.phone" />
              <ErrorMessage class="error text-red-500 text-sm" name="phone" />
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="mobile" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('shipping.addresses.form.mobile') }}
              </label>
              <vee-field as="InputText" name="mobile" id="mobile" class="w-full" v-model="form.mobile" />
              <ErrorMessage class="error text-red-500 text-sm" name="mobile" />
            </div>
          </div>

          <!-- Default Address Options -->
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">{{
              $t('shipping.addresses.form.defaultSettings') }}</h3>

            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-2">
                <VCheckbox name="defaultShipping" v-model="form.defaultShipping">
                  {{ $t('shipping.addresses.form.defaultShipping') }}
                </VCheckbox>
              </div>

              <div class="flex flex-col gap-2">
                <VCheckbox name="defaultBilling" v-model="form.defaultBilling">
                  {{ $t('shipping.addresses.form.defaultBilling') }}
                </VCheckbox>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <router-link :to="{ name: 'shipping' }">
            <SecondaryButton>
              {{ $t('common.cancel') }}
            </SecondaryButton>
          </router-link>
          <Button type="submit" :loading="loading">
            {{ isEditMode ? $t('common.update') : $t('common.add') }}
          </Button>
        </div>
      </vee-form>
    </div>

  </RightLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useShippingStore } from '@/stores/shipping'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { useForm } from 'vee-validate'
import Button from '@/volt/Button.vue'
import SecondaryButton from '@/volt/SecondaryButton.vue'
import RightLayout from '@/layouts/RightLayout.vue'
import CountrySelect from '@/components/forms/CountrySelect.vue'
import VCheckbox from '@/components/forms/VCheckbox.vue'
import type { ShippingAddressInput } from '@/types/ShippingAddress'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const shippingStore = useShippingStore()
const notifyStore = useNotifyStore()
const { loading } = storeToRefs(shippingStore)

const isEditMode = computed(() => !!route.params.id)
const addressLookupEnabled = ref(false)

// Validation schema
const validationSchema = reactive({
  companyName: 'required|min:2|max:100',
  name: 'max:100',
  firstname: 'max:50',
  lastname: 'max:50',
  street: 'required|min:2|max:100',
  number: 'required|min:1|max:10',
  numberExt: 'max:10',
  zipcode: 'required|min:4|max:10',
  city: 'required|min:2|max:50',
  country: 'required',
  phone: 'max:20',
  mobile: 'max:20',
  defaultShipping: '',
  defaultBilling: ''
})


// Form data
const form = reactive<ShippingAddressInput>({
  companyName: '',
  name: '',
  firstname: '',
  lastname: '',
  street: '',
  number: '',
  numberExt: '',
  zipcode: '',
  city: '',
  country: 'NL',
  phone: '',
  mobile: '',
  defaultShipping: false,
  defaultBilling: false
})

// Use vee-validate form
const { setValues } = useForm({
  validationSchema,
  initialValues: form
})

const lookupError = ref('')

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const address = await shippingStore.fetchShippingAddress(Number(route.params.id))
      if (address) {
        Object.assign(form, {
          companyName: address.companyName || '',
          name: address.name || '',
          firstname: address.firstname || '',
          lastname: address.lastname || '',
          street: address.street || '',
          number: address.number || '',
          numberExt: address.numberExt || '',
          zipcode: address.zipcode || '',
          city: address.city || '',
          country: address.country || 'NL',
          phone: address.phone || '',
          mobile: address.mobile || '',
          defaultShipping: Boolean(address.defaultShipping),
          defaultBilling: Boolean(address.defaultBilling)
        })
        setValues(form)
      } else {
        notifyStore.notify(
          t('shipping.addresses.messages.loadError'),
          NotificationType.Error
        )
        router.push({ name: 'shipping' })
      }
    } catch (error) {
      notifyStore.notify(
        t('shipping.addresses.messages.loadError'),
        NotificationType.Error
      )
      router.push({ name: 'shipping' })
    }
  }
})

const lookupAddress = async () => {
  lookupError.value = ''
  // Placeholder for address lookup functionality
}

const handleSubmit = async (validatedData: ShippingAddressInput) => {
  try {
    if (isEditMode.value) {
      console.log('Updating address with data:', validatedData)
      await shippingStore.updateAddress(Number(route.params.id), validatedData)
      notifyStore.notify(
        t('shipping.addresses.messages.updateSuccess'),
        NotificationType.Success
      )
    } else {
      await shippingStore.createAddress(validatedData)
      notifyStore.notify(
        t('shipping.addresses.messages.createSuccess'),
        NotificationType.Success
      )
    }
    router.push({ name: 'shipping' })
  } catch (error) {
    notifyStore.notify(
      isEditMode.value ? t('shipping.addresses.messages.updateError') : t('shipping.addresses.messages.createError'),
      NotificationType.Error
    )
  }
}

onUnmounted(() => {
  shippingStore.clearCurrentAddress()
})
</script>