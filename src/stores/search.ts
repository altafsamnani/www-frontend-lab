import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSearch, getProduct } from '@/http/search'
import type Paginator from '@/types/Paginator'
import type Query from '@/types/Query'
import type Facets from '@/types/Facets'
import type ProductDetails from '@/types/ProductDetails'

export const useSearchStore = defineStore('searchStore', () => {
  const product = ref<ProductDetails>({} as ProductDetails)
  const products = ref<ProductDetails[]>([])
  const facets = ref<Facets>({} as Facets)
  const paginator = ref<Paginator>({} as Paginator)

  const fetchSearch = async (params?: Query) => {
    const { data, extra } = await getSearch(params)

    products.value = data
    facets.value = extra.facets
    paginator.value = extra.paginator
  }

  const fetchProduct = async (id: string | string[]) => {
    const { data } = await getProduct(id)

    product.value = data
  }

  return {
    product,
    products,
    facets,
    paginator,
    fetchSearch,
    fetchProduct
  }
})
