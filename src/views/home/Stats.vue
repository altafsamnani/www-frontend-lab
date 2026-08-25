<template>
  <div
    class="bg-surface-900 ring-surface-900/5 dark:bg-surface-800 overflow-hidden rounded-3xl ring-1 dark:ring-white/10"
  >
    <dl class="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-surface-900 dark:bg-surface-800 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-6 py-10 xl:px-8"
      >
        <dt class="text-surface-400 text-sm leading-6 font-medium">{{ stat.name }}</dt>
        <dd
          :class="[
            stat.changeType === 'negative' ? 'text-rose-400' : 'text-surface-400',
            'text-xs font-medium',
          ]"
        >
          {{ stat.change }}
        </dd>
        <dd class="w-full flex-none text-3xl leading-10 font-medium tracking-tight text-white">
          {{ stat.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
  const stats = [
    { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
    { name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
    {
      name: 'Outstanding invoices',
      value: '$245,988.00',
      change: '-1.39%',
      changeType: 'positive',
    },
    { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
  ]
</script>
