<template>
  <div :class="layout === 'grid' ? 'grid grid-cols-12 gap-4' : 'flex flex-col'">
    <div class="col-span-12 sm:col-span-12 md:col-span-6 xl:col-span-4 p-2" :key="num" v-for="num in prop.count">
      <Skeleton class="mb-2" height="11rem" />
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="3rem" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const prop = defineProps<{
  count: number
  layout: string
}>()
</script>
