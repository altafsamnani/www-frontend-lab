<template>
    <div class="flex flex-col gap-4">
        <Galleria :value="getGrids" :responsive-options="responsiveOptions" container-class="h-full !border-0"
            :num-visible="1" :show-thumbnails="false" :show-indicators="true">
            <template #item="slotProps">
                <div class="flex flex-wrap w-full h-auto overflow-hidden gap-3">
                    <div v-for="grid of slotProps.item.page" :key="grid"
                        class="h-8 flex justify-center items-center text-sm cursor-pointer !rounded-lg ounded-[16px]"
                        :class="{
                            'bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-surface-0 ': !checkedValueExists(esKey, grid.value),
                            'bg-highlight text-highlight-contrast': checkedValueExists(esKey, grid.value)
                        }" @click="clickOnFilterToInsertEs(grid.value)">
                        {{ grid.value }}
                        <div class="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-xs 
                        font-bold bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-surface-0">
                            {{ grid.count }}
                        </div>
                    </div>
                </div>
            </template>
        </Galleria>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Galleria from 'primevue/galleria';


const props = defineProps<{
    esKey: string
    facetItems: { [key: string]: string | number },
    facetItemsKey?: string,
    facetSearch?: String
    canSearch?: Boolean
    checkedEsValues: Object
}>()
const { t } = useI18n()
const esKey = ref(props.esKey)
const facetItemsKey = ref(props.facetItemsKey)
const checkedEsValues = ref(props.checkedEsValues)
const pagegrid = 15;
const getGrids = computed(() => {
    let gridList: { page: { value: any }[] }[] = []
    let gridPage: { name: string, value: any, count: any }[] = [];
    let counter = 1

    Object.keys(props.facetItems).forEach((key) => {
        gridPage.push({
            name: esKey.value,
            value: key,
            count: props.facetItems[key]
        });

        if (counter % pagegrid == 0 || counter == Object.keys(props.facetItems).length) {
            gridList.push({
                page: gridPage
            });
            counter = 1
            gridPage = [];
        }
        counter++;
    });

    return gridList;
})


const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

const emit = defineEmits(['clickOnFilterToInsertEs'])


function clickOnFilterToInsertEs(esValue: string, checked: boolean) {
    emit('clickOnFilterToInsertEs', {
        labelValue: getAttributeOptionTranslation(esValue),
        esValue: esValue,
        checked: !checkedValueExists(esKey.value, esValue)
    })
}

const checkedValueExists = (esKey: string, esValue: string) => (props.checkedEsValues?.findIndex((value) => value == esValue) !== -1)


const getAttributeOptionTranslation = (facetItemLabelKey: number | string) => {
    if (!isNaN(Number(facetItemLabelKey))) {
        return facetItemLabelKey.toString()
    }

    return facetItemsKey.value ? t(facetItemsKey.value + '.' + facetItemLabelKey) : capitalizeFirstWord(facetItemLabelKey.toString())
}

const capitalizeFirstWord = (str: string) => {
    if (!str) return '';
    return str
        .split(' ')
        .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
        .join(' ');
}

</script>