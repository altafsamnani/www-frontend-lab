import type Facet from "./Facet";

export default interface Facets {
    static_categories_agg?: Facet;
    static_brand_agg?: Facet;
    static_size_agg?: Facet;
    static_price_agg?: Facet; 
    attributes_agg?: {};
  }