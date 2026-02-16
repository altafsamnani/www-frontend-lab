export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  permissions?: any[]
  roles?: any[]
}

export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  companyId: number | null
  countrycode: string | null
  mobile: string | null
  defaultShippingAddress: number | null
  defaultBillingAddress: number | null
  mailing: boolean
  emailBcc: string | null
  emailOrder: string | null
  invoiceDownload: boolean
  roles: string[]
  permissions: string[]
  company: UserCompany | null
}

export type UserCompany = {
  id: string
  companyName: string
  street: string
  number: string
  numberExt: string | null
  zipcode: string
  city: string
  country: string
  email: string | null
  phone: string | null
  mobile: string | null
  kvk: string | null
  taxId: string | null
  debnr: number | null
}

export type UserProfileUpdate = {
  firstName?: string
  lastName?: string
  countrycode?: string
  mobile?: string
  defaultShippingAddress?: number | null
  defaultBillingAddress?: number | null
  mailing?: boolean
  emailBcc?: string
  emailOrder?: string
  invoiceDownload?: boolean
}

export type CompanyUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  companyId: number | null
  countrycode: string | null
  mobile: string | null
  approvedAt: string | null
}

export type CompanyUserList = {
  data: CompanyUser[]
  extra: {
    totalCount: number
    page: {
      number: string
      size: string
    }
  }
}

export type CompanyUserUpdate = {
  firstName?: string
  lastName?: string
  countrycode?: string
  mobile?: string
}
