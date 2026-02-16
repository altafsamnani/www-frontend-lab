import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Address,
  AddressInput,
  AddressList,
  AddressOption
} from '@/types/Address'
import {
  getAddresses,
  getMyAddresses,
  getAddressOptions,
  getAddress,
  createAddress as createAddressApi,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi
} from '@/http/addresses'

export const useAddressStore = defineStore('addresses', () => {
  const addresses = ref<Address[]>([])
  const myAddresses = ref<Address[]>([])
  const addressOptions = ref<AddressOption[]>([])
  const currentAddress = ref<Address | null>(null)
  const loading = ref(false)
  const totalCount = ref(0)
  const currentPage = ref(1)

  const fetchAddresses = async (params?: any) => {
    loading.value = true
    const { data } = await getAddresses(params)
    const addressList = data as AddressList
    addresses.value = addressList.data
    totalCount.value = addressList.totalCount
    currentPage.value = addressList.page || 1
    loading.value = false
  }

  const fetchMyAddresses = async () => {
    loading.value = true
    const { data } = await getMyAddresses()
    myAddresses.value = data
    loading.value = false
  }

  const fetchAddressOptions = async () => {
    const { data } = await getAddressOptions()
    addressOptions.value = data
  }

  const fetchAddress = async (id: number) => {
    loading.value = true
    const { data } = await getAddress(id)
    currentAddress.value = data
    loading.value = false
    return data
  }

  const createAddress = async (addressData: AddressInput) => {
    loading.value = true
    const { data } = await createAddressApi(addressData)
    loading.value = false
    return data
  }

  const updateAddress = async (id: number, addressData: AddressInput) => {
    loading.value = true
    const { data } = await updateAddressApi(id, addressData)
    loading.value = false
    return data
  }

  const deleteAddress = async (id: number) => {
    loading.value = true
    await deleteAddressApi(id)
    // Don't refresh here, let the component handle it
    loading.value = false
  }

  const clearCurrentAddress = () => {
    currentAddress.value = null
  }

  return {
    addresses,
    myAddresses,
    addressOptions,
    currentAddress,
    loading,
    totalCount,
    currentPage,
    fetchAddresses,
    fetchMyAddresses,
    fetchAddressOptions,
    fetchAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    clearCurrentAddress
  }
})
