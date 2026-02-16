export interface Address {
  id: number
  companyName: string
  firstname?: string
  lastname?: string
  country: string
  zipcode: string
  number?: string
  numberExt?: string
  street?: string
  city: string
  phone?: string
  mobile?: string
  defaultBilling: boolean
  defaultShipping: boolean
}

export interface AddressList {
  data: Address[]
  totalCount: number
  page?: number
}

export interface AddressInput {
  companyName: string
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
  defaultShipping?: boolean
  defaultBilling?: boolean
}

export interface AddressOption {
  id: number
  label: string
  value: number
}
