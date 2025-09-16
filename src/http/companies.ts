import type Company from '@/types/Company'
import { api } from './apiInstances'

export const getCompanies = (params) =>
  api.get('/companies', {
    params: params
  })
export const editCompany = (id: string | string[]) => api.get(`/companies/${id}/edit`)
export const postCompany = (payload: Company) => api.post(`/companies`, payload)
export const patchCompany = (id: string | string[], payload: Company) =>
  api.patch(`/companies/${id}`, payload)
export const destroyCompany = (id: string | string[]) =>
  api.delete(`/companies/${id}`, { data: {} })
export const recoverCompany = (id: string | string[]) =>
  api.put(`/companies/${id}/restore`, { payload: {} })
export const getCompanyOptions = (payload) => api.get('/companies/list', { params: payload })