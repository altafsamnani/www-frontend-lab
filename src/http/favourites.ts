import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { FavouritesList, FavouriteInput, Favourite } from '@/types/Favourite'

export const getFavourites = (params?: any): Promise<AxiosResponse<FavouritesList>> => {
  return api.get('/favourites', { params })
}

export const addFavourite = (data: FavouriteInput): Promise<AxiosResponse> => {
  return api.post('/favourites', data)
}

export const removeFavourite = (productId: string): Promise<AxiosResponse> => {
  return api.delete(`/favourites/product/${productId}`, { data: {} })
}