<template>
    <LoaderView v-if="isLoading" />
    <div v-else class="bg-surface-0 dark:bg-surface-950 ">
        <VBreadcrumb :model="breadcrumbItems" class="mb-4 text-sm" :pt="{
            root: 'bg-surface-0 dark:bg-surface-900 p-2 overflow-visible',
            list: 'm-0 p-0 list-none flex items-center flex-wrap gap-0',
            itemLink: 'no-underline flex items-center gap-1 transition-colors duration-200 rounded-md text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary',
            itemLabel: 'font-medium' + ' ' + 'text-[8px]',
            separator: 'flex items-center text-surface-400 dark:text-surface-500 mx-0.5',
            separatorIcon: 'text-[5px] opacity-60'
        }">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
            </template>
        </VBreadcrumb>
        <ProductDetailsTop :product="product" :selectedImageIndex="selectedImageIndex" />
        <ProductDetailsBottom :product="product" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search';

import LoaderView from '@/components/icons/LoaderView.vue';
import ProductDetailsTop from './ProductDetailsTop.vue';
import ProductDetailsBottom from './ProductDetailsBottom.vue';
import VBreadcrumb from '@/volt/Breadcrumb.vue';



const searchStore = useSearchStore()
const { fetchProduct } = searchStore
const { product } = storeToRefs(searchStore)
const route = useRoute()
const isLoading = ref(true)
const productId = ref(route.params.id)
const selectedImageIndex = ref(0)

const breadcrumbItems = computed(() => {
    if (!product.value?.categories || !Array.isArray(product.value.categories)) return []

    const categories = [...product.value.categories].reverse()
    const items = categories.map(category => ({
        label: category.name,
        route: `/search/${category.slug}`
    }))

    items.push({
        label: product.value.name,
        route: `/products/${product.value.id}`
    })

    return items
})

onMounted(async () => {
    await fetchProduct(productId.value).then(() => {
        isLoading.value = false
    })
})

</script>
