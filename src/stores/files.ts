import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  postFiles,
  postLink,
  postFileCollection,
  getFiles,
  updateFile,
  getFileEdit,
  deleteFile,
  restoreFile
} from '../http/files'
import type FileCollection from '@/types/FileCollection'
import type Download from '@/types/Download'
import type ResponseData from '@/types/ResponseData'

export const useFilesStore = defineStore('filesStore', () => {
  const files = ref<any[]>([])
  const filesExtra = ref<any>([])
  const storedFiles = ref<{ id: number; name: string; icon: string; url: string }>({} as any)
  const storedLinks = ref<{ id: number; name: string; icon: string; url: string }>({} as any)
  const fileCollection = ref(null)

  // Single file state (used for editing individual files)
  const file = ref([])
  const fetchAllFiles = async (params: any) => {
    const response: ResponseData = await getFiles(params)
    files.value = response.data
    filesExtra.value = response.extra
  }
  const storeFiles = async (payload: FormData | Download) => {
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

  const updateFileById = async (id: number | string | string[], payload: FormData | Download) => {
    const { data } = await updateFile(id, payload)
    storedFiles.value = data
  }

  // Generic file methods - works for downloads and other file types
  const fetchAllItems = async (params: any) => {
    // Use unified files endpoint
    const response: ResponseData = await getFiles(params)
    files.value = response.data
    filesExtra.value = response.extra
  }

  const fetchEditFile = async (params: string | string[]) => {
    const { data } = await getFileEdit(params)
    file.value = data
  }

  // Generic delete/restore methods for files
  const deleteFiles = async (id: string | string[]) => {
    await deleteFile(id)
  }

  const restoreFiles = async (id: string | string[]) => {
    await restoreFile(id)
  }

  return {
    files,
    filesExtra,
    fileCollection,
    storedFiles,
    storedLinks,
    fetchAllFiles,
    createFileCollection,
    storeFiles,
    storeLinks,
    updateFileById,
    // Generic file exports (reusing files state)
    file,
    fetchAllItems,
    fetchEditFile,
    deleteFiles,
    restoreFiles
  }
})
