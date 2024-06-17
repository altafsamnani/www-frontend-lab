<template>
  <div class="min-h-[calc(100vh-150px)] flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="max-w-sm sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="w-auto h-10 mx-auto" src="@/assets/logo.svg" alt="Osec B.V." />
      <h2
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center"
        v-html="$t('login.title', { osec: 'O<span class=\'text-primary-400\'>sec</span>' })"
      ></h2>
      <p class="py-6 text-center">{{ $t('login.description') }}</p>
    </div>

    <div class="flex-shrink-0 w-full max-w-sm sm:mx-auto sm:w-full sm:max-w-sm">
      <vee-form class="space-y-6" :validation-schema="loginSchema" @submit="handleSubmit">
        <div>
          <label class="label" for="email"> {{ $t('login.label_email') }}</label>
          <div class="mt-2">
            <vee-field
              as="InputText"
              type="email"
              name="email"
              id="email"
              v-model="form.email"
              placeholder="name@osec.nl"
              autocomplete="email"
              class="w-full"
            />
            <ErrorMessage class="error" name="email" />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label class="label" for="password">{{ $t('login.label_password') }}</label>
            <label class="label">
              <a href="#" class="font-semibold text-primary-500 hover:text-primary-400">{{
                $t('login.anchor_forgot_password')
              }}</a>
            </label>
          </div>
          <div class="mt-2">
            <vee-field
              as="InputText"
              type="password"
              id="password"
              name="password"
              class="w-full"
              placeholder="********"
            />
            <ErrorMessage class="error" name="password" />
          </div>
        </div>

        <Button
          type="submit"
          class="w-full"
          :loading="loginInProgress"
          :disabled="loginInProgress"
          :label="$t('login.label_button')"
        />
      </vee-form>

      <!-- <div class="flex-col hero-content lg:flex-row">
        <div class="text-center lg:text-left">
          <h1
            class="text-5xl font-bold"
            v-html="$t('login.title', { osec: 'O<span class=\'text-primary-400\'>sec</span>' })"
          ></h1>
          <p class="py-6">{{ $t('login.description') }}</p>
        </div>
        <div class="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
          <img class="w-auto h-10 text-left" src="@/assets/logo.svg" alt="Osec.nl" />
          <vee-form :validation-schema="loginSchema" @submit="handleSubmit">
            <div class="form-control">
              <label class="label">
                {{ $t('login.label_email') }}
              </label>
              <vee-field
                as="InputText"
                type="email"
                name="email"
                placeholder="name@osec.nl"
                class="w-full"
              />
              <ErrorMessage class="error" name="email" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">{{ $t('login.label_password') }}</span>
                <span class="label-text-alt"
                  ><a href="#" class="link link-hover link-primary">{{
                    $t('login.anchor_forgot_password')
                  }}</a></span
                >
              </label>
              <vee-field
                as="InputText"
                type="password"
                name="password"
                placeholder="********"
                class="input input-bordered"
              />
              <ErrorMessage class="error" name="password" />
            </div>
            <div class="mt-6 form-control">
              <button type="submit" class="btn btn-primary" :disabled="loginInProgress">
                <span class="loading loading-spinner" v-if="loginInProgress"></span
                >{{ $t('login.label_button') }}
              </button>
            </div>
          </vee-form>
        </div>
      </div> -->
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
import Toast from 'primevue/toast'

const { t } = useI18n()

const loginInProgress = ref(false)
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
</script>
