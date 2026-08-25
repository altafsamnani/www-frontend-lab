<template>
  <RightLayout :title="$t('users.editTitle')" :subtitle="$t('users.editSubtitle')">
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
    <LoaderForm v-if="loading && !currentUser" :columns="2" :rows="6" />

    <!-- Edit Form -->
    <div v-else-if="currentUser">
      <vee-form
        class="flex flex-col gap-8"
        :validation-schema="validationSchema"
        @submit="handleSubmit"
      >
        <!-- User Information Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('users.personalInfo') }}
          </h3>

          <div class="grid grid-cols-12 gap-6">
            <!-- First Name -->
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="firstName" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.firstName') }} *
              </label>
              <vee-field
                as="InputText"
                name="firstName"
                id="firstName"
                class="w-full"
                v-model="form.firstName"
              />
              <ErrorMessage class="error text-sm text-red-500" name="firstName" />
            </div>

            <!-- Last Name -->
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="lastName" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.lastName') }} *
              </label>
              <vee-field
                as="InputText"
                name="lastName"
                id="lastName"
                class="w-full"
                v-model="form.lastName"
              />
              <ErrorMessage class="error text-sm text-red-500" name="lastName" />
            </div>
          </div>

          <!-- Email (Read-only) -->
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.email') }}
              </label>
              <InputText
                id="email"
                class="bg-surface-100 dark:bg-surface-800 w-full"
                :model-value="currentUser.email"
                disabled
              />
              <span class="text-surface-500 text-xs">{{ $t('users.emailCannotBeChanged') }}</span>
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('users.contactInfo') }}
          </h3>

          <div class="grid grid-cols-12 gap-6">
            <!-- Country Code -->
            <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
              <label for="countrycode" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.countryCode') }}
              </label>
              <vee-field
                as="InputText"
                name="countrycode"
                id="countrycode"
                class="w-full"
                v-model="form.countrycode"
                placeholder="+31"
              />
              <ErrorMessage class="error text-sm text-red-500" name="countrycode" />
            </div>

            <!-- Mobile -->
            <div class="col-span-12 flex flex-col gap-2 md:col-span-8">
              <label for="mobile" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.mobile') }}
              </label>
              <vee-field
                as="InputText"
                name="mobile"
                id="mobile"
                class="w-full"
                v-model="form.mobile"
                :placeholder="$t('users.mobilePlaceholder')"
              />
              <ErrorMessage class="error text-sm text-red-500" name="mobile" />
            </div>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('users.preferences') }}
          </h3>

          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="locale" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.locale') }}
              </label>
              <vee-field name="locale" v-model="form.locale" v-slot="{ value, setValue }">
                <Select
                  :model-value="value"
                  @update:model-value="setValue"
                  :options="localeOptions"
                  optionLabel="label"
                  optionValue="value"
                  :placeholder="$t('users.selectLocale')"
                  class="w-full"
                />
              </vee-field>
              <span class="text-surface-500 text-xs">{{ $t('users.localeDescription') }}</span>
            </div>
          </div>
        </div>

        <!-- Role Section (Manager/Admin only) -->
        <div v-if="isManagerOrAdmin" class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('users.roleSection') }}
          </h3>

          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
              <label for="role" class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('users.role') }}
              </label>
              <Select
                id="role"
                v-model="form.role"
                :options="roleOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('users.selectRole')"
                class="w-full"
              />
              <span class="text-surface-500 text-xs">{{ $t('users.roleHint') }}</span>
            </div>
          </div>
        </div>

        <!-- Status Information (Read-only) -->
        <div class="flex flex-col gap-6">
          <h3
            class="text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 border-b pb-2 text-lg font-semibold"
          >
            {{ $t('users.statusInfo') }}
          </h3>

          <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
            <div class="flex items-center gap-4">
              <label class="text-surface-500 text-sm">{{ $t('users.status') }}:</label>
              <Tag
                :value="currentUser.approvedAt ? $t('users.approved') : $t('users.pending')"
                :severity="currentUser.approvedAt ? 'success' : 'warn'"
              />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div
          class="border-surface-200 dark:border-surface-700 flex justify-end gap-3 border-t pt-4"
        >
          <router-link :to="{ name: 'users' }">
            <SecondaryButton type="button">
              {{ $t('common.cancel') }}
            </SecondaryButton>
          </router-link>
          <Button type="submit" :loading="saving">
            <i class="pi pi-check mr-2"></i>
            {{ $t('common.save') }}
          </Button>
        </div>
      </vee-form>
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
  import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useForm } from 'vee-validate'
  import { useCompanyUsersStore } from '@/stores/companyUsers'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useRoles } from '@/composables/useRoles'
  import { storeToRefs } from 'pinia'
  import type { CompanyUserUpdate } from '@/types/User'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import Button from '@/volt/Button.vue'
  import SecondaryButton from '@/volt/SecondaryButton.vue'
  import InputText from 'primevue/inputtext'
  import Select from 'primevue/select'
  import Tag from 'primevue/tag'
  import { getSupportedLocales } from '@/includes/helpers'

  const { t } = useI18n()

  // Locale options for dropdown
  const localeOptions = computed(() => getSupportedLocales(t))
  const route = useRoute()
  const router = useRouter()
  const notifyStore = useNotifyStore()
  const companyUsersStore = useCompanyUsersStore()
  const { currentUser, loading } = storeToRefs(companyUsersStore)
  const { isManagerOrAdmin } = useRoles()

  const saving = ref(false)

  // Role options for the dropdown
  const roleOptions = computed(() => [
    { label: t('users.roleStandard'), value: 'standard' },
    { label: t('users.roleInstaller'), value: 'installer' },
    { label: t('users.roleSeller'), value: 'seller' },
    { label: t('users.roleBuyer'), value: 'buyer' },
    { label: t('users.roleManager'), value: 'manager' },
  ])

  const validationSchema = reactive({
    firstName: 'required|min:2|max:50',
    lastName: 'required|min:2|max:50',
    countrycode: 'max:10',
    mobile: 'max:20',
  })

  const form = reactive<CompanyUserUpdate>({
    firstName: '',
    lastName: '',
    countrycode: '',
    mobile: '',
    locale: 'nl',
    role: 'standard',
  })

  const { setValues } = useForm({
    validationSchema,
    initialValues: form,
  })

  const getUserRole = (roles?: { name: string; guard_name: string }[]): string => {
    if (!roles || roles.length === 0) return 'standard'
    // Find web guard role
    const webRole = roles.find((r) => r.guard_name === 'web')
    if (webRole) {
      const validRoles = ['standard', 'installer', 'seller', 'buyer', 'manager']
      if (validRoles.includes(webRole.name)) return webRole.name
    }
    return 'standard'
  }

  const loadUser = async () => {
    const id = Number(route.params.id)
    if (!id) return

    try {
      const user = await companyUsersStore.fetchUser(id)
      if (user) {
        Object.assign(form, {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          countrycode: user.countrycode || '',
          mobile: user.mobile || '',
          locale: user.locale || 'nl',
          role: getUserRole(user.roles),
        })
        setValues(form)
      }
    } catch (error) {
      notifyStore.notify(t('users.messages.loadError'), NotificationType.Error)
    }
  }

  const handleSubmit = async (validatedData: CompanyUserUpdate) => {
    const id = Number(route.params.id)
    if (!id) return

    saving.value = true
    try {
      await companyUsersStore.updateUser(id, validatedData)
      notifyStore.notify(t('users.messages.updateSuccess'), NotificationType.Success)
      router.push({ name: 'users' })
    } catch (error) {
      notifyStore.notify(t('users.messages.updateError'), NotificationType.Error)
    } finally {
      saving.value = false
    }
  }

  onMounted(() => {
    loadUser()
  })

  onUnmounted(() => {
    companyUsersStore.clearCurrentUser()
  })
</script>
