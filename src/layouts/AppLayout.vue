<template>
  <div v-if="route.meta?.layout === 'login'" class="h-screen w-full">
    <Toast position="top-right" />
    <slot />
  </div>
  <div v-else class="flex min-h-screen flex-col">
    <Toast position="top-right" />
    <GdprConsent />
    <div
      class="bg-primary-500 dark:bg-primary-100 sticky top-0 z-40 shrink-0 items-center gap-x-4 shadow-sm sm:gap-x-6"
    >
      <TopNavigation />
    </div>
    <div class="flex flex-1 flex-col">
      <div class="relative mx-auto w-full max-w-7xl flex-1">
        <div>
          <SecondaryNavigation />
        </div>

        <main class="max-w-[100vw] flex-1 py-2 lg:pt-1">
          <div class="relative flex">
            <LeftMenu v-if="route.meta?.layout === 'user'" />
            <div class="min-w-0 flex-1 p-4">
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
  import Footer from '@/layouts/Footer.vue'
  import LeftMenu from '@/components/navigation/LeftMenu.vue'
  import GdprConsent from '@/components/navigation/GdprConsent.vue'
  import { useNotifyStore } from '@/stores/notify'
  import { useToast } from 'primevue/usetoast'
  import { watch } from 'vue'
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import Toast from 'primevue/toast'
  import SecondaryNavigation from '@/components/navigation/SecondaryNavigation.vue'

  const notifyStore = useNotifyStore()
  const toast = useToast()
  const route = useRoute()

  watch(
    () => notifyStore.notifications.length,
    (newLength, oldLength) => {
      if (newLength > oldLength && newLength > 0) {
        const latestNotification = notifyStore.notifications[newLength - 1]
        toast.add({
          severity: latestNotification.type,
          detail: latestNotification.message,
          life: 3000,
        })
      }
    }
  )
</script>
