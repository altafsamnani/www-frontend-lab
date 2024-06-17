import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { isLoggedIn } from '@/stores/auth'

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(async (to, from) => {
  if (to.meta.auth && !isLoggedIn()) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  } else if (to.meta.guest) {
    return { name: 'home' }
  }
})

export default router
