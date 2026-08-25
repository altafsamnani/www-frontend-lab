<template>
  <div class="flex flex-col gap-y-12 pb-12">
    <div
      class="from-primary-50 to-surface-100 ring-surface-900/5 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800 overflow-hidden rounded-3xl bg-gradient-to-br via-white ring-1 dark:ring-white/10"
    >
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div
          class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16"
        >
          <div>
            <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
              {{ t('about.eyebrow') }}
            </h2>
            <h1
              class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              We’re a passionate group of people to build the future of security products.
            </h1>
            <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
              We have a selective portfolio of electronic security products in the areas of
              Burglary, Video, Intercom, Access Control, Building Automation and Fire: we know the
              products we carry inside and out. With this solid foundation we offer reliability to
              our customers. But we like to go a few steps further...
            </p>
          </div>
          <img
            src="/images/aboutus/1.jpg"
            alt=""
            class="ring-surface-900/10 mt-10 aspect-[6/5] w-full rounded-2xl object-cover ring-1 lg:mt-0 dark:ring-white/10"
          />
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
        {{ t('about.storyEyebrow') }}
      </h2>
      <div
        class="mt-8 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:max-w-none lg:grid-cols-4"
      >
        <div v-for="item in timeline" :key="item.name">
          <time
            :datetime="item.dateTime"
            class="text-primary-600 dark:text-primary-400 flex items-center text-sm leading-6 font-semibold"
          >
            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </svg>
            {{ item.date }}
            <div
              class="bg-surface-900/10 absolute -ml-2 h-px w-screen -translate-x-full sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0 dark:bg-white/15"
              aria-hidden="true"
            />
          </time>
          <p
            class="text-surface-900 dark:text-surface-0 mt-6 text-lg leading-8 font-semibold tracking-tight"
          >
            {{ item.name }}
          </p>
          <p class="text-surface-600 dark:text-surface-400 mt-1 text-base leading-7">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <Cloud />

    <div
      class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 overflow-hidden rounded-3xl py-12 ring-1 dark:ring-white/10"
    >
      <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8"
        >
          <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
              {{ t('about.peopleEyebrow') }}
            </h2>
            <p
              class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Our people
            </p>
            <p class="text-surface-600 dark:text-surface-400 mt-6 text-xl leading-8">
              At Osec B.V., we are proud to have a talented and dedicated team of professionals who
              work together to deliver exceptional services and solutions to our clients.
            </p>
            <p class="text-surface-600 dark:text-surface-400 mt-6 text-base leading-7">
              With a passion for innovation and collaboration, each team member brings a unique set
              of skills and expertise to the table.
            </p>
          </div>
          <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                src="/images/aboutus/7.jpeg"
                alt=""
                class="bg-surface-50 aspect-[7/5] w-[37rem] max-w-none rounded-2xl object-cover"
              />
            </div>
            <div
              class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8"
            >
              <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                <img
                  src="/images/aboutus/5.jpg"
                  alt=""
                  class="bg-surface-50 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl object-cover"
                />
              </div>
              <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <img
                  src="/images/aboutus/3.jpg"
                  alt=""
                  class="bg-surface-50 aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl object-cover"
                />
              </div>
              <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img
                  src="/images/aboutus/6.jpeg"
                  alt=""
                  class="bg-surface-50 aspect-[4/3] w-[24rem] max-w-none rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
          {{ t('about.impactEyebrow') }}
        </h2>
        <p
          class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          We approach the workplace as something that adds to our wholesalers and adds value to
          their clients.
        </p>
        <p class="text-surface-600 dark:text-surface-400 mt-6 text-base leading-7">
          With our knowledge training, events and line of products, we help you to grow our
          wholesalers and suppliers business.
        </p>
      </div>
      <div
        class="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end"
      >
        <div
          class="bg-surface-50 ring-surface-900/5 dark:bg-surface-800/50 flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 ring-1 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start dark:ring-white/10"
        >
          <p
            class="text-surface-900 dark:text-surface-0 flex-none text-3xl font-bold tracking-tight"
          >
            5k
          </p>
          <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p class="text-surface-900 dark:text-surface-0 text-lg font-semibold tracking-tight">
              Wholesalers on the platform
            </p>
            <p class="text-surface-600 dark:text-surface-400 mt-2 text-base leading-7">
              Whoesaler from Netherlands, Belgium and Germany
            </p>
          </div>
        </div>
        <div
          class="bg-surface-900 dark:bg-surface-800 flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44"
        >
          <p class="flex-none text-3xl font-bold tracking-tight text-white">$50 million</p>
          <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p class="text-lg font-semibold tracking-tight text-white">
              We’re proud that our installers, suppliers and customers have made over $50 million in
              total revenue.
            </p>
            <p class="text-surface-400 mt-2 text-base leading-7">
              True value to our clients with 4x profits on our product line
            </p>
          </div>
        </div>
        <div
          class="bg-primary-600 flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28"
        >
          <p class="flex-none text-3xl font-bold tracking-tight text-white">5% growth</p>
          <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p class="text-lg font-semibold tracking-tight text-white">Growth this year</p>
            <p class="text-primary-200 mt-2 text-base leading-7">
              Osec has grown by 5% since last year
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row"
      >
        <div class="w-full lg:max-w-lg lg:flex-auto">
          <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
            {{ t('about.careersEyebrow') }}
          </h2>
          <p
            class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            We’re always looking for awesome people to join us
          </p>
          <p class="text-surface-600 dark:text-surface-400 mt-6 text-xl leading-8">
            In order to continue to serve our customers at a high level, our driven team of
            professionals is looking for enthusiastic colleagues for the following positions:
          </p>
          <img
            src="/images/aboutus/2.png"
            alt=""
            class="bg-surface-50 mt-16 aspect-[6/5] w-full rounded-2xl object-cover lg:aspect-auto lg:h-[34.5rem]"
          />
        </div>
        <div class="w-full lg:max-w-xl lg:flex-auto">
          <h3 class="sr-only">Job openings</h3>
          <ul class="divide-surface-100 dark:divide-surface-800 -my-8 divide-y">
            <li v-for="opening in jobOpenings" :key="opening.id" class="py-8">
              <dl class="relative flex flex-wrap gap-x-3">
                <dt class="sr-only">Role</dt>
                <dd
                  class="text-surface-900 dark:text-surface-0 w-full flex-none text-lg font-semibold tracking-tight"
                >
                  <a :href="opening.href">
                    {{ opening.role }}
                    <span class="absolute inset-0" aria-hidden="true" />
                  </a>
                </dd>
                <dt class="sr-only">Description</dt>
                <dd
                  class="text-surface-600 dark:text-surface-400 mt-2 w-full flex-none text-base leading-7"
                >
                  {{ opening.description }}
                </dd>
                <dt class="sr-only">Salary</dt>
                <dd
                  class="text-surface-900 dark:text-surface-0 mt-4 text-base leading-7 font-semibold"
                >
                  {{ opening.salary }}
                </dd>
                <dt class="sr-only">Location</dt>
                <dd
                  class="text-surface-500 dark:text-surface-400 mt-4 flex items-center gap-x-3 text-base leading-7"
                >
                  <svg
                    viewBox="0 0 2 2"
                    class="fill-surface-300 h-0.5 w-0.5 flex-none"
                    aria-hidden="true"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  {{ opening.location }}
                </dd>
              </dl>
            </li>
          </ul>
          <div class="border-surface-100 dark:border-surface-800 mt-8 flex border-t pt-8">
            <a
              href="#"
              class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-sm leading-6 font-semibold"
              >View all openings <span aria-hidden="true">&rarr;</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import Cloud from '@/views/Cloud.vue'

  const { t } = useI18n()

  const timeline = [
    {
      name: 'Founded Osec B.V and merger of Osec security',
      description: 'Osec was founded in 2005 by Erwin Otten and is a merger of Otten Security.',
      date: 'Dec 2005',
      dateTime: '2021-12',
    },
    {
      name: 'Partner with Sate, Ajax Dahua',
      description:
        'Achieved first milestone by becoming official reseller of Dahua, Ajax and Satel.',
      date: 'Feb 2011',
      dateTime: '2022-02',
    },
    {
      name: 'Moved into the Purmerend office with official warehouse ',
      description:
        'Osec grew by 150% and moved into the new office in 2010 in Purmerend, Netherlands.',
      date: 'Jun 2013',
      dateTime: '2022-02',
    },
    {
      name: 'Launch of online web portal',
      description: 'Officialy launched online web portal for installers and customers.',
      date: 'Dec 2015',
      dateTime: '2022-12',
    },
  ]
  const jobOpenings = [
    {
      id: 1,
      role: 'Administratief Medewerker Magazijn',
      href: 'https://osec.nl/page/administratief-medewerker-magazijn',
      description:
        'In deze functie hou je je bezig met het verwerken van geretourneerde technische beveiligingsproducten. Je controleert bij binnenkomst de verpakkingen en producten op uiterlijke staat en volledigheid. ',
      salary: '€35,000',
      location: 'Purmerend, NL',
    },
    {
      id: 2,
      role: 'Magazijnmedewerker',
      href: 'https://osec.nl/page/medewerker-magazijn',
      description:
        'Als magazijnmedewerker hou je je vooral bezig met het verzamelen en verzendklaar maken van orders. ',
      salary: '€37,000',
      location: 'Purmerend, NL',
    },
    {
      id: 3,
      role: 'Junior Productmanager Inbraak en Toegangscontrole',
      href: 'https://osec.nl/page/productmanager-inbraak-en-toegangscontrole',
      description:
        'Als Junior Productmanager vervul je samen met het Productmanagement team een centrale rol bij het presenteren en bewaken van de kwaliteit van de door ons gevoerde producten.',
      salary: '€45,000',
      location: 'Purmerend, NL',
    },
  ]
</script>
