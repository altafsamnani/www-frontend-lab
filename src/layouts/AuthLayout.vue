<template>
  <div class="flex w-full h-full items-center">
    <div class="flex w-full h-full">
      <!-- Left Side - Static Image -->
      <div
        class="hidden md:block w-6/12 h-full"
        :style="{
          background: `linear-gradient(0deg, var(--p-primary-500) 0%, var(--p-primary-500) 100%), url('${loginSplitImage}') lightgray 50% / cover no-repeat`,
          backgroundBlendMode: 'overlay, normal'
        }"
      />

      <!-- Right Side - Content -->
      <div class="bg-surface-0 dark:bg-surface-950 w-full md:w-6/12 px-8 py-12 md:px-12 lg:px-20 flex flex-col gap-8 h-full" :class="{ 'overflow-y-auto': scrollable, 'justify-center': !scrollable }">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-4">
            <Button
              icon="pi pi-arrow-left"
              severity="secondary"
              text
              @click="goBack"
              class="p-0"
              :label="$t('button.back')"
            />
          </div>
          <div class="flex flex-col gap-2">
            <h1 class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight">{{ title }}</h1>
            <div v-if="subtitle" class="text-surface-700 dark:text-surface-200">{{ subtitle }}</div>
          </div>
        </div>

        <div class="flex flex-col gap-8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/volt/Button.vue'
import loginSplitImage from '@/assets/login_split.webp'

interface Props {
  title: string
  subtitle?: string
  scrollable?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  scrollable: false
})

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'home' })
  }
}
</script>
