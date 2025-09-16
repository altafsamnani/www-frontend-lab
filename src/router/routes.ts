import NotFoundErrorPage from '@/views/errors/NotFoundErrorPage.vue'
import Login from '@/views/Login.vue'
import Home from '../views/home/Home.vue'
import Aboutus from '../views/Aboutus.vue'
import Contactus from '../views/Contactus.vue'
import Categories from '@/views/Categories.vue'
import Brands from '@/views/Brands.vue'
import Search from '@/views/search/Search.vue'
import ProductDetailsMain from '@/views/product/ProductDetailsMain.vue'
import Cart from '@/views/Cart.vue'
import Checkout from '@/views/checkout/Checkout.vue'
import Shipping from '@/views/shipping/Shipping.vue'
import ShippingAddressForm from '@/views/shipping/ShippingAddressForm.vue'
import Companies from '@/views/Companies.vue'
import CompanyEdit from '@/views/CompanyEdit.vue'

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
      group: 'products'
    }
  },
  {
    path: '/brands/:page?',
    name: 'Brands',
    component: Brands,
    meta: {
      group: 'products'
    }
  },
  {
    path: '/products/:id?',
    name: 'Products',
    component: ProductDetailsMain,
    meta: {
      group: 'products'
    }
  },
  {
    path: '/search/:categorySlug?/:brandSlug?/:attribute?',
    name: 'Search',
    component: Search,
    meta: {
      group: 'products'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      auth: true,
      group: 'cart',
      layout: 'user'
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      auth: true,
      group: 'cart'
    }
  },
  {
    path: '/shipping',
    name: 'shipping',
    component: Shipping,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user'
    }
  },
  {
    path: '/shipping/add',
    name: 'shipping-create',
    component: ShippingAddressForm,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user'
    }
  },
  {
    path: '/shipping/:id/edit',
    name: 'shipping-edit',
    component: ShippingAddressForm,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user'
    }
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('@/views/Favourites.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/quotes',
    name: 'MyQuotes',
    component: () => import('@/views/Quotes.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/osec-quotes',
    name: 'OsecQuotes',
    component: () => import('@/views/OsecQuotes.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/manuals',
    name: 'Manuals',
    component: () => import('@/views/Manuals.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/rmas',
    name: 'RMAs',
    component: () => import('@/views/Rmas.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/academy',
    name: 'Academy',
    component: () => import('@/views/Academy.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      auth: true,
      layout: 'user'
    }
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user'
    }
  },
  {
    path: '/companies/create',
    name: 'CompanyCreate',
    component: CompanyEdit,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user'
    }
  },
  {
    path: '/companies/:id/edit',
    name: 'CompanyEdit',
    component: CompanyEdit,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user'
    }
  },
  {
    path: '/:notFound(.*)',
    name: 'error.404',
    component: NotFoundErrorPage
  }
]

export default routes
