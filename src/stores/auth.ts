import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api, uploadApi } from '@/http/apiInstances.js'
import { login, register, logout, getUser } from '../http/auth'
import type { User } from '@/types/User'

export type { User }

export const isLoggedIn = (): boolean => !!localStorage.getItem('access_token')

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const errors = ref({})
  const accessToken = ref(localStorage.getItem('access_token') || '')

  const fetchUser = async () => {
    const { data } = await getUser()
    user.value = data
  }

  const doLogin = async (credentials: any) => {
    const { headers } = await login(credentials)
    accessToken.value = headers['x-token']
    localStorage.setItem('access_token', accessToken.value)
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
    uploadApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  }

  const handleLogin = async (credentials: any) => {
    await doLogin(credentials)
    await fetchUser()
  }

  const handleRegister = async (newUser: any) => {
    await register(newUser)
    await handleLogin({
      email: newUser.email,
      password: newUser.password
    })
  }

  const handleLogout = async () => {
    await logout()
    cleanupForLogout()
  }

  const cleanupForLogout = () => {
    localStorage.removeItem('access_token')
    api.defaults.headers.common['Authorization'] = null
    user.value = null
    accessToken.value = ''
  }

  return {
    user,
    errors,
    accessToken,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
    cleanupForLogout
  }
})
