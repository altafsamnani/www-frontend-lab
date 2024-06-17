import { ref } from 'vue'
import { defineStore } from 'pinia'
import { postImages, postImageCollection } from '../http/images'
import type ImageCollection from '@/types/ImageCollection'

export const useImagesStore = defineStore('imagesStore', () => {
  const storedImages = ref<{ id: number, url: string }>({})
  const imageCollection = ref(null)
  const storeImages = async (payload: FormData) => {
    const { data } = await postImages(payload)
    storedImages.value = data
  }

  const createImageCollection = async (payload: ImageCollection) => {
    const { data } = await postImageCollection(payload)
    imageCollection.value = data
  }

  return {
    imageCollection,
    storedImages,
    createImageCollection,
    storeImages
  }
})