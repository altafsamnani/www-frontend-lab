import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  Offer,
  OfferItem,
  CreateOfferPayload,
  UpdateOfferPayload,
  OfferSettings,
} from '@/types/Offer'
import {
  getUserOffers,
  getOfferById,
  getOfferByHash,
  createOffer,
  updateOffer,
  deleteOffer,
  duplicateOffer,
  addFavoritesToOffer,
  getUserOfferSettings,
  saveUserOfferSettings,
  getOfferItems,
  createOfferItem,
  updateOfferItem,
  deleteOfferItem,
  downloadOfferPdf,
  viewOfferPdf,
} from '@/http/offers'

export const useOfferStore = defineStore('offerStore', () => {
  const offers = ref<Offer[]>([])
  const currentOffer = ref<Offer | null>(null)
  const currentOfferItems = ref<OfferItem[]>([])
  const settings = ref<OfferSettings | null>(null)
  const loading = ref(false)
  const itemsLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const fetchUserOffers = async () => {
    loading.value = true
    const { data } = await getUserOffers()
    offers.value = data
    loading.value = false
  }

  const fetchOfferById = async (offerId: number) => {
    loading.value = true
    const { data } = await getOfferById(offerId)
    currentOffer.value = data
    loading.value = false
    return data
  }

  const fetchOfferByHash = async (hash: string) => {
    loading.value = true
    const { data } = await getOfferByHash(hash)
    currentOffer.value = data
    loading.value = false
    return data
  }

  const createNewOffer = async (offerData: CreateOfferPayload) => {
    loading.value = true
    await createOffer(offerData)
    await fetchUserOffers()
    loading.value = false
    // Backend returns 204 No Content, so return the first offer from refreshed list
    // (sorted by created_at desc, so the newest one is first)
    return offers.value[0]
  }

  const updateExistingOffer = async (offerId: number, offerData: UpdateOfferPayload) => {
    loading.value = true
    const { data } = await updateOffer(offerId, offerData)
    loading.value = false
    return data
  }

  const removeOffer = async (offerId: number) => {
    loading.value = true
    await deleteOffer(offerId)
    await fetchUserOffers()
    loading.value = false
  }

  const duplicateExistingOffer = async (offerId: number) => {
    loading.value = true
    const { data } = await duplicateOffer(offerId)
    await fetchUserOffers()
    loading.value = false
    return data
  }

  const addFavoritesToOffer = async (offerId: number, favoriteIds: number[]) => {
    loading.value = true
    const { data } = await addFavoritesToOffer(offerId, favoriteIds)
    loading.value = false
    return data
  }

  const fetchSettings = async () => {
    loading.value = true
    const { data } = await getUserOfferSettings()
    settings.value = data
    loading.value = false
    return data
  }

  const saveSettings = async (settingsData: Partial<OfferSettings>) => {
    loading.value = true
    await saveUserOfferSettings(settingsData)
    await fetchSettings()
    loading.value = false
  }

  const getOffersByStatus = (status: number) => {
    return offers.value.filter((offer) => offer.status === status)
  }

  const getOfferBySubject = (subject: string) => {
    return offers.value.find((offer) => offer.subject === subject)
  }

  const clearCurrentOffer = () => {
    currentOffer.value = null
  }

  // Offer Items Actions
  const fetchOfferItems = async (offerId: number) => {
    itemsLoading.value = true
    const { data } = await getOfferItems(offerId)
    currentOfferItems.value = data
    itemsLoading.value = false
    return data
  }

  // Item mutations - component controls when to refresh
  const addOfferItem = async (offerId: number, itemData: any) => {
    const { data } = await createOfferItem(offerId, itemData)
    return data
  }

  const modifyOfferItem = async (offerId: number, itemId: number, itemData: any) => {
    const { data } = await updateOfferItem(offerId, itemId, itemData)
    return data
  }

  const removeOfferItem = async (offerId: number, itemId: number) => {
    await deleteOfferItem(offerId, itemId)
  }

  const clearCurrentOfferItems = () => {
    currentOfferItems.value = []
  }

  const downloadPdf = (hash: string) => {
    const pdfUrl = downloadOfferPdf(hash)
    window.open(pdfUrl, '_blank')
  }

  const viewPdf = (hash: string) => {
    const pdfUrl = viewOfferPdf(hash)
    window.open(pdfUrl, '_blank')
  }

  return {
    // State
    offers,
    currentOffer,
    currentOfferItems,
    settings,
    loading,
    itemsLoading,
    error,

    // Actions
    fetchUserOffers,
    fetchOfferById,
    fetchOfferByHash,
    createNewOffer,
    updateExistingOffer,
    removeOffer,
    duplicateExistingOffer,
    addFavoritesToOffer,
    fetchSettings,
    saveSettings,
    getOffersByStatus,
    getOfferBySubject,
    clearCurrentOffer,
    // Offer Items Actions
    fetchOfferItems,
    addOfferItem,
    modifyOfferItem,
    removeOfferItem,
    clearCurrentOfferItems,
    // PDF Actions
    downloadPdf,
    viewPdf,
  }
})
