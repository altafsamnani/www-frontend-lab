<template>
  <div class="right-content-container">
    <!-- Page Header Section -->
    <div v-if="title || $slots.title || $slots.actions" class="page-header">
      <div class="mb-2 flex flex-col gap-2 md:mb-3">
        <!-- Title and Actions Row -->
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <h1
              class="text-surface-900 dark:text-surface-0 text-2xl leading-7 font-bold sm:text-3xl sm:tracking-tight"
            >
              <slot name="title">{{ title }}</slot>
            </h1>
          </div>
          <div v-if="$slots.actions" class="flex-shrink-0">
            <slot name="actions" />
          </div>
        </div>

        <!-- Subtitle -->
        <div
          v-if="subtitle || $slots.subtitle"
          class="text-surface-600 dark:text-surface-400 text-sm"
        >
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    subtitle?: string
  }

  withDefaults(defineProps<Props>(), {
    title: '',
    subtitle: '',
  })
</script>

<style scoped>
  .right-content-container {
    max-width: 4xl;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .right-content-container {
      padding-left: 2rem;
      padding-top: 0.5rem;
    }
  }
</style>
