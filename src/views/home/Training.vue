<template>
    <div class="overflow-hidden bg-white py-8 sm:py-8">
        <div class="mx-auto max-w-7xl md:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div class="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                        <h2 class="text-base font-semibold leading-7 text-indigo-600">Osec, Training</h2>
                        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Osec, Training</p>
                        <p class="mt-6 text-lg leading-8 text-gray-600">Portfolio of electronic security products in the
                            areas of Burglary, Video, Intercom, Access Control, Building Automation and Fire.</p>
                        <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                            <div v-for="feature in features" :key="feature.name" class="relative pl-9">
                                <i :class="[feature.icon, 'text-lg']"></i>
                                {{ ' ' }}
                                <dd class="inline">{{ feature.description }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="sm:px-24 lg:px-24 py-24 lg:py-24">
                    <ul role="list" class="-mb-8">
                        <li v-for="(event, eventIdx) in timeline" :key="event.id">
                            <div class="relative pb-8">
                                <span v-if="eventIdx !== timeline.length - 1"
                                    class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span
                                            :class="[event.iconBackground, 'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white']">
                                            <component :is="event.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">
                                                {{ event.content }} <a :href="event.href"
                                                    class="font-medium text-gray-900">{{ event.target }}</a>
                                            </p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time :datetime="event.datetime">{{ event.date }}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CheckIcon, HandThumbUpIcon, UserIcon, CalendarDaysIcon } from '@heroicons/vue/20/solid'
const features = [
    {
        name: 'Best in class',
        description:
            'We have a team of experts who are passionate about what they do.',
        href: '#',
        icon: 'pi pi-bell',
    },
    {
        name: 'Quality trainings',
        description:
            'Everyone is welcome to attend our trainings and attend our events.',
        href: '#',
        icon: 'pi pi-shield',
    },
    {
        name: 'No 1 on the market',
        description:
            'We have a huge portfolio of products and services from all the security sectors.',
        href: '#',
        icon: 'pi pi-lock',
    },
];
const timeline = [
  {
    id: 1,
    content: 'Registration is open for',
    target: 'Axxon One certificeringstraining',
    href: '#',
    date: 'July 20',
    datetime: '2020-09-20',
    icon: CalendarDaysIcon,
    iconBackground: 'bg-orange-400',
  },
  {
    id: 2,
    content: 'Enhance your skills by attending',
    target: 'Ajax Fibra en Superior training',
    href: '#',
    date: 'Jun 28',
    datetime: '2020-09-22',
    icon: CalendarDaysIcon,
    iconBackground: 'bg-orange-500',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'BAS-IP kennismaking training',
    href: '#',
    date: 'May 28',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'After Work Training - Dahua IP video voor starters',
    href: '#',
    date: 'May 20',
    datetime: '2020-09-30',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'BAS-IP kennismaking training',
    href: '#',
    date: 'Apr 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];
</script>