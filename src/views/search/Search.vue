<template>
  <div class="relative bg-surface-0 dark:bg-surface-950 py-4">
    <div class="flex sm:flex-row flex-col items-start sm:items-end gap-2">
      <div class="flex-1">
        <h2 v-if="headerTitle"
          class="text-3xl text-surface-900 dark:text-surface-0 font-bold inline-flex items-center gap-2">{{
            t(headerTitle) }}</h2>
        <p v-if="headerDescription" class="mt-2 text-surface-600 dark:text-surface-400 text-xl"
          v-html="t(headerDescription)"></p>
      </div>
    </div>
    <Divider v-if="headerTitle || headerDescription" class="!my-6" />
    <div class="flex lg:flex-row flex-col gap-8">
      <div class="w-full lg:w-72">
        <Facets view='fieldset' :static-es-keys="staticEsKeys" :query="query" @applySearch="applySearch"
          @setHeader="setHeader" />
      </div>
      <div class="flex-1  rounded-lg min-h-72">
        <FacetTop v-if="categoryFacets" :category-facets="categoryFacets" :query="query"
          @clickOnFacetTop="applySearch" />
        <Listing :query="query" @clickOnSortPaginator="applySearch" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search';

import Divider from 'primevue/divider';
import Facets from './Facets.vue';
import Listing from '@/views/search/Listing.vue';
import type Query from '@/types/Query';
import FacetTop from './FacetTop.vue';


const searchStore = useSearchStore()
const { fetchSearch } = searchStore
const { facets, products } = storeToRefs(searchStore)
const { t } = useI18n()
const router = useRouter()
const categoryFacets = ref(facets)
const headerTitle = ref('')
const headerDescription = ref('')
const staticEsKeys = ref({
  brand: 'brand.slug',
  price: 'price',
  categories: 'categoriesAll.slug'
})

const query = ref<Query>({
  filter: [],
  order: [],
  page: {
    size: 12,
    number: 1
  }
})
onMounted(async () => {
  // applySearch(query.value)
})



const applySearch = async (params?: Query) => {
  if (!params) return;
  products.value = []
  query.value = params
  resetRoutes()
  await fetchSearch(params)

}

const resetRoutes = () => {
  let routeCategory = ''
  let routeBrand = ''
  let routeOthersToDo = ''
  query.value.filter?.map((filter) => {
    switch (filter.key) {
      case staticEsKeys.value.categories:
        console.log('push cat route', filter.key)
        routeCategory = '/' + filter.value

        break;
      case staticEsKeys.value.brand:
        console.log('push brand route', filter.key)
        routeBrand = '/' + filter.value

        break;
      default:
        console.log('default route', filter.key);
        routeOthersToDo = filter.value
    }
  })

  history.pushState(null, '', '/search' + (routeCategory === '' && routeBrand ? '/all' : routeCategory) + routeBrand)
  //router.clearRoutes
  //router.currentRoute.value.params.categorySlug = routeParams.categorySlug
  //router.push({ name: 'Search', params: routeParams })
  //router.replace({ name: 'Search', params: routeParams })

}

function setHeader(title: string, description: string) {
  headerTitle.value = title
  headerDescription.value = description
}

</script>