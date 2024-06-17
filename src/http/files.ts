import { api, uploadApi } from './apiInstances'
import type FileCollection from '@/types/FileCollection'

export const postFileCollection = (payload: FileCollection) => api.post(`/files/collection`, payload)

export const postFiles = (payload: FormData) => uploadApi.post(`/files`, payload)

export const postLink = (payload: Object) => api.post(`/files/link`, payload)