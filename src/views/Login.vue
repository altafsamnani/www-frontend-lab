<template>
  <div class="flex w-full h-full items-center">
    <div class="flex w-full h-full">
      <!-- Left Side - Static Image -->
      <div
        class="hidden md:block w-6/12 h-full"
        style="
          background:
            linear-gradient(0deg, var(--p-primary-500) 0%, var(--p-primary-500) 100%),
            url('/src/assets/login_split.webp') lightgray 50% / cover no-repeat;
          background-blend-mode: overlay, normal;
        "
      />
      
      <!-- Right Side - Login Form -->
      <div class="bg-surface-0 dark:bg-surface-950 w-full md:w-6/12 px-8 py-20 md:px-12 lg:px-20 flex flex-col justify-center gap-12 h-full">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2 mb-4">
          <Button 
            icon="pi pi-arrow-left" 
            severity="secondary" 
            text 
            @click="goBack" 
            class="p-0" 
            :label="$t('button.back')" 
          />
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight"
            v-html="$t('login.title', { osec: 'O<span class=\'text-primary-400\'>sec</span>' })"></div>
          <div class="text-surface-700 dark:text-surface-200">{{ $t('login.description') }}</div>
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <!-- Login Form -->
        <vee-form class="flex flex-col gap-6" :validation-schema="loginSchema" @submit="handleSubmit">
          <div class="flex flex-col gap-2">
            <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">{{ $t('login.label_email') }}</label>
            <vee-field as="InputText" type="email" name="email" id="email" v-model="form.email"
              placeholder="name@osec.nl" autocomplete="email" class="w-full p-3 rounded-md shadow-sm" />
            <ErrorMessage class="error text-red-500 text-sm" name="email" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="text-surface-900 dark:text-surface-0 font-medium">{{
              $t('login.label_password')
            }}</label>
            <vee-field as="InputText" type="password" id="password" name="password"
              class="w-full p-3 rounded-md shadow-sm" placeholder="********" />
            <ErrorMessage class="error text-red-500 text-sm" name="password" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Checkbox id="rememberme" v-model="rememberMe" :binary="true" />
              <label for="rememberme" class="text-surface-900 dark:text-surface-0">{{ $t('login.remember_me') }}</label>
            </div>
            <a href="#"
              class="text-surface-500 dark:text-surface-400 font-medium cursor-pointer hover:text-surface-600 dark:hover:text-surface-300">{{
                $t('login.anchor_forgot_password')
              }}</a>
          </div>

          <Button type="submit" :label="$t('login.label_button')" class="w-fit !px-12" :loading="loginInProgress"
            :disabled="loginInProgress" />
        </vee-form>
      </div>
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import Checkbox from 'primevue/checkbox'

const { t } = useI18n()

const loginInProgress = ref(false)
const rememberMe = ref(false)
const loginSchema = reactive({
  email: 'required|email',
  password: 'required|min:8|max:100'
})
const form = reactive({
  email: '',
  password: ''
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
      life: 5000
    })
    router.push(route.query.redirect?.toString() || { name: 'home' })
    return
  }
  loginInProgress.value = false
  toast.add({
    severity: 'error',
    detail: t('notification.invalid_login'),
    life: 5000
  })
}

// Navigation handler
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'home' })
  }
}
</script>