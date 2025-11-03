import type Query from '@/types/Query'
import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'

export const getSearch = (params?: Query) =>
  api.get('/search', {
    params: params
  })

export const getProduct = (id) => api.get(`/search/products/${id}`)

export const getDocuments = (params?: Query) =>
  api.get('/search/documents', {
    params: params
  })

export const getSuggestions = (query: string, limit: number = 10): Promise<AxiosResponse> =>
  api.get('/search/suggest', {
    params: { q: query, limit }
  })
