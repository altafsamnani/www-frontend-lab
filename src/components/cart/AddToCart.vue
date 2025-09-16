<template>
  <div class="add-to-cart w-full">
    <div class="flex items-center gap-3 w-full">
      <InputNumber v-model="quantity" :show-buttons="true" button-layout="horizontal" spinner-mode="horizontal" :min="1"
        class="w-32 flex-shrink-0" input-class="w-12 text-center" decrement-button-class="p-button-text"
        increment-button-class="p-button-text" increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />

      <Button @click="addToCart" :disabled="loading || !product" :loading="loading"
        :label="loading ? 'Adding...' : (isInCart ? 'Update Cart' : 'Add to Cart')" class="flex-1 min-w-0" />
    </div>

    <div v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </div>

    <div v-if="success" class="mt-2 text-sm text-green-600">
      {{ success }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { AddToCartPayload } from '@/types/Cart'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'

interface Product {
  id: number
  name: string
  article_nr: string
  price: number
  image?: string
  category?: string
  brand?: string
  description?: string
}

interface Props {
  product: Product
  initialQuantity?: number
  price?: number
  discountPercentage?: number
  discountActionName?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialQuantity: 1,
  price: undefined,
  discountPercentage: 0,
  discountActionName: undefined
})

const cartStore = useCartStore()
const quantity = ref(props.initialQuantity)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const isInCart = computed(() => {
  return cartStore.isItemInCart(props.product.article_nr)
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = async () => {
  if (!props.product) return

  loading.value = true
  error.value = null
  success.value = null

  try {
    const payload: AddToCartPayload = {
      productId: props.product.id,
      articleNr: props.product.article_nr,
      quantity: quantity.value,
      price: parseFloat((props.price || props.product.price).toString()),
      discountPercentage: props.discountPercentage,
      discountActionName: props.discountActionName
    }

    await cartStore.addItemToCart(payload)
    success.value = isInCart.value ? 'Cart updated successfully!' : 'Added to cart successfully!'

    // Clear success message after 3 seconds
    setTimeout(() => {
      success.value = null
    }, 3000)
  } catch (err) {
    error.value = 'Failed to add item to cart. Please try again.'
    console.error('Error adding to cart:', err)
  } finally {
    loading.value = false
  }
}

// Watch for changes in cart to update isInCart status
watch(() => cartStore.cartItems, () => {
  // This will trigger reactivity for isInCart computed property
}, { deep: true })
</script>

<style scoped>
.add-to-cart {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .add-to-cart {
    align-items: flex-start;
  }
}
</style>