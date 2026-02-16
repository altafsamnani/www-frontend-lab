<template>
  <div class="product-search-container">
    <div class="p-inputgroup" ref="searchContainerRef">
      <span class="p-inputgroup-addon bg-transparent border-r-0">
        <i v-if="searchLoading" class="pi pi-spin pi-spinner text-surface-400 dark:text-surface-500" />
        <i v-else class="pi pi-search text-surface-400 dark:text-surface-500" />
      </span>
      <AutoComplete v-model="searchQuery" :suggestions="filteredSuggestions" @complete="searchProducts"
        @item-select="onProductSelect" @keydown="handleKeyDown" @focus="handleFocus" @blur="handleBlur" optionLabel="name"
        :placeholder="$t('navigation.product_search')" :loading="false" :delay="300" :minLength="2" forceSelection
        :completeOnFocus="false" class="product-search-autocomplete" :inputClass="'border-l-0 pr-16 ' + inputClass"
        :panelClass="panelClass" :dropdown="false" :autoHighlight="true" appendTo="self" ref="autocompleteRef">

        <!-- Empty state when no results or recent searches -->
        <template #empty>
          <div class="product-search-empty p-4 text-center">
            <i class="pi pi-search text-3xl text-surface-400 dark:text-surface-500 mb-3 block"></i>
            <div v-if="searchQuery && searchQuery.length >= 2">
              <p class="text-surface-600 dark:text-surface-400 font-medium mb-2">
                {{ $t('search.no_results_for') }} "{{ searchQuery }}"
              </p>
              <p class="text-sm text-surface-500 dark:text-surface-500">
                {{ $t('search.try_different_keywords') }}
              </p>
            </div>
            <div v-else>
              <p class="text-surface-600 dark:text-surface-400">
                {{ $t('search.start_typing') }}
              </p>
            </div>
          </div>
        </template>

        <!-- Product option template -->
        <template #option="slotProps">
          <div
            class="product-search-option flex items-start gap-3 py-3 px-4 hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors">
            <!-- Product image -->
            <div class="product-image-wrapper flex-shrink-0">
              <img v-if="slotProps.option.thumbnail" :src="slotProps.option.thumbnail" :alt="slotProps.option.name"
                class="w-12 h-12 object-cover rounded border border-surface-200 dark:border-surface-700" loading="lazy"
                @error="handleImageError" />
              <div v-else
                class="w-12 h-12 bg-surface-100 dark:bg-surface-800 rounded border border-surface-200 dark:border-surface-700 flex items-center justify-center">
                <i class="pi pi-image text-surface-400 dark:text-surface-500"></i>
              </div>
            </div>

            <!-- Product details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1">
                  <!-- Product name with highlight -->
                  <div class="font-medium text-surface-900 dark:text-surface-0 mb-1 line-clamp-2">
                    {{ slotProps.option.name }}
                  </div>

                  <!-- Article number and category -->
                  <div class="flex flex-wrap items-center gap-2 text-sm">
                    <span v-if="slotProps.option.articleNo" class="text-surface-500 dark:text-surface-400">
                      <i class="pi pi-hashtag text-xs mr-1"></i>{{ slotProps.option.articleNo }}
                    </span>
                    <span v-if="slotProps.option.category" class="text-surface-500 dark:text-surface-400">
                      <i class="pi pi-folder text-xs mr-1"></i>{{ slotProps.option.category }}
                    </span>
                    <span v-if="slotProps.option.brand" class="text-surface-500 dark:text-surface-400">
                      <i class="pi pi-tag text-xs mr-1"></i>{{ slotProps.option.brand }}
                    </span>
                  </div>

                  <!-- Stock status -->
                  <div class="flex items-center gap-2 mt-1">
                    <span v-if="slotProps.option.inStock"
                      class="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                      <i class="pi pi-check-circle"></i> {{ $t('search.in_stock') }}
                    </span>
                    <span v-else class="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                      <i class="pi pi-clock"></i> {{ $t('search.out_of_stock') }}
                    </span>
                  </div>
                </div>

                <!-- Price -->
                <div class="text-right flex-shrink-0">
                  <div v-if="slotProps.option.price" class="font-bold text-primary">
                    €{{ formatPrice(slotProps.option.price) }}
                  </div>
                  <div v-if="slotProps.option.originalPrice && slotProps.option.originalPrice > slotProps.option.price"
                    class="text-sm text-surface-500 dark:text-surface-400 line-through">
                    €{{ formatPrice(slotProps.option.originalPrice) }}
                  </div>
                  <div v-if="getDiscountPercentage(slotProps.option) > 0"
                    class="text-xs text-red-600 dark:text-red-400 font-medium">
                    -{{ getDiscountPercentage(slotProps.option) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Footer with advanced search -->
        <template #footer>
          <div class="product-search-footer border-t border-surface-200 dark:border-surface-700 p-3">
            <div class="flex items-center justify-between">
              <div class="text-sm text-surface-500 dark:text-surface-400">
                <span v-if="suggestions.length > 0">
                  {{ $t('search.showing_results', { count: Math.min(suggestions.length, maxSuggestions) }) }}
                </span>
              </div>
              <button v-if="searchQuery && searchQuery.length >= 2" @click="viewAllResults"
                class="text-sm font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 transition-colors">
                {{ $t('search.view_all_results') }}
                <i class="pi pi-arrow-right text-xs"></i>
              </button>
            </div>

            <!-- Advanced search link - always visible -->
            <div class="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700">
              <button @click="goToAdvancedSearch"
                class="w-full text-sm font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center gap-2 py-2 bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors">
                <i class="pi pi-sliders-h"></i>
                {{ $t('search.advanced_search') }}
              </button>
            </div>
          </div>
        </template>
      </AutoComplete>

      <!-- Clear button and keyboard shortcut hint -->
      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <!-- Clear button - visible when there's text -->
        <button v-if="searchQuery" @click="clearSearch" type="button"
          class="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          :title="$t('search.clear')">
          <i class="pi pi-times text-surface-400 dark:text-surface-500 text-sm"></i>
        </button>

        <!-- Keyboard shortcut hint - visible when empty and not focused -->
        <kbd v-if="!searchQuery && !isFocused"
          class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-surface-400 dark:text-surface-500 bg-surface-100 dark:bg-surface-800 rounded border border-surface-200 dark:border-surface-700">
          <span v-if="isMac">⌘</span>
          <span v-else>Ctrl</span>
          <span>K</span>
        </kbd>

        <!-- Enter hint when focused -->
        <span v-if="isFocused && !searchQuery"
          class="hidden sm:inline-flex text-xs text-surface-400 dark:text-surface-500">
          {{ $t('search.press_enter_to_browse') }}
        </span>
      </div>
    </div>

    <!-- Accessibility hint for screen readers -->
    <span id="product-search-hint" class="sr-only">
      {{ $t('search.accessibility_hint') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search'
import AutoComplete from 'primevue/autocomplete'

interface ProductSuggestion {
  id: number
  name: string
  articleNo?: string
  price?: number
  originalPrice?: number
  thumbnail?: string
  category?: string
  brand?: string
  description?: string
  inStock?: boolean
}

interface Props {
  maxSuggestions?: number
  inputClass?: string
  panelClass?: string
}

interface Emits {
  (e: 'search', query: string): void
  (e: 'product-select', product: ProductSuggestion): void
  (e: 'clear'): void
}

const props = withDefaults(defineProps<Props>(), {
  maxSuggestions: 10,
  inputClass: 'w-full',
  panelClass: 'product-search-panel'
})

const emit = defineEmits<Emits>()

const router = useRouter()
const { t } = useI18n()
const searchStore = useSearchStore()

// State
const searchQuery = ref<string>('')
const suggestions = ref<ProductSuggestion[]>([])
const searchLoading = ref<boolean>(false)
const searchDebounceTimer = ref<number | null>(null)
const recentSearches = ref<string[]>([])
const isFocused = ref<boolean>(false)
const autocompleteRef = ref<any>(null)

// Platform detection - using userAgent as platform is deprecated
const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)

// Computed
const filteredSuggestions = computed(() => {
  return suggestions.value.slice(0, props.maxSuggestions)
})

// Methods
const searchProducts = async (event: any) => {
  const query = event.query?.trim()

  if (!query || query.length < 2) {
    suggestions.value = []
    return
  }

  // Clear existing debounce timer
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }

  // Set new debounce timer
  searchDebounceTimer.value = setTimeout(async () => {
    searchLoading.value = true
    try {
      const results = await searchStore.fetchSuggestions(query, props.maxSuggestions * 2)

      // Enhance results with additional data if needed
      suggestions.value = (results || []).map((product: any) => ({
        id: product.id,
        name: product.name,
        articleNo: product.articleNo || product.articleNumber,
        price: product.price,
        originalPrice: product.originalPrice,
        thumbnail: product.thumbnail || product.image || (product.images && product.images.length > 0 ? product.images[0].url : null),
        category: product.category?.name || product.categoryName,
        brand: product.brand?.name || product.brandName,
        description: product.description,
        inStock: product.stock > 0 || product.inStock !== false
      }))

      // Save to recent searches
      addToRecentSearches(query)

      emit('search', query)
    } catch (error) {
      console.error('Error fetching product suggestions:', error)
      suggestions.value = []
    } finally {
      searchLoading.value = false
    }
  }, 300)
}

const onProductSelect = (event: any) => {
  const product = event.value

  if (!product) return

  // Navigate to product page
  router.push({
    name: 'Products',
    params: { id: product.id }
  })

  // Clear search after selection
  searchQuery.value = ''
  suggestions.value = []

  emit('product-select', product)
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Handle Enter key for search - works with or without query
  if (event.key === 'Enter') {
    event.preventDefault()
    goToSearchPage()
  }

  // Handle Escape key to clear
  if (event.key === 'Escape') {
    clearSearch()
  }
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const goToSearchPage = () => {
  const query = (searchQuery.value || '').trim()
  if (query) {
    router.push({
      name: 'Search',
      query: { q: query }
    })
  } else {
    router.push({ name: 'Search' })
  }
  clearSearch()
}

const viewAllResults = () => {
  const query = (searchQuery.value || '').trim()
  if (query) {
    router.push({
      name: 'Search',
      query: { q: query }
    })
    clearSearch()
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  suggestions.value = []
  emit('clear')
}

const goToAdvancedSearch = () => {
  router.push({ name: 'Search' })
  clearSearch()
}

const formatPrice = (price: any): string => {
  if (price === null || price === undefined) return '0.00'
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(numPrice)) return '0.00'
  return numPrice.toFixed(2)
}

const getDiscountPercentage = (product: ProductSuggestion): number => {
  if (!product.originalPrice || !product.price) return 0
  if (product.originalPrice <= product.price) return 0
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}

const handleImageError = (event: any) => {
  event.target.src = '/images/default-product.png'
}

const addToRecentSearches = (query: string) => {
  // Remove if already exists
  const index = recentSearches.value.indexOf(query)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
  }

  // Add to beginning
  recentSearches.value.unshift(query)

  // Keep only last 5
  if (recentSearches.value.length > 5) {
    recentSearches.value = recentSearches.value.slice(0, 5)
  }

  // Save to localStorage
  localStorage.setItem('recentProductSearches', JSON.stringify(recentSearches.value))
}

const loadRecentSearches = () => {
  const saved = localStorage.getItem('recentProductSearches')
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved)
    } catch (e) {
      recentSearches.value = []
    }
  }
}

// Global keyboard shortcut handler
const handleGlobalKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    // Focus the autocomplete input
    if (autocompleteRef.value?.$el) {
      const input = autocompleteRef.value.$el.querySelector('input')
      if (input) {
        input.focus()
      }
    }
  }
}

// Lifecycle
onMounted(() => {
  loadRecentSearches()
  window.addEventListener('keydown', handleGlobalKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown)
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
})
</script>

<style scoped>
.product-search-container {
  position: relative;
  width: 100%;
}

.p-inputgroup {
  display: flex;
  align-items: stretch;
  width: 100%;
  position: relative;
}

.p-inputgroup-addon {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--p-inputtext-border-color, #d1d5db);
  border-right: 0;
  border-top-left-radius: var(--p-inputtext-border-radius, 6px);
  border-bottom-left-radius: var(--p-inputtext-border-radius, 6px);
  background: var(--p-inputtext-background, #ffffff);
  flex-shrink: 0;
  height: 2.5rem;
}

.product-search-autocomplete {
  flex: 1 1 0%;
  min-width: 0;
  width: 0;
}

/* Fix AutoComplete wrapper to not expand */
:deep(.p-autocomplete) {
  display: flex !important;
  width: 100% !important;
  height: 2.5rem !important;
}

:deep(.p-autocomplete-input-multiple),
:deep(.p-autocomplete-input) {
  flex: 1 1 0% !important;
  min-width: 0 !important;
  width: 100% !important;
  border-left: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  height: 2.5rem !important;
  min-height: 2.5rem !important;
  max-height: 2.5rem !important;
  padding: 0.5rem 0.75rem !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

:deep(.p-autocomplete-input:focus) {
  box-shadow: none !important;
  border-color: var(--p-inputtext-border-color, #d1d5db) !important;
}

/* Hide PrimeVue's internal loader completely */
:deep(.p-autocomplete-loader) {
  display: none !important;
}

/* Panel positioning - match width of input group */
:deep(.p-autocomplete-overlay),
:deep(.p-autocomplete-panel) {
  position: absolute !important;
  top: 100% !important;
  left: -42px !important;
  margin-top: 4px !important;
  width: calc(100% + 42px) !important;
  min-width: unset !important;
  max-width: unset !important;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

:deep(.p-autocomplete-items) {
  padding: 0;
}

:deep(.p-autocomplete-item) {
  padding: 0;
  border: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Keyboard shortcuts styling */
kbd {
  font-family: monospace;
  font-size: 0.75rem;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.pi-spin {
  animation: spin 1s linear infinite;
}

/* Dark mode adjustments */
.dark .product-search-panel {
  background-color: var(--surface-900);
  border-color: var(--surface-700);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  :deep(.p-autocomplete-panel) {
    min-width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
    left: 1rem !important;
    right: 1rem !important;
  }

  .product-search-option {
    padding: 0.75rem;
  }

  .product-image-wrapper img,
  .product-image-wrapper>div {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>