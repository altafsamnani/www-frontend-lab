<template>
    <div class="overflow-hidden border border-surface rounded-lg divide-y divide-surface-200 dark:divide-surface-700">
        <template v-for="(data, i) of sizes" :key="i">
            <div class="flex divide-x divide-surface-200 dark:divide-surface-700">
                <template v-for="(_, j) of Array(5).fill(null)" :key="j">
                    <Button :disabled="data[j] ? data[j]?.disabled : true"
                        class="disabled:text-surface-400 dark:disabled:text-surface-400 disabled:opacity-75 disabled:pointer-events-none flex-1 text-surface-900 dark:text-surface-0 font-medium py-2 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                        :class="selectedSize === data[j]?.size ? 'bg-surface-100 dark:bg-surface-800' : ''"
                        @click="selectedSize = data[j]?.size">
                        {{ data[j]?.size }}
                    </Button>
                </template>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button';

const props = defineProps<{
    esKey: string
    facetItems: Array<{ size: string; disabled?: boolean }[]>,
    selectedFilterKey?: any
    facetSearch?: String
    canSearch?: Boolean
}>()
const { t } = useI18n()
const sizes = ref(props.facetItems);
const selectedSize = ref(props.selectedFilterKey);

</script>