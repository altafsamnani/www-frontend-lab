<template>
    <div class="h-full w-full bg-surface-0 dark:bg-surface-950">
        <nav class="relative w-full flex items-center" @mouseleave="closeMenu">
            <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Osec B.V.</span>
                <img class="h-8 w-auto" src="/images/logo-osec.svg?color=indigo&shade=600" alt="" />
            </a>
            <a v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                leaveToClass: 'hidden',
                hideOnOutsideClick: true
            }"
                class="relative z-20 cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-0 ml-auto">
                <i class="pi pi-bars text-3xl" />
            </a>
            <div
                class="border-b border-surface lg:border-0 animate-fadeinup absolute lg:static bg-surface-50 dark:bg-surface-900 lg:bg-transparent lg:dark:bg-transparent w-full pt-14 pb-4 lg:py-0 hidden lg:flex flex-1 items-center top-0 left-0">
                <ul class="border-y mt-6 lg:mt-0 border-surface lg:border-0 select-none relative flex-1 flex lg:flex-row flex-col lg:mb-0 mb-4 lg:justify-end gap-2 lg:gap-8 p-4"
                    @mouseleave="hoveredItem = null">
                    <template v-for="(item, index) of navs" :key="index">
                        <li @mouseenter="setActiveItem(item)" @click="setActiveItem(item)">
                            <a v-if="item?.subMenu" v-styleclass="{
                                selector: '@next',
                                enterFromClass: 'hidden',
                                leaveToClass: 'hidden',
                                hideOnOutsideClick: true
                            }" :class="activeItem?.label === t(item.label) ? 'border-primary' : 'border-transparent '"
                                class="group relative lg:border-b p-4 transition-all flex items-center justify-between gap-2">
                                {{ t(item.label) }}
                                <i class="pi pi-chevron-down text-sm leading-none" />
                                <span :class="activeItem?.label === item.label ? 'opacity-100' : 'opacity-0'"
                                    class="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 transition-all border-l-[6px] border-l-transparent border-r-[6px] border-transparent border-t-[6px] border-t-primary" />
                            </a>
                            <a v-else class="p-4 transition-all flex" :href="item.to">{{ t(item.label) }}</a>
                            <div v-if="item?.subMenu" class="lg:hidden pl-12 hidden animate-fadein">
                                <ul class="flex flex-col gap-6 my-2">
                                    <template v-for="(subItem, j) of item.subMenu" :key="j">
                                        <li>
                                            <a :href="subItem.to"
                                                class="flex items-center gap-4 text-surface-700 dark:text-surface-200">
                                                <i :class="subItem.icon" />
                                                <span class="">{{ t(subItem.label) }}</span>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </li>
                    </template>
                    <div v-if="activeItem?.subMenu"
                        :class="activeItem ? 'opacity-100 visible z-[99]' : 'opacity-0 invisible z-[-99]'"
                        class="lg:block hidden animate-fadein animate-duration-150 max-w-lg w-full absolute top-full p-3 rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-900 transition-all">
                        <div class="flex gap-4">
                            <ul class="flex-1 flex flex-col rounded-lg overflow-hidden">
                                <template v-for="(subItem, j) of activeItem?.subMenu" :key="j">
                                    <li>
                                        <a :href="subItem.to"
                                            :class="selectedCategory === j ? 'bg-surface-100 dark:bg-surface-900 ' : 'bg-surface-0 dark:bg-surface-950 hover:bg-surface-100 dark:hover:bg-surface-900 '"
                                            class="flex items-center gap-4 w-full p-4 transition-all"
                                            @mouseenter="selectedCategory = j">
                                            <span
                                                class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-contrast">
                                                <i :class="subItem.icon" />
                                            </span>
                                            <span>
                                                <h4 class="text-surface-900 dark:text-surface-0">{{ t(subItem.label) }}
                                                </h4>
                                                <span class="text-sm text-surface-600 dark:text-surface-400 mt-1">{{
                                                    t(subItem.description) }}</span>
                                            </span>
                                        </a>
                                    </li>
                                </template>
                            </ul>
                            <div v-if="activeItem?.subMenu?.[selectedCategory]?.categories" class="flex flex-col w-44">
                                <div class="font-medium text-surface-900 dark:text-surface-0">Categories</div>
                                <ul class="flex flex-col mt-4 gap-3">
                                    <template
                                        v-for="(category, k) of activeItem?.subMenu?.[selectedCategory]?.categories"
                                        :key="k">
                                        <li>
                                            <a :href="category.to"
                                                class="text-sm text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-0">{{
                                                    t(category.title) }}</a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ul>
                <Search />

                <div class="flex items-center justify-between lg:justify-center gap-6 px-8 lg:px-0">
                    <Button label="Login" text />
                    <Button label="Register" />
                </div>
                <div v-if="$route.meta.layout != 'login'"
                    class="hidden lg:block lg:h-6 lg:w-px bg-surface-900/10 dark:bg-white/10" aria-hidden="true"></div>
                <Button icon="pi pi-bell" severity="secondary" text rounded aria-label="" @click="toggleNotifications"
                    aria-haspopup="true" aria-controls="notifications" v-if="$route.meta.layout != 'login'"
                    class="hidden lg:flex" />
                <Popover ref="notificationsPanel">
                    <div>
                        <h2 class="mb-2 text-lg font-semibold">Notifications</h2>
                        <p v-for="notification in notifications" :key="notification.id">
                            {{ notification.msg }}
                        </p>
                    </div>
                </Popover>

                <!-- language selector -->

                <Button icon="pi pi-globe" severity="secondary" text rounded aria-label="Select Dark Mode"
                    @click="toggleLocale" aria-haspopup="true" aria-controls="locale_menu" />
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

                <!-- Darkmode Switcher -->
                <Button :icon="theme == 'light' ? 'pi pi-sun' : 'pi pi-moon'" @click="handleToggleDarkModeClick()"
                    severity="secondary" text rounded aria-label="Select Dark Mode" />
            </div>
        </nav>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '@/i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { localize } from '@vee-validate/i18n'
import Search from '@/components/navigation/Search.vue'

const notifyStore = useNotifyStore()
const router = useRouter()
const authStore = useAuthStore()
const { handleLogout } = authStore
interface settings {
    theme: string
    locale: string
}

const { locale, t } = useI18n()
const open = ref(false)

const hoveredItem = ref(null);
const selectedItem = ref(null);

const activeItem = computed(() => hoveredItem.value || selectedItem.value);

const setActiveItem = (item) => {
    if (item?.subMenu) {
        hoveredItem.value = item;
        selectedItem.value = item;
    } else {
        hoveredItem.value = null;
        selectedItem.value = null;
    }
};

const closeMenu = () => {
    hoveredItem.value = null;
    selectedItem.value = null;
};

const selectedCategory = ref(0);
const navs = ref([
    {
        label: 'navigation.home',
        to: '/'
    },
    {
        label: 'navigation.about_us',
        to: '/aboutus'
    },
    {
        label: 'navigation.news',
        to: '/news'
    },
    {
        label: 'navigation.products',
        subMenu: [
            {
                label: 'navigation.products_burglary',
                description: 'navigation.products_burglary_text',
                to: '/categories/burglary',
                icon: 'pi pi-bell',
                categories: [
                    { title: 'Wireless', to: '#' },
                    { title: 'Hybrid', to: '#' },
                ]
            },
            {
                label: 'navigation.products_video',
                description: 'navigation.products_video_text',
                to: '/categories/video',
                icon: 'pi pi-video',
                categories: [
                    { title: 'IP', to: '#' },
                    { title: 'HD-CVI', to: '#' },
                    { title: 'Monitors', to: '#' },
                ]
            },
            {
                label: 'navigation.products_intercom',
                description: 'navigation.products_intercom_text',
                to: '/categories/intercom',
                icon: 'pi pi-phone'
            },
            {
                label: 'navigation.products_access_control',
                description: 'navigation.products_access_control_text',
                to: '/categories/access_control',
                icon: 'pi pi-calculator'
            },
            {
                label: 'navigation.products_building_automation',
                description: "navigation.products_building_automation_text",
                to: '/categories/building_automation',
                icon: 'pi pi-home'
            },
            {
                label: 'navigation.products_fire',
                description: 'navigation.products_fire_text',
                to: '/categories/fire',
                icon: 'pi pi-building',
                categories: [
                    { title: 'Satel', to: '#' },
                    { title: 'Ajax', to: '#' },
                    { title: 'Honeywell', to: '#' },
                    { title: 'AddSecure', to: '#' },
                    { title: 'Hikvision', to: '#' },
                    { title: 'Dahua', to: '#' },
                    { title: 'Protect', to: '#' }
                ]
            },
            {
                label: 'navigation.products_search',
                description: 'navigation.products_search_text',
                to: '/search',
                icon: 'pi pi-filter-fill'
            },
        ]
    },
    {
        label: 'navigation.support',
        to: '/support'
    },
    {
        label: 'navigation.rma',
        to: '/rma'
    },
    {
        label: 'navigation.contact_us',
        to: '/contactus'
    }

]);


const submitLogout = async () => {
    await handleLogout()
    notifyStore.notify(t('notification.logout'), NotificationType.Success)
    router.push({ name: 'login' })
}

const storedTheme = localStorage.getItem('theme') || 'light'
const theme = ref(storedTheme)
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
