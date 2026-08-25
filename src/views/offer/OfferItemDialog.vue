<template>
  <Dialog
    :visible="visible"
    :header="isEditMode ? $t('offers.items.editItem') : $t('offers.items.addItem')"
    :modal="true"
    :style="{ width: '700px' }"
    @update:visible="handleClose"
  >
    <vee-form
      ref="formRef"
      @submit="handleSubmit"
      :validation-schema="validationSchema"
      :initial-values="formData"
      v-slot="{ errors }"
    >
      <div class="space-y-4">
        <!-- Product Search Autocomplete -->
        <div>
          <label for="productSearch" class="mb-2 block text-sm font-medium">
            {{ $t('offers.items.searchProduct') }}
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
                  <div class="font-semibold">
                    {{ formatPrice(slotProps.option.price) }}
                  </div>
                </div>
              </div>
            </template>
          </AutoComplete>
          <small class="text-surface-500">{{ $t('offers.items.searchProductHint') }}</small>
        </div>

        <!-- Article Number and Name Row -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="articleNr" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.articleNumber') }}
            </label>
            <Field
              as="InputText"
              name="articleNr"
              id="articleNr"
              class="w-full"
              :class="{ 'p-invalid': errors.articleNr }"
            />
            <small v-if="errors.articleNr" class="p-error">{{ errors.articleNr }}</small>
          </div>

          <div>
            <label for="name" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.name') }}
            </label>
            <Field
              as="InputText"
              name="name"
              id="name"
              class="w-full"
              :class="{ 'p-invalid': errors.name }"
            />
            <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="mb-2 block text-sm font-medium">
            {{ $t('offers.items.description') }}
          </label>
          <Field as="Textarea" name="description" id="description" rows="3" class="w-full" />
        </div>

        <!-- Quantity, Price, Discount Row -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label for="quantity" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.quantity') }} <span class="text-red-500">*</span>
            </label>
            <Field name="quantity" v-slot="{ field, value, handleChange }">
              <InputNumber
                id="quantity"
                :modelValue="value"
                @update:modelValue="handleChange"
                :min="1"
                class="w-full"
                :class="{ 'p-invalid': errors.quantity }"
              />
            </Field>
            <small v-if="errors.quantity" class="p-error">{{ errors.quantity }}</small>
          </div>

          <div>
            <label for="price" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.price') }}
            </label>
            <Field name="price" v-slot="{ field, value, handleChange }">
              <InputNumber
                id="price"
                :modelValue="value"
                @update:modelValue="handleChange"
                mode="currency"
                currency="EUR"
                :minFractionDigits="2"
                class="w-full"
              />
            </Field>
          </div>

          <div>
            <label for="discount" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.discount') }} (%)
            </label>
            <Field name="discount" v-slot="{ field, value, handleChange }">
              <InputNumber
                id="discount"
                :modelValue="value"
                @update:modelValue="handleChange"
                suffix="%"
                :min="0"
                :max="100"
                class="w-full"
              />
            </Field>
          </div>
        </div>

        <!-- Net Price and Custom Net Price Row -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="netPrice" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.netPrice') }}
            </label>
            <Field name="netPrice" v-slot="{ field, value, handleChange }">
              <InputNumber
                id="netPrice"
                :modelValue="value"
                @update:modelValue="handleChange"
                mode="currency"
                currency="EUR"
                :minFractionDigits="2"
                class="w-full"
              />
            </Field>
          </div>

          <div>
            <label for="customNetPrice" class="mb-2 block text-sm font-medium">
              {{ $t('offers.items.customNetPrice') }}
            </label>
            <Field name="customNetPrice" v-slot="{ field, value, handleChange }">
              <InputNumber
                id="customNetPrice"
                :modelValue="value"
                @update:modelValue="handleChange"
                mode="currency"
                currency="EUR"
                :minFractionDigits="2"
                class="w-full"
              />
            </Field>
          </div>
        </div>

        <!-- Sort Order -->
        <div>
          <label for="order" class="mb-2 block text-sm font-medium">
            {{ $t('offers.items.order') }}
          </label>
          <Field name="order" v-slot="{ field, value, handleChange }">
            <InputNumber
              id="order"
              :modelValue="value"
              @update:modelValue="handleChange"
              :min="1"
              class="w-full"
            />
          </Field>
        </div>

        <!-- Checkboxes -->
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="flex items-center">
            <Field name="pagebreak" type="checkbox" v-slot="{ field, value, handleChange }">
              <Checkbox
                id="pagebreak"
                :modelValue="value"
                @update:modelValue="handleChange"
                :binary="true"
              />
            </Field>
            <label for="pagebreak" class="ml-2 text-sm">
              {{ $t('offers.items.pagebreak') }}
            </label>
          </div>

          <div class="flex items-center">
            <Field name="option" type="checkbox" v-slot="{ field, value, handleChange }">
              <Checkbox
                id="option"
                :modelValue="value"
                @update:modelValue="handleChange"
                :binary="true"
              />
            </Field>
            <label for="option" class="ml-2 text-sm">
              {{ $t('offers.items.option') }}
            </label>
          </div>

          <div class="flex items-center">
            <Field name="nline" type="checkbox" v-slot="{ field, value, handleChange }">
              <Checkbox
                id="nline"
                :modelValue="value"
                @update:modelValue="handleChange"
                :binary="true"
              />
            </Field>
            <label for="nline" class="ml-2 text-sm">
              {{ $t('offers.items.emptyLine') }}
            </label>
          </div>

          <div class="flex items-center">
            <Field name="folder" type="checkbox" v-slot="{ field, value, handleChange }">
              <Checkbox
                id="folder"
                :modelValue="value"
                @update:modelValue="handleChange"
                :binary="true"
              />
            </Field>
            <label for="folder" class="ml-2 text-sm">
              {{ $t('offers.items.folder') }}
            </label>
          </div>
        </div>
      </div>
    </vee-form>

    <template #footer>
      <Button
        type="button"
        :label="$t('common.cancel')"
        severity="secondary"
        @click="handleClose"
      />
      <Button type="button" :label="$t('common.save')" :loading="submitting" @click="submitForm" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Form as VeeForm, Field } from 'vee-validate'
  import Dialog from 'primevue/dialog'
  import InputNumber from 'primevue/inputnumber'
  import Checkbox from 'primevue/checkbox'
  import Button from 'primevue/button'
  import AutoComplete from 'primevue/autocomplete'
  import { useI18n } from 'vue-i18n'
  import type { OfferItem } from '@/types/Offer'
  import { useSearchStore } from '@/stores/search'

  interface Props {
    visible: boolean
    item?: OfferItem | null
  }

  interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'save', item: any): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { t } = useI18n()
  const searchStore = useSearchStore()

  const submitting = ref(false)
  const isEditMode = computed(() => !!props.item?.id)
  const formRef = ref<InstanceType<typeof VeeForm>>()

  const validationSchema = {
    quantity: 'required|min_value:1',
    articleNr: '',
    name: '',
    description: '',
    price: 'min_value:0',
    netPrice: 'min_value:0',
    customNetPrice: 'min_value:0',
    discount: 'min_value:0|max_value:100',
    order: 'min_value:1',
  }

  const formData = ref({
    id: null as string | null,
    productId: null as number | null,
    quantity: 1,
    price: 0,
    netPrice: 0,
    customNetPrice: 0,
    articleNr: '',
    name: '',
    description: '',
    discount: 0,
    priceGross: null as number | null,
    order: 10,
    pagebreak: false,
    option: false,
    nline: false,
    folder: false,
  })

  // Autocomplete state
  const productSearchQuery = ref<string>('')
  const productSuggestions = ref<any[]>([])
  const searchLoading = ref<boolean>(false)

  // Helper function to format price safely
  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return ''
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(numPrice)) return ''
    return `€${numPrice.toFixed(2)}`
  }

  // Search products with autocomplete
  const searchProducts = async (event: any) => {
    const query = event.query?.trim()

    if (!query || query.length < 3) {
      productSuggestions.value = []
      return
    }

    searchLoading.value = true
    try {
      // Use store - it handles the response structure automatically
      const suggestions = await searchStore.fetchSuggestions(query, 10)
      productSuggestions.value = suggestions || []
    } catch (error) {
      console.error('Error fetching product suggestions:', error)
      productSuggestions.value = []
    } finally {
      searchLoading.value = false
    }
  }

  // Handle product selection from autocomplete
  const onProductSelect = (event: any) => {
    const product = event.value

    if (!product) return

    // Populate form fields with selected product data
    formData.value.productId = product.id
    formData.value.articleNr = product.articleNo || ''
    formData.value.name = product.name || ''
    formData.value.description = product.description || ''
    formData.value.price = product.price || 0
    formData.value.netPrice = product.price || 0

    // Force form to update with new values
    if (formRef.value) {
      formRef.value.setValues({
        ...formData.value,
      })
    }

    // Clear search query after selection
    productSearchQuery.value = ''
  }

  const resetForm = () => {
    formData.value = {
      id: null,
      productId: null,
      quantity: 1,
      price: 0,
      netPrice: 0,
      customNetPrice: 0,
      articleNr: '',
      name: '',
      description: '',
      discount: 0,
      priceGross: null,
      order: 10,
      pagebreak: false,
      option: false,
      nline: false,
      folder: false,
    }
  }

  // Watch for item prop changes and populate form
  watch(
    () => props.item,
    (newItem) => {
      if (newItem) {
        formData.value = {
          id: newItem.id || null,
          productId: newItem.productId || null,
          quantity: newItem.quantity || 1,
          price: newItem.price || 0,
          netPrice: newItem.netPrice || 0,
          customNetPrice: newItem.customNetPrice || 0,
          articleNr: newItem.articleNr?.toString() || '',
          name: newItem.name || '',
          description: newItem.description || '',
          discount: newItem.discount || 0,
          priceGross: newItem.priceGross || null,
          order: newItem.order || 10,
          pagebreak: newItem.pagebreak || false,
          option: newItem.option || false,
          nline: newItem.nline || false,
          folder: newItem.folder || false,
        }
      } else {
        resetForm()
      }
    },
    { immediate: true }
  )

  const handleSubmit = async (values: any) => {
    submitting.value = true
    try {
      // Merge form values with id and productId
      const itemData = {
        ...values,
        id: formData.value.id,
        productId: formData.value.productId,
      }

      emit('save', itemData)
      handleClose()
    } catch (error) {
      console.error('Error saving item:', error)
    } finally {
      submitting.value = false
    }
  }

  const submitForm = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate()
      if (valid) {
        await handleSubmit(formRef.value.values)
      }
    }
  }

  const handleClose = () => {
    emit('update:visible', false)
    resetForm()
  }
</script>
