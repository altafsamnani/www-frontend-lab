<template>
    <div v-if="files?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
            <i :class="sectionConfig.icon" />
            <h3 class="text-surface-900 dark:text-surface-0 font-semibold text-l">{{ t(`file.${type}`) }}</h3>
            <Tag :value="files.length" :severity="sectionConfig.severity" />
        </div>
        <DataTable :value="files" class="p-datatable-sm" stripedRows>
            <Column field="icon" header="" style="width: 60px">
                <template #body="{ data }">
                    <img :src="data.icon" :alt="data.name" class="w-8 h-8 object-cover rounded" />
                </template>
            </Column>
            <Column field="name" :header="t('file.name')" sortable class="font-medium">
                <template #body="{ data }">
                    <div class="">
                        <span class=" block" :title="data.name">{{ data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="version" :header="t('file.version')" sortable style="width: 100px" />
            <Column field="versionUpdate" :header="getVersionUpdateHeader()" sortable style="width: 180px">
                <template #body="{ data }">
                    {{ formatDate(data.versionUpdate) }}
                </template>
            </Column>
            <Column field="size" :header="t('file.size')" sortable style="width: 100px">
                <template #body="{ data }">
                    {{ formatFileSize(data.size) }}
                </template>
            </Column>
            <Column :header="t('file.changelog')" style="width: 60px">
                <template #body="{ data }">
                    <Button v-if="data.changelog" icon="pi pi-info-circle" severity="secondary" text size="small"
                        v-tooltip.top="data.changelog" />
                </template>
            </Column>
            <Column header="" style="width: 80px">
                <template #body="{ data }">
                    <Button icon="pi pi-download" :severity="sectionConfig.severity" text size="small"
                        @click="downloadFile(data)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type FileItem from '@/types/FileItem'

interface Props {
    files: FileItem[]
    type: 'document' | 'downloads' | 'manual' | 'software' | 'firmware'
}

const props = defineProps<Props>()
const toast = useToast()
const { t } = useI18n()

const sectionConfig = computed(() => {
    const configs = {
        document: {
            icon: 'pi pi-file text-blue-500 text-xl',
            severity: 'info' as const
        },
        downloads: {
            icon: 'pi pi-cloud-download text-green-500 text-xl',
            severity: 'success' as const
        },
        manual: {
            icon: 'pi pi-book text-orange-500 text-xl',
            severity: 'warn' as const
        },
        software: {
            icon: 'pi pi-desktop text-purple-500 text-xl',
            severity: 'secondary' as const
        },
        firmware: {
            icon: 'pi pi-cog text-red-500 text-xl',
            severity: 'danger' as const
        }
    }
    return configs[props.type]
})

const getVersionUpdateHeader = () => {
    // Use firmware-specific translation for firmware, generic for others
    return props.type === 'firmware' ? t('firmware.version_date') : t('file.version_update')
}

const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString()
}

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

const downloadFile = (file: FileItem) => {
    if (file.url) {
        const link = document.createElement('a')
        link.href = file.url
        link.download = file.name
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.add({
            severity: 'success',
            summary: t('download.started'),
            detail: file.name,
            life: 3000
        })
    } else {
        toast.add({
            severity: 'error',
            summary: t('download.failed'),
            detail: t('download.no_url'),
            life: 5000
        })
    }
}
</script>