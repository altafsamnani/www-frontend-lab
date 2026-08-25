<template>
  <div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
        {{ t('home.categories.eyebrow') }}
      </h2>
      <p
        class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {{ t('home.categories.title') }}
      </p>
      <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
        {{ t('home.categories.subtitle') }}
      </p>
      <LoaderForm v-if="loading" :columns="2" :rows="2" class="mt-8" />
      <template v-else>
        <div class="mt-10 flex flex-wrap justify-start gap-x-6 gap-y-8">
          <button
            v-for="category in categories"
            :key="category.slug"
            type="button"
            class="group bg-surface-0 dark:bg-surface-900 hover:shadow-surface-900/10 focus-visible:ring-primary-400/50 w-36 cursor-pointer rounded-lg shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:ring focus-visible:outline-none sm:w-44 lg:w-52 dark:shadow-white/5 dark:hover:shadow-white/10"
            @click="openCategory(category)"
          >
            <div
              class="category-tile-clip bg-surface-100 dark:bg-surface-800 aspect-[4/3] w-full overflow-hidden rounded-t-lg"
            >
              <img
                :src="category.image ?? defaultImageUrl"
                :alt="category.name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div
              class="text-primary-600 dark:text-primary-400 px-3 pt-1 pb-4 text-center text-sm font-semibold sm:text-base"
            >
              {{ category.name }}
            </div>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { useCategoryFacets } from '@/composables/useCategoryFacets'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import type CategoryFacet from '@/types/CategoryFacet'

  const { t } = useI18n()
  const router = useRouter()
  const { loadCategoryFacets, buildSubCategories } = useCategoryFacets()

  const loading = ref(true)
  const defaultImageUrl = import.meta.env.VITE_DEFAULT_IMAGE

  const categories = computed<CategoryFacet[]>(() => buildSubCategories())

  onMounted(async () => {
    await loadCategoryFacets()
    loading.value = false
  })

  const openCategory = (category: CategoryFacet) => {
    router.push({ name: 'Categories', params: { categorySlug: category.slug } })
  }
</script>

<style scoped>
  .category-tile-clip {
    clip-path: polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%);
  }
</style>
