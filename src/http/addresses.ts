import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { Address, AddressInput } from '@/types/Address'

export const getAddresses = (params?: any): Promise<AxiosResponse> => {
  return api.get('/addresses', { params })
}

export const getMyAddresses = (): Promise<AxiosResponse<Address[]>> => {
  return api.get('/addresses/my')
}

export const getAddressOptions = (): Promise<AxiosResponse> => {
  return api.get('/addresses/options')
}

export const getAddress = (id: number): Promise<AxiosResponse<Address>> => {
  return api.get(`/addresses/${id}/edit`)
}

export const createAddress = (data: AddressInput): Promise<AxiosResponse> => {
  return api.post('/addresses', data)
}

export const updateAddress = (
  id: number,
  data: AddressInput
): Promise<AxiosResponse> => {
  return api.patch(`/addresses/${id}`, data)
}

export const deleteAddress = (id: number): Promise<AxiosResponse> => {
  return api.delete(`/addresses/${id}`)
}
