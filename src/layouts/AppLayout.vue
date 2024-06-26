<template>
  <div class="flex">

    <div class="w-full" :class="$route.meta.layout != 'login' ? 'lg:pl-72' : ''">
      <Notification/>
      <div
        class="sticky top-0 z-40 flex items-center h-20 px-4 border-b shadow-sm dark:border-white/10 border-surface-900/10 shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <!-- Separator -->
        <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true"></div>

        <TopNavigation />
        <Toast />
      </div>
      <main class="py-4" :class="$route.meta.layout != 'login' ? 'lg:pt-6 max-w-[100vw]  ' : ''">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import Footer from '@/layouts/Footer.vue';
import TopNavigation from '@/components/navigation/TopNavigation.vue'
import { useNotifyStore } from '@/stores/notify'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'
import Notification from "@/views/home/Notification.vue";

const notifyStore = useNotifyStore()
const { notifications } = storeToRefs(notifyStore)
const toast = useToast()


onMounted(() => {
  const theme = localStorage.getItem('theme') || 'light'
  document.querySelector('html')?.setAttribute('class', theme)
})

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

<style scoped>
.current {
  @apply font-bold;
}
</style>