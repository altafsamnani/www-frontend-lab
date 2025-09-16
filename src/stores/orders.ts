import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Order, OrderSummary, PlaceOrderPayload } from '@/types/Order'
import type ResponseData from '@/types/ResponseData'
import { getUserOrders, placeOrder, getOrderById, getOrderByHash } from '@/http/orders'

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const fetchUserOrders = async (params?: any) => {
    loading.value = true
    error.value = null
    try {
      // Note: API doesn't support pagination yet, params are ignored
      const response: ResponseData = await getUserOrders()
      orders.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch orders'
      console.error('Error fetching orders:', err)
    } finally {
      loading.value = false
    }
  }

  const submitOrder = async (orderData: PlaceOrderPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await placeOrder(orderData)
      await fetchUserOrders() // Refresh orders list
      return data
    } catch (err) {
      error.value = 'Failed to place order'
      console.error('Error placing order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOrderById = async (orderId: number) => {
    loading.value = true
    error.value = null
    try {
      const response: ResponseData = await getOrderById(orderId)
      currentOrder.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch order'
      console.error('Error fetching order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOrderByHash = async (hash: string) => {
    loading.value = true
    error.value = null
    try {
      const response: ResponseData = await getOrderByHash(hash)
      currentOrder.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch order'
      console.error('Error fetching order by hash:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOrdersByStatus = (status: string) => {
    return orders.value.filter(order => order.status === status)
  }

  const getOrderByReference = (reference: string) => {
    return orders.value.find(order => order.reference === reference)
  }

  const clearCurrentOrder = () => {
    currentOrder.value = null
  }

  return {
    // State
    orders,
    currentOrder,
    loading,
    error,

    // Actions
    fetchUserOrders,
    submitOrder,
    fetchOrderById,
    fetchOrderByHash,
    getOrdersByStatus,
    getOrderByReference,
    clearCurrentOrder
  }
})