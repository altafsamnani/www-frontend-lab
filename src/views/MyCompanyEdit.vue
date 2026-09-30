<template>
  <RightLayout :title="$t('company.editTitle')" :subtitle="$t('company.editSubtitle')">
    <!-- Loading State -->
    <LoaderForm v-if="loading" :columns="2" :rows="8" />

    <!-- Edit Form -->
    <div v-else-if="company" class="flex flex-col gap-6">
      <!-- Info Banner -->
      <div
        class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
      >
        <div class="flex gap-3">
          <i class="pi pi-info-circle mt-0.5 text-lg text-blue-500"></i>
          <div>
            <p class="font-medium text-blue-800 dark:text-blue-200">
              {{ $t('company.editInfoTitle') }}
            </p>
            <p class="mt-1 text-sm text-blue-600 dark:text-blue-300">
              {{ $t('company.editInfoMessage') }}
            </p>
          </div>
        </div>
      </div>

      <vee-form
        class="flex flex-col gap-8"
        :validation-schema="validationSchema"
        @submit="handleSubmit"
      >
        <!-- Company Details Section -->
        <div class="flex flex-col gap-6">
          <div
            class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
          >
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <i class="pi pi-building text-primary text-lg"></i>
            </div>
            <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
              {{ $t('register.companyDetails') }}
            </h2>
          </div>

          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 flex flex-col gap-2">
              <label for="companyName" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.companyName') }} *
              </label>
              <vee-field
                as="InputText"
                name="companyName"
                id="companyName"
                class="w-full"
                v-model="form.companyName"
              />
              <ErrorMessage class="error text-sm text-red-500" name="companyName" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="kvk" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.kvk') }}
              </label>
              <vee-field
                as="InputText"
                name="kvk"
                id="kvk"
                class="w-full"
                v-model="form.kvk"
                :placeholder="$t('register.kvkPlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="kvk" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="taxId" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.taxId') }}
              </label>
              <vee-field
                as="InputText"
                name="taxId"
                id="taxId"
                class="w-full"
                v-model="form.taxId"
                :placeholder="$t('register.taxIdPlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="taxId" />
            </div>
          </div>
        </div>

        <!-- Contact Details Section -->
        <div class="flex flex-col gap-6">
          <div
            class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
          >
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <i class="pi pi-phone text-primary text-lg"></i>
            </div>
            <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
              {{ $t('company.contactInfo') }}
            </h2>
          </div>

          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="companyEmail" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('register.companyEmail') }} *
              </label>
              <vee-field
                as="InputText"
                name="companyEmail"
                id="companyEmail"
                type="email"
                class="w-full"
                v-model="form.companyEmail"
              />
              <ErrorMessage class="error text-sm text-red-500" name="companyEmail" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-3">
              <label for="phone" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.phone') }}
              </label>
              <vee-field
                as="InputText"
                name="phone"
                id="phone"
                class="w-full"
                v-model="form.phone"
                :placeholder="$t('register.phonePlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="phone" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-3">
              <label for="mobile" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.mobile') }}
              </label>
              <vee-field
                as="InputText"
                name="mobile"
                id="mobile"
                class="w-full"
                v-model="form.mobile"
                :placeholder="$t('register.mobilePlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="mobile" />
            </div>
          </div>
        </div>

        <!-- Address Details Section -->
        <div class="flex flex-col gap-6">
          <div
            class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
          >
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <i class="pi pi-map-marker text-primary text-lg"></i>
            </div>
            <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
              {{ $t('register.addressDetails') }}
            </h2>
          </div>

          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="street" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.street') }} *
              </label>
              <vee-field
                as="InputText"
                name="street"
                id="street"
                class="w-full"
                v-model="form.street"
                :placeholder="$t('register.streetPlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="street" />
            </div>

            <div class="col-span-6 flex flex-col gap-2 md:col-span-3">
              <label for="number" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.number') }} *
              </label>
              <vee-field
                as="InputText"
                name="number"
                id="number"
                class="w-full"
                v-model="form.number"
                :placeholder="$t('register.numberPlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="number" />
            </div>

            <div class="col-span-6 flex flex-col gap-2 md:col-span-3">
              <label for="numberExt" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.numberExt') }}
              </label>
              <vee-field
                as="InputText"
                name="numberExt"
                id="numberExt"
                class="w-full"
                v-model="form.numberExt"
                :placeholder="$t('register.numberExtPlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="numberExt" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
              <label for="zipcode" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.zipcode') }} *
              </label>
              <vee-field
                as="InputText"
                name="zipcode"
                id="zipcode"
                class="w-full"
                v-model="form.zipcode"
                :placeholder="$t('register.zipcodePlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="zipcode" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
              <label for="city" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.city') }} *
              </label>
              <vee-field
                as="InputText"
                name="city"
                id="city"
                class="w-full"
                v-model="form.city"
                :placeholder="$t('register.cityPlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="city" />
            </div>

            <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
              <label for="country" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('companies.country') }} *
              </label>
              <vee-field name="country" v-model="form.country" v-slot="{ value, setValue }">
                <CountrySelect
                  :model-value="value || 'NL'"
                  @update:model-value="setValue"
                  :placeholder="$t('register.countryPlaceholder')"
                  class="w-full"
                />
              </vee-field>
              <ErrorMessage class="error text-sm text-red-500" name="country" />
            </div>
          </div>
        </div>

        <!-- Additional Comments Section -->
        <div class="flex flex-col gap-6">
          <div
            class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
          >
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <i class="pi pi-info-circle text-primary text-lg"></i>
            </div>
            <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
              {{ $t('register.additionalInfo') }}
            </h2>
          </div>

          <div class="flex flex-col gap-2">
            <label for="comments" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('company.changeReason') }}
            </label>
            <vee-field
              as="Textarea"
              name="comments"
              id="comments"
              class="w-full"
              rows="4"
              v-model="form.comments"
              :placeholder="$t('company.changeReasonPlaceholder')"
            />
            <ErrorMessage class="error text-sm text-red-500" name="comments" />
          </div>
        </div>

        <!-- Form Actions -->
        <div
          class="border-surface-200 dark:border-surface-700 flex justify-between gap-4 border-t pt-4"
        >
          <router-link :to="{ name: 'company-view' }">
            <SecondaryButton type="button">
              <i class="pi pi-arrow-left mr-2"></i>
              {{ $t('common.cancel') }}
            </SecondaryButton>
          </router-link>
          <Button type="submit" :loading="submitting">
            <i class="pi pi-send mr-2"></i>
            {{ submitting ? $t('company.submitting') : $t('company.submitRequest') }}
          </Button>
        </div>
      </vee-form>
    </div>

    <!-- No Company State -->
    <div v-else class="py-12 text-center">
      <div
        class="bg-surface-100 dark:bg-surface-800 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
      >
        <i class="pi pi-building text-surface-400 text-3xl"></i>
      </div>
      <h3 class="text-surface-900 dark:text-surface-0 mb-2 text-xl font-semibold">
        {{ $t('company.noCompany') }}
      </h3>
      <p class="text-surface-600 dark:text-surface-400 mb-6">
        {{ $t('company.noCompanyMessage') }}
      </p>
      <router-link :to="{ name: 'Profile' }">
        <Button>
          <i class="pi pi-arrow-left mr-2"></i>
          {{ $t('company.backToProfile') }}
        </Button>
      </router-link>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useRoles } from '@/composables/useRoles'
  import { getMyCompany } from '@/http/profile'
  import { createApplication } from '@/http/applications'
  import type { Company } from '@/types/Company'
  import type { ApplicationInput } from '@/types/Application'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import Button from '@/volt/Button.vue'
  import SecondaryButton from '@/volt/SecondaryButton.vue'
  import CountrySelect from '@/components/forms/CountrySelect.vue'
  import Textarea from 'primevue/textarea'

  const { t } = useI18n()
  const router = useRouter()
  const notifyStore = useNotifyStore()
  const { isManagerOrAdmin } = useRoles()

  const loading = ref(true)
  const submitting = ref(false)
  const company = ref<Company | null>(null)

  // Validation schema
  const validationSchema = reactive({
    companyName: 'required|min:2|max:100',
    kvk: 'max:20',
    taxId: 'max:30',
    companyEmail: 'required|email',
    phone: 'max:20',
    mobile: 'max:20',
    street: 'required|min:2|max:100',
    number: 'required|min:1|max:10',
    numberExt: 'max:10',
    zipcode: 'required|min:4|max:10',
    city: 'required|min:2|max:50',
    country: 'required',
    comments: 'max:1000',
  })

  // Form data
  const form = reactive<ApplicationInput>({
    type: 'edit',
    companyName: '',
    companyEmail: '',
    email: '',
    phone: '',
    mobile: '',
    street: '',
    number: '',
    numberExt: '',
    zipcode: '',
    city: '',
    country: 'NL',
    kvk: '',
    taxId: '',
    comments: '',
  })

  const fetchCompany = async () => {
    loading.value = true
    try {
      const response = await getMyCompany()
      company.value = response.data

      if (company.value) {
        // Pre-fill form with current company data
        form.companyName = company.value.companyName || ''
        form.companyEmail = company.value.email || ''
        form.phone = company.value.phone || ''
        form.mobile = company.value.mobile || ''
        form.street = company.value.street || ''
        form.number = company.value.number || ''
        form.numberExt = company.value.numberExt || ''
        form.zipcode = company.value.zipcode || ''
        form.city = company.value.city || ''
        form.country = company.value.country || 'NL'
        form.kvk = company.value.kvk || ''
        form.taxId = company.value.taxId || ''
      }
    } catch (error) {
      notifyStore.notify(t('company.messages.loadError'), NotificationType.Error)
    } finally {
      loading.value = false
    }
  }

  const handleSubmit = async () => {
    submitting.value = true
    try {
      await createApplication(form)
      notifyStore.notify(t('company.messages.editRequestSuccess'), NotificationType.Success)
      router.push({ name: 'Profile' })
    } catch (error) {
      notifyStore.notify(t('company.messages.editRequestError'), NotificationType.Error)
    } finally {
      submitting.value = false
    }
  }

  onMounted(() => {
    if (!isManagerOrAdmin.value) {
      notifyStore.notify(t('company.messages.notAuthorized'), NotificationType.Error)
      router.push({ name: 'company-view' })
      return
    }
    fetchCompany()
  })
</script>
