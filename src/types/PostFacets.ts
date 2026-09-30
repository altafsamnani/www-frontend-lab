export interface PostFacet {
  html: {
    filter_translation_key?: string
    filter_type?: string
    filter_style?: string
  }
  items: Record<string, number>
}

export default interface PostFacets {
  static_categories_agg?: PostFacet
}
