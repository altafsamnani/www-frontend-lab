<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        {{ t('general.label_categories') }}
      </template>
      <template v-slot:actions>
        <router-link :to="{ name: 'CategoryCreate' }"
          ><Button severity="secondary" :label="t('button.new')"
        /></router-link>
      </template>
    </PageHeader>

    <Divider />

    <div
      role="tablist"
      v-if="firstCategories.length"
      class="m-0 my-8 flex flex-1 list-none border-b-2 border-zinc-900/5 p-0 dark:border-white/10"
    >
      <router-link
        :to="{ name: 'Categories' }"
        role="tab"
        class="focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50 text-decoration-none user-select-none relative -mb-[2px] flex cursor-pointer items-center overflow-hidden rounded-t-md p-5 font-bold transition-all duration-200 select-none focus-visible:ring focus-visible:outline-offset-0 focus-visible:outline-none focus-visible:ring-inset"
        :class="{
          'border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 border-b-2':
            !categoryId,
        }"
        >{{ t('general.label_all') }}</router-link
      >
      <router-link
        :to="{ name: 'Categories', params: { id: category.id } }"
        role="tab"
        class="focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50 text-decoration-none user-select-none relative -mb-[2px] flex cursor-pointer items-center overflow-hidden rounded-t-md p-5 font-bold transition-all duration-200 select-none focus-visible:ring focus-visible:outline-offset-0 focus-visible:outline-none focus-visible:ring-inset"
        :class="{
          'border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 border-b-2':
            category.id == tabCategoryId,
        }"
        v-for="category in firstCategories"
        :key="category.id"
        >{{ category.name }}</router-link
      >
    </div>
    <LoaderCard
      :count="5"
      v-if="!categories.length && isLoading"
      class="my-16 flex flex-wrap gap-6"
    >
    </LoaderCard>
    <div v-if="categories.length">
      <draggable
        tag="div"
        class="dragArea list-group flex w-full flex-wrap gap-6"
        v-model="categories"
        handle=".handle"
        ghostClass="ghost"
        direction="horizontal"
        @change="onDraggableChange"
        item-key="id"
        :disabled="isDisabled"
      >
        <template #item="{ element }">
          <CategoryCard :key="element.id" :category="element" @categoryClick="onCategoryClick" />
        </template>
      </draggable>
    </div>
    <div v-else>
      <AddCard :createPathName="'CategoryCreate'" v-if="!isLoading"></AddCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useBreadcrumbStore } from '@/stores/breadcrumb'
  import { useCategoryStore } from '@/stores/categories'
  import draggable from 'vuedraggable'
  import PageHeader from '@/components/PageHeader.vue'
  import CategoryCard from '@/components/CategoryCard.vue'
  import LoaderCard from '@/components/icons/LoaderCard.vue'
  import AddCard from '@/components/icons/AddCard.vue'
  import type Category from '@/types/Category'

  const { t } = useI18n()
  const route = useRoute()
  const breadcrumbStore = useBreadcrumbStore()
  const { setBreadcrumb } = breadcrumbStore
  const { breadcrumb } = storeToRefs(breadcrumbStore)
  const categoryStore = useCategoryStore()
  const { categories, firstCategories, origCategories, tabCategoryId } = storeToRefs(categoryStore)
  const { fetchCategoriesChildren, fetchAllCategories, updateCategory } = categoryStore
  const isLoading = ref(true)
  const isDisabled = ref(false)
  const categoryId = ref(route.params.id)
  const active = ref()

  onMounted(async () => {
    categories.value = []
    if (!firstCategories.value.length) {
      await fetchAllCategories()
    }

    if (categoryId.value) {
      let tabId = firstCategories.value.find((element) => element.id === categoryId.value)
      tabCategoryId.value = tabId ? tabId.id : tabCategoryId.value
      await fetchCategoriesChildren(categoryId.value).then(() => {
        isLoading.value = false
      })
    } else {
      categories.value = firstCategories.value
      isLoading.value = false
      tabCategoryId.value = 0
    }
  })

  const onDraggableChange = (event) => {
    if (event.moved) {
      for (let i = 0; i < categories.value.length; i++) {
        if (categories.value[i].order !== i) {
          isDisabled.value = true
          categories.value[i].order = i
          updateCategory(categories.value[i].id, categories.value[i])
        }
      }
      isDisabled.value = false
    }
  }

  const onCategoryClick = (clickedCategory) => {
    setBreadcrumb(clickedCategory.name, 'Categories/' + clickedCategory.id)
  }
</script>

<style scoped>
  .handle {
    cursor: move;
  }

  .ghost {
    opacity: 0.8;
    /* @apply bg-base-300; */
  }
</style>
