import type Query from '@/types/Query'
import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'

export const getSearch = (params?: Query) =>
  api.get('/search', {
    params: params,
  })

export const getSearchFacets = (params?: Query): Promise<AxiosResponse> =>
  api.get('/search', {
    params: { ...params, facetsOnly: 1 },
  })

export const getProduct = (id: number | string | string[]) => api.get(`/search/products/${id}`)

export const getProductOverlays = (id: number | string | string[]) =>
  api.get(`/products/${id}/overlays`)

export const getDocuments = (params?: Query) =>
  api.get('/search/documents', {
    params: params,
  })

export const getSuggestions = (query: string, limit: number = 10): Promise<AxiosResponse> =>
  api.get('/search/suggest', {
    params: { q: query, limit },
  })

export const getProductCrosssells = (id: number | string | string[]): Promise<AxiosResponse> =>
  api.get(`/products/${id}/crosssells`)

export const getProductCrosssellProducts = (
  id: number | string | string[]
): Promise<AxiosResponse> => api.get(`/products/${id}/crosssell-products`)

export const getProductCrosssellCategories = (
  id: number | string | string[]
): Promise<AxiosResponse> => api.get(`/products/${id}/crosssell-categories`)
