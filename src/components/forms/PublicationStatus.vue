<template>
  <span
    v-tooltip.left="{
      value: getStatusText(prop.publishedAt, prop.deletedAt ? prop.deletedAt : null)
    }"
    :class="[
      'pi pi-circle-fill flex items-center text-xs',
      getStatusClass(prop.publishedAt, prop.deletedAt ? prop.deletedAt : null)
    ]"
  ></span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/nl'

const { t } = useI18n()
const today = dayjs().format('YYYY-MM-DD')

const getStatusClass = (publishedAt, deletedAt) => {
  if (deletedAt != null) {
    return 'text-red-600'
  } else if (publishedAt > today) {
    return 'text-orange-500'
  } else if (publishedAt < today) {
    return 'text-green-600'
  } else if (publishedAt === null) {
    return 'text-surface-200'
  } else {
    return false
  }
}

const getStatusText = (publishedAt, deletedAt) => {
  if (deletedAt != null) {
    return t('general.deleted')
  } else if (publishedAt > today) {
    return t('general.publication_planned') + ' ' + dayjs(publishedAt).format('DD-MM-YYYY')
  } else if (publishedAt < today) {
    return t('general.publication_published')
  } else if (publishedAt === null) {
    return t('general.publication_not_published')
  } else {
    return false
  }
}

const prop = defineProps<{
  publishedAt: string
  deletedAt: string
}>()
</script>
