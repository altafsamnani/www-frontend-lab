<template>
  <!-- Mobile Backdrop -->
  <div
    v-if="mobileMenuStore.isOpen"
    @click="mobileMenuStore.closeMenu()"
    class="fixed inset-0 z-20 bg-black/50 lg:hidden"
  ></div>

  <!-- Sidebar -->
  <div
    id="app-sidebar"
    :class="[
      'bg-surface-0 dark:bg-surface-950 w-[280px] flex-shrink-0',
      // Desktop styles - sticky positioning below TopNavigation, lower z-index than TopNavigation (z-40) and Header dropdown (z-[99])
      'lg:sticky lg:top-[73px] lg:z-10 lg:block lg:overflow-y-auto',
      // Hide on desktop when header menu is open
      headerMenuStore.isOpen ? 'lg:hidden' : '',
      // Mobile styles - fixed positioning for drawer overlay, but lower than TopNavigation
      'fixed top-0 left-0 z-30 h-full transform transition-transform duration-300 lg:relative lg:z-10 lg:transform-none',
      mobileMenuStore.isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div class="flex w-full flex-col">
      <!-- Mobile Header with Close Button -->
      <div
        class="border-surface-200 dark:border-surface-700 flex items-center justify-between border-b p-4 lg:hidden"
      >
        <h2 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">Menu</h2>
        <button
          @click="mobileMenuStore.closeMenu()"
          class="hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg p-2 transition-colors"
        >
          <i class="pi pi-times text-surface-700 dark:text-surface-200 text-xl"></i>
        </button>
      </div>

      <div class="m-0 flex flex-col overflow-y-auto p-4 lg:overflow-visible">
        <!-- Dynamic Menu Items -->
        <template v-for="(item, index) in menuItems" :key="index">
          <!-- Single Menu Item (Dashboard) -->
          <div v-if="item.type === 'single'" class="flex flex-col">
            <div
              class="-ml-[2px] transition-colors"
              :class="[
                index === activeItem && activeSubItem === -1
                  ? 'border-primary'
                  : 'border-surface-200 dark:border-surface-700 hover:border-primary',
              ]"
            >
              <a
                class="flex cursor-pointer items-center px-4 py-3 transition-colors"
                :class="[
                  index === activeItem && activeSubItem === -1
                    ? 'text-primary font-medium'
                    : 'text-surface-700 dark:text-surface-200 hover:text-primary font-medium',
                ]"
                @click="
                  () => {
                    setActiveItem(index)
                    navigateToRoute(item.route)
                  }
                "
              >
                <i :class="[item.icon, 'mr-2 !text-base !leading-normal']" />
                <span>{{ $t(item.label) }}</span>
              </a>
            </div>
          </div>

          <!-- Group Menu Item (with submenu) -->
          <div v-else-if="item.type === 'group'" class="flex flex-col">
            <div
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-slideup',
              }"
              class="text-surface-700 dark:text-surface-200 flex cursor-pointer items-center px-4 py-3 font-semibold transition-colors duration-150"
              @click="setActiveItem(index)"
            >
              <span>{{ $t(item.label) }}</span>
              <i
                class="pi pi-angle-down text-surface-500 dark:text-surface-400 ml-auto !text-base !leading-normal"
              />
            </div>
            <ul class="m-0 flex list-none flex-col overflow-hidden">
              <li
                v-for="(subItem, subIndex) in item.items"
                :key="subIndex"
                class="-ml-[2px] border-l-2 transition-colors"
                :class="[
                  index === activeItem && subIndex === activeSubItem
                    ? 'border-primary'
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary',
                ]"
              >
                <a
                  class="flex cursor-pointer items-center px-4 py-3 transition-colors"
                  :class="[
                    index === activeItem && subIndex === activeSubItem
                      ? 'text-primary border-l-2 font-medium'
                      : 'text-surface-700 dark:text-surface-200 hover:text-primary font-medium',
                  ]"
                  @click="setActiveSubItem(index, subIndex, subItem.route)"
                >
                  <i :class="[subItem.icon, 'mr-2 !text-base !leading-normal']" />
                  <span>{{ $t(subItem.label) }}</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <!-- User Profile Section -->
      <div
        class="border-surface-200 dark:border-surface-800 mt-8 pt-4 pb-2 has-[ul.hidden]:border-t"
      >
        <ul
          class="animate-duration-150 border-surface-200 dark:border-surface-800 m-0 hidden origin-bottom list-none border-t pt-2"
        >
          <li
            v-for="(userItem, userIndex) in userMenuItems"
            :key="userIndex"
            class="border-surface-200 dark:border-surface-700 hover:border-primary -ml-[2px] border-l-2 transition-colors"
          >
            <a
              class="text-surface-700 dark:text-surface-200 hover:text-primary flex cursor-pointer items-center px-4 py-3 font-medium transition-colors"
              @click="navigateToRoute(userItem.route)"
            >
              <i :class="[userItem.icon, 'mr-2 !text-base !leading-normal']" />
              <span>{{ $t(userItem.label) }}</span>
            </a>
          </li>
          <li
            class="border-surface-200 dark:border-surface-700 hover:border-primary -ml-[2px] border-l-2 transition-colors"
          >
            <a
              @click="logout"
              class="text-surface-700 dark:text-surface-200 hover:text-primary flex cursor-pointer items-center px-4 py-3 font-medium transition-colors"
            >
              <i class="pi pi-sign-out mr-2 !text-base !leading-normal" />
              <span>{{ $t('menu.signOut') }}</span>
            </a>
          </li>
        </ul>
        <a
          v-styleclass="{
            selector: '@prev',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-fadeout',
          }"
          class="text-surface-900 dark:text-surface-0 hover:text-primary flex cursor-pointer items-center gap-2 p-2 transition-colors duration-150"
        >
          <div
            class="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
          >
            {{ userInitials }}
          </div>
          <span class="text-base font-medium">{{ userName }}</span>
          <i
            class="pi pi-angle-up text-surface-500 dark:text-surface-400 ml-auto !text-base !leading-normal"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useMobileMenuStore } from '@/stores/mobileMenu'
  import { useHeaderMenuStore } from '@/stores/headerMenu'
  import { usePermissions } from '@/composables/usePermissions'

  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  const mobileMenuStore = useMobileMenuStore()
  const headerMenuStore = useHeaderMenuStore()
  const { user } = storeToRefs(authStore)
  const { canViewOrders, canViewOffers, canViewUsers, canViewRma, canCreateTraining } =
    usePermissions()

  // Computed properties for user display
  const userName = computed(() => {
    if (user.value?.firstName && user.value?.lastName) {
      return `${user.value.firstName} ${user.value.lastName}`
    }
    return user.value?.email || 'User'
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

  const activeItem = ref(0)
  const activeSubItem = ref(-1)

  // Build menu items dynamically based on permissions
  const menuItems = computed(() => {
    const items = []

    // Dashboard - always visible
    items.push({
      label: 'menu.dashboard',
      icon: 'pi pi-home',
      route: '/',
      type: 'single',
    })

    // Shopping - always visible
    items.push({
      label: 'menu.shopping',
      icon: 'pi pi-shopping-cart',
      type: 'group',
      items: [
        { label: 'menu.shoppingCart', icon: 'pi pi-shopping-cart', route: '/cart' },
        { label: 'menu.favourites', icon: 'pi pi-bookmark', route: '/favourites' },
      ],
    })

    // Orders & Quotes - permission based
    const ordersQuotesItems = []
    if (canViewOrders.value) {
      ordersQuotesItems.push({ label: 'menu.orders', icon: 'pi pi-box', route: '/orders' })
    }
    if (canViewOffers.value) {
      ordersQuotesItems.push({ label: 'menu.myOffers', icon: 'pi pi-file', route: '/quotes' })
      ordersQuotesItems.push({
        label: 'menu.osecQuotes',
        icon: 'pi pi-file-export',
        route: '/osec-quotes',
      })
    }
    if (ordersQuotesItems.length > 0) {
      items.push({
        label: 'menu.ordersQuotes',
        icon: 'pi pi-file-text',
        type: 'group',
        items: ordersQuotesItems,
      })
    }

    // Support & Learning - permission based
    const supportItems = []
    supportItems.push({ label: 'menu.manuals', icon: 'pi pi-book', route: '/manuals' })
    if (canViewRma.value) {
      supportItems.push({ label: 'menu.returnsRepairs', icon: 'pi pi-reply', route: '/rmas' })
    }
    if (canCreateTraining.value) {
      supportItems.push({ label: 'menu.academy', icon: 'pi pi-graduation-cap', route: '/academy' })
    }
    if (supportItems.length > 0) {
      items.push({
        label: 'menu.supportLearning',
        icon: 'pi pi-question-circle',
        type: 'group',
        items: supportItems,
      })
    }

    // Account Settings - with conditional Users menu
    const accountSettingsItems = [
      { label: 'menu.myProfile', icon: 'pi pi-user', route: '/profile' },
      { label: 'menu.notifications', icon: 'pi pi-bell', route: '/notifications' },
      { label: 'menu.addresses', icon: 'pi pi-map-marker', route: '/addresses' },
    ]
    if (canViewUsers.value) {
      accountSettingsItems.push({ label: 'menu.users', icon: 'pi pi-users', route: '/users' })
    }
    items.push({
      label: 'menu.accountSettings',
      icon: 'pi pi-cog',
      type: 'group',
      items: accountSettingsItems,
    })

    return items
  })

  // User menu items in the profile dropdown (simplified since main items are in Account Settings group)
  const userMenuItems = [
    { label: 'menu.myProfile', icon: 'pi pi-user', route: '/profile' },
    { label: 'menu.addresses', icon: 'pi pi-map-marker', route: '/addresses' },
  ]

  const setActiveItem = (index: number) => {
    activeItem.value = index
    activeSubItem.value = -1
  }

  const setActiveSubItem = (parentIndex: number, subIndex: number, route: string) => {
    activeItem.value = parentIndex
    activeSubItem.value = subIndex
    router.push(route)
    // Close mobile menu after navigation
    mobileMenuStore.closeMenu()
  }

  const navigateToRoute = (route: string) => {
    router.push(route)
    // Close mobile menu after navigation
    mobileMenuStore.closeMenu()
  }

  const updateActiveItemFromRoute = () => {
    const currentPath = route.path

    // Find the active item based on current route
    menuItems.value.forEach((item, index) => {
      if (item.type === 'single' && item.route === currentPath) {
        activeItem.value = index
        activeSubItem.value = -1
        return
      }

      if (item.type === 'group' && item.items) {
        const subItemIndex = item.items.findIndex((subItem) => subItem.route === currentPath)
        if (subItemIndex !== -1) {
          activeItem.value = index
          activeSubItem.value = subItemIndex
          return
        }
      }
    })
  }

  // Watch for route changes
  watch(
    () => route.path,
    () => {
      updateActiveItemFromRoute()
    }
  )

  // Initialize active item on component mount
  onMounted(() => {
    updateActiveItemFromRoute()
  })

  const logout = () => {
    authStore.handleLogout()
    router.push('/login')
    // Close mobile menu after logout
    mobileMenuStore.closeMenu()
  }
</script>
