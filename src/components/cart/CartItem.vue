<template>
  <div class="cart-item flex items-center p-4 border-b border-gray-200 hover:bg-gray-50">
    <div class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
      <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.name" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
        <span class="text-sm">No Image</span>
      </div>
    </div>

    <div class="ml-4 flex-1">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.articleNr }}</p>
          <p v-if="item.discountActionName" class="text-xs text-green-600 font-medium">
            {{ item.discountActionName }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-sm font-medium text-gray-900">
            €{{ formatPrice(item.totalNetPrice) }}
          </p>
          <p v-if="item.discountPercentage > 0" class="text-xs text-gray-500 line-through">
            €{{ formatPrice(item.totalPrice) }}
          </p>
          <p v-if="item.discountPercentage > 0" class="text-xs text-green-600">
            -{{ item.discountPercentage }}%
          </p>
        </div>
      </div>

      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <InputNumber :model-value="quantity" @update:model-value="onQuantityUpdate" :show-buttons="true"
            button-layout="horizontal" spinner-mode="horizontal" :min="1" :disabled="loading" class="w-24 flex-shrink-0"
            input-class="w-12 text-center text-sm" decrement-button-class="p-button-text text-xs"
            increment-button-class="p-button-text text-xs" increment-button-icon="pi pi-plus"
            decrement-button-icon="pi pi-minus" />
        </div>

        <button @click="removeItem" :disabled="loading"
          class="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading">Removing...</span>
          <span v-else>Remove</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CartItem } from '@/types/Cart'
import { useCartStore } from '@/stores/cart'
import InputNumber from 'primevue/inputnumber'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const loading = ref(false)
const quantity = ref(props.item.quantity)
const isUpdating = ref(false)
let updateTimeout: NodeJS.Timeout | null = null

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

const updateQuantity = async (newQuantity: number) => {
  if (newQuantity && newQuantity > 0 && newQuantity !== props.item.quantity && !isUpdating.value) {
    isUpdating.value = true
    loading.value = true

    await cartStore.updateItemQuantity(parseInt(props.item.id), newQuantity)
    loading.value = false
    isUpdating.value = false
  }
}

const onQuantityUpdate = (newQuantity: number) => {
  // Update the local quantity immediately for UI responsiveness
  quantity.value = newQuantity

  // Clear any existing timeout
  if (updateTimeout) {
    clearTimeout(updateTimeout)
  }

  // Debounce the API call to prevent rapid consecutive calls
  updateTimeout = setTimeout(() => {
    updateQuantity(newQuantity)
  }, 500) // 500ms delay
}


// Watch for changes in props.item.quantity to sync with the input
// Only update if we're not currently updating to prevent infinite loops
watch(() => props.item.quantity, (newQuantity) => {
  if (!isUpdating.value) {
    quantity.value = newQuantity
  }
})

const removeItem = async () => {
  loading.value = true
  try {
    await cartStore.removeItemFromCart(parseInt(props.item.id))
  } catch (error) {
    console.error('Error removing item:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cart-item {
  transition: background-color 0.2s ease;
}
</style>