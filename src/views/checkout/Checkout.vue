<template>
  <div class="">
    <!-- Progress Indicator -->
    <CheckoutProgressIndicator :current-step="showConfirmation ? 3 : (showReview ? 2 : 1)" />

    <!-- Order Confirmation Mode -->
    <div v-if="showConfirmation && confirmedOrder">
      <OrderConfirmation :confirmed-order="confirmedOrder" @viewOrder="handleViewOrder"
        @continue-shopping="handleContinueShopping" />
    </div>

    <div v-else-if="showReview">
      <CheckoutSummary :order-data="reviewOrderData" :loading="reviewLoading" :error="reviewError"
        @back="handleBackToCheckout" @orderConfirmed="handlePlaceOrder" />
    </div>

    <!-- Checkout Form Mode -->
    <div v-else>
      <CheckoutForm :loading="reviewLoading" @cancel="handleCancel" @submit="handleReviewOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import { useNavigationStore } from '@/stores/navigation'
import { useCartStore } from '@/stores/cart'
import CheckoutSummary from './CheckoutSummary.vue'
import CheckoutForm from './CheckoutForm.vue'
import OrderConfirmation from './OrderConfirmation.vue'
import CheckoutProgressIndicator from './CheckoutProgressIndicator.vue'
import type { PlaceOrderPayload } from '@/types/Order'
const router = useRouter()
const orderStore = useOrderStore()
const navigationStore = useNavigationStore()
const cartStore = useCartStore()

// Flow state management
const showReview = ref(false)
const showConfirmation = ref(false)
const reviewOrderData = ref<PlaceOrderPayload | null>(null)
const confirmedOrder = ref<{ id: number; hash: string } | null>(null)
const reviewLoading = ref(false)
const reviewError = ref<string | null>(null)

const handleReviewOrder = (orderData: PlaceOrderPayload) => {
  reviewOrderData.value = orderData
  showReview.value = true
}

const handlePlaceOrder = async () => {
  if (!reviewOrderData.value) return

  reviewLoading.value = true
  reviewError.value = null

  try {
    const result = await orderStore.submitOrder(reviewOrderData.value)

    // Show order confirmation on success
    if (result) {

      // Switch to confirmation view immediately
      showReview.value = false
      showConfirmation.value = true

      cartStore.clearAllItems()
      confirmedOrder.value = await orderStore.fetchOrderById(result.id)
    }
  } catch (error) {
    reviewError.value = 'Failed to place order. Please try again.'
    console.error('Error placing order:', error)
  } finally {
    reviewLoading.value = false
  }
}

const handleBackToCheckout = () => {
  showReview.value = false
  reviewOrderData.value = null
  reviewError.value = null
}

// Handle view order from confirmation
const handleViewOrder = () => {
  if (confirmedOrder.value) {
    router.push(`/orders`)
    //router.push(`/orders/${confirmedOrder.value.id}`)
  }
}

// Handle continue shopping from confirmation
const handleContinueShopping = () => {
  router.push({ name: 'Search' })
}

// Handle cancel - navigate to last visited route or default to search
const handleCancel = () => {
  const lastRoute = navigationStore.getLastVisitedRoute()
  router.push(lastRoute)
}
</script>