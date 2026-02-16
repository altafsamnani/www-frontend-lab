import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CompanyUser, CompanyUserUpdate } from '@/types/User'
import {
  getCompanyUsers,
  getCompanyUser,
  updateCompanyUser as updateCompanyUserApi
} from '@/http/companyUsers'
import type ResponseData from '@/types/ResponseData'

export const useCompanyUsersStore = defineStore('companyUsers', () => {
  const users = ref<CompanyUser[]>([])
  const usersExtra = ref<any>({})
  const currentUser = ref<CompanyUser | null>(null)
  const loading = ref(false)

  const fetchUsers = async (params?: any) => {
    loading.value = true
    const response: ResponseData = await getCompanyUsers(params)
    users.value = response.data
    usersExtra.value = response.extra
    loading.value = false
  }

  const fetchUser = async (id: number) => {
    loading.value = true
    const { data } = await getCompanyUser(id)
    currentUser.value = data
    loading.value = false
    return data
  }

  const updateUser = async (id: number, userData: CompanyUserUpdate) => {
    loading.value = true
    const { data } = await updateCompanyUserApi(id, userData)
    loading.value = false
    return data
  }

  const clearCurrentUser = () => {
    currentUser.value = null
  }

  return {
    users,
    usersExtra,
    currentUser,
    loading,
    fetchUsers,
    fetchUser,
    updateUser,
    clearCurrentUser
  }
})
