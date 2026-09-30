export interface Offer {
  id: string
  userId: number
  status: number
  statusName: string
  offerNumber?: string
  hash: string
  subject?: string
  offerDate?: string
  frontText?: string
  lastText?: string
  orderDiscount: number
  layout: number
  hidePricePp: boolean
  headerNo: boolean
  headerSize: number
  leftSize: number
  customerCompany?: string
  customerName?: string
  customerAddress?: string
  customerZipcode?: string
  customerCity?: string
  customerCountry: string
  customerEmail?: string
  shippingCompany?: string
  shippingName?: string
  shippingAddress?: string
  shippingZipcode?: string
  shippingCity?: string
  shippingCountry: string
  showFrontPage: boolean
  showLastPage: boolean
  totalItems: number
  totalAmount: number
  createdAt: string
  updatedAt: string
  items: OfferItem[]
}

export interface OfferItem {
  id?: string
  offerId?: number
  productId?: number
  quantity: number
  price: number
  netPrice: number
  customNetPrice: number
  total: number
  articleNr?: number
  name?: string
  description?: string
  orderDiscount: number
  priceGross?: number
  totalGross?: number
  order?: number
  pagebreak: boolean
  option: boolean
  nline: boolean
  folder: boolean
  thumbnail?: string
  createdAt?: string
  updatedAt?: string
}

export interface OfferSettings {
  id?: number
  userId?: number
  imageCollectionId?: number
  images?: Images[]
  noWarranty: boolean
  useOwnStationery: boolean
  headerNo: boolean
  headerSize: number
  leftMargin: number
  createdAt?: string
  updatedAt?: string
}

import type Images from './Images'

export interface CreateOfferPayload {
  status?: number
  subject?: string
  offerDate?: string
  frontText?: string
  lastText?: string
  orderDiscount?: number
  layout?: number
  hidePricePp?: boolean
  headerNo?: boolean
  headerSize?: number
  leftSize?: number
  customerCompany?: string
  customerName?: string
  customerAddress?: string
  customerZipcode?: string
  customerCity?: string
  customerCountry?: string
  customerEmail?: string
  shippingCompany?: string
  shippingName?: string
  shippingAddress?: string
  shippingZipcode?: string
  shippingCity?: string
  shippingCountry?: string
  showFrontPage?: boolean
  showLastPage?: boolean
}

export interface UpdateOfferPayload extends CreateOfferPayload {
  id?: number
}

export interface CreateOfferItemPayload {
  productId?: number
  quantity: number
  price?: number
  netPrice?: number
  customNetPrice?: number
  articleNr?: string
  name?: string
  description?: string
  orderDiscount?: number
  priceGross?: number
  order?: number
  pagebreak?: boolean
  option?: boolean
  nline?: boolean
  folder?: boolean
}

export interface UpdateOfferItemPayload extends Partial<CreateOfferItemPayload> {}
