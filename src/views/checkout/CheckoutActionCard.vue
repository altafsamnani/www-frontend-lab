<template>
    <div
        class="bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Security Info -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :class="'bg-green-100 dark:bg-green-900/30'">
                    <i :class="'pi pi-shield text-green-600 dark:text-green-400'"></i>
                </div>
                <div>
                    <p class="font-medium text-surface-900 dark:text-surface-0">
                        Secure Checkout
                    </p>
                    <p class="text-sm text-surface-500 dark:text-surface-400">
                        Your order is protected with SSL encryption
                    </p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3 w-full sm:w-auto">
                <SecondaryButton @click="handleSecondaryAction" class="flex-1 sm:flex-none">
                    <i :class="secondaryButtonIcon" class="mr-2"></i>
                    {{ $t(secondaryButtonTextKey) }}
                </SecondaryButton>

                <Button v-if="showPrimaryButton" :type="primaryButtonType" @click="handlePrimaryAction"
                    :loading="primaryLoading" :disabled="primaryDisabled" class="flex-1 sm:flex-none" size="large">
                    <i v-if="!primaryLoading" :class="primaryButtonIcon" class="mr-2"></i>
                    {{ $t(primaryButtonTextKey) }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/volt/Button.vue'
import SecondaryButton from '@/volt/SecondaryButton.vue'

interface Props {
    // Mode: 'checkout' for CheckoutForm, 'order' for CheckoutSummary
    mode: 'checkout' | 'order'

    // Loading states
    primaryLoading?: boolean

    // Disabled states
    primaryDisabled?: boolean

    // Order-specific props
    orderStatus?: string
    orderHash?: string

    // Button type (submit for forms)
    primaryButtonType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
    primaryLoading: false,
    primaryDisabled: false,
    orderStatus: 'pending',
    orderHash: '',
    primaryButtonType: 'button'
})

const emit = defineEmits<{
    cancel: []
    back: []
    submit: []
    confirm: []
}>()

// Computed properties
const isOrderMode = computed(() => props.mode === 'order')

const showPrimaryButton = computed(() => {
    if (props.mode === 'checkout') return true
    if (props.mode === 'order') return props.orderStatus === 'pending'
    return true
})

const secondaryButtonIcon = computed(() => {
    return props.mode === 'checkout' ? 'pi pi-times' : 'pi pi-arrow-left'
})

const secondaryButtonTextKey = computed(() => {
    if (props.mode === 'checkout') {
        return 'common.cancel'
    }
    // Order mode
    return props.orderHash === 'preview' ? 'checkout.backToCheckout' : 'checkout.backToOrders'
})

const primaryButtonIcon = computed(() => {
    return props.mode === 'checkout' ? 'pi pi-arrow-right' : 'pi pi-check'
})

const primaryButtonTextKey = computed(() => {
    if (props.mode === 'checkout') {
        return props.primaryLoading ? 'checkout.creatingReview' : 'checkout.reviewOrder'
    }
    // Order mode
    if (props.primaryLoading) {
        return 'checkout.placingOrder'
    }
    return props.orderHash === 'preview' ? 'checkout.placeOrder' : 'checkout.confirmOrder'
})

// Event handlers
const handleSecondaryAction = () => {
    if (props.mode === 'checkout') {
        emit('cancel')
    } else {
        emit('back')
    }
}

const handlePrimaryAction = () => {
    if (props.mode === 'checkout') {
        emit('submit')
    } else {
        emit('confirm')
    }
}
</script>