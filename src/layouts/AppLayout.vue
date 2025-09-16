<template>
  <div v-if="route.meta?.layout === 'login'" class="h-screen w-full">
    <slot />
  </div>
  <div v-else class="min-h-screen flex flex-col">
    <Toast />
    <div class="sticky top-0 z-40 items-center shadow-sm shrink-0 gap-x-4 sm:gap-x-6 bg-surface-800 dark:bg-surface-50">
      <TopNavigation />
    </div>
    <div class="flex flex-col flex-1">
      <div class="w-full max-w-7xl mx-auto relative flex-1">
        <div>
          <Header />
        </div>

        <main class="py-2 lg:pt-1 max-w-[100vw] flex-1">
          <div class="flex relative">
            <LeftMenu v-if="route.meta?.layout === 'user'" />
            <div class="flex-1 p-4">
              <slot />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import Footer from '@/layouts/Footer.vue';
import Header from '@/components/navigation/Header.vue';
import LeftMenu from '@/components/navigation/LeftMenu.vue';
import { useNotifyStore } from '@/stores/notify'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'
import TopNavigation from '@/components/navigation/TopNavigation.vue';
import Toast from '@/volt/Toast.vue';

const notifyStore = useNotifyStore()
const toast = useToast()
const route = useRoute()

const toasts = notifyStore.notifications

watch(toasts, () => {
  toasts.forEach((notification) => {
    toast.add({
      severity: notification.type,
      //summary: 'xx',
      detail: notification.message,
      life: 3000
    })
  })
})
</script>