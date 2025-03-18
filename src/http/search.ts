import type Query from '@/types/Query'
import { api } from './apiInstances'

export const getSearch = (params?: Query) => api.get('/search', {
    params: params
}) 