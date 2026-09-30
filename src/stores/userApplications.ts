import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Application, UserApplicationInput } from '@/types/Application'
import {
  getUserApplications,
  getUserApplication,
  createUserApplication as createUserApplicationApi,
  acceptUserApplication as acceptUserApplicationApi,
  deleteUserApplication as deleteUserApplicationApi,
} from '@/http/applications'
import type ResponseData from '@/types/ResponseData'

export const useUserApplicationsStore = defineStore('userApplications', () => {
  const applications = ref<Application[]>([])
  const applicationsExtra = ref<Record<string, unknown>>({})
  const currentApplication = ref<Application | null>(null)
  const loading = ref(false)

  // Computed property to get pending count from applicationsExtra
  const pendingCount = computed(() => {
    return (applicationsExtra.value as { totalCount?: number })?.totalCount || 0
  })

  const fetchApplications = async (params?: Record<string, unknown>) => {
    loading.value = true
    const response: ResponseData = await getUserApplications(params)
    applications.value = response.data
    applicationsExtra.value = response.extra
    loading.value = false
  }

  const fetchApplication = async (id: number) => {
    loading.value = true
    const { data } = await getUserApplication(id)
    currentApplication.value = data
    loading.value = false
    return data
  }

  const createApplication = async (applicationData: UserApplicationInput) => {
    loading.value = true
    await createUserApplicationApi(applicationData)
    loading.value = false
  }

  const acceptApplication = async (id: number) => {
    loading.value = true
    await acceptUserApplicationApi(id)
    loading.value = false
  }

  const denyApplication = async (id: number) => {
    loading.value = true
    await deleteUserApplicationApi(id)
    loading.value = false
  }

  const clearCurrentApplication = () => {
    currentApplication.value = null
  }

  return {
    applications,
    applicationsExtra,
    currentApplication,
    pendingCount,
    loading,
    fetchApplications,
    fetchApplication,
    createApplication,
    acceptApplication,
    denyApplication,
    clearCurrentApplication,
  }
})
