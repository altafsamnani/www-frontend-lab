<template>
  <RightLayout
    :title="isEditMode ? $t('offers.editOffer') : $t('offers.createOffer')"
    :subtitle="$t('offers.subtitle')"
  >
    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="10" />
    </div>

    <div v-else class="space-y-6">
      <!-- Stepper -->
      <Card>
        <template #content>
          <Stepper v-model:value="currentStep" linear>
            <StepList>
              <Step value="1">{{ $t('offers.steps.offerDetails') }}</Step>
              <Step value="2">{{ $t('offers.steps.items') }}</Step>
              <Step value="3">{{ $t('offers.steps.review') }}</Step>
            </StepList>

            <StepPanels>
              <!-- Step 1: Basic Information, Customer Info, Display Settings -->
              <StepPanel value="1">
                <vee-form
                  @submit="saveBasicInfo"
                  :validation-schema="validationSchema"
                  :initial-values="formData"
                  class="space-y-6"
                >
                  <!-- Basic Information -->
                  <OfferBasicInfo />

                  <!-- Customer Information -->
                  <OfferCustomerInfo />

                  <!-- Shipping Information -->
                  <OfferShippingInfo />

                  <!-- Display Settings -->
                  <OfferDisplaySettings />

                  <!-- Navigation Buttons -->
                  <div class="flex justify-between">
                    <Button
                      type="button"
                      @click="router.push({ name: 'MyOffers' })"
                      severity="secondary"
                      :label="$t('common.cancel')"
                    />
                    <div class="flex gap-3">
                      <Button
                        v-if="offerHash && offerStore.currentOfferItems.length > 0"
                        type="button"
                        @click="viewPDF"
                        severity="info"
                        :label="$t('offers.viewPDF')"
                        icon="pi pi-eye"
                        outlined
                      />
                      <Button
                        v-if="offerHash && offerStore.currentOfferItems.length > 0"
                        type="button"
                        @click="downloadPDF"
                        severity="info"
                        :label="$t('offers.downloadPDF')"
                        icon="pi pi-download"
                        outlined
                      />
                      <Button
                        type="submit"
                        :label="$t('offers.form.saveAndContinue')"
                        :loading="submitting"
                        icon="pi pi-arrow-right"
                        iconPos="right"
                      />
                    </div>
                  </div>
                </vee-form>
              </StepPanel>

              <!-- Step 2: Add Items -->
              <StepPanel value="2">
                <OfferItems
                  :items="offerStore.currentOfferItems"
                  :items-loading="offerStore.itemsLoading"
                  :order-discount="formData.orderDiscount"
                  @update:order-discount="handleOrderDiscountUpdate"
                  :offer-hash="offerHash"
                  @add-item="handleSaveItem"
                  @edit-item="handleSaveItem"
                  @delete-item="handleDeleteItem"
                  @add-favorites="showFavoritesDialog = true"
                  @view-pdf="viewPDF"
                  @download-pdf="downloadPDF"
                  @back="currentStep = '1'"
                  @next="proceedToReview"
                />
              </StepPanel>

              <!-- Step 3: Review & Submit -->
              <StepPanel value="3">
                <OfferReview
                  :customer-info="customerInfo"
                  :subtotal="subtotal"
                  :order-discount="formData.orderDiscount"
                  :total="total"
                  :total-items="totalItems"
                  :offer-hash="offerHash"
                  :offer-saved="offerSaved"
                  :submitting="submitting"
                  :offer-items="offerStore.currentOfferItems"
                  :has-valid-email="hasValidEmail"
                  @back="currentStep = '2'"
                  @view-pdf="viewPDF"
                  @download-pdf="downloadPDF"
                  @save-draft="handleSubmit(false)"
                  @save-send="handleSubmit(true)"
                  @back-to-list="router.push({ name: 'MyOffers' })"
                />
              </StepPanel>
            </StepPanels>
          </Stepper>
        </template>
      </Card>
    </div>

    <Dialog
      v-model:visible="showFavoritesDialog"
      :header="$t('offers.form.selectFavorites')"
      :modal="true"
      :style="{ width: '900px' }"
      :breakpoints="{ '960px': '95vw' }"
    >
      <div v-if="favouritesLoading" class="flex justify-center py-4">
        <i class="pi pi-spinner pi-spin text-primary text-4xl"></i>
      </div>

      <div v-else-if="favourites.length === 0" class="py-8 text-center">
        <i class="pi pi-heart text-surface-300 dark:text-surface-600 mb-4 text-6xl"></i>
        <p class="text-surface-500 dark:text-surface-400 mb-4 text-lg">
          {{ $t('favourites.noFavourites') }}
        </p>
        <p class="text-surface-400 text-sm">{{ $t('offers.form.favoritesDialogHint') }}</p>
      </div>

      <div v-else>
        <p class="text-surface-500 mb-4">{{ $t('offers.form.favoritesDialogHint') }}</p>
        <DataTable
          :value="favourites"
          v-model:selection="selectedFavourites"
          dataKey="id"
          :paginator="favourites.length > 10"
          :rows="10"
          class="p-datatable-sm"
          :rowsPerPageOptions="[10, 20, 50]"
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem" :exportable="false"></Column>

          <Column :exportable="false" style="width: 80px">
            <template #body="slotProps">
              <img
                v-if="slotProps.data.thumbnail"
                :src="slotProps.data.thumbnail"
                :alt="slotProps.data.name"
                class="h-16 w-16 rounded object-contain"
              />
              <div
                v-else
                class="bg-surface-100 dark:bg-surface-800 flex h-16 w-16 items-center justify-center rounded"
              >
                <i class="pi pi-image text-surface-400 text-xl"></i>
              </div>
            </template>
          </Column>

          <Column
            field="articleNr"
            :header="$t('favourites.articleNumber')"
            :sortable="true"
            style="width: 120px"
          >
            <template #body="slotProps">
              <span class="font-mono text-sm">{{ slotProps.data.articleNr || '-' }}</span>
            </template>
          </Column>

          <Column field="name" :header="$t('favourites.productName')" :sortable="true">
            <template #body="slotProps">
              <span class="font-medium">{{ slotProps.data.name }}</span>
            </template>
          </Column>

          <Column
            field="price"
            :header="$t('offers.items.price')"
            :sortable="true"
            style="width: 120px"
            class="text-right"
          >
            <template #body="slotProps">
              <span class="text-sm">€{{ formatFavouritePrice(slotProps.data.price) }}</span>
            </template>
          </Column>
        </DataTable>
      </div>

      <template #footer>
        <Button
          :label="$t('common.cancel')"
          @click="showFavoritesDialog = false"
          severity="secondary"
        />
        <Button
          :label="$t('common.add')"
          @click="addFavoritesItems"
          :disabled="selectedFavourites.length === 0"
        />
      </template>
    </Dialog>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useOfferStore } from '@/stores/offers'
  import { useFavouritesStore } from '@/stores/favourites'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useI18n } from 'vue-i18n'
  import { Form as VeeForm } from 'vee-validate'
  import Card from 'primevue/card'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Stepper from 'primevue/stepper'
  import StepList from 'primevue/steplist'
  import Step from 'primevue/step'
  import StepPanels from 'primevue/steppanels'
  import StepPanel from 'primevue/steppanel'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import OfferBasicInfo from './OfferBasicInfo.vue'
  import OfferCustomerInfo from './OfferCustomerInfo.vue'
  import OfferShippingInfo from './OfferShippingInfo.vue'
  import OfferDisplaySettings from './OfferDisplaySettings.vue'
  import OfferItems from './OfferItems.vue'
  import OfferReview from './OfferReview.vue'
  import type { Favourite } from '@/types/Favourite'

  const router = useRouter()
  const route = useRoute()
  const offerStore = useOfferStore()
  const favouritesStore = useFavouritesStore()
  const notifyStore = useNotifyStore()
  const { t } = useI18n()

  const loading = ref(false)
  const submitting = ref(false)
  const currentStep = ref('1')
  const showFavoritesDialog = ref(false)
  const currentOfferId = ref<number | null>(null)
  const offerHash = ref<string | null>(null)
  const offerSaved = ref<boolean>(false)
  const isEditMode = computed(() => !!route.params.id)

  // Favourites state
  const favourites = ref<Favourite[]>([])
  const selectedFavourites = ref<Favourite[]>([])
  const favouritesLoading = ref(false)

  // Validation schema for VeeValidate
  const validationSchema = {
    // Basic Information
    offerNumber: 'max:30',
    subject: 'max:75',
    offerDate: 'required',
    layout: 'required|integer|min_value:1|max_value:4',

    // Customer Information - at least company name or contact name required
    customerCompany: 'max:100|min:2',
    customerName: 'max:150|min:2',
    customerEmail: 'email|max:255',
    customerAddress: 'max:75',
    customerZipcode: 'max:7|alpha_num',
    customerCity: 'max:75|min:2|alpha_spaces',
    customerCountry: 'max:75|min:2|alpha_spaces',

    // Shipping Information
    shippingCompany: 'max:100|min:2',
    shippingName: 'max:75|min:2',
    shippingEmail: 'email|max:255',
    shippingAddress: 'max:75',
    shippingZipcode: 'max:7|alpha_num',
    shippingCity: 'max:75|min:2|alpha_spaces',
    shippingCountry: 'max:75|min:2|alpha_spaces',

    // Front Text and Last Text
    frontText: 'max:5000',
    lastText: 'max:5000',

    // Display Settings
    showFrontPage: '',
    showLastPage: '',
    hidePricePp: '',
  }

  const formData = ref({
    status: 1,
    offerNumber: '',
    subject: '',
    offerDate: new Date(),
    frontText: '',
    lastText: '',
    orderDiscount: 0,
    layout: 1,
    hidePricePp: true,
    customerCompany: '',
    customerName: '',
    customerAddress: '',
    customerZipcode: '',
    customerCity: '',
    customerCountry: 'Nederland',
    customerEmail: '',
    shippingCompany: '',
    shippingName: '',
    shippingEmail: '',
    shippingAddress: '',
    shippingZipcode: '',
    shippingCity: '',
    shippingCountry: 'Nederland',
    showFrontPage: true,
    showLastPage: true,
  })

  const customerInfo = computed(() => ({
    customerCompany: formData.value.customerCompany,
    customerName: formData.value.customerName,
    customerAddress: formData.value.customerAddress,
    customerZipcode: formData.value.customerZipcode,
    customerCity: formData.value.customerCity,
    customerEmail: formData.value.customerEmail,
  }))

  const subtotal = computed(() => {
    return offerStore.currentOfferItems.reduce((sum, item) => sum + (item.total || 0), 0)
  })

  const total = computed(() => {
    const discount = (subtotal.value * formData.value.orderDiscount) / 100
    return subtotal.value - discount
  })

  const totalItems = computed(() => {
    return offerStore.currentOfferItems.reduce((sum, item) => sum + item.items, 0)
  })

  const hasValidEmail = computed(() => {
    return !!(formData.value.customerEmail && formData.value.customerEmail.trim().length > 0)
  })

  const showSendConfirmDialog = ref(false)

  onMounted(async () => {
    if (isEditMode.value) {
      loading.value = true
      const offer = await offerStore.fetchOfferById(Number(route.params.id))
      currentOfferId.value = Number(route.params.id)
      offerHash.value = offer.hash || null

      // Convert offerDate string to Date object for DatePicker
      if (offer.offerDate) {
        offer.offerDate = new Date(offer.offerDate) as any
      }

      Object.assign(formData.value, offer)
      // Load items for edit mode
      await offerStore.fetchOfferItems(currentOfferId.value)
      loading.value = false
    }
  })

  const saveBasicInfo = async (values: any) => {
    submitting.value = true
    // Preserve orderDiscount value (from Step 2) before merging
    const currentOrderDiscount = formData.value.orderDiscount
    // Merge validated form values with formData
    Object.assign(formData.value, values)
    // Restore orderDiscount to prevent overwriting with stale value from validation
    formData.value.orderDiscount = currentOrderDiscount

    // Convert Date object to ISO string format for API
    const payload = { ...formData.value }
    if (payload.offerDate instanceof Date) {
      payload.offerDate = payload.offerDate.toISOString().split('T')[0] as any
    }

    // Save basic information via API
    let offer
    if (isEditMode.value) {
      offer = await offerStore.updateExistingOffer(Number(route.params.id), payload)
      currentOfferId.value = Number(route.params.id)
    } else {
      offer = await offerStore.createNewOffer(payload)
      currentOfferId.value = Number(offer.id)
    }

    notifyStore.notify(t('offers.basicInfoSaved'), NotificationType.Success)

    // Load items for the offer
    if (currentOfferId.value) {
      await offerStore.fetchOfferItems(currentOfferId.value)
    }

    // Move to next step
    currentStep.value = '2'
    submitting.value = false
  }

  const handleSaveItem = async (itemData: any) => {
    if (!currentOfferId.value) {
      notifyStore.notify('Please save offer details first', NotificationType.Error)
      return
    }

    let notificationKey = 'offers.items.added'

    if (itemData.id) {
      await offerStore.modifyOfferItem(currentOfferId.value, Number(itemData.id), itemData)
      notificationKey = 'offers.items.updated'
    } else if (itemData.productId) {
      const existingItem = offerStore.currentOfferItems.find(
        (item) => item.productId === itemData.productId
      )

      if (existingItem && existingItem.id) {
        const updatedQuantity = (existingItem.quantity || 0) + (itemData.quantity || 1)
        await offerStore.modifyOfferItem(currentOfferId.value, Number(existingItem.id), {
          ...itemData,
          quantity: updatedQuantity,
        })
        notificationKey = 'offers.items.quantityIncreased'
      } else {
        await offerStore.addOfferItem(currentOfferId.value, itemData)
      }
    } else {
      await offerStore.addOfferItem(currentOfferId.value, itemData)
    }

    await offerStore.fetchOfferItems(currentOfferId.value)
    notifyStore.notify(t(notificationKey), NotificationType.Success)
  }

  const handleDeleteItem = async (item: any) => {
    if (!currentOfferId.value || !item?.id) return

    await offerStore.removeOfferItem(currentOfferId.value, Number(item.id))
    await offerStore.fetchOfferItems(currentOfferId.value)
    notifyStore.notify(t('offers.items.deleted'), NotificationType.Success)
  }

  const proceedToReview = () => {
    currentStep.value = '3'
  }

  const handleOrderDiscountUpdate = async (newDiscount: number) => {
    // Update local state
    console.log('Updating order discount to:', newDiscount)
    formData.value.orderDiscount = newDiscount

    // Save to backend if offer exists
    if (currentOfferId.value) {
      await offerStore.updateExistingOffer(currentOfferId.value, { orderDiscount: newDiscount })
    }
  }

  const loadFavourites = async () => {
    favouritesLoading.value = true
    if (!favouritesStore.isInitialized) {
      await favouritesStore.fetchFavourites()
    }
    favourites.value = favouritesStore.favourites
    favouritesLoading.value = false
  }

  const addFavoritesItems = async () => {
    if (selectedFavourites.value.length === 0) return
    if (!currentOfferId.value) {
      notifyStore.notify('Please save offer details first', NotificationType.Error)
      return
    }

    // Batch add favorites - no refresh in loop, refresh once at end
    for (const favourite of selectedFavourites.value) {
      const productId = parseInt(favourite.productId)
      const itemData = {
        productId: productId,
        articleNr: favourite.articleNr || '',
        name: favourite.name,
        description: '',
        quantity: 1,
        price: parseFloat(favourite.price) || 0,
        discount: 0,
        pagebreak: false,
        option: false,
        folder: false,
      }

      const existingItem = offerStore.currentOfferItems.find((item) => item.productId === productId)

      if (existingItem && existingItem.id) {
        const updatedQuantity = (existingItem.quantity || 0) + 1

        console.log('Updating item:', existingItem.id, 'New quantity:', updatedQuantity)
        await offerStore.modifyOfferItem(currentOfferId.value, Number(existingItem.id), {
          ...itemData,
          quantity: updatedQuantity,
        })
      } else {
        await offerStore.addOfferItem(currentOfferId.value, itemData)
      }
    }

    // Refresh items once after all favorites are added
    await offerStore.fetchOfferItems(currentOfferId.value)

    notifyStore.notify(
      t('offers.items.favoritesAdded', { count: selectedFavourites.value.length }),
      NotificationType.Success
    )

    selectedFavourites.value = []
    showFavoritesDialog.value = false
  }

  const formatFavouritePrice = (price: any): string => {
    if (price === null || price === undefined) return '0.00'
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(numPrice)) return '0.00'
    return numPrice.toFixed(2)
  }

  // Watch for dialog open to load favourites
  watch(showFavoritesDialog, (newVal) => {
    if (newVal) {
      selectedFavourites.value = []
      loadFavourites()
    }
  })

  const handleSubmit = async (sendOffer: boolean) => {
    submitting.value = true
    formData.value.status = sendOffer ? 2 : 1

    // Convert Date object to ISO string format for API
    const payload = { ...formData.value }
    if (payload.offerDate instanceof Date) {
      payload.offerDate = payload.offerDate.toISOString().split('T')[0] as any
    }

    if (currentOfferId.value) {
      await offerStore.updateExistingOffer(currentOfferId.value, payload)
      notifyStore.notify(t('offers.updatedSuccessfully'), NotificationType.Success)
      router.push({ name: 'MyOffers' })
    } else {
      const offer = await offerStore.createNewOffer(payload)
      currentOfferId.value = Number(offer.id)
      offerHash.value = offer.hash || null
      offerSaved.value = true
      notifyStore.notify(t('offers.createdSuccessfully'), NotificationType.Success)
      // Don't redirect immediately - let user download PDF if they want
    }
    submitting.value = false
  }

  const downloadPDF = () => {
    if (offerHash.value) {
      offerStore.downloadPdf(offerHash.value)
    }
  }

  const viewPDF = () => {
    if (offerHash.value) {
      offerStore.viewPdf(offerHash.value)
    }
  }
</script>
