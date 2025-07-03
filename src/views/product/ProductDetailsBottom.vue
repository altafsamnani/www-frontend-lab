<template>
    <div class="mt-8">
        <!-- Side-by-side Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Side - Main Content (2/3) -->
            <div class="lg:col-span-2">
                <!-- Navigation -->
                <div class="mb-4 flex flex-wrap gap-2 border-b border-surface-200 dark:border-surface-700">
                    <button v-if="product.description" @click="scrollToSection('description')"
                        class="flex items-center gap-2  py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">
                        <i class='pi pi-info' />
                        <span class="font-bold whitespace-nowrap">{{ t('products.information') }}</span>
                    </button>
                    <button v-if="Object.keys(product.containers).length" @click="scrollToSection('downloads')"
                        class="flex items-center gap-2 px-4 py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">
                        <i class='pi pi-download' />
                        <span class="font-bold whitespace-nowrap">{{ t('downloads.title_listing') }}</span>
                    </button>
                    <button v-if="Object.keys(product.reviews).length" @click="scrollToSection('reviews')"
                        class="flex items-center gap-2 px-4 py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">
                        <i class='pi pi-star' />
                        <span class="font-bold whitespace-nowrap">{{ t('reviews.title_listing') }}</span>
                    </button>
                    <button v-if="product.attributes.length" @click="scrollToSection('specifications')"
                        class="flex items-center gap-2 px-4 py-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">
                        <i class='pi pi-cog' />
                        <span class="font-bold whitespace-nowrap">{{ t('products.specifications') }}</span>
                    </button>
                </div>

                <!-- Content Sections -->
                <div class="space-y-12">
                    <section v-if="product.description" id="description" class="scroll-mt-4">
                        <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl mb-6 mt-2">{{
                            t('products.information') }}
                        </div>
                        <p class="leading-normal text-surface-700 dark:text-surface-100 p-0 mx-0 mt-0 mb-6">
                            <span v-html="marked(product.description)" />
                        </p>
                    </section>

                    <section v-if="Object.keys(product.containers).length" id="downloads" class="scroll-mt-4">
                        <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl mb-6 mt-2"> {{
                            t('downloads.title_listing') }}
                        </div>
                        <ProductDownloads :containers="product.containers" />
                    </section>

                    <section v-if="Object.keys(product.reviews).length" id="reviews" class="scroll-mt-4">
                        <div class="text-surface-900 dark:text-surface-0 font-bold text-xl mb-6 mt-2">{{
                            t('reviews.title_listing') }}
                        </div>
                        <div v-for="(reviewContent, reviewId) in product.reviews" :key="reviewId"
                            class="leading-normal text-surface-700 dark:text-surface-100 p-0 mx-0 mt-0 mb-6">
                            <span v-html="reviewContent" />
                        </div>
                    </section>

                    <section v-if="product.attributes.length" id="specifications" class="scroll-mt-4">
                        <div class="flex items-center justify-between mb-6 mt-2">
                            <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl">{{
                                t('products.specifications') }}</div>
                            <Button icon="pi pi-download" text size="small" @click="exportSpecifications" />
                        </div>
                        <ProductSpecifications ref="specificationsRef" :attributes="product.attributes" :hide-header="true" />
                    </section>
                </div>
            </div>

            <!-- Right Side - Key Specs (1/3) -->
            <div class="lg:col-span-1">
                <ProductKeySpecs v-if="product.attributes.length" :attributes="product.attributes"
                    @show-all-specs="scrollToSection('specifications')" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { marked } from 'marked'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import ProductSpecifications from './ProductSpecifications.vue';
import ProductKeySpecs from './ProductKeySpecs.vue';
import type ProductDetails from '@/types/ProductDetails';
import ProductDownloads from './ProductDownloads.vue';
import Button from 'primevue/button';


const props = defineProps<{
    product: ProductDetails
}>()
const product = ref(props.product)
const specificationsRef = ref<InstanceType<typeof ProductSpecifications> | null>(null)

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
