export default interface Category {
  id: null
  name: string
  slug: string
  parentId: number
  order: number
  code: string
  description: string
  images: []
  createdAt: string
  isActive: boolean
  children: Category[] | null
  deletedAt: string,
  publishedAt: string

}