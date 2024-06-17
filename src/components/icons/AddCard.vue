<template>
  <div
    class="w-full transition-shadow rounded-md shadow-md sm:w-56 place-content-between lg:max-w-64 list-group-item hover:shadow-lg hover:shadow-zinc-900/5 dark:bg-white/10 dark:hover:shadow-white/10"
  >
    <router-link :to="{ name: 'CategoryCreate' }">
      <figure>
        <div class="flex items-center justify-center w-full h-48 p-3 mx-auto">
          <i class="inline text-2xl pi pi-plus" />
        </div>
      </figure>
      <div class="p-3 text-center">
        <div class="mb-2 text-lg font-medium lg:font-light">Add new category</div>
      </div>
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const prop = defineProps<{
  createPathName: string
}>()
</script>
