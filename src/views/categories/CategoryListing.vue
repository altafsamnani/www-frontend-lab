<template>
  <div class="bg-surface-0 dark:bg-surface-950 relative py-4">
    <div v-if="categorySlug" class="mb-4">
      <Button
        icon="pi pi-arrow-left"
        :label="t('button.back')"
        text
        severity="secondary"
        class="!px-2"
        @click="router.back()"
      />
    </div>
    <LoaderForm v-if="loading" :columns="2" :rows="4" />
    <div v-else class="flex flex-col items-start gap-6 lg:flex-row">
      <div
        class="bg-primary-500 dark:bg-primary-400 w-full shrink-0 rounded-xl p-6 lg:sticky lg:top-24 lg:w-80"
      >
        <h1 class="dark:text-surface-950 text-3xl font-bold text-white">{{ headerTitle }}</h1>
        <div
          v-if="headerDescription"
          class="dark:text-surface-950/90 mt-3 max-h-64 overflow-y-auto pr-1 text-sm leading-relaxed text-white/90"
          v-html="headerDescription"
        ></div>
        <div
          v-if="categoryFacetsTotal"
          class="dark:text-surface-950/80 mt-4 text-sm font-medium text-white/80"
        >
          {{
            t('categoryListing.productsCount', { count: categoryFacetsTotal }, categoryFacetsTotal)
          }}
        </div>
        <Button
          class="mt-6 w-full"
          severity="contrast"
          icon="pi pi-sliders-h"
          :label="filterButtonLabel"
          @click="goToSearch"
        />
      </div>
      <div class="min-h-72 w-full flex-1">
        <div
          v-if="subCategories.length"
          class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
        >
          <button
            v-for="category in subCategories"
            :key="category.slug"
            type="button"
            class="group border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 hover:border-primary hover:shadow-surface-900/5 focus-visible:ring-primary-400/50 flex cursor-pointer flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-lg focus-visible:ring focus-visible:outline-none dark:hover:shadow-white/10"
            @click="openCategory(category)"
          >
            <div class="flex aspect-square w-full items-center justify-center p-6">
              <img
                :src="category.image ?? defaultImageUrl"
                :alt="category.name"
                class="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="border-surface-200 dark:border-surface-700 w-full border-t p-3 text-center">
              <div class="text-surface-900 dark:text-surface-0 leading-6 font-semibold">
                {{ category.name }}
              </div>
              <div class="text-muted-color mt-0.5 text-xs">
                {{ t('categoryListing.productsCount', { count: category.count }, category.count) }}
              </div>
            </div>
          </button>
        </div>
        <div
          v-else
          class="border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 flex min-h-72 items-center justify-center rounded-lg border"
        >
          {{ t('categoryListing.noCategories') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useCategoryFacets } from '@/composables/useCategoryFacets'
  import { useNavigationStore } from '@/stores/navigation'
  import Button from 'primevue/button'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import type CategoryFacet from '@/types/CategoryFacet'

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const {
    categoryFacetsTotal,
    facetItems,
    categoryName,
    categoryDescription,
    loadCategoryFacets,
    buildSubCategories,
  } = useCategoryFacets()
  const navigationStore = useNavigationStore()

  const loading = ref(true)
  const defaultImageUrl = import.meta.env.VITE_DEFAULT_IMAGE

  const categorySlug = computed(() => (route.params.categorySlug as string) || '')

  const subCategories = computed<CategoryFacet[]>(() => buildSubCategories(categorySlug.value))

  const headerTitle = computed(() =>
    categorySlug.value ? categoryName(categorySlug.value) : t('categoryListing.title')
  )

  const headerDescription = computed(() =>
    categorySlug.value ? categoryDescription(categorySlug.value) : t('categoryListing.description')
  )

  const filterButtonLabel = computed(() =>
    categorySlug.value
      ? t('categoryListing.filterProducts', { category: headerTitle.value })
      : t('categoryListing.viewAllProducts')
  )

  onMounted(async () => {
    navigationStore.setLastVisitedRoute(route.fullPath)
    await loadCategories()
  })

  watch(categorySlug, async () => {
    if (route.name !== 'Categories') return
    navigationStore.setLastVisitedRoute(route.fullPath)
    await loadCategories()
  })

  const loadCategories = async () => {
    loading.value = true

    await loadCategoryFacets(categorySlug.value)

    if (categorySlug.value && Object.keys(facetItems.value).length === 0) {
      await router.replace(`/search/${categorySlug.value}`)
      return
    }

    loading.value = false
  }

  const openCategory = (category: CategoryFacet) => {
    router.push({ name: 'Categories', params: { categorySlug: category.slug } })
  }

  const goToSearch = () => {
    router.push(categorySlug.value ? `/search/${categorySlug.value}` : '/search')
  }
</script>
