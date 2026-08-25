import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type {
  CreateRmaPayload,
  UpdateRmaPayload,
  CreateRmaItemPayload,
  UpdateRmaItemPayload,
} from '@/types/Rma'

// RMA Config (DB-driven lookups)
export const getRmaConfig = (): Promise<AxiosResponse> => api.get('/rma-config')

// RMA endpoints
export const getUserRmas = (params?: any): Promise<AxiosResponse> => api.get('/rmas', { params })

export const getRmaById = (id: string): Promise<AxiosResponse> => api.get(`/rmas/${id}`)

export const createRma = (data: CreateRmaPayload): Promise<AxiosResponse> => api.post('/rmas', data)

export const updateRma = (id: string, data: UpdateRmaPayload): Promise<AxiosResponse> =>
  api.patch(`/rmas/${id}`, data)

export const deleteRma = (id: string): Promise<AxiosResponse> => api.delete(`/rmas/${id}`)

export const submitRma = (id: string): Promise<AxiosResponse> => api.post(`/rmas/${id}/submit`, {})

// RMA Item endpoints
export const createRmaItem = (rmaId: string, data: CreateRmaItemPayload): Promise<AxiosResponse> =>
  api.post(`/rmas/${rmaId}/items`, data)

export const updateRmaItem = (
  rmaId: string,
  itemId: string,
  data: UpdateRmaItemPayload
): Promise<AxiosResponse> => api.patch(`/rmas/${rmaId}/items/${itemId}`, data)

export const deleteRmaItem = (rmaId: string, itemId: string): Promise<AxiosResponse> =>
  api.delete(`/rmas/${rmaId}/items/${itemId}`)

// Tips endpoint - dynamic tips based on product, category, reason, and detail
export const getRmaTips = (params: {
  sku?: number
  categoryId?: number
  reasonId?: number
  detailCode?: string
}): Promise<AxiosResponse> => api.get('/rmas/tips', { params })

// Reason details with inline tips
export const getRmaReasonDetails = (reasonId: number): Promise<AxiosResponse> =>
  api.get('/rmas/reason-details', { params: { reasonId } })
