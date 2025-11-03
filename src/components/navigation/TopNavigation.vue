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
                <div class="p-input-icon-left w-full p-input-filled">
                    <IconField icon-position="left" class="w-full">
                        <InputIcon class="pi pi-search" />
                        <InputText v-model="productSearch" :placeholder="$t('navigation.product_search')" class="w-full"
                            @keydown.enter="router.push({ name: 'Search', params: { q: productSearch } })" />
                    </IconField>
                </div>
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
                            <i class="pi pi-user text-xl" />
                            <span class="hidden lg:inline ml-2">{{ $t('navigation.my_account') }}</span>
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
                        <a v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-scalein',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeout',
                            hideOnOutsideClick: true
                        }" :class="[
                            'font-medium inline-flex items-center cursor-pointer py-1 px-1 lg:px-4 border-b-2 border-transparent ',
                            isCartDropdownOpen ? 'bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0' : 'text-surface-0 dark:text-surface-900'
                        ]" @click="toggleCartDropdown">
                            <CartBadge @click="openCartDropdown" />
                        </a>
                        <div ref="cartDropdownRef"
                            class="hidden bg-surface-0 dark:bg-surface-900 p-6 shadow absolute right-0 top-full z-10 w-[28rem] origin-top">
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
                                <span class="text-surface-900 dark:text-surface-0 font-medium mb-4 block">
                                    {{ $t('navigation.my_cart_items', { count: cartStore.cartItemCount }) }}
                                </span>
                                <div class="max-h-60 overflow-y-auto">
                                    <div v-for="item in cartStore.cartItems.slice(0, 3)" :key="item.id"
                                        class="flex items-center border-b border-surface-200 dark:border-surface-700 pb-4 mb-4 last:border-b-0 last:mb-0">
                                        <img :src="item.thumbnail || '/images/default-product.png'"
                                            class="w-12 h-12 flex-shrink-0 rounded object-cover" />
                                        <div class="flex flex-col pl-3 flex-1 min-w-0">
                                            <router-link :to="{ name: 'Products', params: { id: item.productId } }"
                                                class="text-surface-900 dark:text-surface-0 font-medium mb-1 hover:text-primary transition-colors duration-200 break-words">
                                                {{ item.name }}
                                            </router-link>
                                            <span class="text-surface-600 dark:text-surface-300 text-sm mb-1">
                                                {{ item.articleNr }}
                                            </span>
                                            <div class="flex items-center justify-between">
                                                <span class="text-surface-600 dark:text-surface-300 text-sm">
                                                    Qty: {{ item.quantity }}
                                                </span>
                                                <span class="text-primary font-bold">
                                                    €{{ (item.totalNetPrice || 0).toFixed(2) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="cartStore.cartItems.length > 3"
                                        class="text-center text-sm text-surface-600 dark:text-surface-300">
                                        +{{ cartStore.cartItems.length - 3 }} more items
                                    </div>
                                </div>
                                <div class="border-t border-surface-200 dark:border-surface-700 pt-4 mt-4">
                                    <div class="flex justify-between items-center mb-4">
                                        <span class="font-medium text-surface-900 dark:text-surface-0">Total:</span>
                                        <span class="font-bold text-primary">€{{ cartStore.cartTotalAmount.toFixed(2)
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
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '@/i18n'
import { useAuthStore, isLoggedIn } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { localize } from '@vee-validate/i18n'
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import OverlayBadge from 'primevue/overlaybadge';
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
const { handleLogout } = authStore

// Create a reactive authentication state that properly updates
const isUserLoggedIn = computed(() => {
    // Primary check: if user exists in store (reactive)
    if (authStore.user) return true
    // Secondary check: if accessToken exists in store (reactive)
    if (authStore.accessToken) return true
    // Fallback: check localStorage directly (for initial page load)
    return isLoggedIn()
})
interface settings {
    theme: string
    locale: string
}

const { t } = useI18n()
const productSearch = ref('')
const isCartDropdownOpen = ref(false)

const submitLogout = async () => {
    await handleLogout()
    notifyStore.notify(t('notification.logout'), NotificationType.Success)
    window.location.reload()
}

const theme = ref()

onMounted(() => {
    theme.value = (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : localStorage.getItem('theme') || 'light';
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
    document.querySelector('html')?.setAttribute('class', theme.value)
    localStorage.setItem('theme', theme.value)
    if (isUserLoggedIn.value) {
        cartStore.fetchCartSummary()
        favouritesStore.initializeStore()
    }

    // Watch for cart dropdown visibility changes
    nextTick(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target as HTMLElement
                    const isHidden = target.classList.contains('hidden')
                    isCartDropdownOpen.value = !isHidden
                }
            })
        })

        // Start observing the cart dropdown element
        if (cartDropdownRef.value) {
            observer.observe(cartDropdownRef.value, {
                attributes: true,
                attributeFilter: ['class']
            })
        }
    })
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

const notificationMenu = ref()
const notifications = computed(() => {
    return [
        {
            id: 1,
            msg: t('notification.login')
        }
    ]
})

const notificationsPanel = ref()
const toggleNotifications = (event) => {
    notificationsPanel.value.toggle(event)
}

// Cart navigation methods
const cartDropdownRef = ref()

const toggleCartDropdown = () => {
    // The MutationObserver will handle the state changes automatically
    // This method is now just for triggering the dropdown
}

const openCartDropdown = () => {
    // This method can be used for additional cart actions if needed
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