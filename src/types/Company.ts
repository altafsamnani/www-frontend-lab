export interface Company {
  id: string | null
  debnr: number
  companyName: string
  street?: string
  number: string
  numberExt?: string
  zipcode: string
  city: string
  country: string
  email?: string
  phone?: string
  mobile?: string
  kvk?: string
  taxId?: string
  comments?: string
  createdBy?: number
}

export default Company