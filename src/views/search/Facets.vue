<template>
    <div class="flex items-center justify-between gap-2 py-2">
        <div class="text-xl text-surface-900 dark:text-surface-0 font-semibold">{{ t('search.filter') }}</div>
        <Button :label="t('search.clear_all')" severity="secondary" text class="!py-1 !px-1.5 !text-sm !font-normal"
            @click="clearAll" />
    </div>
    <div v-if="tags.length" class="border-y flex items-center flex-wrap gap-2 py-4 border-t border-surface">
        <template v-for="(item, index) of tags" :key="index">
            <!-- If use dynamic tags then dont use removable as it conflicts and removes 2 times values -->
            <Chip :label="t(item.labelKey) + ': ' + t(item.labelValue)" :es-key="item.key" :es-value="item.value"
                :type="item.type" class="!py-1 !rounded-lg cursor-pointer" @click="clickOnClearTags(item)"
                icon="pi pi-times leading-tight !text-muted-color" />
        </template>
    </div>
    <LoaderFacets :count="3" v-if="Object.keys(facets).length === 0" />
    <Accordion class="mt-4" v-else @update:active-index="onUpdateActiveIndex" :multiple="true" :value="activeIndexes">
        <AccordionPanel value="0"
            v-if="Object.keys(facets?.static_categories_agg).length !== 0 && Object.keys(facets?.static_categories_agg?.items).length !== 0">
            <AccordionHeader>
                <div class="text-lg lg:text-xl font-semibold text-left">{{ t('general.categories') }}</div>
            </AccordionHeader>
            <AccordionContent>
                <FilterList :facet-items="facets?.static_categories_agg?.items" :es-key="staticEsKeys.categories"
                    :facet-items-key="'categories'" :facet-search="Google" :can-search=false
                    :checked-es-values="getSelectedKey(staticEsKeys.categories)"
                    @clickOnFilterToInsertEs="clickOnFilterToInsertEs($event, staticEsKeys.categories, 'general.categories', facets?.static_categories_agg?.html?.filter_data)" />
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1"
            v-if="Object.keys(facets?.static_brands_agg).length !== 0 && Object.keys(facets?.static_brands_agg?.items).length !== 0">
            <AccordionHeader>
                <div class="text-lg lg:text-xl font-semibold text-left">{{ t('general.brands') }}</div>
            </AccordionHeader>
            <AccordionContent>
                <FilterList :facet-items="facets?.static_brands_agg?.items" :es-key="staticEsKeys.brand"
                    :can-search=false :facet-search="Google" :checked-es-values="getSelectedKey(staticEsKeys.brand)"
                    @clickOnFilterToInsertEs="clickOnFilterToInsertEs($event, staticEsKeys.brand, 'general.brands', facets?.static_brands_agg?.html?.filter_data)" />
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2" v-if="facets?.static_price_agg?.items">
            <AccordionHeader>
                <div class="text-lg lg:text-xl font-semibold text-left">{{ t('general.price') }}</div>
            </AccordionHeader>
            <AccordionContent>
                <FilterRange :query="props.query" :facet-item="facets?.static_price_agg?.items"
                    :es-key="staticEsKeys.price"
                    :checked-es-values="getSelectedRangeKey(staticEsKeys.price, facets?.static_price_agg?.items)"
                    @clickOnRange="clickOnRange($event, staticEsKeys.price, 'general.price')" />
            </AccordionContent>
        </AccordionPanel>
        <template v-if="facets?.attributes_agg && Object.keys(facets.attributes_agg).length">
            <FilterAccordionPanel :facetAttributeAgg="facets?.attributes_agg" view="fieldset">
                <template #header></template>
                <template #content="{ facetAttribute, attributeKey }">
                    <FilterMultiSelect v-if="facetAttribute.html.filter_style === 'list'"
                        :es-key="getEsKey(attributeKey)" :facet-items-key="facetAttribute.html.filter_translation_key"
                        :facet-items="facetAttribute?.items" :can-search=false
                        :checked-es-values="getSelectedKey(getEsKey(attributeKey))" @clickOnFilterToUpdateEs="clickOnFilterToUpdateEs($event, getEsKey(attributeKey),
                            facetAttribute.html.filter_translation_key)" />
                    <FilterMultiSelect v-if="facetAttribute.html.filter_style === 'listmultiple'"
                        :es-key="getEsKey(attributeKey)" :facet-items-key="facetAttribute.html.filter_translation_key"
                        :facet-items="facetAttribute?.items" :can-search=false
                        :checked-es-values="getSelectedKey(getEsKey(attributeKey))" @clickOnFilterToUpdateEs="clickOnFilterToUpdateEs($event, getEsKey(attributeKey),
                            facetAttribute.html.filter_translation_key)" />
                    <FilterListGrid v-if="facetAttribute.html.filter_style === 'grid'" :es-key="getEsKey(attributeKey)"
                        :facet-items-key="'attributeOptions.' + facetAttribute.html.filter_translation_key"
                        :facet-items="facetAttribute?.items" :checked-es-values="getSelectedKey(getEsKey(attributeKey))"
                        @clickOnFilterToInsertEs="clickOnFilterToInsertEs($event, getEsKey(attributeKey), 'attributes.' +
                            facetAttribute.html.filter_translation_key)" />
                    <SelectButton v-if="facetAttribute.html.filter_style === 'toggle'"
                        :checked="getSelectedKey(getEsKey(attributeKey))"
                        :name="'attributeOptions.' + facetAttribute.html.filter_translation_key"
                        :es-key="getEsKey(attributeKey)" :options="radioFilterLabel(facetAttribute, attributeKey)"
                        optionLabel="name" multiple aria-labelledby="multiple" optionDisabled="disabled"
                        optionValue="value" @change="clickOnToggle($event, facetAttribute, attributeKey)" />
                    <FilterRange v-if="facetAttribute.html.filter_style === 'range'" :es-key="getEsKey(attributeKey)"
                        :checked-es-values="getSelectedRangeKey(getEsKey(attributeKey), facetAttribute?.items)"
                        :facet-item="facetAttribute?.items" @clickOnRange="clickOnRange($event, getEsKey(attributeKey), 'attributes.' +
                            facetAttribute.html.filter_translation_key)" />
                </template>
            </FilterAccordionPanel>
        </template>
    </Accordion>
    <Button label="Apply" class="w-full mt-10" />
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search'

import Accordion from 'primevue/accordion'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import FilterList from '@/components/search/FilterList.vue'
import FilterRange from '@/components/search/FilterRange.vue'
import SelectButton from 'primevue/selectbutton'
import FilterListGrid from '@/components/search/FilterListGrid.vue'
import FilterAccordionPanel from '@/components/search/FilterAccordionPanel.vue'
import LoaderFacets from '@/components/icons/LoaderFacets.vue'
import { capitalizeFirstWord, getAttributeOptionTranslation } from '@/includes/helpers'

import type Facet from '@/types/Facet'
import type Query from '@/types/Query'
import type Tags from '@/types/Tags'
import FilterMultiSelect from '@/components/search/FilterMultiSelect.vue'


const props = defineProps<{
    query: Query
    staticEsKeys: Object
    view: string
}>()
const emit = defineEmits(['applySearch', 'setHeader'])
const query = ref(props.query)
const Google = ref('')
const searchStore = useSearchStore()
const { facets } = storeToRefs(searchStore)

const { t } = useI18n()
const route = useRoute()
const activeIndexes = ref(['0', '1', '2', '3', '4'])
const checkedEsValuesCollection = ref({})
const tagsToggle = ref<Tags[]>([])
const tags = ref<Tags[]>([])
const routeCategorySlug = ref(route.params.categorySlug)
const routeBrandSlug = ref(route.params.brandSlug)
const staticEsKeys = ref(props.staticEsKeys)
const getEsKey = (attributeKey: string) => 'attributes.' + attributeKey

onMounted(async () => {
    let esKey
    let esValue

    if (routeCategorySlug.value !== '' && routeCategorySlug.value !== undefined) {
        esKey = staticEsKeys.value.categories
        esValue = routeCategorySlug.value
        setFilter(esKey, 'equals', esValue, 'general.categories', t('categories.' + routeCategorySlug.value))
    }

    if (routeBrandSlug.value !== '' && routeBrandSlug.value !== undefined) {
        esKey = staticEsKeys.value.brand
        esValue = routeBrandSlug.value
        setFilter(esKey, 'equals', esValue, 'general.brands', capitalizeFirstWord(routeBrandSlug.value.toString()))

    }

    emit('applySearch', query.value)


    watch(
        () => facets.value,
        () => setHeader(true, esKey, esValue, routeCategorySlug.value !== '' ? facets?.value.static_categories_agg?.html?.filter_data : routeBrandSlug.value !== '' ? facets?.value.static_brands_agg?.html?.filter_data : ''),
        { once: true }
    )
})

const setFilter = (esKey: string, filterOp: string, esValue: any, labelKey: string, labelValue: string) => {
    let tag = {
        labelKey: labelKey,
        labelValue: labelValue,
        key: esKey,
        value: esValue,
        type: 'filter'
    }

    resetTags(tag, 'create')

    crudQuery(esKey, esValue, 'create')

    setCheckedEsValuesForFilter(esKey, esValue, true)
}

function clickOnFilterToInsertEs(event, esKey: string, headerLabel: string, filterHtmlData?: any) {
    let tag = {
        labelKey: headerLabel,
        labelValue: event.labelValue,
        key: esKey,
        value: event.esValue,
        type: 'filter'
    }

    resetTags(tag, event.checked ? 'create' : 'remove')

    crudQuery(esKey, event.esValue, event.checked ? 'create' : 'remove')

    setCheckedEsValuesForFilter(esKey, event.esValue, event.checked)

    setHeader(event.checked, esKey, event.esValue, filterHtmlData)

    emit('applySearch', query.value)
}

function clickOnFilterToUpdateEs(event, esKey: string, facetItemsKey: string) {
    console.log('event', event);
    let constTag = {
        key: esKey,
        labelKey: 'attributes.' + facetItemsKey,
        type: 'filter'
    }

    resetTags(constTag, 'clear')
    crudQuery(esKey, '', 'clear')
    checkedEsValuesCollection.value[esKey] = [];

    //console.log('tags', tags.value);
    //console.log('query.value.filter', query.value.filter);
    event.map((esValue: string) => {
        let tag = { ...constTag, labelValue: getAttributeOptionTranslation(t, esValue, facetItemsKey), value: esValue }
        //console.log('loop tag', tag);
        //console.log('loop esvalue', esValue);
        resetTags(tag, 'create')
        crudQuery(esKey, esValue, 'create')
        setCheckedEsValuesForFilter(esKey, esValue, true)
    })

    emit('applySearch', query.value)
}

function getSelectedKey(attributeKey: string) {
    return checkedEsValuesCollection.value[attributeKey] ?? [];
}

function getSelectedRangeKey(attributeKey: string, facetItem: { min: number, max: number }) {
    return checkedEsValuesCollection.value[attributeKey] !== undefined ? checkedEsValuesCollection.value[attributeKey] : [facetItem.min, facetItem.max];
}

function clickOnToggle(event, facet: Facet, attributeKey: string) {
    let facetOptions: Tags[] = radioFilterLabel(facet, attributeKey)
    let esKey = 'attributes.' + attributeKey
    tagsToggle.value = []
    let tagYes: Tags = facetOptions[0]
    let tagNo: Tags = facetOptions[1]

    if (event.value.length) {
        resetTags(tagYes, event.value.includes('true') ? 'create' : 'remove')
        resetTags(tagNo, event.value.includes('false') ? 'create' : 'remove')

        event.value.includes('true') ? crudQuery(esKey, 'true', 'create') : ''
        event.value.includes('false') ? crudQuery(esKey, 'false', 'create') : ''
        //resetQuery(esKey, event.value, 'update', 'in')
    } else {
        resetTags(tagYes, 'remove')
        resetTags(tagNo, 'remove')

        crudQuery(esKey, event.value, 'clear')
    }

    checkedEsValuesCollection.value[esKey] = event.value

    emit('applySearch', query.value)
}

function clickOnRange(event: { labelValue: string[], esValue: number[] }, esKey: string, headerLabel: string) {

    let tag = {
        labelKey: headerLabel,
        labelValue: t('search.rangeTag', { min: event.labelValue[0], max: event.labelValue[1] }),
        key: esKey,
        value: event.esValue,
        type: 'range'
    }
    resetTags(tag, 'update')

    crudQuery(esKey, event.esValue, 'range')

    checkedEsValuesCollection.value[esKey] = event.esValue

    emit('applySearch', query.value)
}

function clickOnClearTags(tags: Tags) {
    resetTags(tags, 'remove')

    if (tags.type === 'range') {
        checkedEsValuesCollection.value[tags.key] = null

        crudQuery(tags.key, tags.value, 'clear')

    } else {
        setCheckedEsValuesForFilter(tags.key, tags.value, false)

        crudQuery(tags.key, tags.value, 'remove')
    }
    setHeader(false)

    emit('applySearch', query.value)
}

function setCheckedEsValuesForFilter(esKey: string, esValue: any, checked: boolean) {
    if (!Array.isArray(checkedEsValuesCollection.value[esKey])) {
        checkedEsValuesCollection.value[esKey] = [];
    }
    checked ? checkedEsValuesCollection.value[esKey].push(esValue) : checkedEsValuesCollection.value[esKey].splice(checkedEsValuesCollection.value[esKey].indexOf(esValue), 1)

}

function setHeader(checked: boolean, esKey?: string, clickedEsValue?: string, filterHtmlData?: any) {
    let title = ''
    let description = ''
    if (checked) {
        switch (esKey) {
            case staticEsKeys.value.categories:
                title = 'categories.' + clickedEsValue
                description = 'categories_description.' + clickedEsValue

                break;
            case staticEsKeys.value.brand:
                title = capitalizeFirstWord(clickedEsValue)

                break;
        }
    }

    emit('setHeader', title, description)
}

function crudQuery(esKey: string, esValue?: any, esCrud: string = 'update', filterOp: string = 'equals') {
    // Find the index of the object with the matching `key`
    query.value.page!.number = 1
    let index, indexLessThan, indexGreaterThan;
    switch (esCrud) {
        case 'create':
            //For create always new object
            query.value.filter?.push({ key: esKey, op: filterOp, value: esValue })
            break;
        case 'update':
            //For update exactly if key exist then push else create new object
            index = query.value.filter?.findIndex(queryFilter => queryFilter.key === esKey)
            if (query.value.filter && index !== undefined && index !== -1) {
                query.value.filter[index].value = esValue
            } else {
                query.value.filter?.push({ key: esKey, op: filterOp, value: esValue })
            }
            break;
        case 'remove':
            //For removal exactly key and value needs to be matched
            console.log('query.value.filter', query.value.filter);
            console.log('esKey', esKey);
            console.log('esValue', esValue);
            index = query.value.filter?.findIndex(queryFilter => queryFilter.key === esKey && queryFilter.value === esValue)
            if (query.value.filter && index !== undefined && index !== -1) {
                query.value.filter?.splice(index, 1)
            }
            break;
        case 'range':
            //For updating the key for range for min/max value
            indexGreaterThan = query.value.filter?.findIndex(queryFilter => queryFilter.key === esKey && queryFilter.op === 'greaterThan')
            if (query.value.filter && indexGreaterThan !== undefined && indexGreaterThan !== -1) {
                query.value.filter[indexGreaterThan].value = esValue[0]
            } else {
                query.value.filter?.push({ key: esKey, op: 'greaterThan', value: esValue[0] })
            }

            indexLessThan = query.value.filter?.findIndex(queryFilter => queryFilter.key === esKey && queryFilter.op === 'lessThan')
            if (query.value.filter && indexLessThan !== undefined && indexLessThan !== -1) {
                query.value.filter[indexLessThan].value = esValue[1]
            } else {
                query.value.filter?.push({ key: esKey, op: 'lessThan', value: esValue[1] })
            }


            break;
        case 'clear':
            // For removal of all matching keys
            query.value.filter = query.value.filter?.filter(queryFilter => queryFilter.key !== esKey) || [];
            break;
    }
}

const resetTags = (tagItem: any, tagCrud: string = 'create') => {
    let index;
    switch (tagCrud) {
        case 'create':
            tags.value.push(tagItem)
            break;
        case 'update':
            index = tags.value.findIndex((tag) => tag.key === tagItem.key)
            if (index !== -1) {
                tags.value[index] = tagItem
            } else {
                tags.value.push(tagItem)
            }
            break;
        case 'remove':
            index = tagItem.type === 'range' ? tags.value.findIndex((tag) => tag.key === tagItem.key) : tags.value.findIndex((tag) => tag.key === tagItem.key && tag.value === tagItem.value)
            if (index !== -1) {
                tags.value.splice(index, 1)
            }
            break;
        case 'clear':
            tags.value = tags.value.filter((tag) => tag.key !== tagItem.key)
            break;
        default:
            break;
    }
}

const clearAll = () => {
    query.value = {
        filter: [],
        order: [],
        page: {
            size: 12,
            number: 1
        }
    }
    tags.value = []
    checkedEsValuesCollection.value = {}

    console.log('SearchReset: clearAll');
    emit('applySearch', query.value)

}

const onUpdateActiveIndex = (newActiveIndexes) => {
    const stringArray = newActiveIndexes.map((num) => num.toString())
    activeIndexes.value = stringArray
}


const radioFilterLabel = (facet: Facet, attributeKey: string): Tags[] => {
    let labelKey = t('attributes.' + facet.html?.filter_translation_key)
    return [
        {
            labelKey: labelKey,
            labelValue: 'forms.yes',
            key: 'attributes.' + attributeKey,
            value: 'true',
            name: t('forms.yes') + '(' + (facet.items?.true ?? 0) + ')',
            disabled: facet.items?.true ? false : true,
            type: 'toggle'
        },
        {
            labelKey: labelKey,
            labelValue: 'forms.no',
            key: 'attributes.' + attributeKey,
            value: 'false',
            name: t('forms.no') + '(' + (facet.items?.false ?? 0) + ')',
            disabled: facet.items?.false ? false : true,
            type: 'toggle'
        }
    ]
}

// Expose functions to parent components
defineExpose({
    clickOnFilterToInsertEs
})
</script>