import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getPosts, getPostsFacets, getPost } from '@/http/posts'
import type Post from '@/types/Post'
import type PostFacets from '@/types/PostFacets'
import type Paginator from '@/types/Paginator'
import type Query from '@/types/Query'
import type ResponseData from '@/types/ResponseData'

export const usePostsStore = defineStore('postsStore', () => {
  const posts = ref<Post[]>([])
  const homePosts = ref<Post[]>([])
  const heroPosts = ref<Post[]>([])
  const post = ref<Post | null>(null)
  const facets = ref<PostFacets>({} as PostFacets)
  const paginator = ref<Paginator>({} as Paginator)

  const fetchPosts = async (params?: Query) => {
    const response: ResponseData = await getPosts(params)

    posts.value = response.data
    paginator.value = response.extra?.paginator ?? ({} as Paginator)
  }

  const fetchHomePosts = async () => {
    const response: ResponseData = await getPosts({
      filter: [
        { key: 'homepage', op: 'equals', value: true },
        { key: 'sticky', op: 'notEquals', value: true },
      ],
      order: [{ field: 'updatedAt', dir: 'desc' }],
      page: { size: 12, number: 1 },
    } as Query)

    homePosts.value = response.data.slice(0, 3)
  }

  const fetchHeroPosts = async () => {
    const response: ResponseData = await getPosts({
      filter: [
        { key: 'homepage', op: 'equals', value: true },
        { key: 'sticky', op: 'equals', value: true },
      ],
      order: [{ field: 'publishedAt', dir: 'desc' }],
      page: { size: 10, number: 1 },
    } as Query)

    heroPosts.value = response.data.slice(0, 5)
  }

  const fetchPostsFacets = async (params?: Query) => {
    const response: ResponseData = await getPostsFacets(params)

    facets.value = response.extra?.facets ?? ({} as PostFacets)
  }

  const fetchPost = async (slug: string) => {
    const { data } = await getPost(slug)

    post.value = data
    return data
  }

  return {
    posts,
    homePosts,
    heroPosts,
    post,
    facets,
    paginator,
    fetchPosts,
    fetchHomePosts,
    fetchHeroPosts,
    fetchPostsFacets,
    fetchPost,
  }
})
