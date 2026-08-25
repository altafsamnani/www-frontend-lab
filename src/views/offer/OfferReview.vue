<template>
  <div class="space-y-6">
    <Card>
      <template #title>
        <h3 class="text-lg font-semibold">{{ $t('offers.preview.title') }}</h3>
      </template>
      <template #content>
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 class="text-surface-700 dark:text-surface-300 mb-3 font-semibold">
                {{ $t('offers.form.customerInfo') }}
              </h4>
              <div class="text-surface-600 dark:text-surface-400 space-y-1 text-sm">
                <p v-if="customerInfo.customerCompany" class="font-medium">
                  {{ customerInfo.customerCompany }}
                </p>
                <p v-if="customerInfo.customerName">{{ customerInfo.customerName }}</p>
                <p v-if="customerInfo.customerAddress">{{ customerInfo.customerAddress }}</p>
                <p v-if="customerInfo.customerZipcode || customerInfo.customerCity">
                  {{ customerInfo.customerZipcode }} {{ customerInfo.customerCity }}
                </p>
                <p v-if="customerInfo.customerEmail">{{ customerInfo.customerEmail }}</p>
              </div>
            </div>

            <div>
              <h4 class="text-surface-700 dark:text-surface-300 mb-3 font-semibold">
                {{ $t('offers.summary.title') }}
              </h4>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-surface-600 dark:text-surface-400"
                    >{{ $t('offers.summary.subtotal') }}:</span
                  >
                  <span class="font-semibold">€{{ formatPrice(subtotal) }}</span>
                </div>
                <div v-if="orderDiscount > 0" class="flex justify-between text-sm text-green-600">
                  <span>{{ $t('offers.summary.orderDiscount') }} ({{ orderDiscount }}%):</span>
                  <span>-€{{ formatPrice((subtotal * orderDiscount) / 100) }}</span>
                </div>
                <Divider class="my-2" />
                <div class="text-primary flex justify-between text-xl font-bold">
                  <span>{{ $t('offers.summary.total') }}:</span>
                  <span>€{{ formatPrice(total) }}</span>
                </div>
                <div class="text-surface-500 text-xs">
                  {{ $t('offers.summary.totalItems') }}: {{ totalItems }}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div v-if="offerItems && offerItems.length > 0">
            <h4 class="text-surface-700 dark:text-surface-300 mb-3 font-semibold">
              {{ $t('offers.form.items') }}
            </h4>
            <DataTable :value="offerItems" stripedRows class="p-datatable-sm">
              <Column :exportable="false" style="width: 70px">
                <template #body="{ data }">
                  <img
                    v-if="data.thumbnail"
                    :src="data.thumbnail"
                    :alt="data.name"
                    class="h-12 w-12 rounded object-contain"
                  />
                  <div
                    v-else
                    class="bg-surface-100 dark:bg-surface-800 flex h-12 w-12 items-center justify-center rounded"
                  >
                    <i class="pi pi-image text-surface-400"></i>
                  </div>
                </template>
              </Column>
              <Column :header="$t('offers.items.item')" style="width: 35%">
                <template #body="{ data }">
                  <div class="text-sm">
                    <div class="font-medium">{{ data.name }}</div>
                    <div v-if="data.articleNr" class="text-surface-500 font-mono text-xs">
                      {{ data.articleNr }}
                    </div>
                  </div>
                </template>
              </Column>
              <Column
                field="quantity"
                :header="$t('offers.items.quantity')"
                style="width: 12%"
                class="text-center"
              >
                <template #body="{ data }">
                  <span>{{ data.quantity || data.items || 0 }}</span>
                </template>
              </Column>
              <Column
                field="price"
                :header="$t('offers.items.price')"
                style="width: 14%"
                class="text-right"
              >
                <template #body="{ data }">
                  <span>€{{ formatPrice(data.price) }}</span>
                </template>
              </Column>
              <Column
                field="orderDiscount"
                :header="$t('offers.items.orderDiscount')"
                style="width: 12%"
                class="text-center"
              >
                <template #body="{ data }">
                  <span v-if="data.orderDiscount > 0">{{ data.orderDiscount }}%</span>
                  <span v-else>-</span>
                </template>
              </Column>
              <Column
                field="total"
                :header="$t('offers.items.total')"
                style="width: 14%"
                class="text-right"
              >
                <template #body="{ data }">
                  <span class="font-semibold">€{{ formatPrice(data.total) }}</span>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
    </Card>

    <!-- Email Warning Message -->
    <Message v-if="!offerSaved && !hasValidEmail" severity="warn" :closable="false">
      <div class="flex items-center gap-2">
        <i class="pi pi-exclamation-triangle text-xl"></i>
        <div>
          <div class="font-semibold">{{ $t('offers.validation.emailRequired') }}</div>
          <div class="text-sm">{{ $t('offers.validation.emailRequiredMessage') }}</div>
        </div>
      </div>
    </Message>

    <div class="flex justify-between">
      <Button
        type="button"
        @click="$emit('back')"
        severity="secondary"
        :label="$t('common.back')"
        icon="pi pi-arrow-left"
      />
      <div class="flex gap-3">
        <Button
          v-if="offerHash"
          type="button"
          @click="$emit('view-pdf')"
          severity="info"
          :label="$t('offers.viewPDF')"
          icon="pi pi-eye"
          outlined
        />
        <Button
          v-if="offerHash"
          type="button"
          @click="$emit('download-pdf')"
          severity="info"
          :label="$t('offers.downloadPDF')"
          icon="pi pi-download"
          outlined
        />
        <Button
          v-if="!offerSaved"
          type="button"
          @click="$emit('save-draft')"
          severity="secondary"
          :label="$t('offers.form.saveAsDraft')"
          :loading="submitting"
        />
        <Button
          v-if="!offerSaved"
          type="button"
          @click="showSendConfirm"
          :label="$t('offers.form.saveAndSend')"
          :loading="submitting"
          :disabled="!hasValidEmail"
          v-tooltip.top="!hasValidEmail ? $t('offers.validation.emailRequiredTooltip') : ''"
        />
        <Button
          v-if="offerSaved"
          type="button"
          @click="$emit('back-to-list')"
          :label="$t('offers.backToList')"
          icon="pi pi-arrow-left"
        />
      </div>
    </div>

    <!-- Send Confirmation Dialog -->
    <Dialog
      v-model:visible="showConfirmDialog"
      :header="$t('offers.validation.confirmSendTitle')"
      :modal="true"
      :style="{ width: '500px' }"
    >
      <div class="flex items-start gap-4">
        <i class="pi pi-send text-primary text-3xl"></i>
        <div class="flex-1">
          <p class="mb-3">{{ $t('offers.validation.confirmSendMessage') }}</p>
          <div
            class="bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 rounded border p-3"
          >
            <div class="mb-2 flex items-center gap-2">
              <i class="pi pi-envelope text-surface-600"></i>
              <span class="text-sm font-semibold"
                >{{ $t('offers.validation.emailWillBeSentTo') }}:</span
              >
            </div>
            <div class="text-primary font-mono font-semibold">{{ customerInfo.customerEmail }}</div>
          </div>
          <p class="text-surface-600 dark:text-surface-400 mt-3 text-sm">
            {{ $t('offers.validation.pdfWillBeAttached') }}
          </p>
        </div>
      </div>
      <template #footer>
        <Button
          :label="$t('common.cancel')"
          severity="secondary"
          @click="showConfirmDialog = false"
        />
        <Button
          :label="$t('offers.validation.confirmSend')"
          icon="pi pi-send"
          @click="confirmSend"
          :loading="submitting"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Card from 'primevue/card'
  import Button from 'primevue/button'
  import Divider from 'primevue/divider'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Message from 'primevue/message'
  import Dialog from 'primevue/dialog'
  import { useI18n } from 'vue-i18n'
  import type { OfferItem } from '@/types/Offer'

  interface CustomerInfo {
    customerCompany?: string
    customerName?: string
    customerAddress?: string
    customerZipcode?: string
    customerCity?: string
    customerEmail?: string
  }

  interface Props {
    customerInfo: CustomerInfo
    subtotal: number
    orderDiscount: number
    total: number
    totalItems: number
    offerHash: string | null
    offerSaved: boolean
    submitting: boolean
    offerItems?: OfferItem[]
    hasValidEmail: boolean
  }

  interface Emits {
    (e: 'back'): void
    (e: 'view-pdf'): void
    (e: 'download-pdf'): void
    (e: 'save-draft'): void
    (e: 'save-send'): void
    (e: 'back-to-list'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const { t } = useI18n()

  const showConfirmDialog = ref(false)

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const showSendConfirm = () => {
    showConfirmDialog.value = true
  }

  const confirmSend = () => {
    showConfirmDialog.value = false
    emit('save-send')
  }
</script>
