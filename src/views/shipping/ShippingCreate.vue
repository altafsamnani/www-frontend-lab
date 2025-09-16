<template>
  <RightLayout :title="$t('shipping.addresses.create.title')" :subtitle="$t('shipping.addresses.create.subtitle')">
    <ShippingAddressForm 
      :loading="loading" 
      @submit="handleCreateAddress" 
      @cancel="handleCancel" 
    />
  </RightLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useShippingStore } from '@/stores/shipping'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import RightLayout from '@/layouts/RightLayout.vue'
import ShippingAddressForm from './ShippingAddressForm.vue'
import type { ShippingAddressInput } from '@/types/ShippingAddress'

const { t } = useI18n()
const router = useRouter()
const shippingStore = useShippingStore()
const notifyStore = useNotifyStore()

const loading = ref(false)

const handleCreateAddress = async (addressData: ShippingAddressInput) => {
  try {
    loading.value = true
    await shippingStore.createAddress(addressData)
    
    notifyStore.notify(
      t('shipping.addresses.messages.createSuccess'),
      NotificationType.Success
    )
    
    router.push({ name: 'shipping' })
  } catch (error) {
    notifyStore.notify(
      t('shipping.addresses.messages.createError'),
      NotificationType.Error
    )
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push({ name: 'shipping' })
}
</script>