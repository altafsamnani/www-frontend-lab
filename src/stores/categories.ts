import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategories, getTreeCategories, postCategory, patchCategory, destroyCategory, recoverCategory,  searchCategories } from '@/http/categories'
import type Category from '@/types/Category'

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref([])
  const origCategories = ref([])
  const firstCategories = ref([])
  const treeCategories = ref([])
  const tabCategoryId = ref(0)
  const searchResult = ref([])

  const findCategories = async (searchText: string) => {
    const { data } = await searchCategories(searchText)
    searchResult.value = data
  }

  const fetchAllCategories = async () => {
    const { data } = await getCategories('  ')
    firstCategories.value = data
  }

  const fetchTreeCategories = async () => {
    const { data } = await getTreeCategories()
    treeCategories.value = data
  }

  const fetchCategoriesChildren = async (id: string | string[]) => {
    const { data } = await getCategories(id)
    categories.value = id ? data.children ? data.children : [] : data
    origCategories.value = data
  }

  const fetchCategory = async (id: string | string[]) => {
    const { data } = await getCategories(id)
    categories.value = data
  }

  const createCategory = async (payload: Category) => {
    await postCategory(payload)
  }

  const updateCategory = async (id: string | string[], payload: Category) => {
    await patchCategory(id, payload)
  }

  const deleteCategory = async (id: string|string[]) => {
    await destroyCategory(id)
}

const restoreCategory = async (id: string|string[]) => {
    await recoverCategory(id)
}

  return {
    categories,
    firstCategories,
    origCategories,
    treeCategories,
    searchResult,
    tabCategoryId,
    fetchCategory,
    fetchCategoriesChildren,
    fetchAllCategories,
    fetchTreeCategories,
    findCategories,
    updateCategory,
    createCategory,
    deleteCategory,
    restoreCategory
  }
})
