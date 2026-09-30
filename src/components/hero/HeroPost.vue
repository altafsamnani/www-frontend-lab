<template>
  <div class="relative h-full overflow-hidden">
    <div class="mx-auto h-full max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div
        class="flex flex-col justify-center px-6 py-10 lg:col-span-7 lg:h-full lg:px-0 xl:col-span-6"
      >
        <div class="mx-auto max-w-2xl lg:mx-0">
          <div class="hidden items-center gap-x-3 sm:flex">
            <router-link
              v-if="post.category"
              :to="{ name: 'News', params: { categorySlug: post.category } }"
              class="text-primary-600 ring-primary-600/20 hover:ring-primary-600/40 dark:text-primary-400 dark:ring-primary-400/30 rounded-full px-3 py-1 text-sm leading-6 font-medium ring-1"
            >
              {{ categoryLabel(post.category) }}
            </router-link>
            <span class="text-surface-500 dark:text-surface-400 text-sm leading-6">{{
              formatDate(post.publishedAt)
            }}</span>
          </div>
          <h1
            class="text-surface-900 dark:text-surface-0 mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {{ post.title }}
          </h1>
          <p class="text-surface-600 dark:text-surface-400 mt-6 line-clamp-3 text-lg leading-8">
            {{ post.excerpt }}
          </p>
          <div class="mt-8 flex items-center gap-x-6">
            <component
              v-if="!post.noLink"
              :is="linkComponent"
              v-bind="linkProps"
              class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {{ t('news.read_more') }}
            </component>
            <router-link
              :to="{ name: 'News' }"
              class="text-surface-900 dark:text-surface-0 text-sm leading-6 font-semibold"
            >
              {{ t('home.blog.viewAll') }} <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="relative lg:col-span-5 lg:-mr-8 lg:h-full xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0"
      >
        <img
          :src="postImage"
          :alt="post.title"
          class="bg-surface-50 aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import dayjs from 'dayjs'
  import type Post from '@/types/Post'

  const { t, te } = useI18n()

  const props = defineProps<{
    post: Post
  }>()

  const postImage = computed(() => {
    return (
      props.post.images?.[0]?.urlFull ||
      props.post.images?.[0]?.url ||
      import.meta.env.VITE_DEFAULT_IMAGE
    )
  })

  const isExternalLink = computed(() => {
    return Boolean(props.post.customLink && props.post.customLink.startsWith('http'))
  })

  const linkComponent = computed(() => {
    return isExternalLink.value ? 'a' : 'router-link'
  })

  const linkProps = computed(() => {
    if (isExternalLink.value) {
      return { href: props.post.customLink, target: '_blank', rel: 'noopener' }
    }
    if (props.post.customLink) {
      return { to: props.post.customLink }
    }
    return { to: { name: 'PostDetail', params: { slug: props.post.slug } } }
  })

  const categoryLabel = (category: string) => {
    return te(`topics.${category}`) ? t(`topics.${category}`) : category
  }

  const formatDate = (date: string | null) => {
    return date ? dayjs(date).format('DD-MM-YYYY') : ''
  }
</script>
