<template>
  <div>
    <PageHeader>
      <template v-slot:title>
        {{ t('brands.title_listing') }}
      </template>
      <template v-slot:actions>
        <router-link :to="{ name: 'BrandCreate' }">
          <Button icon="pi pi-plus" :label="$t('button.new')" severity="secondary" />
        </router-link>
      </template>
    </PageHeader>

    <Divider />

    <TableFilterBar>
      <div class="flex">
        <InputText
          v-model="filters.search"
          class="w-full"
          :placeholder="$t('brands.search')"
          @keyup.enter="filterSearch"
        />
      </div>
      <div class="">
        <Select
          v-model="selectedStatus"
          :options="statusses"
          optionLabel="name"
          optionValue="value"
          placeholder="Status"
          showClear
          :highlightOnSelect="false"
          class="w-full"
          @update:modelValue="handleStatusChange"
        >
        </Select>
      </div>
      <div class="space-x-2">
        <Button
          @click="filterSearch"
          type="button"
          icon="pi pi-search"
          :label="$t('brands.search')"
        />
        <Button
          @click="resetSearch"
          type="button"
          icon="pi pi-filter-slash"
          severity="secondary"
          :aria-label="$t('brands.reset')"
        />
      </div>
    </TableFilterBar>

    <LoaderCard :count="10" v-if="!brands.length && isLoading" class="my-16 flex flex-wrap gap-6">
    </LoaderCard>

    <div class="brands my-6 flex flex-wrap gap-6">
      <div v-if="brands.length">
        <draggable
          tag="div"
          class="dragArea list-group flex w-full flex-wrap gap-6"
          v-model="brands"
          handle=".handle"
          ghostClass="ghost"
          direction="horizontal"
          @change="onDraggableChange"
          item-key="id"
          :disabled="isDisabled"
        >
          <template #item="{ element }">
            <BrandCard :key="element.id" :brand="element" :isFiltering="isFiltering" />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import draggable from 'vuedraggable'
  import BrandCard from '@/components/BrandCard.vue'
  import PageHeader from '@/components/PageHeader.vue'
  import TableFilterBar from '@/components/TableFilterBar.vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useToast } from 'primevue/usetoast'
  import type Brand from '@/types/Brand'
  import { useBrandStore } from '@/stores/brands'
  import LoaderCard from '@/components/icons/LoaderCard.vue'

  const brandStore = useBrandStore()
  const { brands } = storeToRefs(brandStore)
  const { fetchAllBrands, updateBrand } = brandStore
  const route = useRoute()
  const brandId = ref(route.params.id)
  const { t } = useI18n()
  const toast = useToast()
  const formHasChanges = ref(false)
  const isDisabled = ref(false)
  const isLoading = ref(true)
  const isFiltering = ref(false)

  const filters = reactive({
    status: '',
    search: '',
    ...useRoute().query,
  })

  const filterSearch = () => {
    console.log(filters)
    isFiltering.value = true
    isDisabled.value = true
    fetchAllBrands(filters)
  }

  const resetSearch = () => {
    filters.search = ''
    filters.status = ''
    isFiltering.value = false
    isDisabled.value = false
    fetchAllBrands(filters)
  }

  const selectedStatus = ref()
  const statusses = computed(() => {
    return [
      { name: t('brands.published'), value: 'published' },
      { name: t('brands.published_pending'), value: 'pending' },
      { name: t('brands.unpublished'), value: 'unpublished' },
      { name: t('brands.deleted'), value: 'deleted' },
    ]
  })

  const handleStatusChange = () => {
    filters.status = selectedStatus.value
  }

  const form: Brand = reactive({ fileUpload: null, ...brands.value })

  onMounted(async () => {
    brands.value = []
    await fetchAllBrands(filters).then(() => {
      isLoading.value = false
      Object.assign(form, { ...brands.value })
      console.log('old order', brands.value)
    })
  })

  // const dragging = ref(false)

  // const log = (event) => {
  //   console.log(event)
  // }

  const onDraggableChange = (event: Event) => {
    let origBrands = []
    formHasChanges.value = true
    if ((event as any).moved) {
      for (let i = 0; i < brands.value.length; i++) {
        if (brands.value[i].order !== i) {
          isDisabled.value = false
          brands.value[i].order = i
          updateBrand(brands.value[i].id, brands.value[i])
          origBrands.push(brands.value[i])
        }
      }

      toast.add({
        severity: 'success',
        detail: t('notification.brand_order_update'),
        life: 5000,
      })

      isDisabled.value = false
    }
  }
</script>

<style scoped>
  .handle {
    cursor: move;
  }

  .ghost {
    opacity: 0.8;
    @reference bg-zinc-200;
  }
</style>
