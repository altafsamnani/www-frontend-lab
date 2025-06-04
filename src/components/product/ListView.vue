<template>
    <div v-for="(item, index) in props.items" :key="index">
        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
            <div class="md:w-40 relative">
                <img class="block xl:block mx-auto rounded w-full"
                    :src="item.images.length ? item.images[0].url : defaultUrl" :alt="item.name" />
                <div class="absolute rounded-border" style="left: 4px; top: 4px">
                    <Tag class="text-xs" :value="t('config.stock_status.' + item.stock.stock_slug)"
                        :severity="getSeverity(item.stock.level)"></Tag>
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                    <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category.slug
                            }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                            <span class="text-surface-900 font-medium text-sm">{{ item.rating ?? 4 }}</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                    <span class="text-xl font-semibold">${{ item.price }}</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" outlined></Button>
                        <Button icon="pi pi-shopping-cart" label="Order Now" :disabled="item.stock.level > 4"
                            class="flex-auto md:flex-initial whitespace-nowrap" @change="clickShopNow"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getSeverity } from '@/includes/helpers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{
    items: []
    selectedShopNow?: any
}>()
const defaultUrl = import.meta.env.VITE_DEFAULT_IMAGE
const selectedShopNow = ref(props.selectedShopNow)
const emit = defineEmits(['clickShopNow'])

function clickShopNow() {
    emit('clickShopNow', selectedShopNow.value)
}
</script>