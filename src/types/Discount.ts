export interface ProductDiscount {
  originalPrice: number | null
  discountPercentage: number
  discountAmount: number
  netPrice: number
  discountType: 'product_specific' | 'discount_code' | null
  discountDescription: string | null
  hasDiscount: boolean
}

export default ProductDiscount
