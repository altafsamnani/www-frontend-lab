<template>
    <div class="container max-w-7xl mx-auto">
        <div class="flex items-stretch relative min-h-[80px]">
            <a v-styleclass="{
                selector: '.osecheader',
                enterFromClass: 'hidden',
                leaveToClass: 'hidden',
                hideOnOutsideClick: true
            }"
                class="mr-4 flex items-center justify-left z-20 cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-0 ml-auto">
                <i class="pi pi-bars text-3xl" />
            </a>

            <div class="flex items-center justify-center">
                <RouterLink to="/">
                    <img class="h-8 w-auto"
                        :src="theme == 'light' ? '/images/logos/logo-osec-wit.svg' : '/images/logos/logo-osec.svg'"
                        alt="" />
                </RouterLink>

            </div>
            <div class="flex items-center flex-auto ml-4 lg:ml-12">
                <div class="p-input-icon-left w-full p-input-filled">
                    <IconField icon-position="left" class="w-full">
                        <InputIcon class="pi pi-search" />
                        <InputText v-model="productSearch" :placeholder="$t('navigation.product_search')" class="w-full"
                            @keydown.enter="router.push({ name: 'Search', params: { q: productSearch } })" />
                    </IconField>
                </div>
            </div>
            <div class="flex ml-4 lg:ml-12">
                <Popover ref="notificationsPanel">
                    <div>
                        <h2 class="mb-2 text-lg font-semibold">{{ $t('navigation.notifications') }}</h2>
                        <p v-for="notification in notifications" :key="notification.id">
                            {{ notification.msg }}
                        </p>
                    </div>
                </Popover>




            </div>
            <div class="flex ml-4 lg:ml-12">
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
            <div class="flex ml-4 lg:ml-12">
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
                                    <a
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-box text-lg mr-2" />
                                        <span>{{ $t('navigation.orders') }}</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        class="cursor-pointer text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex items-center px-4 py-2">
                                        <i class="pi pi-fw pi-heart text-lg mr-2" />
                                        <span>{{ $t('navigation.favorites') }}</span>
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
                    <li class="inline-flex relative">
                        <a v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-scalein',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeout',
                            hideOnOutsideClick: true
                        }"
                            class="text-surface-0 dark:text-surface-900 font-medium inline-flex items-center cursor-pointer px-1 lg:px-4 border-b-2 border-transparent hover:border-primary select-none">
                            <OverlayBadge severity="danger">
                                <i class="pi pi-shopping-cart !text-xl" />
                            </OverlayBadge>
                            <span class="hidden">{{ $t('navigation.my_cart') }}</span>
                        </a>
                        <div
                            class="hidden rounded-border bg-surface-0 dark:bg-surface-900 p-6 shadow absolute right-0 top-full z-10 w-80 origin-top">
                            <span class="text-surface-0 dark:text-surface-900 font-medium mb-4 block">{{
                                $t('navigation.my_cart_items', { count: 1 }) }}</span>
                            <div class="flex items-center border-b border-surface pb-4">
                                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-2-2.png"
                                    class="w-16 flex-shrink-0 shadow-sm" />
                                <div class="flex flex-col pl-4">
                                    <span class="text-surface-0 dark:text-surface-900 font-medium mb-2">Prime
                                        Watch</span>
                                    <span class="text-surface-600 dark:text-surface-200 mb-2">Standard Size</span>
                                    <span class="text-primary font-bold">$50.00</span>
                                </div>
                            </div>
                            <div class="flex pt-4">
                                <Button class="mr-2" outlined>{{ $t('navigation.view_cart') }}</Button>
                                <Button class="ml-2">{{ $t('navigation.purchase') }}</Button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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

const notifyStore = useNotifyStore()
const router = useRouter()
const authStore = useAuthStore()
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

</script>