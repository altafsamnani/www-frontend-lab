<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2
        class="text-surface-900 dark:text-surface-0 text-2xl leading-7 font-bold sm:truncate sm:text-3xl sm:tracking-tight"
      >
        <slot name="title"></slot>
      </h2>
    </div>
    <div class="mt-4 flex gap-3 md:mt-0 md:ml-4">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
