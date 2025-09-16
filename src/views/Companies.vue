<template>
  <RightLayout :title="$t('companies.title_listing')" :subtitle="$t('companies.subtitle')">
    <div v-if="isLoading" class="flex justify-center py-4">
      <LoaderView />
    </div>

    <div v-else class="flex flex-col gap-6">
      <!-- Search and Filter Bar -->
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div class="flex-1">
          <InputText
            v-model.trim="searchArg"
            :placeholder="$t('companies.search')"
            @keyup.enter="onFilter"
            class="w-full"
          />
        </div>
        <div class="flex gap-2">
          <Dropdown
            v-model="selectedStatus"
            :options="statusOptions"
            optionLabel="name"
            optionValue="value"
            :placeholder="$t('common.status')"
            showClear
            class="w-40"
            @update:modelValue="handleStatusChange"
          />
          <Button @click="onFilter" icon="pi pi-search" :label="$t('companies.search')" />
          <Button
            @click="resetSearch"
            icon="pi pi-filter-slash"
            :label="$t('companies.reset')"
            severity="secondary"
          />
        </div>
      </div>

      <!-- Companies DataTable -->
      <DataTable
        ref="dt"
        :value="companies"
        :loading="isLoading"
        scrollable
        scrollHeight="60vh"
        size="small"
        lazy
        resizableColumns
        columnResizeMode="fit"
        dataKey="id"
        :paginator="isPaginatorVisible()"
        :paginatorAlwaysVisible="false"
        :first="first"
        :rows="10"
        :totalRecords="totalRecords"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :rowsPerPageOptions="[10, 25, 50]"
        class="p-datatable-sm"
        @row-click="goToCompanyEdit"
        @sort="onSort($event)"
        @page="onPage($event)"
      >
        <template #empty>{{ $t('companies.noCompanies') }}</template>
        <template #loading>{{ $t('common.loading') }}</template>

        <Column
          field="companyName"
          sortable
          :header="$t('companies.companyName')"
          style="width: 25%"
        >
          <template #body="slotProps">
            <span class="font-medium">{{ slotProps.data.companyName }}</span>
          </template>
        </Column>
        
        <Column
          field="street"
          sortable
          :header="$t('companies.street')"
        >
          <template #body="slotProps">
            {{ slotProps.data.street }}
          </template>
        </Column>
        
        <Column
          field="number"
          sortable
          :header="$t('companies.number')"
          style="width: 10%"
        >
          <template #body="slotProps">
            {{ slotProps.data.number }}{{ slotProps.data.numberExt ? ` ${slotProps.data.numberExt}` : '' }}
          </template>
        </Column>
        
        <Column
          field="city"
          sortable
          :header="$t('companies.city')"
        >
          <template #body="slotProps">
            {{ slotProps.data.city }}
          </template>
        </Column>
        
        <Column
          field="updatedAt"
          sortable
          :header="$t('companies.updated_at')"
          style="width: 12%"
        >
          <template #body="slotProps">
            <span class="text-sm text-surface-600 dark:text-surface-400">
              {{ formatDate(slotProps.data.updatedAt) }}
            </span>
          </template>
        </Column>

        <Column 
          :exportable="false" 
          style="width: 8%" 
          bodyClass="text-center"
          :header="$t('common.actions')"
        >
          <template #body="slotProps">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-text p-button-sm"
              @click.stop="goToCompanyEdit({ data: slotProps.data })" 
              v-tooltip.top="$t('common.edit')" 
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useCompanyStore } from '@/stores/companies'
import { useRoute, useRouter } from 'vue-router'
import RightLayout from '@/layouts/RightLayout.vue'
import LoaderView from '@/components/icons/LoaderView.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from '@/volt/Button.vue'
import type { DataTableRowClickEvent, DataTableSortEvent } from 'primevue/datatable'

interface LazyParams {
  first: number
  rows: number
  sortField?: string
  sortOrder?: number
}

interface Params {
  page: {
    number: number
    size: number
  }
  order: { field: string; dir: string }[]
  status: string
  filter: { key: string; op: string; value: string }[]
}

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const companyStore = useCompanyStore()
const { companies, companiesExtra } = storeToRefs(companyStore)
const { fetchAllCompanies } = companyStore

const isLoading = ref(true)
const searchArg = ref('')
const totalRecords = ref(0)
const first = ref(0)
const selectedStatus = ref('')

const statusOptions = computed(() => [
  { name: t('companies.all'), value: '' },
  { name: t('companies.deleted'), value: 'deleted' }
])

const initialParams = reactive({
  status: '',
  filter: [{}],
  order: [
    {
      field: 'updatedAt',
      dir: 'desc'
    }
  ],
  page: {
    number: 1,
    size: 10
  },
  ...route.query
})

const params = reactive({ ...initialParams })

const initialLazyParams = {
  first: 0,
  rows: 10,
  sortField: 'updatedAt',
  sortOrder: -1
}

const lazyParams = ref({ ...initialLazyParams })

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const isPaginatorVisible = () => {
  return totalRecords.value > 0
}

const goToCompanyEdit = (event: DataTableRowClickEvent) => {
  router.push({ name: 'CompanyEdit', params: { id: (event as any).data.id } })
}

const resetSearch = () => {
  lazyParams.value = { ...initialLazyParams }
  params.status = ''
  params.filter = [{}]
  searchArg.value = ''
  selectedStatus.value = ''
  loadLazyData()
}

const onPage = (event: any) => {
  lazyParams.value = event
  loadLazyData()
}

const onSort = (event: DataTableSortEvent) => {
  lazyParams.value = event as any
  loadLazyData()
}

const onFilter = () => {
  if (searchArg.value !== '') {
    params.filter = [{ key: 'name', op: 'contains', value: searchArg.value }]
  } else {
    params.filter = [{}]
  }
  loadLazyData()
}

const handleStatusChange = () => {
  params.status = selectedStatus.value || ''
  loadLazyData()
}

const loadLazyData = () => {
  isLoading.value = true
  setParams()
  
  fetchAllCompanies(params).then(() => {
    totalRecords.value = companiesExtra.value?.totalCount || 0
    isLoading.value = false
  }).catch(() => {
    isLoading.value = false
  })
}

const setParams = () => {
  params.page.number = Math.floor(lazyParams.value.first / lazyParams.value.rows) + 1
  params.page.size = lazyParams.value.rows
  
  if (lazyParams.value.sortField) {
    params.order[0].field = lazyParams.value.sortField
    params.order[0].dir = lazyParams.value.sortOrder === 1 ? 'asc' : 'desc'
  }
}

onMounted(async () => {
  await loadLazyData()
})
</script>