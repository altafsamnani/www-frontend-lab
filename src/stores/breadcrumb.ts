import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Breadcrumb {
    name: string
    path: string
  }

export const useBreadcrumbStore = defineStore('breadcrumbStore', () => {
  const breadcrumb = ref<Breadcrumb[]>([])

  const setBreadcrumb =  (name: string, path: string) => {
    const breadcrumbValue = { 'name': name, 'path': path }
    breadcrumb.value.length ? breadcrumb.value.push(breadcrumbValue) : breadcrumb.value = [breadcrumbValue]
}

  return {
    breadcrumb,
    setBreadcrumb
  }
})