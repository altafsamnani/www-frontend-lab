<template>
  <div
    class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 overflow-hidden rounded-3xl py-12 ring-1 dark:ring-white/10"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
        {{ t('home.training.eyebrow') }}
      </h2>
      <p
        class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {{ t('home.training.title') }}
      </p>
      <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
        {{ t('home.training.subtitle') }}
      </p>
      <Carousel
        :value="trainings"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        class="-mx-3 mt-10"
        :pt="{
          contentContainer: { class: 'w-full min-w-0' },
          content: { class: 'flex w-full min-w-0 items-center' },
          viewport: { class: 'w-full min-w-0 flex-1 overflow-hidden' },
          itemList: { class: 'flex' },
          item: { class: 'shrink-0 grow-0 basis-full min-w-0 px-3 sm:basis-1/2 lg:basis-1/3' },
        }"
      >
        <template #item="{ data }">
          <article class="group relative flex h-full flex-col">
            <div class="relative w-full">
              <img
                :src="data.imageUrl"
                :alt="data.title"
                class="bg-surface-100 dark:bg-surface-800 aspect-[3/2] w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <div
                class="ring-surface-900/10 absolute inset-0 rounded-2xl ring-1 ring-inset dark:ring-white/10"
              />
            </div>
            <div class="mt-6 flex items-center gap-x-4 text-xs">
              <time :datetime="data.datetime" class="text-surface-500 dark:text-surface-400">{{
                data.date
              }}</time>
              <span
                class="bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300 rounded-full px-3 py-1.5 font-medium"
                >{{ data.level }}</span
              >
            </div>
            <h3
              class="text-surface-900 group-hover:text-surface-600 dark:text-surface-0 dark:group-hover:text-surface-300 mt-3 text-lg leading-6 font-semibold"
            >
              <a :href="data.href">
                <span class="absolute inset-0" />
                {{ data.title }}
              </a>
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mt-3 line-clamp-2 text-sm leading-6">
              {{ data.description }}
            </p>
            <div class="mt-auto flex items-center justify-between pt-5 text-sm">
              <span class="text-surface-500 dark:text-surface-400 flex items-center gap-x-1.5">
                <i class="pi pi-map-marker text-xs" />{{ data.location }}
              </span>
              <span class="text-primary-600 dark:text-primary-400 font-semibold"
                >{{ t('home.training.register') }} <span aria-hidden="true">&rarr;</span></span
              >
            </div>
          </article>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import Carousel from 'primevue/carousel'
  import type { Training } from '@/types/Training'

  const { t } = useI18n()

  const responsiveOptions = ref([
    { breakpoint: '1023px', numVisible: 2, numScroll: 1 },
    { breakpoint: '639px', numVisible: 1, numScroll: 1 },
  ])

  const trainings = ref<Training[]>([
    {
      id: 1,
      title: 'Axxon One certificeringstraining',
      description:
        'Word gecertificeerd Axxon One-installateur en haal alles uit dit krachtige VMS-platform, van slimme zoekfuncties tot AI-analytics.',
      imageUrl: 'https://osec.nl/files/images/cat/448204a13b4e3ac93ea5d230fd046d6a.jpg',
      level: 'Certificering',
      date: 'Sep 15, 2026',
      datetime: '2026-09-15',
      location: 'Osec Experience Center',
      href: '#',
    },
    {
      id: 2,
      title: 'Ajax Fibra en Superior training',
      description:
        'Praktische verdieping in de bekabelde Fibra-lijn en de Superior-serie: topologie, voeding en configuratie in de praktijk.',
      imageUrl: 'https://osec.nl/files/images/cat/f0b9862a8d8a1e6396c4bbc022e5b346.jpg',
      level: 'Verdieping',
      date: 'Sep 29, 2026',
      datetime: '2026-09-29',
      location: 'Osec Experience Center',
      href: '#',
    },
    {
      id: 3,
      title: 'BAS-IP kennismakingstraining',
      description:
        'Maak kennis met het BAS-IP intercomplatform: opbouw van een project, koppelingen en de belangrijkste apps en diensten.',
      imageUrl: 'https://osec.nl/files/images/cat/05bdafa02ff1b7cfe35abbbb5480b69a.jpg',
      level: 'Kennismaking',
      date: 'Okt 8, 2026',
      datetime: '2026-10-08',
      location: 'Online',
      href: '#',
    },
    {
      id: 4,
      title: 'After Work: Dahua IP video voor starters',
      description:
        "Laagdrempelige avondtraining voor starters: camera's aansluiten, recorders configureren en beelden veilig op afstand bekijken.",
      imageUrl: 'https://osec.nl/images/1200x600px-DoLynk-Care.jpg',
      level: 'Starters',
      date: 'Okt 22, 2026',
      datetime: '2026-10-22',
      location: 'Osec Experience Center',
      href: '#',
    },
    {
      id: 5,
      title: 'Satel ACSP producttraining',
      description:
        'Alles over de adresseerbare ACSP-brandmeldcentrale: projectering, lusbekabeling en inbedrijfstelling volgens de norm.',
      imageUrl: 'https://www.osec.nl/newsletters/images/Introductie_ACSP_1200x600pxV2_original.jpg',
      level: 'Product',
      date: 'Nov 5, 2026',
      datetime: '2026-11-05',
      location: 'Osec Experience Center',
      href: '#',
    },
    {
      id: 6,
      title: 'Hikvision AcuSense workshop',
      description:
        'Hands-on workshop over AcuSense-technologie: nauwkeurige detectie instellen en loze meldingen tot een minimum beperken.',
      imageUrl: 'https://osec.nl/files/images/cat/9264f3a249e69e5ad944e65da9b96a0d.jpg',
      level: 'Workshop',
      date: 'Nov 19, 2026',
      datetime: '2026-11-19',
      location: 'Online',
      href: '#',
    },
  ])
</script>
