<template>
  <RightLayout :title="$t('userApplications.title')" :subtitle="$t('userApplications.subtitle')">
    <!-- Actions Header -->
    <template #actions>
      <router-link :to="{ name: 'users' }">
        <SecondaryButton type="button" size="small">
          <i class="pi pi-arrow-left mr-2"></i>
          {{ $t('userApplications.backToUsers') }}
        </SecondaryButton>
      </router-link>
    </template>

    <div class="my-4 w-full">
      <DataTable
        ref="dt"
        :value="applications"
        :loading="isLoading"
        size="small"
        lazy
        dataKey="id"
        :paginator="totalRecords > 0"
        :first="first"
        :rows="25"
        :totalRecords="totalRecords"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :currentPageReportTemplate="
          $t('common.paginatorTemplate', {
            first: '{first}',
            last: '{last}',
            total: '{totalRecords}',
          })
        "
        :rowsPerPageOptions="[10, 25, 50]"
        class="p-datatable-sm"
        @sort="onSort($event)"
        @page="onPage($event)"
      >
        <template #empty>
          <div class="py-12 text-center">
            <i class="pi pi-inbox text-surface-400 mb-4 text-5xl"></i>
            <p class="text-surface-600 dark:text-surface-400 mb-2 text-lg font-medium">
              {{ $t('userApplications.noApplications') }}
            </p>
            <p class="text-surface-500 dark:text-surface-500 text-sm">
              {{ $t('userApplications.noApplicationsDescription') }}
            </p>
          </div>
        </template>

        <Column
          field="firstname"
          sortable
          :header="$t('users.firstName')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            <span class="font-semibold">{{ slotProps.data.firstname }}</span>
          </template>
        </Column>

        <Column
          field="lastname"
          sortable
          :header="$t('users.lastName')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            {{ slotProps.data.lastname }}
          </template>
        </Column>

        <Column
          field="email"
          sortable
          :header="$t('users.email')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            <a
              :href="`mailto:${slotProps.data.email}`"
              class="text-primary hover:underline"
              @click.stop
            >
              {{ slotProps.data.email }}
            </a>
          </template>
        </Column>

        <Column
          field="position"
          :header="$t('users.position')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            {{ slotProps.data.position || '-' }}
          </template>
        </Column>

        <Column
          field="mobile"
          :header="$t('users.mobile')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            {{ slotProps.data.mobile || '-' }}
          </template>
        </Column>

        <Column
          field="createdAt"
          sortable
          :header="$t('userApplications.submittedAt')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            {{
              slotProps.data.createdAt
                ? dayjs(slotProps.data.createdAt).format('DD-MM-YYYY HH:mm')
                : '-'
            }}
          </template>
        </Column>

        <Column
          :exportable="false"
          style="min-width: 10rem"
          bodyClass="text-center"
          :header="$t('common.actions')"
          headerClass="text-xs uppercase"
        >
          <template #body="slotProps">
            <div
              class="flex justify-center gap-2"
              v-if="!slotProps.data.acceptedAt && !slotProps.data.deletedAt"
            >
              <Button
                icon="pi pi-check"
                rounded
                size="small"
                severity="success"
                v-tooltip.top="$t('userApplications.approve')"
                @click.stop="confirmApprove(slotProps.data)"
              />
              <Button
                icon="pi pi-times"
                rounded
                severity="secondary"
                size="small"
                v-tooltip.top="$t('userApplications.deny')"
                @click.stop="confirmDeny(slotProps.data)"
              />
            </div>
            <div v-else-if="slotProps.data.acceptedAt">
              <Tag
                :value="$t('userApplications.statusApproved')"
                severity="success"
                class="text-xs"
              />
            </div>
            <div v-else-if="slotProps.data.deletedAt">
              <Tag :value="$t('userApplications.statusDenied')" severity="danger" class="text-xs" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Approve Confirmation Dialog -->
    <Dialog
      v-model:visible="showApproveDialog"
      modal
      :header="$t('userApplications.confirmApproveTitle')"
      :style="{ width: '500px' }"
    >
      <div class="flex flex-col gap-4">
        <div class="bg-surface-100 dark:bg-surface-800 flex items-center gap-4 rounded-lg p-4">
          <div
            class="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
          >
            {{
              selectedApplication
                ? getInitials(selectedApplication.firstname, selectedApplication.lastname)
                : ''
            }}
          </div>
          <div>
            <p class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
              {{ selectedApplication?.firstname }} {{ selectedApplication?.lastname }}
            </p>
            <p class="text-surface-500 text-sm">{{ selectedApplication?.email }}</p>
          </div>
        </div>

        <div
          class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
        >
          <div class="flex items-start gap-3">
            <i class="pi pi-info-circle mt-0.5 text-lg text-blue-600 dark:text-blue-400"></i>
            <p class="text-sm text-blue-800 dark:text-blue-200">
              {{ $t('userApplications.confirmApproveMessage') }}
            </p>
          </div>
        </div>
      </div>
      <template #footer>
        <SecondaryButton @click="showApproveDialog = false" :disabled="isApproving">
          {{ $t('common.cancel') }}
        </SecondaryButton>
        <Button
          @click="handleApprove"
          :loading="isApproving"
          :disabled="isApproving"
          severity="success"
        >
          <i class="pi pi-check mr-2" v-if="!isApproving"></i>
          {{ isApproving ? $t('userApplications.approving') : $t('userApplications.approve') }}
        </Button>
      </template>
    </Dialog>

    <!-- Deny Confirmation Dialog -->
    <Dialog
      v-model:visible="showDenyDialog"
      modal
      :header="$t('userApplications.confirmDenyTitle')"
      :style="{ width: '450px' }"
    >
      <div class="flex flex-col gap-4">
        <p class="text-surface-700 dark:text-surface-300">
          {{ $t('userApplications.confirmDenyMessage') }}
        </p>

        <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4">
          <p class="text-surface-900 dark:text-surface-0 font-semibold">
            {{ selectedApplication?.firstname }} {{ selectedApplication?.lastname }}
          </p>
          <p class="text-surface-500 text-sm">{{ selectedApplication?.email }}</p>
        </div>
      </div>
      <template #footer>
        <SecondaryButton @click="showDenyDialog = false" :disabled="isDenying">
          {{ $t('common.cancel') }}
        </SecondaryButton>
        <Button @click="handleDeny" :loading="isDenying" :disabled="isDenying" severity="danger">
          <i class="pi pi-times mr-2" v-if="!isDenying"></i>
          {{ isDenying ? $t('userApplications.denying') : $t('userApplications.deny') }}
        </Button>
      </template>
    </Dialog>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { storeToRefs } from 'pinia'
  import { useUserApplicationsStore } from '@/stores/userApplications'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import type { Application } from '@/types/Application'
  import RightLayout from '@/layouts/RightLayout.vue'
  import DataTable from 'primevue/datatable'
  import type { DataTableSortEvent } from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import SecondaryButton from '@/volt/SecondaryButton.vue'
  import Tag from 'primevue/tag'
  import Dialog from 'primevue/dialog'
  import dayjs from 'dayjs'

  const { t } = useI18n()
  const notifyStore = useNotifyStore()
  const userApplicationsStore = useUserApplicationsStore()
  const { applications, applicationsExtra } = storeToRefs(userApplicationsStore)

  const isLoading = ref(true)
  const totalRecords = ref(0)
  const first = ref(0)
  const showApproveDialog = ref(false)
  const showDenyDialog = ref(false)
  const selectedApplication = ref<Application | null>(null)
  const isApproving = ref(false)
  const isDenying = ref(false)

  const initialParams = reactive({
    order: [{ field: 'createdAt', dir: 'desc' }],
    page: { number: 1, size: 25 },
    status: 'pending',
  })

  const params = reactive({ ...initialParams })

  const initialLazyParams = {
    first: 0,
    rows: 25,
    sortField: 'createdAt',
    sortOrder: -1,
  }

  const lazyParams = ref({ ...initialLazyParams })

  const getInitials = (firstName?: string, lastName?: string): string => {
    const first = firstName?.charAt(0) || ''
    const last = lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || 'U'
  }

  const onPage = (event: any) => {
    lazyParams.value = event
    loadLazyData(event)
  }

  const onSort = (event: DataTableSortEvent) => {
    lazyParams.value = event as any
    loadLazyData(lazyParams.value)
  }

  const loadLazyData = async (event: { first?: number } = {}) => {
    isLoading.value = true
    lazyParams.value = { ...lazyParams.value, first: event?.first || first.value }
    setParams()
    try {
      await userApplicationsStore.fetchApplications(params)
      totalRecords.value = (applicationsExtra.value as any)?.totalCount || 0
    } catch {
      notifyStore.notify(t('userApplications.messages.loadError'), NotificationType.Error)
    } finally {
      isLoading.value = false
    }
  }

  const setParams = () => {
    params.page.number = lazyParams.value.first / lazyParams.value.rows + 1
    params.page.size = lazyParams.value.rows
    if (lazyParams.value.sortField) {
      params.order[0].field = lazyParams.value.sortField
      params.order[0].dir = lazyParams.value.sortOrder == 1 ? 'asc' : 'desc'
    }
  }

  const confirmApprove = (application: Application) => {
    selectedApplication.value = application
    showApproveDialog.value = true
  }

  const confirmDeny = (application: Application) => {
    selectedApplication.value = application
    showDenyDialog.value = true
  }

  const handleApprove = async () => {
    if (!selectedApplication.value?.id) return

    isApproving.value = true
    try {
      await userApplicationsStore.acceptApplication(selectedApplication.value.id)
      showApproveDialog.value = false
      selectedApplication.value = null
      notifyStore.notify(t('userApplications.messages.approveSuccess'), NotificationType.Success)

      // Refresh list (pending count updates automatically via applicationsExtra.totalCount)
      await loadLazyData()
    } catch {
      notifyStore.notify(t('userApplications.messages.approveError'), NotificationType.Error)
    } finally {
      isApproving.value = false
    }
  }

  const handleDeny = async () => {
    if (!selectedApplication.value?.id) return

    isDenying.value = true
    try {
      await userApplicationsStore.denyApplication(selectedApplication.value.id)
      showDenyDialog.value = false
      selectedApplication.value = null
      notifyStore.notify(t('userApplications.messages.denySuccess'), NotificationType.Success)

      // Refresh list (pending count updates automatically via applicationsExtra.totalCount)
      await loadLazyData()
    } catch {
      notifyStore.notify(t('userApplications.messages.denyError'), NotificationType.Error)
    } finally {
      isDenying.value = false
    }
  }

  onMounted(async () => {
    lazyParams.value = { ...initialLazyParams }

    // Check if store already has data (pre-fetched from Users page)
    if (applications.value.length > 0 && applicationsExtra.value) {
      // Use existing store data
      totalRecords.value = (applicationsExtra.value as any)?.totalCount || 0
      isLoading.value = false
    } else {
      // Fetch fresh data
      await loadLazyData()
    }
  })
</script>
