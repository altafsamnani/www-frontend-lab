import { ref } from 'vue'
import { defineStore } from 'pinia'
import type Product from '@/types/Product'
import type ProductText from '@/types/ProductText'
import type ProductContainer from '@/types/ProductContainer'
import type ProductFeature from '@/types/ProductFeature'
import type ResponseData from '@/types/ResponseData'
import { getProducts, editProduct, editProductContainers, patchProduct, patchProductTexts, patchProductContainers, patchProductImages, getImages, getTexts, patchBulkProducts, getFeatures, patchProductFeatures, getProductOptions } from '../http/products'

export const useProductStore = defineStore('productStore', () => {
  const product = ref([])
  const products = ref([])
  const productsExtra = ref([])
  const productImages = ref([])

  const fetchAllProducts = async (params: string[]) => {
    const response: ResponseData = await getProducts(params)
    products.value = response.data
    productsExtra.value = response.extra
  }

  const fetchEditProduct = async (id: string|string[]) => {
    const { data } = await editProduct(id)
    product.value = data
  }

  const fetchEditProductContainers = async (id: string|string[]) => {
    const { data } = await editProductContainers(id)
    product.value = data
  }

  const fetchProductImages = async (id: string|string[]) => {
    const { data } = await getImages(id)
    productImages.value = data
  }

  const fetchProductTexts = async (id: string|string[]) => {
    const { data } = await getTexts(id)
    product.value = data
  }

  const fetchProductFeatures = async (id: string|string[]) => {
    const { data } = await getFeatures(id)
    product.value = data
  }

  const updateProduct = async (id: string|string[], payload: Product) => {
    await patchProduct(id, payload)
  }

  const updateBulkProducts = async (payload: Product) => {
    await patchBulkProducts(payload)
  }

  const updateProductTexts = async (id: string|string[], payload: ProductText) => {
    await patchProductTexts(id, payload)
  }

  const updateProductContainers = async (id: string|string[], payload: ProductContainer) => {
    await patchProductContainers(id, payload)
  }

   const updateProductFeatures = async (id: string|string[], payload: ProductFeature) => {
    await patchProductFeatures(id, payload)
  }

  const updateProductImages = async (id: string|string[], payload: Product) => {
    await patchProductImages(id, payload)
  }

  const productOptions = ref([])
  const fetchProductsOptions = async (search: string[]) => {
    const { data } = await getProductOptions({ search: search })
    productOptions.value = data
  }

  return {
    products,
    productsExtra,
    product,
    productImages,
    productOptions,
    fetchAllProducts,
    fetchEditProduct,
    fetchProductImages,
    fetchProductTexts,
    fetchProductFeatures,
    fetchEditProductContainers,
    fetchProductsOptions,
    updateProduct,
    updateBulkProducts,
    updateProductTexts,
    updateProductContainers,
    updateProductFeatures,
    updateProductImages
  }
})
