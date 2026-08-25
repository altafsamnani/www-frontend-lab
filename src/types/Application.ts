export type ApplicationType = 'create' | 'edit' | 'user_create'

export interface ApplicationInput {
  type: ApplicationType
  companyName: string
  firstname?: string
  lastname?: string
  position?: string
  street: string
  number: string
  numberExt?: string
  zipcode: string
  city: string
  country: string
  email: string
  companyEmail?: string
  phone?: string
  mobile?: string
  kvk?: string
  taxId?: string
  comments?: string
  companyId?: number | null
}

export interface UserApplicationInput {
  type: 'user_create'
  firstname: string
  lastname: string
  email: string
  position?: string
  mobile?: string
  comments?: string
  companyId?: number | null
  companyName?: string
  street?: string
  number?: string
  numberExt?: string
  zipcode?: string
  city?: string
  country?: string
  role?: string
}

export interface Application {
  id: number
  type: ApplicationType
  companyName: string
  firstname: string
  lastname: string
  position: string
  street: string
  number: string
  numberExt?: string
  zipcode: string
  city: string
  country: string
  email: string
  companyEmail?: string
  phone?: string
  mobile?: string
  kvk?: string
  taxId?: string
  comments?: string
  companyId?: number | null
  createdBy?: number
  acceptedAt?: string | null
  deletedAt?: string | null
}
