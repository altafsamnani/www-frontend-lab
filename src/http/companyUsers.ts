import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { CompanyUser, CompanyUserList, CompanyUserUpdate } from '@/types/User'

export const getCompanyUsers = (params?: any): Promise<AxiosResponse<CompanyUserList>> => {
  return api.get('/company-users', { params })
}

export const getCompanyUser = (id: number): Promise<AxiosResponse<CompanyUser>> => {
  return api.get(`/company-users/${id}`)
}

export const updateCompanyUser = (
  id: number,
  data: CompanyUserUpdate
): Promise<AxiosResponse> => {
  return api.patch(`/company-users/${id}`, data)
}
