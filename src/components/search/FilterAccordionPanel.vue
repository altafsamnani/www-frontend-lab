<template>
    <template v-if="props.view === 'fieldset'">
        <AccordionPanel v-for="(listStyleAttributes, fieldsetKey, index) in renderedAttributes" :key="index"
            :value="accordionValue(index)">
            <AccordionHeader>
                <slot name="header">
                    <div class="text-lg lg:text-xl font-semibold text-left">{{ t('attributeFieldset.' +
                        fieldsetKey) }}</div>
                </slot>
            </AccordionHeader>
            <AccordionContent>
                <template v-for="(filterStyle, filterStyleKey) in renderTypes" :key="filterStyleKey">
                    <template v-for="(facetAttribute, attributeKey) in listStyleAttributes[filterStyle]"
                        :key="attributeKey">
                        <h3 v-if="facetAttribute.html.filter_style !== 'list' && facetAttribute.html.filter_style !== 'listmultiple'"
                            class="text-lg font-medium text-gray-900 py-2">{{ t('attributes.' +
                                facetAttribute.html.filter_translation_key) }}</h3>
                        <div class="">
                            <slot name="content" :facetAttribute="facetAttribute" :attributeKey="attributeKey">
                                <!-- Default content if no slot is provided -->
                            </slot>
                        </div>
                    </template>
                </template>
            </AccordionContent>
        </AccordionPanel>
    </template>
    <template v-else>
        <AccordionPanel v-for="(facetAttribute, attributeKey, index) in props.facetAttributeAgg" :key="index"
            :value="accordionValue(index)">
            <AccordionHeader>
                <slot name="header">
                    <div class="text-lg lg:text-xl font-semibold text-left">{{ t('attributes.' +
                        facetAttribute.html.filter_translation_key) }}</div>
                </slot>
            </AccordionHeader>
            <AccordionContent>
                <slot name="content" :facetAttribute="facetAttribute" :attributeKey="attributeKey">
                    <!-- Default content if no slot is provided -->
                </slot>
            </AccordionContent>
        </AccordionPanel>
    </template>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import { useI18n } from 'vue-i18n'
import type { FacetAttribute, ListStyleAttributes } from '@/types/FacetAttribute'

const props = defineProps<{
    facetAttributeAgg: Record<string, FacetAttribute>;
    view: string;
}>()
const renderTypes = ref(['list', 'listmultiple', 'toggle', 'grid'])
const renderedAttributes = ref<ListStyleAttributes>({});
const { t } = useI18n()
const accordionValue = (index: number) => {
    index = index + 3
    return index.toString()
}

onMounted(() => {
    facetsAttributes(props.facetAttributeAgg)
    watch(
        () => props.facetAttributeAgg,
        () => facetsAttributes(props.facetAttributeAgg)
    )
})


function facetsAttributes(facetAttributeAgg: Record<string, FacetAttribute>) {
    let fieldsetKey = ''
    let filterStyle = ''
    renderedAttributes.value = {}
    if (facetAttributeAgg && Object.keys(facetAttributeAgg).length) {
        Object.entries(facetAttributeAgg).forEach(([key, facet]) => {
            fieldsetKey = facet.html.fieldset_type + '.' + facet.html.fieldset_translation_key
            filterStyle = facet.html.filter_style
            if (!renderedAttributes.value[fieldsetKey]) {
                renderedAttributes.value[fieldsetKey] = {}
            }
            if (!renderedAttributes.value[fieldsetKey][filterStyle]) {
                renderedAttributes.value[fieldsetKey][filterStyle] = {} 
            }
            renderedAttributes.value[fieldsetKey][filterStyle][key] = facet
            !renderTypes.value.includes(filterStyle) ? renderTypes.value.push(filterStyle) : ''
        })
    }

    return renderedAttributes.value
}
</script>