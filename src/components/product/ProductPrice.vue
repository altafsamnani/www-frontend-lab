<template>
    <div class="product-price-container">
        <!-- Has discount -->
        <template v-if="discount?.hasDiscount">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <span :class="netPriceClass">
                        {{ formatCurrency(discount.netPrice) }}
                    </span>
                    <Tag :value="formatDiscountPercentage(discount.discountPercentage)" severity="success" />
                </div>
                <div class="flex items-center gap-2">
                    <span :class="originalPriceClass">
                        {{ formatCurrency(discount.originalPrice) }}
                    </span>
                    <span :class="savingsClass">
                        {{ t('discount.save') }} {{ formatCurrency(discount.discountAmount) }}
                    </span>
                </div>
            </div>
        </template>
        <!-- No discount -->
        <template v-else>
            <span :class="regularPriceClass">{{ formatCurrency(price) }}</span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ProductDiscount } from '@/types/Discount'

const { t } = useI18n()

const props = withDefaults(defineProps<{
    price: number | null | undefined
    discount: ProductDiscount | null | undefined
    size?: 'small' | 'medium' | 'large'
}>(), {
    size: 'medium'
})

// Size-based classes
const netPriceClass = computed(() => {
    const baseClasses = 'font-bold text-primary'
    switch (props.size) {
        case 'small': return `${baseClasses} text-lg`
        case 'large': return `${baseClasses} text-3xl`
        default: return `${baseClasses} text-2xl`
    }
})

const originalPriceClass = computed(() => {
    const baseClasses = 'text-surface-500 line-through'
    switch (props.size) {
        case 'small': return `${baseClasses} text-sm`
        case 'large': return `${baseClasses} text-lg`
        default: return `${baseClasses} text-base`
    }
})

const savingsClass = computed(() => {
    const baseClasses = 'text-green-600 dark:text-green-400'
    switch (props.size) {
        case 'small': return `${baseClasses} text-xs`
        case 'large': return `${baseClasses} text-base`
        default: return `${baseClasses} text-sm`
    }
})

const regularPriceClass = computed(() => {
    const baseClasses = 'font-semibold'
    switch (props.size) {
        case 'small': return `${baseClasses} text-lg`
        case 'large': return `${baseClasses} text-3xl`
        default: return `${baseClasses} text-2xl`
    }
})

function formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-'
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
    }).format(value)
}

function formatDiscountPercentage(percentage: number): string {
    return `-${percentage}%`
}
</script>

<style scoped>
.product-price-container {
    min-height: 3rem;
}
</style>
