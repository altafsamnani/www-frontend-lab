import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSearch } from '@/http/search'
import type Paginator from '@/types/Paginator'
import type Query from '@/types/Query'
import type Facets from '@/types/Facets'


export const useSearchStore = defineStore('searchStore', () => {
  const products = ref([])
  const facets = ref<Facets>( {} as Facets)
  const paginator = ref<Paginator>({} as Paginator)

  const fetchSearch = async (params?: Query) => {
    const { data, extra } = await getSearch(params)
    
    products.value = data;
    facets.value = extra.facets;
    paginator.value = extra.paginator
  }

  return {
    products,
    facets,
    paginator,
    fetchSearch
  }
})
