<template>
  <div
    class="bg-white dark:bg-surface-950 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-6 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer"
    @click="navigateToCreateAddress">
    <div class="flex flex-col items-center justify-center text-center h-full min-h-[120px]">
      <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
        <i class="pi pi-plus text-primary-600 dark:text-primary-400 text-xl"></i>
      </div>
      <h4 class="text-lg font-medium text-surface-900 dark:text-surface-0 mb-2">
        {{ $t('shipping.addresses.addNew') }}
      </h4>
      <p class="text-surface-600 dark:text-surface-400 text-sm">
        {{ $t('shipping.addresses.addNewDescription') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCreateAddress = () => {
  router.push({ name: 'shipping-create' })
}
</script>