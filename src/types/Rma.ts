export interface RmaAddressSnapshot {
  id: number | null
  companyName: string | null
  firstname: string | null
  lastname: string | null
  street: string | null
  number: string | null
  numberExt: string | null
  address: string | null
  zipcode: string | null
  city: string | null
  country: string | null
  phone: string | null
  email: string | null
}

export interface Rma {
  id: string
  userId: number
  companyId: number
  companyName: string | null
  userName: string | null
  address: RmaAddressSnapshot | null
  notesClient: string | null
  notes: string | null
  reference: string | null
  hash: string | null
  isDraft: boolean | null
  submittedAt: string | null
  receivedAt: string | null
  representativeId: number | null
  addressId: number | null
  status: string | null
  totalItems: number
  items: RmaItem[] | null
}

export interface RmaItem {
  id: string
  rmaId: number
  productId: number | null
  articleNo: string | null
  quantity: number
  reason: string | null
  reasonAlt: string | null
  replacement: string | null
  serialnumbers: string | null
  orderNo: number | null
  orderDate: string | null
  invoiceNr: string | null
  defect: string | null
  paxtonRmaNr: string | null
  notes: string | null
  notesClient: string | null
  status: string | null
  supplierId: number | null
  productName: string | null
  invoiceDate: string | null
  invoiceNumber: string | null
  customerReference: string | null
  frequency: string | null
  supportContacted: string | null
  remarks: string | null
  photoUrls: string[] | null
  loanRef: string | null
  replacementOrder: string | null
  condition: string | null
  observed: string | null
  returnPeriod: string | null
  invoicePrice: string | null
  goodsDiscountPct: string | null
  creditAdvice: string | null
  internalNote: string | null
  customerNote: string | null
  unboxPhotoUrl: string | null
}

export interface CreateRmaPayload {
  addressId?: number | null
  reference?: string
}

export interface UpdateRmaPayload {
  addressId?: number | null
  reference?: string
}

export interface CreateRmaItemPayload {
  productId: number
  quantity: number
  reason: string
  reasonAlt?: string
  replacement?: string
  serialnumbers?: string
  orderNo?: number
  orderDate?: string
  invoiceNr?: string
  invoiceDate?: string
  invoiceNumber?: string
  customerReference?: string
  defect?: string
  paxtonRmaNr?: string
  frequency?: string
  supportContacted?: string
  remarks?: string
  photoUrls?: string[]
  loanRef?: string
  replacementOrder?: string
  productName?: string
  supplierId?: number
  notes?: string
  notesClient?: string
}

export interface UpdateRmaItemPayload extends Partial<CreateRmaItemPayload> {}
