<template>
  <div>
    <div class="flex items-center justify-start space-x-6">
      <Calendar
        v-model="newPublishDate"
        dateFormat="dd-mm-yy"
        v-if="isChanging"
        showIcon
        iconDisplay="input"
        showButtonBar
      />
      <SplitButton
        :label="prop.publishedDate ? showButtonLabel() : t('forms.placeholder_draft')"
        :icon="prop.publishedDate ? showButtonIcon() : 'pi pi-eye-slash'"
        :model="items"
        class="w-full h-full"
        :disabled="prop.itemIsDeleted"
        :severity="
          prop.publishedDate ? showSeverity(prop.publishedDate, prop.itemIsDeleted) : 'secondary'
        "
        v-if="!isChanging"
      />

      <Button
        v-if="isChanging"
        :label="$t('button.reset')"
        severity="secondary"
        icon="pi pi-refresh"
        @click="reset"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/nl'

const { d, t } = useI18n()

const prop = defineProps<{
  publishedDate: string
  itemIsDeleted?: {
    type: boolean
    default: false
  }
}>()

const items = [
  {
    label: 'Publish',
    icon: 'pi pi-eye',
    visible: () => prop.publishedDate == '',
    command: () => {
      setPublished()
    }
  },
  {
    label: 'Draft',
    icon: 'pi pi-eye-slash',
    visible: () => prop.publishedDate != '',
    command: () => {
      setDraft()
    }
  },
  {
    label: 'Change Date',
    icon: 'pi pi-calendar',
    visible: () => prop.publishedDate != '',
    command: () => {
      changePublishedDate()
    }
  }
]

const isChanging = ref(false)
const newPublishDate = ref()
const emit = defineEmits(['emitDate'])

const changePublishedDate = () => {
  isChanging.value = true
}

const setDraft = () => {
  newPublishDate.value = ''
  isChanging.value = false
}

const setPublished = () => {
  newPublishDate.value = dayjs().format('YYYY-MM-DD')
  isChanging.value = false
}

const reset = () => {
  isChanging.value = false
}

const showSeverity = (publishDate, itemIsDeleted) => {
  if (itemIsDeleted) return 'danger'
  if (publishDate == '') return 'secondary'
  return dayjs(publishDate).format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD')
    ? 'warning'
    : 'success'
}

const showButtonLabel = () => {
  return prop.publishedDate &&
    dayjs(prop.publishedDate).format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD')
    ? t('forms.placeholder_planned')
    : t('forms.placeholder_published')
}

const showButtonIcon = () => {
  return prop.publishedDate &&
    dayjs(prop.publishedDate).format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD')
    ? 'pi pi-calendar'
    : 'pi pi-eye'
}

watch(
  () => newPublishDate.value,
  () => {
    let result
    if (newPublishDate.value) {
      result = dayjs(newPublishDate.value).format('YYYY-MM-DD')
    } else {
      result = ''
    }
    emit('emitDate', result)
  }
)
</script>
