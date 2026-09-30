export interface MessagePreference {
  id?: number
  categoryId: number
  categoryName?: string | null
  typeId: number
  technical: boolean
  commercial: boolean
}

export interface MessagePreferenceInput {
  categoryId: number
  typeId: number
  technical: boolean
  commercial: boolean
}
