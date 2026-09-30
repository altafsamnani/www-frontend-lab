<template>
  <div class="flex flex-col gap-y-12 pb-12">
    <div
      class="from-primary-50 to-surface-100 ring-surface-900/5 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800 overflow-hidden rounded-3xl bg-gradient-to-br via-white ring-1 dark:ring-white/10"
    >
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div class="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
              {{ $t('rma.info.eyebrow') }}
            </h2>
            <h1
              class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {{ $t('rma.info.title') }}
            </h1>
            <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
              {{ $t('rma.info.subtitle') }}
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <router-link v-if="isLoggedIn" :to="{ name: 'RmaDashboard' }">
                <Button size="large">
                  {{ $t('rma.info.goToRmas') }}
                  <i class="pi pi-arrow-right"></i>
                </Button>
              </router-link>
              <router-link v-else :to="{ name: 'login' }">
                <Button size="large">
                  <i class="pi pi-sign-in"></i>
                  {{ $t('rma.info.loginToSubmit') }}
                </Button>
              </router-link>
              <a
                href="mailto:rma@osec.nl"
                class="text-surface-900 dark:text-surface-0 text-sm leading-6 font-semibold"
                >rma@osec.nl <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
          <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="ring-surface-900/5 rounded-2xl bg-white/70 p-6 ring-1 backdrop-blur dark:bg-white/5 dark:ring-white/10"
            >
              <dd class="text-primary-600 dark:text-primary-400 text-3xl font-bold tracking-tight">
                {{ stat.value }}
              </dd>
              <dt class="text-surface-600 dark:text-surface-400 mt-1 text-sm leading-6">
                {{ stat.label }}
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <h2 class="text-surface-900 dark:text-surface-0 text-2xl font-bold tracking-tight">
        {{ $t('rma.info.procedureTitle') }}
      </h2>
      <Timeline :value="steps" class="mt-10 [&_[data-pc-section=eventopposite]]:hidden">
        <template #marker="{ item }">
          <span
            class="bg-primary-600 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm"
          >
            <i :class="[item.icon, 'text-base']"></i>
          </span>
        </template>
        <template #content="{ item, index }">
          <div class="pb-10 pl-2">
            <p
              class="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wide uppercase"
            >
              {{ $t('rma.info.stepLabel', { step: index + 1 }) }}
            </p>
            <h3 class="text-surface-900 dark:text-surface-0 mt-1 text-lg font-semibold">
              {{ item.title }}
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mt-2 max-w-3xl text-base leading-7">
              {{ item.text }}
            </p>
          </div>
        </template>
      </Timeline>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div
        class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 rounded-3xl p-8 ring-1 dark:ring-white/10"
      >
        <div class="flex items-center gap-x-3">
          <span
            class="bg-primary-600/10 text-primary-600 dark:text-primary-400 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <i class="pi pi-verified text-lg"></i>
          </span>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('rma.info.returnConditionsTitle') }}
          </h2>
        </div>
        <ul class="mt-6 flex flex-col gap-4">
          <li
            v-for="condition in returnConditions"
            :key="condition"
            class="flex items-start gap-x-3"
          >
            <i class="pi pi-check-circle text-primary-600 dark:text-primary-400 mt-1"></i>
            <span class="text-surface-700 dark:text-surface-300 text-base leading-7">{{
              condition
            }}</span>
          </li>
        </ul>
        <Message severity="warn" :closable="false" class="mt-6" icon="pi pi-exclamation-triangle">
          {{ $t('rma.info.returnCondition4') }}
        </Message>
      </div>

      <div
        class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 rounded-3xl p-8 ring-1 dark:ring-white/10"
      >
        <div class="flex items-center gap-x-3">
          <span
            class="bg-primary-600/10 text-primary-600 dark:text-primary-400 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <i class="pi pi-shield text-lg"></i>
          </span>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('rma.info.warrantyTitle') }}
          </h2>
        </div>
        <div
          class="text-surface-700 dark:text-surface-300 mt-6 flex flex-col gap-4 text-base leading-7"
        >
          <p>{{ $t('rma.info.warrantyText1') }}</p>
          <p>{{ $t('rma.info.warrantyText2') }}</p>
        </div>
        <Message severity="secondary" :closable="false" class="mt-6" icon="pi pi-info-circle">
          {{ $t('rma.info.warrantyText3') }}
        </Message>
      </div>
    </div>

    <div
      class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 rounded-3xl p-8 ring-1 dark:ring-white/10"
    >
      <h2 class="text-surface-900 dark:text-surface-0 text-2xl font-bold tracking-tight">
        {{ $t('rma.info.resetTitle') }}
      </h2>
      <p class="text-surface-600 dark:text-surface-400 mt-3 max-w-3xl text-base leading-7">
        {{ $t('rma.info.resetIntro') }}
      </p>
      <Tabs value="dahua" class="mt-6">
        <TabList>
          <Tab value="dahua">Dahua</Tab>
          <Tab value="hikvision">Hikvision</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="dahua">
            <ul class="flex flex-col gap-3 pt-4">
              <li v-for="item in dahuaResets" :key="item" class="flex items-start gap-x-3">
                <i class="pi pi-refresh text-primary-600 dark:text-primary-400 mt-1"></i>
                <span class="text-surface-700 dark:text-surface-300 text-base leading-7">{{
                  item
                }}</span>
              </li>
            </ul>
          </TabPanel>
          <TabPanel value="hikvision">
            <ul class="flex flex-col gap-3 pt-4">
              <li v-for="item in hikvisionResets" :key="item" class="flex items-start gap-x-3">
                <i class="pi pi-refresh text-primary-600 dark:text-primary-400 mt-1"></i>
                <span class="text-surface-700 dark:text-surface-300 text-base leading-7">{{
                  item
                }}</span>
              </li>
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <div class="bg-primary-600 dark:bg-primary-700 overflow-hidden rounded-3xl">
      <div
        class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-y-6 px-6 py-12 lg:flex-row lg:items-center lg:px-8"
      >
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-white">
            {{ $t('rma.info.contactTitle') }}
          </h2>
          <p class="text-primary-100 mt-2 max-w-xl text-base leading-7">
            {{ $t('rma.info.contactSubtitle') }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <a
            href="mailto:rma@osec.nl"
            class="text-primary-700 hover:bg-primary-50 rounded-md bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
          >
            <i class="pi pi-envelope mr-2 text-xs"></i>rma@osec.nl
          </a>
          <a
            href="tel:0299666662"
            class="rounded-md px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 ring-inset hover:bg-white/10"
          >
            <i class="pi pi-phone mr-2 text-xs"></i>0299 66 66 62
            {{ $t('rma.info.contactOption') }} 4
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/stores/auth'
  import Timeline from '@/volt/Timeline.vue'
  import Tabs from '@/volt/Tabs.vue'
  import TabList from '@/volt/TabList.vue'
  import Tab from '@/volt/Tab.vue'
  import TabPanels from '@/volt/TabPanels.vue'
  import TabPanel from '@/volt/TabPanel.vue'
  import Message from '@/volt/Message.vue'
  import Button from '@/volt/Button.vue'

  const { t } = useI18n()
  const authStore = useAuthStore()
  const isLoggedIn = computed(() => !!authStore.user)

  const stats = computed(() => [
    { value: t('rma.info.stat1Value'), label: t('rma.info.stat1Label') },
    { value: t('rma.info.stat2Value'), label: t('rma.info.stat2Label') },
    { value: t('rma.info.stat3Value'), label: t('rma.info.stat3Label') },
  ])

  const steps = computed(() => [
    {
      icon: 'pi pi-file-edit',
      title: t('rma.info.step1Title'),
      text: t('rma.info.procedureStep1'),
    },
    { icon: 'pi pi-box', title: t('rma.info.step2Title'), text: t('rma.info.procedureStep3') },
    {
      icon: 'pi pi-check-circle',
      title: t('rma.info.step3Title'),
      text: t('rma.info.procedureStep2'),
    },
  ])

  const returnConditions = computed(() => [
    t('rma.info.returnCondition1'),
    t('rma.info.returnCondition2'),
    t('rma.info.returnCondition3'),
  ])

  const dahuaResets = computed(() => [
    t('rma.info.resetDahuaNvr'),
    t('rma.info.resetDahuaCamButton'),
    t('rma.info.resetDahuaCamConfigtool'),
  ])

  const hikvisionResets = computed(() => [
    t('rma.info.resetHikvisionNvr'),
    t('rma.info.resetHikvisionCam'),
  ])
</script>
