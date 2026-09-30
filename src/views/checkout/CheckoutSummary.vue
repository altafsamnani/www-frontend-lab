<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1
        class="text-surface-900 dark:text-surface-0 mb-2 text-2xl leading-7 font-bold sm:text-3xl sm:tracking-tight"
      >
        {{ $t('checkout.reviewTitle') }}
      </h1>
      <p class="text-surface-600 dark:text-surface-400 text-lg">
        {{ $t('checkout.reviewSubtitle') }}
      </p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoaderForm :columns="1" :rows="5" />
    </div>

    <div
      v-else-if="error"
      class="mb-6 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20"
    >
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle mr-3 text-red-600 dark:text-red-400"></i>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="orderData" class="space-y-6">
      <!-- Order Details Card - Only show if there are order details -->
      <div
        v-if="orderData.reference || orderData.deliveryDate || orderData.comments"
        class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div class="mb-6 flex items-center">
          <div
            class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30"
          >
            <i class="pi pi-info-circle text-purple-600 dark:text-purple-400"></i>
          </div>
          <h3 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('checkout.orderDetails') }}
          </h3>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div v-if="orderData.reference" class="space-y-2">
            <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
              $t('checkout.reference')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">{{ orderData.reference }}</p>
            </div>
          </div>

          <div v-if="orderData.deliveryDate" class="space-y-2">
            <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
              $t('checkout.deliveryDate')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">
                {{ formatDate(orderData.deliveryDate) }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="orderData.comments" class="mt-6 space-y-2">
          <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
            $t('checkout.comments')
          }}</label>
          <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
            <p class="text-surface-900 dark:text-surface-0 whitespace-pre-wrap">
              {{ orderData.comments }}
            </p>
          </div>
        </div>
      </div>

      <!-- Address Cards Row -->
      <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Billing Address Card -->
        <div
          class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div class="mb-4 flex items-center">
            <div
              class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30"
            >
              <i class="pi pi-credit-card text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
              {{ $t('checkout.billingAddress') }}
            </h3>
          </div>

          <div v-if="selectedBillingAddress" class="space-y-2">
            <p
              v-if="selectedBillingAddress.companyName"
              class="text-surface-900 dark:text-surface-0 font-semibold"
            >
              {{ selectedBillingAddress.companyName }}
            </p>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ selectedBillingAddress.name }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ selectedBillingAddress.street }} {{ selectedBillingAddress.number }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ selectedBillingAddress.zipcode }} {{ selectedBillingAddress.city }},
              {{ selectedBillingAddress.country }}
            </p>
            <div
              v-if="selectedBillingAddress.email || selectedBillingAddress.phone"
              class="border-surface-200 dark:border-surface-700 mt-3 border-t pt-3"
            >
              <p
                v-if="selectedBillingAddress.email"
                class="text-surface-500 dark:text-surface-500 flex items-center text-sm"
              >
                <i class="pi pi-envelope mr-2 text-xs"></i>{{ selectedBillingAddress.email }}
              </p>
              <p
                v-if="selectedBillingAddress.phone"
                class="text-surface-500 dark:text-surface-500 flex items-center text-sm"
              >
                <i class="pi pi-phone mr-2 text-xs"></i>{{ selectedBillingAddress.phone }}
              </p>
            </div>
          </div>
        </div>

        <!-- Delivery/Pickup Address Card -->
        <div
          v-if="orderData.pickup || hasShippingAddress"
          class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div class="mb-4 flex items-center">
            <div
              class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg"
              :class="
                orderData.pickup
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-orange-100 dark:bg-orange-900/30'
              "
            >
              <i
                :class="
                  orderData.pickup
                    ? 'pi pi-map-marker text-green-600 dark:text-green-400'
                    : 'pi pi-truck text-orange-600 dark:text-orange-400'
                "
              ></i>
            </div>
            <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
              {{ orderData.pickup ? $t('checkout.pickupAddress') : $t('checkout.deliveryAddress') }}
            </h3>
          </div>

          <!-- Pickup Address -->
          <div v-if="orderData.pickup" class="space-y-2">
            <div class="mb-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">
                {{ $t('checkout.pickupAtStore') }}
              </p>
            </div>
            <p class="text-surface-900 dark:text-surface-0 font-semibold">
              {{ pickupAddress.company }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ pickupAddress.street }} {{ pickupAddress.number }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ pickupAddress.zipcode }} {{ pickupAddress.city }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.country }}</p>
            <div class="border-surface-200 dark:border-surface-700 mt-3 border-t pt-3">
              <p class="text-surface-500 dark:text-surface-500 flex items-center text-sm">
                <i class="pi pi-envelope mr-2 text-xs"></i>{{ pickupAddress.email }}
              </p>
              <p class="text-surface-500 dark:text-surface-500 flex items-center text-sm">
                <i class="pi pi-phone mr-2 text-xs"></i>{{ pickupAddress.phone }}
              </p>
            </div>
          </div>

          <!-- Shipping Address -->
          <div v-else-if="hasShippingAddress && selectedShippingAddress" class="space-y-2">
            <div class="mb-3 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
              <p class="text-sm font-medium text-orange-800 dark:text-orange-200">
                {{ $t('checkout.weWillDeliverHere') }}
              </p>
            </div>
            <p
              v-if="selectedShippingAddress.companyName"
              class="text-surface-900 dark:text-surface-0 font-semibold"
            >
              {{ selectedShippingAddress.companyName }}
            </p>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ selectedShippingAddress.name }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ selectedShippingAddress.street }} {{ selectedShippingAddress.number }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ selectedShippingAddress.zipcode }} {{ selectedShippingAddress.city }},
              {{ selectedShippingAddress.country }}
            </p>
          </div>
        </div>
      </div>

      <!-- Order Items & Total Card -->
      <CheckoutCart
        :items="cartItems"
        :loading="false"
        :is-order-items="true"
        :total-amount="cartSummary.totalAmount"
        :total-discount="cartSummary.totalDiscount"
      />

      <!-- Actions Card -->
      <CheckoutActionCard
        mode="order"
        :primary-loading="loading"
        @back="$emit('back')"
        @confirm="emit('orderConfirmed')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useCartStore } from '@/stores/cart'
  import { useAddressStore } from '@/stores/addresses'
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
    error: null,
  })

  const emit = defineEmits<{
    back: []
    orderConfirmed: []
  }>()

  const cartStore = useCartStore()
  const addressStore = useAddressStore()

  const { cartItems, cartSummary } = storeToRefs(cartStore)
  const { myAddresses } = storeToRefs(addressStore)

  const pickupAddress = computed(() => storeConfig.pickup.defaultAddress)

  const selectedBillingAddress = computed(() => {
    if (!props.orderData?.billingId) return null
    return myAddresses.value.find((addr) => addr.id === props.orderData?.billingId)
  })

  const selectedShippingAddress = computed(() => {
    if (!props.orderData?.shippingId || props.orderData?.pickup) return null
    return myAddresses.value.find((addr) => addr.id === props.orderData?.shippingId)
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
      day: 'numeric',
    })
  }
</script>
