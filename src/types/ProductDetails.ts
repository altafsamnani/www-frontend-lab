import type Containers from './Containers'

export interface Category {
  id: number
  name: string
  slug: string
  parentId: number
  parentSlug: string | null
}

export default interface ProductDetails {
  id: null
  name: string
  description: string
  price: number
  category: Category[]
  categories: Category[]
  attributes: any[]
  containers: Containers
  reviews: Record<string, string>
  brand: []
  stock: {
    level: number
    stock_slug: string
  }
  images: []
  createdAt: string
  updatedAt: string
}
