<template>
  <div
    class="relative w-full transition-shadow rounded-md shadow-md sm:w-56 place-content-between lg:max-w-64 list-group-item hover:shadow-lg hover:shadow-surface-900/5 dark:bg-white/10 dark:hover:shadow-white/10"
  >
    <router-link
      :to="{ name: 'Categories', params: { id: props.category.id } }"
      :class="{ disabled: props.category.children }"
      @click.prevent="categoryClick"
    >
      <figure>
        <img :src="props.category.images[0] !== undefined ? props.category.images[0].url : defaultUrl" :alt="props.category.name" class="min-h-48" />
      </figure>
      <div class="p-3 text-center">
        <div class="mb-2 text-base font-semibold leading-6">{{ props.category.name }}</div>
      </div>
    </router-link>
    <div class="bottom-0 flex justify-between w-full p-2">
      <Button icon="pi pi-arrows-h" text rounded severity="secondary" class="cursor-move handle" />
      <router-link :to="{ name: 'CategoryEdit', params: { id: props.category.id } }">
        <Button icon="pi pi-file-edit" text rounded severity="secondary" class="" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const defaultUrl = import.meta.env.VITE_DEFAULT_IMAGE

const categoryClick = () => {
  emit('categoryClick', props.category)
}

const emit = defineEmits(['categoryClick'])
</script>
