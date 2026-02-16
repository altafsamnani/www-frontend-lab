import type Containers from './Containers'
import type { ProductDiscount } from './Discount'

export interface Category {
  id: number
  name: string
  slug: string
  parentId: number
  parentSlug: string | null
}

export interface FilterIcon {
  id: number
  fileName: string
  name: string
  order: number
  url: string
  urlFull: string
}

export default interface ProductDetails {
  id: number | null
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
  filterIcons?: FilterIcon[]
  discount: ProductDiscount | null
  createdAt: string
  updatedAt: string
}
