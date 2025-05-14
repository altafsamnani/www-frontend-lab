<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-6">
            <div class="flex">
                <div class="flex flex-col w-2/12 justify-left">
                    <img v-for="(image, i) of product.images" :key="image.id" :src="image.url"
                        class="w-full cursor-pointer border-2 rounded-border border-transparent transition-colors duration-150"
                        :class="{ 'border-primary': selectedImageIndex === i }" @click="selectedImageIndex = i" />
                </div>
                <div class="pl-4 w-10/12">
                    <div v-if="product.stock.level" class="flex rounded-border justify-end ">
                        <Tag :value="t('config.stock_status.' + product.stock.stock_slug)"
                            :severity="getSeverity(product.stock.level)"></Tag>
                    </div>
                    <img :src="product.images[selectedImageIndex].url" class="w-full rounded-border" />
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 py-4 lg:pl-12">
            <div class="flex items-right mb-4">
                <span class="mr-4">
                    <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                    <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                    <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                    <i class="pi pi-star-fill !text-xl !leading-none text-primary mr-1" />
                    <i class="pi pi-star !text-surface-700 dark:text-surface-100 mr-1" />
                </span>
                <span class="text-sm"><b class="text-surface-900 dark:text-surface-0 mr-1">24</b> <span
                        class="text-surface-500 dark:text-surface-300" />reviews</span>
            </div>
            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                product.category.map(category => t('categories.' + category.slug)).join(', ')
            }}</span>
            <div class="flex items-center text-xl font-medium text-surface-900 dark:text-surface-0 mb-6">{{
                product.name }}</div>
            <div class="flex items-center justify-between ">
                <div class="text-surface-900 dark:text-surface-0 font-medium text-3xl block">€{{ product.price }}
                </div>

            </div>
            <div class="mb-8">
                <span class="text-surface-600 dark:text-surface-200 line-through">€{{ product.price -
                    (product.price * 0.25) }}</span>
                <span class="ml-2 text-primary font-medium">%25</span>
            </div>

            <div class="hidden font-bold text-surface-900 dark:text-surface-0 mb-4">Color</div>
            <div class="hidden flex items-center mb-8">
                <div class="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 mr-4 cursor-pointer transition-all duration-300"
                    :class="color === 'blue' ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-950' : null"
                    @click="color = 'blue'" />
                <div class="w-8 h-8 flex-shrink-0 rounded-full bg-purple-500 mr-4 cursor-pointer transition-all duration-300"
                    :class="color === 'purple' ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-950' : null"
                    @click="color = 'purple'" />
                <div class="w-8 h-8 flex-shrink-0 rounded-full bg-pink-500 mr-4 cursor-pointer transition-all duration-300"
                    :class="color === 'pink' ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-950' : null"
                    @click="color = 'pink'" />
            </div>

            <div class="hidden mb-4 flex items-center justify-between">
                <span class="font-bold text-surface-900 dark:text-surface-0">Size</span>
                <a tabindex="0"
                    class="cursor-pointer text-surface-600 dark:text-surface-200 text-sm flex items-center">Size
                    Guide <i class="ml-1 pi pi-angle-right" /></a>
            </div>
            <div class="hidden flex items-center mb-8">
                <div class="h-8 w-8 sm:h-12 sm:w-12 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded-border mr-4 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
                    :class="{
                        'border-primary border-2 text-primary': size === 'XS',
                        'border border-surface-300 dark:border-surface-500': size !== 'XS'
                    }" @click="size = 'XS'">
                    XS
                </div>
                <div class="h-8 w-8 sm:h-12 sm:w-12 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded-border mr-4 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
                    :class="{
                        'border-primary border-2 text-primary': size === 'S',
                        'border border-surface-300 dark:border-surface-500': size !== 'S'
                    }" @click="size = 'S'">
                    S
                </div>
                <div class="h-8 w-8 sm:h-12 sm:w-12 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded-border mr-4 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
                    :class="{
                        'border-primary border-2 text-primary': size === 'M',
                        'border border-surface-300 dark:border-surface-500': size !== 'M'
                    }" @click="size = 'M'">
                    M
                </div>
                <div class="h-8 w-8 sm:h-12 sm:w-12 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded-border mr-4 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
                    :class="{
                        'border-primary border-2 text-primary': size === 'L',
                        'border border-surface-300 dark:border-surface-500': size !== 'L'
                    }" @click="size = 'L'">
                    L
                </div>
                <div class="h-8 w-8 sm:h-12 sm:w-12 text-surface-900 dark:text-surface-0 inline-flex justify-center items-center flex-shrink-0 rounded-border mr-4 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors"
                    :class="{
                        'border-primary border-2 text-primary': size === 'XL',
                        'border border-surface-300 dark:border-surface-500': size !== 'XL'
                    }" @click="size = 'XL'">
                    XL
                </div>
            </div>

            <div class="font-bold text-surface-900 dark:text-surface-0 mb-4 leading-normal">Quantity</div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <InputNumber v-model="quantity" :show-buttons="true" button-layout="horizontal"
                    spinner-mode="horizontal" :min="0" class="w-32" input-class="w-12 text-center"
                    decrement-button-class="p-button-text" increment-button-class="p-button-text"
                    increment-button-icon="pi pi-plus" decrement-button-icon="pi pi-minus" />
                <div class="flex items-center flex-1 mt-4 sm:mt-0 ml-0 sm:ml-8">
                    <Button label="Add to Cart" class="flex-1 mr-8" />
                    <i class="pi !text-2xl !leading-normal cursor-pointer" :class="{
                        'pi-heart text-surface-600 dark:text-surface-200': !liked,
                        'pi-heart-fill text-pink-500': liked
                    }" @click="liked = !liked" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps,ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { getSeverity } from '@/includes/helpers'
import Button from 'primevue/button';
import type ProductDetails from '@/types/ProductDetails';
const { t } = useI18n()

const selectedImageIndex = ref(0)
const quantity = ref(1);
const liked = ref(false);
const props = defineProps<{
    product: ProductDetails
}>()
const product = ref(props.product)

</script>
