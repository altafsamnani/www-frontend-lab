import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Favourite, FavouritesList } from '@/types/Favourite'
import { getFavourites, addFavourite, removeFavourite } from '@/http/favourites'
import type ResponseData from '@/types/ResponseData'

export const useFavouritesStore = defineStore('favourites', () => {
  const favourites = ref<Favourite[]>([])
  const favouritesExtra = ref<any>({})
  const loading = ref(false)
  const isInitialized = ref(false)

  const fetchFavourites = async (params?: any) => {
    loading.value = true
    const response: ResponseData = await getFavourites(params)
    favourites.value = response.data
    favouritesExtra.value = response.extra
    loading.value = false
    console.log('Fetched favourites:', favourites.value)
  }

  const initializeStore = async (force = false) => {
    if (isInitialized.value && !force) {
      return
    }

    try {
      await fetchFavourites()
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to initialize favourites store:', error)
      throw error
    }
  }

  const addToFavourites = async (productId: string) => {
    loading.value = true
    const { data } = await addFavourite({ productId })
    await fetchFavourites()
    loading.value = false
    return data
  }

  const removeFromFavourites = async (productId: string) => {
    loading.value = true
    const { data } = await removeFavourite(productId)
    await fetchFavourites()
    loading.value = false
    return data
  }

  const isFavourite = (productId: string) => {
    return favourites.value?.some((fav) => fav.productId === productId) ?? false
  }

  const clearFavourites = () => {
    favourites.value = []
    totalCount.value = 0
    currentPage.value = 1
  }

  return {
    favourites,
    favouritesExtra,
    loading,
    isInitialized,
    fetchFavourites,
    initializeStore,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    clearFavourites
  }
})
