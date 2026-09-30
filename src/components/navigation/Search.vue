<template>
  <div class="flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
    <div class="w-full max-w-lg lg:max-w-xs">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="text-surface-400 h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          class="text-surface-900 ring-surface-300 placeholder:text-surface-400 focus:ring-primary-600 block w-full rounded-md border-0 bg-white py-1.5 pr-3 pl-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Search"
          type="search"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
</script>
