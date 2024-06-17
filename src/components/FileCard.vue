<template>
    <div
        class="relative w-full transition-shadow rounded-md shadow-md sm:w-56 place-content-between lg:max-w-64 list-group-item hover:shadow-lg hover:shadow-surface-900/5 dark:bg-white/10 dark:hover:shadow-white/10">
        <a :href="props.file.url" target="_blank">
            <figure>
                <img :src="props.file.icon" :alt="props.file.name" class="min-h-48" />
            </figure>
            <div class="p-3 text-center h-20">
                <div class="mb-2 text-base font-semibold leading-6">
                    <p class="break-words">{{ props.file.name }} </p>
                </div>
            </div>
        </a>

        <div class="bottom-0 flex justify-between w-full p-2">
            <a :href="props.file.url" target="_blank">
                <Button icon="pi pi-download" severity="primary" text rounded class="w-12 h-12" aria-label="Download" />
            </a>
            <Button icon="pi pi-arrows-h" text rounded severity="secondary" class="cursor-move handle" />
            <Button @click="showdeleteFileConfirmation(props.file.id)" icon="pi pi-trash" severity="danger" text rounded
                class="w-12 h-12" aria-label="Delete" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
    fileCollectionId?: number
    file: { id: number, name: string, icon: string, url: string }
}>()

const confirm = useConfirm()
const { t } = useI18n()
const fileId = ref()
const confirmed = ref(false)
const showdeleteFileConfirmation = (id) => {
    fileId.value = id
    confirmDeleteFile()
}

const confirmDeleteFile = () => {
    confirm.require({
        message: t('modals.delete_item_text'),
        header: t('modals.delete_item_title'),
        acceptLabel: t('modals.yes_delete'),
        rejectLabel: t('modals.cancel'),
        accept: () => {
            confirmed.value = true
            fileUrls.value = [];
            // uploadedFiles.value = [];
        },
        reject: () => {
            cancelDeleteFile()
            console.log('canceled')
        }
    })
}

const cancelDeleteFile = () => {
    confirmed.value = false
}

</script>