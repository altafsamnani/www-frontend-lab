<template>
  <div class="">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">{{ $t('checkout.confirmationTitle') }}
      </h1>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p class="text-lg text-surface-600 dark:text-surface-400">{{ $t('checkout.confirmationSubtitle') }}</p>
        <Button :label="$t('checkout.confirmation.downloadInvoice')" icon="pi pi-download" severity="secondary" outlined
          class="shrink-0" />
      </div>
    </div>

    <div class="w-full flex flex-col gap-8">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-20">
        <div class="flex-1 flex flex-col gap-10">
          <!-- Shipping/Pickup Address Section -->
          <div class="flex flex-col gap-4">
            <h2 class="text-lg font-medium text-surface-900 dark:text-surface-0 leading-tight">{{
              confirmedOrder.pickup ? $t('checkout.confirmation.pickupAddress') :
                $t('checkout.confirmation.shippingAddress') }}</h2>
            <div class="flex flex-col gap-2">
              <!-- Pickup Address from translations -->
              <div v-if="confirmedOrder.pickup" class="text-base text-surface-700 dark:text-surface-300 leading-normal">
                {{ $t('config.pickup_address.companyName') }}<br />
                {{ $t('config.pickup_address.name') }}<br />
                {{ $t('config.pickup_address.street') }} {{ $t('config.pickup_address.number') }}<br />
                {{ $t('config.pickup_address.zipcode') }} {{ $t('config.pickup_address.city') }}<br />
                {{ $t('config.pickup_address.country') }}<br />
                <div class="pt-2 mt-2 border-t border-surface-200 dark:border-surface-700">
                  <span class="font-medium">Tel:</span> {{ $t('config.pickup_address.phone') }}
                </div>
              </div>
              <!-- Shipping Address from API -->
              <div v-else class="text-base text-surface-700 dark:text-surface-300 leading-normal"
                v-if="confirmedOrder.shippingAddress">
                {{ confirmedOrder.shippingAddress.companyName }}<br />
                {{ getFullName(confirmedOrder.shippingAddress) }}<br />
                {{ getFullAddress(confirmedOrder.shippingAddress) }}<br />
                {{ confirmedOrder.shippingAddress.phone }}
              </div>
            </div>
          </div>

          <Divider class="my-0!" />

          <!-- Order Items Section -->
          <div v-for="item in confirmedOrder.products" :key="item.id" class="flex gap-4">
            <div class="w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0">
              <img class="w-full h-full object-cover" :src="item.thumbnail || '/images/default-product.png'"
                :alt="item.name" />
            </div>
            <div class="flex-1 flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div class="text-base font-medium text-surface-900 dark:text-surface-0 leading-tight">{{ item.name }}
                  </div>
                  <div class="text-base font-semibold text-surface-900 dark:text-surface-0 leading-tight">€{{ item.price
                  }}</div>
                </div>
                <div class="text-sm text-surface-500 leading-tight">{{ $t('checkout.confirmation.articleNumber') }}: {{
                  item.articleNr }}</div>
                <div class="text-sm text-surface-500 leading-tight">{{ $t('products.quantity') }}: {{
                  item.quantity }}</div>
              </div>
            </div>
          </div>



          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-start">
            <Button :label="$t('checkout.confirmation.viewOrderDetails')" @click="$emit('viewOrder')"
              class="shrink-0" />

            <Button :label="$t('checkout.confirmation.continueShopping')" @click="$emit('continue-shopping')"
              severity="secondary" outlined class="shrink-0" />
          </div>
        </div>

        <!-- Invoice Section -->
        <div
          class="flex-1 lg:max-w-[550px] p-8 bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 flex flex-col gap-8">
          <div
            class="pb-6 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.13164 2.15872C4.27324 2.75894 3.49702 3.46859 2.82319 4.26744C5.57678 4.0118 9.0751 4.42923 13.1366 6.46001C17.4738 8.62853 20.9663 8.70185 23.3969 8.23301C23.1763 7.56527 22.8986 6.92351 22.5698 6.31343C19.7874 6.60689 16.2204 6.21845 12.0633 4.13999C9.42358 2.82011 7.09666 2.2764 5.13164 2.15872ZM20.9444 3.99999C18.7472 1.545 15.554 0 12 0C10.9563 0 9.9436 0.133264 8.9782 0.383688C10.2857 0.740451 11.6747 1.26239 13.1366 1.99336C16.1802 3.51512 18.8078 4.0051 20.9444 3.99999ZM23.9165 10.5769C20.9801 11.1567 16.9253 11.0376 12.0633 8.60663C7.51798 6.33395 3.90026 6.36257 1.46034 6.90479C1.3344 6.93275 1.21142 6.96215 1.09142 6.99275C0.771973 7.68749 0.516981 8.41805 0.334021 9.17669C0.529432 9.12449 0.731359 9.07487 0.939697 9.02855C3.89974 8.37077 8.08204 8.39933 13.1366 10.9267C17.682 13.1993 21.2998 13.1707 23.7397 12.6285C23.8233 12.61 23.9057 12.5908 23.9867 12.571C23.9956 12.3818 24 12.1914 24 12C24 11.5185 23.9717 11.0436 23.9165 10.5769ZM23.5949 15.1034C20.687 15.6118 16.7502 15.4166 12.0633 13.0733C7.51798 10.8006 3.90026 10.8292 1.46034 11.3714C0.918751 11.4917 0.431544 11.6383 0.001758 11.7931C0.000586201 11.8619 0 11.9309 0 12C0 18.6274 5.37258 24 12 24C17.5542 24 22.2272 20.2265 23.5949 15.1034Z"
                  class="fill-surface-950 dark:fill-surface-0" />
              </svg>
              <div class="text-xl font-semibold text-surface-900 dark:text-surface-0 leading-normal">Osec</div>
            </div>
            <div class="flex flex-col items-start sm:items-end gap-2">
              <div class="text-xl font-medium text-surface-900 dark:text-surface-0 leading-normal">{{
                $t('checkout.confirmation.invoice') }}</div>
              <div class="text-lg text-surface-500 leading-tight">#{{ confirmedOrder.id }}</div>
            </div>
          </div>

          <div class="px-6 flex flex-col md:flex-row gap-8">
            <div class="flex-1 flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <div class="text-base font-semibold text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.billedTo') }}</div>
                <div class="text-base text-surface-700 dark:text-surface-300 leading-normal"
                  v-if="confirmedOrder.billingAddress">
                  {{ confirmedOrder.billingAddress.companyName }}<br />
                  {{ getFullName(confirmedOrder.billingAddress) }}<br />
                  {{ getFullAddress(confirmedOrder.billingAddress) }}<br />
                  {{ confirmedOrder.billingAddress.phone }}
                </div>
              </div>
              <div class="flex flex-col gap-2" v-if="confirmedOrder.reference">
                <div class="text-base font-semibold text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.reference') }}</div>
                <div class="text-base text-surface-900 dark:text-surface-0 leading-tight">{{ confirmedOrder.reference }}
                </div>
              </div>
            </div>
            <div class="flex-1 flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <div class="text-base font-semibold text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.date') }}</div>
                <div class="text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                  formatDate(confirmedOrder.createdAt) }}</div>
              </div>
              <div class="flex flex-col gap-2" v-if="confirmedOrder.deliveryDate">
                <div class="text-base font-semibold text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.deliveryDate') }}</div>
                <div class="text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                  formatDate(confirmedOrder.deliveryDate) }}</div>
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="px-6 py-2 bg-surface-100 dark:bg-surface-800 rounded flex gap-6">
              <div class="flex-1 text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                $t('checkout.confirmation.description') }}</div>
              <div class="w-20 text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                $t('products.quantity') }}</div>
              <div class="w-20 text-base text-surface-900 dark:text-surface-0 leading-tight text-right">{{
                $t('checkout.confirmation.price') }}</div>
            </div>

            <div v-for="item in confirmedOrder.products" :key="item.id" class="px-6 py-4 flex gap-6">
              <div class="flex-1 text-base text-surface-900 dark:text-surface-0 leading-tight">{{ item.name }}</div>
              <div class="w-20 text-base text-surface-900 dark:text-surface-0 leading-normal">{{ item.quantity }}</div>
              <div class="w-20 text-base text-surface-900 dark:text-surface-0 leading-normal text-right">€{{ item.price
              }}</div>
            </div>

            <div class="px-6 py-4 bg-surface-0 dark:bg-surface-900 rounded flex flex-col gap-4">
              <Divider class="my-0!" />

              <div class="flex justify-between items-start">
                <div class="text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.subtotal') }}</div>
                <div class="text-lg font-medium text-surface-900 dark:text-surface-0 leading-tight">€{{
                  confirmedOrder.totalAmount }}</div>
              </div>

              <div class="flex justify-between items-start" v-if="confirmedOrder.totalDiscount > 0">
                <div class="text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.discount') }}</div>
                <div class="text-lg font-medium text-surface-900 dark:text-surface-0 leading-tight">-€{{
                  confirmedOrder.totalDiscount }}</div>
              </div>

              <Divider class="my-0!" />

              <div class="flex justify-between items-center">
                <div class="text-base text-surface-900 dark:text-surface-0 leading-tight">{{
                  $t('checkout.confirmation.total') }}</div>
                <div class="text-lg font-bold text-surface-900 dark:text-surface-0 leading-tight">€{{
                  confirmedOrder.totalAmount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Divider from 'primevue/divider'

interface Props {
  confirmedOrder: any
}

defineProps<Props>()

defineEmits<{
  viewOrder: []
  'continue-shopping': []
}>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper function to get full name from address object
const getFullName = (address: any): string => {
  if (!address) return ''
  const parts: string[] = []
  if (address.firstname) parts.push(address.firstname)
  if (address.lastname) parts.push(address.lastname)
  if (parts.length === 0 && address.name) parts.push(address.name)
  return parts.join(' ') || ''
}

// Helper function to get full address from address object
const getFullAddress = (address: any): string => {
  if (!address) return ''
  let addressStr = address.street || ''
  if (address.number) {
    addressStr += ` ${address.number}`
  }
  if (address.numberExt) {
    addressStr += ` ${address.numberExt}`
  }
  // If no street/number available, use generic address field
  if (!addressStr && address.address) {
    addressStr = address.address
  }
  return `${addressStr}, ${address.zipcode || ''} ${address.city || ''}`
}
</script>