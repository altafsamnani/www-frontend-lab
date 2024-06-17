<template>
  <div>
    <div class="flex items-center justify-start space-x-6">
      <button
        @click="showDeleteConfirmation"
        v-if="!itemIsDeleted"
        type="button"
        class="btn btn-error btn-sm btn-outline"
        :disabled="isDisabled"
      >
        <i class="pi pi-trash" />
        <span class="ml-2">{{ $t('button.delete') }}</span>
      </button>
      <button
        @click="showRestoreConfirmation"
        v-if="itemIsDeleted"
        type="button"
        class="btn btn-primary btn-sm btn-outline"
        :disabled="isDisabled"
      >
        <i class="pi pi-undo" />
        <span class="ml-2">{{ $t('button.restore') }}</span>
      </button>
    </div>
    <Modal
      ref="confirm_delete"
      showCancel
      confirmType="delete"
      :confirmText="$t('button.delete')"
      @confirm="destroy"
      :cancelText="$t('button.cancel')"
      @cancel="console.log('canceled')"
    >
      <h3 class="text-lg font-bold">{{ $t('modals.delete_item_title') }}</h3>
      <p class="py-4">{{ $t('modals.delete_item_text') }}</p>
    </Modal>
    <Modal
      ref="confirm_restore"
      showCancel
      :confirmText="$t('button.restore')"
      @confirm="restore"
      :cancelText="$t('button.cancel')"
      @cancel="console.log('canceled')"
    >
      <h3 class="text-lg font-bold">{{ $t('modals.restore_item_title') }}</h3>
      <p class="py-4">{{ $t('modals.restore_item_text') }}</p>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import Modal from '@/components/modals/Modal.vue'

const confirm_delete = ref<InstanceType<typeof Modal>>()
const showDeleteConfirmation = () => confirm_delete.value?.show()
const destroy = () => {
  emit('btnDelete')
}

const confirm_restore = ref<InstanceType<typeof Modal>>()
const showRestoreConfirmation = () => confirm_restore.value?.show()
const restore = () => {
  emit('btnRestore')
}

const emit = defineEmits(['btnDelete', 'btnRestore'])

const prop = defineProps<{
  itemIsDeleted: boolean
  isDisabled: boolean
}>()
</script>
