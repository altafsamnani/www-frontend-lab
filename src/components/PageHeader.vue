<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="flex-1 min-w-0">
      <h2 class="text-2xl leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
        <slot name="title"></slot>
      </h2>
    </div>
    <div class="flex gap-3 mt-4 md:ml-4 md:mt-0">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
