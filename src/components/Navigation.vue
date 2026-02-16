<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()

const navigation = computed(() => [
  { name: t('navigation.dashboard'), href: '#', current: true },
  { name: t('navigation.team'), href: '#', current: false },
  { name: t('navigation.projects'), href: '#', current: false },
  { name: t('navigation.calendar'), href: '#', current: false }
])
interface theme {
  theme: string
}

const theme = ref<string>('light')
const handleToggleDarkModeClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.querySelector('html')?.setAttribute('class', theme.value);
  document.querySelector('data-theme')?.setAttribute('class', theme.value);
}
</script>
<template>
  <div class="w-full bg-neutral">
    <div class="mx-auto navbar bg-neutral text-neutral-content max-w-screen-2xl sm:px-4 lg:px-4">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="px-2 btn btn-ghost sm:hidden">
            <Bars3Icon class="w-6 h-6 text-gray-400 hover:text-white" aria-hidden="true" />
          </label>
          <ul tabindex="0" class="menu menu-lg bg-base-200 w-96 text-base-content dropdown-content mt-3 z-[1]">
            <li>
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                :class="[item.current ? 'active' : '', '']" :aria-current="item.current ? 'page' : undefined">{{
                item.name }}</a>
            </li>
          </ul>
        </div>
        <a class="text-xl normal-case btn btn-ghost">
          <div class="flex items-center flex-shrink-0">
            <img class="w-auto h-8" src="@/assets/logo_white.png" alt="Osec B.V." />
          </div>
        </a>
        <div class="hidden sm:ml-3 sm:block">
          <div class="flex space-x-4">
            <a v-for="item in navigation" :key="item.name" :href="item.href"
              :class="[item.current ? 'btn-active' : '', 'normal-case btn btn-sm btn-neutral']"
              :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
          </div>
        </div>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <div class="flex">
          <!-- notifications -->
          <div class="hidden sm:block">
            <a class="rounded-full btn btn-ghost btn-circle">
              <span class="sr-only">{{ t('navigation.viewNotifications') }}</span>
              <BellIcon class="w-6 h-6 text-gray-400 hover:text-white" aria-hidden="true" />
            </a>
          </div>
          <!-- theme settings -->
          <div class="hidden sm:block">
            <a @click="handleToggleDarkModeClick()" class="rounded-full btn btn-ghost btn-circle">
              <span class="sr-only">{{ t('navigation.selectDarkMode') }}</span>
              <SunIcon v-if="theme == 'light'" class="w-6 h-6 text-gray-400 hover:text-white" aria-hidden="true" />
              <MoonIcon v-else class="w-6 h-6 text-gray-400 hover:text-white" aria-hidden="true" />
            </a>
          </div>
          <!-- language selector -->
          <div class="hidden dropdown dropdown-end sm:block">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="w-8 rounded-full">
                <span class="sr-only">{{ t('navigation.selectLanguage') }}</span>
                <GlobeAltIcon class="w-6 h-6 text-gray-400 hover:text-white" aria-hidden="true" />
              </div>
            </label>
            <ul tabindex="0"
              class="z-10 p-2 mt-3 shadow menu bg-base-100 text-base-content dropdown-content rounded-box w-36">
              <li><a>{{ t('languages.en') }}</a></li>
              <li><a>{{ t('languages.nl') }}</a></li>
            </ul>
          </div>
          <!-- profile -->
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-8 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              </div>
            </label>
            <ul tabindex="0"
              class="z-10 p-2 mt-3 shadow menu bg-base-100 text-base-content dropdown-content rounded-box w-52">
              <li>
                <a class="justify-between">
                  {{ t('navigation.profile') }}
                  <span class="badge">{{ t('navigation.new') }}</span>
                </a>
              </li>
              <li><a>{{ t('navigation.settings') }}</a></li>
              <li><a>{{ t('navigation.logout') }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
