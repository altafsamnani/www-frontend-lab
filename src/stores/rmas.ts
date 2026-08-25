import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  Rma,
  RmaItem,
  CreateRmaPayload,
  UpdateRmaPayload,
  CreateRmaItemPayload,
  UpdateRmaItemPayload,
} from '@/types/Rma'
import type ResponseData from '@/types/ResponseData'
import {
  getRmaConfig,
  getUserRmas,
  getRmaById,
  createRma,
  updateRma,
  deleteRma,
  submitRma,
  createRmaItem,
  updateRmaItem,
  deleteRmaItem,
} from '@/http/rmas'

export const useRmaStore = defineStore('rmaStore', () => {
  const rmaConfig = ref<any>(null)
  const rmas = ref<Rma[]>([])
  const rmasExtra = ref<any>({})
  const currentRma = ref<Rma | null>(null)

  const fetchRmaConfig = async () => {
    const { data } = await getRmaConfig()
    rmaConfig.value = data
  }

  const fetchUserRmas = async (params?: any) => {
    const response: ResponseData = await getUserRmas(params)
    rmas.value = response.data
    rmasExtra.value = response.extra
  }

  const fetchRmaById = async (id: string) => {
    const { data } = await getRmaById(id)
    currentRma.value = data
    return data
  }

  const createNewRma = async (rmaData: CreateRmaPayload) => {
    const { data } = await createRma(rmaData)
    currentRma.value = data
    return data
  }

  const updateExistingRma = async (id: string, rmaData: UpdateRmaPayload) => {
    const { data } = await updateRma(id, rmaData)
    return data
  }

  const removeRma = async (id: string) => {
    await deleteRma(id)
    await fetchUserRmas()
  }

  const submitExistingRma = async (id: string) => {
    await submitRma(id)
  }

  const addRmaItem = async (rmaId: string, itemData: CreateRmaItemPayload) => {
    const { data } = await createRmaItem(rmaId, itemData)
    return data
  }

  const modifyRmaItem = async (rmaId: string, itemId: string, itemData: UpdateRmaItemPayload) => {
    const { data } = await updateRmaItem(rmaId, itemId, itemData)
    return data
  }

  const removeRmaItem = async (rmaId: string, itemId: string) => {
    await deleteRmaItem(rmaId, itemId)
  }

  const clearCurrentRma = () => {
    currentRma.value = null
  }

  return {
    rmaConfig,
    rmas,
    rmasExtra,
    currentRma,
    fetchRmaConfig,
    fetchUserRmas,
    fetchRmaById,
    createNewRma,
    updateExistingRma,
    removeRma,
    submitExistingRma,
    addRmaItem,
    modifyRmaItem,
    removeRmaItem,
    clearCurrentRma,
  }
})
