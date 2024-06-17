import { baseApi, api, loginApi } from './apiInstances'

export const csrfCookie = () => baseApi.get('/sanctum/csrf-cookie')

export const login = (credentials: object) => loginApi.post('/tokens', credentials)

export const register = (user: object) => api.post('/auth/register', user)

export const logout = () => api.delete('/tokens')

export const getUser = () => api.get('/user')
