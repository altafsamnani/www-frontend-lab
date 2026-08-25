<template>
  <AuthLayout
    :title="$t('registerUser.infoPage.title')"
    :subtitle="$t('registerUser.infoPage.subtitle')"
    scrollable
  >
    <div class="flex flex-col gap-6">
      <!-- Welcome Message -->
      <div class="bg-primary/5 dark:bg-primary/10 border-primary/20 rounded-xl border p-5">
        <div class="flex items-start gap-4">
          <div
            class="bg-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          >
            <i class="pi pi-info-circle text-primary text-xl"></i>
          </div>
          <div>
            <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
              {{ $t('registerUser.infoPage.welcomeMessage') }}
            </p>
          </div>
        </div>
      </div>

      <!-- How to Register Section -->
      <div class="bg-surface-50 dark:bg-surface-900 rounded-xl p-6">
        <h3
          class="text-surface-900 dark:text-surface-0 mb-5 flex items-center gap-2 text-lg font-semibold"
        >
          <i class="pi pi-list-check text-primary"></i>
          {{ $t('registerUser.infoPage.howToRegister') }}
        </h3>
        <div class="flex flex-col gap-5">
          <div class="flex items-start gap-4">
            <div
              class="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-white"
            >
              1
            </div>
            <div class="pt-1">
              <p class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('registerUser.infoPage.step1Title') }}
              </p>
              <p class="text-surface-600 dark:text-surface-400 mt-1 text-sm">
                {{ $t('registerUser.infoPage.step1Desc') }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-white"
            >
              2
            </div>
            <div class="pt-1">
              <p class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('registerUser.infoPage.step2Title') }}
              </p>
              <p class="text-surface-600 dark:text-surface-400 mt-1 text-sm">
                {{ $t('registerUser.infoPage.step2Desc') }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-white"
            >
              3
            </div>
            <div class="pt-1">
              <p class="text-surface-900 dark:text-surface-0 font-medium">
                {{ $t('registerUser.infoPage.step3Title') }}
              </p>
              <p class="text-surface-600 dark:text-surface-400 mt-1 text-sm">
                {{ $t('registerUser.infoPage.step3Desc') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Options -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Contact Client Manager -->
        <div
          class="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/20"
        >
          <div class="mb-3 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500">
              <i class="pi pi-users text-lg text-white"></i>
            </div>
            <div>
              <h4 class="font-semibold text-blue-800 dark:text-blue-200">
                {{ $t('registerUser.infoPage.contactManager') }}
              </h4>
              <p class="text-sm text-blue-600 dark:text-blue-300">
                {{ $t('registerUser.infoPage.contactManagerDesc') }}
              </p>
            </div>
          </div>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {{ $t('registerUser.infoPage.contactManagerInfo') }}
          </p>
        </div>

        <!-- Contact Support -->
        <div
          class="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20"
        >
          <div class="mb-3 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-green-500">
              <i class="pi pi-headphones text-lg text-white"></i>
            </div>
            <div>
              <h4 class="font-semibold text-green-800 dark:text-green-200">
                {{ $t('registerUser.infoPage.contactSupport') }}
              </h4>
              <p class="text-sm text-green-600 dark:text-green-300">
                {{ $t('registerUser.infoPage.contactSupportDesc') }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <a
              href="mailto:support@osec.nl"
              class="flex items-center gap-2 text-green-700 hover:underline dark:text-green-300"
            >
              <i class="pi pi-envelope"></i>
              support@osec.nl
            </a>
            <a
              href="tel:+31299666662"
              class="flex items-center gap-2 text-green-700 hover:underline dark:text-green-300"
            >
              <i class="pi pi-phone"></i>
              +31 299 666 662
            </a>
          </div>
        </div>
      </div>

      <!-- Product Categories -->
      <div class="bg-surface-100 dark:bg-surface-800 rounded-xl p-5">
        <h3
          class="text-surface-900 dark:text-surface-0 mb-4 flex items-center gap-2 text-base font-semibold"
        >
          <i class="pi pi-shield text-primary"></i>
          {{ $t('registerUser.infoPage.productCategories') }}
        </h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="text-surface-700 dark:text-surface-300 flex items-center gap-2">
            <i class="pi pi-video text-primary"></i>
            <span class="text-sm">{{ $t('registerUser.infoPage.categoryVideo') }}</span>
          </div>
          <div class="text-surface-700 dark:text-surface-300 flex items-center gap-2">
            <i class="pi pi-bell text-primary"></i>
            <span class="text-sm">{{ $t('registerUser.infoPage.categoryAlarms') }}</span>
          </div>
          <div class="text-surface-700 dark:text-surface-300 flex items-center gap-2">
            <i class="pi pi-lock text-primary"></i>
            <span class="text-sm">{{ $t('registerUser.infoPage.categoryAccess') }}</span>
          </div>
          <div class="text-surface-700 dark:text-surface-300 flex items-center gap-2">
            <i class="pi pi-home text-primary"></i>
            <span class="text-sm">{{ $t('registerUser.infoPage.categoryIntercom') }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="border-surface-200 dark:border-surface-700 flex flex-col gap-3 border-t pt-4">
        <p class="text-surface-600 dark:text-surface-400 text-center">
          {{ $t('register.alreadyHaveAccount') }}
          <router-link to="/login" class="text-primary ml-1 font-medium hover:underline">
            {{ $t('register.loginHere') }}
          </router-link>
        </p>
        <p class="text-surface-600 dark:text-surface-400 text-center">
          {{ $t('registerUser.needCompanyAccount') }}
          <router-link to="/register" class="text-primary ml-1 font-medium hover:underline">
            {{ $t('registerUser.registerCompany') }}
          </router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/AuthLayout.vue'
</script>
