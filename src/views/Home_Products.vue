<template>
  <ThemeSwitcher />
  <div class="card">
      <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
          <template #item="slotProps">
              <div class="border border-surface-200 dark:border-surface-700 rounded-md m-2 p-3">
                  <div class="mb-3">
                      <div class="relative mx-auto">
                          <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded-md" />
                          <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>
                      </div>
                  </div>
                  <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
                  <div class="flex justify-between items-center">
                      <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                      <span>
                          <Button icon="pi pi-heart" severity="secondary" outlined />
                          <Button icon="pi pi-shopping-cart" class="ml-2"/>
                      </span>
                  </div>
              </div>
          </template>
      </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ProductService } from '@/stores/productservice';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
})

const products = ref();
const responsiveOptions = ref([
  {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
  }
]);

const getSeverity = (status) => {
  switch (status) {
      case 'INSTOCK':
          return 'success';

      case 'LOWSTOCK':
          return 'warning';

      case 'OUTOFSTOCK':
          return 'danger';

      default:
          return null;
  }
};

</script>
