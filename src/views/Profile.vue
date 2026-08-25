<template>
  <RightLayout :title="$t('profile.title')" :subtitle="$t('profile.subtitle')">
    <!-- Loading State -->
    <LoaderForm v-if="loading" :columns="2" :rows="8" />

    <!-- Profile Form -->
    <div v-else-if="profile" class="">
      <vee-form
        class="flex flex-col gap-10"
        :validation-schema="validationSchema"
        @submit="handleSubmit"
      >
        <!-- Personal Information Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('profile.personalInfo') }}
          </h3>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="firstName" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.firstName') }} *
              </label>
              <vee-field
                as="InputText"
                name="firstName"
                id="firstName"
                class="w-full"
                v-model="form.firstName"
              />
              <ErrorMessage class="error text-sm text-red-500" name="firstName" />
            </div>
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="lastName" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.lastName') }} *
              </label>
              <vee-field
                as="InputText"
                name="lastName"
                id="lastName"
                class="w-full"
                v-model="form.lastName"
              />
              <ErrorMessage class="error text-sm text-red-500" name="lastName" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.email') }}
              </label>
              <InputText
                id="email"
                class="bg-surface-100 dark:bg-surface-800 w-full"
                :model-value="profile.email"
                disabled
              />
              <span class="text-surface-500 text-xs">Email cannot be changed</span>
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('profile.contactInfo') }}
          </h3>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
              <label for="countrycode" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.countryCode') }}
              </label>
              <vee-field
                as="InputText"
                name="countrycode"
                id="countrycode"
                class="w-full"
                v-model="form.countrycode"
                placeholder="+31"
              />
              <ErrorMessage class="error text-sm text-red-500" name="countrycode" />
            </div>
            <div class="col-span-12 flex flex-col gap-2 md:col-span-8">
              <label for="mobile" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.mobile') }}
              </label>
              <vee-field
                as="InputText"
                name="mobile"
                id="mobile"
                class="w-full"
                v-model="form.mobile"
                :placeholder="$t('profile.mobilePlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="mobile" />
            </div>
          </div>
        </div>

        <!-- Default Addresses Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('profile.defaultAddresses') }}
          </h3>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label
                for="defaultShippingAddress"
                class="text-surface-900 dark:text-surface-0 font-medium"
              >
                {{ $t('profile.defaultShippingAddress') }}
              </label>
              <vee-field
                name="defaultShippingAddress"
                v-model="form.defaultShippingAddress"
                v-slot="{ value, setValue }"
              >
                <Select
                  :model-value="value"
                  @update:model-value="setValue"
                  :options="addressOptions"
                  optionLabel="label"
                  optionValue="id"
                  :placeholder="$t('profile.selectAddress')"
                  class="w-full"
                  showClear
                />
              </vee-field>
            </div>
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label
                for="defaultBillingAddress"
                class="text-surface-900 dark:text-surface-0 font-medium"
              >
                {{ $t('profile.defaultBillingAddress') }}
              </label>
              <vee-field
                name="defaultBillingAddress"
                v-model="form.defaultBillingAddress"
                v-slot="{ value, setValue }"
              >
                <Select
                  :model-value="value"
                  @update:model-value="setValue"
                  :options="addressOptions"
                  optionLabel="label"
                  optionValue="id"
                  :placeholder="$t('profile.selectAddress')"
                  class="w-full"
                  showClear
                />
              </vee-field>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <router-link :to="{ name: 'addresses' }" class="text-primary text-sm hover:underline">
              <i class="pi pi-map-marker mr-1"></i>
              {{ $t('menu.addresses') }}
            </router-link>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('profile.preferences') }}
          </h3>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="locale" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.locale') }}
              </label>
              <vee-field name="locale" v-model="form.locale" v-slot="{ value, setValue }">
                <Select
                  :model-value="value"
                  @update:model-value="setValue"
                  :options="localeOptions"
                  optionLabel="label"
                  optionValue="value"
                  :placeholder="$t('profile.selectLocale')"
                  class="w-full"
                />
              </vee-field>
              <span class="text-surface-500 text-xs">{{ $t('profile.localeDescription') }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="bg-surface-50 dark:bg-surface-800 flex items-start gap-3 rounded-lg p-4">
              <VCheckbox name="mailing" v-model="form.mailing" />
              <div class="flex flex-col">
                <span class="text-surface-900 dark:text-surface-0 font-medium">{{
                  $t('profile.mailing')
                }}</span>
                <span class="text-surface-500 text-sm">{{ $t('profile.mailingDescription') }}</span>
              </div>
            </div>

            <div class="bg-surface-50 dark:bg-surface-800 flex items-start gap-3 rounded-lg p-4">
              <VCheckbox name="invoiceDownload" v-model="form.invoiceDownload" />
              <div class="flex flex-col">
                <span class="text-surface-900 dark:text-surface-0 font-medium">{{
                  $t('profile.invoiceDownload')
                }}</span>
                <span class="text-surface-500 text-sm">{{
                  $t('profile.invoiceDownloadDescription')
                }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-12 gap-7">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="emailBcc" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.emailBcc') }}
              </label>
              <vee-field
                as="InputText"
                name="emailBcc"
                id="emailBcc"
                class="w-full"
                v-model="form.emailBcc"
                :placeholder="$t('profile.emailBccPlaceholder')"
              />
              <span class="text-surface-500 text-xs">{{ $t('profile.emailBccDescription') }}</span>
            </div>
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="emailOrder" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('profile.emailOrder') }}
              </label>
              <vee-field
                as="InputText"
                name="emailOrder"
                id="emailOrder"
                class="w-full"
                v-model="form.emailOrder"
                :placeholder="$t('profile.emailOrderPlaceholder')"
              />
              <span class="text-surface-500 text-xs">{{
                $t('profile.emailOrderDescription')
              }}</span>
            </div>
          </div>
        </div>

        <!-- Company Information Section (Read-only) -->
        <div v-if="profile.company" class="flex flex-col gap-6">
          <div
            class="border-surface-200 dark:border-surface-700 flex items-center justify-between border-b pb-2"
          >
            <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
              {{ $t('profile.companyInfo') }}
            </h3>
            <div class="flex gap-2">
              <router-link :to="{ name: 'company-view' }">
                <SecondaryButton type="button" size="small">
                  <i class="pi pi-eye mr-1"></i>
                  {{ $t('profile.viewCompany') }}
                </SecondaryButton>
              </router-link>
              <router-link v-if="isManagerOrAdmin" :to="{ name: 'company-edit' }">
                <Button type="button" size="small" severity="secondary">
                  <i class="pi pi-pencil mr-1"></i>
                  {{ $t('profile.editCompany') }}
                </Button>
              </router-link>
            </div>
          </div>

          <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 md:col-span-6">
                <span class="text-surface-500 text-sm">{{ $t('companies.companyName') }}</span>
                <p class="text-surface-900 dark:text-surface-0 font-medium">
                  {{ profile.company.companyName }}
                </p>
              </div>
              <div class="col-span-12 md:col-span-6">
                <span class="text-surface-500 text-sm">{{ $t('companies.debnr') }}</span>
                <p class="text-surface-900 dark:text-surface-0 font-medium">
                  {{ profile.company.debnr || '-' }}
                </p>
              </div>
              <div class="col-span-12">
                <span class="text-surface-500 text-sm">{{ $t('common.address') }}</span>
                <p class="text-surface-900 dark:text-surface-0 font-medium">
                  {{ profile.company.street }} {{ profile.company.number
                  }}{{ profile.company.numberExt ? ` ${profile.company.numberExt}` : '' }}<br />
                  {{ profile.company.zipcode }} {{ profile.company.city }}<br />
                  {{ profile.company.country }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div
          class="border-surface-200 dark:border-surface-700 flex justify-end gap-3 border-t pt-4"
        >
          <Button type="submit" :loading="saving">
            <i class="pi pi-check mr-2"></i>
            {{ $t('common.save') }}
          </Button>
        </div>
      </vee-form>
    </div>

    <!-- Error State -->
    <div v-else class="py-8 text-center">
      <i class="pi pi-exclamation-triangle mb-4 text-4xl text-red-500"></i>
      <p class="text-surface-600 dark:text-surface-400">{{ $t('profile.messages.loadError') }}</p>
      <Button @click="fetchProfile" class="mt-4">
        {{ $t('common.retry') || 'Retry' }}
      </Button>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useForm } from 'vee-validate'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useAuthStore } from '@/stores/auth'
  import { useRoles } from '@/composables/useRoles'
  import { getProfile, updateProfile } from '@/http/profile'
  import { getMyAddresses } from '@/http/addresses'
  import type { UserProfile, UserProfileUpdate } from '@/types/User'
  import type { Address } from '@/types/Address'
  import Button from '@/volt/Button.vue'
  import SecondaryButton from '@/volt/SecondaryButton.vue'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import VCheckbox from '@/components/forms/VCheckbox.vue'
  import InputText from 'primevue/inputtext'
  import Select from 'primevue/select'
  import { getSupportedLocales } from '@/includes/helpers'

  const { t } = useI18n()

  // Locale options for dropdown
  const localeOptions = computed(() => getSupportedLocales(t))
  const notifyStore = useNotifyStore()
  const authStore = useAuthStore()
  const { isManagerOrAdmin } = useRoles()

  const loading = ref(true)
  const saving = ref(false)
  const profile = ref<UserProfile | null>(null)
  const addresses = ref<Address[]>([])

  // Address options for dropdowns
  const addressOptions = computed(() => {
    return addresses.value.map((addr) => ({
      id: addr.id,
      label: `${addr.companyName || ''} - ${addr.street} ${addr.number}, ${addr.city}`,
    }))
  })

  // Validation schema
  const validationSchema = reactive({
    firstName: 'required|min:2|max:50',
    lastName: 'required|min:2|max:50',
    countrycode: 'max:10',
    mobile: 'max:20',
    emailBcc: 'email',
    emailOrder: 'email',
  })

  // Form data
  const form = reactive<UserProfileUpdate>({
    firstName: '',
    lastName: '',
    countrycode: '',
    mobile: '',
    defaultShippingAddress: null,
    defaultBillingAddress: null,
    mailing: false,
    emailBcc: '',
    emailOrder: '',
    invoiceDownload: false,
    locale: 'nl',
  })

  // Use vee-validate form
  const { setValues } = useForm({
    validationSchema,
    initialValues: form,
  })

  const fetchProfile = async () => {
    loading.value = true
    try {
      const [profileRes, addressesRes] = await Promise.all([getProfile(), getMyAddresses()])

      profile.value = profileRes.data
      addresses.value = addressesRes.data || []

      // Populate form with profile data
      if (profile.value) {
        Object.assign(form, {
          firstName: profile.value.firstName || '',
          lastName: profile.value.lastName || '',
          countrycode: profile.value.countrycode || '',
          mobile: profile.value.mobile || '',
          defaultShippingAddress: profile.value.defaultShippingAddress,
          defaultBillingAddress: profile.value.defaultBillingAddress,
          mailing: profile.value.mailing || false,
          emailBcc: profile.value.emailBcc || '',
          emailOrder: profile.value.emailOrder || '',
          invoiceDownload: profile.value.invoiceDownload || false,
          locale: profile.value.locale || 'nl',
        })
        setValues(form)
      }
    } catch (error) {
      notifyStore.notify(t('profile.messages.loadError'), NotificationType.Error)
    } finally {
      loading.value = false
    }
  }

  const handleSubmit = async (validatedData: UserProfileUpdate) => {
    saving.value = true
    try {
      await updateProfile(validatedData)
      notifyStore.notify(t('profile.messages.updateSuccess'), NotificationType.Success)

      // Refresh user data in auth store
      await authStore.fetchUser()
    } catch (error) {
      notifyStore.notify(t('profile.messages.updateError'), NotificationType.Error)
    } finally {
      saving.value = false
    }
  }

  onMounted(() => {
    fetchProfile()
  })
</script>
