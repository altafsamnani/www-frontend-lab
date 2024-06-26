import NotFoundErrorPage from '@/views/errors/NotFoundErrorPage.vue'
import Login from '@/views/Login.vue'
import Home from '../views/home/Home.vue'
import Aboutus from '../views/Aboutus.vue'
import Contactus from '../views/Contactus.vue'
import Categories from '@/views/Categories.vue'
import Brands from '@/views/Brands.vue'



const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      guest: true,
      layout: 'login'
    }
  },
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: Aboutus
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: Contactus
  },
  {
    path: '/categories/:id?',
    name: 'Categories',
    component: Categories,
    meta: {
      guest: true,
      group: 'products'
    }
  },
  {
      path: '/brands/:page?',
      name: 'Brands',
      component: Brands,
      meta: {
        guest: true,
        group: 'products',
      }
  },
  {
    path: '/:notFound(.*)',
    name: 'error.404',
    component: NotFoundErrorPage
  },
]

export default routes
