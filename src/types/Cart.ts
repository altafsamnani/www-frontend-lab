export interface CartItem {
  id: string
  userId: number
  productId: number
  articleNr: string
  name: string
  thumbnail?: string
  quantity: number
  price?: number
  discountPercentage: number
  discountActionName?: string
  totalPrice: number
  netPrice: number
  totalNetPrice: number
  createdAt: string
  updatedAt: string
}

export interface CartSummary {
  totalItems: number
  totalAmount: number
  totalDiscount: number
  itemCount: number
}

export interface AddToCartPayload {
  productId: number
  quantity: number
  price?: number
  discountPercentage?: number
  discountActionName?: string
}

export interface CartResponse {
  items: CartItem[]
  summary: CartSummary
}

export default CartItem
