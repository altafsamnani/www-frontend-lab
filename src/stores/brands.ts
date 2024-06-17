import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBrands, editBrand, postBrand, patchBrand, destroyBrand, recoverBrand, listBrandOptions } from '@/http/brands'
import type Brand from '@/types/Brand'

export const useBrandStore = defineStore('brandStore', () => {
  const brands = ref([])

  const fetchAllBrands = async (params: string[]) => {
    const { data } = await getBrands(params)
    brands.value = data;
  }

  const brand = ref([])
  const fetchBrand = async (id: string | string[]) => {
    const { data } = await editBrand(id)
    brand.value = data;
  }

  const createBrand = async (payload: Brand) => {
    await postBrand(payload)
  }

  const updateBrand = async (id: string|string[], payload: Brand) => {
    await patchBrand(id, payload)
  }

  const deleteBrand = async (id: string|string[]) => {
    await destroyBrand(id)
  }

  const restoreBrand = async (id: string|string[]) => {
    await recoverBrand(id)
  }

  const brandOptions = ref([])
  const listBrands = async () => {
    const { data } = await listBrandOptions()
    brandOptions.value = data
  }

  return {
    brands,
    brand,
    fetchBrand,
    fetchAllBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    restoreBrand,
    listBrands,
    brandOptions
  }
})
