<template>
  <div class="bg-surface-50 dark:bg-surface-950 p-6">
    <NotFoundResults v-if="!products.length && paginator.total === 0" :query="query"> </NotFoundResults>
    <LoaderCard v-else-if="!products.length" :count="query.page!.size" :layout="layout" />
    <DataView v-else :dataKey="'id'" :value="products" :layout="layout" :paginator="true" :rows="paginator.perPage"
      :first="paginator.first" :totalRecords="paginator.total" :pageLinkSize="5" :rowsPerPageOptions="perPage"
      :currentPageReportTemplate="`Showing {first} to {last} of {totalRecords}`" @page="clickOnPaginator" :lazy="true">
      <template #header>
        <div class="flex justify-between flex-wrap ">
          <div class="flex items-center mb-4 hidden">
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
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
              <div class="md:w-40 relative">
                <img class="block xl:block mx-auto rounded w-full"
                  :src="item.images.length ? item.images[0].url : defaultUrl" :alt="item.name" />
                <div class="absolute rounded-border" style="left: 4px; top: 4px">
                  <Tag class="text-xs" :value="t('config.stock_status.' + item.stock.stock_slug)"
                    :severity="getSeverity(item.stock.level)"></Tag>
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category.slug
                      }}</span>
                    <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                      style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                      <span class="text-surface-900 font-medium text-sm">{{ item.rating ?? 4 }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <span class="text-xl font-semibold">${{ item.price }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" outlined></Button>
                    <Button icon="pi pi-shopping-cart" label="Order Now" :disabled="item.stock.level > 4"
                      class="flex-auto md:flex-initial whitespace-nowrap" @change="clickShopNow"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <ProductCard :items="slotProps.items" />
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '@/stores/search';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import SelectButton from 'primevue/selectbutton';
import { getSeverity } from '@/includes/helpers'
import Tag from 'primevue/tag';
import type Query from '@/types/Query';
import LoaderCard from '@/components/icons/LoaderCard.vue';
import ProductCard from '@/components/product/CardView.vue';
import NotFoundResults from '../errors/NotFoundResults.vue';


const defaultUrl = import.meta.env.VITE_DEFAULT_IMAGE
const props = defineProps<{
  query: Query
  selectedShopNow?: any
}>()
const { t } = useI18n()
const query = ref(props.query)
const selectedShopNow = ref(props.selectedShopNow)
const layout = ref<'grid' | 'list'>('grid')
const options = ref(['list', 'grid']);
const sortKey = ref();
const perPage = ref(props.query.page ? [props.query.page.size, props.query.page.size * 2, props.query.page.size * 3] : [15, 30, 45])
const searchStore = useSearchStore()
const { products, paginator } = storeToRefs(searchStore)

const sortOptions = ref([
  {
    label: 'Relevance',
    order: {
      field: 'createdAt',
      dir: 'desc'
    }
  },
  {

    label: 'Name A - Z',
    order: {
      field: 'name',
      dir: 'asc'
    }
  },
  {

    label: 'Name Z - A',
    order: {
      field: 'name',
      dir: 'desc'
    }
  },
  {

    label: 'Price low - high',
    order: {
      field: 'price',
      dir: 'asc'
    }
  },
  {

    label: 'Price high - low',
    order: {
      field: 'price',
      dir: 'desc'
    }
  }
]);

const emit = defineEmits(['clickShopNow', 'clickOnSortPaginator'])

function clickShopNow() {
  emit('clickShopNow', selectedShopNow.value)
}

const onSortChange = async (event) => {
  query.value.order = []
  query.value.order.push(event.value.order)

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