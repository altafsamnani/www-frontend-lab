<template>
    <div class="max-w-7xl mx-auto px-4 lg:px-0">
        <div class="flex items-stretch relative min-h-[60px]">
            <!-- Left side: Logo section (280px to match LeftMenu width) -->
            <div class="w-[280px] hidden lg:flex items-center justify-start px-4">
                <RouterLink to="/">
                    <img class="h-8 w-auto"
                        :src="theme == 'light' ? '/images/logos/logo-osec-wit.svg' : '/images/logos/logo-osec.svg'"
                        alt="" />
                </RouterLink>
            </div>

            <!-- Mobile menu button and logo -->
            <div class="flex lg:hidden items-center">
                <button @click="mobileMenuStore.toggleMenu()"
                    class="mr-4 flex items-center justify-center z-20 cursor-pointer text-surface-0 dark:text-surface-900 p-2 hover:bg-surface-700/20 dark:hover:bg-surface-100/20 rounded-lg transition-colors">
                    <i class="pi pi-bars text-2xl" />
                </button>
                <RouterLink to="/">
                    <img class="h-8 w-auto"
                        :src="theme == 'light' ? '/images/logos/logo-osec-wit.svg' : '/images/logos/logo-osec.svg'"
                        alt="" />
                </RouterLink>
            </div>

            <!-- Right side: Search and other elements -->
            <div class="flex items-center flex-1 ml-2 lg:ml-0">
                <ProductSearchAutoComplete class="w-full" @product-select="onProductSelected" @search="onSearch"
                    @clear="onClearSearch" />
            </div>

            <!-- Notifications section -->
            <div class="flex items-center ml-4 lg:ml-6">
                <Popover ref="notificationsPanel">
                    <div>
                        <h2 class="mb-2 text-lg font-semibold">{{ $t('navigation.notifications') }}</h2>
                        <p v-for="notification in notifications" :key="notification.id">
                            {{ notification.msg }}
                        </p>
                    </div>
                </Popover>
            </div>

            <!-- Language and theme section -->
            <div class="flex items-center ml-4 lg:ml-6">
                <ul class="list-none p-0 m-0 flex">
                    <li class="inline-flex relative">
                        <!-- language selector -->
                        <Button :icon="theme == 'light' ? 'pi pi-globe text-surface-0' : 'pi pi-globe text-surface-900'"
                            severity="secondary" text aria-label="Select Dark Mode" @click="toggleLocale"
                            aria-haspopup="true" aria-controls="locale_menu" />
                        <Menu :model="localeItems" ref="localeMenu" id="locale_menu" :popup="true">
                            <template #item="{ item, props }">
                                <a v-if="item.language == 'nl'" class="block p-2 cursor-pointer"
                                    @click="handleLocaleClick('nl')">
                                    <span class="ml-2" :class="{ 'font-semibold': $i18n.locale === 'nl' }">{{
                                        $t('languages.nl')
                                        }}</span>
                                </a>
                                <a v-else @click="handleLocaleClick('en')" class="block p-2 cursor-pointer">
                                    <span class="ml-2" :class="{ 'font-semibold': $i18n.locale === 'en' }">{{
                                        $t('languages.en')
                                        }}</span>
                                </a>
                            </template>
                        </Menu>
                    </li>
                    <li class="inline-flex relative border-r-1 border-surface-200 dark:border-surface-700">
                        <!-- Darkmode Switcher -->
                        <Button :icon="theme == 'light' ? 'pi pi-moon text-surface-0' : 'pi pi-sun text-surface-900'"
                            @click="handleToggleDarkModeClick()" severity="secondary" text
                            aria-label="Select Dark Mode" />
                    </li>
                </ul>
            </div>

            <!-- User account and cart section -->
            <div class="flex items-center ml-4 lg:ml-6">
                <ul class="list-none p-0 m-0 flex">
                    <!-- My Account Section - Show only when logged in -->
                    <li v-if="isUserLoggedIn" class="inline-flex relative">
                        <a v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-scalein',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeout',
                            hideOnOutsideClick: true
                        }"
                            class="text-surface-0 dark:text-surface-900 font-medium inline-flex items-center cursor-pointer px-1 lg:px-4 mr-2 lg:mr-0 border-b-2 border-transparent hover:border-primary select-none">
                            <div
                                class="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-xs">
                                {{ userInitials }}
                            </div>
                            <span class="hidden lg:inline ml-2">{{ userName }}</span>
                        </a>
                        <div
                            class="hidden rounded-border bg-surface-0 dark:bg-surface-900 p-4 shadow absolute right-0 top-full z-10 w-60 origin-top">
                            <ul class="list-none p-0 m-0">
                                <li>
                                    <a @click="goToOrders"
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-box text-lg mr-2" />
                                        <span>{{ $t('navigation.orders') }}</span>
                                    </a>
                                </li>
                                <li>
                                    <a @click="goToCart"
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-shopping-cart text-lg mr-2" />
                                        <span>{{ $t('navigation.my_cart') }}</span>
                                    </a>
                                </li>
                                <li>
                                    <a @click="goToFavourites"
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-heart text-lg mr-2" />
                                        <span>{{ $t('navigation.favourites') }}</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-star text-lg mr-2" />
                                        <span>{{ $t('navigation.reviews') }}</span>
                                    </a>
                                </li>
                                <li>
                                    <a @click="submitLogout"
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-sign-out text-lg mr-2" />
                                        <span>{{ $t('navigation.sign_out') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <!-- Login Section - Show only when not logged in -->
                    <li v-else class="inline-flex relative">
                        <RouterLink to="/login"
                            class="text-surface-0 dark:text-surface-900 font-medium inline-flex items-center cursor-pointer px-1 lg:px-4 mr-2 lg:mr-0 border-b-2 border-transparent hover:border-primary select-none">
                            <i class="pi pi-sign-in text-xl" />
                            <span class="hidden lg:inline ml-2">{{ $t('navigation.login') }}</span>
                        </RouterLink>
                    </li>
                    <li v-if="isUserLoggedIn" class="inline-flex relative">
                        <a :class="[
                            'font-medium inline-flex items-center cursor-pointer py-1 px-1 lg:px-4 border-b-2 border-transparent ',
                            isCartDropdownOpen ? 'bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0' : 'text-surface-0 dark:text-surface-900'
                        ]" @click="toggleCartDropdown">
                            <CartBadge />
                        </a>
                        <Popover ref="cartPopover" @show="isCartDropdownOpen = true" @hide="isCartDropdownOpen = false">
                            <div class="bg-surface-0 dark:bg-surface-900 p-6 w-[28rem]">
                            <div v-if="cartStore.loading" class="text-center py-8">
                                <i class="pi pi-spin pi-spinner text-2xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600 dark:text-gray-300">Loading cart...</p>
                            </div>
                            <div v-else-if="cartStore.error" class="text-center py-8">
                                <i class="pi pi-exclamation-triangle text-2xl text-red-500 mb-4"></i>
                                <p class="text-red-600 dark:text-red-400">{{ cartStore.error }}</p>
                                <Button @click="cartStore.fetchCart()" size="small" severity="secondary" class="mt-2">
                                    Retry
                                </Button>
                            </div>
                            <div v-else-if="cartStore.isCartEmpty" class="text-center py-8">
                                <i class="pi pi-shopping-cart text-4xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600 dark:text-gray-300">{{ $t('navigation.cart_empty') }}</p>
                            </div>
                            <div v-else>
                                <!-- Cart Items List -->
                                <div class="max-h-52 overflow-y-auto -mx-6 px-6">
                                    <div v-for="item in cartStore.cartItems.slice(0, 3)" :key="item.id"
                                        class="flex gap-3 py-3 border-b border-surface-100 dark:border-surface-800 last:border-b-0">
                                        <img :src="item.thumbnail || '/images/default-product.png'"
                                            class="w-14 h-14 flex-shrink-0 rounded-md object-cover bg-surface-100 dark:bg-surface-800" />
                                        <div class="flex-1 min-w-0">
                                            <router-link :to="{ name: 'Products', params: { id: item.productId } }"
                                                class="text-sm font-medium text-surface-900 dark:text-surface-0 hover:text-primary line-clamp-1">
                                                {{ item.name }}
                                            </router-link>
                                            <div class="flex items-center gap-2 mt-0.5">
                                                <span class="text-xs text-surface-500">{{ item.articleNr }}</span>
                                                <span v-if="item.discountPercentage > 0"
                                                    class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                    -{{ item.discountPercentage }}%
                                                </span>
                                            </div>
                                            <div class="flex items-center justify-between mt-1">
                                                <span class="text-xs text-surface-500">{{ item.quantity }}x</span>
                                                <div class="flex items-center gap-1.5">
                                                    <span v-if="item.discountPercentage > 0"
                                                        class="text-xs text-surface-400 line-through">
                                                        {{ (item.totalPrice || 0).toFixed(2) }}
                                                    </span>
                                                    <span
                                                        class="text-sm font-semibold text-surface-900 dark:text-surface-0">
                                                        €{{ (item.totalNetPrice || 0).toFixed(2) }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- More Items Indicator -->
                                <div v-if="cartStore.cartItems.length > 3"
                                    class="py-2 text-center text-xs text-surface-500 border-b border-surface-100 dark:border-surface-800">
                                    +{{ cartStore.cartItems.length - 3 }} {{ $t('navigation.more_items') }}
                                </div>

                                <!-- Compact Summary -->
                                <div class="pt-3 space-y-1.5">
                                    <div class="flex justify-between text-xs text-surface-600 dark:text-surface-400">
                                        <span>{{ $t('cart.orderSummary.items') }} ({{ cartStore.cartSummary.itemCount
                                        }})</span>
                                        <span>€{{ (cartStore.cartTotalAmount + cartStore.cartTotalDiscount).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div v-if="cartStore.cartTotalDiscount > 0" class="flex justify-between text-xs">
                                        <span class="text-green-600 dark:text-green-400">{{
                                            $t('cart.orderSummary.discount')
                                        }}</span>
                                        <span class="text-green-600 dark:text-green-400 font-medium">-€{{
                                            cartStore.cartTotalDiscount.toFixed(2) }}</span>
                                    </div>
                                    <div
                                        class="flex justify-between items-center pt-2 border-t border-surface-200 dark:border-surface-700">
                                        <span class="text-sm font-medium text-surface-900 dark:text-surface-0">{{
                                            $t('cart.orderSummary.total') }}</span>
                                        <span class="text-base font-bold text-primary">€{{
                                            cartStore.cartTotalAmount.toFixed(2)
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 gap-2">
                                <Button @click="goToCart" class="flex-1" outlined>{{ $t('navigation.view_cart')
                                    }}</Button>
                                <Button v-if="cartStore.isCartEmpty" @click="goToContinueShopping" class="flex-1">
                                    <i class="pi pi-search mr-2"></i>
                                    {{ $t('button.search') }}
                                </Button>
                                <Button v-else @click="goToCheckout" class="flex-1">{{
                                    $t('navigation.purchase') }}</Button>
                            </div>
                            </div>
                        </Popover>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
import { setI18nLanguage } from '@/i18n'
import { useAuthStore, isLoggedIn } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { localize } from '@vee-validate/i18n'
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import ProductSearchAutoComplete from '@/components/search/ProductSearchAutoComplete.vue';
import CartBadge from '@/components/cart/CartBadge.vue';
import { useCartStore } from '@/stores/cart';
import { useMobileMenuStore } from '@/stores/mobileMenu';
import { useFavouritesStore } from '@/stores/favourites';

const notifyStore = useNotifyStore()
const router = useRouter()
const authStore = useAuthStore()
const mobileMenuStore = useMobileMenuStore()
const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()
const { user } = storeToRefs(authStore)
const { handleLogout } = authStore

// Create a reactive authentication state that properly updates
const isUserLoggedIn = computed(() => {
    // Primary check: if user exists in store (reactive)
    if (user.value) return true
    // Secondary check: if accessToken exists in store (reactive)
    if (authStore.accessToken) return true
    // Fallback: check localStorage directly (for initial page load)
    return isLoggedIn()
})

const { t } = useI18n()
const isCartDropdownOpen = ref(false)

// Computed properties for user display
const userName = computed(() => {
    if (user.value?.firstName && user.value?.lastName) {
        return `${user.value.firstName} ${user.value.lastName}`
    }
    return user.value?.email || t('navigation.my_account')
})

const userInitials = computed(() => {
    if (user.value?.firstName && user.value?.lastName) {
        return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`.toUpperCase()
    }
    if (user.value?.email) {
        return user.value.email.charAt(0).toUpperCase()
    }
    return 'U'
})

// Product search handlers
const onProductSelected = (product: any) => {
    // Product selection is already handled in the component itself
    // This is just for additional tracking or analytics if needed
    console.log('Product selected:', product)
}

const onSearch = (query: string) => {
    // Track search query for analytics if needed
    console.log('Search query:', query)
}

const onClearSearch = () => {
    // Handle clear search if needed
    console.log('Search cleared')
}

const submitLogout = async () => {
    await handleLogout()
    notifyStore.notify(t('notification.logout'), NotificationType.Success)
    window.location.reload()
}

const theme = ref()

onMounted(async () => {
    theme.value = (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : localStorage.getItem('theme') || 'light';
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
    document.querySelector('html')?.setAttribute('class', theme.value)
    localStorage.setItem('theme', theme.value)
    if (isUserLoggedIn.value) {
        authStore.fetchUser()
        cartStore.fetchCartSummary()
        favouritesStore.initializeStore()
    }
})

const handleToggleDarkModeClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
    document.querySelector('html')?.setAttribute('class', theme.value)
    localStorage.setItem('theme', theme.value)
}
const toggleLocale = (event) => {
    localeMenu.value.toggle(event)
}
const handleLocaleClick = (selectedLocale: string) => {
    setI18nLanguage(selectedLocale)
    localize(selectedLocale)
}

const localeMenu = ref()
const localeItems = ref([
    {
        label: 'English',
        language: 'en'
    },
    {
        label: 'Dutch',
        language: 'nl'
    }
])

const notifications = computed(() => {
    return [
        {
            id: 1,
            msg: t('notification.login')
        }
    ]
})

const notificationsPanel = ref()

// Cart navigation methods
const cartPopover = ref()

const toggleCartDropdown = (event: Event) => {
    cartPopover.value.toggle(event)
}

const goToCart = () => {
    router.push('/cart')
}

const goToCheckout = () => {
    router.push('/checkout')
}

const goToContinueShopping = () => {
    router.push({ name: 'Search' })
}

const goToOrders = () => {
    router.push('/orders')
}

const goToFavourites = () => {
    router.push('/favourites')
}



// Watch for login state changes to fetch cart and favourites when user logs in
watch(isUserLoggedIn, (newValue) => {
    if (newValue) {
        cartStore.fetchCartSummary()
        favouritesStore.initializeStore()
    } else {
        // Clear cart when user logs out
        cartStore.cartItems = []
        cartStore.cartSummary = {
            totalItems: 0,
            totalAmount: 0,
            totalDiscount: 0,
            itemCount: 0
        }
        // Clear favourites when user logs out
        favouritesStore.clearFavourites()
    }
})

</script>