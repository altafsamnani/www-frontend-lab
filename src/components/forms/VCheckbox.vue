<template>
  <vee-field :name="name" v-slot="{ value, setValue, field }">
    <label class="flex items-center gap-2">
      <Checkbox 
        :model-value="value ?? modelValue ?? false" 
        @update:model-value="(newValue) => {
          setValue(newValue)
          $emit('update:modelValue', newValue)
        }"
        :binary="true" 
      />
      <span class="font-medium text-surface-900 dark:text-surface-0">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </vee-field>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import Checkbox from 'primevue/checkbox'
import { useField } from 'vee-validate'

interface Props {
  name: string
  label?: string
  modelValue?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Get the field from vee-validate
const { value: fieldValue, setValue } = useField(() => props.name)

// Set initial value from modelValue prop
onMounted(() => {
  if (props.modelValue !== undefined) {
    setValue(props.modelValue)
  }
})

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined && newValue !== fieldValue.value) {
    setValue(newValue)
  }
})
</script>