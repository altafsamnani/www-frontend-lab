<template>
    <div v-if="hasAnyFiles" class="space-y-8">
        <FilesDataTable v-for="[type, files] in filesSections" :key="type" :files="files" :type="type" />
    </div>

    <div v-else class="text-center py-8">
        <i class="pi pi-inbox !text-6xl text-surface-300 dark:text-surface-500 mb-4"></i>
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">{{ t('files.no_files') }}</div>
        <p class="text-surface-700 dark:text-surface-100 leading-normal">{{ t('files.no_files_description') }}</p>
    </div>
    <Toast />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Toast from 'primevue/toast'
import FilesDataTable from '@/components/FilesDataTable.vue'
import type Containers from '@/types/Containers'

const props = defineProps<{
    containers: Containers
}>()

const { t } = useI18n()

const filesSections = computed(() => {
    const sections: Array<['document' | 'downloads' | 'manual' | 'software' | 'firmware', any[]]> = []

    if (props.containers.document?.length) {
        sections.push(['document', props.containers.document])
    }
    if (props.containers.downloads?.length) {
        sections.push(['downloads', props.containers.downloads])
    }
    if (props.containers.manual?.length) {
        sections.push(['manual', props.containers.manual])
    }
    if (props.containers.software?.length) {
        sections.push(['software', props.containers.software])
    }
    if (props.containers.firmware?.length) {
        sections.push(['firmware', props.containers.firmware])
    }

    return sections
})

const hasAnyFiles = computed(() => {
    return filesSections.value.length > 0
})
</script>