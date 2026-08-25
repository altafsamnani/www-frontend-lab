<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <div class="mb-6">
      <h1
        class="text-surface-900 dark:text-surface-0 mb-2 text-2xl leading-7 font-bold sm:text-3xl sm:tracking-tight"
      >
        {{ $t('checkout.title') }}
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        {{ $t('checkout.subtitle') }}
      </p>
    </div>

    <!-- Check if cart is empty -->
    <div v-if="!cartStore.hasItems" class="py-12 text-center">
      <div
        class="bg-surface-100 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
      >
        <i class="pi pi-shopping-cart text-surface-400 text-2xl"></i>
      </div>
      <h2 class="text-surface-900 dark:text-surface-0 mb-4 text-xl font-semibold">
        {{ $t('checkout.emptyCart.title') }}
      </h2>
      <p class="text-surface-600 dark:text-surface-400 mb-6">
        {{ $t('checkout.emptyCart.message') }}
      </p>
      <router-link :to="{ name: 'Search' }">
        <Button>
          <i class="pi pi-search mr-2"></i>
          {{ $t('checkout.emptyCart.startShopping') }}
        </Button>
      </router-link>
    </div>

    <!-- Checkout Component -->
    <Checkout v-else />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useCartStore } from '@/stores/cart'
  import { useAuthStore } from '@/stores/auth'
  import Button from '@/volt/Button.vue'
  import Checkout from '@/views/checkout/Checkout.vue'

  const { t } = useI18n()
  const router = useRouter()
  const cartStore = useCartStore()
  const authStore = useAuthStore()

  onMounted(async () => {
    // Check if user is logged in
    if (!authStore.user && !authStore.accessToken) {
      router.push({
        name: 'login',
        query: { redirect: '/checkout' },
      })
      return
    }

    // Load cart items if not already loaded
    if (!cartStore.isInitialized) {
      await cartStore.fetchCartItems()
    }
  })
</script>
