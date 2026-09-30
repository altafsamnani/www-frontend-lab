<template>
  <div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="text-left">
          <h2 class="text-primary-600 dark:text-primary-400 text-base leading-7 font-semibold">
            {{ t('home.blog.eyebrow') }}
          </h2>
          <p
            class="text-surface-900 dark:text-surface-0 mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {{ t('home.blog.title') }}
          </p>
          <p class="text-surface-600 dark:text-surface-400 mt-6 text-lg leading-8">
            {{ t('home.blog.subtitle') }}
          </p>
        </div>
        <router-link
          :to="{ name: 'News' }"
          class="text-primary-600 hover:text-primary-500 dark:text-primary-400 inline-flex items-center gap-2 text-sm font-semibold"
        >
          {{ t('home.blog.viewAll') }} <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
      <LoaderCard v-if="loading" :count="3" layout="grid" class="mt-16" />
      <div
        v-else
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="postItem in homePosts"
          :key="postItem.id"
          class="flex flex-col items-start justify-between"
        >
          <div class="relative w-full">
            <img
              :src="postImage(postItem)"
              :alt="postItem.title"
              class="bg-surface-100 aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              loading="lazy"
            />
            <div class="ring-surface-900/10 absolute inset-0 rounded-2xl ring-1 ring-inset" />
          </div>
          <div class="max-w-xl">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time :datetime="postItem.publishedAt ?? ''" class="text-surface-500">{{
                formatDate(postItem.publishedAt)
              }}</time>
              <router-link
                v-if="postItem.category"
                :to="{ name: 'News', params: { categorySlug: postItem.category } }"
                class="bg-surface-50 text-surface-600 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700 relative z-10 rounded-full px-3 py-1.5 font-medium"
              >
                {{ categoryLabel(postItem.category) }}
              </router-link>
            </div>
            <div class="group relative">
              <h3
                class="text-surface-900 group-hover:text-surface-600 dark:text-surface-0 dark:group-hover:text-surface-300 mt-3 text-lg leading-6 font-semibold"
              >
                <component :is="postLinkComponent(postItem)" v-bind="postLinkProps(postItem)">
                  <span class="absolute inset-0" />
                  {{ postItem.title }}
                </component>
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mt-5 line-clamp-3 text-sm leading-6">
                {{ postItem.excerpt }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import dayjs from 'dayjs'
  import { usePostsStore } from '@/stores/posts'
  import LoaderCard from '@/components/icons/LoaderCard.vue'
  import type Post from '@/types/Post'

  const { t, te } = useI18n()
  const postsStore = usePostsStore()
  const { homePosts } = storeToRefs(postsStore)
  const { fetchHomePosts } = postsStore

  const loading = ref(false)

  const categoryLabel = (category: string) => {
    return te(`topics.${category}`) ? t(`topics.${category}`) : category
  }

  const formatDate = (date: string | null) => {
    return date ? dayjs(date).format('DD-MM-YYYY') : ''
  }

  const postImage = (postItem: Post) => {
    return (
      postItem.images?.[0]?.urlFull ||
      postItem.images?.[0]?.url ||
      import.meta.env.VITE_DEFAULT_IMAGE
    )
  }

  const isExternalLink = (postItem: Post) => {
    return Boolean(postItem.customLink && postItem.customLink.startsWith('http'))
  }

  const postLinkComponent = (postItem: Post) => {
    if (postItem.noLink) return 'span'
    return isExternalLink(postItem) ? 'a' : 'router-link'
  }

  const postLinkProps = (postItem: Post) => {
    if (postItem.noLink) return {}
    if (isExternalLink(postItem)) {
      return { href: postItem.customLink, target: '_blank', rel: 'noopener' }
    }
    if (postItem.customLink) {
      return { to: postItem.customLink }
    }
    return { to: { name: 'PostDetail', params: { slug: postItem.slug } } }
  }

  onMounted(async () => {
    if (homePosts.value.length) return
    loading.value = true
    await fetchHomePosts()
    loading.value = false
  })
</script>
