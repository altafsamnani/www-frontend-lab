<template>
  <AuthLayout :title="$t('login.title')" :subtitle="$t('login.description')">
    <!-- Login Form -->
    <vee-form class="flex flex-col gap-6" :validation-schema="loginSchema" @submit="handleSubmit">
      <div class="flex flex-col gap-2">
        <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">{{
          $t('login.label_email')
        }}</label>
        <vee-field
          as="InputText"
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          placeholder="name@osec.nl"
          autocomplete="email"
          class="w-full rounded-md p-3 shadow-sm"
        />
        <ErrorMessage class="error text-sm text-red-500" name="email" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password" class="text-surface-900 dark:text-surface-0 font-medium">{{
          $t('login.label_password')
        }}</label>
        <vee-field
          as="InputText"
          type="password"
          id="password"
          name="password"
          class="w-full rounded-md p-3 shadow-sm"
          placeholder="********"
        />
        <ErrorMessage class="error text-sm text-red-500" name="password" />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Checkbox id="rememberme" v-model="rememberMe" :binary="true" />
          <label for="rememberme" class="text-surface-900 dark:text-surface-0">{{
            $t('login.remember_me')
          }}</label>
        </div>
        <a
          href="#"
          class="text-surface-500 dark:text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 cursor-pointer font-medium"
          >{{ $t('login.anchor_forgot_password') }}</a
        >
      </div>

      <Button
        type="submit"
        :label="$t('login.label_button')"
        class="w-fit !px-12"
        :loading="loginInProgress"
        :disabled="loginInProgress"
      />
    </vee-form>

    <!-- Register Links -->
    <div
      class="border-surface-200 dark:border-surface-700 flex flex-col gap-3 border-t pt-4 text-center"
    >
      <p class="text-surface-600 dark:text-surface-400">
        {{ $t('login.noAccount') }}
        <router-link to="/register" class="text-primary ml-1 font-medium hover:underline">
          {{ $t('login.registerCompany') }}
        </router-link>
      </p>
      <p class="text-surface-600 dark:text-surface-400">
        {{ $t('login.joinExistingCompany') }}
        <router-link to="/register/user" class="text-primary ml-1 font-medium hover:underline">
          {{ $t('login.registerUser') }}
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  import { useToast } from 'primevue/usetoast'
  import { useI18n } from 'vue-i18n'
  import Checkbox from 'primevue/checkbox'
  import AuthLayout from '@/layouts/AuthLayout.vue'

  const { t } = useI18n()

  const loginInProgress = ref(false)
  const rememberMe = ref(false)
  const loginSchema = reactive({
    email: 'required|email',
    password: 'required|min:8|max:100',
  })
  const form = reactive({
    email: '',
    password: '',
  })

  const toast = useToast()
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  const { accessToken } = storeToRefs(authStore)
  const { handleLogin } = authStore

  const handleSubmit = async (form: { email: string; password: string }) => {
    loginInProgress.value = true
    await handleLogin(form)
    if (accessToken.value) {
      toast.add({
        severity: 'success',
        detail: t('notification.login'),
        life: 5000,
      })
      router.push(route.query.redirect?.toString() || { name: 'home' })
      return
    }
    loginInProgress.value = false
    toast.add({
      severity: 'error',
      detail: t('notification.invalid_login'),
      life: 5000,
    })
  }
</script>
