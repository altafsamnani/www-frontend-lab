<template>
  <div class="relative isolate h-full overflow-hidden">
    <div
      class="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-10 lg:flex-row lg:items-center lg:gap-x-10 lg:px-8"
    >
      <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <div class="flex">
          <div
            class="text-surface-600 ring-surface-900/10 hover:ring-surface-900/20 dark:text-surface-400 relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 ring-1 dark:ring-white/15 dark:hover:ring-white/25"
          >
            <span class="text-primary-600 dark:text-primary-400 font-semibold">We’re hiring</span>
            <span class="bg-surface-900/10 h-4 w-px dark:bg-white/15" aria-hidden="true" />
            <a href="#" class="flex items-center gap-x-1">
              <span class="absolute inset-0" aria-hidden="true" />
              See open positions
            </a>
          </div>
        </div>
        <h1
          class="text-surface-900 dark:text-surface-0 mt-6 max-w-lg text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {{ prop.item.main }}
        </h1>
        <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
          {{ prop.item.sub }}
        </p>
        <div class="mt-8 flex items-center gap-x-6">
          <a
            href="#"
            class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >Get started</a
          >
          <a href="#" class="text-surface-900 dark:text-surface-0 text-sm leading-6 font-semibold"
            >Learn more <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
      <div class="mt-10 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <img
          :src="prop.item.image_1"
          class="mx-auto max-h-[22rem] w-auto max-w-full object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { HeroTiles } from '@/types/Hero'
  import { useI18n } from 'vue-i18n'

  const { locale, t } = useI18n()
  const prop = defineProps<{
    item: HeroTiles
  }>()
</script>
