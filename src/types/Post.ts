export interface PostImage {
  id: number
  name?: string
  fileName?: string
  url?: string
  urlFull?: string
  order?: number
}

export default interface Post {
  id: number
  title: string
  slug: string | null
  excerpt: string | null
  body?: string | null
  category: string | null
  readTime: number | null
  sticky: boolean
  customLink: string | null
  noLink: boolean
  restricted: boolean
  images: PostImage[]
  publishedAt: string | null
}
