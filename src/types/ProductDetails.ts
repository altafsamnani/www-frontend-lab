export default interface ProductDetails {
    id: null
    name: string
    description: string
    price: number
    category: []
    attributes: []
    brand: []
    stock: {
        level: number
        stock_slug: string
    }
    images: []
    createdAt: string
    updatedAt: string
}