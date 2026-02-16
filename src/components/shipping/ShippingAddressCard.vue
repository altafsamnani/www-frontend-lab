<template>
  <Card :class="[
    'cursor-pointer transition-all',
    isSelected
      ? 'border-2 border-primary'
      : 'border border-surface-200 dark:border-surface-700 hover:border-primary-300'
  ]" @click="$emit('select', address.id)">
    <template #content>
      <div class="">
        <!-- Selected Badge -->
        <div v-if="isSelected" class="flex justify-end -mt-2 -mr-2 mb-1">
          <span class="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded">
            {{ $t('common.selected') }}
          </span>
        </div>

        <!-- Compact Address Details -->
        <div class="">
          <h5 class="font-semibold text-sm text-surface-900 dark:text-surface-0 mb-1">
            {{ address.companyName }}
          </h5>
          <p class="text-xs text-surface-700 dark:text-surface-300">
            {{ fullName }}
          </p>
          <p class="text-xs text-surface-600 dark:text-surface-400">
            {{ fullAddress }}
          </p>
          <p class="text-xs text-surface-600 dark:text-surface-400">
            {{ address.zipcode }} {{ address.city }}, {{ address.country }}
          </p>
          <div v-if="address.phone || address.mobile" class="pt-1">
            <p v-if="address.phone" class="text-xs text-surface-500 dark:text-surface-500">
              <i class="pi pi-phone text-xs mr-1"></i>{{ address.phone }}
            </p>
          </div>
        </div>

        <!-- Selection Indicator -->
        <div class="flex justify-center mt-2">
          <i :class="[
            'pi',
            isSelected ? 'pi-check-circle text-primary' : 'pi-circle text-surface-400',
            'text-lg'
          ]"></i>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import type { Address } from '@/types/Address'

const props = defineProps<{
  address: Address
  isSelected: boolean
}>()

defineEmits<{
  select: [addressId: number]
}>()

const fullName = computed(() => {
  const parts: string[] = []
  if (props.address.firstname) {
    parts.push(props.address.firstname)
  }
  if (props.address.lastname) {
    parts.push(props.address.lastname)
  }
  return parts.join(' ') || '-'
})

const fullAddress = computed(() => {
  let addr = `${props.address.street} ${props.address.number}`
  if (props.address.numberExt) {
    addr += ` ${props.address.numberExt}`
  }
  return addr
})
</script>