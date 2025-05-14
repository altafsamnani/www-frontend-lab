<template>
    <LoaderView v-if="isLoading"  />
    <div v-else class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <ProductDetailsTop :product="product" :selectedImageIndex="selectedImageIndex" />
      <ProductDetailsBottom :product="product" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search';

import LoaderView from '@/components/icons/LoaderView.vue';
import ProductDetailsTop from './ProductDetailsTop.vue';
import ProductDetailsBottom from './ProductDetailsBottom.vue';



const searchStore = useSearchStore()
const { fetchProduct } = searchStore
const { product } = storeToRefs(searchStore)
const { t } = useI18n()
const route = useRoute()
const isLoading = ref(true)
const productId = ref(route.params.id)
const selectedImageIndex = ref(0)

onMounted(async () => {
    await fetchProduct(productId.value).then(() => {
        isLoading.value = false
    })
})

</script>
