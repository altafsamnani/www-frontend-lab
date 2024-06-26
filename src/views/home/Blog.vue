<template>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-left">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in posts" :key="post.id" class="flex flex-col items-start justify-between">
            <div class="relative w-full">
              <img :src="post.imageUrl" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
              <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div class="max-w-xl">
              <div class="mt-8 flex items-center gap-x-4 text-xs">
                <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
                <a :href="post.category.href" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.category.title }}</a>
              </div>
              <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a :href="post.href">
                    <span class="absolute inset-0" />
                    {{ post.title }}
                  </a>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4">
                <img :src="post.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-100" />
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">
                    <a :href="post.author.href">
                      <span class="absolute inset-0" />
                      {{ post.author.name }}
                    </a>
                  </p>
                  <p class="text-gray-600">{{ post.author.role }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const posts = [
    {
      id: 1,
      title: 'Dahua actie: Get1 - 4Free!',
      href: '#',
      description:
        'In de maanden juni en juli hebben wij een spraakmakende Dahua-actie voor u waar u ongetwijfeld een goed beeld bij krijgt..Ontvang fantastische cadeaus* bij de volgende netto orderwaarden aan Dahua-producten:',
      imageUrl:
        'https://osec.nl/images/Dahua-Get-1-4-Free-1200x600px.jpg',
      date: 'Mar 16, 2024',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Recks Vos',
        role: 'Marketing Coordinator',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      },
    },
    {
      id: 1,
      title: 'Osec introduceert: testversie Dahua DoLynk Care',
      href: '#',
      description:
        'De testversie van Dahua DoLynk Care in de cloud is nu beschikbaar voor installateurs.',
      imageUrl:
        'https://osec.nl/images/1200x600px-DoLynk-Care.jpg',
      date: 'Mar 16, 2024',
      datetime: '2020-03-16',
      category: { title: 'Frontoffice', href: '#' },
      author: {
        name: 'Margaret Witlox',
        role: 'Front office manager',
        href: '#',
        imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
      },
    },
    {
      id: 1,
      title: 'Osec introduceert: Satel ACSP ',
      href: '#',
      description:
        'De nieuwe adresseerbare brandmeldcentrale met 2 lussen van Satel is uit: de ACSP-402! Neem morgenochtend om 9.00 uur deel aan de ontvlammende webcast en ontvang 20% korting op de eerste ACSP! Naast de BMC is er ook een identiek nevenpaneel beschikbaar - APSP-402 - en uiteraard een uitgebreide lijn bijbehorende componenten.',
      imageUrl:
        'https://www.osec.nl/newsletters/images/Introductie_ACSP_1200x600pxV2_original.jpg',
      date: 'May 01, 2024',
      datetime: '2020-03-16',
      category: { title: 'Sales', href: '#' },
      author: {
        name: 'Patrick Raven',
        role: 'Sr Product Manager',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      },
    }
  ]
  </script>