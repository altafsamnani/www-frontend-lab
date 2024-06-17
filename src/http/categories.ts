import type Category from '@/types/Category'
import { api } from './apiInstances'

export const getCategories = (id: string | string[]) => api.get(`/categories/${id}`)

export const getTreeCategories = () => api.get(`/categories/tree`)

export const searchCategories = (searchText: string) =>  api.get(`/categories/`)

export const postCategory = (payload: Category) => api.post(`/categories`, payload)

export const patchCategory = (id: string | string[], payload: Category) =>
  api.patch(`/categories/${id}`, payload)

export const destroyCategory = (id: string|string[]) => api.delete(`/categories/${id}`, {data: {}})

export const recoverCategory = (id: string|string[]) => api.put(`/categories/${id}/restore`, {payload: {}})