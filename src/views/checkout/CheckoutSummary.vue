<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">{{ $t('checkout.reviewTitle') }}</h1>
      <p class="text-lg text-surface-600 dark:text-surface-400">{{ $t('checkout.reviewSubtitle') }}</p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoaderForm :columns="1" :rows="5" />
    </div>

    <div v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 mr-3"></i>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="orderData" class="space-y-6">
      <!-- Order Details Card - Only show if there are order details -->
      <div v-if="orderData.reference || orderData.deliveryDate || orderData.comments"
        class="bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
            <i class="pi pi-info-circle text-purple-600 dark:text-purple-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ $t('checkout.orderDetails') }}</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="orderData.reference" class="space-y-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ $t('checkout.reference')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">{{ orderData.reference }}</p>
            </div>
          </div>

          <div v-if="orderData.deliveryDate" class="space-y-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ $t('checkout.deliveryDate')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">{{ formatDate(orderData.deliveryDate) }}</p>
            </div>
          </div>
        </div>

        <div v-if="orderData.comments" class="mt-6 space-y-2">
          <label class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ $t('checkout.comments')
          }}</label>
          <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
            <p class="text-surface-900 dark:text-surface-0 whitespace-pre-wrap">{{ orderData.comments }}</p>
          </div>
        </div>
      </div>

      <!-- Address Cards Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Billing Address Card -->
        <div
          class="bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
              <i class="pi pi-credit-card text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">{{ $t('checkout.billingAddress') }}
            </h3>
          </div>

          <div v-if="selectedBillingAddress" class="space-y-2">
            <p v-if="selectedBillingAddress.companyName" class="font-semibold text-surface-900 dark:text-surface-0">{{
              selectedBillingAddress.companyName }}</p>
            <p class="font-medium text-surface-900 dark:text-surface-0">{{ selectedBillingAddress.name }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ selectedBillingAddress.street }} {{
              selectedBillingAddress.number }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ selectedBillingAddress.zipcode }} {{
              selectedBillingAddress.city }}, {{ selectedBillingAddress.country }}
            </p>
            <div v-if="selectedBillingAddress.email || selectedBillingAddress.phone"
              class="pt-3 mt-3 border-t border-surface-200 dark:border-surface-700">
              <p v-if="selectedBillingAddress.email"
                class="text-sm text-surface-500 dark:text-surface-500 flex items-center">
                <i class="pi pi-envelope text-xs mr-2"></i>{{ selectedBillingAddress.email }}
              </p>
              <p v-if="selectedBillingAddress.phone"
                class="text-sm text-surface-500 dark:text-surface-500 flex items-center">
                <i class="pi pi-phone text-xs mr-2"></i>{{ selectedBillingAddress.phone }}
              </p>
            </div>
          </div>
        </div>

        <!-- Delivery/Pickup Address Card -->
        <div v-if="orderData.pickup || hasShippingAddress"
          class="bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
              :class="orderData.pickup ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'">
              <i
                :class="orderData.pickup ? 'pi pi-map-marker text-green-600 dark:text-green-400' : 'pi pi-truck text-orange-600 dark:text-orange-400'"></i>
            </div>
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
              {{ orderData.pickup ? $t('checkout.pickupAddress') : $t('checkout.deliveryAddress') }}
            </h3>
          </div>

          <!-- Pickup Address -->
          <div v-if="orderData.pickup" class="space-y-2">
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ $t('checkout.pickupAtStore') }}</p>
            </div>
            <p class="font-semibold text-surface-900 dark:text-surface-0">{{ pickupAddress.company }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.street }} {{ pickupAddress.number }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.zipcode }} {{ pickupAddress.city }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.country }}</p>
            <div class="pt-3 mt-3 border-t border-surface-200 dark:border-surface-700">
              <p class="text-sm text-surface-500 dark:text-surface-500 flex items-center">
                <i class="pi pi-envelope text-xs mr-2"></i>{{ pickupAddress.email }}
              </p>
              <p class="text-sm text-surface-500 dark:text-surface-500 flex items-center">
                <i class="pi pi-phone text-xs mr-2"></i>{{ pickupAddress.phone }}
              </p>
            </div>
          </div>

          <!-- Shipping Address -->
          <div v-else-if="hasShippingAddress && selectedShippingAddress" class="space-y-2">
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 mb-3">
              <p class="text-sm font-medium text-orange-800 dark:text-orange-200">{{ $t('checkout.weWillDeliverHere') }}
              </p>
            </div>
            <p v-if="selectedShippingAddress.companyName" class="font-semibold text-surface-900 dark:text-surface-0">{{
              selectedShippingAddress.companyName }}</p>
            <p class="font-medium text-surface-900 dark:text-surface-0">{{ selectedShippingAddress.name }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ selectedShippingAddress.street }} {{
              selectedShippingAddress.number }}</p>
            <p class="text-surface-600 dark:text-surface-400">{{ selectedShippingAddress.zipcode }} {{
              selectedShippingAddress.city }}, {{
                selectedShippingAddress.country }}</p>
          </div>
        </div>
      </div>

      <!-- Order Items & Total Card -->
      <CheckoutCart :items="cartItems" :loading="false" :is-order-items="true" :total-amount="cartSummary.totalAmount"
        :total-discount="cartSummary.totalDiscount" />

      <!-- Actions Card -->
      <CheckoutActionCard mode="order" :primary-loading="loading" @back="$emit('back')"
        @confirm="emit('orderConfirmed')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useShippingStore } from '@/stores/shipping'
import { storeConfig } from '@/config/store'
import LoaderForm from '@/components/icons/LoaderForm.vue'
import CheckoutCart from './CheckoutCart.vue'
import CheckoutActionCard from './CheckoutActionCard.vue'
import type { PlaceOrderPayload } from '@/types/Order'

interface Props {
  orderData: PlaceOrderPayload
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null
})

const emit = defineEmits<{
  back: []
  orderConfirmed: []
}>()


const cartStore = useCartStore()
const shippingStore = useShippingStore()

const { cartItems, cartSummary } = storeToRefs(cartStore)
const { myShippingAddresses } = storeToRefs(shippingStore)

const pickupAddress = computed(() => storeConfig.pickup.defaultAddress)

const selectedBillingAddress = computed(() => {
  if (!props.orderData?.billingId) return null
  return myShippingAddresses.value.find(addr => addr.id === props.orderData?.billingId)
})

const selectedShippingAddress = computed(() => {
  if (!props.orderData?.shippingId || props.orderData?.pickup) return null
  return myShippingAddresses.value.find(addr => addr.id === props.orderData?.shippingId)
})

const hasShippingAddress = computed(() => {
  return !props.orderData?.pickup && selectedShippingAddress.value
})



const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

</script>
