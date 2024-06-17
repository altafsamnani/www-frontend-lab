<template>
  <div class="flex flex-row gap-1">
    <div class="space-y-4 basis-1/2" :key="numCol" v-for="numCol in prop.columns">
      <Skeleton height="1rem" :key="num" v-for="num in prop.rows" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const prop = defineProps<{
  columns: number
  rows: number
}>()
</script>
