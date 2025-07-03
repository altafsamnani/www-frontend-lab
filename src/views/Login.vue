<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-12 py-20 md:px-12 lg:px-20">
    <div class="flex flex-wrap shadow rounded-2xl">
      <!-- Left Side - Carousel -->
      <div
        class="w-full lg:w-6/12 p-8 pb-4 lg:p-16 lg:pb-16 bg-surface-100 dark:bg-surface-800 rounded-2xl lg:rounded-r-none lg:rounded-b-2xl rounded-b-none">
        <div class="flex items-center gap-4 lg:mb-10">
          <img class="h-9 w-auto" src="@/assets/logo.svg" alt="Osec B.V." />
          <div class="text-lg font-semibold text-surface-900 dark:text-surface-0"></div>
        </div>
        <Carousel :value="features" :num-visible="1" :num-scroll="1" :circular="true" :show-indicators="true"
          :autoplay-interval="3000" class="!hidden lg:!block">
          <template #item="slotProps">
            <div class="flex flex-col gap-10">
              <div class="flex flex-col items-center gap-2">
                <img :src="slotProps.data.image" alt="Feature"
                  class="w-full max-w-xs rounded-2xl shadow-lg dark:hidden block" />
                <img :src="slotProps.data.darkImage" alt="Feature"
                  class="w-full max-w-xs rounded-2xl shadow-lg hidden dark:block" />
              </div>
              <div class="flex flex-col items-center gap-4 pb-8">
                <div class="text-lg font-medium text-surface-900 dark:text-surface-0 text-center">{{
                  slotProps.data.title }}</div>
                <div class="text-surface-500 dark:text-surface-400 text-center leading-normal max-w-md">
                  {{ slotProps.data.text }}
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>

      <!-- Right Side - Login Form -->
      <div
        class="w-full lg:w-6/12 p-4 bg-surface-100 dark:bg-surface-800 rounded-r-2xl rounded-t-none lg:rounded-tr-2xl">
        <div class="md:p-16 p-8 bg-surface-0 dark:bg-surface-900 rounded-2xl shadow-sm flex flex-col gap-12 h-full">
          <div class="flex flex-col gap-4">
            <div class="text-2xl font-semibold text-surface-900 dark:text-surface-0"
              v-html="$t('login.title', { osec: 'O<span class=\'text-primary-400\'>sec</span>' })"></div>
            <div class="text-surface-600 dark:text-surface-300">{{ $t('login.description') }}</div>
          </div>

          <div class="flex flex-col gap-8">
            <!-- Social Login Buttons -->
            <div class="flex flex-wrap items-center gap-6 gap-y-4">
              <Button outlined severity="secondary" icon="pi pi-facebook !text-base !leading-none"
                :label="$t('login.facebook_login')" @click="handleFacebookLogin"
                class="flex-1 min-w-fit whitespace-nowrap mb-2 shrink-0" />
              <Button outlined severity="secondary" icon="pi pi-google !text-base !leading-none"
                :label="$t('login.google_login')" @click="handleGoogleLogin"
                class="flex-1 min-w-fit whitespace-nowrap mb-2 shrink-0" />
            </div>

            <Divider align="center">
              <span class="font-bold text-surface-700 dark:text-surface-300">{{ $t('login.or') }}</span>
            </Divider>

            <!-- Login Form -->
            <vee-form class="flex flex-col gap-6" :validation-schema="loginSchema" @submit="handleSubmit">
              <div class="flex flex-col gap-2">
                <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">{{ $t('login.label_email')
                  }}</label>
                <vee-field as="InputText" type="email" name="email" id="email" v-model="form.email"
                  placeholder="name@osec.nl" autocomplete="email" class="w-full rounded-md shadow-sm" />
                <ErrorMessage class="error text-red-500 text-sm" name="email" />
              </div>

              <div class="flex flex-col gap-2">
                <label for="password" class="text-surface-900 dark:text-surface-0 font-medium">{{
                  $t('login.label_password')
                  }}</label>
                <vee-field as="InputText" type="password" id="password" name="password"
                  class="w-full rounded-md shadow-sm" placeholder="********" />
                <ErrorMessage class="error text-red-500 text-sm" name="password" />
              </div>

              <div
                class="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center justify-between w-full gap-2">
                <div class="flex items-center gap-2">
                  <Checkbox id="rememberme" v-model="rememberMe" :binary="true" />
                  <label for="rememberme" class="text-surface-900 dark:text-surface-0">{{ $t('login.remember_me')
                    }}</label>
                </div>
                <a href="#"
                  class="text-surface-500 dark:text-surface-400 font-medium cursor-pointer hover:text-surface-600 dark:hover:text-surface-300">{{
                    $t('login.anchor_forgot_password')
                  }}</a>
              </div>

              <Button type="submit" :label="$t('login.label_button')" class="w-full" :loading="loginInProgress"
                :disabled="loginInProgress" />
            </vee-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import Toast from 'primevue/toast'
import Carousel from 'primevue/carousel'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'

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

// Carousel features data - computed to be reactive to locale changes
const features = computed(() => [
  {
    title: t('login.features_security_title'),
    image: 'https://osec.nl/images/Dahua_LM32-U400P_32_UHD_Android_monitor.jpg',
    darkImage: 'https://osec.nl/images/Dahua_LM32-U400P_32_UHD_Android_monitor.jpg',
    text: t('login.features_security_text')
  },
  {
    title: t('login.features_analytics_title'),
    image: 'https://osec.nl/images/Nieuw_Hikvision_PTRZ.jpg',
    darkImage: 'https://osec.nl/images/Nieuw_Hikvision_PTRZ.jpg',
    text: t('login.features_analytics_text')
  },
  {
    title: t('login.features_backup_title'),
    image: 'https://osec.nl/images/Binnenkort_Hoekbeugel_SLIM_LINE.jpg',
    darkImage: 'https://osec.nl/images/Binnenkort_Hoekbeugel_SLIM_LINE.jpg',
    text: t('login.features_backup_text')
  }
])

const toast = useToast()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { accessToken } = storeToRefs(authStore)
const { handleLogin } = authStore

const handleSubmit = async (form) => {
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

// Social login handlers
const handleFacebookLogin = () => {
  toast.add({
    severity: 'info',
    detail: t('login.social_login_coming_soon'),
    life: 3000
  })
}

const handleGoogleLogin = () => {
  toast.add({
    severity: 'info',
    detail: t('login.social_login_coming_soon'),
    life: 3000
  })
}
</script>
