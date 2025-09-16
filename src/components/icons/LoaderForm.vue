<template>
  <div class="w-full">
    <div 
      class="grid gap-4"
      :style="`grid-template-columns: repeat(${columns}, 1fr)`"
    >
      <div v-for="i in columns" :key="i" class="space-y-2">
        <div v-for="j in rows" :key="j">
          <Skeleton height="1.5rem" class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Skeleton from '@/volt/Skeleton.vue'

defineProps<{
  columns: number
  rows: number
}>()
</script>
