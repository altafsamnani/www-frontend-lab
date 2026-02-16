import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { ApplicationInput } from '@/types/Application'

/**
 * Create a new application (registration or company edit request)
 * For 'create' type - public endpoint, no auth required
 * For 'edit' type - requires authentication and manager role
 */
export const createApplication = (data: ApplicationInput): Promise<AxiosResponse> => {
  // Use different endpoint based on type
  if (data.type === 'create') {
    return api.post('/register', data)
  }
  return api.post('/applications', data)
}

/**
 * Public registration endpoint
 */
export const registerClient = (data: ApplicationInput): Promise<AxiosResponse> => {
  return api.post('/register', data)
}
