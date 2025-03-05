<template>
    <div class="flex flex-col gap-4">
        <IconField v-if="canSearch" icon-position="left">
            <InputIcon class="pi pi-search" />
            <InputText v-model="localFacetSearch" placeholder="Search" class="w-full"
                @input="$emit('update:facetSearch', $event.target.value)" />
        </IconField>
        <div v-for="(facetItemCount, esValue) in facetItems" :key="esValue" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div :checked="checkedValueExists(esKey, esValue)"
                    class="group relative inline-flex align-bottom w-6 h-6 cursor-pointer select-none"
                    data-pc-name="checkbox" pc217="" data-pc-section="root"
                    :data-p-checked="checkedValueExists(esKey, esValue)" data-p-disabled="false">
                    <input :id="esValue.toString()" @change="clickOnFilter"
                        :aria-describedby="getAttributeOptionTranslation(esValue) + checkedValueExists(esKey, esValue)"
                        :value="esValue" :name="esKey" type="checkbox" :checked="checkedValueExists(esKey, esValue)"
                        class="peer w-full h-full absolute top-0 left-0 z-10 p-0 m-0 opacity-0 rounded-md outline-none border-2 border-surface-200 dark:border-surface-700 appearance-none cursor-pointer"
                        data-pc-section="input">
                    <div :class="!checkedValueExists(esKey, esValue) ? 'border-2' : 'bg-primary'"
                        class="flex items-center justify-center w-6 h-6 rounded-md group-has-[:checked]:bg-primary border-surface-200  dark:border-surface-700 dark:bg-surface-900 peer-hover:border-primary-emphasis peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20 [&amp;>svg]:text-primary-contrast [&amp;>svg]:w-[0.875rem] [&amp;>svg]:h-[0.875rem] transition-colors duration-200"
                        data-pc-section="box">
                        <svg v-if="checkedValueExists(esKey, esValue)" width="14" height="14" viewBox="0 0 14 14"
                            fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            class="text-base leading-none w-4 h-4 text-white dark:text-surface-900 transition-all duration-200"
                            data-pc-section="icon">
                            <path
                                d="M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                </div>

                <label :for="esValue" class="flex-1 text-surface-900 dark:text-surface-0">
                    {{ getAttributeOptionTranslation(esValue) + checkedValueExists(esKey, esValue) }}</label>
            </div>

            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs 
            font-bold bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-surface-0">
                {{ facetItemCount }}
            </div>
        </div>

        <a href="#" class="hidden flex items-center justify-between gap-4 text-primary-500 dark:text-primary-400">
            <span class="flex-1 font-medium">Show All</span>
            <span class=""><i class="pi pi-arrow-right text-sm" /></span>
        </a>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Checkbox from 'primevue/checkbox';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { capitalizeFirstWord } from '@/includes/helpers'

const props = defineProps<{
    esKey: string
    facetItems: { [key: string]: string | number }
    facetItemsKey?: string
    facetSearch?: String
    canSearch?: Boolean
    checkedEsValues: Object
}>()
const { t } = useI18n()
const esKey = ref(props.esKey)
const localFacetSearch = ref(props.facetSearch)
const facetItemsKey = ref(props.facetItemsKey)
const checkedEsValues = ref(props.checkedEsValues);
const emit = defineEmits(['clickOnFilter', 'setHeader'])

function clickOnFilter(event) {
    console.log('event', event.target.name, event.target.value, event.target.checked);
    emit('clickOnFilter', {
        labelValue: getAttributeOptionTranslation(event.target.value),
        esValue: event.target.value,
        checked: event.target.checked
    })

    //emit('setCheckedEsValuesForFilter', event.target.name, event.target.value, event.target.checked)
    if (event.target.name === 'categoriesAll.slug') {
        emit('setHeader', event.target.value)
    } else if (event.target.name === 'brand.slug') {
        //emit('setHeader', event.target.value)
    }

    /* event.target.checked = !event.target.checked */
}

const checkedValueExists = (esKey: string, esValue: string | number) => (props.checkedEsValues.findIndex((value) => value == esValue) !== -1)


const setSelectedFilterKey = (esKey: string, clickedEsValue: string, filterOp: string = 'create') => {
    if (filterOp === 'create') {
        if (!Array.isArray(checkedEsValues.value)) {
            checkedEsValues.value = [];
        }
        checkedEsValues.value.push(clickedEsValue)
    } else {
        const index = checkedEsValues.value.findIndex((value) => value === clickedEsValue)
        if (index !== -1) {
            checkedEsValues.value.splice(index, 1)
        }
    }

    console.log('checkedEsValues', checkedEsValues.value);
}

const getAttributeOptionTranslation = (facetItemLabelKey: number | string) => {
    if (!isNaN(Number(facetItemLabelKey))) {
        return facetItemLabelKey.toString()
    }

    return facetItemsKey.value ? t(facetItemsKey.value + '.' + facetItemLabelKey) : capitalizeFirstWord(facetItemLabelKey.toString())
}

</script>