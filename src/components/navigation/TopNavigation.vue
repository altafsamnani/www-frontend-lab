<template>
  <div class="mx-auto max-w-7xl px-4 lg:px-0">
    <div class="relative flex min-h-[60px] items-stretch">
      <!-- Left side: Logo section (280px to match LeftMenu width) -->
      <div class="hidden w-[280px] items-center justify-start px-4 lg:flex">
        <RouterLink to="/">
          <img
            class="h-8 w-auto"
            :src="
              theme == 'light' ? '/images/logos/logo-osec-wit.svg' : '/images/logos/logo-osec.svg'
            "
            alt=""
          />
        </RouterLink>
      </div>

      <!-- Mobile menu button and logo -->
      <div class="flex items-center lg:hidden">
        <button
          @click="mobileMenuStore.toggleMenu()"
          class="text-surface-0 dark:text-surface-900 hover:bg-surface-700/20 dark:hover:bg-surface-100/20 z-20 mr-4 flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors"
        >
          <i class="pi pi-bars text-2xl" />
        </button>
        <RouterLink to="/">
          <img
            class="h-8 w-auto"
            :src="
              theme == 'light' ? '/images/logos/logo-osec-wit.svg' : '/images/logos/logo-osec.svg'
            "
            alt=""
          />
        </RouterLink>
      </div>

      <!-- Right side: Search and other elements -->
      <div class="ml-2 flex flex-1 items-center lg:ml-0">
        <ProductSearchAutoComplete
          class="w-full"
          @product-select="onProductSelected"
          @search="onSearch"
          @clear="onClearSearch"
        />
      </div>

      <!-- Notifications section -->
      <div class="ml-4 flex items-center lg:ml-6">
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
      <div class="ml-4 flex items-center lg:ml-6">
        <ul class="m-0 flex list-none p-0">
          <li class="relative inline-flex">
            <!-- language selector -->
            <Button
              :icon="
                theme == 'light' ? 'pi pi-globe text-surface-0' : 'pi pi-globe text-surface-900'
              "
              severity="secondary"
              text
              aria-label="Select Dark Mode"
              @click="toggleLocale"
              aria-haspopup="true"
              aria-controls="locale_menu"
            />
            <Menu :model="localeItems" ref="localeMenu" id="locale_menu" :popup="true">
              <template #item="{ item, props }">
                <a
                  v-if="item.language == 'nl'"
                  class="block cursor-pointer p-2"
                  @click="handleLocaleClick('nl')"
                >
                  <span class="ml-2" :class="{ 'font-semibold': $i18n.locale === 'nl' }">{{
                    $t('languages.nl')
                  }}</span>
                </a>
                <a v-else @click="handleLocaleClick('en')" class="block cursor-pointer p-2">
                  <span class="ml-2" :class="{ 'font-semibold': $i18n.locale === 'en' }">{{
                    $t('languages.en')
                  }}</span>
                </a>
              </template>
            </Menu>
          </li>
          <li class="border-surface-200 dark:border-surface-700 relative inline-flex border-r-1">
            <!-- Darkmode Switcher -->
            <Button
              :icon="theme == 'light' ? 'pi pi-moon text-surface-0' : 'pi pi-sun text-surface-900'"
              @click="handleToggleDarkModeClick()"
              severity="secondary"
              text
              aria-label="Select Dark Mode"
            />
          </li>
        </ul>
      </div>

      <!-- User account and cart section -->
      <div class="ml-4 flex items-center lg:ml-6">
        <ul class="m-0 flex list-none p-0">
          <!-- My Account Section - Show only when logged in -->
          <li v-if="isUserLoggedIn" class="relative inline-flex">
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true,
              }"
              class="text-surface-0 dark:text-surface-900 hover:border-surface-0 dark:hover:border-primary-600 mr-2 inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 font-medium select-none lg:mr-0 lg:px-4"
            >
              <div
                class="bg-primary-600 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
              >
                {{ userInitials }}
              </div>
              <span class="ml-2 hidden lg:inline">{{ userName }}</span>
            </a>
            <div
              class="rounded-border bg-surface-0 dark:bg-surface-900 absolute top-full right-0 z-10 hidden w-60 origin-top p-4 shadow"
            >
              <ul class="m-0 list-none p-0">
                <li>
                  <a
                    @click="router.push('/profile')"
                    class="text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex cursor-pointer items-center px-4 py-2"
                  >
                    <i class="pi pi-fw pi-user mr-2 text-lg" />
                    <span>{{ $t('menu.myProfile') }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="router.push('/orders')"
                    class="text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex cursor-pointer items-center px-4 py-2"
                  >
                    <i class="pi pi-fw pi-box mr-2 text-lg" />
                    <span>{{ $t('navigation.orders') }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="router.push('/cart')"
                    class="text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex cursor-pointer items-center px-4 py-2"
                  >
                    <i class="pi pi-fw pi-shopping-cart mr-2 text-lg" />
                    <span>{{ $t('navigation.my_cart') }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="router.push('/favourites')"
                    class="text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex cursor-pointer items-center px-4 py-2"
                  >
                    <i class="pi pi-fw pi-heart mr-2 text-lg" />
                    <span>{{ $t('navigation.favourites') }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="router.push('/addresses')"
                    class="text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex cursor-pointer items-center px-4 py-2"
                  >
                    <i class="pi pi-fw pi-map-marker mr-2 text-lg" />
                    <span>{{ $t('navigation.addresses') }}</span>
                  </a>
                </li>
                <li>
                  <a
                    @click="submitLogout"
                    class="text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-border flex cursor-pointer items-center px-4 py-2"
                  >
                    <i class="pi pi-fw pi-sign-out mr-2 text-lg" />
                    <span>{{ $t('navigation.sign_out') }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <!-- Login Section - Show only when not logged in -->
          <li v-else class="relative inline-flex">
            <RouterLink
              to="/login"
              class="text-surface-0 dark:text-surface-900 hover:border-surface-0 dark:hover:border-primary-600 mr-2 inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 font-medium select-none lg:mr-0 lg:px-4"
            >
              <i class="pi pi-sign-in text-xl" />
              <span class="ml-2 hidden lg:inline">{{ $t('navigation.login') }}</span>
            </RouterLink>
          </li>
          <li v-if="isUserLoggedIn" class="relative inline-flex">
            <a
              :class="[
                'inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 py-1 font-medium lg:px-4',
                isCartDropdownOpen
                  ? 'bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0'
                  : 'text-surface-0 dark:text-surface-900',
              ]"
              @click="toggleCartDropdown"
            >
              <CartBadge />
            </a>
            <Popover
              ref="cartPopover"
              @show="isCartDropdownOpen = true"
              @hide="isCartDropdownOpen = false"
            >
              <div class="bg-surface-0 dark:bg-surface-900 w-[28rem] p-6">
                <div v-if="cartStore.loading" class="py-8 text-center">
                  <i class="pi pi-spin pi-spinner text-surface-400 mb-4 text-2xl"></i>
                  <p class="text-surface-600 dark:text-surface-300">Loading cart...</p>
                </div>
                <div v-else-if="cartStore.error" class="py-8 text-center">
                  <i class="pi pi-exclamation-triangle mb-4 text-2xl text-red-500"></i>
                  <p class="text-red-600 dark:text-red-400">{{ cartStore.error }}</p>
                  <Button
                    @click="cartStore.fetchCart()"
                    size="small"
                    severity="secondary"
                    class="mt-2"
                  >
                    Retry
                  </Button>
                </div>
                <div v-else-if="cartStore.isCartEmpty" class="py-8 text-center">
                  <i class="pi pi-shopping-cart text-surface-400 mb-4 text-4xl"></i>
                  <p class="text-surface-600 dark:text-surface-300">
                    {{ $t('navigation.cart_empty') }}
                  </p>
                </div>
                <div v-else>
                  <!-- Cart Items List -->
                  <div class="-mx-6 max-h-52 overflow-y-auto px-6">
                    <div
                      v-for="item in cartStore.cartItems.slice(0, 3)"
                      :key="item.id"
                      class="border-surface-100 dark:border-surface-800 flex gap-3 border-b py-3 last:border-b-0"
                    >
                      <img
                        :src="item.thumbnail || '/images/default-product.png'"
                        class="bg-surface-100 dark:bg-surface-800 h-14 w-14 flex-shrink-0 rounded-md object-cover"
                      />
                      <div class="min-w-0 flex-1">
                        <router-link
                          :to="{ name: 'Products', params: { id: item.productId } }"
                          class="text-surface-900 dark:text-surface-0 hover:text-primary line-clamp-1 text-sm font-medium"
                        >
                          {{ item.name }}
                        </router-link>
                        <div class="mt-0.5 flex items-center gap-2">
                          <span class="text-surface-500 text-xs">{{ item.articleNr }}</span>
                          <span
                            v-if="item.discountPercentage > 0"
                            class="inline-flex items-center rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          >
                            -{{ item.discountPercentage }}%
                          </span>
                        </div>
                        <div class="mt-1 flex items-center justify-between">
                          <span class="text-surface-500 text-xs">{{ item.quantity }}x</span>
                          <div class="flex items-center gap-1.5">
                            <span
                              v-if="item.discountPercentage > 0"
                              class="text-surface-400 text-xs line-through"
                            >
                              {{ (item.totalPrice || 0).toFixed(2) }}
                            </span>
                            <span
                              class="text-surface-900 dark:text-surface-0 text-sm font-semibold"
                            >
                              €{{ (item.totalNetPrice || 0).toFixed(2) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- More Items Indicator -->
                  <div
                    v-if="cartStore.cartItems.length > 3"
                    class="text-surface-500 border-surface-100 dark:border-surface-800 border-b py-2 text-center text-xs"
                  >
                    +{{ cartStore.cartItems.length - 3 }} {{ $t('navigation.more_items') }}
                  </div>

                  <!-- Compact Summary -->
                  <div class="space-y-1.5 pt-3">
                    <div
                      class="text-surface-600 dark:text-surface-400 flex justify-between text-xs"
                    >
                      <span
                        >{{ $t('cart.orderSummary.items') }} ({{
                          cartStore.cartSummary.itemCount
                        }})</span
                      >
                      <span
                        >€{{
                          (cartStore.cartTotalAmount + cartStore.cartTotalDiscount).toFixed(2)
                        }}</span
                      >
                    </div>
                    <div
                      v-if="cartStore.cartTotalDiscount > 0"
                      class="flex justify-between text-xs"
                    >
                      <span class="text-green-600 dark:text-green-400">{{
                        $t('cart.orderSummary.discount')
                      }}</span>
                      <span class="font-medium text-green-600 dark:text-green-400"
                        >-€{{ cartStore.cartTotalDiscount.toFixed(2) }}</span
                      >
                    </div>
                    <div
                      class="border-surface-200 dark:border-surface-700 flex items-center justify-between border-t pt-2"
                    >
                      <span class="text-surface-900 dark:text-surface-0 text-sm font-medium">{{
                        $t('cart.orderSummary.total')
                      }}</span>
                      <span class="text-primary text-base font-bold"
                        >€{{ cartStore.cartTotalAmount.toFixed(2) }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 pt-4">
                  <Button @click="router.push('/cart')" class="flex-1" outlined>{{
                    $t('navigation.view_cart')
                  }}</Button>
                  <Button
                    v-if="cartStore.isCartEmpty"
                    @click="router.push({ name: 'Search' })"
                    class="flex-1"
                  >
                    <i class="pi pi-search mr-2"></i>
                    {{ $t('button.search') }}
                  </Button>
                  <Button v-else @click="router.push('/checkout')" class="flex-1">{{
                    $t('navigation.purchase')
                  }}</Button>
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
  import { ref, computed, onMounted, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { setI18nLanguage } from '@/i18n'
  import { useAuthStore, isLoggedIn } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { localize } from '@vee-validate/i18n'
  import Button from 'primevue/button'
  import Popover from 'primevue/popover'
  import ProductSearchAutoComplete from '@/components/search/ProductSearchAutoComplete.vue'
  import CartBadge from '@/components/cart/CartBadge.vue'
  import { useCartStore } from '@/stores/cart'
  import { useMobileMenuStore } from '@/stores/mobileMenu'
  import { useFavouritesStore } from '@/stores/favourites'
  import { getSupportedLocales } from '@/includes/helpers'

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
    theme.value =
      !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : localStorage.getItem('theme') || 'light'
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
  const localeItems = computed(() => getSupportedLocales(t))

  const notifications = computed(() => {
    return [
      {
        id: 1,
        msg: t('notification.login'),
      },
    ]
  })

  const notificationsPanel = ref()

  // Cart navigation methods
  const cartPopover = ref()

  const toggleCartDropdown = (event: Event) => {
    cartPopover.value.toggle(event)
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
        itemCount: 0,
      }
      // Clear favourites when user logs out
      favouritesStore.clearFavourites()
    }
  })
</script>
