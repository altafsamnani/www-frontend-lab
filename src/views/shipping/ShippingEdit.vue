<template>
  <RightLayout :title="$t('shipping.addresses.edit.title')" :subtitle="$t('shipping.addresses.edit.subtitle')">
    <div v-if="loadingAddress" class="flex justify-center py-12">
      <LoaderForm :columns="1" :rows="8" />
    </div>
    
    <div v-else-if="!currentAddress" class="text-center py-12">
      <p class="text-red-600 dark:text-red-400 mb-4">
        {{ $t('shipping.addresses.messages.notFound') }}
      </p>
      <Button @click="handleCancel" severity="secondary">
        {{ $t('common.back') }}
      </Button>
    </div>
    
    <ShippingAddressForm 
      v-else
      :address="currentAddress"
      :loading="loading" 
      @submit="handleUpdateAddress" 
      @cancel="handleCancel" 
    />
  </RightLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useShippingStore } from '@/stores/shipping'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import RightLayout from '@/layouts/RightLayout.vue'
import LoaderForm from '@/components/icons/LoaderForm.vue'
import Button from '@/volt/Button.vue'
import ShippingAddressForm from './ShippingAddressForm.vue'
import type { ShippingAddressInput } from '@/types/ShippingAddress'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const shippingStore = useShippingStore()
const notifyStore = useNotifyStore()

const { currentShippingAddress: currentAddress } = storeToRefs(shippingStore)

const loading = ref(false)
const loadingAddress = ref(true)
const addressId = parseInt(route.params.id as string)

onMounted(async () => {
  try {
    if (addressId) {
      await shippingStore.fetchShippingAddress(addressId)
    }
  } catch (error) {
    notifyStore.notify(
      t('shipping.addresses.messages.fetchError'),
      NotificationType.Error
    )
  } finally {
    loadingAddress.value = false
  }
})

const handleUpdateAddress = async (addressData: ShippingAddressInput) => {
  if (!addressId) return
  
  try {
    loading.value = true
    await shippingStore.updateAddress(addressId, addressData)
    
    notifyStore.notify(
      t('shipping.addresses.messages.updateSuccess'),
      NotificationType.Success
    )
    
    router.push({ name: 'shipping' })
  } catch (error) {
    notifyStore.notify(
      t('shipping.addresses.messages.updateError'),
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