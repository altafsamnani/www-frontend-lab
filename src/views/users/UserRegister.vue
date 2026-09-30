<template>
  <RightLayout :title="$t('users.createTitle')" :subtitle="$t('users.createSubtitle')">
    <!-- Back Button -->
    <template #actions>
      <router-link :to="{ name: 'users' }">
        <SecondaryButton type="button" size="small">
          <i class="pi pi-arrow-left mr-2"></i>
          {{ $t('common.back') }}
        </SecondaryButton>
      </router-link>
    </template>

    <!-- Create User Form -->
    <vee-form
      class="flex flex-col gap-8"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <!-- Personal Information Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-user text-primary text-lg"></i>
          </div>
          <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
            {{ $t('users.personalInfo') }}
          </h3>
        </div>

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
              v-model="form.firstname"
              :placeholder="$t('register.firstNamePlaceholder')"
              maxlength="100"
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
              v-model="form.lastname"
              :placeholder="$t('register.lastNamePlaceholder')"
              maxlength="100"
            />
            <ErrorMessage class="error text-sm text-red-500" name="lastName" />
          </div>

          <!-- Email -->
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('users.email') }} *
            </label>
            <vee-field
              as="InputText"
              name="email"
              id="email"
              type="email"
              class="w-full"
              v-model="form.email"
              :placeholder="$t('register.emailPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="email" />
          </div>

          <!-- Position -->
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="position" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('users.position') }}
            </label>
            <vee-field
              as="InputText"
              name="position"
              id="position"
              class="w-full"
              v-model="form.position"
              :placeholder="$t('users.positionPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="position" />
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-phone text-primary text-lg"></i>
          </div>
          <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
            {{ $t('users.contactInfo') }}
          </h3>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <!-- Mobile -->
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="mobile" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('users.mobile') }}
            </label>
            <vee-field
              as="InputText"
              name="mobile"
              id="mobile"
              class="w-full"
              v-model="form.mobile"
              :placeholder="$t('register.mobilePlaceholder')"
              maxlength="20"
            />
            <ErrorMessage class="error text-sm text-red-500" name="mobile" />
          </div>
        </div>
      </div>

      <!-- Role Section (Manager/Admin only) -->
      <div v-if="isManagerOrAdmin" class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-id-card text-primary text-lg"></i>
          </div>
          <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
            {{ $t('users.roleSection') }}
          </h3>
        </div>

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

      <!-- Additional Notes Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-info-circle text-primary text-lg"></i>
          </div>
          <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
            {{ $t('register.additionalInfo') }}
          </h3>
        </div>

        <div class="flex flex-col gap-2">
          <label for="comments" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('register.comments') }}
          </label>
          <vee-field
            as="Textarea"
            name="comments"
            id="comments"
            class="w-full"
            rows="3"
            v-model="form.comments"
            :placeholder="$t('register.commentsPlaceholder')"
            maxlength="255"
          />
          <ErrorMessage class="error text-sm text-red-500" name="comments" />
        </div>
      </div>

      <!-- Info Notice -->
      <div
        class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
      >
        <div class="flex items-start gap-3">
          <i class="pi pi-info-circle mt-0.5 text-lg text-blue-600 dark:text-blue-400"></i>
          <div class="text-sm text-blue-800 dark:text-blue-200">
            <p class="mb-1 font-medium">{{ $t('userApplications.title') }}</p>
            <p>{{ $t('userApplications.confirmApproveMessage') }}</p>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="border-surface-200 dark:border-surface-700 flex justify-end gap-3 border-t pt-4">
        <router-link :to="{ name: 'users' }">
          <SecondaryButton type="button">
            {{ $t('common.cancel') }}
          </SecondaryButton>
        </router-link>
        <Button type="submit" :loading="submitting" :disabled="submitting">
          <i class="pi pi-user-plus mr-2"></i>
          {{ $t('users.addUser') }}
        </Button>
      </div>
    </vee-form>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useUserApplicationsStore } from '@/stores/userApplications'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { useRoles } from '@/composables/useRoles'
  import type { UserApplicationInput } from '@/types/Application'
  import RightLayout from '@/layouts/RightLayout.vue'
  import Button from '@/volt/Button.vue'
  import SecondaryButton from '@/volt/SecondaryButton.vue'
  import Select from 'primevue/select'
  import Textarea from 'primevue/textarea'

  const { t } = useI18n()
  const router = useRouter()
  const notifyStore = useNotifyStore()
  const userApplicationsStore = useUserApplicationsStore()
  const { isManagerOrAdmin } = useRoles()

  const submitting = ref(false)

  // Role options for the dropdown
  const roleOptions = computed(() => [
    { label: t('users.roleStandard'), value: 'standard' },
    { label: t('users.roleInstaller'), value: 'installer' },
    { label: t('users.roleSeller'), value: 'seller' },
    { label: t('users.roleBuyer'), value: 'buyer' },
    { label: t('users.roleManager'), value: 'manager' },
  ])

  const validationSchema = reactive({
    firstName: 'required|min:2|max:100',
    lastName: 'required|min:2|max:100',
    email: 'required|email|max:255',
    position: 'max:255',
    mobile: 'max:20',
    comments: 'max:255',
  })

  const form = reactive<UserApplicationInput>({
    type: 'user_create',
    firstname: '',
    lastname: '',
    email: '',
    position: '',
    mobile: '',
    comments: '',
    role: 'standard',
  })

  const handleSubmit = async () => {
    submitting.value = true
    try {
      await userApplicationsStore.createApplication(form)
      notifyStore.notify(t('users.messages.createSuccess'), NotificationType.Success)
      router.push({ name: 'users' })
    } catch (error) {
      notifyStore.notify(t('users.messages.createError'), NotificationType.Error)
    } finally {
      submitting.value = false
    }
  }
</script>
