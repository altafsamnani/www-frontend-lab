<template>
    <div class="relative isolate pt-14">
      <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
        <defs>
          <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
      </svg>
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div class="flex">
            <div class="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span class="font-semibold text-indigo-600">We’re hiring</span>
              <span class="h-4 w-px bg-gray-900/10" aria-hidden="true" />
              <a href="#" class="flex items-center gap-x-1">
                <span class="absolute inset-0" aria-hidden="true" />
                See open positions
              </a>
            </div>
          </div>
          <h1 class="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{{ prop.item.main }}</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">{{ prop.item.sub }}</p>
          <div class="mt-10 flex items-center gap-x-6">
            <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img :src="prop.item.image_1" class="mx-auto w-[22.875rem] max-w-full">  
           
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

import type { HeroTiles } from '@/types/Hero';
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const prop = defineProps<{
    item: HeroTiles
}>()

</script>