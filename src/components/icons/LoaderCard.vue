<template>
  <div>
    <div class="w-full space-y-2 sm:w-56 lg:max-w-64" :key="num" v-for="num in prop.count">
      <Skeleton height="11rem" />
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
}>()
</script>
