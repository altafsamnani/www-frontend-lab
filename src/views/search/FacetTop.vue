<template>
    <template v-if="Object.keys(facets).length !== 0 && Object.keys(facets?.static_categories_agg).length !== 0">
        <Carousel :value="getImages(facets?.static_categories_agg?.html?.filter_data)" :numVisible="4" :numScroll="4"
            :responsiveOptions="responsiveOptions" containerClass="flex items-center bg-surface-800 dark:bg-surface-50">
            <template #item="slotProps">
                <div v-if="slotProps.data.filterData.images.length > 0"
                    class="border border-surface-200 dark:border-surface-700 rounded m-3 bg-surface-0 dark:bg-surface-900 cursor-pointer hover:border-primary transition-colors duration-200"
                    @click="clickOnFilterToInsertEs(slotProps.data.name)">
                    <div class="mb-4">
                        <div class="relative mx-auto flex justify-center items-center">
                            <OverlayBadge :value="facets?.static_categories_agg?.items[slotProps.data.name]">
                                <img :src="slotProps.data.filterData.images[0].urlSmall" :alt="slotProps.data.name"
                                    class="rounded object-cover" width="75" height="75" />
                            </OverlayBadge>
                        </div>
                        <div class="mb-1 text-center">{{ t('categories.' +
                            slotProps.data.name) }}
                        </div>
                    </div>

                </div>
            </template>
        </Carousel>
    </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search'
import Carousel from 'primevue/carousel';
import OverlayBadge from 'primevue/overlaybadge';

const searchStore = useSearchStore()
const { facets } = storeToRefs(searchStore)


const props = defineProps<{
    categoryFacets: Object
}>()

const { t } = useI18n()


const emit = defineEmits(['clickOnFilterToInsertEs'])

const clickOnFilterToInsertEs = (categoryName: string) => {
    emit('clickOnFilterToInsertEs', {
        labelValue: t('categories.' + categoryName),
        esValue: categoryName,
        checked: true // Always true for clicking on carousel items
    })
}

const getImages = (filterImages: any) => {
    const items = facets.value?.static_categories_agg?.items;
    if (!items || !filterImages) return [];

    // Convert to array, filter available categories, and sort in one pass
    return Object.entries(filterImages)
        .filter(([name]) => items[name] !== undefined)
        .map(([name, filterData]) => ({ name, filterData }))
        .sort((a, b) => (items[b.name] || 0) - (items[a.name] || 0));
};


const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);
</script>