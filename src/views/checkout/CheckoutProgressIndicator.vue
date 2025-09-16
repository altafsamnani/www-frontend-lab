<template>
  <div class="mb-8">
    <div class="flex items-center justify-between relative">
      <!-- Progress Line -->
      <div class="absolute top-4 left-0 right-0 h-0.5 bg-surface-200 dark:bg-surface-700 z-0"></div>
      <div class="absolute top-4 left-0 h-0.5 bg-primary z-0 transition-all duration-300"
        :style="{ width: progressWidth }"></div>

      <!-- Progress Steps -->
      <div v-for="(step, index) in steps" :key="step.key" class="flex flex-col items-center relative z-10">
        <div :class="[
          'w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300',
          isStepActive(index + 1)
            ? 'bg-primary text-white'
            : isStepCompleted(index + 1)
              ? 'bg-primary text-white'
              : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-300'
        ]">
          <i v-if="isStepCompleted(index + 1)" :class="step.icon" class="text-sm"></i>
          <i v-else :class="step.icon" class="text-sm"></i>
        </div>

        <span :class="[
          'text-xs text-center font-medium max-w-20',
          isStepActive(index + 1) || isStepCompleted(index + 1)
            ? 'text-primary'
            : 'text-surface-600 dark:text-surface-400'
        ]">
          {{ $t(`checkout.steps.${step.key}`) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  currentStep: number
}

const props = defineProps<Props>()

const { t } = useI18n()

const steps = [
  { key: 'checkout', icon: 'pi pi-shopping-cart' },
  { key: 'review', icon: 'pi pi-eye' },
  { key: 'confirmation', icon: 'pi pi-check-circle' }
]

const progressWidth = computed(() => {
  const percentage = ((props.currentStep - 1) / (steps.length - 1)) * 100
  return `${Math.min(100, Math.max(0, percentage))}%`
})

const isStepActive = (stepNumber: number): boolean => {
  return props.currentStep === stepNumber
}

const isStepCompleted = (stepNumber: number): boolean => {
  return props.currentStep > stepNumber
}
</script>