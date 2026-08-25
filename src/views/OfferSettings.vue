<template>
  <RightLayout :title="$t('offers.settings.title')" :subtitle="$t('offers.settings.subtitle')">
    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="6" />
    </div>

    <div v-else class="space-y-6">
      <!-- Company Logo Card -->
      <Card>
        <template #title>
          <h3 class="text-lg font-semibold">{{ $t('offers.settings.companyLogo') }}</h3>
        </template>
        <template #content>
          <div class="space-y-4">
            <UploadImage
              :multiple="false"
              :images="settingsData.images || []"
              :type="'offer_settings'"
              :maxFileSize="2500000"
              v-model="formHasChanges"
              @setUploadImages="handleImagesUpdate"
            />
            <small class="text-surface-500 mt-2 block">
              {{ $t('offers.settings.logoHint') }}
            </small>
          </div>
        </template>
      </Card>

      <!-- General Settings Card -->
      <Card>
        <template #title>
          <h3 class="text-lg font-semibold">{{ $t('offers.settings.generalSettings') }}</h3>
        </template>
        <template #content>
          <div class="space-y-4">
            <!-- Checkbox: Hide warranty terms -->
            <div class="flex items-start">
              <Checkbox v-model="settingsData.noWarranty" :binary="true" inputId="noWarranty" />
              <label for="noWarranty" class="ml-2">
                {{ $t('offers.settings.noWarranty') }}
                <small class="text-surface-500 mt-1 block">
                  {{ $t('offers.settings.noWarrantyHint') }}
                </small>
              </label>
            </div>

            <!-- Checkbox: Use own stationery -->
            <div class="flex items-start">
              <Checkbox
                v-model="settingsData.useOwnStationery"
                :binary="true"
                inputId="useOwnStationery"
              />
              <label for="useOwnStationery" class="ml-2">
                {{ $t('offers.settings.useOwnStationery') }}
                <small class="text-surface-500 mt-1 block">
                  {{ $t('offers.settings.useOwnStationeryHint') }}
                </small>
              </label>
            </div>

            <Divider />

            <!-- Paper Margin Settings -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium">
                  {{ $t('offers.settings.headerSize') }}
                </label>
                <InputNumber
                  v-model="settingsData.headerSize"
                  :min="0"
                  :max="200"
                  suffix=" mm"
                  :placeholder="$t('offers.settings.headerSizePlaceholder')"
                  class="w-full"
                />
                <small class="text-surface-500 mt-1 block">
                  {{ $t('offers.settings.headerSizeHint') }}
                </small>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium">
                  {{ $t('offers.settings.leftMargin') }}
                </label>
                <InputNumber
                  v-model="settingsData.leftMargin"
                  :min="0"
                  :max="200"
                  suffix=" mm"
                  :placeholder="$t('offers.settings.leftMarginPlaceholder')"
                  class="w-full"
                />
                <small class="text-surface-500 mt-1 block">
                  {{ $t('offers.settings.leftMarginHint') }}
                </small>
              </div>
            </div>

            <!-- Header visibility toggle -->
            <div class="flex items-start">
              <Checkbox v-model="settingsData.headerNo" :binary="true" inputId="headerNo" />
              <label for="headerNo" class="ml-2">
                {{ $t('offers.settings.disableHeader') }}
                <small class="text-surface-500 mt-1 block">
                  {{ $t('offers.settings.disableHeaderHint') }}
                </small>
              </label>
            </div>
          </div>
        </template>
      </Card>

      <!-- Action Buttons -->
      <div class="flex justify-between gap-3">
        <Button
          type="button"
          @click="router.push({ name: 'MyOffers' })"
          severity="secondary"
          outlined
        >
          <i class="pi pi-arrow-left mr-2"></i>
          {{ $t('common.back') }}
        </Button>
        <div class="flex gap-3">
          <Button
            type="button"
            @click="router.push({ name: 'MyOffers' })"
            severity="secondary"
            :label="$t('common.cancel')"
          />
          <Button @click="handleSubmit" :label="$t('common.save')" :loading="submitting" />
        </div>
      </div>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useOfferStore } from '@/stores/offers'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useI18n } from 'vue-i18n'
  import Card from 'primevue/card'
  import InputNumber from 'primevue/inputnumber'
  import Checkbox from 'primevue/checkbox'
  import Button from 'primevue/button'
  import Divider from 'primevue/divider'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import UploadImage from '@/components/forms/UploadImage.vue'
  import type { OfferSettings } from '@/types/Offer'
  import type Images from '@/types/Images'

  const router = useRouter()
  const offerStore = useOfferStore()
  const notifyStore = useNotifyStore()
  const { t } = useI18n()

  const loading = ref(false)
  const submitting = ref(false)
  const formHasChanges = ref(false)

  const settingsData = ref<OfferSettings>({
    imageCollectionId: undefined,
    images: [],
    noWarranty: false,
    useOwnStationery: false,
    headerNo: false,
    headerSize: 60,
    leftMargin: 20,
  })

  // Compute imageIds from images array
  const imageIds = computed(() => {
    return settingsData.value.images?.map((img) => img.id) || []
  })

  onMounted(async () => {
    loading.value = true
    const settings = await offerStore.fetchSettings()
    if (settings) {
      Object.assign(settingsData.value, settings)
    }
    loading.value = false
  })

  const handleImagesUpdate = (images: Images[]) => {
    settingsData.value.images = images
    formHasChanges.value = true
  }

  const handleSubmit = async () => {
    submitting.value = true

    // Prepare payload with imageIds
    const payload = {
      imageIds: imageIds.value,
      noWarranty: settingsData.value.noWarranty,
      useOwnStationery: settingsData.value.useOwnStationery,
      headerNo: settingsData.value.headerNo,
      headerSize: settingsData.value.headerSize,
      leftMargin: settingsData.value.leftMargin,
    }

    await offerStore.saveSettings(payload)

    notifyStore.notify(t('offers.settings.savedSuccessfully'), NotificationType.Success)
    submitting.value = false
    formHasChanges.value = false
  }
</script>
