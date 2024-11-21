<template>
  <div>
    <div class="bg-white">
      <main class="isolate">
        <!-- Hero section -->
        <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
          <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" aria-hidden="true" />
          <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">We’re a passionate group of people to build the future of security products.</h1>
              <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p class="text-lg leading-8 text-gray-600">We have a selective portfolio of electronic security products in the areas of Burglary, Video, Intercom, Access Control, Building Automation and Fire: we know the products we carry inside and out. With this solid foundation we offer reliability to our customers. But we like to go a few steps further...</p>
              </div>
              <img src="/images/aboutus/1.jpg" alt="" class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
            </div>
          </div>
          <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
  
        <!-- Timeline section -->
        <div class="mx-auto -mt-8 max-w-7xl px-6 lg:px-6">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div v-for="item in timeline" :key="item.name">
              <time :datetime="item.dateTime" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                  <circle cx="2" cy="2" r="2" fill="currentColor" />
                </svg>
                {{ item.date }}
                <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true" />
              </time>
              <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ item.name }}</p>
              <p class="mt-1 text-base leading-7 text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
  
        <!-- Logo cloud -->
         <Cloud/>

        <!-- Content section -->
        <div class="mt-32 overflow-hidden sm:mt-40">
          <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our people</h2>
                <p class="mt-6 text-xl leading-8 text-gray-600">At Osec B.V., we are proud to have a talented and dedicated team of professionals who work together to deliver exceptional services and solutions to our clients.</p>
                <p class="mt-6 text-base leading-7 text-gray-600">With a passion for innovation and collaboration, each team member brings a unique set of skills and expertise to the table.</p>
              </div>
              <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img src="/images/aboutus/7.jpeg" alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                </div>
                <div class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img src="/images/aboutus/5.jpg" alt="" class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                  </div>
                  <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img src="/images/aboutus/3.jpg" alt="" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                  </div>
                  <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img src="/images/aboutus/6.jpeg" alt="" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Stats -->
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We approach the workplace as something that adds to our wholesalers and adds value to their clients.</h2>
            <p class="mt-6 text-base leading-7 text-gray-600">With our knowledge training, events and line of products, we help you to grow our wholesalers and suppliers business.</p>
          </div>
          <div class="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
            <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
              <p class="flex-none text-3xl font-bold tracking-tight text-gray-900">5k</p>
              <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p class="text-lg font-semibold tracking-tight text-gray-900">Wholesalers on the platform</p>
                <p class="mt-2 text-base leading-7 text-gray-600">Whoesaler from Netherlands, Belgium and Germany</p>
              </div>
            </div>
            <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
              <p class="flex-none text-3xl font-bold tracking-tight text-white">$50 million</p>
              <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p class="text-lg font-semibold tracking-tight text-white">We’re proud that our installers, suppliers and customers have made over $50 million in total revenue.</p>
                <p class="mt-2 text-base leading-7 text-gray-400">True value to our clients with 4x profits on our product line</p>
              </div>
            </div>
            <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-indigo-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
              <p class="flex-none text-3xl font-bold tracking-tight text-white">5% growth</p>
              <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p class="text-lg font-semibold tracking-tight text-white">Growth this year</p>
                <p class="mt-2 text-base leading-7 text-indigo-200">Osec has grown by 5% since last year</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Content section -->
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div class="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
            <div class="w-full lg:max-w-lg lg:flex-auto">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We’re always looking for awesome people to join us</h2>
              <p class="mt-6 text-xl leading-8 text-gray-600">In order to continue to serve our customers at a high level, our driven team of professionals is looking for enthusiastic colleagues for the following positions:</p>
              <img src="/images/aboutus/2.png" alt="" class="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]" />
            </div>
            <div class="w-full lg:max-w-xl lg:flex-auto">
              <h3 class="sr-only">Job openings</h3>
              <ul class="-my-8 divide-y divide-gray-100">
                <li v-for="opening in jobOpenings" :key="opening.id" class="py-8">
                  <dl class="relative flex flex-wrap gap-x-3">
                    <dt class="sr-only">Role</dt>
                    <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                      <a :href="opening.href">
                        {{ opening.role }}
                        <span class="absolute inset-0" aria-hidden="true" />
                      </a>
                    </dd>
                    <dt class="sr-only">Description</dt>
                    <dd class="mt-2 w-full flex-none text-base leading-7 text-gray-600">{{ opening.description }}</dd>
                    <dt class="sr-only">Salary</dt>
                    <dd class="mt-4 text-base font-semibold leading-7 text-gray-900">{{ opening.salary }}</dd>
                    <dt class="sr-only">Location</dt>
                    <dd class="mt-4 flex items-center gap-x-3 text-base leading-7 text-gray-500">
                      <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300" aria-hidden="true">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      {{ opening.location }}
                    </dd>
                  </dl>
                </li>
              </ul>
              <div class="mt-8 flex border-t border-gray-100 pt-8">
                <a href="#" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">View all openings <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import Cloud from '@/views/Cloud.vue';

  const timeline = [
    {
      name: 'Founded Osec B.V and merger of Osec security',
      description:
        'Osec was founded in 2005 by Erwin Otten and is a merger of Otten Security.',
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
      description:
        'Officialy launched online web portal for installers and customers.',
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