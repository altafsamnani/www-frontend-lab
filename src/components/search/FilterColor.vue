<template>
    <div class="flex items-center flex-wrap gap-4 lg:gap-6 justify-between">
        <template v-for="(item, index) of colors" :key="index">
            <button :style="{ borderColor: selectedColor === item ? item : '' }"
                class="transition-all h-9 w-9 p-2 rounded-full flex items-center justify-center border border-surface hover:bg-surface-100 dark:hover:bg-surface-800"
                @click="selectedColor = item">
                <span class="h-full w-full rounded-full" :style="{ background: item }" />
            </button>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
    facetItems: Array<string>,
    selectedFilterKey?: any
}>()


const colors = ref(props.facetItems);
const selectedColor = ref(props.selectedFilterKey);

</script>