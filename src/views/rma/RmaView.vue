<template>
  <RightLayout :title="rmaTitle" :subtitle="$t('rma.view.subtitle')">
    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="2" :rows="6" />
    </div>

    <div v-else-if="currentRma" class="flex flex-col gap-6">
      <div class="grid grid-cols-2 gap-6">
        <div
          class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-6"
        >
          <h3 class="mb-4 text-lg font-semibold">{{ $t('rma.view.rmaInfo') }}</h3>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <span class="text-surface-500">{{ $t('rma.fields.rmaNumber') }}</span>
              <span class="font-medium">RMA-{{ currentRma.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-surface-500">{{ $t('rma.fields.status') }}</span>
              <Tag :value="getStatusLabel()" :severity="getStatusSeverity()" />
            </div>
            <div class="flex justify-between">
              <span class="text-surface-500">{{ $t('rma.fields.reference') }}</span>
              <span>{{ currentRma.reference || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-surface-500">{{ $t('rma.fields.items') }}</span>
              <span>{{ currentRma.totalItems }}</span>
            </div>
          </div>
        </div>

        <div
          class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-6"
        >
          <h3 class="mb-4 text-lg font-semibold">{{ $t('rma.view.returnAddress') }}</h3>
          <div v-if="currentRma.address" class="flex flex-col gap-1 text-sm">
            <span v-if="currentRma.address.companyName" class="font-semibold">{{
              currentRma.address.companyName
            }}</span>
            <span>{{ addressStreetLine }}</span>
            <span
              >{{ currentRma.address.zipcode }} {{ currentRma.address.city
              }}<span v-if="currentRma.address.country"
                >, {{ currentRma.address.country }}</span
              ></span
            >
            <span v-if="currentRma.address.email">{{ currentRma.address.email }}</span>
            <span v-if="currentRma.address.phone">{{ currentRma.address.phone }}</span>
          </div>
          <div v-else class="text-surface-500 text-sm">-</div>
        </div>
      </div>

      <div
        class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-6"
      >
        <h3 class="mb-4 text-lg font-semibold">{{ $t('rma.view.items') }}</h3>
        <div
          v-if="!currentRma.items || !currentRma.items.length"
          class="text-surface-400 dark:text-surface-500 flex flex-col items-center justify-center py-6"
        >
          <i class="pi pi-inbox mb-2 text-2xl"></i>
          <p>{{ $t('rma.noItems') }}</p>
        </div>
        <DataTable v-else :value="currentRma.items" dataKey="id">
          <Column field="articleNo" :header="$t('rma.fields.sku')" />
          <Column field="productName" :header="$t('rma.fields.productName')" />
          <Column field="quantity" :header="$t('rma.fields.quantity')" />
          <Column field="serialnumbers" :header="$t('rma.fields.serialnumbers')" />
          <Column :header="$t('rma.fields.reason')">
            <template #body="{ data }">
              {{
                $t(
                  `rmaConfig.rma_reasons.${getReasonCode(data.reason)}`,
                  getReasonCode(data.reason)
                )
              }}
            </template>
          </Column>
          <Column field="remarks" :header="$t('rma.fields.remarks')" />
          <Column :header="$t('rma.fields.lineStatus')">
            <template #body="{ data }">
              <Tag v-if="data.customerNote" :value="data.customerNote" severity="info" />
              <span v-else>-</span>
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="flex justify-start">
        <router-link :to="{ name: 'RmaDashboard' }">
          <Button severity="secondary" outlined>
            <i class="pi pi-arrow-left mr-2"></i>
            {{ $t('rma.create.backToDashboard') }}
          </Button>
        </router-link>
      </div>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRmaStore } from '@/stores/rmas'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Tag from 'primevue/tag'

  const route = useRoute()
  const { t } = useI18n()
  const rmaStore = useRmaStore()
  const { currentRma } = storeToRefs(rmaStore)
  const loading = ref(false)

  const getReasonCode = (reason: string | number | null): string => {
    if (!reason) return 'unknown'
    return String(reason)
  }

  const addressStreetLine = computed(() => {
    const addr = currentRma.value?.address
    if (!addr) return ''
    const street = [addr.street, addr.number, addr.numberExt].filter(Boolean).join(' ').trim()
    return street || addr.address || ''
  })

  const rmaTitle = computed(() => {
    if (currentRma.value && !currentRma.value.isDraft) {
      return `RMA-${currentRma.value.id}`
    }
    return t('rma.view.title')
  })

  const getStatusLabel = (): string => {
    const status = currentRma.value?.status
    if (!status) return '-'
    return t(`rmaConfig.rma_main_statuses.${status}`, String(status))
  }

  const getStatusSeverity = (): string => {
    const status = currentRma.value?.status
    if (status === 'completed') return 'success'
    if (status === 'in_progress' || status === 'shipment_received') return 'info'
    return 'secondary'
  }

  onMounted(async () => {
    loading.value = true
    const id = route.params.id as string
    await rmaStore.fetchRmaById(id)
    loading.value = false
  })
</script>
