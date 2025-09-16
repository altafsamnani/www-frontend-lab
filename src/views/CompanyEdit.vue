<template>
  <RightLayout 
    :title="companyId ? $t('companies.title_edit') : $t('companies.title_create')"
    :subtitle="companyId ? $t('companies.editSubtitle') : $t('companies.createSubtitle')"
  >
    <div v-if="isLoading" class="flex justify-center py-4">
      <LoaderView />
    </div>

    <div v-else>
      <vee-form class="flex flex-col gap-10" :validation-schema="validationSchema" @submit="handleSubmit">
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
              <label for="debnr" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.debnr') }}
              </label>
              <vee-field as="InputText" name="debnr" id="debnr" type="number" class="w-full" v-model="form.debnr" />
              <ErrorMessage class="error text-red-500 text-sm" name="debnr" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="companyName" class="font-medium text-surface-900 dark:text-surface-0">
              {{ $t('companies.companyName') }} *
            </label>
            <vee-field as="InputText" name="companyName" id="companyName" class="w-full" v-model="form.companyName" />
            <ErrorMessage class="error text-red-500 text-sm" name="companyName" />
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="street" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.street') }} *
              </label>
              <vee-field as="InputText" name="street" id="street" class="w-full" v-model="form.street" />
              <ErrorMessage class="error text-red-500 text-sm" name="street" />
            </div>
            <div class="col-span-12 md:col-span-3 flex flex-col gap-2">
              <label for="number" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.number') }} *
              </label>
              <vee-field as="InputText" name="number" id="number" class="w-full" v-model="form.number" />
              <ErrorMessage class="error text-red-500 text-sm" name="number" />
            </div>
            <div class="col-span-12 md:col-span-3 flex flex-col gap-2">
              <label for="numberExt" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.numberExt') }}
              </label>
              <vee-field as="InputText" name="numberExt" id="numberExt" class="w-full" v-model="form.numberExt" />
              <ErrorMessage class="error text-red-500 text-sm" name="numberExt" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
              <label for="zipcode" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.zipcode') }} *
              </label>
              <vee-field as="InputText" name="zipcode" id="zipcode" class="w-full" v-model="form.zipcode" />
              <ErrorMessage class="error text-red-500 text-sm" name="zipcode" />
            </div>
            <div class="col-span-12 md:col-span-8 flex flex-col gap-2">
              <label for="city" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.city') }} *
              </label>
              <vee-field as="InputText" name="city" id="city" class="w-full" v-model="form.city" />
              <ErrorMessage class="error text-red-500 text-sm" name="city" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="country" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.country') }} *
              </label>
              <vee-field as="Select" name="country" id="country" class="w-full" v-model="form.country" 
                :options="countryOptions" option-label="label" option-value="value" 
                :placeholder="$t('companies.select_country')" />
              <ErrorMessage class="error text-red-500 text-sm" name="country" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium text-surface-900 dark:text-surface-0">
              {{ $t('companies.email') }} *
            </label>
            <vee-field as="InputText" name="email" id="email" type="email" class="w-full" v-model="form.email" />
            <ErrorMessage class="error text-red-500 text-sm" name="email" />
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="phone" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.phone') }} *
              </label>
              <vee-field as="InputText" name="phone" id="phone" type="tel" class="w-full" v-model="form.phone" />
              <ErrorMessage class="error text-red-500 text-sm" name="phone" />
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="mobile" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.mobile') }}
              </label>
              <vee-field as="InputText" name="mobile" id="mobile" type="tel" class="w-full" v-model="form.mobile" />
              <ErrorMessage class="error text-red-500 text-sm" name="mobile" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="taxId" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.taxId') }}
              </label>
              <vee-field as="InputText" name="taxId" id="taxId" class="w-full" v-model="form.taxId" placeholder="NL123456789B01" />
              <ErrorMessage class="error text-red-500 text-sm" name="taxId" />
            </div>
            <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label for="kvk" class="font-medium text-surface-900 dark:text-surface-0">
                {{ $t('companies.kvk') }}
              </label>
              <vee-field as="InputText" name="kvk" id="kvk" class="w-full" v-model="form.kvk" />
              <ErrorMessage class="error text-red-500 text-sm" name="kvk" />
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <router-link :to="{ name: 'Companies' }">
            <SecondaryButton>
              {{ $t('common.cancel') }}
            </SecondaryButton>
          </router-link>
          <Button type="submit" :loading="isSubmitting">
            {{ companyId ? $t('common.update') : $t('common.add') }}
          </Button>
        </div>
      </vee-form>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/stores/companies'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import RightLayout from '@/layouts/RightLayout.vue'
import LoaderView from '@/components/icons/LoaderView.vue'
import Button from '@/volt/Button.vue'
import SecondaryButton from '@/volt/SecondaryButton.vue'
import type Company from '@/types/Company'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const companyStore = useCompanyStore()
const notifyStore = useNotifyStore()
const { company } = storeToRefs(companyStore)
const { fetchEditCompany, createCompany, updateCompany } = companyStore

const companyId = computed(() => route.params.id as string | undefined)
const isLoading = ref(true)
const isSubmitting = ref(false)

// Validation schema
const validationSchema = reactive({
  debnr: 'max:6',
  companyName: 'required|min:2|max:100',
  street: 'required|min:2|max:100',
  number: 'required|min:1|max:10',
  numberExt: 'max:10',
  zipcode: 'required|min:4|max:10',
  city: 'required|min:2|max:50',
  country: 'required',
  email: 'required|email',
  phone: 'required|min:10|max:20',
  mobile: 'max:20',
  taxId: 'max:14',
  kvk: 'max:8'
})

// Country options
const countryOptions = [
  { label: 'Netherlands', value: 'NL' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'United Kingdom', value: 'GB' }
]

// Form data
const form = reactive<Company>({
  id: null,
  debnr: 0,
  companyName: '',
  street: '',
  number: '',
  numberExt: '',
  zipcode: '',
  city: '',
  country: 'NL',
  email: '',
  phone: '',
  mobile: '',
  taxId: '',
  kvk: '',
  comments: '',
  created_at: '',
  updatedAt: '',
  deletedAt: ''
})

// Use vee-validate form
const { setValues } = useForm({
  validationSchema,
  initialValues: form
})

onMounted(async () => {
  if (companyId.value) {
    try {
      await fetchEditCompany(companyId.value)
      Object.assign(form, company.value)
      setValues(form)
    } catch (error) {
      notifyStore.notify(
        t('companies.messages.loadError'),
        NotificationType.Error
      )
      router.push({ name: 'Companies' })
    }
  }
  isLoading.value = false
})

const handleSubmit = async (validatedData: Company) => {
  isSubmitting.value = true
  
  try {
    if (companyId.value) {
      await updateCompany(companyId.value, validatedData)
      notifyStore.notify(
        t('companies.messages.updateSuccess'),
        NotificationType.Success
      )
    } else {
      await createCompany(validatedData)
      notifyStore.notify(
        t('companies.messages.createSuccess'),
        NotificationType.Success
      )
    }
    router.push({ name: 'Companies' })
  } catch (error) {
    notifyStore.notify(
      companyId.value ? t('companies.messages.updateError') : t('companies.messages.createError'),
      NotificationType.Error
    )
  } finally {
    isSubmitting.value = false
  }
}
</script>