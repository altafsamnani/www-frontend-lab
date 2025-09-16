import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'
import type { AddToCartPayload } from '@/types/Cart'

export interface UseAddToCartOptions {
  showToast?: boolean
  onSuccess?: () => void
  onError?: (error: any) => void
}

export function useAddToCart(options: UseAddToCartOptions = {}) {
  const cartStore = useCartStore()
  const toast = useToast()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const addToCart = async (
    product: {
      id: number
      name: string
      price: number
    },
    quantity: number = 1,
    discountPercentage: number = 0,
    discountActionName?: string
  ) => {
    loading.value = true
    error.value = null

    try {
      const isUpdate = cartStore.isItemInCartByProductId(product.id)
      
      if (isUpdate) {
        // Item is already in cart, update the existing item
        const existingItem = cartStore.cartItems.find(item => item.productId === product.id)
        if (existingItem) {
          await cartStore.updateItemQuantity(parseInt(existingItem.id), quantity)
        }
      } else {
        // Item is not in cart, add new item
        const payload: AddToCartPayload = {
          productId: product.id,
          quantity: quantity,
          price: parseFloat(product.price.toString()),
          discountPercentage: discountPercentage,
          discountActionName: discountActionName
        }
        await cartStore.addItemToCart(payload)
      }

      if (options.showToast !== false) {
        toast.add({
          severity: 'success',
          summary: isUpdate ? 'Cart Updated' : 'Added to Cart',
          detail: `${product.name} ${isUpdate ? 'updated in' : 'added to'} cart successfully!`,
          life: 3000
        })
      }

      if (options.onSuccess) {
        options.onSuccess()
      }

      return true
    } catch (err: any) {
      error.value = err?.message || 'Failed to add item to cart'
      
      if (options.showToast !== false) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.value,
          life: 5000
        })
      }

      if (options.onError) {
        options.onError(err)
      }

      console.error('Error adding to cart:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const isItemInCart = (productId: number) => {
    return cartStore.isItemInCartByProductId(productId)
  }

  return {
    addToCart,
    loading,
    error,
    isItemInCart
  }
}