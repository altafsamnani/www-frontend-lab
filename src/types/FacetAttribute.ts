export interface FacetAttribute {
  html: {
    filter_translation_key: string
    fieldset_translation_key: string
    [key: string]: any
  }
  [key: string]: any
}

export interface ListStyleAttributes {
  [key: string]: {
    [key: string]: FacetAttribute
  }
}
