<template>
  <RightLayout :title="$t('menu.manuals')" :subtitle="$t('manuals.subtitle')">
    <template #actions>
      <Button v-if="selectedCategories.length > 0" @click="clearFilters" severity="secondary" outlined size="small">
        <i class="pi pi-times mr-2"></i>
        {{ $t('search.clear_all') }}
      </Button>
    </template>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <LoaderForm :columns="1" :rows="15" />
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Breadcrumb Navigation - Thin bar outside filter section -->
      <nav v-if="selectedCategories.length > 0"
        class="flex items-center flex-wrap gap-2 py-2 px-4 mb-4 bg-surface-0 dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800">
        <i class="pi pi-home text-xs text-surface-400 dark:text-surface-500"></i>
        <span class="text-sm text-primary-600 dark:text-primary-400 cursor-pointer hover:underline"
          @click="clearFilters">
          {{ $t('manuals.all_documents') }}
        </span>
        <template v-for="(cat, index) in selectedCategories" :key="cat">
          <i class="pi pi-chevron-right text-xs text-surface-300 dark:text-surface-600"></i>
          <span :class="[
            'text-sm cursor-pointer hover:underline transition-colors',
            index === selectedCategories.length - 1
              ? 'text-surface-900 dark:text-surface-0 font-semibold'
              : 'text-primary-600 dark:text-primary-400'
          ]" @click="navigateToBreadcrumb(cat, index)">
            {{ getCategoryTranslation(cat) }}
          </span>
        </template>
      </nav>

      <!-- Filters Section - Only show if there are filters -->
      <div v-if="documentsFacets?.static_categories_agg?.items"
        class="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-semibold text-surface-900 dark:text-surface-0">{{ $t('search.filter') }}</h3>
        </div>

        <!-- Category Filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <label v-for="categorySlug in Object.keys(documentsFacets.static_categories_agg.items)" :key="categorySlug"
            class="flex items-center gap-3 p-3 bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
            <Checkbox :modelValue="isFilterActive(categorySlug)" @update:modelValue="toggleCategory(categorySlug)"
              :binary="true" />
            <span class="flex-1 text-surface-700 dark:text-surface-300">
              {{ getCategoryTranslation(categorySlug) }}
            </span>
          </label>
        </div>
      </div>

      <!-- Empty State - No Data At All
      <div v-if="isCompletelyEmpty" class="text-center py-12">
        <i class="pi pi-inbox text-6xl text-surface-300 dark:text-surface-600 mb-4"></i>
        <p class="text-xl text-surface-600 dark:text-surface-400 mb-2">{{ $t('manuals.no_documents_found') }}</p>
        <p class="text-surface-500 dark:text-surface-500">{{ $t('manuals.no_documents_available') }}</p>
      </div>  -->

      <!-- Empty State - After Filter Applied -->
      <div v-else-if="isAllSectionsEmpty" class="text-center py-12">
        <i class="pi pi-filter-slash text-6xl text-surface-300 dark:text-surface-600 mb-4"></i>
        <p class="text-xl text-surface-600 dark:text-surface-400 mb-2">{{ $t('manuals.no_results_found') }}</p>
        <p class="text-surface-500 dark:text-surface-500 mb-4">{{ $t('manuals.no_results_message') }}</p>
        <Button @click="clearFilters" outlined>
          <i class="pi pi-times mr-2"></i>
          {{ $t('search.clear_all') }}
        </Button>
      </div>

      <!-- Document Sections -->
      <div v-else class="space-y-8">
        <!-- Manuals Section -->
        <div v-if="documents.manual && documents.manual.length > 0"
          class="bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg overflow-hidden">
          <div class="bg-surface-50 dark:bg-surface-900 px-6 py-4 border-b border-surface-200 dark:border-surface-800">
            <div class="flex items-center gap-3">
              <i class="pi pi-book text-2xl text-primary-600"></i>
              <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ $t('manuals.section_manuals') }}
              </h2>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                {{ documents.manual.length }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <DocumentCard v-for="doc in documents.manual" :key="doc.id" :document="doc" @open="openDocument"
                @download="downloadDocument" />
            </div>
          </div>
        </div>

        <!-- Software Section -->
        <div v-if="documents.software && documents.software.length > 0"
          class="bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg overflow-hidden">
          <div class="bg-surface-50 dark:bg-surface-900 px-6 py-4 border-b border-surface-200 dark:border-surface-800">
            <div class="flex items-center gap-3">
              <i class="pi pi-desktop text-2xl text-primary-600"></i>
              <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ $t('manuals.section_software')
                }}
              </h2>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                {{ documents.software.length }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <DocumentCard v-for="doc in documents.software" :key="doc.id" :document="doc" @open="openDocument"
                @download="downloadDocument" />
            </div>
          </div>
        </div>

        <!-- Firmware Section -->
        <div v-if="documents.firmware && documents.firmware.length > 0"
          class="bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg overflow-hidden">
          <div class="bg-surface-50 dark:bg-surface-900 px-6 py-4 border-b border-surface-200 dark:border-surface-800">
            <div class="flex items-center gap-3">
              <i class="pi pi-cog text-2xl text-primary-600"></i>
              <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ $t('manuals.section_firmware')
                }}
              </h2>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                {{ documents.firmware.length }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <DocumentCard v-for="doc in documents.firmware" :key="doc.id" :document="doc" @open="openDocument"
                @download="downloadDocument" />
            </div>
          </div>
        </div>

        <!-- Documents Section -->
        <div v-if="documents.document && documents.document.length > 0"
          class="bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg overflow-hidden">
          <div class="bg-surface-50 dark:bg-surface-900 px-6 py-4 border-b border-surface-200 dark:border-surface-800">
            <div class="flex items-center gap-3">
              <i class="pi pi-file text-2xl text-primary-600"></i>
              <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ $t('manuals.section_documents')
                }}
              </h2>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                {{ documents.document.length }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <DocumentCard v-for="doc in documents.document" :key="doc.id" :document="doc" @open="openDocument"
                @download="downloadDocument" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useNavigationStore } from '@/stores/navigation'
import RightLayout from '@/layouts/RightLayout.vue'
import Button from '@/volt/Button.vue'
import Checkbox from 'primevue/checkbox'
import LoaderForm from '@/components/icons/LoaderForm.vue'
import DocumentCard from '@/components/documents/DocumentCard.vue'
import type Query from '@/types/Query'

const { t } = useI18n()
const router = useRouter()
const searchStore = useSearchStore()
const navigationStore = useNavigationStore()
const { fetchDocuments } = searchStore
const { documents, documentsFacets, loading } = storeToRefs(searchStore)

const selectedCategories = ref<string[]>([])
const CATEGORY_LEAF_KEY = 'categoriesLeaf.slug'
const CATEGORY_ALL_KEY = 'categoriesAll.slug'

const query = ref<Query>({
  filter: [],
  order: []
})

onMounted(async () => {
  navigationStore.setLastVisitedRoute(router.currentRoute.value.fullPath)
  await applySearch()
})

const isCompletelyEmpty = computed(() => {
  if (!documents.value) return true
  return (
    (!documents.value.manual || documents.value.manual.length === 0) &&
    (!documents.value.software || documents.value.software.length === 0) &&
    (!documents.value.firmware || documents.value.firmware.length === 0) &&
    (!documents.value.document || documents.value.document.length === 0) &&
    selectedCategories.value.length === 0
  )
})

const isAllSectionsEmpty = computed(() => {
  if (!documents.value) return true
  return (
    (!documents.value.manual || documents.value.manual.length === 0) &&
    (!documents.value.software || documents.value.software.length === 0) &&
    (!documents.value.firmware || documents.value.firmware.length === 0) &&
    (!documents.value.document || documents.value.document.length === 0) &&
    selectedCategories.value.length > 0
  )
})

const applySearch = async () => {
  await fetchDocuments(query.value)
}

const isFilterActive = (categorySlug: string): boolean => {
  return selectedCategories.value.includes(categorySlug)
}

const toggleCategory = (categorySlug: string) => {
  const index = selectedCategories.value.indexOf(categorySlug)

  if (index > -1) {
    // Remove the category
    selectedCategories.value.splice(index, 1)
    query.value.filter = query.value.filter?.filter(
      (f) => !(
        (f.key === CATEGORY_LEAF_KEY || f.key === CATEGORY_ALL_KEY) &&
        f.value === categorySlug
      )
    )
  } else {
    // Add the category
    selectedCategories.value.push(categorySlug)

    if (!query.value.filter) {
      query.value.filter = []
    }

    // Convert all existing category filters to categoriesAll.slug
    query.value.filter = query.value.filter.map(filter => {
      if (filter.key === CATEGORY_LEAF_KEY) {
        return {
          ...filter,
          key: CATEGORY_ALL_KEY
        }
      }
      return filter
    })

    // Add the new category as categoriesLeaf.slug (last clicked)
    query.value.filter.push({
      key: CATEGORY_LEAF_KEY,
      op: 'equals',
      value: categorySlug
    })
  }

  applySearch()
}

const navigateToBreadcrumb = (categorySlug: string, index: number) => {
  // Keep only categories up to the clicked index
  selectedCategories.value = selectedCategories.value.slice(0, index + 1)

  // Clear all filters
  query.value.filter = []

  // Add only the clicked category as categoriesLeaf.slug
  query.value.filter = [{
    key: CATEGORY_LEAF_KEY,
    op: 'equals',
    value: categorySlug
  }]

  applySearch()
}

const clearFilters = () => {
  selectedCategories.value = []
  query.value = {
    filter: [],
    order: []
  }
  applySearch()
}

const openDocument = (url: string) => {
  window.open(url, '_blank')
}

const downloadDocument = (url: string, filename: string) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const getCategoryTranslation = (categorySlug: string): string => {
  // Try to get translation with 'categories.' prefix
  const translationKey = 'categories.' + categorySlug
  const translation = t(translationKey)

  // If translation is same as key (meaning it doesn't exist), capitalize the slug
  if (translation === translationKey) {
    // Capitalize first letter and replace hyphens/underscores with spaces
    return categorySlug
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return translation
}
</script>
