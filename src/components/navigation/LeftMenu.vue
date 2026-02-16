<template>
    <!-- Mobile Backdrop -->
    <div v-if="mobileMenuStore.isOpen" @click="mobileMenuStore.closeMenu()"
        class="fixed inset-0 bg-black/50 z-20 lg:hidden"></div>

    <!-- Sidebar -->
    <div id="app-sidebar" :class="[
        'w-[280px] flex-shrink-0 bg-surface-0 dark:bg-surface-950',
        // Desktop styles - sticky positioning below TopNavigation, lower z-index than TopNavigation (z-40) and Header dropdown (z-[99])
        'lg:block lg:sticky lg:top-[73px] lg:z-10 lg:overflow-y-auto',
        // Hide on desktop when header menu is open
        headerMenuStore.isOpen ? 'lg:hidden' : '',
        // Mobile styles - fixed positioning for drawer overlay, but lower than TopNavigation
        'fixed lg:relative top-0 left-0 h-full transform transition-transform duration-300 lg:transform-none z-30 lg:z-10',
        mobileMenuStore.isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
        <div class="flex flex-col w-full">
            <!-- Mobile Header with Close Button -->
            <div
                class="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700 lg:hidden">
                <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Menu</h2>
                <button @click="mobileMenuStore.closeMenu()"
                    class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                    <i class="pi pi-times text-xl text-surface-700 dark:text-surface-200"></i>
                </button>
            </div>

            <div class="flex flex-col m-0 p-4 lg:overflow-visible overflow-y-auto">
                <!-- Dynamic Menu Items -->
                <template v-for="(item, index) in menuItems" :key="index">
                    <!-- Single Menu Item (Dashboard) -->
                    <div v-if="item.type === 'single'" class="flex flex-col">
                        <div class="-ml-[2px] transition-colors"
                            :class="[index === activeItem && activeSubItem === -1 ? 'border-primary ' : 'border-surface-200 dark:border-surface-700 hover:border-primary']">
                            <a class="flex items-center cursor-pointer py-3 px-4 transition-colors"
                                :class="[index === activeItem && activeSubItem === -1 ? 'text-primary font-medium' : 'text-surface-700 dark:text-surface-200 font-medium hover:text-primary']"
                                @click="setActiveItem(index); navigateToRoute(item.route)">
                                <i :class="[item.icon, 'mr-2 !text-base !leading-normal']" />
                                <span>{{ $t(item.label) }}</span>
                            </a>
                        </div>
                    </div>

                    <!-- Group Menu Item (with submenu) -->
                    <div v-else-if="item.type === 'group'" class="flex flex-col">
                        <div v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-slidedown',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-slideup'
                        }" class="flex items-center cursor-pointer py-3 px-4 text-surface-700 dark:text-surface-200 font-semibold transition-colors duration-150"
                            @click="setActiveItem(index)">
                            <span>{{ $t(item.label) }}</span>
                            <i
                                class="pi pi-angle-down !text-base !leading-normal text-surface-500 dark:text-surface-400 ml-auto" />
                        </div>
                        <ul class="list-none m-0 overflow-hidden flex flex-col">
                            <li v-for="(subItem, subIndex) in item.items" :key="subIndex"
                                class="border-l-2 -ml-[2px] transition-colors"
                                :class="[index === activeItem && subIndex === activeSubItem ? 'border-primary' : 'border-surface-200 dark:border-surface-700 hover:border-primary']">
                                <a class="flex items-center cursor-pointer py-3 px-4 transition-colors"
                                    :class="[index === activeItem && subIndex === activeSubItem ? 'border-l-2 text-primary font-medium' : 'text-surface-700 dark:text-surface-200 font-medium hover:text-primary']"
                                    @click="setActiveSubItem(index, subIndex, subItem.route)">
                                    <i :class="[subItem.icon, 'mr-2 !text-base !leading-normal']" />
                                    <span>{{ $t(subItem.label) }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>

            <!-- User Profile Section -->
            <div class="mt-8 pt-4 pb-2 border-surface-200 dark:border-surface-800 has-[ul.hidden]:border-t">
                <ul
                    class="list-none m-0 hidden origin-bottom animate-duration-150 border-t border-surface-200 dark:border-surface-800 pt-2">
                    <li v-for="(userItem, userIndex) in userMenuItems" :key="userIndex"
                        class="border-l-2 border-surface-200 dark:border-surface-700 -ml-[2px] hover:border-primary transition-colors">
                        <a class="flex items-center cursor-pointer py-3 px-4 text-surface-700 dark:text-surface-200 font-medium hover:text-primary transition-colors"
                            @click="navigateToRoute(userItem.route)">
                            <i :class="[userItem.icon, 'mr-2 !text-base !leading-normal']" />
                            <span>{{ $t(userItem.label) }}</span>
                        </a>
                    </li>
                    <li
                        class="border-l-2 border-surface-200 dark:border-surface-700 -ml-[2px] hover:border-primary transition-colors">
                        <a @click="logout"
                            class="flex items-center cursor-pointer py-3 px-4 text-surface-700 dark:text-surface-200 font-medium hover:text-primary transition-colors">
                            <i class="pi pi-sign-out mr-2 !text-base !leading-normal" />
                            <span>{{ $t('menu.signOut') }}</span>
                        </a>
                    </li>
                </ul>
                <a v-styleclass="{
                    selector: '@prev',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-scalein',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-fadeout'
                }"
                    class="flex items-center cursor-pointer p-2 gap-2 text-surface-900 dark:text-surface-0 hover:text-primary transition-colors duration-150">
                    <div
                        class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                        {{ userInitials }}
                    </div>
                    <span class="font-medium text-base">{{ userName }}</span>
                    <i
                        class="pi pi-angle-up !text-base !leading-normal text-surface-500 dark:text-surface-400 ml-auto" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useMobileMenuStore } from '@/stores/mobileMenu';
import { useHeaderMenuStore } from '@/stores/headerMenu';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const mobileMenuStore = useMobileMenuStore();
const headerMenuStore = useHeaderMenuStore();
const { user } = storeToRefs(authStore);

// Computed properties for user display
const userName = computed(() => {
    if (user.value?.firstName && user.value?.lastName) {
        return `${user.value.firstName} ${user.value.lastName}`;
    }
    return user.value?.email || 'User';
});

const userInitials = computed(() => {
    if (user.value?.firstName && user.value?.lastName) {
        return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.value?.email) {
        return user.value.email.charAt(0).toUpperCase();
    }
    return 'U';
});

// Check if user has manager role
const isManager = computed(() => {
    return user.value?.permissions?.includes('manage users') || false;
});

const activeItem = ref(0);
const activeSubItem = ref(-1);

const menuItems = [
    {
        label: 'menu.dashboard',
        icon: 'pi pi-home',
        route: '/',
        type: 'single'
    },
    {
        label: 'menu.shopping',
        icon: 'pi pi-shopping-cart',
        type: 'group',
        items: [
            { label: 'menu.shoppingCart', icon: 'pi pi-shopping-cart', route: '/cart' },
            { label: 'menu.favourites', icon: 'pi pi-bookmark', route: '/favourites' }
        ]
    },
    {
        label: 'menu.ordersQuotes',
        icon: 'pi pi-file-text',
        type: 'group',
        items: [
            { label: 'menu.orders', icon: 'pi pi-box', route: '/orders' },
            { label: 'menu.myOffers', icon: 'pi pi-file', route: '/quotes' },
            { label: 'menu.osecQuotes', icon: 'pi pi-file-export', route: '/osec-quotes' }
        ]
    },
    {
        label: 'menu.supportLearning',
        icon: 'pi pi-question-circle',
        type: 'group',
        items: [
            { label: 'menu.manuals', icon: 'pi pi-book', route: '/manuals' },
            { label: 'menu.returnsRepairs', icon: 'pi pi-reply', route: '/rmas' },
            { label: 'menu.academy', icon: 'pi pi-graduation-cap', route: '/academy' }
        ]
    }
];

const userMenuItems = computed(() => {
    const items = [
        { label: 'menu.myProfile', icon: 'pi pi-user', route: '/profile' },
        { label: 'menu.addresses', icon: 'pi pi-map-marker', route: '/addresses' }
    ];

    // Add Users menu item for managers
    if (isManager.value) {
        items.push({ label: 'menu.users', icon: 'pi pi-users', route: '/users' });
    }

    return items;
});

const setActiveItem = (index: number) => {
    activeItem.value = index;
    activeSubItem.value = -1;
};

const setActiveSubItem = (parentIndex: number, subIndex: number, route: string) => {
    activeItem.value = parentIndex;
    activeSubItem.value = subIndex;
    router.push(route);
    // Close mobile menu after navigation
    mobileMenuStore.closeMenu();
};

const navigateToRoute = (route: string) => {
    router.push(route);
    // Close mobile menu after navigation
    mobileMenuStore.closeMenu();
};

const updateActiveItemFromRoute = () => {
    const currentPath = route.path;

    // Find the active item based on current route
    menuItems.forEach((item, index) => {
        if (item.type === 'single' && item.route === currentPath) {
            activeItem.value = index;
            activeSubItem.value = -1;
            return;
        }

        if (item.type === 'group' && item.items) {
            const subItemIndex = item.items.findIndex(subItem => subItem.route === currentPath);
            if (subItemIndex !== -1) {
                activeItem.value = index;
                activeSubItem.value = subItemIndex;
                return;
            }
        }
    });
};

// Watch for route changes
watch(() => route.path, () => {
    updateActiveItemFromRoute();
});

// Initialize active item on component mount
onMounted(() => {
    updateActiveItemFromRoute();
});

const logout = () => {
    authStore.handleLogout();
    router.push('/login');
    // Close mobile menu after logout
    mobileMenuStore.closeMenu();
};
</script>