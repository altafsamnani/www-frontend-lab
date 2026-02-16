import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem, CartSummary } from '@/types/Cart'
import type ResponseData from '@/types/ResponseData'
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '@/http/cart'

export const useCartStore = defineStore('cartStore', () => {
  const cartItems = ref<CartItem[]>([])
  const cartSummary = ref<CartSummary>({
    totalItems: 0,
    totalAmount: 0,
    totalDiscount: 0,
    itemCount: 0
  })
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isInitialized = ref(false)
  let fetchCartPromise: Promise<void> | null = null

  // Computed properties
  const isCartEmpty = computed(() => cartItems.value.length === 0)
  const cartItemCount = computed(() => cartSummary.value.itemCount)
  const cartTotalAmount = computed(() => cartSummary.value.totalAmount)
  const cartTotalDiscount = computed(() => cartSummary.value.totalDiscount)

  // Actions
  const fetchCart = async (force = false) => {
    // Return existing promise if one is already running
    if (fetchCartPromise && !force) {
      return fetchCartPromise
    }

    // If already initialized and not forced, don't refetch
    if (isInitialized.value && !force) {
      return Promise.resolve()
    }

    fetchCartPromise = performFetchCart(force)
    return fetchCartPromise
  }

  const performFetchCart = async (force = false) => {
    loading.value = true
    error.value = null
    try {
      const response = await getCart()

      // Debug: Log the actual response structure
      console.log('Cart API Response:', response)

      // The axios interceptor already returns response.data, so we don't need to access response.data again
      // Handle different possible response structures
      let items: CartItem[] = []
      if (response && Array.isArray(response.data)) {
        items = response.data
      } else if (Array.isArray(response)) {
        items = response
      } else if (response?.items && Array.isArray(response.items)) {
        items = response.items
      } else {
        console.warn('Unexpected cart response format:', response)
        items = []
      }

      cartItems.value = items

      // Calculate summary from cart items
      if (cartItems.value.length > 0) {
        const totalItems = cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
        // Use totalNetPrice from backend (already in euros)
        const totalAmount = cartItems.value.reduce((sum, item) => sum + (item.totalNetPrice || 0), 0)
        // Calculate total discount: totalPrice - totalNetPrice (both in euros)
        const totalDiscount = cartItems.value.reduce((sum, item) => {
          const discount = (item.totalPrice || 0) - (item.totalNetPrice || 0)
          return sum + discount
        }, 0)

        cartSummary.value = {
          totalItems,
          totalAmount,
          totalDiscount,
          itemCount: cartItems.value.length
        }
      } else {
        cartSummary.value = {
          totalItems: 0,
          totalAmount: 0,
          totalDiscount: 0,
          itemCount: 0
        }
      }

      console.log('Cart items after processing:', cartItems.value)
      console.log('Cart summary after processing:', cartSummary.value)

      isInitialized.value = true
    } catch (err: any) {
      error.value = err?.message || 'Failed to fetch cart'
      console.error('Error fetching cart:', err)
      console.error('Error details:', err?.response)
      // Reset to empty state on error
      cartItems.value = []
      cartSummary.value = {
        totalItems: 0,
        totalAmount: 0,
        totalDiscount: 0,
        itemCount: 0
      }
    } finally {
      loading.value = false
      fetchCartPromise = null
    }
  }

  const addItemToCart = async (payload: {
    productId: number
    quantity: number
    price?: number
    discountPercentage?: number
    discountActionName?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      await addToCart(payload)
      await fetchCart(true) // Force refresh cart after adding
    } catch (err) {
      error.value = 'Failed to add item to cart'
      console.error('Error adding item to cart:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeItemFromCart = async (cartItemId: number) => {
    loading.value = true
    error.value = null
    try {
      await removeFromCart(cartItemId)
      await fetchCart(true) // Force refresh cart after removing
    } catch (err) {
      error.value = 'Failed to remove item from cart'
      console.error('Error removing item from cart:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearAllItems = async () => {
    cartItems.value = []
    cartSummary.value = {
      totalItems: 0,
      totalAmount: 0,
      totalDiscount: 0,
      itemCount: 0
    }
  }

  const updateItemQuantity = async (cartItemId: number, quantity: number) => {
    const item = cartItems.value.find((item) => parseInt(item.id) === cartItemId)
    if (item && quantity > 0) {
      loading.value = true
      error.value = null

      try {
        // Update locally first for better UX
        item.quantity = quantity

        // Add the item again with the new quantity (backend will handle updating)
        await updateCartItem(cartItemId, {
          productId: item.productId,
          quantity: quantity,
          price: item.price,
          discountPercentage: item.discountPercentage,
          discountActionName: item.discountActionName
        })

        // Refresh cart to get updated totals
        await fetchCart(true)
      } catch (err) {
        // Revert local change if API call fails
        item.quantity = item.quantity
        error.value = 'Failed to update quantity'
        console.error('Error updating quantity:', err)
        throw err
      } finally {
        loading.value = false
      }
    }
  }

  const getCartItemByArticleNr = (articleNr: string) => {
    return cartItems.value.find((item) => item.articleNr === articleNr)
  }

  const isItemInCart = (articleNr: string) => {
    return cartItems.value.some((item) => item.articleNr === articleNr)
  }

  const isItemInCartByProductId = (productId: number) => {
    return cartItems.value.some((item) => item.productId === productId)
  }

  // Alias for fetchCart - used by components that only need summary data
  const fetchCartSummary = async () => {
    await fetchCart(false) // Don't force, use cached if available
  }

  return {
    // State
    cartItems,
    cartSummary,
    loading,
    error,

    // Computed
    isCartEmpty,
    cartItemCount,
    cartTotalAmount,
    cartTotalDiscount,

    // Actions
    fetchCart,
    fetchCartSummary,
    addItemToCart,
    removeItemFromCart,
    clearAllItems,
    updateItemQuantity,
    getCartItemByArticleNr,
    isItemInCart,
    isItemInCartByProductId
  }
})
