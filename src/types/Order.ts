export interface Order {
  id: number
  userId: number
  reference?: string
  status: string
  statusName: string
  totalAmount: number
  totalDiscount?: number
  totalItems: number
  pickup: boolean
  remarks?: string
  deliveryBefore?: string
  deliveryDate?: string
  createdAt: string
  updatedAt: string
}
export interface PlaceOrderPayload {
  shippingId?: number
  billingId: number
  pickup: boolean
  reference: string
  remarks: string
  comments: string
  deliveryDate: string
}
