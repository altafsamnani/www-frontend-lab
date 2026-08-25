<template>
  <RightLayout :title="$t('menu.myOffers')" :subtitle="$t('offers.subtitle')">
    <!-- Toolbar with Create and Settings buttons -->
    <div class="mb-4 flex justify-end gap-2">
      <Button @click="goToSettings" severity="secondary" outlined size="small">
        <i class="pi pi-cog mr-2"></i>
        {{ $t('offers.settings.title') }}
      </Button>
      <Button @click="createNewOffer" size="small">
        <i class="pi pi-plus mr-2"></i>
        {{ $t('offers.createOffer') }}
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="offerStore.loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="15" />
    </div>

    <!-- Empty State - No Offers -->
    <div v-else-if="offerStore.offers.length === 0" class="py-4 text-center">
      <i class="pi pi-file text-surface-300 dark:text-surface-600 mb-4 text-6xl"></i>
      <p class="text-surface-500 dark:text-surface-400 mb-4 text-lg">{{ $t('offers.noOffers') }}</p>
      <p class="text-surface-400 dark:text-surface-500 mb-4">
        {{ $t('offers.noOffersMessage') }}
      </p>
    </div>

    <!-- Offers DataTable -->
    <div v-else class="card">
      <DataTable
        :value="offerStore.offers"
        :paginator="offerStore.offers.length > 10"
        :rows="10"
        dataKey="id"
        :rowHover="true"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        class="p-datatable-sm"
        :totalRecords="offerStore.offers.length"
        v-model:expandedRows="expandedRows"
        @rowExpand="onRowExpand"
      >
        <!-- Offer Number Column -->
        <Column
          field="offerNumber"
          :header="$t('offers.offerNumber')"
          :sortable="true"
          style="width: 12rem"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <i class="pi pi-file text-primary"></i>
              <span class="font-semibold">{{
                slotProps.data.offerNumber || `#${slotProps.data.id}`
              }}</span>
            </div>
          </template>
        </Column>

        <!-- Customer Column -->
        <Column field="customerCompany" :header="$t('offers.customer')" :sortable="true">
          <template #body="slotProps">
            <div v-if="slotProps.data.customerCompany || slotProps.data.customerName">
              <div class="font-medium">{{ slotProps.data.customerCompany }}</div>
              <div
                v-if="slotProps.data.customerName"
                class="text-surface-600 dark:text-surface-400 text-sm"
              >
                {{ slotProps.data.customerName }}
              </div>
            </div>
            <span v-else class="text-surface-400">-</span>
          </template>
        </Column>

        <!-- Date Column -->
        <Column field="offerDate" :header="$t('offers.date')" :sortable="true" style="width: 12rem">
          <template #body="slotProps">
            <span class="text-surface-600 dark:text-surface-400 text-sm">
              {{ formatDate(slotProps.data.offerDate || slotProps.data.createdAt) }}
            </span>
          </template>
        </Column>

        <!-- Status Column -->
        <Column
          field="statusName"
          :header="$t('offers.status')"
          :sortable="true"
          style="width: 10rem"
        >
          <template #body="slotProps">
            <div
              class="bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700 inline-flex items-center gap-1 rounded-md border px-2 py-1"
            >
              <i
                :class="getStatusIcon(slotProps.data.statusName)"
                class="text-surface-600 dark:text-surface-400 text-xs"
              ></i>
              <span class="text-surface-700 dark:text-surface-300 text-xs font-medium">
                {{ $t(`offers.status.${slotProps.data.statusName}`) }}
              </span>
            </div>
          </template>
        </Column>

        <!-- Items Count Column -->
        <Column
          field="totalItems"
          :header="$t('offers.items')"
          :sortable="true"
          style="width: 8rem"
          bodyClass="text-center"
        >
          <template #body="slotProps">
            <div class="flex items-center justify-center gap-1">
              <i class="pi pi-list text-surface-500 text-sm"></i>
              <span class="font-medium">{{ slotProps.data.totalItems || 0 }}</span>
            </div>
          </template>
        </Column>

        <!-- Total Amount Column -->
        <Column
          field="totalAmount"
          :header="$t('offers.total')"
          :sortable="true"
          style="width: 12rem"
          bodyClass="text-right"
        >
          <template #body="slotProps">
            <div class="font-semibold">
              €{{ formatPrice(slotProps.data.totalAmount) }}
              <div
                v-if="slotProps.data.orderDiscount > 0"
                class="text-xs text-green-600 dark:text-green-400"
              >
                (-{{ slotProps.data.orderDiscount }}%)
              </div>
            </div>
          </template>
        </Column>

        <!-- Actions Column -->
        <Column
          :exportable="false"
          style="width: 14rem"
          bodyClass="text-center"
          :header="$t('common.actions')"
        >
          <template #body="slotProps">
            <div class="flex justify-center gap-2">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-text p-button-sm"
                @click="editOffer(slotProps.data.id)"
                v-tooltip.top="$t('offers.edit')"
              />
              <Button
                icon="pi pi-copy"
                class="p-button-rounded p-button-text p-button-sm"
                @click="duplicateOffer(slotProps.data.id)"
                v-tooltip.top="$t('offers.duplicate')"
              />
              <Button
                icon="pi pi-download"
                class="p-button-rounded p-button-text p-button-sm"
                @click="downloadPDF(slotProps.data.hash)"
                v-tooltip.top="$t('offers.downloadPDF')"
              />
              <Button
                icon="pi pi-eye"
                class="p-button-rounded p-button-text p-button-sm"
                @click="viewPDF(slotProps.data.hash)"
                v-tooltip.top="$t('offers.viewPDF')"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-danger p-button-sm"
                @click="confirmDelete(slotProps.data.id)"
                v-tooltip.top="$t('common.delete')"
              />
              <Button
                :icon="expandedRows[slotProps.data.id] ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
                class="p-button-rounded p-button-text p-button-sm"
                @click="toggleRowExpansion(slotProps.data)"
                v-tooltip.top="
                  expandedRows[slotProps.data.id]
                    ? $t('offers.hideDetails')
                    : $t('offers.viewDetails')
                "
              />
            </div>
          </template>
        </Column>

        <!-- Expandable Row Content -->
        <template #expansion="slotProps">
          <div class="p-4">
            <!-- Subject -->
            <div v-if="slotProps.data.subject" class="mb-4">
              <span class="text-surface-700 dark:text-surface-300 font-semibold"
                >{{ $t('offers.subject') }}:
              </span>
              <span class="text-surface-600 dark:text-surface-400">{{
                slotProps.data.subject
              }}</span>
            </div>

            <!-- Offer Items -->
            <div v-if="slotProps.data.items && slotProps.data.items.length > 0">
              <h5 class="text-surface-900 dark:text-surface-0 mb-3 font-semibold">
                {{ $t('offers.items') }}
              </h5>
              <div class="space-y-2">
                <div
                  v-for="item in slotProps.data.items"
                  :key="item.id"
                  class="bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-700 flex items-center justify-between rounded-md border p-3"
                >
                  <div class="flex-1">
                    <div class="text-surface-900 dark:text-surface-0 font-medium">
                      {{ item.name || item.articleNr || '-' }}
                    </div>
                    <div class="text-surface-500 dark:text-surface-400 text-sm">
                      {{ item.items }}x @ €{{ formatPrice(item.price) }}
                      <span v-if="item.discount > 0" class="text-green-600">
                        (-{{ item.discount }}%)
                      </span>
                    </div>
                  </div>
                  <div class="text-surface-900 dark:text-surface-0 font-semibold">
                    €{{ formatPrice(item.total) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      v-model:visible="deleteDialogVisible"
      :header="$t('offers.confirmDelete')"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle text-2xl text-red-500"></i>
        <span>{{ $t('offers.confirmDeleteMessage') }}</span>
      </div>
      <template #footer>
        <Button
          :label="$t('common.cancel')"
          severity="secondary"
          @click="deleteDialogVisible = false"
        />
        <Button :label="$t('common.delete')" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useOfferStore } from '@/stores/offers'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useI18n } from 'vue-i18n'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import dayjs from 'dayjs'

  const offerStore = useOfferStore()
  const router = useRouter()
  const notifyStore = useNotifyStore()
  const { t } = useI18n()

  const expandedRows = ref<Record<string, boolean>>({})
  const deleteDialogVisible = ref(false)
  const offerToDelete = ref<number | null>(null)

  onMounted(async () => {
    await offerStore.fetchUserOffers()
  })

  const formatDate = (date: string) => {
    return dayjs(date).format('DD-MM-YYYY')
  }

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      draft: 'pi pi-file-edit',
      sent: 'pi pi-send',
      accepted: 'pi pi-check-circle',
      rejected: 'pi pi-times-circle',
    }
    return icons[status] || 'pi pi-file'
  }

  const toggleRowExpansion = (data: any) => {
    if (expandedRows.value[data.id]) {
      delete expandedRows.value[data.id]
    } else {
      expandedRows.value[data.id] = true
    }
  }

  const onRowExpand = (event: any) => {
    console.log('Row expanded:', event.data)
  }

  const createNewOffer = () => {
    router.push({ name: 'OfferCreate' })
  }

  const goToSettings = () => {
    router.push({ name: 'OfferSettings' })
  }

  const editOffer = (offerId: string) => {
    router.push({ name: 'OfferEdit', params: { id: offerId } })
  }

  const duplicateOffer = async (offerId: string) => {
    await offerStore.duplicateExistingOffer(Number(offerId))
    notifyStore.notify(t('offers.duplicatedSuccessfully'), NotificationType.Success)
  }

  const downloadPDF = (hash: string) => {
    offerStore.downloadPdf(hash)
  }

  const viewPDF = (hash: string) => {
    offerStore.viewPdf(hash)
  }

  const confirmDelete = (offerId: string) => {
    offerToDelete.value = Number(offerId)
    deleteDialogVisible.value = true
  }

  const handleDelete = async () => {
    if (!offerToDelete.value) return

    await offerStore.removeOffer(offerToDelete.value)
    notifyStore.notify(t('offers.deletedSuccessfully'), NotificationType.Success)
    deleteDialogVisible.value = false
    offerToDelete.value = null
  }
</script>
