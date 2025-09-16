import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  ShippingAddress,
  ShippingAddressInput,
  ShippingAddressList,
  ShippingAddressOption
} from '@/types/ShippingAddress'
import {
  getShippingAddresses,
  getMyShippingAddresses,
  getShippingAddressOptions,
  getShippingAddress,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress
} from '@/http/shippingAddresses'

export const useShippingAddressesStore = defineStore('shippingAddresses', () => {
  const shippingAddresses = ref<ShippingAddress[]>([])
  const myShippingAddresses = ref<ShippingAddress[]>([])
  const shippingAddressOptions = ref<ShippingAddressOption[]>([])
  const currentShippingAddress = ref<ShippingAddress | null>(null)
  const loading = ref(false)
  const totalCount = ref(0)
  const currentPage = ref(1)

  const fetchShippingAddresses = async (params?: any) => {
    loading.value = true
    const { data } = await getShippingAddresses(params)
    const addressList = data as ShippingAddressList
    shippingAddresses.value = addressList.data
    totalCount.value = addressList.totalCount
    currentPage.value = addressList.page || 1
    loading.value = false
  }

  const fetchMyShippingAddresses = async () => {
    loading.value = true
    const { data } = await getMyShippingAddresses()
    myShippingAddresses.value = data
    loading.value = false
  }

  const fetchShippingAddressOptions = async () => {
    const { data } = await getShippingAddressOptions()
    shippingAddressOptions.value = data
  }

  const fetchShippingAddress = async (id: number) => {
    loading.value = true
    const { data } = await getShippingAddress(id)
    currentShippingAddress.value = data

    console.log('Fetched Shipping Address:', data)
    loading.value = false
    return data
  }

  const createAddress = async (addressData: ShippingAddressInput) => {
    loading.value = true
    const { data } = await createShippingAddress(addressData)
    await fetchMyShippingAddresses()
    loading.value = false
    return data
  }

  const updateAddress = async (id: number, addressData: ShippingAddressInput) => {
    loading.value = true
    const { data } = await updateShippingAddress(id, addressData)
    await fetchMyShippingAddresses()
    loading.value = false
    return data
  }

  const deleteAddress = async (id: number) => {
    loading.value = true
    await deleteShippingAddress(id)
    await fetchMyShippingAddresses()
    loading.value = false
  }

  const clearCurrentAddress = () => {
    currentShippingAddress.value = null
  }

  return {
    shippingAddresses,
    myShippingAddresses,
    shippingAddressOptions,
    currentShippingAddress,
    loading,
    totalCount,
    currentPage,
    fetchShippingAddresses,
    fetchMyShippingAddresses,
    fetchShippingAddressOptions,
    fetchShippingAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    clearCurrentAddress
  }
})