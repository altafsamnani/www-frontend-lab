import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search'
import type CategoryFacet from '@/types/CategoryFacet'
import type Query from '@/types/Query'

export function useCategoryFacets() {
  const searchStore = useSearchStore()
  const { fetchCategoryFacets } = searchStore
  const { categoryFacets, categoryFacetsTotal } = storeToRefs(searchStore)
  const { t, te } = useI18n()

  const facetItems = computed<Record<string, number>>(
    () => categoryFacets.value?.static_categories_agg?.items ?? {}
  )

  const filterData = computed<Record<string, any>>(
    () => categoryFacets.value?.static_categories_agg?.html?.filter_data ?? {}
  )

  const categoryName = (slug: string) =>
    te('categories.' + slug) ? t('categories.' + slug) : (filterData.value[slug]?.name ?? slug)

  const categoryDescription = (slug: string) =>
    te('categories_description.' + slug)
      ? t('categories_description.' + slug)
      : (filterData.value[slug]?.description ?? '')

  const loadCategoryFacets = async (categorySlug: string = '') => {
    const query: Query = {
      filter: categorySlug
        ? [{ key: 'categoriesAll.slug', op: 'equals', value: categorySlug }]
        : [],
    }

    await fetchCategoryFacets(query)
  }

  const buildSubCategories = (excludeSlug: string = ''): CategoryFacet[] =>
    Object.entries(facetItems.value)
      .filter(([slug]) => slug !== excludeSlug)
      .map(([slug, count]) => ({
        slug,
        name: categoryName(slug),
        description: filterData.value[slug]?.description ?? null,
        count: Number(count),
        image: filterData.value[slug]?.images?.[0]?.urlSmall ?? null,
      }))
      .sort((a, b) => b.count - a.count)

  return {
    categoryFacets,
    categoryFacetsTotal,
    facetItems,
    filterData,
    categoryName,
    categoryDescription,
    loadCategoryFacets,
    buildSubCategories,
  }
}
