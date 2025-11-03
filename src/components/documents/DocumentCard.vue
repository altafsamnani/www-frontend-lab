<template>
  <div
    class="group bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 cursor-pointer"
    @click="$emit('open', document.url)">
    <!-- File Icon Preview -->
    <div
      class="relative bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-800 dark:to-surface-900 p-6 flex items-center justify-center h-40">
      <img :src="document.icon" :alt="document.name"
        class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
        @error="handleImageError" />
    </div>

    <!-- Document Info -->
    <div class="p-4">
      <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-0 mb-3 line-clamp-2 min-h-[2.5rem]">
        {{ displayName }}
      </h3>

      <div class="space-y-2 text-xs text-surface-600 dark:text-surface-400 mb-4">
        <div v-if="document.version" class="flex items-center gap-2">
          <i class="pi pi-tag text-primary-500"></i>
          <span>{{ document.version }}</span>
        </div>
        <div v-if="document.platformType" class="flex items-center gap-2">
          <i class="pi pi-desktop text-primary-500"></i>
          <span>{{ document.platformType }}</span>
        </div>
        <div v-if="document.versionUpdate" class="flex items-center gap-2">
          <i class="pi pi-calendar text-primary-500"></i>
          <span>{{ formatDate(document.versionUpdate) }}</span>
        </div>
        <div v-if="document.size > 0" class="flex items-center gap-2">
          <i class="pi pi-file text-primary-500"></i>
          <span>{{ formatFileSize(document.size) }}</span>
        </div>
      </div>

      <Button @click.stop="$emit('download', document.url, document.name)" class="w-full" size="small" outlined>
        <i :class="document.extension === 'link' ? 'pi pi-external-link mr-2' : 'pi pi-download mr-2'"></i>
        {{ document.extension === 'link' ? $t('manuals.view') : $t('manuals.download') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/volt/Button.vue'

interface Document {
  id: number
  name: string
  icon: string
  url: string
  type: string
  version?: string
  versionUpdate?: string
  extension: string
  size: number
  platformType?: string | null
}

interface Props {
  document: Document
}

const props = defineProps<Props>()
defineEmits<{
  open: [url: string]
  download: [url: string, name: string]
}>()

const displayName = computed(() => {
  if (props.document.extension === 'link') {
    // Extract the document type (e.g., 'manual', 'software', 'firmware', 'document')
    const documentType = props.document.type || 'document'

    // Capitalize first letter of document type
    const typePrefix = documentType.charAt(0).toUpperCase() + documentType.slice(1)

    // Extract the last two path segments from the URL
    try {
      const url = new URL(props.document.url)
      const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0)

      // Get last two segments
      const lastTwoSegments = pathSegments.slice(-2).join('_')

      if (lastTwoSegments) {
        return `${typePrefix}_${lastTwoSegments}`
      }
    } catch (error) {
      // If URL parsing fails, fall back to original name
      console.error('Error parsing URL:', error)
    }
  }

  return props.document.name
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateString
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
