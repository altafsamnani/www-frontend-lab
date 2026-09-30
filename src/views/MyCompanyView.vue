<template>
  <RightLayout :title="$t('company.viewTitle')" :subtitle="$t('company.viewSubtitle')">
    <!-- Loading State -->
    <LoaderForm v-if="loading" :columns="2" :rows="6" />

    <!-- Company Information -->
    <div v-else-if="company" class="flex flex-col gap-8">
      <!-- Company Header -->
      <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-6">
        <div class="flex items-start gap-4">
          <div
            class="bg-primary/10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
          >
            <i class="pi pi-building text-primary text-2xl"></i>
          </div>
          <div class="flex-1">
            <h2 class="text-surface-900 dark:text-surface-0 text-2xl font-bold">
              {{ company.companyName }}
            </h2>
            <p v-if="company.debnr" class="text-surface-500 mt-1">
              {{ $t('companies.debnr') }}: {{ company.debnr }}
            </p>
          </div>
          <router-link v-if="isManagerOrAdmin" :to="{ name: 'company-edit' }">
            <Button type="button" size="small">
              <i class="pi pi-pencil mr-2"></i>
              {{ $t('common.edit') }}
            </Button>
          </router-link>
        </div>
      </div>

      <!-- Address Information -->
      <div class="flex flex-col gap-4">
        <h3
          class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
        >
          <i class="pi pi-map-marker text-primary mr-2"></i>
          {{ $t('company.addressInfo') }}
        </h3>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-6">
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
              <span class="text-surface-500 text-sm">{{ $t('common.address') }}</span>
              <p class="text-surface-900 dark:text-surface-0 mt-1 font-medium">
                {{ company.street }} {{ company.number
                }}{{ company.numberExt ? ` ${company.numberExt}` : '' }}<br />
                {{ company.zipcode }} {{ company.city }}<br />
                {{ getCountryName(company.country) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="flex flex-col gap-4">
        <h3
          class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
        >
          <i class="pi pi-phone text-primary mr-2"></i>
          {{ $t('company.contactInfo') }}
        </h3>
        <div class="grid grid-cols-12 gap-6">
          <div v-if="company.email" class="col-span-12 md:col-span-6">
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
              <span class="text-surface-500 text-sm">{{ $t('companies.email') }}</span>
              <p class="text-surface-900 dark:text-surface-0 mt-1 font-medium">
                <a :href="`mailto:${company.email}`" class="text-primary hover:underline">
                  {{ company.email }}
                </a>
              </p>
            </div>
          </div>
          <div v-if="company.phone" class="col-span-12 md:col-span-3">
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
              <span class="text-surface-500 text-sm">{{ $t('companies.phone') }}</span>
              <p class="text-surface-900 dark:text-surface-0 mt-1 font-medium">
                <a :href="`tel:${company.phone}`" class="text-primary hover:underline">
                  {{ company.phone }}
                </a>
              </p>
            </div>
          </div>
          <div v-if="company.mobile" class="col-span-12 md:col-span-3">
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
              <span class="text-surface-500 text-sm">{{ $t('companies.mobile') }}</span>
              <p class="text-surface-900 dark:text-surface-0 mt-1 font-medium">
                <a :href="`tel:${company.mobile}`" class="text-primary hover:underline">
                  {{ company.mobile }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Information -->
      <div v-if="company.kvk || company.taxId" class="flex flex-col gap-4">
        <h3
          class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
        >
          <i class="pi pi-briefcase text-primary mr-2"></i>
          {{ $t('company.businessInfo') }}
        </h3>
        <div class="grid grid-cols-12 gap-6">
          <div v-if="company.kvk" class="col-span-12 md:col-span-6">
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
              <span class="text-surface-500 text-sm">{{ $t('companies.kvk') }}</span>
              <p class="text-surface-900 dark:text-surface-0 mt-1 font-medium">{{ company.kvk }}</p>
            </div>
          </div>
          <div v-if="company.taxId" class="col-span-12 md:col-span-6">
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
              <span class="text-surface-500 text-sm">{{ $t('companies.taxId') }}</span>
              <p class="text-surface-900 dark:text-surface-0 mt-1 font-medium">
                {{ company.taxId }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="border-surface-200 dark:border-surface-700 flex justify-start border-t pt-4">
        <router-link :to="{ name: 'Profile' }">
          <SecondaryButton>
            <i class="pi pi-arrow-left mr-2"></i>
            {{ $t('company.backToProfile') }}
          </SecondaryButton>
        </router-link>
      </div>
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
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useRoles } from '@/composables/useRoles'
  import { getMyCompany } from '@/http/profile'
  import type { Company } from '@/types/Company'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import Button from '@/volt/Button.vue'
  import SecondaryButton from '@/volt/SecondaryButton.vue'

  const { t } = useI18n()
  const notifyStore = useNotifyStore()
  const { isManagerOrAdmin } = useRoles()

  const loading = ref(true)
  const company = ref<Company | null>(null)

  // Country name mapping
  const countryNames: Record<string, string> = {
    NL: 'Netherlands',
    BE: 'Belgium',
    DE: 'Germany',
    FR: 'France',
    GB: 'United Kingdom',
    LU: 'Luxembourg',
    AT: 'Austria',
    CH: 'Switzerland',
  }

  const getCountryName = (code: string): string => {
    return countryNames[code] || code
  }

  const fetchCompany = async () => {
    loading.value = true
    try {
      const response = await getMyCompany()
      company.value = response.data
    } catch (error) {
      notifyStore.notify(t('company.messages.loadError'), NotificationType.Error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchCompany()
  })
</script>
