<template>
  <div class="mt-8">
    <!-- Side-by-side Layout -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Left Side - Main Content (2/3) -->
      <div class="lg:col-span-2">
        <!-- Navigation -->
        <div class="border-surface-200 dark:border-surface-700 mb-4 flex flex-wrap gap-2 border-b">
          <button
            v-if="product.description"
            @click="scrollToSection('description')"
            class="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary flex items-center gap-2 py-2 transition-colors"
          >
            <i class="pi pi-info" />
            <span class="font-bold whitespace-nowrap">{{ t('products.information') }}</span>
          </button>
          <button
            v-if="Object.keys(product.containers).length"
            @click="scrollToSection('downloads')"
            class="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary flex items-center gap-2 px-4 py-2 transition-colors"
          >
            <i class="pi pi-download" />
            <span class="font-bold whitespace-nowrap">{{ t('downloads.title_listing') }}</span>
          </button>
          <button
            v-if="Object.keys(product.reviews).length"
            @click="scrollToSection('reviews')"
            class="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary flex items-center gap-2 px-4 py-2 transition-colors"
          >
            <i class="pi pi-star" />
            <span class="font-bold whitespace-nowrap">{{ t('reviews.title_listing') }}</span>
          </button>
          <button
            v-if="product.attributes.length"
            @click="scrollToSection('specifications')"
            class="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary flex items-center gap-2 px-4 py-2 transition-colors"
          >
            <i class="pi pi-cog" />
            <span class="font-bold whitespace-nowrap">{{ t('products.specifications') }}</span>
          </button>
        </div>

        <!-- Content Sections -->
        <div class="space-y-12">
          <section v-if="product.description" id="description" class="scroll-mt-4">
            <div class="text-surface-900 dark:text-surface-0 mt-2 mb-6 text-xl font-semibold">
              {{ t('products.information') }}
            </div>
            <p class="text-surface-700 dark:text-surface-100 mx-0 mt-0 mb-6 p-0 leading-normal">
              <span v-html="marked(product.description)" />
            </p>
          </section>

          <section v-if="Object.keys(product.containers).length" id="downloads" class="scroll-mt-4">
            <div class="text-surface-900 dark:text-surface-0 mt-2 mb-6 text-xl font-semibold">
              {{ t('downloads.title_listing') }}
            </div>
            <ProductDownloads :containers="product.containers" />
          </section>

          <section v-if="Object.keys(product.reviews).length" id="reviews" class="scroll-mt-4">
            <div class="text-surface-900 dark:text-surface-0 mt-2 mb-6 text-xl font-bold">
              {{ t('reviews.title_listing') }}
            </div>
            <div
              v-for="(reviewContent, reviewId) in product.reviews"
              :key="reviewId"
              class="text-surface-700 dark:text-surface-100 mx-0 mt-0 mb-6 p-0 leading-normal"
            >
              <span v-html="reviewContent" />
            </div>
          </section>

          <section v-if="product.attributes.length" id="specifications" class="scroll-mt-4">
            <div class="mt-2 mb-6 flex items-center justify-between">
              <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
                {{ t('products.specifications') }}
              </div>
              <Button icon="pi pi-download" text size="small" @click="exportSpecifications" />
            </div>
            <ProductSpecifications
              ref="specificationsRef"
              :attributes="product.attributes"
              :hide-header="true"
            />
          </section>
        </div>
      </div>

      <!-- Right Side - Crosssells & Key Specs (1/3) -->
      <div class="hide space-y-6 lg:col-span-1">
        <ProductCrosssells v-if="hasCrosssells" :crosssells="crosssells" />
        <ProductKeySpecs
          v-if="product.attributes.length"
          :attributes="product.attributes"
          @show-all-specs="scrollToSection('specifications')"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { marked } from 'marked'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  import ProductSpecifications from './ProductSpecifications.vue'
  import ProductKeySpecs from './ProductKeySpecs.vue'
  import type ProductDetails from '@/types/ProductDetails'
  import ProductDownloads from './ProductDownloads.vue'
  import ProductCrosssells from './ProductCrosssells.vue'
  import Button from 'primevue/button'

  const props = defineProps<{
    product: ProductDetails
    crosssells: any
  }>()
  const product = ref(props.product)
  const specificationsRef = ref<InstanceType<typeof ProductSpecifications> | null>(null)

  const hasCrosssells = computed(() => {
    const products = props.crosssells?.crosssellProducts || []
    const categories = props.crosssells?.crosssellCategories || []
    return products.length > 0 || categories.length > 0
  })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const exportSpecifications = () => {
    specificationsRef.value?.exportCSV()
  }
</script>
