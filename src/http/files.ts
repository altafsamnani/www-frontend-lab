import { api, uploadApi } from './apiInstances'
import type FileCollection from '@/types/FileCollection'

export const getFiles = (params: any) =>
  api.get('/files', {
    params: params
  })

export const postFileCollection = (payload: FileCollection) =>
  api.post(`/files/collection`, payload)

export const postFiles = (payload: FormData | Object) => {
  if (payload instanceof FormData) {
    return uploadApi.post(`/files`, payload)
  } else {
    return api.post(`/files`, payload)
  }
}

export const postLink = (payload: Object) => api.post(`/files/link`, payload)

export const updateFile = (id: number | string | string[], payload: Object) =>
  api.post(`/files/${id}`, payload)

// Additional file operations (previously in downloads.ts but using /files endpoints)
export const getFileEdit = (id: string | string[] | number) => api.get(`/files/${id}/edit`)
export const deleteFile = (id: string | string[]) => api.delete(`/files/${id}`, { data: {} })
export const restoreFile = (id: string | string[]) =>
  api.put(`/files/${id}/restore`, { payload: {} })
