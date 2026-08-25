<template>
  <DataTable
    :value="rmas"
    dataKey="id"
    :rows="10"
    :paginator="rmas.length > 10"
    v-model:expandedRows="expandedRows"
    tableStyle="table-layout: fixed; width: 100%"
    class="rma-datatable"
  >
    <Column field="id" :header="$t('rma.fields.rmaNumber')">
      <template #body="{ data }">
        <router-link
          :to="{ name: data.isDraft ? 'RmaEdit' : 'RmaView', params: { id: data.id } }"
          class="text-primary font-semibold hover:underline"
        >
          {{ data.isDraft ? $t('rma.draft') : `RMA-${data.id}` }}
        </router-link>
      </template>
    </Column>
    <Column field="totalItems" :header="$t('rma.fields.items')">
      <template #body="{ data }">
        {{ data.totalItems }}
      </template>
    </Column>
    <Column field="reference" :header="$t('rma.fields.reference')">
      <template #body="{ data }">
        {{ data.reference || '-' }}
      </template>
    </Column>
    <Column field="status" :header="$t('rma.fields.status')">
      <template #body="{ data }">
        <Tag :value="getStatusLabel(data)" :severity="getStatusSeverity(data)" />
      </template>
    </Column>
    <Column :header="$t('common.actions')" style="width: 9rem">
      <template #body="{ data }">
        <div class="flex gap-1">
          <router-link v-if="!data.isDraft" :to="{ name: 'RmaView', params: { id: data.id } }">
            <Button size="small" severity="secondary" text rounded :aria-label="$t('common.view')">
              <i class="pi pi-eye"></i>
            </Button>
          </router-link>
          <router-link v-if="data.isDraft" :to="{ name: 'RmaEdit', params: { id: data.id } }">
            <Button size="small" severity="info" text rounded :aria-label="$t('common.edit')">
              <i class="pi pi-pencil"></i>
            </Button>
          </router-link>
          <Button
            v-if="data.isDraft"
            size="small"
            severity="danger"
            text
            rounded
            :aria-label="$t('common.delete')"
            @click="handleDelete(data.id)"
          >
            <i class="pi pi-trash"></i>
          </Button>
        </div>
      </template>
    </Column>
    <Column :expander="true" style="width: 3rem" />

    <template #expansion="{ data }">
      <div class="bg-surface-50 dark:bg-surface-800/40 p-4">
        <div
          v-if="!data.items || !data.items.length"
          class="text-surface-400 dark:text-surface-500 flex flex-col items-center justify-center py-6"
        >
          <i class="pi pi-inbox mb-2 text-2xl"></i>
          <p>{{ $t('rma.noItems') }}</p>
        </div>
        <div v-else class="flex flex-col gap-3">
          <div
            v-for="item in data.items"
            :key="item.id"
            class="border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 overflow-hidden rounded-lg border"
          >
            <div class="flex flex-wrap items-start gap-x-3 gap-y-1 px-4 pt-4">
              <span class="pi pi-box text-surface-400 dark:text-surface-500 mt-0.5 shrink-0"></span>
              <h5
                class="text-surface-900 dark:text-surface-0 min-w-0 flex-1 leading-snug font-semibold break-words"
              >
                {{ item.productName || '-' }}
              </h5>
              <span
                class="bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium"
              >
                {{ $t('rma.fields.sku') }}: {{ item.articleNo || '-' }}
              </span>
            </div>

            <dl class="flex flex-wrap gap-x-10 gap-y-3 px-4 pt-3 pb-4 pl-11">
              <div class="flex flex-col gap-1">
                <dt
                  class="text-surface-400 dark:text-surface-500 text-xs font-medium tracking-wide uppercase"
                >
                  {{ $t('rma.fields.quantity') }}
                </dt>
                <dd class="text-surface-700 dark:text-surface-300 text-sm font-medium">
                  {{ item.quantity ?? 0 }}
                </dd>
              </div>
              <div class="flex min-w-0 flex-1 flex-col items-start gap-1">
                <dt
                  class="text-surface-400 dark:text-surface-500 text-xs font-medium tracking-wide uppercase"
                >
                  {{ $t('rma.fields.reason') }}
                </dt>
                <dd>
                  <Tag
                    :value="
                      $t(
                        `rmaConfig.rma_reasons.${getReasonCode(item.reason)}`,
                        getReasonCode(item.reason)
                      )
                    "
                    severity="info"
                    class="text-left whitespace-normal"
                  />
                </dd>
              </div>
            </dl>

            <div
              v-if="item.customerNote"
              class="border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/40 border-t px-4 py-3 pl-11"
            >
              <p
                class="text-surface-400 dark:text-surface-500 mb-1 text-xs font-medium tracking-wide uppercase"
              >
                {{ $t('rma.fields.customerNote') }}
              </p>
              <p class="text-surface-700 dark:text-surface-300 text-sm break-words">
                {{ item.customerNote }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRmaStore } from '@/stores/rmas'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import type { Rma } from '@/types/Rma'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Tag from 'primevue/tag'

  defineProps<{
    rmas: Rma[]
  }>()

  const { t } = useI18n()
  const rmaStore = useRmaStore()
  const notifyStore = useNotifyStore()
  const expandedRows = ref({})

  const getReasonCode = (reason: string | number | null): string => {
    if (!reason) return 'unknown'
    return String(reason)
  }

  const getStatusLabel = (rma: Rma): string => {
    if (rma.isDraft) return t('rma.status.draft')
    if (!rma.status) return '-'
    return t(`rmaConfig.rma_main_statuses.${rma.status}`, String(rma.status))
  }

  const getStatusSeverity = (rma: Rma): string => {
    if (rma.isDraft) return 'warn'
    if (rma.status === 'completed') return 'success'
    if (rma.status === 'in_progress' || rma.status === 'shipment_received') return 'info'
    return 'secondary'
  }

  const handleDelete = async (id: string) => {
    await rmaStore.removeRma(id)
    notifyStore.notify(t('rma.messages.deleteSuccess'), NotificationType.Success)
  }
</script>
