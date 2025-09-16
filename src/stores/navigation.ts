import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigationStore', () => {
  const lastVisitedRoute = ref<string>('/search')

  const setLastVisitedRoute = (route: string) => {
    // Only store certain routes that make sense for "Continue Shopping"
    const validRoutes = ['/search', '/products', '/categories', '/brands']

    // Check if the route starts with any of the valid routes
    const isValidRoute = validRoutes.some((validRoute) => route.startsWith(validRoute))

    if (isValidRoute) {
      lastVisitedRoute.value = route
    }
  }

  const getLastVisitedRoute = () => {
    return lastVisitedRoute.value
  }

  return {
    lastVisitedRoute,
    setLastVisitedRoute,
    getLastVisitedRoute
  }
})
