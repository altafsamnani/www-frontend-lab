<template>
  <div v-if="hasCrosssells" class="space-y-8">
    <div v-if="groupedProducts.length > 0">
      <div v-for="group in groupedProducts" :key="group.title" class="mb-8">
        <div
          class="text-surface-900 dark:text-surface-0 border-primary/20 mb-4 border-b-2 pb-3 text-xl font-bold"
        >
          {{ group.title || t('products.crosssells.customers_also_bought') }}
        </div>
        <div
          class="scrollbar-thin scrollbar-thumb-surface-300 dark:scrollbar-thumb-surface-600 scrollbar-track-transparent max-h-[600px] space-y-3 overflow-y-auto pr-2"
        >
          <div
            v-for="product in group.products"
            :key="product.id"
            class="group bg-surface-0 dark:bg-surface-900 hover:bg-surface-50 dark:hover:bg-surface-800 flex cursor-pointer gap-5 rounded-lg p-3 transition-all duration-300"
            @click="navigateToProduct(product.id)"
          >
            <div
              v-if="product.thumbnail"
              class="flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden"
            >
              <img
                :src="product.thumbnail"
                :alt="product.name"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div v-else class="flex h-32 w-32 flex-shrink-0 items-center justify-center">
              <i
                class="pi pi-image text-surface-300 dark:text-surface-600 group-hover:text-primary text-5xl transition-colors duration-300"
              ></i>
            </div>

            <div class="flex min-w-0 flex-1 flex-col justify-center gap-2">
              <h3
                class="text-surface-900 dark:text-surface-0 group-hover:text-primary dark:group-hover:text-primary line-clamp-2 text-base leading-tight font-semibold transition-colors duration-300"
              >
                {{ product.name }}
              </h3>
              <p
                v-if="product.brand"
                class="text-surface-500 dark:text-surface-400 text-sm font-medium"
              >
                {{ product.brand }}
              </p>
            </div>

            <div
              class="flex flex-shrink-0 items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <i class="pi pi-arrow-right text-primary text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="groupedCategories.length > 0">
      <div v-for="group in groupedCategories" :key="group.title" class="mb-8">
        <div
          class="text-surface-900 dark:text-surface-0 border-primary/20 mb-4 border-b-2 pb-3 text-xl font-bold"
        >
          {{ group.title || t('products.crosssells.related_categories') }}
        </div>
        <div class="grid grid-cols-2 gap-4">
          <router-link
            v-for="category in group.categories"
            :key="category.id"
            :to="`/search/${category.slug}`"
            class="group bg-surface-0 dark:bg-surface-900 hover:bg-surface-50 dark:hover:bg-surface-800 flex flex-col items-center rounded-lg p-5 text-center no-underline transition-all duration-300"
          >
            <div
              v-if="category.thumbnail"
              class="mb-4 flex h-28 w-full items-center justify-center overflow-hidden"
            >
              <img
                :src="category.thumbnail"
                :alt="category.name"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div v-else class="mb-4 flex h-28 w-full items-center justify-center">
              <i
                class="pi pi-folder text-primary text-5xl transition-transform duration-300 group-hover:scale-105"
              ></i>
            </div>
            <span
              class="text-surface-900 dark:text-surface-0 group-hover:text-primary dark:group-hover:text-primary line-clamp-2 block text-sm leading-tight font-semibold transition-colors duration-300"
            >
              {{ category.name }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const router = useRouter()

  const props = defineProps<{
    crosssells: any
  }>()

  const crosssellProducts = computed(() => {
    return props.crosssells?.crosssellProducts || []
  })

  const crosssellCategories = computed(() => {
    return props.crosssells?.crosssellCategories || []
  })

  const groupedProducts = computed(() => {
    if (!crosssellProducts.value?.length) return []

    const groups: Record<string, any> = {}

    crosssellProducts.value.forEach((product: any) => {
      const title = product.groupingTitle || ''
      if (!groups[title]) {
        groups[title] = {
          title,
          products: [],
        }
      }
      groups[title].products.push(product)
    })

    Object.values(groups).forEach((group: any) => {
      group.products.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    })

    return Object.values(groups)
  })

  const groupedCategories = computed(() => {
    if (!crosssellCategories.value?.length) return []

    const groups: Record<string, any> = {}

    crosssellCategories.value.forEach((category: any) => {
      const title = category.groupingTitle || ''
      if (!groups[title]) {
        groups[title] = {
          title,
          categories: [],
        }
      }
      groups[title].categories.push(category)
    })

    Object.values(groups).forEach((group: any) => {
      group.categories.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    })

    return Object.values(groups)
  })

  const hasCrosssells = computed(() => {
    return groupedProducts.value.length > 0 || groupedCategories.value.length > 0
  })

  const navigateToProduct = (productId: number) => {
    router.push(`/products/${productId}`)
  }
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
