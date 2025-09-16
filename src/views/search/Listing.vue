<template>
  <div class="bg-surface-50 dark:bg-surface-950 p-6">
    <NotFoundResults v-if="!products.length && paginator.total === 0" :query="query"> </NotFoundResults>
    <LoaderCard v-else-if="!products.length" :count="query.page!.size" :layout="layout" />
    <DataView v-else :dataKey="'id'" :value="products" :layout="layout" :paginator="true" :rows="paginator.perPage"
      :first="paginator.first" :totalRecords="paginator.total" :pageLinkSize="5" :rowsPerPageOptions="perPage"
      :currentPageReportTemplate="`Showing {first} to {last} of {totalRecords}`" @page="clickOnPaginator" :lazy="true">
      <template #header>
        <div class="flex justify-between flex-wrap ">
          <div class="flex items-center mb-4 ">
            <Select v-model="sortKey" :options="sortOptions" optionLabel="label" :placeholder="`Sort by Relevance`"
              @change="onSortChange($event)" />
          </div>
          <div>
            <SelectButton v-model="layout" :options="options" :allowEmpty="false" class="inline-flex gap-4">
              <template #option="{ option }">
                <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
              </template>
            </SelectButton>
          </div>
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col">
          <ListView :items="slotProps.items" :isUserLoggedIn="isUserLoggedIn" @goToLogin="goToLogin"
            @addToCart="addToCart" />
        </div>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <CardView :items="slotProps.items" :isUserLoggedIn="isUserLoggedIn" @goToLogin="goToLogin"
            @addToCart="addToCart" />
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search';
import DataView from 'primevue/dataview';
import SelectButton from 'primevue/selectbutton';
import { useRouter } from 'vue-router'
import { useAuthStore, isLoggedIn } from '@/stores/auth'
import { useAddToCart } from '@/composables/useAddToCart'
import type Query from '@/types/Query';
import LoaderCard from '@/components/icons/LoaderCard.vue';
import ListView from '@/components/product/ListView.vue';
import CardView from '@/components/product/CardView.vue';
import NotFoundResults from '../errors/NotFoundResults.vue';


const props = defineProps<{
  query: Query
  selectedShopNow?: any
}>()

const query = ref(props.query)
const selectedShopNow = ref(props.selectedShopNow)
const layout = ref<'grid' | 'list'>('grid')
const options = ref(['list', 'grid']);
const sortKey = ref();
const perPage = ref(props.query.page ? [props.query.page.size, props.query.page.size * 2, props.query.page.size * 3] : [15, 30, 45])
const router = useRouter()
const authStore = useAuthStore()
const searchStore = useSearchStore()
const { products, paginator } = storeToRefs(searchStore)

const sortOptions = ref([
  {
    label: 'Relevance',
    order: [
      { field: 'updatedAt', dir: 'desc' },
      { field: 'createdAt', dir: 'desc' }
    ]
  },
  {

    label: 'Name A - Z',
    order: [{ field: 'name', dir: 'asc' }]
  },
  {

    label: 'Name Z - A',
    order: [{ field: 'name', dir: 'desc' }]
  },
  {

    label: 'Price low - high',
    order: [{ field: 'price', dir: 'asc' }]
  },
  {

    label: 'Price high - low',
    order: [{ field: 'price', dir: 'desc' }]
  }
]);

const emit = defineEmits(['clickOnSortPaginator'])

// Use the common addToCart composable
const { addToCart: addItemToCart } = useAddToCart({
  showToast: true
})

// Wrapper function to handle the product from the event
function addToCart(product: any) {
  if (!isUserLoggedIn.value) {
    goToLogin()
    return
  }
  
  // Call the common addToCart function
  addItemToCart(product)
}

// Create a reactive authentication state that properly updates
const isUserLoggedIn = computed(() => {
  // Primary check: if user exists in store (reactive)
  if (authStore.user) return true
  // Secondary check: if accessToken exists in store (reactive)
  if (authStore.accessToken) return true
  // Fallback: check localStorage directly (for initial page load)
  return isLoggedIn()
})

// Login navigation function
const goToLogin = () => {
  router.push({
    name: 'login',
    query: { redirect: router.currentRoute.value.fullPath }
  })
}

const onSortChange = async (event) => {
  query.value.order = []
  //query.value.order.push(event.value.order)
  event.value.order.map((order) => {
    query.value.order.push({
      field: order.field,
      dir: order.dir
    })
  })

  emit('clickOnSortPaginator', query.value)
}

const clickOnPaginator = async (event) => {
  query.value.page = {
    size: event.rows,
    number: event.page + 1
  }

  emit('clickOnSortPaginator', query.value)
}

// Define the paginator template
const customPaginator = `
  <div class="p-d-flex p-ai-center p-jc-between">
    <span class="p-text-bold">Custom Paginator</span>
    <Paginator :rows="rows" :totalRecords="items.length" />
  </div>
`;





</script>