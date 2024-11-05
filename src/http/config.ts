import { api } from './apiInstances'

export const getConfig = (params?: Object) => api.get('/config', {
    params: params
})
