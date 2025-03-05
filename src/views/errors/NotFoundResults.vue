<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 rounded-border shadow p-6 text-center w-fit mx-auto">
            <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/illustration/subscribe.svg"
                alt="Image" class="mx-auto block mb-6" />
            <div class="text-surface-900 dark:text-surface-0 font-medium mb-2 text-xl">No products found</div>
            <p class="mt-0 mb-6 p-0 leading-normal">No products found for the selected filters, try to remove some
                filters.</p>
        </div>
    </div>
</template>
<script setup>

</script>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button';

const { t } = useI18n()

const emit = defineEmits(['onClearFilter'])


const clearAll = () => {
    emit('onClearFilter')
}
</script>
