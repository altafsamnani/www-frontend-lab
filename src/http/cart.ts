import { api } from './apiInstances'
import type { AddToCartPayload } from '@/types/Cart'

export const getCart = () => api.get('/cart')

export const addToCart = (payload: AddToCartPayload) => api.post('/cart/add', payload)

export const updateCartItem = (cartItemId: number, payload: Partial<AddToCartPayload>) =>
  api.patch(`/cart/${cartItemId}`, payload)

export const removeFromCart = (cartItemId: number) =>
  api.delete(`/cart/removeitem/${cartItemId}`, { data: {} })

export const clearCart = () => api.delete('/cart/clear')
