import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { UserProfile, UserProfileUpdate } from '@/types/User'
import type { Company } from '@/types/Company'

export const getProfile = (): Promise<AxiosResponse<UserProfile>> => {
  return api.get('/profile')
}

export const updateProfile = (data: UserProfileUpdate): Promise<AxiosResponse> => {
  return api.patch('/profile', data)
}

export const getMyCompany = (): Promise<AxiosResponse<Company>> => {
  return api.get('/company')
}
