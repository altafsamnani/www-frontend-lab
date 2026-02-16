<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-6">
            <div class="flex">
                <div class="flex flex-col w-2/12 justify-left">
                    <img v-for="(image, i) of displayImages" :key="image.id" :src="image.url"
                        class="w-full cursor-pointer border-2 rounded-border border-transparent transition-colors duration-150"
                        :class="{ 'border-primary': selectedImageIndex === i }" @click="selectedImageIndex = i" />
                </div>
                <div class="pl-4 w-10/12">
                    <div v-if="product.stock.level" class="flex rounded-border justify-end ">
                        <Tag :value="t('config.stock_status.' + product.stock.stock_slug)"
                            :severity="getSeverity(product.stock.level)"></Tag>
                    </div>
                    <div class="relative">
                        <img :src="selectedImage" class="w-full rounded-border" />

                        <!-- Product Overlays - Display as transparent overlays on top of image -->
                        <template v-if="productOverlays && productOverlays.length">
                            <div v-for="overlay in productOverlays" :key="overlay.id" class="absolute inset-0">
                                <img v-if="overlay.images?.length" :src="getOverlayImageUrl(overlay.images[0])"
                                    :alt="overlay.name" class="w-full h-full object-contain pointer-events-none" />
                            </div>
                        </template>
                    </div>

                    <!-- Product Features Icons - Below Image -->
                    <div v-if="product.filterIcons && product.filterIcons.length > 0" class="mt-4">
                        <div class="flex flex-wrap gap-1.5">
                            <div v-for="icon in product.filterIcons" :key="icon.id" class="group relative">
                                <div
                                    class="w-10 h-10 p-1 rounded bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary hover:shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
                                    <img :src="icon.url" :alt="icon.name" class="w-full h-full object-contain" />
                                </div>
                                <!-- Tooltip on hover -->
                                <div
                                    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-900 dark:bg-surface-700 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                    {{ getIconLabel(icon.name) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 py-4 lg:pl-12">
            <div class="hidden items-right mb-4">
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
            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">
                {{ t('products.view_more') }}
                <template v-for="(category, index) in product.categories" :key="category.id">
                    <router-link v-if="category.slug" :to="{ name: 'Search', params: { categorySlug: category.slug } }"
                        class="hover:text-primary transition-colors duration-150">
                        {{ t('categories.' + category.slug) }}
                    </router-link>
                    <span v-else class="text-surface-500 dark:text-surface-400">
                        {{ category.name }}
                    </span>
                    <span v-if="index < product.categories.length - 1">, </span>
                </template>
            </span>
            <div class="flex items-center text-xl font-medium text-surface-900 dark:text-surface-0 mb-6">{{
                product.name }}</div>

            <!-- Price Section - Show only when logged in -->
            <div v-if="isUserLoggedIn" class="mb-8">
                <ProductPrice :price="product.price" :discount="product.discount" size="large" />
            </div>

            <!-- Login to see price section -->
            <div v-if="!isUserLoggedIn"
                class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 mb-8 bg-surface-50 dark:bg-surface-800">
                <div class="text-center">
                    <i class="pi pi-lock text-3xl text-surface-400 dark:text-surface-500 mb-4"></i>
                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">{{
                        t('products.login_to_see_price')
                        }}</h3>
                    <p class="text-surface-600 dark:text-surface-300 mb-4">{{ t('products.login_description') }}</p>
                    <Button :label="t('login.label_button')" @click="goToLogin" class="w-full" />
                </div>
            </div>

            <div class="hidden font-bold text-surface-900 dark:text-surface-0 mb-4">Color</div>
            <div class="hidden items-center mb-8">
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

            <!-- Quantity and Cart Section - Show only when logged in -->
            <div v-if="isUserLoggedIn">
                <div class="font-bold text-surface-900 dark:text-surface-0 mb-4 leading-normal">{{
                    t('products.quantity')
                    }}</div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-center flex-1 mt-4 sm:mt-0 ml-0">
                        <AddToCart :product="productForCart" :initialQuantity="initialQuantity" :price="product.price"
                            class="flex-1 mr-4" />
                        <FavouriteButton :product-id="product.id.toString()" />
                    </div>
                </div>
            </div>

            <!-- Product Benefits -->
            <div class="mt-6 space-y-3">
                <div class="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <i class="pi pi-clock mr-2 text-green-600"></i>
                    <span>{{ t('products.benefits.same_day_delivery') }}</span>
                </div>
                <div class="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <i class="pi pi-shield mr-2 text-blue-600"></i>
                    <span>{{ t('products.benefits.warranty') }}</span>
                </div>
                <div class="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <i class="pi pi-refresh mr-2 text-green-600"></i>
                    <span>{{ t('products.benefits.free_exchange') }}</span>
                </div>
                <div class="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <i class="pi pi-star mr-2 text-yellow-500"></i>
                    <span>{{ t('products.benefits.customer_rating') }}</span>
                </div>
                <div class="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <i class="pi pi-file-edit mr-2 text-blue-600"></i>
                    <span>{{ t('products.benefits.request_quote') }}</span>
                </div>
                <div class="flex items-center text-sm text-surface-600 dark:text-surface-300">
                    <i class="pi pi-user mr-2 text-purple-600"></i>
                    <span>{{ t('products.benefits.personal_advice') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getSeverity } from '@/includes/helpers'
import { useAuthStore, isLoggedIn } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import type ProductDetails from '@/types/ProductDetails'
import AddToCart from '@/components/cart/AddToCart.vue'
import FavouriteButton from '@/components/favourites/FavouriteButton.vue'
import ProductPrice from '@/components/product/ProductPrice.vue'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const { productOverlays } = storeToRefs(productStore)
const { fetchProductOverlays } = productStore

const selectedImageIndex = ref(0)
const color = ref('blue');
const defaultUrl = import.meta.env.VITE_DEFAULT_IMAGE

const props = defineProps<{
    product: ProductDetails
}>()
const product = ref(props.product)

// Create a reactive authentication state that properly updates
const isUserLoggedIn = computed(() => {
    // Primary check: if user exists in store (reactive)
    if (authStore.user) return true
    // Secondary check: if accessToken exists in store (reactive)
    if (authStore.accessToken) return true
    // Fallback: check localStorage directly (for initial page load)
    return isLoggedIn()
})

// Login navigation function
const goToLogin = () => {
    router.push({
        name: 'login',
        query: { redirect: router.currentRoute.value.fullPath }
    })
}

const displayImages = computed(() => {
    return product.value.images && product.value.images.length > 0
        ? product.value.images
        : [{ id: 'default', url: defaultUrl }]
})

const selectedImage = computed(() => {
    return displayImages.value[selectedImageIndex.value]?.url || defaultUrl
})

// Get the correct initial quantity from cart if item exists
const initialQuantity = computed(() => {
    const existingItem = cartStore.cartItems.find(item => item.productId === product.value.id)
    return existingItem ? existingItem.quantity : 1
})

// Transform product data for AddToCart component
const productForCart = computed(() => {
    return {
        id: product.value.id || 0,
        name: product.value.name,
        article_nr: (product.value as any).article_nr || `ART-${product.value.id}`,
        price: product.value.price,
        image: selectedImage.value,
        category: product.value.category?.[0]?.name || '',
        brand: Array.isArray(product.value.brand) && product.value.brand.length > 0 ? (product.value.brand as any)[0]?.name || '' : '',
        description: product.value.description || ''
    }
})

// Fetch product overlays
onMounted(async () => {
    if (product.value.id) {
        await fetchProductOverlays(product.value.id)
    }
})

// Helper function to get overlay image URL
const getOverlayImageUrl = (image: any) => {
    if (!image) return ''
    return image.url || `/api/images/${image.id}`
}

// Helper function to format icon label from filename
const getIconLabel = (filename: string): string => {
    if (!filename) return ''

    // Remove file extension and icon prefix
    const cleanName = filename
        .replace(/^icon-/, '')
        .replace(/\.(png|jpg|jpeg|svg)$/i, '')

    // Replace underscores and hyphens with spaces, capitalize words
    return cleanName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

</script>
