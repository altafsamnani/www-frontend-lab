<template>
  <div class="flex items-center justify-end space-x-3">
    <ConfirmDialog></ConfirmDialog>
    <router-link :to="{ name: btnBackRoute }">
      <Button icon="pi pi-arrow-circle-left" :label="$t('button.back')" severity="secondary" />
    </router-link>
    <Button @click="showResetConfirmation" v-show="formHasChanges" icon="pi pi-refresh" :label="$t('button.reset')"
      severity="secondary" />
    <Button v-show="formHasChanges" icon="pi pi-check" :label="id ? $t('button.update') : $t('button.create')"
      :disabled="isDisabled" :loading="isDisabled" type="submit" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'

const route = useRoute()
const { t } = useI18n()
const id = ref(route.params.id)
const confirm = useConfirm()
const emit = defineEmits(['btnReset'])

const showResetConfirmation = () => {
  confirm.require({
    message: 'Reset form contents?',
    header: 'Confirmation',
    acceptIcon: 'pi pi-check pr-2',
    rejectIcon: 'pi pi-times pr-2',
    acceptLabel: t('button.reset'),
    rejectLabel: t('button.cancel'),
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    accept: () => {
      console.log('content reset')
      emit('btnReset')
    },
    reject: () => {
      console.log('canceled')
    }
  })
}

const prop = defineProps<{
  formHasChanges: boolean
  btnBackRoute: string
  isDisabled: boolean
}>()
</script>
