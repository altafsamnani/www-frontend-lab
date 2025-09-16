<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">
        {{ $t('checkout.title') }}
      </h1>
      <p class="text-surface-600 dark:text-surface-400">
        {{ $t('checkout.subtitle') }}
      </p>
    </div>

    <!-- Check if cart is empty -->
    <div v-if="!cartStore.hasItems" class="text-center py-12">
      <div class="w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="pi pi-shopping-cart text-surface-400 text-2xl"></i>
      </div>
      <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-4">
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
      query: { redirect: '/checkout' }
    })
    return
  }

  // Load cart items if not already loaded
  if (!cartStore.isInitialized) {
    await cartStore.fetchCartItems()
  }
})
</script>