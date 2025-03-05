<template>
    <div>
        <div class="flex items-end gap-1.5 md:gap-1 mb-6">
            <div v-for="(_, index) in filterChartBars" :key="index" class="flex-1 rounded-sm"
                :class="[isInFilterRange(index) ? 'bg-primary-800 dark:bg-primary-100' : 'bg-surface-200 dark:bg-surface-700']"
                :style="{ height: `${0.75 + index * 0.05}rem` }" @click="updateFilterRange(index, props.esKey)" />
        </div>
        <Slider v-model="filterValue" range class="w-full" :min="minFilter" :max="maxFilter" @slideend="clickOnRange" />
        <div class="input-range mt-6 flex items-center gap-4">
            <InputNumber size="small" v-model="filterValue[0]" :min="0" inputId="currency-netherlands" mode="currency"
                :minFractionDigits="2" :currency="currency" :locale="locale" @blur="clickOnRange" />
            <InputNumber size="small" v-model="filterValue[1]" :min="filterValue[0]" inputId="currency-netherlands"
                :minFractionDigits="2" mode="currency" :currency="currency" :locale="locale" @blur="clickOnRange" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Slider } from 'primevue';
import InputNumber from 'primevue/inputnumber';



const props = defineProps<{
    esKey: string
    facetItem: { min: number, max: number }
    checkedEsValues: Object
    // selectedMin?: number
    //  selectedMax?: number
}>()
const { t } = useI18n()
const filterChartBars = ref(30);
const filterValue = ref(props.checkedEsValues);
const maxFilter = ref(props.facetItem.max); //+ (25 * props.facetItem.max / 100)
const minFilter = ref(props.facetItem.min); // - (10 * props.facetItem.min / 100)
//const checkedEsValues = ref(props.checkedEsValues);
const locale = ref('nl-NL');
const currency = ref('EUR');

const emit = defineEmits(['clickOnRange'])

const filterRange = computed(() => {
    const range = maxFilter.value - minFilter.value;
    return [Math.round((filterValue.value[0] / range) * filterChartBars.value), Math.round((filterValue.value[1] / range) * filterChartBars.value)];
});

const isInFilterRange = (index) => {
    const [start, end] = filterRange.value;
    return index >= start && index <= end;
}

const updateFilterRange = (index: number, esKey: string) => {
    const range = maxFilter.value - minFilter.value;
    const value = Math.round((range * index) / filterChartBars.value) + minFilter.value;

    if (index === 0) {
        filterValue.value[0] = minFilter.value;
    } else if (index === filterChartBars.value - 1) {
        filterValue.value[1] = maxFilter.value;
    } else if (index < (filterRange.value[0] + filterRange.value[1]) / 2) {
        filterValue.value[0] = value;
    } else {
        filterValue.value[1] = value;
    }

    clickOnRange(esKey)
};


function clickOnRange() {
    // emit('clickOnRange', { labelValue: event.value, filterValue: filterValue.value})
    emit('clickOnRange', {
        labelValue: [
            formatter.format(filterValue.value[0]),
            formatter.format(filterValue.value[1])
        ],
        esValue: filterValue.value
    })
}


const formatter = new Intl.NumberFormat(locale.value, {
    style: "currency",
    currency: currency.value,
})


</script>