<template>
  <div class="bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
        {{ isOrderItems ? $t('checkout.yourOrder') : $t('cart.title') }}
      </h3>
      <div class="flex items-center space-x-2">
        <span
          class="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium">
          {{ items.length }} {{ items.length === 1 ? 'item' : 'items' }}
        </span>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <LoaderForm :columns="1" :rows="3" />
    </div>

    <div v-else-if="items.length === 0" class="text-center py-8">
      <i class="pi pi-shopping-cart text-4xl text-surface-400 dark:text-surface-500 mb-4"></i>
      <p class="text-surface-600 dark:text-surface-400 text-lg mb-4">
        {{ isOrderItems ? $t('checkout.noItems') : $t('cart.empty') }}
      </p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in items" :key="item.id"
        class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-16 h-16 bg-white dark:bg-surface-700 rounded-lg overflow-hidden shadow-sm">
            <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.name"
              class="w-full h-full object-contain p-2" />
            <div v-else class="w-full h-full flex items-center justify-center text-surface-400 dark:text-surface-500">
              <i class="pi pi-image text-xl"></i>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h4 class="font-semibold text-surface-900 dark:text-surface-0 mb-1">{{ item.name }}</h4>
                <div class="flex items-center space-x-4 mb-2">
                  <span class="text-sm text-surface-600 dark:text-surface-400">
                    <i class="pi pi-hashtag text-xs mr-1"></i>{{ item.articleNr }}
                  </span>
                </div>

                <div class="flex items-center space-x-4">
                  <div
                    class="flex items-center bg-white dark:bg-surface-700 rounded-lg px-3 py-1 border border-surface-200 dark:border-surface-600">
                    <span class="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {{ $t('products.quantity') }}:
                    </span>
                    <span class="ml-2 font-semibold text-surface-900 dark:text-surface-0">{{ item.quantity }}</span>
                  </div>

                  <div v-if="item.discountActionName"
                    class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-md text-xs font-medium">
                    <i class="pi pi-percentage mr-1"></i>{{ item.discountActionName }}
                  </div>
                </div>
              </div>

              <div class="text-right ml-4">
                <div class="space-y-1">
                  <p class="text-lg font-bold text-surface-900 dark:text-surface-0">
                    €{{ formatPrice(item.totalPrice || item.price * item.quantity) }}
                  </p>
                  <div v-if="item.discountPercentage && item.discountPercentage > 0" class="space-y-1">
                    <p class="text-sm text-surface-500 dark:text-surface-400 line-through">
                      €{{ formatPrice(item.price * item.quantity) }}
                    </p>
                    <p class="text-sm font-medium text-green-600 dark:text-green-400">
                      -{{ item.discountPercentage }}% saved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="border-t border-surface-200 dark:border-surface-700 pt-4 mt-6">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-surface-700 dark:text-surface-300 flex items-center">
              <i class="pi pi-shopping-cart text-sm mr-2"></i>
              {{ $t('checkout.orderSummary.items') }} ({{ items.length }})
            </span>
            <span class="font-medium text-surface-900 dark:text-surface-0">
              €{{ formatPrice(totalAmount + (totalDiscount || 0)) }}
            </span>
          </div>

          <div v-if="totalDiscount && totalDiscount > 0" class="flex justify-between items-center">
            <span class="text-surface-700 dark:text-surface-300 flex items-center">
              <i class="pi pi-percentage text-sm mr-2"></i>
              {{ $t('checkout.orderSummary.discount') }}
            </span>
            <div class="flex items-center">
              <span
                class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-md text-sm font-medium mr-2">
                {{ $t('checkout.orderSummary.youSaved') }}
              </span>
              <span class="font-medium text-green-600 dark:text-green-400">-€{{ formatPrice(totalDiscount) }}</span>
            </div>
          </div>

          <div class="border-t border-surface-200 dark:border-surface-700 pt-3">
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-surface-900 dark:text-surface-0">
                {{ $t('checkout.orderSummary.total') }}
              </span>
              <div class="text-right">
                <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  €{{ formatPrice(totalAmount) }}
                </span>
                <p class="text-sm text-surface-500 dark:text-surface-400">
                  {{ $t('checkout.orderSummary.includingTaxes') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoaderForm from '@/components/icons/LoaderForm.vue'

interface CartItem {
  id: string
  name: string
  articleNr: string
  quantity: number
  price: number
  totalPrice?: number
  discountPercentage?: number
  discountActionName?: string
  thumbnail?: string
}

interface Props {
  items: CartItem[]
  loading?: boolean
  isOrderItems?: boolean
  totalAmount: number
  totalDiscount?: number
}

withDefaults(defineProps<Props>(), {
  loading: false,
  isOrderItems: false,
  totalDiscount: 0
})

const formatPrice = (price: number | undefined): string => {
  return (price || 0).toFixed(2)
}
</script>