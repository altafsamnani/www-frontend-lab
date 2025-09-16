import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { ShippingAddress, ShippingAddressInput } from '@/types/ShippingAddress'

export const getShippingAddresses = (params?: any): Promise<AxiosResponse> => {
  return api.get('/shipping', { params })
}

export const getMyShippingAddresses = (): Promise<AxiosResponse<ShippingAddress[]>> => {
  return api.get('/shipping/my')
}

export const getShippingAddressOptions = (): Promise<AxiosResponse> => {
  return api.get('/shipping/options')
}

export const getShippingAddress = (id: number): Promise<AxiosResponse<ShippingAddress>> => {
  return api.get(`/shipping/${id}/edit`)
}

export const createShippingAddress = (data: ShippingAddressInput): Promise<AxiosResponse> => {
  return api.post('/shipping', data)
}

export const updateShippingAddress = (
  id: number,
  data: ShippingAddressInput
): Promise<AxiosResponse> => {
  return api.patch(`/shipping/${id}`, data)
}

export const deleteShippingAddress = (id: number): Promise<AxiosResponse> => {
  return api.delete(`/shipping/${id}`)
}