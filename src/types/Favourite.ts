export interface Favourite {
  id: string
  userId: string
  productId: string
  articleNr: string
  name: string
  price: any
  thumbnail: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface FavouritesList {
  data: Favourite[]
  extra: {
    totalCount: number
    page: number | null
  }
}

export interface FavouriteInput {
  productId: string
}
