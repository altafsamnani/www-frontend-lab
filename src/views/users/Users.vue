<template>
  <RightLayout :title="$t('users.title')" :subtitle="$t('users.subtitle')">
    <!-- Actions Header -->
    <template #actions>
      <div class="flex items-center gap-3">
        <!-- Copy Invite Link Button with Dropdown -->
        <div class="relative">
          <Button
            severity="secondary"
            size="small"
            @click="showInviteMenu"
            :loading="generatingLink"
            v-tooltip.bottom="$t('users.copyInviteLinkTooltip')"
          >
            <i class="pi pi-link mr-2"></i>
            {{ $t('users.copyInviteLink') }}
            <i class="pi pi-chevron-down ml-2 text-xs"></i>
          </Button>
          <Menu ref="inviteMenuRef" :model="inviteMenuItems" :popup="true" />
        </div>

        <!-- Pending Requests Button with Badge -->
        <router-link :to="{ name: 'user-applications' }" class="relative">
          <Button
            severity="secondary"
            size="small"
            v-tooltip.bottom="$t('users.viewPendingRequests')"
          >
            <i class="pi pi-clock mr-2"></i>
            {{ $t('users.pendingRequests') }}
          </Button>
          <Badge
            v-if="pendingBadge"
            :value="pendingBadge"
            severity="danger"
            class="absolute -top-2 -right-2"
          />
        </router-link>

        <!-- Add User Button -->
        <router-link :to="{ name: 'users-register' }">
          <Button size="small">
            <i class="pi pi-user-plus mr-2"></i>
            {{ $t('users.addUser') }}
          </Button>
        </router-link>
      </div>
    </template>

    <div class="my-4 w-full">
      <DataTable
        ref="dt"
        :value="users"
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
        class="p-datatable-sm cursor-pointer"
        @row-click="onRowClick"
        @sort="onSort($event)"
        @page="onPage($event)"
        :pt="{
          bodyRow: { class: 'cursor-pointer' },
        }"
      >
        <template #empty>
          <div class="py-8 text-center">
            <i class="pi pi-users text-surface-400 mb-4 text-4xl"></i>
            <p class="text-surface-600 dark:text-surface-400">{{ $t('users.noUsersFound') }}</p>
          </div>
        </template>

        <Column
          field="firstName"
          sortable
          :header="$t('users.firstName')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            <span class="font-semibold">{{ slotProps.data.firstName }}</span>
          </template>
        </Column>

        <Column
          field="lastName"
          sortable
          :header="$t('users.lastName')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            {{ slotProps.data.lastName }}
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
          field="mobile"
          :header="$t('users.mobile')"
          headerClass="text-xs uppercase"
          class="whitespace-nowrap"
        >
          <template #body="slotProps">
            <span v-if="slotProps.data.mobile">
              <span v-if="slotProps.data.countrycode">+{{ slotProps.data.countrycode }} </span
              >{{ slotProps.data.mobile }}
            </span>
            <span v-else>-</span>
          </template>
        </Column>

        <Column
          field="approvedAt"
          :header="$t('users.status')"
          headerClass="text-xs uppercase"
          class="text-center"
          style="width: 100px"
        >
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.approvedAt ? $t('users.approved') : $t('users.pending')"
              :severity="slotProps.data.approvedAt ? 'success' : 'warn'"
              class="text-xs"
            />
          </template>
        </Column>

        <Column
          :exportable="false"
          style="min-width: 8rem"
          bodyClass="text-center"
          :header="$t('common.actions')"
          headerClass="text-xs uppercase"
        >
          <template #body="slotProps">
            <div class="flex justify-center gap-2">
              <router-link
                :to="{ name: 'users-view', params: { id: slotProps.data.id } }"
                @click.stop
              >
                <Button
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-text p-button-sm"
                  v-tooltip.top="$t('common.view')"
                />
              </router-link>
              <router-link
                :to="{ name: 'users-edit', params: { id: slotProps.data.id } }"
                @click.stop
              >
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  v-tooltip.top="$t('common.edit')"
                />
              </router-link>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { storeToRefs } from 'pinia'
  import { useCompanyUsersStore } from '@/stores/companyUsers'
  import { useUserApplicationsStore } from '@/stores/userApplications'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { getInviteLink } from '@/http/applications'
  import RightLayout from '@/layouts/RightLayout.vue'
  import DataTable from 'primevue/datatable'
  import type { DataTableRowClickEvent, DataTableSortEvent } from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import Tag from 'primevue/tag'
  import Menu from 'primevue/menu'

  const { t } = useI18n()
  const router = useRouter()
  const notifyStore = useNotifyStore()
  const companyUsersStore = useCompanyUsersStore()
  const userApplicationsStore = useUserApplicationsStore()
  const { users, usersExtra } = storeToRefs(companyUsersStore)
  const { pendingCount } = storeToRefs(userApplicationsStore)
  const { fetchUsers } = companyUsersStore

  const isLoading = ref(true)
  const totalRecords = ref(0)
  const first = ref(0)
  const generatingLink = ref(false)
  const inviteMenuRef = ref()

  const pendingBadge = computed(() => {
    const count = pendingCount.value
    return count > 0 ? String(count) : undefined
  })

  const inviteMenuItems = computed(() => [
    {
      label: t('users.inviteAsStandard'),
      icon: 'pi pi-user',
      command: () => copyInviteLink('standard'),
    },
    {
      label: t('users.inviteAsInstaller'),
      icon: 'pi pi-wrench',
      command: () => copyInviteLink('installer'),
    },
    {
      label: t('users.inviteAsSeller'),
      icon: 'pi pi-tag',
      command: () => copyInviteLink('seller'),
    },
    {
      label: t('users.inviteAsBuyer'),
      icon: 'pi pi-shopping-cart',
      command: () => copyInviteLink('buyer'),
    },
    {
      label: t('users.inviteAsManager'),
      icon: 'pi pi-star',
      command: () => copyInviteLink('manager'),
    },
  ])

  const showInviteMenu = (event: Event) => {
    inviteMenuRef.value.toggle(event)
  }

  const copyInviteLink = async (role: string = 'standard') => {
    generatingLink.value = true
    try {
      const { data } = await getInviteLink(role)
      const inviteUrl = `${window.location.origin}/register/user?code=${data.inviteCode}`
      await navigator.clipboard.writeText(inviteUrl)
      const roleLabelMap: Record<string, string> = {
        standard: t('users.roleStandard'),
        installer: t('users.roleInstaller'),
        seller: t('users.roleSeller'),
        buyer: t('users.roleBuyer'),
        manager: t('users.roleManager'),
      }
      const roleLabel = roleLabelMap[role] || t('users.roleStandard')
      notifyStore.notify(
        t('users.inviteLinkCopiedWithRole', { role: roleLabel }),
        NotificationType.Success
      )
    } catch (error) {
      notifyStore.notify(t('users.inviteLinkError'), NotificationType.Error)
    } finally {
      generatingLink.value = false
    }
  }

  const initialParams = reactive({
    order: [{ field: 'firstName', dir: 'asc' }],
    page: { number: 1, size: 25 },
  })

  const params = reactive({ ...initialParams })

  const initialLazyParams = {
    first: 0,
    rows: 25,
    sortField: 'firstName',
    sortOrder: 1,
  }

  const lazyParams = ref({ ...initialLazyParams })

  const onRowClick = (event: DataTableRowClickEvent) => {
    router.push({ name: 'users-view', params: { id: (event as any).data.id } })
  }

  const onPage = (event: any) => {
    lazyParams.value = event
    loadLazyData(event)
  }

  const onSort = (event: DataTableSortEvent) => {
    lazyParams.value = event as any
    loadLazyData(lazyParams.value)
  }

  const loadLazyData = (event: { first?: number }) => {
    isLoading.value = true
    lazyParams.value = { ...lazyParams.value, first: event?.first || first.value }
    setParams()
    fetchUsers(params).then(() => {
      totalRecords.value = usersExtra.value?.totalCount || 0
      isLoading.value = false
    })
  }

  const setParams = () => {
    params.page.number = lazyParams.value.first / lazyParams.value.rows + 1
    params.page.size = lazyParams.value.rows
    if (lazyParams.value.sortField) {
      params.order[0].field = lazyParams.value.sortField
      params.order[0].dir = lazyParams.value.sortOrder == 1 ? 'asc' : 'desc'
    }
  }

  onMounted(async () => {
    users.value = []
    lazyParams.value = { ...initialLazyParams }

    // Fetch users and pending applications in parallel
    // Applications params match UserApplications page for store reuse
    const applicationsParams = {
      order: [{ field: 'createdAt', dir: 'desc' }],
      page: { number: 1, size: 25 },
      status: 'pending',
    }

    await Promise.all([
      fetchUsers(params).then(() => {
        isLoading.value = false
        totalRecords.value = usersExtra.value?.totalCount || 0
      }),
      userApplicationsStore.fetchApplications(applicationsParams).catch(() => {
        // Silently fail if user doesn't have permission
      }),
    ])
  })
</script>
