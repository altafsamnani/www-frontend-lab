import NotFoundErrorPage from '@/views/errors/NotFoundErrorPage.vue'
import Login from '@/views/Login.vue'
import Home from '../views/home/Home.vue'
import Aboutus from '../views/Aboutus.vue'
import Contactus from '../views/Contactus.vue'
import RmaOffer from '@/views/RmaOffer.vue'
import CategoryListing from '@/views/categories/CategoryListing.vue'
import Brands from '@/views/Brands.vue'
import Search from '@/views/search/Search.vue'
import ProductDetailsMain from '@/views/product/ProductDetailsMain.vue'
import PostsListing from '@/views/posts/PostsListing.vue'
import PostDetail from '@/views/posts/PostDetail.vue'
import Cart from '@/views/Cart.vue'
import Checkout from '@/views/checkout/Checkout.vue'
import Addresses from '@/views/shipping/Shipping.vue'
import AddressForm from '@/views/shipping/ShippingAddressForm.vue'
import Companies from '@/views/Companies.vue'
import CompanyEdit from '@/views/CompanyEdit.vue'
import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      guest: true,
      layout: 'login',
    },
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      guest: true,
      layout: 'login',
    },
  },
  {
    path: '/register/user',
    component: () => import('@/views/RegisterUser.vue'),
    name: 'register-user',
    meta: {
      guest: true,
      layout: 'login',
    },
  },
  {
    path: '/register/user/info',
    component: () => import('@/views/RegisterUserInfo.vue'),
    name: 'register-user-info',
    meta: {
      guest: true,
      layout: 'login',
    },
  },
  {
    path: '/',
    component: Home,
    name: 'home',
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: Aboutus,
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: Contactus,
  },
  {
    path: '/rma-offer/:token',
    name: 'rma-offer',
    component: RmaOffer,
    meta: {
      layout: 'login',
    },
  },
  {
    path: '/categories/:categorySlug?',
    name: 'Categories',
    component: CategoryListing,
    meta: {
      group: 'products',
    },
  },
  {
    path: '/brands/:page?',
    name: 'Brands',
    component: Brands,
    meta: {
      group: 'products',
    },
  },
  {
    path: '/products/:id?',
    name: 'Products',
    component: ProductDetailsMain,
    meta: {
      group: 'products',
    },
  },
  {
    path: '/search/:categorySlug?/:brandSlug?/:attribute?',
    name: 'Search',
    component: Search,
    meta: {
      group: 'products',
    },
  },
  {
    path: '/news/:categorySlug?',
    name: 'News',
    component: PostsListing,
    meta: {
      group: 'news',
    },
  },
  {
    path: '/posts/:slug',
    name: 'PostDetail',
    component: PostDetail,
    meta: {
      group: 'news',
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      auth: true,
      group: 'cart',
      layout: 'user',
    },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      auth: true,
      group: 'cart',
    },
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: Addresses,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user',
    },
  },
  {
    path: '/addresses/add',
    name: 'addresses-create',
    component: AddressForm,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user',
    },
  },
  {
    path: '/addresses/:id/edit',
    name: 'addresses-edit',
    component: AddressForm,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user',
    },
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('@/views/Favourites.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/quotesold',
    name: 'MyQuotes',
    component: () => import('@/views/Quotes.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/quotes',
    name: 'MyOffers',
    component: () => import('@/views/MyOffers.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/offers/create',
    name: 'OfferCreate',
    component: () => import('@/views/offer/OfferForm.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/offers/:id/edit',
    name: 'OfferEdit',
    component: () => import('@/views/offer/OfferForm.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/offers/settings',
    name: 'OfferSettings',
    component: () => import('@/views/OfferSettings.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/osec-quotes',
    name: 'OsecQuotes',
    component: () => import('@/views/OsecQuotes.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/manuals',
    name: 'Manuals',
    component: () => import('@/views/Manuals.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/rma',
    name: 'RmaInfo',
    component: () => import('@/views/rma/RmaInfo.vue'),
  },
  {
    path: '/rmas',
    name: 'RmaDashboard',
    component: () => import('@/views/rma/RmaDashboard.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/rmas/create',
    name: 'RmaCreate',
    component: () => import('@/views/rma/RmaCreate.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/rmas/:id/edit',
    name: 'RmaEdit',
    component: () => import('@/views/rma/RmaCreate.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/rmas/:id',
    name: 'RmaView',
    component: () => import('@/views/rma/RmaView.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/academy',
    name: 'Academy',
    component: () => import('@/views/Academy.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/notifications',
    name: 'NotificationPreferences',
    component: () => import('@/views/NotificationPreferences.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/users/Users.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/users/:id',
    name: 'users-view',
    component: () => import('@/views/users/UserView.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/users/:id/edit',
    name: 'users-edit',
    component: () => import('@/views/users/UserEdit.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/users/register',
    name: 'users-register',
    component: () => import('@/views/users/UserRegister.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/users/applications',
    name: 'user-applications',
    component: () => import('@/views/users/UserApplications.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/company',
    name: 'company-view',
    component: () => import('@/views/MyCompanyView.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/company/edit',
    name: 'company-edit',
    component: () => import('@/views/MyCompanyEdit.vue'),
    meta: {
      auth: true,
      layout: 'user',
    },
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user',
    },
  },
  {
    path: '/companies/create',
    name: 'CompanyCreate',
    component: CompanyEdit,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user',
    },
  },
  {
    path: '/companies/:id/edit',
    name: 'CompanyEdit',
    component: CompanyEdit,
    meta: {
      auth: true,
      group: 'user',
      layout: 'user',
    },
  },
  {
    path: '/:notFound(.*)',
    name: 'error.404',
    component: NotFoundErrorPage,
  },
]

export default routes
