export interface ShippingAddress {
  id: number
  userId: number
  companyName: string
  name: string
  firstname?: string
  lastname?: string
  street: string
  number: string
  numberExt: string
  zipcode: string
  city: string
  country: string
  phone?: string
  mobile?: string
  email?: string
  defaultShipping?: boolean
  defaultBilling?: boolean
  createdAt: string
  updatedAt: string
}

export interface ShippingAddressList {
  data: ShippingAddress[]
  totalCount: number
  page?: number
}

export interface ShippingAddressInput {
  companyName: string
  name: string
  firstname?: string
  lastname?: string
  street: string
  number: string
  numberExt?: string
  zipcode: string
  city: string
  country: string
  phone?: string
  mobile?: string
  email?: string
  defaultShipping?: boolean
  defaultBilling?: boolean
}

export interface ShippingAddressOption {
  id: number
  label: string
  value: number
}