<template>
    <div class="flex items-center justify-between gap-2 py-4">
        <FloatLabel class=" w-full md:w-80" variant="in">
            <MultiSelect :id="'in_label' + facetItemsKey" :name="facetItemsKey" v-model="selectedValues" :options="filterOptions"
                optionLabel="label" optionValue="value" class="w-full" @change="onSelectionChange" variant="filled" >
            <template #option="slotProps">
                    <div class="flex justify-between w-full">
                        <span>{{ slotProps.option.label }}</span>
                        <span :class="facetCountClass(slotProps.option.count)" class="rounded-full flex items-center justify-center text-xs 
            font-bold bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-surface-0">
            {{ slotProps.option.count }}
            </span>
                    </div>
                </template>
            </MultiSelect>
            <label :for="'in_label' + facetItemsKey">{{ props.facetItemsKey ? t('attributes.' +
                props.facetItemsKey) : ''
                }}</label>
        </FloatLabel>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {  getAttributeOptionTranslation, facetCountClass } from '@/includes/helpers'

const props = withDefaults(defineProps<{
    esKey: string
    facetItems: { [key: string]: string | number }
    facetItemsKey?: string
    facetSearch?: string
    canSearch?: boolean
    checkedEsValues: Object
}>(), {
    canSearch: false
})

const { t } = useI18n()
const facetItemsKey = ref(props.facetItemsKey)
const emit = defineEmits(['clickOnFilterToUpdateEs'])



// Convert facet items to options format for MultiSelect
const filterOptions = computed(() => {
    return Object.entries(props.facetItems).map(([value, count]) => ({
        label: getAttributeOptionTranslation(t, value, props.facetItemsKey),
        value: value,
        count: count
    }))
})

const selectedValues = computed(() => {
    return Object.keys(props.checkedEsValues).length ? props.checkedEsValues : null
})


const onSelectionChange = (event: { value: string[] }) => {
    emit('clickOnFilterToUpdateEs', event.value)
}


// Initialize selected values when component is mounted
//initializeSelectedValues()
</script>
