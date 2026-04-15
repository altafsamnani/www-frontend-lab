<template>
  <div class="flex h-full w-full items-center">
    <div class="flex h-full w-full">
      <!-- Left Side - Static Image -->
      <div
        class="hidden h-full w-6/12 md:block"
        :style="{
          background: `linear-gradient(0deg, var(--p-primary-500) 0%, var(--p-primary-500) 100%), url('${loginSplitImage}') lightgray 50% / cover no-repeat`,
          backgroundBlendMode: 'overlay, normal',
        }"
      />

      <!-- Right Side - Content -->
      <div
        class="bg-surface-0 dark:bg-surface-950 relative flex h-full w-full flex-col gap-8 px-8 py-12 md:w-6/12 md:px-12 lg:px-20"
        :class="{ 'overflow-y-auto': scrollable, 'justify-center': !scrollable }"
      >
        <!-- Settings toolbar (locale + dark mode) -->
        <div class="absolute top-4 right-4 flex gap-1">
          <Button
            icon="pi pi-globe"
            severity="secondary"
            text
            rounded
            size="small"
            :aria-label="$t('languages.' + $i18n.locale)"
            @click="toggleLocale"
            aria-haspopup="true"
            aria-controls="locale_menu"
          />
          <Menu :model="localeItems" ref="localeMenu" id="locale_menu" :popup="true">
            <template #item="{ item }">
              <a
                class="hover:bg-surface-100 dark:hover:bg-surface-800 flex cursor-pointer items-center px-4 py-2"
                @click="handleLocaleClick(item.language)"
              >
                <span :class="{ 'font-semibold': $i18n.locale === item.language }">
                  {{ $t('languages.' + item.language) }}
                </span>
              </a>
            </template>
          </Menu>

          <Button
            :icon="theme === 'light' ? 'pi pi-sun' : 'pi pi-moon'"
            @click="handleToggleDarkModeClick"
            severity="secondary"
            text
            rounded
            size="small"
            :aria-label="$t('login.toggle_dark_mode')"
          />
        </div>

        <div class="flex flex-col gap-4">
          <div class="mb-4 flex items-center gap-2">
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
            <h1 class="text-surface-900 dark:text-surface-0 text-2xl leading-tight font-semibold">
              {{ title }}
            </h1>
            <div v-if="subtitle" class="text-surface-700 dark:text-surface-200">{{ subtitle }}</div>
          </div>
        </div>

        <div class="flex flex-col gap-8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { setI18nLanguage } from '@/i18n'
  import { localize } from '@vee-validate/i18n'
  import { getSupportedLocales } from '@/includes/helpers'
  import Button from '@/volt/Button.vue'
  import Menu from 'primevue/menu'
  import loginSplitImage from '@/assets/login_split.webp'

  interface Props {
    title: string
    subtitle?: string
    scrollable?: boolean
  }

  withDefaults(defineProps<Props>(), {
    title: '',
    subtitle: '',
    scrollable: false,
  })

  const { t } = useI18n()
  const router = useRouter()

  // Theme handling
  const theme = ref('light')

  onMounted(() => {
    theme.value =
      !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : localStorage.getItem('theme') || 'light'
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
    document.querySelector('html')?.setAttribute('class', theme.value)
  })

  const handleToggleDarkModeClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.querySelector('html')?.setAttribute('data-theme', theme.value)
    document.querySelector('html')?.setAttribute('class', theme.value)
    localStorage.setItem('theme', theme.value)
  }

  // Locale handling
  const localeMenu = ref()
  const localeItems = ref(getSupportedLocales(t))

  const toggleLocale = (event: Event) => {
    localeMenu.value.toggle(event)
  }

  const handleLocaleClick = (selectedLocale: string) => {
    setI18nLanguage(selectedLocale)
    localize(selectedLocale)
  }

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push({ name: 'home' })
    }
  }
</script>
