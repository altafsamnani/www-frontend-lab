<template>
  <nav
    class="border-surface-200 dark:border-surface-700 relative z-30 hidden w-full border-b lg:block"
  >
    <MegaMenu :model="navs" :pt="pt">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.description" v-slot="{ href, navigate }" :to="item.route" custom>
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            class="group/tile hover:bg-surface-50 dark:hover:bg-surface-800 flex items-start gap-3 rounded-lg p-3 transition-colors"
          >
            <span
              class="bg-primary-100 text-primary-700 group-hover/tile:bg-primary-500 dark:bg-primary-900 dark:text-primary-200 dark:group-hover/tile:bg-primary-500 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors group-hover/tile:text-white"
            >
              <i :class="item.icon" />
            </span>
            <span class="flex min-w-0 flex-col">
              <span class="text-surface-900 dark:text-surface-0 font-medium">{{
                itemLabel(item)
              }}</span>
              <span class="text-surface-500 dark:text-surface-400 mt-0.5 line-clamp-2 text-sm">
                {{ t(item.detail) }}
              </span>
            </span>
          </a>
        </router-link>
        <router-link v-else-if="item.cta" v-slot="{ href, navigate }" :to="item.route" custom>
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            class="text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-surface-800 flex items-center gap-2 rounded-lg p-3 text-sm font-semibold transition-colors"
          >
            {{ itemLabel(item) }}
            <i class="pi pi-arrow-right text-xs transition-transform group-hover:translate-x-0.5" />
          </a>
        </router-link>
        <a
          v-else-if="hasSubmenu"
          v-bind="props.action"
          class="relative flex cursor-pointer items-center gap-1.5 px-4 py-3.5 text-[15px] font-medium transition-colors"
          :class="
            isActive(item)
              ? 'text-primary-600 dark:text-primary-300'
              : 'text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-0'
          "
        >
          {{ itemLabel(item) }}
          <i
            class="pi pi-chevron-down text-xs transition-transform duration-200 in-[.p-megamenu-item-active]:rotate-180"
          />
          <span
            class="bg-primary-500 absolute inset-x-4 bottom-0 h-0.5 rounded-full transition-opacity"
            :class="
              isActive(item) ? 'opacity-100' : 'opacity-0 in-[.p-megamenu-item-active]:opacity-100'
            "
          />
        </a>
        <router-link v-else v-slot="{ href, navigate }" :to="item.route" custom>
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            class="relative flex items-center px-4 py-3.5 text-[15px] font-medium transition-colors"
            :class="
              isActive(item)
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-0'
            "
          >
            {{ itemLabel(item) }}
            <span
              class="bg-primary-500 absolute inset-x-4 bottom-0 h-0.5 rounded-full transition-opacity"
              :class="isActive(item) ? 'opacity-100' : 'opacity-0'"
            />
          </a>
        </router-link>
      </template>
    </MegaMenu>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import type { MenuItem } from 'primevue/menuitem'

  const { t } = useI18n()
  const route = useRoute()

  const itemLabel = (item: MenuItem): string => t(item.label as string)

  const isActive = (item: MenuItem): boolean => {
    if (item.activeBase) return route.path.startsWith(item.activeBase)
    if (item.route === '/') return route.path === '/'
    return route.path.startsWith(item.route)
  }

  const pt = {
    root: '!w-full !rounded-none !border-0 !bg-transparent !p-0',
    rootList: 'flex w-full items-center justify-center gap-12',
    itemContent: '!rounded-none !bg-transparent !text-inherit',
    overlay:
      '!left-1/2 !-translate-x-1/2 !top-full !mt-0 !min-w-[38rem] !rounded-xl !border !border-surface-200 !bg-surface-0 !p-3 !shadow-xl dark:!border-surface-700 dark:!bg-surface-900 z-50',
    grid: 'flex gap-2',
    column: 'w-1/2',
    submenu: 'flex flex-col gap-1',
    submenuLabel: 'hidden',
    separator: 'my-2 border-t border-surface-200 dark:border-surface-700',
  }

  const navs = ref<MenuItem[]>([
    {
      label: 'navigation.home',
      route: '/',
    },
    {
      label: 'navigation.about_us',
      route: '/aboutus',
    },
    {
      label: 'navigation.news',
      route: '/news',
    },
    {
      label: 'navigation.products',
      activeBase: '/search',
      items: [
        [
          {
            items: [
              {
                label: 'navigation.products_burglary',
                description: true,
                detail: 'navigation.products_burglary_text',
                route: '/categories/burglary',
                icon: 'pi pi-bell',
              },
              {
                label: 'navigation.products_video',
                description: true,
                detail: 'navigation.products_video_text',
                route: '/categories/video',
                icon: 'pi pi-video',
              },
              {
                label: 'navigation.products_fire',
                description: true,
                detail: 'navigation.products_fire_text',
                route: '/categories/fire',
                icon: 'pi pi-building',
              },
            ],
          },
        ],
        [
          {
            items: [
              {
                label: 'navigation.products_intercom',
                description: true,
                detail: 'navigation.products_intercom_text',
                route: '/categories/intercom',
                icon: 'pi pi-phone',
              },
              {
                label: 'navigation.products_access_control',
                description: true,
                detail: 'navigation.products_access_control_text',
                route: '/categories/access_control',
                icon: 'pi pi-calculator',
              },
              {
                label: 'navigation.products_building_automation',
                description: true,
                detail: 'navigation.products_building_automation_text',
                route: '/categories/building_automation',
                icon: 'pi pi-home',
              },
              {
                separator: true,
              },
              {
                label: 'navigation.products_search',
                cta: true,
                route: '/search',
              },
            ],
          },
        ],
      ],
    },
    {
      label: 'navigation.support',
      route: '/support',
    },
    {
      label: 'navigation.rma',
      route: '/rma',
    },
    {
      label: 'navigation.contact_us',
      route: '/contactus',
    },
  ])
</script>
