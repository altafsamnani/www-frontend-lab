<template>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-6 ">
                <div class="flex ">
                    <div class="flex flex-col w-2/12 justify-left">
                        <Skeleton width="7rem" height="5rem" borderRadius="16px" class="mb-7"></Skeleton>
                        <Skeleton width="7rem" height="5rem" borderRadius="16px" class="mb-7"></Skeleton>
                        <Skeleton width="7rem" height="5rem" borderRadius="16px" class="mb-7"></Skeleton>
                        <Skeleton width="7rem" height="5rem" borderRadius="16px" class="mb-7"></Skeleton>
                    </div>
                    <div class="pl-10 w-10/12">
                        <Skeleton shape="square" height="25rem" borderRadius="16px"></Skeleton>
                    </div>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 py-4 lg:pl-12">
                <div>
                    <Skeleton width="5rem" class="mb-4"></Skeleton>
                    <Skeleton width="10rem" class="mb-4"></Skeleton>
                    <Skeleton width="15rem" class="mb-12"></Skeleton>
                    <Skeleton height="1.5rem" class="mb-12"></Skeleton>

                    <Skeleton width="5rem" class="mb-4"></Skeleton>
                    <Skeleton width="5rem" class="mb-12"></Skeleton>

                    <Skeleton width="5rem" class="mb-4"></Skeleton>
                    <Skeleton width="10rem" class="mb-4"></Skeleton>
                    <Skeleton height="1.5rem"></Skeleton>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 py-5">
            <div class="col-span-12 ">
                <div v-for="i in 8" :key="i">
                    <Skeleton height="1.5rem" class="mb-7"></Skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Skeleton from '@/volt/Skeleton.vue'
</script>
