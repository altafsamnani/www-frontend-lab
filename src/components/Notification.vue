<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { NotificationType, useNotifyStore } from '@/stores/notify'
import { useToast } from 'primevue/usetoast'

const notifyStore = useNotifyStore()
const { notifications } = storeToRefs(notifyStore)
const toast = useToast()

// for each notification add a toast
//notifications.value.forEach((notification) => {

toast.add({
  //severity: notification.type,
  severity: 'error',
  summary: 'xx',
  detail: 'dfdsfsdf',
  life: 5000
})

//watch for notifications
//watch(notifications, () => {
console.log('watching notifications')
console.log(notifications.value[0])
notifications.value.forEach((notification) => {
  toast.add({
    //severity: notification.type,
    severity: 'error',
    summary: 'xx',
    detail: 'dfdsfsdf',
    life: 5000
  })
})
//})

//})
</script>

<template>
  <div>
    <div class="z-50 w-64 mt-14">
      <!-- <div
        v-for="notification in notifications"
        :class="notification.type"
        class="cursor-pointer"
        @click.prevent="notifyStore.removeNotification(notification)"
      >
        <div>
          <span>&nbsp;{{ notification.message }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>
