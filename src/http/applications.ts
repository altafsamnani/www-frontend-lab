import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { ApplicationInput, UserApplicationInput, Application } from '@/types/Application'

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
 * Public registration endpoint for companies
 */
export const registerClient = (data: ApplicationInput): Promise<AxiosResponse> => {
  return api.post('/register', data)
}

/**
 * Public registration endpoint for users (user_create type)
 * No auth required - creates application that company managers can approve
 */
export const registerUser = (data: UserApplicationInput): Promise<AxiosResponse> => {
  return api.post('/register/user', data)
}

/**
 * Create a user application (user_create type)
 * Requires authentication and edit users permission
 */
export const createUserApplication = (data: UserApplicationInput): Promise<AxiosResponse> => {
  return api.post('/applications', data)
}

/**
 * Get list of user applications for the company
 * Requires authentication and edit users permission
 */
export const getUserApplications = (
  params?: Record<string, unknown>
): Promise<AxiosResponse<Application[]>> => {
  return api.get('/applications', { params })
}

/**
 * Get a specific user application
 * Requires authentication and edit users permission
 */
export const getUserApplication = (id: number): Promise<AxiosResponse<Application>> => {
  return api.get(`/applications/${id}`)
}

/**
 * Accept a user application (creates user for the company)
 * Requires authentication and edit users permission
 */
export const acceptUserApplication = (id: number): Promise<AxiosResponse> => {
  return api.put(`/applications/${id}/accept`, {})
}

/**
 * Deny/delete a user application
 * Requires authentication and edit users permission
 */
export const deleteUserApplication = (id: number): Promise<AxiosResponse> => {
  return api.delete(`/applications/${id}`)
}

/**
 * Generate an invite link for user registration
 * Requires authentication and edit users permission
 * @param role - Optional role to assign ('user' or 'manager')
 */
export const getInviteLink = (
  role?: string
): Promise<AxiosResponse<{ inviteCode: string; companyName: string; role: string }>> => {
  return api.get('/users/invite', { params: role ? { role } : {} })
}

/**
 * Verify an invite code and get company information
 * Public endpoint - no auth required
 */
export const verifyInviteCode = (
  code: string
): Promise<AxiosResponse<{ companyId: number; companyName: string; role: string }>> => {
  return api.get('/register/user/verify', { params: { code } })
}
