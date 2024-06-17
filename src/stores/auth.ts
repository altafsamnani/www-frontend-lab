import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/http/apiInstances.js'
import { csrfCookie, login, register, logout, getUser } from '../http/auth'

export const isLoggedIn = (): boolean => (localStorage.getItem('access_token') ? true : false)
export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const errors = ref({})
  const accessToken = ref('')

  const fetchUser = async () => {
    try {
      const response = await getUser()
      user.value = response.data || null
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      user.value = null
    }
  }

  const doLogin = async (credentials: any) => {
    const res = await login(credentials)
    accessToken.value = res.headers['x-token']
    localStorage.setItem('access_token', accessToken.value)
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  }

  const handleLogin = async (credentials) => {
    //await csrfCookie();
    try {
      await doLogin(credentials)
      await fetchUser()
    } catch {
      localStorage.removeItem('access_token')
    }
  }

  const handleRegister = async (newUser) => {
    try {
      await register(newUser)
      await handleLogin({
        email: newUser.email,
        password: newUser.password
      })
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
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
