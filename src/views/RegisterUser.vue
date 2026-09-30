<template>
  <AuthLayout :title="$t('registerUser.title')" :subtitle="$t('registerUser.subtitle')" scrollable>
    <!-- Loading State -->
    <div v-if="isVerifyingCode" class="flex flex-col items-center justify-center py-12">
      <i class="pi pi-spin pi-spinner text-primary mb-4 text-4xl"></i>
      <p class="text-surface-600 dark:text-surface-400">{{ $t('registerUser.verifyingInvite') }}</p>
    </div>

    <!-- Registration Form -->
    <vee-form
      v-else
      class="flex flex-col gap-8"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <!-- Invite Success Banner -->
      <div
        class="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
      >
        <div class="flex items-start gap-3">
          <i class="pi pi-check-circle mt-0.5 text-lg text-green-600 dark:text-green-400"></i>
          <div class="text-sm text-green-800 dark:text-green-200">
            <p class="mb-1 font-medium">{{ $t('registerUser.inviteVerified') }}</p>
            <p>{{ $t('registerUser.inviteVerifiedMessage', { company: form.companyName }) }}</p>
            <p class="mt-1">
              <span class="font-medium">{{ $t('registerUser.assignedRole') }}:</span>
              {{ getRoleLabel(inviteRole) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-user text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('registerUser.personalInfo') }}
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="firstname" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.firstName') }} *
            </label>
            <vee-field
              as="InputText"
              name="firstname"
              id="firstname"
              class="w-full"
              v-model="form.firstname"
              :placeholder="$t('register.firstNamePlaceholder')"
              maxlength="100"
            />
            <ErrorMessage class="error text-sm text-red-500" name="firstname" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="lastname" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.lastName') }} *
            </label>
            <vee-field
              as="InputText"
              name="lastname"
              id="lastname"
              class="w-full"
              v-model="form.lastname"
              :placeholder="$t('register.lastNamePlaceholder')"
              maxlength="100"
            />
            <ErrorMessage class="error text-sm text-red-500" name="lastname" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.email') }} *
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

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="position" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.position') }}
            </label>
            <vee-field
              as="InputText"
              name="position"
              id="position"
              class="w-full"
              v-model="form.position"
              :placeholder="$t('register.positionPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="position" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="mobile" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.mobile') }}
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

      <!-- Company Information Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-building text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('registerUser.companyInfo') }}
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 flex flex-col gap-2">
            <label for="companyName" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('registerUser.companyName') }}
            </label>
            <InputText id="companyName" class="w-full" :model-value="form.companyName" disabled />
            <small class="text-green-600 dark:text-green-400">
              <i class="pi pi-check-circle mr-1"></i>
              {{ $t('registerUser.inviteLinkVerified') }}
            </small>
          </div>
        </div>
      </div>

      <!-- Additional Information Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-info-circle text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('register.additionalInfo') }}
          </h2>
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
            :placeholder="$t('registerUser.commentsPlaceholder')"
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
            <p class="mb-1 font-medium">{{ $t('registerUser.infoTitle') }}</p>
            <p>{{ $t('registerUser.infoMessage') }}</p>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="border-surface-200 dark:border-surface-700 flex flex-col gap-4 border-t pt-4">
        <Button
          type="submit"
          :loading="submitting"
          :label="$t('registerUser.submit')"
          class="w-fit px-12!"
          :disabled="submitting"
        />

        <div class="border-surface-200 dark:border-surface-700 border-t pt-4 text-center">
          <p class="text-surface-600 dark:text-surface-400">
            {{ $t('register.alreadyHaveAccount') }}
            <router-link to="/login" class="text-primary ml-1 font-medium hover:underline">
              {{ $t('register.loginHere') }}
            </router-link>
          </p>
        </div>
      </div>
    </vee-form>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { registerUser, verifyInviteCode } from '@/http/applications'
  import type { UserApplicationInput } from '@/types/Application'
  import AuthLayout from '@/layouts/AuthLayout.vue'
  import Button from '@/volt/Button.vue'
  import InputText from 'primevue/inputtext'

  const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const notifyStore = useNotifyStore()

  const submitting = ref(false)
  const isVerifyingCode = ref(true)

  const validationSchema = reactive({
    firstname: 'required|min:2|max:100',
    lastname: 'required|min:2|max:100',
    email: 'required|email|max:255',
    position: 'max:255',
    mobile: 'max:20',
    comments: 'max:255',
  })

  const inviteRole = ref<string>('standard')

  const getRoleLabel = (role: string): string => {
    const roleLabelMap: Record<string, string> = {
      standard: t('users.roleStandard'),
      installer: t('users.roleInstaller'),
      seller: t('users.roleSeller'),
      buyer: t('users.roleBuyer'),
      manager: t('users.roleManager'),
    }
    return roleLabelMap[role] || t('users.roleStandard')
  }

  const form = reactive<UserApplicationInput>({
    type: 'user_create',
    firstname: '',
    lastname: '',
    email: '',
    position: '',
    mobile: '',
    companyName: '',
    companyId: undefined,
    comments: '',
    role: 'standard',
  })

  onMounted(async () => {
    const code = route.query.code as string

    // Redirect to info page if no invite code
    if (!code) {
      router.replace({ name: 'register-user-info' })
      return
    }

    // Verify the invite code
    try {
      const { data } = await verifyInviteCode(code)
      form.companyId = data.companyId
      form.companyName = data.companyName
      form.role = data.role || 'standard'
      inviteRole.value = data.role || 'standard'
    } catch (error) {
      notifyStore.notify(t('registerUser.messages.invalidInviteCode'), NotificationType.Error)
      router.replace({ name: 'register-user-info' })
    } finally {
      isVerifyingCode.value = false
    }
  })

  const handleSubmit = async () => {
    submitting.value = true
    try {
      await registerUser(form)
      notifyStore.notify(t('registerUser.messages.submitSuccess'), NotificationType.Success)
      router.push('/login')
    } catch (error) {
      notifyStore.notify(t('registerUser.messages.submitError'), NotificationType.Error)
    } finally {
      submitting.value = false
    }
  }
</script>
