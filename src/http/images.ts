import { api, uploadApi } from './apiInstances'
import type ImageCollection from '@/types/ImageCollection'

export const postImageCollection = (payload: ImageCollection) => api.post(`/images/collection`, payload)

export const postImages = (payload: FormData) => uploadApi.post(`/images`, payload)