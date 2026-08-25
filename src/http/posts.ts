import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type Query from '@/types/Query'
import type Post from '@/types/Post'

export const getPosts = (params?: Query): Promise<AxiosResponse> => {
  return api.get('/posts', { params })
}

export const getPostsFacets = (params?: Query): Promise<AxiosResponse> => {
  return api.get('/posts', { params: { ...params, facetsOnly: 1 } })
}

export const getPost = (slug: string): Promise<AxiosResponse<Post>> => {
  return api.get(`/posts/${slug}`)
}
