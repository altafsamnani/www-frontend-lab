import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { CompanyUser, CompanyUserList, CompanyUserUpdate } from '@/types/User'

export const getCompanyUsers = (params?: any): Promise<AxiosResponse<CompanyUserList>> => {
  return api.get('/users', { params })
}

export const getCompanyUser = (id: number): Promise<AxiosResponse<CompanyUser>> => {
  return api.get(`/users/${id}`)
}

export const updateCompanyUser = (id: number, data: CompanyUserUpdate): Promise<AxiosResponse> => {
  return api.patch(`/users/${id}`, data)
}
