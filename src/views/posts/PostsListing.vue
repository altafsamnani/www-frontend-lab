<template>
  <div class="mx-auto">
    <div class="mb-4">
      <h2 class="text-surface-900 dark:text-surface-0 text-2xl font-medium md:text-3xl">
        {{ t('news.title') }}
      </h2>
      <p class="text-surface-500 dark:text-surface-300 mt-1">{{ t('news.subtitle') }}</p>
    </div>

    <Divider />

    <div class="flex flex-col gap-6 lg:flex-row">
      <aside class="w-full shrink-0 lg:w-72">
        <div class="flex flex-col gap-6">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model.trim="searchArg"
              :placeholder="t('news.search_placeholder')"
              class="w-full"
              @keyup.enter="applyFilters"
            />
          </IconField>

          <div>
            <h3 class="text-surface-900 dark:text-surface-0 mb-3 font-medium">
              {{ t('news.categories') }}
            </h3>
            <ul class="flex flex-col gap-1">
              <li>
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  :class="
                    !selectedCategory
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                      : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
                  "
                  @click="selectCategory(null)"
                >
                  <span>{{ t('news.all') }}</span>
                  <Badge :value="allCount" severity="secondary" />
                </button>
              </li>
              <li v-for="categoryFacet in categoryFacets" :key="categoryFacet.slug">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors"
                  :class="
                    selectedCategory === categoryFacet.slug
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                      : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
                  "
                  @click="selectCategory(categoryFacet.slug)"
                >
                  <span class="truncate">{{ categoryFacet.label }}</span>
                  <Badge :value="categoryFacet.count" severity="secondary" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div class="min-w-0 flex-1">
        <LoaderCard v-if="loading" :count="query.page!.size" layout="grid" />
        <div
          v-else-if="!posts.length"
          class="flex flex-col items-center justify-center py-16 text-center"
        >
          <i class="pi pi-inbox text-surface-400 mb-4 text-4xl"></i>
          <p class="text-surface-600 dark:text-surface-300">{{ t('news.no_results') }}</p>
        </div>
        <DataView
          v-else
          :dataKey="'id'"
          :value="posts"
          layout="grid"
          :paginator="paginator.total > query.page!.size"
          :rows="paginator.perPage"
          :first="paginator.first ? paginator.first - 1 : 0"
          :totalRecords="paginator.total"
          :pageLinkSize="5"
          :lazy="true"
          @page="clickOnPaginator"
        >
          <template #grid="slotProps">
            <div class="grid grid-cols-12 gap-4">
              <article
                v-for="postItem in slotProps.items"
                :key="postItem.id"
                class="border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 col-span-12 flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md md:col-span-6 xl:col-span-4"
              >
                <component
                  :is="postLinkComponent(postItem)"
                  v-bind="postLinkProps(postItem)"
                  class="flex h-full flex-col"
                >
                  <div class="bg-surface-100 dark:bg-surface-800 aspect-[2/1] overflow-hidden">
                    <img
                      :src="postImage(postItem)"
                      :alt="postItem.title"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="flex flex-1 flex-col gap-2 p-4">
                    <div
                      class="text-surface-500 dark:text-surface-400 flex items-center gap-2 text-xs"
                    >
                      <Tag
                        v-if="postItem.category"
                        :value="categoryLabel(postItem.category)"
                        severity="secondary"
                      />
                      <span>{{ formatDate(postItem.publishedAt) }}</span>
                    </div>
                    <h3
                      class="text-surface-900 dark:text-surface-0 line-clamp-2 leading-snug font-medium"
                    >
                      {{ postItem.title }}
                    </h3>
                    <p class="text-surface-600 dark:text-surface-300 line-clamp-3 text-sm">
                      {{ postItem.excerpt }}
                    </p>
                    <div class="mt-auto flex items-center justify-between pt-2 text-sm">
                      <span class="text-surface-400 text-xs">
                        {{ postItem.readTime ?? 1 }} {{ t('news.min_read') }}
                      </span>
                      <span
                        v-if="!postItem.noLink"
                        class="text-primary-600 dark:text-primary-400 inline-flex items-center gap-1 font-medium"
                      >
                        {{ t('news.read_more') }} <i class="pi pi-arrow-right text-xs"></i>
                      </span>
                    </div>
                  </div>
                </component>
              </article>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import DataView from 'primevue/dataview'
  import Tag from 'primevue/tag'
  import Badge from 'primevue/badge'
  import dayjs from 'dayjs'
  import { usePostsStore } from '@/stores/posts'
  import LoaderCard from '@/components/icons/LoaderCard.vue'
  import type Post from '@/types/Post'
  import type Query from '@/types/Query'

  const { t, te } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const postsStore = usePostsStore()
  const { posts, facets, paginator } = storeToRefs(postsStore)
  const { fetchPosts, fetchPostsFacets } = postsStore

  const loading = ref(true)
  const searchArg = ref('')
  const selectedCategory = ref<string | null>((route.params.categorySlug as string) || null)
  const query = ref<Query>({
    filter: [],
    order: [{ field: 'publishedAt', dir: 'desc' }],
    page: { size: 12, number: 1 },
  })

  const categoryFacets = computed(() => {
    const items = facets.value.static_categories_agg?.items ?? {}
    return Object.entries(items)
      .map(([slug, count]) => ({
        slug,
        count,
        label: categoryLabel(slug),
      }))
      .sort((facetA, facetB) => facetB.count - facetA.count)
  })

  const allCount = computed(() => {
    const items = facets.value.static_categories_agg?.items ?? {}
    return Object.values(items).reduce((sum, count) => sum + count, 0)
  })

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
    if (postItem.noLink) return 'div'
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

  const buildFilters = () => {
    const filterList: { key: string; op: string; value: string }[] = []
    if (searchArg.value) {
      filterList.push({ key: 'title', op: 'contains', value: searchArg.value })
    }
    if (selectedCategory.value) {
      filterList.push({ key: 'category', op: 'equals', value: selectedCategory.value })
    }
    query.value.filter = filterList
  }

  const loadPosts = async () => {
    loading.value = true
    buildFilters()
    await fetchPosts(query.value)
    loading.value = false
  }

  const applyFilters = async () => {
    query.value.page = { size: query.value.page!.size, number: 1 }
    await loadPosts()
  }

  const selectCategory = (category: string | null) => {
    router.replace({ name: 'News', params: { categorySlug: category || undefined } })
  }

  const clickOnPaginator = async (event: any) => {
    query.value.page = { size: event.rows, number: event.page + 1 }
    await loadPosts()
  }

  onMounted(async () => {
    await loadPosts()
    if (!facets.value.static_categories_agg) {
      await fetchPostsFacets()
    }
  })
</script>
