<template>
  <div>
  <div class="card">
    <Carousel :value="slider" :numVisible="1" :numScroll="1"
      :pt="{ 'item': ({ props }) => ({ class: ['shrink-0 grow w-full'] }) }">
      <template #item="slotProps">
        <HeroImage v-if="slotProps.data.style == 'heroimage'" :item="slotProps.data.content" />
        <HeroImageTiles v-if="slotProps.data.style == 'herotile'" :item="slotProps.data.content" />
        <HeroCrossImage v-if="slotProps.data.style == 'herocross'" :item="slotProps.data.content" />
      </template>
    </Carousel>
  </div>
  <div>
    <Training/>
    <Blog/> 
    <Cloud/>
    <Testimonial />
    <Stats/>
  
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Carousel from "primevue/carousel";
import HeroImageTiles from '@/components/hero/HeroTiles.vue';
import HeroImage from '@/components/hero/HeroImage.vue';
import HeroCrossImage from '@/components/hero/HeroCrossImage.vue';
import Training from '@/views/home/Training.vue';
import Blog from '@/views/home/Blog.vue';
import Cloud from '@/views/Cloud.vue';
import Testimonial from '@/views/home/Testimonial.vue';
import Stats from '@/views/home/Stats.vue'; 
const slider = ref([
{
    'style': 'heroimage',
    'content': {
      'headerlink': 'Find the Osec contributed ideas and inspiration',
      'main': 'Hikvision, Dahua and Honeywell Video',
      'sub': 'Find a balanced range of the top brands with which you can offer the most diverse customized solutions',
      'image_1': 'https://osec.nl/files/images/cat/448204a13b4e3ac93ea5d230fd046d6a.jpg'
    }
  },
  {
    'style': 'herotile',
    'content': {
      'main': 'Osec introduces: Satel ACSP',
      'sub': 'Addressable fire alarm control panel with 2 loops',
      'image_1': 'https://osec.nl/files/images/cat/9264f3a249e69e5ad944e65da9b96a0d.jpg',
      'image_2': 'https://www.satel.pl/wp-content/uploads/2023/02/acsp_logo-acsp-pionowe.svg',
      'image_3': 'https://www.satel.pl/wp-content/uploads/2023/03/acsp_acsp-402.png',
      'image_4': 'https://osec.nl/files/images/cat/f0b9862a8d8a1e6396c4bbc022e5b346.jpg',
      'image_5': 'https://www.satel.pl/wp-content/uploads/2023/02/acsp_mbl-bg.jpg'
    }
  },
  {
    'style': 'herocross',
    'content': {
      'main': 'Junior Product Manager',
      'sub': 'We are looking for enthusiastic and motivated people to join our team',
      'image_1': 'https://osec.nl/files/images/cat/05bdafa02ff1b7cfe35abbbb5480b69a.jpg'
    }
  }
]);



</script>