import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type {
  ShippingAddress,
  ShippingAddressInput,
  ShippingAddressList,
  ShippingAddressOption
} from '@/types/ShippingAddress'

export const getShippingAddresses = (params?: any): Promise<AxiosResponse<ShippingAddressList>> => {
  return api.get('/shipping-addresses', { params })
}

export const getMyShippingAddresses = (): Promise<AxiosResponse<ShippingAddress[]>> => {
  return api.get('/shipping-addresses/my')
}

export const getShippingAddressOptions = (): Promise<AxiosResponse<ShippingAddressOption[]>> => {
  return api.get('/shipping-addresses/options')
}

export const getShippingAddress = (id: number): Promise<AxiosResponse<ShippingAddress>> => {
  return api.get(`/shipping-addresses/${id}`)
}

export const createShippingAddress = (data: ShippingAddressInput): Promise<AxiosResponse> => {
  return api.post('/shipping-addresses', data)
}

export const updateShippingAddress = (id: number, data: ShippingAddressInput): Promise<AxiosResponse> => {
  return api.patch(`/shipping-addresses/${id}`, data)
}

export const deleteShippingAddress = (id: number): Promise<AxiosResponse> => {
  return api.delete(`/shipping-addresses/${id}`)
}