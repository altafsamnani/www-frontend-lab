<template>
  <RightLayout :title="$t('users.viewTitle')" :subtitle="$t('users.viewSubtitle')">
    <!-- Back Button -->
    <template #actions>
      <router-link :to="{ name: 'users' }">
        <SecondaryButton type="button" size="small">
          <i class="pi pi-arrow-left mr-2"></i>
          {{ $t('common.back') }}
        </SecondaryButton>
      </router-link>
    </template>

    <!-- Loading State -->
    <LoaderForm v-if="loading" :columns="2" :rows="6" />

    <!-- User Details -->
    <div v-else-if="currentUser" class="flex flex-col gap-8">
      <!-- User Information Card -->
      <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-6">
        <div class="mb-6 flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div
              class="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
            >
              {{ userInitials }}
            </div>
            <div>
              <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
                {{ currentUser.firstName }} {{ currentUser.lastName }}
              </h2>
              <p class="text-surface-500">{{ currentUser.email }}</p>
            </div>
          </div>
          <Tag
            :value="currentUser.approvedAt ? $t('users.approved') : $t('users.pending')"
            :severity="currentUser.approvedAt ? 'success' : 'warn'"
          />
        </div>

        <Divider />

        <div class="mt-6 grid grid-cols-12 gap-6">
          <!-- First Name -->
          <div class="col-span-12 md:col-span-6">
            <label class="text-surface-500 dark:text-surface-400 mb-1 block text-sm">
              {{ $t('users.firstName') }}
            </label>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ currentUser.firstName || '-' }}
            </p>
          </div>

          <!-- Last Name -->
          <div class="col-span-12 md:col-span-6">
            <label class="text-surface-500 dark:text-surface-400 mb-1 block text-sm">
              {{ $t('users.lastName') }}
            </label>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ currentUser.lastName || '-' }}
            </p>
          </div>

          <!-- Email -->
          <div class="col-span-12 md:col-span-6">
            <label class="text-surface-500 dark:text-surface-400 mb-1 block text-sm">
              {{ $t('users.email') }}
            </label>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              <a :href="`mailto:${currentUser.email}`" class="text-primary hover:underline">
                {{ currentUser.email }}
              </a>
            </p>
          </div>

          <!-- Mobile -->
          <div class="col-span-12 md:col-span-6">
            <label class="text-surface-500 dark:text-surface-400 mb-1 block text-sm">
              {{ $t('users.mobile') }}
            </label>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              <span v-if="currentUser.mobile">
                <span v-if="currentUser.countrycode">{{ currentUser.countrycode }} </span>
                {{ currentUser.mobile }}
              </span>
              <span v-else>-</span>
            </p>
          </div>

          <!-- Country Code -->
          <div class="col-span-12 md:col-span-6">
            <label class="text-surface-500 dark:text-surface-400 mb-1 block text-sm">
              {{ $t('users.countryCode') }}
            </label>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ currentUser.countrycode || '-' }}
            </p>
          </div>

          <!-- Status -->
          <div class="col-span-12 md:col-span-6">
            <label class="text-surface-500 dark:text-surface-400 mb-1 block text-sm">
              {{ $t('users.status') }}
            </label>
            <Tag
              :value="currentUser.approvedAt ? $t('users.approved') : $t('users.pending')"
              :severity="currentUser.approvedAt ? 'success' : 'warn'"
            />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3">
        <router-link :to="{ name: 'users' }">
          <SecondaryButton type="button">
            {{ $t('common.back') }}
          </SecondaryButton>
        </router-link>
        <router-link :to="{ name: 'users-edit', params: { id: currentUser.id } }">
          <Button type="button">
            <i class="pi pi-pencil mr-2"></i>
            {{ $t('common.edit') }}
          </Button>
        </router-link>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="py-8 text-center">
      <i class="pi pi-exclamation-triangle mb-4 text-4xl text-red-500"></i>
      <p class="text-surface-600 dark:text-surface-400">{{ $t('users.messages.loadError') }}</p>
      <Button @click="loadUser" class="mt-4">
        {{ $t('common.retry') }}
      </Button>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useCompanyUsersStore } from '@/stores/companyUsers'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { storeToRefs } from 'pinia'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import Button from '@/volt/Button.vue'
  import SecondaryButton from '@/volt/SecondaryButton.vue'
  import Tag from 'primevue/tag'
  import Divider from 'primevue/divider'

  const { t } = useI18n()
  const route = useRoute()
  const notifyStore = useNotifyStore()
  const companyUsersStore = useCompanyUsersStore()
  const { currentUser, loading } = storeToRefs(companyUsersStore)

  const userInitials = computed(() => {
    if (currentUser.value?.firstName && currentUser.value?.lastName) {
      return `${currentUser.value.firstName.charAt(0)}${currentUser.value.lastName.charAt(0)}`.toUpperCase()
    }
    return 'U'
  })

  const loadUser = async () => {
    const id = Number(route.params.id)
    if (!id) return

    try {
      await companyUsersStore.fetchUser(id)
    } catch (error) {
      notifyStore.notify(t('users.messages.loadError'), NotificationType.Error)
    }
  }

  onMounted(() => {
    loadUser()
  })

  onUnmounted(() => {
    companyUsersStore.clearCurrentUser()
  })
</script>
