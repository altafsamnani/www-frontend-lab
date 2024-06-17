<template>
  <div class="flex self-stretch flex-1 bg-white dark:bg-surface-900 gap-x-4 lg:gap-x-6">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-gray-900">{{ t(item.name) }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <Button
        icon="pi pi-user"
        severity="secondary"
        text
        rounded
        aria-label=""
        @click="toggleProfile"
        aria-haspopup="true"
        aria-controls="profile_menu"
        v-if="$route.meta.layout != 'login'"
        class="hidden lg:flex"
      />
      <Menu :model="profileItems" ref="profileMenu" id="profile_menu" :popup="true">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>

      <!-- Separator -->
      <div
        v-if="$route.meta.layout != 'login'"
        class="hidden lg:block lg:h-6 lg:w-px bg-surface-900/10 dark:bg-white/10"
        aria-hidden="true"
      ></div>
      <Button
        icon="pi pi-bell"
        severity="secondary"
        text
        rounded
        aria-label=""
        @click="toggleNotifications"
        aria-haspopup="true"
        aria-controls="notifications"
        v-if="$route.meta.layout != 'login'"
        class="hidden lg:flex"
      />
      <OverlayPanel ref="notificationsPanel">
        <div>
          <h2 class="mb-2 text-lg font-semibold">Notifications</h2>
          <p v-for="notification in notifications" :key="notification.id">
            {{ notification.msg }}
          </p>
        </div>
      </OverlayPanel>

      <!-- language selector -->

      <Button
        icon="pi pi-globe"
        severity="secondary"
        text
        rounded
        aria-label="Select Dark Mode"
        @click="toggleLocale"
        aria-haspopup="true"
        aria-controls="locale_menu"
      />
      <Menu :model="localeItems" ref="localeMenu" id="locale_menu" :popup="true">
        <template #item="{ item, props }">
          <a
            v-if="item.language == 'nl'"
            class="block p-2 cursor-pointer"
            @click="handleLocaleClick('nl')"
          >
            <span class="ml-2" :class="{ 'font-semibold': $i18n.locale === 'nl' }">{{
              $t('languages.nl')
            }}</span>
          </a>
          <a v-else @click="handleLocaleClick('en')" class="block p-2 cursor-pointer">
            <span class="ml-2" :class="{ 'font-semibold': $i18n.locale === 'en' }">{{
              $t('languages.en')
            }}</span>
          </a>
        </template>
      </Menu>

      <!-- Darkmode Switcher -->
      <Button
        :icon="theme == 'light' ? 'pi pi-sun' : 'pi pi-moon'"
        @click="handleToggleDarkModeClick()"
        severity="secondary"
        text
        rounded
        aria-label="Select Dark Mode"
      />
    </div>
      </nav>
    </header>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import OsecLogoColor from '@/components/logos/OsecLogoColor.vue'
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '@/i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { localize } from '@vee-validate/i18n'

const notifyStore = useNotifyStore()
const router = useRouter()
const authStore = useAuthStore()
const { handleLogout } = authStore
interface settings {
  theme: string
  locale: string
}

const { locale, t } = useI18n()
const open = ref(false)
const submitLogout = async () => {
  await handleLogout()
  notifyStore.notify(t('notification.logout'), NotificationType.Success)
  router.push({ name: 'login' })
}

const storedTheme = localStorage.getItem('theme') || 'light'
const theme = ref(storedTheme)
const handleToggleDarkModeClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.querySelector('html')?.setAttribute('data-theme', theme.value)
  document.querySelector('html')?.setAttribute('class', theme.value)
  localStorage.setItem('theme', theme.value)
}
const toggleLocale = (event) => {
  localeMenu.value.toggle(event)
}
const handleLocaleClick = (selectedLocale: string) => {
  setI18nLanguage(selectedLocale)
  localize(selectedLocale)
}

const localeMenu = ref()
const localeItems = ref([
  {
    label: 'English',
    language: 'en'
  },
  {
    label: 'Dutch',
    language: 'nl'
  }
])

const notificationMenu = ref()
const notifications = computed(() => {
  return [
    {
      id: 1,
      msg: t('notification.login')
    }
  ]
})

const xtoggleNotifications = (event) => {
  notificationMenu.value.toggle(event)
}
const notificationsPanel = ref()
const toggleNotifications = (event) => {
  notificationsPanel.value.toggle(event)
}

const profileMenu = ref()
const profileItems = ref([
  {
    label: 'Gebruikersbeheer',
    icon: 'pi pi-cog'
  },
  {
    label: 'Logout',
    icon: 'pi pi-eject',
    command: () => {
      submitLogout()
    }
  }
])

const toggleProfile = (event) => {
  profileMenu.value.toggle(event)
}

const navigation = [
  { name: 'navigation.home', href: '#' },
  { name: 'navigation.about_us', href: '#' },
  { name: 'navigation.news', href: '#' },
  { name: 'navigation.products', href: '#' },
  { name: 'navigation.support', href: '#' },
  { name: 'navigation.rma', href: '#' },
  { name: 'navigation.contact_us', href: '#' },
]
</script>
<style>
.router-link-active {
  font-weight: bold;
}
</style>
