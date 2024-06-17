<template>
        <div
            class="relative w-full transition-shadow rounded-md shadow-md sm:w-56 place-content-between lg:max-w-64 list-group-item hover:shadow-lg hover:shadow-surface-900/5 dark:bg-white/10 dark:hover:shadow-white/10">
            <figure>
                <Image :src="props.image.url" alt="Image" preview class="min-h-48" />
            </figure>

            <div class="bottom-0 flex justify-between w-full p-2">
                <Button icon="pi pi-arrows-h" text rounded severity="secondary" class="cursor-move handle" />
                <Button @click="showdeleteImageConfirmation(props.image.id)" icon="pi pi-trash" severity="danger" text
                    rounded class="w-12 h-12" aria-label="Delete" />
            </div>
        </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Image from 'primevue/image'
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
    imageCollectionId?: number
    image: { id: number, url: string }
}>()

const confirm = useConfirm()
const { t } = useI18n()
const imageId = ref()
const confirmed = ref(false)
const showdeleteImageConfirmation = (id) => {
    imageId.value = id
    confirmDeleteImage()
}

const confirmDeleteImage = () => {
    confirm.require({
        message: t('modals.delete_item_text'),
        header: t('modals.delete_item_title'),
        acceptLabel: t('modals.yes_delete'),
        rejectLabel: t('modals.cancel'),
        accept: () => {
            confirmed.value = true
            imageUrls.value = [];
            // uploadedImages.value = [];
        },
        reject: () => {
            cancelDeleteImage()
            console.log('canceled')
        }
    })
}

const cancelDeleteImage = () => {
    confirmed.value = false
}

</script>