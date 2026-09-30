<template>
  <div class="relative h-full overflow-hidden">
    <div class="h-full overflow-hidden">
      <div class="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
        <div
          class="mx-auto w-full max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
        >
          <div class="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            <h1
              class="text-surface-900 dark:text-surface-0 text-4xl font-bold tracking-tight sm:text-6xl"
            >
              {{ prop.item.main }}
            </h1>
            <p
              class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none"
            >
              {{ prop.item.sub }}
            </p>
            <div class="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >Order now!</a
              >
              <a
                href="#"
                class="text-surface-900 dark:text-surface-0 text-sm leading-6 font-semibold"
                >Learn more <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
          <div
            class="mt-10 hidden justify-end gap-8 sm:flex sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
          >
            <div class="ml-auto w-32 flex-none space-y-6 pt-20 sm:ml-0 lg:order-last xl:order-none">
              <div class="relative">
                <img
                  :src="prop.item.image_1"
                  alt=""
                  class="bg-surface-900/5 aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
                />
                <div
                  class="ring-surface-900/10 pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset"
                />
              </div>
            </div>
            <div class="mr-auto w-32 flex-none space-y-6 sm:mr-0">
              <div class="relative">
                <img
                  :src="prop.item.image_2"
                  alt=""
                  class="bg-surface-900/5 aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
                />
                <div
                  class="ring-surface-900/10 pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset"
                />
              </div>
              <div class="relative">
                <img
                  :src="prop.item.image_3"
                  alt=""
                  class="bg-surface-900/5 aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
                />
                <div
                  class="ring-surface-900/10 pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset"
                />
              </div>
            </div>
            <div class="w-32 flex-none space-y-6 pt-10">
              <div class="relative">
                <img
                  :src="prop.item.image_4"
                  alt=""
                  class="bg-surface-900/5 aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
                />
                <div
                  class="ring-surface-900/10 pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset"
                />
              </div>
              <div class="relative">
                <img
                  :src="prop.item.image_5"
                  alt=""
                  class="bg-surface-900/5 aspect-[2/3] w-full rounded-xl object-cover shadow-lg"
                />
                <div
                  class="ring-surface-900/10 pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset"
                />
              </div>
            </div>
          </div>
        </div>
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
