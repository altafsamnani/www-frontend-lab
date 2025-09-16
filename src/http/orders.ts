import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { PlaceOrderPayload } from '@/types/Order'

export const getUserOrders = (): Promise<AxiosResponse> => api.get('/orders/user')

export const placeOrder = (orderData: PlaceOrderPayload): Promise<AxiosResponse> =>
  api.post('/orders', orderData)

export const getOrderById = (orderId: number) => api.get(`/orders/${orderId}`)

export const getOrderByHash = (hash: string) => api.get(`/orders/hash/${hash}`)

export const updateOrderStatus = (orderId: number, status: string) =>
  api.patch(`/orders/${orderId}/status`, { status })