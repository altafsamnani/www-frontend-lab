<template>
  <div
    class="transition-shadow rounded-md shadow-md sm:w-56 place-content-between lg:max-w-64 list-group-item hover:shadow-lg hover:shadow-surface-900/10 dark:bg-white/5 dark:hover:shadow-white/10"
  >
    <div clas="h-full">
      <router-link :to="{ name: 'BrandEdit', params: { id: props.brand.id } }">
        <div class="flex justify-center bg-white">
          <figure>
            <img
              :src="props.brand.images[0] !== undefined ? props.brand.images[0].url : defaultUrl"
              :alt="props.brand.name"
              class="w-full h-40 max-w-40"
            />
          </figure>
        </div>

        <div class="flex flex-col p-3 overflow-hidden h-28">
          <div class="mb-2 text-base font-semibold leading-6">
            {{ props.brand.name }}
          </div>

          <p class="flex justify-start h-10 m-0 overflow-hidden text-sm text-ellipsis">
            {{ props.brand.description }}
          </p>
        </div>
      </router-link>

      <div class="flex flex-col justify-between h-full p-3">
        <div class="bottom-0 flex justify-between">
          <Button
            icon="pi pi-arrows-h"
            :severity="publishedSeverity"
            text
            rounded
            class="w-12 h-12"
            :class="props.isFiltering ? '' : 'cursor-move handle'"
            aria-label="Reorder"
          />
          <router-link :to="{ name: 'BrandEdit', params: { id: props.brand.id } }" class="">
            <Button
              icon="pi pi-file-edit"
              :severity="publishedSeverity"
              text
              rounded
              class="w-12 h-12"
              :class="props.isFiltering ? '' : 'cursor-pointer'"
              aria-label="Edit"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  brand: {
    type: Object,
    required: true
  },
  isFiltering: {
    type: Boolean
  }
})

const defaultUrl = import.meta.env.VITE_DEFAULT_IMAGE

const publishedSeverity = computed(() => {
  if (props.brand.publishedAt > new Date().toISOString()) return 'warning'
  if (props.brand.publishedAt == null) return 'danger'
  if (props.brand.publishedAt < new Date().toISOString() && props.brand.publishedAt != null)
    return 'secondary'
})
const now = computed(() => {
  return props.brand.publishedAt > new Date().toISOString()
})
</script>
