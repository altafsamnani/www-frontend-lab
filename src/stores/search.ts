import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getSearch,
  getProduct,
  getDocuments,
  getSuggestions,
  getProductCrosssells
} from '@/http/search'
import type Paginator from '@/types/Paginator'
import type Query from '@/types/Query'
import type Facets from '@/types/Facets'
import type ProductDetails from '@/types/ProductDetails'
import type { CrosssellData } from '@/types/Crosssell'

export const useSearchStore = defineStore('searchStore', () => {
  const product = ref<ProductDetails>({} as ProductDetails)
  const products = ref<ProductDetails[]>([])
  const facets = ref<Facets>({} as Facets)
  const paginator = ref<Paginator>({} as Paginator)
  const documents = ref<any>({
    manual: [],
    software: [],
    firmware: [],
    document: []
  })
  const documentsFacets = ref<Facets>({} as Facets)
  const documentsPaginator = ref<Paginator>({} as Paginator)
  const loading = ref(false)
  const crosssells = ref<CrosssellData>({ products: [], categories: [] })

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

  const fetchDocuments = async (params?: Query) => {
    loading.value = true
    const { data, extra } = await getDocuments(params)

    documents.value = data
    documentsFacets.value = extra.facets
    documentsPaginator.value = extra.paginator
    loading.value = false
  }

  const fetchSuggestions = async (query: string, limit: number = 10) => {
    const { data } = await getSuggestions(query, limit)
    return data
  }

  const fetchProductCrosssells = async (id: string | string[]) => {
    const { data } = await getProductCrosssells(id)
    crosssells.value = data
  }

  return {
    product,
    products,
    facets,
    paginator,
    documents,
    documentsFacets,
    documentsPaginator,
    loading,
    crosssells,
    fetchSearch,
    fetchProduct,
    fetchDocuments,
    fetchSuggestions,
    fetchProductCrosssells
  }
})
