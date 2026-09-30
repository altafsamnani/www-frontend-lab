import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRmaOfferByToken, respondRmaOffer } from '@/http/rmaOffers'

export const useRmaOfferStore = defineStore('rmaOfferStore', () => {
  const offer = ref<any | null>(null)

  const fetchOffer = async (token: string) => {
    const { data } = await getRmaOfferByToken(token)
    offer.value = data.data
  }

  const respond = async (
    token: string,
    payload: { choice: 'accepted' | 'declined'; customerRef?: string | null; wantsReturn?: boolean }
  ) => {
    await respondRmaOffer(token, payload)
  }

  return { offer, fetchOffer, respond }
})
