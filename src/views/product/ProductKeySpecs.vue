<template>
    <div v-if="keySpecs.length" class="sticky top-22">
        <div class="flex items-center gap-2 mb-6">
            <i class="pi pi-info-circle text-primary text-lg"></i>
            <h3 class="text-surface-900 dark:text-surface-0 font-semibold text-lg">{{ t('products.key_specs') }}</h3>
        </div>

        <div class="space-y-0">
            <div v-for="(attribute, index) in keySpecs" :key="attribute.filter_key" :class="[
                'py-3 px-4',
                index % 2 === 0 ? 'bg-surface-50 dark:bg-surface-800' : 'bg-transparent'
            ]">
                <div class="flex justify-between items-start gap-3">
                    <div class="flex-1">
                        <div class="text-surface-700 dark:text-surface-300 text-sm font-medium leading-relaxed">
                            {{ t('attributes.' + attribute.filter_key) }}
                        </div>
                    </div>
                    <div class="flex-1 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <i v-if="hasIcon(attribute.filter_values)" :class="getIconClass(attribute.filter_values)"
                                class="!text-base !leading-none"></i>
                            <span v-else class="text-surface-900 dark:text-surface-100 text-sm font-medium">
                                {{ getAttributeValues(attribute.filter_key, attribute.filter_values,
                                    attribute.filter_type) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="hasMoreSpecs" class="mt-6 pt-4 border-t border-surface-200 dark:border-surface-600">
            <button @click="$emit('showAllSpecs')"
                class="text-primary hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1 transition-colors">
                <span>{{ t('products.view_all_specs') }}</span>
                <i class="pi pi-arrow-right text-xs"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAttributeOptionTranslation } from '@/includes/helpers'

interface Attribute {
    filter_key: string
    filter_values: any
    filter_type: string
    fieldset_translation_key: string
    fieldset_type: string
}

interface Props {
    attributes: Attribute[]
    maxSpecs?: number
}

const props = withDefaults(defineProps<Props>(), {
    maxSpecs: 10
})

const emit = defineEmits<{
    showAllSpecs: []
}>()

const { t } = useI18n()

const keySpecs = computed(() => {
    return props.attributes.slice(0, props.maxSpecs)
})

const hasMoreSpecs = computed(() => {
    return props.attributes.length > props.maxSpecs
})

const getAttributeValues = (filterKey: string, filterValues: any, filterType: string) => {
    if (!filterValues || (Array.isArray(filterValues) && filterValues.length === 0)) {
        return '-'
    }

    switch (filterType) {
        case 'listmultiple':
            return filterValues.map((filterValue: any) => getAttributeOptionTranslation(t, filterValue, filterKey)).join(', ');
        case 'list':
            return getAttributeOptionTranslation(t, filterValues, filterKey)
        case 'text':
        default:
            // Handle long text values
            const textValue = filterValues.toString()
            if (textValue.length > 50) {
                return textValue.substring(0, 47) + '...'
            }
            return textValue;
    }
}

const getIconClass = (filterValues: any) => {
    let filterValue = filterValues.toString().toLowerCase();
    let yesValues = ['ja', 'yes', 'true'];
    if (hasIcon(filterValue)) {
        return yesValues.includes(filterValue) ? 'pi pi-check-circle text-green-400 dark:text-green-300' : 'pi pi-times-circle text-red-400 dark:text-red-300';
    }
    return '';
}

const hasIcon = (filterValues: any) => {
    let filterValue = filterValues.toString().toLowerCase();
    const flagForYesNo = ['nee', 'ja', 'yes', 'no', 'geen', 'true', 'false']

    if (typeof filterValues === 'boolean') {
        return true;
    }

    return filterValues && typeof filterValues === 'string' && flagForYesNo.includes(filterValue);
}
</script>