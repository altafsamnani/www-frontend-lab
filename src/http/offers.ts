import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { CreateOfferPayload, UpdateOfferPayload, OfferSettings } from '@/types/Offer'

export const getUserOffers = (): Promise<AxiosResponse> => api.get('/offers')

export const getOfferById = (offerId: number): Promise<AxiosResponse> =>
  api.get(`/offers/${offerId}`)

export const getOfferByHash = (hash: string): Promise<AxiosResponse> =>
  api.get(`/offers/hash/${hash}`)

export const createOffer = (offerData: CreateOfferPayload): Promise<AxiosResponse> =>
  api.post('/offers', offerData)

export const updateOffer = (
  offerId: number,
  offerData: UpdateOfferPayload
): Promise<AxiosResponse> => api.patch(`/offers/${offerId}`, offerData)

export const deleteOffer = (offerId: number): Promise<AxiosResponse> =>
  api.delete(`/offers/${offerId}`)

export const duplicateOffer = (offerId: number): Promise<AxiosResponse> =>
  api.post(`/offers/${offerId}/duplicate`, {})

export const addFavoritesToOffer = (
  offerId: number,
  favoriteIds: number[]
): Promise<AxiosResponse> => api.post(`/offers/${offerId}/add-favorites`, { favoriteIds })

// Global Offer Settings API
export const getUserOfferSettings = (): Promise<AxiosResponse> => api.get('/offer-settings')

export const saveUserOfferSettings = (settings: Partial<OfferSettings>): Promise<AxiosResponse> =>
  api.post('/offer-settings', settings)

// Offer Items API
export const getOfferItems = (offerId: number): Promise<AxiosResponse> =>
  api.get(`/offers/${offerId}/items`)

export const getOfferItemById = (offerId: number, itemId: number): Promise<AxiosResponse> =>
  api.get(`/offers/${offerId}/items/${itemId}`)

export const createOfferItem = (offerId: number, itemData: any): Promise<AxiosResponse> =>
  api.post(`/offers/${offerId}/items`, itemData)

export const updateOfferItem = (
  offerId: number,
  itemId: number,
  itemData: any
): Promise<AxiosResponse> => api.patch(`/offers/${offerId}/items/${itemId}`, itemData)

export const deleteOfferItem = (offerId: number, itemId: number): Promise<AxiosResponse> =>
  api.delete(`/offers/${offerId}/items/${itemId}`)

export const downloadOfferPdf = (hash: string): string => {
  const apiUrl = import.meta.env.VITE_API_URL
  return `${apiUrl}/offers/pdf/${hash}`
}

export const viewOfferPdf = (hash: string): string => {
  const apiUrl = import.meta.env.VITE_API_URL
  return `${apiUrl}/offers/pdf/${hash}/view`
}
