import type Brand from '@/types/Brand';
import { api } from './apiInstances'

export const getBrands = (params) => api.get('/brands', {
    params: params
})
export const editBrand = (id: string|string[]) => api.get(`/brands/${id}/edit`)
export const postBrand = (payload:Brand) => api.post(`/brands`, payload)
export const patchBrand = (id: string|string[], payload:Brand) => api.patch(`/brands/${id}`, payload);
export const destroyBrand = (id: string|string[]) => api.delete(`/brands/${id}`, {data: {}})
export const recoverBrand = (id: string|string[]) => api.put(`/brands/${id}/restore`, {payload: {}})
export const listBrandOptions = () => api.get('/brands/list')
