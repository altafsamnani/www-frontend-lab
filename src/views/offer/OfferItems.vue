<template>
  <div class="space-y-6">
    <Card>
      <template #title>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">{{ $t('offers.form.items') }}</h3>
          <div class="flex gap-2">
            <Button
              type="button"
              @click="openAddDialog"
              severity="secondary"
              size="small"
              icon="pi pi-plus"
              :label="$t('offers.form.addItem')"
            />
            <Button
              type="button"
              @click="$emit('add-favorites')"
              severity="secondary"
              size="small"
              icon="pi pi-star"
              :label="$t('offers.form.addFromFavorites')"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div v-if="itemsLoading" class="flex justify-center py-8">
          <i class="pi pi-spinner pi-spin text-primary text-4xl"></i>
        </div>

        <div v-else-if="items.length === 0" class="text-surface-500 py-8 text-center">
          <i class="pi pi-inbox mb-3 block text-4xl"></i>
          {{ $t('offers.noItemsMessage') }}
        </div>

        <DataTable v-else :value="items" stripedRows class="p-datatable-sm offer-items-table">
          <Column :exportable="false" style="width: 80px">
            <template #body="{ data }">
              <img
                v-if="data.thumbnail"
                :src="data.thumbnail"
                :alt="data.name"
                class="h-16 w-16 rounded object-contain"
              />
              <div
                v-else
                class="bg-surface-100 dark:bg-surface-800 flex h-16 w-16 items-center justify-center rounded"
              >
                <i class="pi pi-image text-surface-400 text-xl"></i>
              </div>
            </template>
          </Column>
          <Column :header="$t('offers.items.item')" style="width: 40%">
            <template #body="{ data }">
              <div class="flex flex-col gap-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-semibold">{{ data.name }}</span>
                  <div class="flex gap-1">
                    <span
                      v-if="data.pagebreak"
                      class="inline-flex items-center rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      v-tooltip.top="$t('offers.items.pagebreak')"
                    >
                      <i class="pi pi-file mr-1 text-xs"></i>{{ $t('offers.items.pagebreakShort') }}
                    </span>
                    <span
                      v-if="data.option"
                      class="inline-flex items-center rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      v-tooltip.top="$t('offers.items.option')"
                    >
                      <i class="pi pi-question-circle mr-1 text-xs"></i
                      >{{ $t('offers.items.optionalShort') }}
                    </span>
                    <span
                      v-if="data.folder"
                      class="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      v-tooltip.top="$t('offers.items.folder')"
                    >
                      <i class="pi pi-folder mr-1 text-xs"></i>{{ $t('offers.items.folderShort') }}
                    </span>
                  </div>
                </div>
                <div class="text-surface-500 flex items-center gap-2 text-xs">
                  <span v-if="data.articleNr" class="font-mono">{{ data.articleNr }}</span>
                  <span v-if="data.articleNr && data.description" class="text-surface-400">•</span>
                  <span v-if="data.description" class="line-clamp-1">{{ data.description }}</span>
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="quantity"
            :header="$t('offers.items.quantity')"
            style="width: 10%"
            class="text-center"
          >
            <template #body="{ data }">
              <span class="font-medium">{{ data.quantity || data.items || 0 }}</span>
            </template>
          </Column>
          <Column
            field="price"
            :header="$t('offers.items.price')"
            style="width: 13%"
            class="text-right"
          >
            <template #body="{ data }">
              <span class="text-sm">€{{ formatPrice(data.price) }}</span>
            </template>
          </Column>
          <Column
            field="orderDiscount"
            :header="$t('offers.items.orderDiscount')"
            style="width: 10%"
            class="text-center"
          >
            <template #body="{ data }">
              <span
                v-if="data.orderDiscount > 0"
                class="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                {{ data.orderDiscount }}%
              </span>
              <span v-else class="text-surface-400">-</span>
            </template>
          </Column>
          <Column
            field="total"
            :header="$t('offers.items.total')"
            style="width: 13%"
            class="text-right"
          >
            <template #body="{ data }">
              <span class="font-semibold">€{{ formatPrice(data.total) }}</span>
            </template>
          </Column>
          <Column :header="$t('common.actions')" style="width: 9%" frozen alignFrozen="right">
            <template #body="{ data }">
              <div class="flex justify-end gap-1">
                <Button
                  type="button"
                  icon="pi pi-pencil"
                  size="small"
                  text
                  rounded
                  @click="openEditDialog(data)"
                  v-tooltip.top="$t('common.edit')"
                />
                <Button
                  type="button"
                  icon="pi pi-trash"
                  size="small"
                  text
                  rounded
                  severity="danger"
                  @click="confirmDelete(data)"
                  v-tooltip.top="$t('common.delete')"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <div
          v-if="!itemsLoading && items.length > 0"
          class="bg-surface-50 dark:bg-surface-800 mt-4 flex items-center justify-between rounded p-4"
        >
          <Button
            type="button"
            @click="openAddDialog"
            severity="secondary"
            size="small"
            icon="pi pi-plus"
            :label="$t('offers.items.addAnotherItem')"
            outlined
          />
          <div class="text-right">
            <div class="text-surface-600 dark:text-surface-400 text-sm">
              {{ $t('offers.items.subtotal') }}
            </div>
            <div class="text-xl font-bold">€{{ formatPrice(subtotal) }}</div>
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        <h3 class="text-lg font-semibold">{{ $t('offers.form.orderSettings') }}</h3>
      </template>
      <template #content>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium">
              {{ $t('offers.form.orderDiscount') }}
            </label>
            <InputNumber
              :model-value="orderDiscount"
              @update:model-value="$emit('update:orderDiscount', $event)"
              suffix="%"
              :min="0"
              :max="100"
              class="w-full"
            />
            <small class="text-surface-500 mt-1 block">
              {{ $t('offers.form.orderDiscountHint') }}
            </small>
          </div>
        </div>
      </template>
    </Card>

    <div class="flex justify-between">
      <Button
        type="button"
        @click="$emit('back')"
        severity="secondary"
        :label="$t('common.back')"
        icon="pi pi-arrow-left"
      />
      <div class="flex gap-3">
        <Button
          v-if="offerHash && items.length > 0"
          type="button"
          @click="$emit('view-pdf')"
          severity="info"
          :label="$t('offers.viewPDF')"
          icon="pi pi-eye"
          outlined
        />
        <Button
          v-if="offerHash && items.length > 0"
          type="button"
          @click="$emit('download-pdf')"
          severity="info"
          :label="$t('offers.downloadPDF')"
          icon="pi pi-download"
          outlined
        />
        <Button
          type="button"
          @click="$emit('next')"
          :label="$t('offers.form.review')"
          icon="pi pi-arrow-right"
          iconPos="right"
        />
      </div>
    </div>

    <Dialog
      v-model:visible="showItemDialog"
      :header="isEditMode ? $t('offers.items.editItem') : $t('offers.items.addItem')"
      :modal="true"
      :style="{ width: '800px' }"
      :breakpoints="{ '960px': '90vw' }"
      @update:visible="
        (val) => {
          if (!val) closeDialog()
        }
      "
    >
      <div class="space-y-4">
        <div
          class="rounded border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20"
        >
          <label for="productSearch" class="mb-2 block text-sm font-medium">
            <i class="pi pi-search mr-2"></i>{{ $t('offers.items.searchProduct') }}
          </label>
          <AutoComplete
            id="productSearch"
            v-model="productSearchQuery"
            :suggestions="productSuggestions"
            @complete="searchProducts"
            @item-select="onProductSelect"
            optionLabel="name"
            :placeholder="$t('offers.items.searchProductPlaceholder')"
            class="w-full"
            :loading="searchLoading"
            forceSelection
            :completeOnFocus="false"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-3 py-2">
                <div class="flex-1">
                  <div class="font-semibold">{{ slotProps.option.name }}</div>
                  <div class="text-surface-500 text-sm">
                    {{
                      slotProps.option.articleNo
                        ? `${$t('offers.items.articleNumber')}: ${slotProps.option.articleNo}`
                        : ''
                    }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-semibold">€{{ formatPrice(slotProps.option.price) }}</div>
                </div>
              </div>
            </template>
          </AutoComplete>
          <small class="text-surface-600 dark:text-surface-400 mt-1 block">
            {{ $t('offers.items.searchProductHint') }}
          </small>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="articleNr" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.articleNumber') }}
            </label>
            <InputText
              v-model="itemFormData.articleNr"
              id="articleNr"
              class="w-full"
              :placeholder="$t('offers.items.articleNumberPlaceholder')"
            />
          </div>

          <div>
            <label for="name" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.name') }} <span class="text-red-500">*</span>
            </label>
            <InputText
              v-model="itemFormData.name"
              id="name"
              class="w-full"
              :class="{ 'p-invalid': validationErrors.name }"
              :placeholder="$t('offers.items.namePlaceholder')"
            />
            <small v-if="validationErrors.name" class="p-error">{{ validationErrors.name }}</small>
          </div>
        </div>

        <div>
          <label for="description" class="mb-2 block text-sm font-medium">
            {{ $t('offers.items.description') }}
          </label>
          <Textarea
            v-model="itemFormData.description"
            id="description"
            rows="3"
            class="w-full"
            :placeholder="$t('offers.items.descriptionPlaceholder')"
          />
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label for="quantity" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.quantity') }} <span class="text-red-500">*</span>
            </label>
            <InputNumber
              v-model="itemFormData.quantity"
              id="quantity"
              :min="1"
              class="w-full"
              :class="{ 'p-invalid': validationErrors.quantity }"
            />
            <small v-if="validationErrors.quantity" class="p-error">{{
              validationErrors.quantity
            }}</small>
          </div>

          <div>
            <label for="price" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.price') }}
            </label>
            <InputNumber
              v-model="itemFormData.price"
              id="price"
              mode="currency"
              currency="EUR"
              locale="nl-NL"
              :minFractionDigits="2"
              class="w-full"
            />
          </div>

          <div>
            <label for="orderDiscount" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.orderDiscount') }} (%)
            </label>
            <InputNumber
              v-model="itemFormData.orderDiscount"
              id="orderDiscount"
              suffix="%"
              :min="0"
              :max="100"
              class="w-full"
            />
          </div>
        </div>

        <div
          class="bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 rounded border p-4"
        >
          <div class="flex items-center justify-between">
            <span class="text-surface-600 dark:text-surface-400 text-sm font-medium">
              {{ $t('offers.items.total') }}
            </span>
            <span class="text-primary text-2xl font-bold">
              €{{ formatPrice(calculateTotal(itemFormData)) }}
            </span>
          </div>
        </div>

        <div>
          <label class="mb-3 block text-sm font-medium">{{ $t('offers.items.options') }}</label>
          <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
            <div
              class="hover:bg-surface-50 dark:hover:bg-surface-800 flex items-center gap-2 rounded p-2"
            >
              <Checkbox v-model="itemFormData.pagebreak" inputId="pagebreak" :binary="true" />
              <label for="pagebreak" class="cursor-pointer text-sm">
                {{ $t('offers.items.pagebreak') }}
              </label>
            </div>

            <div
              class="hover:bg-surface-50 dark:hover:bg-surface-800 flex items-center gap-2 rounded p-2"
            >
              <Checkbox v-model="itemFormData.option" inputId="option" :binary="true" />
              <label for="option" class="cursor-pointer text-sm">
                {{ $t('offers.items.option') }}
              </label>
            </div>

            <div
              class="hover:bg-surface-50 dark:hover:bg-surface-800 flex items-center gap-2 rounded p-2"
            >
              <Checkbox v-model="itemFormData.folder" inputId="folder" :binary="true" />
              <label for="folder" class="cursor-pointer text-sm">
                {{ $t('offers.items.folder') }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          type="button"
          :label="$t('common.cancel')"
          severity="secondary"
          @click="closeDialog"
        />
        <Button type="button" :label="$t('common.save')" :loading="saving" @click="saveItem" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showDeleteDialog"
      :header="$t('common.confirmDelete')"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle text-2xl text-red-500"></i>
        <span>{{ $t('offers.items.confirmDelete') }}</span>
      </div>
      <template #footer>
        <Button
          :label="$t('common.cancel')"
          severity="secondary"
          @click="showDeleteDialog = false"
        />
        <Button :label="$t('common.delete')" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useSearchStore } from '@/stores/search'
  import Card from 'primevue/card'
  import Button from 'primevue/button'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputNumber from 'primevue/inputnumber'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import Checkbox from 'primevue/checkbox'
  import AutoComplete from 'primevue/autocomplete'
  import Dialog from 'primevue/dialog'
  import type { OfferItem } from '@/types/Offer'

  interface Props {
    items: OfferItem[]
    itemsLoading: boolean
    orderDiscount: number
    offerHash?: string | null
  }

  interface Emits {
    (e: 'add-item', item: any): void
    (e: 'edit-item', item: any): void
    (e: 'delete-item', item: OfferItem): void
    (e: 'add-favorites'): void
    (e: 'update:orderDiscount', value: number): void
    (e: 'view-pdf'): void
    (e: 'download-pdf'): void
    (e: 'back'): void
    (e: 'next'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { t } = useI18n()
  const searchStore = useSearchStore()

  const showItemDialog = ref(false)
  const showDeleteDialog = ref(false)
  const saving = ref(false)
  const isEditMode = ref(false)
  const itemToDelete = ref<OfferItem | null>(null)

  const itemFormData = ref({
    id: null as string | null,
    productId: null as number | null,
    articleNr: '',
    name: '',
    description: '',
    quantity: 1,
    price: 0,
    orderDiscount: 0,
    pagebreak: false,
    option: false,
    folder: false,
  })

  const validationErrors = ref<Record<string, string>>({})
  const productSearchQuery = ref<string>('')
  const productSuggestions = ref<any[]>([])
  const searchLoading = ref<boolean>(false)

  const subtotal = computed(() => {
    return props.items.reduce((sum, item) => sum + (item.total || 0), 0)
  })

  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return '0.00'
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(numPrice)) return '0.00'
    return numPrice.toFixed(2)
  }

  const calculateTotal = (data: any): number => {
    const subtotal = data.quantity * data.price
    const orderDiscountAmount = (subtotal * data.orderDiscount) / 100
    return subtotal - orderDiscountAmount
  }

  const resetForm = () => {
    itemFormData.value = {
      id: null,
      productId: null,
      articleNr: '',
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      orderDiscount: 0,
      pagebreak: false,
      option: false,
      folder: false,
    }
    validationErrors.value = {}
    productSearchQuery.value = ''
  }

  const openAddDialog = () => {
    resetForm()
    isEditMode.value = false
    showItemDialog.value = true
  }

  const openEditDialog = (item: OfferItem) => {
    itemFormData.value = {
      id: item.id || null,
      productId: item.productId || null,
      articleNr: item.articleNr?.toString() || '',
      name: item.name || '',
      description: item.description || '',
      quantity: item.quantity || 1,
      price: item.price || 0,
      orderDiscount: item.orderDiscount || 0,
      pagebreak: item.pagebreak || false,
      option: item.option || false,
      folder: item.folder || false,
    }
    isEditMode.value = true
    validationErrors.value = {}
    productSearchQuery.value = ''
    showItemDialog.value = true
  }

  const closeDialog = () => {
    showItemDialog.value = false
    resetForm()
  }

  const validateForm = (): boolean => {
    validationErrors.value = {}

    if (!itemFormData.value.quantity || itemFormData.value.quantity < 1) {
      validationErrors.value.quantity = t('offers.items.quantityRequired')
    }

    if (!itemFormData.value.name || itemFormData.value.name.trim() === '') {
      validationErrors.value.name = t('offers.items.nameRequired')
    }

    return Object.keys(validationErrors.value).length === 0
  }

  const saveItem = () => {
    if (!validateForm()) return

    saving.value = true

    try {
      const itemData = {
        ...itemFormData.value,
        total: calculateTotal(itemFormData.value),
      }

      if (itemFormData.value.id) {
        emit('edit-item', itemData)
      } else {
        emit('add-item', itemData)
      }

      closeDialog()
    } catch (error) {
      console.error('Error saving item:', error)
    } finally {
      saving.value = false
    }
  }

  const confirmDelete = (item: OfferItem) => {
    itemToDelete.value = item
    showDeleteDialog.value = true
  }

  const handleDelete = () => {
    if (itemToDelete.value) {
      emit('delete-item', itemToDelete.value)
    }
    showDeleteDialog.value = false
    itemToDelete.value = null
  }

  const searchProducts = async (event: any) => {
    const query = event.query?.trim()
    console.log('searchProducts called with query:', query)

    if (!query || query.length < 3) {
      productSuggestions.value = []
      return
    }

    searchLoading.value = true
    try {
      const suggestions = await searchStore.fetchSuggestions(query, 10)
      console.log('Suggestions received:', suggestions)

      productSuggestions.value = suggestions || []
      console.log('productSuggestions set to:', productSuggestions.value)
    } catch (error) {
      console.error('Error fetching product suggestions:', error)
      productSuggestions.value = []
    } finally {
      searchLoading.value = false
    }
  }

  const onProductSelect = (event: any) => {
    console.log('onProductSelect called', event)
    const product = event.value

    if (!product) {
      console.log('No product found in event.value')
      return
    }

    console.log('Selected product:', product)

    itemFormData.value.productId = product.id
    itemFormData.value.articleNr = product.articleNo || ''
    itemFormData.value.name = product.name || ''
    itemFormData.value.description = product.description || ''
    itemFormData.value.price = product.price || 0

    console.log('Updated itemFormData:', itemFormData.value)

    productSearchQuery.value = ''
  }
</script>

<style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .offer-items-table :deep(.p-datatable-thead > tr > th) {
    padding: 0.75rem 0.5rem;
  }

  .offer-items-table :deep(.p-datatable-tbody > tr > td) {
    padding: 0.75rem 0.5rem;
  }

  .offer-items-table :deep(.text-center) {
    text-align: center;
  }

  .offer-items-table :deep(.text-right) {
    text-align: right;
  }
</style>
