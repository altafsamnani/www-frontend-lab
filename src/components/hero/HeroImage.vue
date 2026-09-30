<template>
  <div class="relative h-full overflow-hidden">
    <div class="mx-auto h-full max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div
        class="flex flex-col justify-center px-6 py-10 lg:col-span-7 lg:h-full lg:px-0 xl:col-span-6"
      >
        <div class="mx-auto max-w-2xl lg:mx-0">
          <div class="hidden sm:flex">
            <div
              class="text-surface-500 ring-surface-900/10 hover:ring-surface-900/20 dark:text-surface-400 relative rounded-full px-3 py-1 text-sm leading-6 ring-1 dark:ring-white/15 dark:hover:ring-white/25"
            >
              {{ prop.item.headerlink }}
              <a
                href="#"
                class="text-primary-600 dark:text-primary-400 font-semibold whitespace-nowrap"
                ><span class="absolute inset-0" aria-hidden="true" />Read more
                <span aria-hidden="true">&rarr;</span></a
              >
            </div>
          </div>
          <h1
            class="text-surface-900 dark:text-surface-0 mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
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
      </div>
      <div
        class="relative lg:col-span-5 lg:-mr-8 lg:h-full xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0"
      >
        <img
          :src="prop.item.image_1"
          class="bg-surface-50 aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          alt=""
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
