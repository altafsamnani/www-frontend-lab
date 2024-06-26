<template>
    <div class="card">
        <MegaMenu :model="prop.menu" class="" style="border-radius: 3rem">
            <template #item="{ item }">
                <router-link v-if="item.root" :to="{ path: item.route }" class="flex relative items-center cursor-pointer px-4 py-2 overflow-hidden  font-semibold text-lg" :class="{ active: $route.matched.some((route) => route.path.includes(item.route))}" exact-path>
                    <span :class="item.icon" /> 
                    <span class="ml-2"> {{ t(item.label) }}   </span>
                </router-link>

                <a v-else-if="!item.image" class="flex items-center p-4 cursor-pointer mb-2 gap-3">
                    <span class="inline-flex items-center justify-center rounded-full bg-primary text-primary-contrast w-12 h-12">
                        <i :class="[item.icon, 'text-lg']"></i>
                    </span>
                    <router-link :to="{ path: item.route }" class="inline-flex flex-col gap-1">
                        <span class="font-bold text-lg">{{ t(item.label) }}</span>
                        <span class="whitespace-nowrap">{{ t(item.subtext) }}</span>
                    </router-link>
                </a>
                <div v-else class="flex flex-col items-start gap-4 p-2">
                    <img alt="megamenu-demo" :src="item.image" class="w-full" />
                    <span>{{ item.subtext }}</span>
                    <Button :label="item.label" outlined />
                </div>
            </template>
            <template #end>
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            </template>
        </MegaMenu>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type Menu from '@/types/Menu'
import { useI18n } from 'vue-i18n'
import MegaMenu from 'primevue/megamenu';

const { locale, t } = useI18n()
const prop = defineProps<{
    menu: Menu[]
}>()


</script>