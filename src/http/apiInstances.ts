import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import toasteventbus from 'primevue/toasteventbus';
import i18n from '@/i18n'
import router from '@/router'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const api = axios.create()
//api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

api.defaults.headers.get['Content-Type'] = 'application/json'
api.defaults.headers.get['Accept'] = 'application/vnd.osec.default.v1+json'

api.defaults.headers.patch['Content-Type'] = 'application/vnd.osec.default.v1+json'
api.defaults.headers.patch['Accept'] = 'application/json'

api.defaults.headers.post['Content-Type'] = 'application/vnd.osec.default.v1+json'
api.defaults.headers.post['Accept'] = 'application/json'

api.defaults.headers.delete['Content-Type'] = 'application/vnd.osec.default.v1+json'
api.defaults.headers.delete['Accept'] = 'application/json'

api.defaults.headers.put['Content-Type'] = 'application/vnd.osec.default.v1+json'
api.defaults.headers.put['Accept'] = 'application/json'

api.interceptors.request.use(
  (config) => handleHeaders(config)
)

api.interceptors.response.use(
  (response) : any => response.data,
  (error) => handleError(error)
)



export const loginApi = axios.create({
  headers: {
    'Content-Type': 'application/vnd.osec.email-password.v1+json'
  }
})

export const uploadApi = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/vnd.osec.default.v1+json'
  }
})

uploadApi.interceptors.request.use(
  (config) => handleHeaders(config)
)
uploadApi.interceptors.response.use(
  (response) => response.data,
  (error) => handleError(error)
)

export const baseApi = axios.create()

export const usetoastservice = () => {
  const showtoast = () => {
    toasteventbus.emit('add', { severity: 'error', detail:i18n().global.t('notification.something_went_wrong'), life: 5000 });
  }

  return { showtoast };
};

const handleHeaders = (config) => {
  config.headers['Accept-Language'] = localStorage.getItem('lang')
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

  return config
}

const handleError = (error) => {
  const { showtoast } = usetoastservice()
  console.error('API Error:', error)

  if (error.response) {
    if (error.response.status === 401) {
      cleanupForLogout()
    } else {
      // Show a generic error message
      console.log('Api error occurred. Please check your api and try later.')
    }
  }
  showtoast()
  return Promise.reject(error)
}

const cleanupForLogout = () => {
  const authStore = useAuthStore()
  const { cleanupForLogout } = authStore
  cleanupForLogout()
  router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
}
