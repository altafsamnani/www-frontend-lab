export interface CrosssellProduct {
  id: number
  name: string
  article_no?: string
  price?: number
  stock?: {
    level: number
    stock_slug: string
  }
  images?: any[]
  grouping_title?: string
  order?: number
}

export interface CrosssellCategory {
  id: number
  name: string
  slug: string
  parent_id?: number
  grouping_title?: string
  order?: number
}

export interface CrosssellData {
  products: CrosssellProduct[]
  categories: CrosssellCategory[]
}
