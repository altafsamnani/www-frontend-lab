import type { ProductDiscount } from './Discount'

export default interface SearchProduct {
    id: number | null
    name: string
    images: []
    price: number
    description: string
    category: []
    brand: []
    stock: []
    discount: ProductDiscount | null
    createdAt: string
    updatedAt: string
}