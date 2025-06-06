<template>
  <div class="sticky top-0 z-40 items-center h-20 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 bg-surface-800 dark:bg-surface-50">
    <TopNavigationNew />
  </div>
  <div class="flex">
    <div class="w-full" :class="$route.meta.layout != 'login' ? 'container mx-auto' : ''">
      <div>
        <Header />
      </div>

      <main class="py-4" :class="$route.meta.layout != 'login' ? 'lg:pt-6 max-w-[100vw]  ' : ''">
        <div class="">
          <slot />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Footer from '@/layouts/Footer.vue';
import Header from '@/components/navigation/Header.vue';
import { useNotifyStore } from '@/stores/notify'
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'
import Notification from "@/views/home/Notification.vue";
import TopNavigationNew from '@/components/navigation/TopNavigation.vue';

const notifyStore = useNotifyStore()
const { notifications } = storeToRefs(notifyStore)
const toast = useToast()




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
  @reference font-bold;
}
</style>