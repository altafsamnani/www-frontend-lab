<template>
  <div>
    <Button
      type="button"
      icon="pi pi-ellipsis-v"
      @click="toggle"
      severity="secondary"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    />
    <Menu ref="menu" id="overlay_menu" :model="buttonItems" :popup="true" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'

const { t } = useI18n()
const emit = defineEmits(['delete', 'restore'])
const confirm = useConfirm()

const prop = defineProps<{
  itemIsDeleted: boolean
}>()

const toggle = (event) => {
  menu.value.toggle(event)
}

const menu = ref()
const buttonItems = computed(() => {
  if (prop.itemIsDeleted) {
    return [
      {
        label: t('button.restore'),
        icon: 'pi pi-undo',
        command: () => confirmRestore()
      }
    ]
  }
  if (!prop.itemIsDeleted) {
    return [
      {
        label: t('button.delete'),
        icon: 'pi pi-trash',
        command: () => confirmDelete()
      }
    ]
  }
})

const confirmDelete = () => {
  confirm.require({
    message: t('modals.delete_item_text'),
    header: t('modals.delete_item_title'),
    acceptLabel: t('modals.yes_delete'),
    rejectLabel: t('modals.cancel'),
    accept: () => {
      emit('delete')
    },
    reject: () => {
      console.log('canceled')
    }
  })
}

const confirmRestore = () => {
  confirm.require({
    message: t('modals.restore_item_text'),
    header: t('modals.restore_item_title'),
    acceptLabel: t('modals.yes_restore'),
    rejectLabel: t('modals.cancel'),
    accept: () => {
      emit('restore')
    },
    reject: () => {
      console.log('canceled')
    }
  })
}
</script>
