import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postFiles, postLink, postFileCollection } from '../http/files'
import type FileCollection from '@/types/FileCollection'

export const useFilesStore = defineStore('filesStore', () => {
  const storedFiles = ref<{ id: number, name: string, icon: string,  url: string }>({})
  const storedLinks = ref<{ id: number, name: string, icon: string,  url: string }>({})
  const fileCollection = ref(null)
  const storeFiles = async (payload: FormData) => {
    const { data } = await postFiles(payload)
    storedFiles.value = data
  }

  const storeLinks = async (payload: Object) => {
    const { data } = await postLink(payload)
    storedLinks.value = data
  }

  const createFileCollection = async (payload: FileCollection) => {
    const { data } = await postFileCollection(payload)
    fileCollection.value = data
  }

  return {
    fileCollection,
    storedFiles,
    storedLinks,
    createFileCollection,
    storeFiles,
    storeLinks
  }
})