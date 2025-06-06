<template>
    <Tabs :value="product.description ? '0' : product.attributes.length ? '1' : '2'" class="mt-8">
        <TabList class="mb-4 ">
            <Tab value="0" v-if="product.description" class="flex items-center gap-2">
                <i class='pi pi-info' />
                <span class="font-bold whitespace-nowrap">{{ t('products.description') }}</span>
            </Tab>
            <Tab value="1" v-if="product.attributes.length" class="flex items-center gap-2">
                <i class='pi pi-list' />
                <span class="font-bold whitespace-nowrap">{{ t('products.specifications') }}</span>
            </Tab>
            <Tab value="2" class="flex items-center gap-2">
                <i class='pi pi-download' />
                <span class="font-bold whitespace-nowrap">{{ t('downloads.title_listing') }}</span>
            </Tab>
            <Tab value="3" class="flex items-center gap-2">
                <i class='pi pi-list' />
                <span class="font-bold whitespace-nowrap">{{ t('reviews.title_listing') }}</span>
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <div class="text-surface-900 dark:text-surface-0 font-medium text-3xl mb-6 mt-2">{{
                    t('products.description') }}
                </div>
                <p class="leading-normal text-surface-700 dark:text-surface-100 p-0 mx-0 mt-0 mb-6"> 
                    <span v-html="marked(product.description)" />
                </p>
            </TabPanel>
            <TabPanel value="1">
                <ProductSpecifications :attributes="product.attributes" />
            </TabPanel>
            <TabPanel value="2">
                <div class="text-surface-900 dark:text-surface-0 font-medium text-3xl mb-6 mt-2">{{
                    t('downloads.title_listing') }}
                </div>
            </TabPanel>
            <TabPanel value="3">
                <div class="text-surface-900 dark:text-surface-0 font-medium text-3xl mb-6 mt-2">{{
                    t('reviews.title_listing') }}
                </div>
                <ul class="list-none p-0 m-0">
                    <li class="pb-8 border-b border-surface">
                        <span>
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-surface-300 dark:text-surface-500" />
                        </span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl my-4">Absolute
                            Perfection!</div>
                        <p class="mx-0 mt-0 mb-4 text-surface-700 dark:text-surface-100 leading-normal">
                            Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu dictum varius duis at
                            consectetur lorem donec massa. Imperdiet proin fermentum leo vel orci porta non.
                            Porttitor rhoncus dolor purus non.
                        </p>
                        <span class="text-surface-600 dark:text-surface-200 font-medium">Darlene Robertson, 2 days
                            ago</span>
                    </li>
                    <li class="py-8 border-b border-surface">
                        <span>
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                            <i class="pi pi-star-fill !text-xl !leading-none text-surface-300 dark:text-surface-500" />
                        </span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl my-4">Classy</div>
                        <p class="mx-0 mt-0 mb-4 text-surface-700 dark:text-surface-100 leading-normal">Venenatis
                            cras sed felis eget. Proin nibh nisl condimentum id venenatis a condimentum.</p>
                        <span class="text-surface-600 dark:text-surface-200 font-medium">Kristin Watson, 2 days
                            ago</span>
                    </li>
                </ul>
            </TabPanel>

        </TabPanels>
    </Tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { marked } from 'marked'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import Tabs from 'primevue/tabs';
import ProductSpecifications from './ProductSpecifications.vue';
import type ProductDetails from '@/types/ProductDetails';


const props = defineProps<{
    product: ProductDetails
}>()
const product = ref(props.product)

</script>
