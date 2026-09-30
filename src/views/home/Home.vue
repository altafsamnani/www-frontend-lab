<template>
  <div>
    <div
      v-if="heroPosts.length"
      class="from-primary-50 to-surface-100 ring-surface-900/5 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800 w-full overflow-hidden rounded-3xl bg-gradient-to-br via-white ring-1 dark:ring-white/10"
    >
      <Carousel
        :value="slider"
        :numVisible="1"
        :numScroll="1"
        orientation="vertical"
        verticalViewPortHeight="28rem"
        circular
        :autoplayInterval="5000"
        :showNavigators="false"
        :pt="{
          item: ({ props }) => ({
            class: ['shrink-0 grow basis-full w-full h-full overflow-hidden'],
          }),
        }"
      >
        <template #item="slotProps">
          <HeroPost :post="slotProps.data.content" />
        </template>
      </Carousel>
    </div>
    <div class="mt-12 flex flex-col gap-y-12 pb-12">
      <ProductCategories />
      <Training />
      <Blog />
      <Cloud />
      <Testimonial />
      <Stats />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  import Carousel from 'primevue/carousel'
  import HeroPost from '@/components/hero/HeroPost.vue'
  import ProductCategories from '@/views/home/ProductCategories.vue'
  import Training from '@/views/home/Training.vue'
  import Blog from '@/views/home/Blog.vue'
  import Cloud from '@/views/Cloud.vue'
  import Testimonial from '@/views/home/Testimonial.vue'
  import Stats from '@/views/home/Stats.vue'
  import { usePostsStore } from '@/stores/posts'

  const postsStore = usePostsStore()
  const { heroPosts } = storeToRefs(postsStore)
  const { fetchHeroPosts } = postsStore

  const slider = computed(() => {
    return heroPosts.value.map((heroPost) => ({ style: 'heropost', content: heroPost }))
  })

  onMounted(async () => {
    if (heroPosts.value.length) return
    await fetchHeroPosts()
  })
</script>
