<template>
  <div class="mx-auto max-w-4xl">
    <LoaderForm v-if="loading" :columns="1" :rows="6" />

    <div v-else-if="!post" class="flex flex-col items-center justify-center py-16 text-center">
      <i class="pi pi-inbox text-surface-400 mb-4 text-4xl"></i>
      <p class="text-surface-600 dark:text-surface-300 mb-6">{{ t('news.not_found') }}</p>
      <Button :label="t('news.back')" icon="pi pi-arrow-left" outlined @click="goBackToNews" />
    </div>

    <article v-else>
      <div class="mb-4">
        <router-link
          :to="{ name: 'News' }"
          class="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 inline-flex items-center gap-2 text-sm"
        >
          <i class="pi pi-arrow-left text-xs"></i>
          {{ t('news.back') }}
        </router-link>
      </div>

      <div
        v-if="postImageUrl"
        class="bg-surface-100 dark:bg-surface-800 mb-6 aspect-[2/1] overflow-hidden rounded-xl"
      >
        <img :src="postImageUrl" :alt="post.title" class="h-full w-full object-cover" />
      </div>

      <div
        class="text-surface-500 dark:text-surface-400 mb-3 flex flex-wrap items-center gap-3 text-sm"
      >
        <Tag v-if="post.category" :value="categoryLabel(post.category)" severity="secondary" />
        <span>{{ t('news.posted_on') }} {{ formatDate(post.publishedAt) }}</span>
        <span>&middot;</span>
        <span>{{ post.readTime ?? 1 }} {{ t('news.min_read') }}</span>
      </div>

      <h1 class="text-surface-900 dark:text-surface-0 mb-6 text-2xl font-medium md:text-3xl">
        {{ post.title }}
      </h1>

      <div
        v-if="post.restricted"
        class="border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 rounded-xl border p-8 text-center"
      >
        <i class="pi pi-lock text-surface-400 mb-4 text-3xl"></i>
        <h2 class="text-surface-900 dark:text-surface-0 mb-2 font-medium">
          {{ t('news.login_required_title') }}
        </h2>
        <p class="text-surface-600 dark:text-surface-300 mb-6">
          {{ t('news.login_required_text') }}
        </p>
        <Button :label="t('news.login')" icon="pi pi-sign-in" @click="goToLogin" />
      </div>

      <div v-else class="post-body text-surface-700 dark:text-surface-200" v-html="post.body"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import Tag from 'primevue/tag'
  import dayjs from 'dayjs'
  import { usePostsStore } from '@/stores/posts'
  import LoaderForm from '@/components/icons/LoaderForm.vue'

  const { t, te } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const postsStore = usePostsStore()
  const { post } = storeToRefs(postsStore)
  const { fetchPost } = postsStore

  const loading = ref(true)

  const postImageUrl = computed(() => {
    return post.value?.images?.[0]?.urlFull || post.value?.images?.[0]?.url || ''
  })

  const categoryLabel = (category: string) => {
    return te(`topics.${category}`) ? t(`topics.${category}`) : category
  }

  const formatDate = (date: string | null | undefined) => {
    return date ? dayjs(date).format('DD-MM-YYYY') : ''
  }

  const goBackToNews = () => {
    router.push({ name: 'News' })
  }

  const goToLogin = () => {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
  }

  const loadPost = async () => {
    loading.value = true
    post.value = null
    try {
      await fetchPost(route.params.slug as string)
    } catch {
      post.value = null
    }
    loading.value = false
  }

  watch(
    () => route.params.slug,
    async () => {
      if (route.name !== 'PostDetail') return
      await loadPost()
    }
  )

  onMounted(async () => {
    await loadPost()
  })
</script>

<style scoped>
  .post-body :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  .post-body :deep(h1),
  .post-body :deep(h2),
  .post-body :deep(h3),
  .post-body :deep(h4) {
    font-weight: 600;
    margin: 1.5rem 0 0.75rem;
  }

  .post-body :deep(h1) {
    font-size: 1.5rem;
  }

  .post-body :deep(h2) {
    font-size: 1.25rem;
  }

  .post-body :deep(h3) {
    font-size: 1.125rem;
  }

  .post-body :deep(ul),
  .post-body :deep(ol) {
    margin: 0 0 1rem 1.5rem;
  }

  .post-body :deep(ul) {
    list-style: disc;
  }

  .post-body :deep(ol) {
    list-style: decimal;
  }

  .post-body :deep(li) {
    margin-bottom: 0.25rem;
    line-height: 1.7;
  }

  .post-body :deep(a) {
    color: var(--p-primary-500);
    text-decoration: underline;
  }

  .post-body :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  .post-body :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .post-body :deep(td),
  .post-body :deep(th) {
    border: 1px solid var(--p-surface-200);
    padding: 0.5rem;
    vertical-align: top;
  }

  .post-body :deep(iframe) {
    max-width: 100%;
  }

  .post-body :deep(blockquote) {
    border-left: 4px solid var(--p-surface-300);
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
  }
</style>
