<template>
    <div class="text-surface-900 dark:text-surface-0 font-medium text-3xl mt-2">{{
        t('products.specifications') }}</div>
    <DataTable v-if="props.attributes" :value="props.attributes" ref="dt" rowGroupMode="subheader"
        groupRowsBy="fieldset_translation_key" sortMode="single" sortField="fieldset_translation_key" :sortOrder="1"
        size="small"
        :showHeaders="false" class="borderless-datatable">
        <Column field="fieldset_translation_key.name" header=""></Column>
        <Column field="filter_key" header="">
            <template #body="slotProps">
                <div class="flex items-center gap-2">

                    <i class="pi pi-check-square !text-xl !leading-none mr-2" />
                    <span>{{ t('attributes.' + slotProps.data.filter_key) }}</span>
                </div>
            </template>
        </Column>
        <Column field="filter_values" header="">
            <template #body="slotProps">
                <div class="flex items-center gap-2">
                    <i v-if="hasIcon(slotProps.data.filter_values)" :class="getIconClass(slotProps.data.filter_values)"
                        class="!text-xl !leading-none mr-2"></i>
                    <span v-else > {{ getAttributeValues(slotProps.data.filter_key, slotProps.data.filter_values,
                        slotProps.data.filter_type) }}</span>
                </div>
            </template>
        </Column>
        <template #header>
            <div class="text-end">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
            </div>
        </template>
        <template #groupheader="slotProps">
            <div class="flex items-center gap-2">
                <span class="text-xl">{{ t('attributeFieldset.' + slotProps.data.fieldset_type + '.' +
                    slotProps.data.fieldset_translation_key) }}</span>
            </div>
        </template>
    </DataTable>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { getAttributeOptionTranslation } from '@/includes/helpers'
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
const { t } = useI18n()
const dt = ref<InstanceType<typeof DataTable> | null>(null);
const props = defineProps<{
    attributes: []
}>()

const exportCSV = () => {
    dt.value?.exportCSV?.();
};

const getAttributeValues = (filterKey: string, filterValues: any, filterType: string) => {
    if (!filterValues || filterValues.length === 0) {
        return ''
    }

    switch (filterType) {
        case 'listmultiple':
            return filterValues.map(filterValue => getAttributeOptionTranslation(t, filterValue, filterKey)).join(', ');
        case 'list':
            return getAttributeOptionTranslation(t, filterValues, filterKey)
        case 'text':
        default:
            return filterValues;
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

    if(typeof filterValues === 'boolean') {
       return true;
    }

    return filterValues && typeof filterValues === 'string' && flagForYesNo.includes(filterValue);
}

</script>
<style scoped>
.borderless-datatable * {
  border: none !important;
  box-shadow: none !important;
}

.borderless-datatable :deep(.bg-surface-50),
.borderless-datatable :deep(.bg-surface-0) {
  background-color: transparent !important;
  padding: 0 !important;
}
</style>