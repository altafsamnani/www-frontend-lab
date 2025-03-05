<template>
    <div class='flex flex-col'>
        <div class="col-span-12 sm:col-span-12 md:col-span-6 xl:col-span-4 p-2" :key="num0" v-for="num0 in prop.count">
            <div v-for="num in 2" :key="num" class="mt-4">
                <Skeleton height="4rem" class="mb-2"></Skeleton>
                <div v-for="num2 in 4" :key="num2" class="flex justify-left mt-1">
                    <Skeleton class="mr-4" width="1rem" height="1rem"></Skeleton>
                    <Skeleton class="mb-2"></Skeleton>
                </div>
            </div>
            <div class="mt-4">
                <Skeleton height="4rem" class="mb-2"></Skeleton>
                <div class="flex items-end">
                    <Skeleton width="0.6rem" height="0.1rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="0.3rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="0.6rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="0.9rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="1.2rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="1.5rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="1.8rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="2.1rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="2.4rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="2.7rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="3rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="3.3rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="3.6rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="3.9rem" class="mr-2" />
                    <Skeleton width="0.6rem" height="4.2rem" class="mr-2" />
                </div>
            </div>
            <div v-for="num4 in 2" :key="num4" class="mt-4">
                <Skeleton height="4rem" class="mb-2"></Skeleton>
                <div class="flex items-end">
                    <Skeleton class="mr-2" :key="num5" v-for="num5 in 2" width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'

const prop = defineProps<{
    count: number
}>()

/* const noOfBars = 16
const initialBarHeight = 0.3
const barSkeletonHeight = ref(0)

const updateHeight = (num: number) => {
    let valueBarSkeleton = barSkeletonHeight.value
    barSkeletonHeight.value = num === noOfBars ? initialBarHeight : barSkeletonHeight.value + initialBarHeight

    return valueBarSkeleton
} */


</script>