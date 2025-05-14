<template>
    <template v-if="Object.keys(facets).length !== 0 && Object.keys(facets?.static_categories_agg).length !== 0">
        <Carousel :value="getImages(facets?.static_categories_agg?.html?.filter_data)" :numVisible="5" :numScroll="3"
            :responsiveOptions="responsiveOptions" containerClass="flex items-center bg-surface-800 dark:bg-surface-50">
            <template #item="slotProps">
                <div v-if="slotProps.data.filterData.images.length > 0"
                    class="border border-surface-200 dark:border-surface-700 rounded m-3 px-4 bg-surface-0 dark:bg-surface-900">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <OverlayBadge value="2">
                                <img :src="slotProps.data.filterData.images[0].urlSmall" :alt="slotProps.data.name"
                                    class="rounded" width="70" height="70" />
                            </OverlayBadge>
                        </div>
                    </div>
                    <div class="mb-1 font-medium text-center">{{ t('categories.' + slotProps.data.name) }}</div>
                </div>
            </template>
        </Carousel>
    </template>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search'
import Carousel from 'primevue/carousel';
import OverlayBadge from 'primevue/overlaybadge';

const searchStore = useSearchStore()
const { facets } = storeToRefs(searchStore)

import type Query from '@/types/Query';


const props = defineProps<{
    query: Query
    categoryFacets: Object
}>()

const { t } = useI18n()
const query = ref(props.query)

//const emit = defineEmits(['clickOnFacetTop'])

const getImages = (filterImages) => (Object.entries(filterImages).map(([name, filterData]) => ({ name, filterData })));

const clickOnFacetTop = async (event) => {
    query.value.page = {
        size: event.rows,
        number: event.page + 1
    }

    //emit('clickOnFacetTop', query.value)
}

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