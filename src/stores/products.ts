import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProductOverlays } from '../http/search'

// Define overlay type
interface ProductOverlay {
  id: number
  name: string
  positionId?: number
  images?: Array<{
    id: number
    url: string
  }>
}

export const useProductStore = defineStore('productStore', () => {
  const productOverlays = ref<ProductOverlay[]>([])

  const fetchProductOverlays = async (id: number | string) => {
    const { data } = await getProductOverlays(id)
    productOverlays.value = data || []
  }

  return {
    productOverlays,
    fetchProductOverlays
  }
})