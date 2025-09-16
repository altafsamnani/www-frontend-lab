<template>
  <RightLayout :title="t('cart.title')">
    <template #actions>
      <button v-if="!cartStore.isCartEmpty" @click="clearCart" :disabled="cartStore.loading"
        class="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 bg-surface-0 dark:bg-surface-950 border border-surface-300 dark:border-surface-600 rounded-md hover:bg-surface-50 dark:hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
        {{ t('cart.clearCart') }}
      </button>
    </template>

    <div v-if="cartStore.loading && cartStore.isCartEmpty" class="flex items-center justify-center py-12">
      <LoaderForm :columns="1" :rows="16" />
    </div>

    <div v-else-if="cartStore.error" class="text-center py-12">
      <p class="text-red-600">{{ cartStore.error }}</p>
      <button @click="() => cartStore.fetchCart()"
        class="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        {{ t('cart.retry') }}
      </button>
    </div>

    <div v-else-if="cartStore.isCartEmpty" class="text-center py-12">
      <i class="pi pi-shopping-cart text-6xl text-surface-400 dark:text-surface-500 mb-4"></i>
      <p class="text-surface-500 dark:text-surface-400 text-lg mb-2">{{ t('cart.empty.title') }}</p>
      <p class="text-surface-400 dark:text-surface-500 mb-6">{{ t('cart.empty.message') }}</p>
      <router-link :to="{ name: 'Search' }">
        <Button>
          <i class="pi pi-search mr-2"></i>
          {{ t('cart.startShopping') }}
        </Button>
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div
        class="bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg shadow-sm">
        <div class="p-4 border-b border-surface-200 dark:border-surface-800">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-surface-900 dark:text-surface-0">Items in Cart</h3>
            <div class="flex items-center gap-3">
              <div class="flex items-center">
                <Checkbox v-model="selectAll" @update:modelValue="handleSelectAll" :binary="true" class="mr-2" />
                <label class="text-sm text-surface-700 dark:text-surface-300">{{ t('cart.selectAll') }}</label>
              </div>
              <Button v-if="selectedItems.length > 0" @click="confirmBulkRemove"
                :label="t('cart.removeSelected', { count: selectedItems.length })" icon="pi pi-trash" severity="danger"
                size="small" />
            </div>
          </div>
        </div>
        <div class="divide-y divide-surface-200 dark:divide-surface-800">
          <CartItem v-for="item in cartStore.cartItems" :key="item.id" :item="item"
            :selected="selectedItems.includes(item.id)" @selection-change="handleItemSelection" />
        </div>
      </div>

      <div
        class="bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg shadow-sm">
        <div class="p-6">
          <h3 class="text-lg font-medium text-surface-900 dark:text-surface-0 mb-4">{{ t('cart.orderSummary.title') }}
          </h3>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-surface-600 dark:text-surface-400">{{ t('cart.orderSummary.items') }} ({{
                cartStore.cartSummary.itemCount }})</span>
              <span class="text-surface-900 dark:text-surface-0">€{{ formatPrice(cartStore.cartSummary.totalAmount +
                cartStore.cartSummary.totalDiscount) }}</span>
            </div>

            <div v-if="cartStore.cartSummary.totalDiscount > 0" class="flex justify-between">
              <span class="text-surface-600 dark:text-surface-400">{{ t('cart.orderSummary.discount') }}</span>
              <span class="text-green-600 dark:text-green-400">-€{{ formatPrice(cartStore.cartSummary.totalDiscount)
                }}</span>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-800 pt-3">
              <div class="flex justify-between">
                <span class="text-lg font-medium text-surface-900 dark:text-surface-0">{{ t('cart.orderSummary.total')
                  }}</span>
                <span class="text-lg font-medium text-surface-900 dark:text-surface-0">€{{
                  formatPrice(cartStore.cartSummary.totalAmount)
                  }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <button @click="proceedToCheckout" :disabled="cartStore.loading"
              class="w-full px-6 py-3 text-base font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
              <span v-if="cartStore.loading">{{ t('cart.processing') }}</span>
              <span v-else>{{ t('cart.proceedToCheckout') }}</span>
            </button>

            <button @click="continueShopping"
              class="w-full px-6 py-3 text-base font-medium text-primary-600 bg-white border border-primary-600 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {{ t('cart.continueShopping') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk removal confirmation dialog -->
    <Dialog v-model:visible="showBulkRemoveDialog" :header="t('cart.bulkRemoveConfirm')" :modal="true">
      <p>{{ t('cart.bulkRemoveMessage', { count: selectedItems.length }) }}</p>
      <div class="mt-3 max-h-40 overflow-y-auto">
        <div v-for="item in selectedCartItems" :key="item.id"
          class="p-2 bg-surface-100 dark:bg-surface-800 rounded mb-2">
          <p class="font-medium text-sm">{{ item.name }}</p>
          <p class="text-xs text-surface-600 dark:text-surface-400">{{ item.articleNr }}</p>
        </div>
      </div>
      <template #footer>
        <SecondaryButton @click="showBulkRemoveDialog = false">
          {{ t('common.cancel') }}
        </SecondaryButton>
        <DangerButton @click="handleBulkRemove">
          {{ t('cart.removeItems', { count: selectedItems.length }) }}
        </DangerButton>
      </template>
    </Dialog>
  </RightLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useNavigationStore } from '@/stores/navigation'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import CartItem from '@/components/cart/CartItem.vue'
import RightLayout from '@/layouts/RightLayout.vue'
import Checkbox from 'primevue/checkbox'
import Button from '@/volt/Button.vue'
import Dialog from '@/volt/Dialog.vue'
import SecondaryButton from '@/volt/SecondaryButton.vue'
import DangerButton from '@/volt/DangerButton.vue'
import LoaderForm from '@/components/icons/LoaderForm.vue'


const { t } = useI18n()

const cartStore = useCartStore()
const router = useRouter()
const navigationStore = useNavigationStore()
const notifyStore = useNotifyStore()

// Bulk selection state
const selectedItems = ref<string[]>([])
const selectAll = ref(false)
const showBulkRemoveDialog = ref(false)

// Computed property for selected cart items
const selectedCartItems = computed(() => {
  return cartStore.cartItems.filter(item => selectedItems.value.includes(item.id))
})

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

// Bulk selection methods
const handleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = cartStore.cartItems.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

const handleItemSelection = (itemId: string, selected: boolean) => {
  if (selected) {
    if (!selectedItems.value.includes(itemId)) {
      selectedItems.value.push(itemId)
    }
  } else {
    selectedItems.value = selectedItems.value.filter(id => id !== itemId)
  }

  // Update selectAll checkbox state
  selectAll.value = selectedItems.value.length === cartStore.cartItems.length
}

const confirmBulkRemove = () => {
  showBulkRemoveDialog.value = true
}

const handleBulkRemove = async () => {
  try {
    // Remove items one by one
    for (const itemId of selectedItems.value) {
      await cartStore.removeItemFromCart(parseInt(itemId))
    }

    notifyStore.notify(
      t('cart.messages.bulkRemoveSuccess', { count: selectedItems.value.length }),
      NotificationType.Success
    )

    // Clear selection
    selectedItems.value = []
    selectAll.value = false
    showBulkRemoveDialog.value = false
  } catch (error) {
    console.error('Error removing items:', error)
    notifyStore.notify(
      t('cart.messages.bulkRemoveError'),
      NotificationType.Error
    )
  }
}

const clearCart = async () => {
  if (confirm(t('cart.clearConfirm'))) {
    try {
      await cartStore.clearAllItems()
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }
}

const proceedToCheckout = () => {
  router.push('/checkout')
}

const continueShopping = () => {
  const lastRoute = navigationStore.getLastVisitedRoute()
  router.push(lastRoute)
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>