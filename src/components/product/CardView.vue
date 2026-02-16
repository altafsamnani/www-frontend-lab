<template>
    <div v-for="(item, index) in props.items" :key="index"
        class="col-span-12 sm:col-span-12 md:col-span-6 xl:col-span-4 p-2">
        <div
            class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
            <div class="flex justify-center rounded">
                <router-link :to="{ name: 'Products', params: { id: item.id } }" target="_blank"
                    rel="noopener noreferrer">
                    <div class="relative mx-auto">
                        <img class="rounded w-full" :src="item.images.length ? item.images[0].urlFull : defaultUrl"
                            :alt="item.name" style="max-width: 300px" />
                        <div v-if="item.stock.level" class="absolute rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="t('config.stock_status.' + item.stock.stock_slug)"
                                :severity="getSeverity(item.stock.level)"></Tag>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="pt-6">
                <div class="flex flex-row justify-between items-start gap-2">
                    <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                            item.category.map(category => t('categories.' + category.slug)).join(', ')
                            }}</span>
                        <router-link :to="{ name: 'Products', params: { id: item.id } }">
                            <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                        </router-link>
                    </div>
                    <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                            <span class="text-surface-900 dark:text-surface-100 font-medium text-sm">{{ item.rating
                                ?? 4
                                }}</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                    </div>

                </div>
                <div class="flex flex-col gap-6 mt-6">
                    <ProductPrice v-if="props.isUserLoggedIn" :price="item.price" :discount="item.discount" />
                    <div class="flex gap-2">
                        <Button v-if="!props.isUserLoggedIn" :label="t('products.login_to_see_price')"
                            @click="goToLogin" class="w-full" />
                        <Button v-else icon="pi pi-shopping-cart" :label="t('products.add_to_cart')"
                            :disabled="item.stock.level > 4" class="flex-auto whitespace-nowrap"
                            @click="addToCart(item)"></Button>
                        <FavouriteButton v-if="props.isUserLoggedIn" :product-id="item.id.toString()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getSeverity } from '@/includes/helpers'
import { useI18n } from 'vue-i18n'
import type ProductDetails from '@/types/ProductDetails'
import FavouriteButton from '@/components/favourites/FavouriteButton.vue'
import ProductPrice from '@/components/product/ProductPrice.vue'
const { t } = useI18n()
const props = defineProps<{
    items: []
    isUserLoggedIn?: boolean
}>()
const defaultUrl = import.meta.env.VITE_DEFAULT_IMAGE
const emit = defineEmits(['addToCart', 'goToLogin'])

function addToCart(ProductDetails: ProductDetails) {
    emit('addToCart', ProductDetails)
}

function goToLogin() {
    emit('goToLogin')
}
</script>