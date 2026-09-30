<template>
  <!-- Testimonials section -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="relative">
      <div
        class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          class="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div
        class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-8 opacity-25 blur-3xl xl:justify-end"
        aria-hidden="true"
      >
        <div
          class="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:mr-[calc(50%-12rem)] xl:ml-0"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-xl sm:text-center">
          <h2 class="text-primary-600 text-lg leading-8 font-semibold tracking-tight">
            What are people saying?
          </h2>
          <p class="text-surface-900 mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            We have worked with thousands of amazing people
          </p>
        </div>
        <div
          class="text-surface-900 mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4"
        >
          <figure
            class="sm:ring-surface-900/5 col-span-2 hidden sm:block sm:rounded-2xl sm:shadow-lg sm:ring-1 xl:col-start-2 xl:row-end-1"
          >
            <blockquote
              class="text-surface-900 p-12 text-xl leading-8 font-semibold tracking-tight"
            >
              <p>{{ `“${featuredTestimonial.body}”` }}</p>
            </blockquote>
            <figcaption class="border-surface-900/10 flex items-center gap-x-4 border-t px-6 py-4">
              <img
                class="bg-surface-50 h-10 w-10 flex-none rounded-full"
                :src="featuredTestimonial.author.imageUrl"
                alt=""
              />
              <div class="flex-auto">
                <div class="font-semibold">{{ featuredTestimonial.author.name }}</div>
                <div class="text-surface-600">{{ `@${featuredTestimonial.author.handle}` }}</div>
              </div>
              <img class="h-10 w-auto flex-none" :src="featuredTestimonial.author.logoUrl" alt="" />
            </figcaption>
          </figure>
          <div
            v-for="(columnGroup, columnGroupIdx) in testimonials"
            :key="columnGroupIdx"
            class="space-y-8 xl:contents xl:space-y-0"
          >
            <div
              v-for="(column, columnIdx) in columnGroup"
              :key="columnIdx"
              :class="[
                (columnGroupIdx === 0 && columnIdx === 0) ||
                (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                  ? 'xl:row-span-2'
                  : 'xl:row-start-1',
                'space-y-8',
              ]"
            >
              <figure
                v-for="testimonial in column"
                :key="testimonial.author.handle"
                class="ring-surface-900/5 rounded-2xl p-6 shadow-lg ring-1"
              >
                <blockquote class="text-surface-900">
                  <p>{{ `“${testimonial.body}”` }}</p>
                </blockquote>
                <figcaption class="mt-6 flex items-center gap-x-4">
                  <img
                    class="bg-surface-50 h-10 w-10 rounded-full"
                    :src="testimonial.author.imageUrl"
                    alt=""
                  />
                  <div>
                    <div class="font-semibold">{{ testimonial.author.name }}</div>
                    <div class="text-surface-600">{{ `@${testimonial.author.handle}` }}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const featuredTestimonial = {
    body: 'Osec B.V has been a game-changer for our organization. Their comprehensive security solutions have helped us protect our sensitive data and comply with industry regulations. Their team of experts is always responsive and proactive in addressing any security concerns. We highly recommend their services to any organization looking for a reliable and trustworthy security partner.',
    author: {
      name: 'Brenna Goyette',
      handle: 'brennagoyette',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
      logoUrl: 'https://www.camerashop24.nl/media/logo/stores/1/logo_1_.png',
    },
  }
  const testimonials = [
    [
      [
        {
          body: 'Osec B.V has been a trusted partner for our security needs for over a decade. Their team of experts has helped us protect our business from cyber threats and maintain compliance with industry regulations. We highly recommend their services to any organization looking for reliable security solutions',
          author: {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
      [
        {
          body: 'We were facing a significant security breach in our online presence. Osec B.V stepped in and quickly identified and resolved the issue. Their expertise and professionalism impressed us, and we have continued to work with them for all our security needs. We are confident that our data is safe in their hands.',
          author: {
            name: 'Lindsay Walton',
            handle: 'lindsaywalton',
            imageUrl:
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
    ],
    [
      [
        {
          body: '"Osec B.V has been instrumental in enhancing our cybersecurity posture. Their team of experts has helped us strengthen our incident response capabilities, implement robust security protocols, and stay ahead of evolving threats. Their dedication to customer satisfaction is unparalleled, and we highly recommend their services to any organization looking to protect their digital assets.',
          author: {
            name: 'Tom Cook',
            handle: 'tomcook',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
      [
        {
          body: 'We were facing a high level of cyber risk, and Osec B.V came in and audited our security practices. Their thorough assessment and recommendations helped us identify vulnerabilities and implement necessary improvements. Their expertise and commitment to continuous learning have been invaluable. We are grateful for their support and trust them with our security needs.',
          author: {
            name: 'Leonard Krasner',
            handle: 'leonardkrasner',
            imageUrl:
              'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        // More testimonials...
      ],
    ],
  ]
</script>
