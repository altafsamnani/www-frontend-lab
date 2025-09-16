<template>
  <RightLayout :title="$t('shipping.addresses.title')" :subtitle="$t('shipping.addresses.subtitle')">
    <template #actions>
      <router-link :to="{ name: 'shipping-create' }">
        <Button>
          <i class="pi pi-plus mr-2"></i>
          {{ $t('shipping.addresses.addNew') }}
        </Button>
      </router-link>
    </template>

    <div v-if="loading" class="flex justify-center py-12">
      <LoaderView />
    </div>

    <div v-else-if="myShippingAddresses.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">{{ $t('shipping.addresses.noAddresses') }}</p>
      <router-link :to="{ name: 'shipping-create' }">
        <Button>
          <i class="pi pi-plus mr-2"></i>
          {{ $t('shipping.addresses.addFirst') }}
        </Button>
      </router-link>
    </div>

    <div v-else class="card">
      <DataTable :value="myShippingAddresses" :paginator="true" :rows="10" dataKey="id" :rowHover="true"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" class="p-datatable-sm"
        :globalFilterFields="['companyName', 'name', 'street', 'city', 'zipcode', 'country']">

        <Column field="companyName" :header="$t('shipping.addresses.form.companyName')" :sortable="true">
          <template #body="slotProps">
            <span class="font-semibold">{{ slotProps.data.companyName }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('shipping.addresses.form.contactPerson')" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.name || '-' }}
          </template>
        </Column>

        <Column :header="$t('common.address', 'Address')" :sortable="false">
          <template #body="slotProps">
            <div class="text-sm">
              <p>{{ slotProps.data.street }} {{ slotProps.data.number }}{{ slotProps.data.numberExt }}</p>
              <p>{{ slotProps.data.zipcode }} {{ slotProps.data.city }}</p>
              <p>{{ slotProps.data.country }}</p>
            </div>
          </template>
        </Column>

        <Column field="phone" :header="$t('shipping.addresses.form.phone')" :sortable="true">
          <template #body="slotProps">
            <div class="text-sm">
              <p v-if="slotProps.data.phone"><i class="pi pi-phone mr-1 text-xs"></i> {{ slotProps.data.phone }}</p>
              <p v-if="slotProps.data.mobile"><i class="pi pi-mobile mr-1 text-xs"></i> {{ slotProps.data.mobile }}</p>
              <span v-if="!slotProps.data.phone && !slotProps.data.mobile">-</span>
            </div>
          </template>
        </Column>

        <Column :exportable="false" style="min-width:8rem" bodyClass="text-center"
          :header="$t('common.actions', 'Actions')">
          <template #body="slotProps">
            <div class="flex justify-center gap-2">
              <router-link :to="{ name: 'shipping-edit', params: { id: slotProps.data.id } }">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-sm"
                  v-tooltip.top="$t('common.edit')" />
              </router-link>
              <Button v-if="myShippingAddresses.length > 1" icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-danger p-button-sm"
                @click="confirmDelete(slotProps.data)" v-tooltip.top="$t('common.delete')" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showDeleteDialog" :header="$t('shipping.addresses.deleteConfirm')" :modal="true">
      <p>{{ $t('shipping.addresses.deleteMessage') }}</p>
      <template #footer>
        <SecondaryButton @click="showDeleteDialog = false">
          {{ $t('common.cancel') }}
        </SecondaryButton>
        <DangerButton @click="handleDelete">
          {{ $t('common.delete') }}
        </DangerButton>
      </template>
    </Dialog>
  </RightLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useShippingAddressesStore } from '@/stores/shippingAddresses'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import RightLayout from '@/layouts/RightLayout.vue'
import LoaderView from '@/components/icons/LoaderView.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from '@/volt/Button.vue'
import SecondaryButton from '@/volt/SecondaryButton.vue'
import DangerButton from '@/volt/DangerButton.vue'
import Dialog from '@/volt/Dialog.vue'
import type { ShippingAddress } from '@/types/ShippingAddress'

const { t } = useI18n()
const shippingAddressesStore = useShippingAddressesStore()
const notifyStore = useNotifyStore()

const { myShippingAddresses, loading } = storeToRefs(shippingAddressesStore)

const showDeleteDialog = ref(false)
const addressToDelete = ref<ShippingAddress | null>(null)

onMounted(() => {
  shippingAddressesStore.fetchMyShippingAddresses()
})

const confirmDelete = (address: ShippingAddress) => {
  addressToDelete.value = address
  showDeleteDialog.value = true
}

const handleDelete = async () => {
  if (!addressToDelete.value) return

  try {
    await shippingAddressesStore.deleteAddress(addressToDelete.value.id)
    notifyStore.notify(
      t('shipping.addresses.messages.deleteSuccess'),
      NotificationType.Success
    )
    showDeleteDialog.value = false
  } catch (error) {
    notifyStore.notify(
      t('shipping.addresses.messages.deleteError'),
      NotificationType.Error
    )
  }
}
</script>