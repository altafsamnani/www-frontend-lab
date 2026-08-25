<template>
  <div class="flex flex-col gap-6">
    <!-- Search Mode Tabs -->
    <div class="border-surface-200 dark:border-surface-700 flex gap-2 border-b pb-2">
      <Button
        :severity="searchMode === 'order' ? 'primary' : 'secondary'"
        :outlined="searchMode !== 'order'"
        size="small"
        @click="searchMode = 'order'"
      >
        <i class="pi pi-shopping-bag mr-2"></i>
        {{ $t('rma.itemForm.searchByOrder') }}
      </Button>
      <Button
        :severity="searchMode === 'product' ? 'primary' : 'secondary'"
        :outlined="searchMode !== 'product'"
        size="small"
        @click="searchMode = 'product'"
      >
        <i class="pi pi-box mr-2"></i>
        {{ $t('rma.itemForm.searchByProduct') }}
      </Button>
    </div>

    <!-- MODE 1: Search by Order -->
    <div v-if="searchMode === 'order'" class="flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">{{ $t('rma.itemForm.orderNumber') }}</label>
          <InputText
            v-model="orderSearch.orderNr"
            :placeholder="$t('rma.itemForm.orderNumberPlaceholder')"
            class="w-full"
            @keyup.enter="searchOrders"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">{{ $t('rma.itemForm.reference') }}</label>
          <InputText
            v-model="orderSearch.reference"
            :placeholder="$t('rma.itemForm.referencePlaceholder')"
            class="w-full"
            @keyup.enter="searchOrders"
          />
        </div>
      </div>
      <div class="flex gap-2">
        <Button size="small" @click="searchOrders" :loading="orderSearchLoading">
          <i class="pi pi-search mr-2"></i>
          {{ $t('rma.itemForm.search') }}
        </Button>
      </div>

      <!-- Order Results -->
      <div v-if="filteredOrders.length > 0">
        <DataTable
          :value="filteredOrders"
          dataKey="id"
          size="small"
          v-model:expandedRows="expandedOrderRows"
          @rowExpand="onOrderExpand"
          class="text-sm"
        >
          <Column :expander="true" style="width: 3rem" />
          <Column :header="$t('rma.itemForm.orderNumber')" style="width: 120px">
            <template #body="{ data }">
              <span class="font-semibold">#{{ data.id }}</span>
            </template>
          </Column>
          <Column field="reference" :header="$t('rma.itemForm.reference')" />
          <Column field="totalItems" :header="$t('rma.fields.items')" style="width: 80px" />
          <Column :header="$t('rma.itemForm.date')" style="width: 110px">
            <template #body="{ data }">
              {{ data.createdAt ? formatDate(data.createdAt) : '' }}
            </template>
          </Column>

          <template #expansion="{ data: order }">
            <div class="p-3">
              <div v-if="loadingOrderItems[order.id]" class="py-4 text-center">
                <i class="pi pi-spinner pi-spin"></i> {{ $t('rma.itemForm.loadingItems') }}
              </div>
              <div v-else-if="orderItems[order.id]?.length > 0">
                <DataTable :value="orderItems[order.id]" dataKey="id" size="small" class="text-sm">
                  <Column :header="$t('rma.fields.sku')" style="width: 100px">
                    <template #body="{ data: item }">
                      {{ item.articleNr || item.article_nr }}
                    </template>
                  </Column>
                  <Column :header="$t('rma.fields.productName')">
                    <template #body="{ data: item }">
                      {{ item.name || (item.product && item.product.name) }}
                    </template>
                  </Column>
                  <Column :header="$t('rma.fields.quantity')" style="width: 80px">
                    <template #body="{ data: item }">
                      {{ item.quantity }}
                    </template>
                  </Column>
                  <Column style="width: 100px">
                    <template #body="{ data: item }">
                      <Button
                        size="small"
                        :disabled="isItemAlreadyAdded(item.articleNr || item.article_nr)"
                        @click="selectOrderItem(item, order)"
                      >
                        <i class="pi pi-plus mr-1"></i>
                        {{
                          isItemAlreadyAdded(item.articleNr || item.article_nr)
                            ? $t('rma.itemForm.added')
                            : $t('rma.itemForm.select')
                        }}
                      </Button>
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div v-else class="text-surface-500 py-2 text-sm">
                {{ $t('rma.itemForm.noItems') }}
              </div>
            </div>
          </template>
        </DataTable>
      </div>

      <div
        v-else-if="orderSearchDone && filteredOrders.length === 0"
        class="text-surface-500 dark:text-surface-400 py-2 text-sm"
      >
        <i class="pi pi-info-circle mr-1"></i>
        {{ $t('rma.itemForm.noOrdersFound') }}
      </div>
    </div>

    <!-- MODE 2: Search by Product -->
    <div v-if="searchMode === 'product'" class="flex flex-col gap-4">
      <div>
        <label class="mb-2 block text-sm font-medium">{{ $t('rma.itemForm.searchProduct') }}</label>
        <AutoComplete
          v-model="productSearchQuery"
          :suggestions="productSuggestions"
          @complete="searchProducts"
          @item-select="onProductSelect"
          optionLabel="name"
          :placeholder="$t('rma.itemForm.searchProductPlaceholder')"
          class="w-full"
          :loading="productSearchLoading"
          forceSelection
          :completeOnFocus="false"
        >
          <template #option="slotProps">
            <div class="flex items-center gap-3 py-1">
              <div
                class="bg-surface-100 dark:bg-surface-800 flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded"
              >
                <img
                  v-if="slotProps.option.thumbnail"
                  :src="slotProps.option.thumbnail"
                  class="h-full w-full object-cover"
                />
                <i v-else class="pi pi-image text-surface-400"></i>
              </div>
              <div class="min-w-0 flex-1">
                <div class="truncate text-sm font-semibold">{{ slotProps.option.name }}</div>
                <div class="text-surface-500 text-xs">
                  {{ slotProps.option.articleNo ? `#${slotProps.option.articleNo}` : '' }}
                </div>
              </div>
              <div
                v-if="isItemAlreadyAdded(slotProps.option.articleNo)"
                class="text-xs text-orange-600"
              >
                {{ $t('rma.itemForm.alreadyInBasket') }}
              </div>
            </div>
          </template>
        </AutoComplete>
        <small class="text-surface-400">{{ $t('rma.itemForm.searchProductHint') }}</small>
      </div>
    </div>

    <!-- Selected Item Form (appears after selection from either mode) -->
    <div
      v-if="selectedItem"
      class="bg-surface-50 dark:bg-surface-800/50 border-surface-200 dark:border-surface-700 rounded-lg border p-4"
    >
      <div class="mb-4 flex items-center justify-between">
        <h4 class="font-semibold">{{ $t('rma.itemForm.itemDetails') }}</h4>
        <Button text severity="secondary" size="small" @click="clearSelection">
          <i class="pi pi-times"></i>
        </Button>
      </div>

      <vee-form
        :validation-schema="itemSchema"
        :initial-values="formInitialValues"
        @submit="handleAddItem"
        class="flex flex-col gap-4"
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.sku') }}</label>
            <InputText
              :modelValue="selectedItem.articleNo || String(selectedItem.productId)"
              class="w-full"
              disabled
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.productName') }}</label>
            <InputText :modelValue="selectedItem.productName" class="w-full" disabled />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.quantity') }} *</label>
            <vee-field name="quantity" v-slot="{ value, handleChange }">
              <InputNumber
                :modelValue="value"
                @update:modelValue="handleChange"
                :min="1"
                :max="selectedItem.maxQuantity || 999"
                class="w-full"
              />
            </vee-field>
            <ErrorMessage class="error text-sm text-red-500" name="quantity" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.serialnumbers') }}</label>
            <vee-field
              as="InputText"
              name="serialnumbers"
              class="w-full"
              :placeholder="$t('rma.itemForm.serialPlaceholder')"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.reason') }} *</label>
            <vee-field name="reason" v-slot="{ value, setValue }">
              <Select
                :modelValue="value"
                @update:modelValue="
                  (val: any) => {
                    setValue(val)
                    selectedReason = val
                    selectedReasonDetail = null
                  }
                "
                :options="reasonOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('rma.fields.selectReason')"
                class="w-full"
              />
            </vee-field>
            <ErrorMessage class="error text-sm text-red-500" name="reason" />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div v-if="filteredReasonDetails.length > 0" class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.reasonDetail') }}</label>
            <vee-field name="reasonAlt" v-slot="{ value, setValue }">
              <Select
                :modelValue="value"
                @update:modelValue="
                  (val: any) => {
                    setValue(val)
                    selectedReasonDetail = val
                  }
                "
                :options="filteredReasonDetails"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('rma.fields.selectReasonDetail')"
                :showClear="true"
                class="w-full"
              />
            </vee-field>
          </div>

          <div v-if="isDefectReason" class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.frequency') }}</label>
            <vee-field name="frequency" v-slot="{ value, setValue }">
              <Select
                :modelValue="value"
                @update:modelValue="setValue"
                :options="frequencyOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('rma.fields.selectFrequency')"
                class="w-full"
              />
            </vee-field>
          </div>

          <div v-if="isDefectReason" class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.supportContacted') }}</label>
            <vee-field name="supportContacted" v-slot="{ value, setValue }">
              <Select
                :modelValue="value"
                @update:modelValue="setValue"
                :options="supportContactOptions"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('rma.fields.selectSupportContact')"
                class="w-full"
              />
            </vee-field>
          </div>

          <div v-if="isLoanReason" class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('rma.fields.loanRef') }}</label>
            <vee-field as="InputText" name="loanRef" class="w-full" maxlength="50" />
          </div>
        </div>

        <!-- Tip van Osec (dynamic from DB) -->
        <div v-if="osecTips.length > 0" class="col-span-full">
          <div
            class="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20"
          >
            <div class="mb-2 flex items-center gap-2">
              <i class="pi pi-lightbulb text-amber-600 dark:text-amber-400"></i>
              <span class="text-sm font-semibold text-amber-800 dark:text-amber-200">{{
                $t('rma.itemForm.osecTip')
              }}</span>
            </div>
            <ul :class="osecTips.length > 1 ? 'ml-6 flex list-disc flex-col gap-2' : 'ml-6'">
              <li
                v-for="tip in osecTips"
                :key="tip.id"
                class="text-sm text-amber-700 dark:text-amber-300"
                v-html="markdownToHtml(tip.description)"
              ></li>
            </ul>
          </div>
        </div>
        <div v-if="tipsLoading" class="col-span-full">
          <i class="pi pi-spinner pi-spin text-surface-400"></i>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">{{ $t('rma.fields.remarks') }}</label>
          <vee-field
            as="Textarea"
            name="remarks"
            rows="2"
            class="w-full"
            :placeholder="$t('rma.fields.remarksPlaceholder')"
          />
        </div>

        <div class="flex justify-end">
          <Button type="submit" :loading="adding">
            <i class="pi pi-plus mr-2"></i>
            {{ $t('rma.create.addItem') }}
          </Button>
        </div>
      </vee-form>
    </div>

    <!-- Fallback message -->
    <div class="text-surface-500 dark:text-surface-400 flex items-center gap-1 text-sm">
      <i class="pi pi-info-circle"></i>
      {{ $t('rma.itemForm.notFound') }}
      <a href="mailto:rma@osec.nl" class="text-primary font-medium underline hover:no-underline"
        >rma@osec.nl</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRmaStore } from '@/stores/rmas'
  import { useOrderStore } from '@/stores/orders'
  import { useSearchStore } from '@/stores/search'
  import { getRmaTips } from '@/http/rmas'
  import { markdownToHtml } from '@/includes/helpers'
  import InputNumber from 'primevue/inputnumber'
  import InputText from 'primevue/inputtext'
  import Select from 'primevue/select'
  import AutoComplete from 'primevue/autocomplete'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import dayjs from 'dayjs'

  const props = defineProps<{
    rmaId: string | null
    addedProductIds?: number[]
  }>()

  const emit = defineEmits<{
    (e: 'item-added'): void
  }>()

  const { t, tm } = useI18n()
  const rmaStore = useRmaStore()
  const { rmaConfig } = storeToRefs(rmaStore)
  const orderStore = useOrderStore()
  const searchStore = useSearchStore()

  onMounted(async () => {
    if (!rmaConfig.value) {
      await rmaStore.fetchRmaConfig()
    }
  })

  const searchMode = ref<'order' | 'product'>('order')
  const adding = ref(false)
  const selectedReason = ref<string | null>(null)
  const selectedReasonDetail = ref<string | null>(null)
  const addedProductIds = ref<number[]>(props.addedProductIds || [])

  const selectedItem = ref<{
    productId: number
    articleNo: string
    productName: string
    quantity: number
    maxQuantity?: number
    orderNo?: string
    orderDate?: string
    categoryId?: number
  } | null>(null)

  // --- Order Search ---
  const orderSearch = reactive({ orderNr: '', reference: '' })
  const orderSearchLoading = ref(false)
  const orderSearchDone = ref(false)
  const expandedOrderRows = ref({})
  const orderItems = ref<Record<number, any[]>>({})
  const loadingOrderItems = ref<Record<number, boolean>>({})

  const filteredOrders = computed(() => {
    if (!orderStore.orders?.length) return []
    return orderStore.orders.filter((order: any) => {
      const matchOrder = !orderSearch.orderNr || String(order.id).includes(orderSearch.orderNr)
      const matchRef =
        !orderSearch.reference ||
        (order.reference &&
          order.reference.toLowerCase().includes(orderSearch.reference.toLowerCase()))
      return matchOrder && matchRef
    })
  })

  const searchOrders = async () => {
    orderSearchLoading.value = true
    orderSearchDone.value = false
    await orderStore.fetchUserOrders()
    orderSearchDone.value = true
    orderSearchLoading.value = false
  }

  const onOrderExpand = async (event: any) => {
    const orderId = event.data.id
    if (orderItems.value[orderId] || loadingOrderItems.value[orderId]) return
    loadingOrderItems.value[orderId] = true
    const detail = await orderStore.fetchOrderById(Number(orderId))
    orderItems.value[orderId] =
      detail?.products || detail?.orderItems || detail?.order_items || detail?.items || []
    loadingOrderItems.value[orderId] = false
  }

  const selectOrderItem = (item: any, order: any) => {
    const productId = Number(item.productId || item.product_id || item.id)
    const articleNo = String(item.articleNr || item.article_nr || item.articleNo || '')
    if (isItemAlreadyAdded(productId)) return
    selectedItem.value = {
      productId,
      articleNo,
      productName: item.name || item.product?.name || '',
      quantity: 1,
      maxQuantity: item.quantity,
      orderNo: String(order.id),
      orderDate: order.createdAt || order.created_at || null,
    }
  }

  // --- Product Search ---
  const productSearchQuery = ref<string>('')
  const productSuggestions = ref<any[]>([])
  const productSearchLoading = ref(false)

  const searchProducts = async (event: any) => {
    const query = event.query?.trim()
    if (!query || query.length < 3) {
      productSuggestions.value = []
      return
    }
    productSearchLoading.value = true
    const suggestions = await searchStore.fetchSuggestions(query, 10)
    productSuggestions.value = suggestions || []
    productSearchLoading.value = false
  }

  const onProductSelect = (event: any) => {
    const product = event.value
    if (!product) return
    selectedItem.value = {
      productId: Number(product.id),
      articleNo: String(product.articleNo || ''),
      productName: product.name || '',
      quantity: 1,
      categoryId: product.categoryId || product.category_id || undefined,
    }
    productSearchQuery.value = ''
  }

  // --- Already Added Check ---
  const isItemAlreadyAdded = (productId: any): boolean => {
    return addedProductIds.value.includes(Number(productId))
  }

  // --- Form ---
  const formInitialValues = computed(() => ({
    quantity: selectedItem.value?.quantity || 1,
    serialnumbers: '',
    reason: null,
    reasonAlt: null,
    remarks: '',
    frequency: null,
    supportContacted: null,
    loanRef: '',
  }))

  const clearSelection = () => {
    selectedItem.value = null
    selectedReason.value = null
    selectedReasonDetail.value = null
    osecTips.value = []
  }

  const formatDate = (date: string): string => dayjs(date).format('DD-MM-YYYY')

  // --- Dynamic Osec Tips ---
  const osecTips = ref<{ id: number; description: string }[]>([])
  const tipsLoading = ref(false)

  const fetchTips = async () => {
    if (!selectedReason.value) {
      osecTips.value = []
      return
    }
    tipsLoading.value = true
    const reasonObj = rmaConfig.value?.reasons?.find(
      (item: any) => item.code === selectedReason.value
    )
    const params: any = { reasonId: reasonObj?.id || selectedReason.value }
    if (selectedItem.value?.articleNo) {
      params.sku = selectedItem.value.articleNo
    }
    if (selectedItem.value?.categoryId) {
      params.categoryId = selectedItem.value.categoryId
    }
    if (selectedReasonDetail.value) {
      params.detailCode = selectedReasonDetail.value
    }
    const { data } = await getRmaTips(params)
    osecTips.value = data || []
    tipsLoading.value = false
  }

  // Re-fetch tips whenever reason, detail, or product changes
  watch([selectedReason, selectedReasonDetail], () => {
    fetchTips()
  })

  const itemSchema = reactive({
    sku: '',
    productName: '',
    quantity: 'required|min_value:1',
    serialnumbers: '',
    reason: 'required',
    reasonAlt: '',
    remarks: '',
    frequency: '',
    supportContacted: '',
    loanRef: 'max:50',
  })

  const isDefectReason = computed(
    () => selectedReason.value === 'defect' || selectedReason.value === 'defect_delivery'
  )
  const isLoanReason = computed(() => selectedReason.value === 'loan_consignment')

  const reasonOptions = computed(() => {
    if (!rmaConfig.value?.reasons) return []
    return rmaConfig.value.reasons.map((reason: any) => ({
      value: reason.code,
      label: t(`rmaConfig.rma_reasons.${reason.code}`, reason.code),
    }))
  })

  const filteredReasonDetails = computed(() => {
    if (!selectedReason.value || !rmaConfig.value?.reasonDetails || !rmaConfig.value?.reasons)
      return []
    const reason = rmaConfig.value.reasons.find((item: any) => item.code === selectedReason.value)
    if (!reason) return []
    return rmaConfig.value.reasonDetails
      .filter((detail: any) => detail.reasonId === reason.id)
      .map((detail: any) => ({
        value: detail.code,
        label: t(`rmaConfig.rma_reason_details.${detail.code}`, detail.code),
      }))
  })

  const frequencyOptions = computed(() => {
    const messages = tm('rmaConfig.rma_frequency') as Record<string, string> | null
    if (!messages || typeof messages !== 'object') return []
    return Object.keys(messages).map((code) => ({
      value: code,
      label: t(`rmaConfig.rma_frequency.${code}`, code),
    }))
  })

  const supportContactOptions = computed(() => {
    const messages = tm('rmaConfig.rma_support_contact') as Record<string, string> | null
    if (!messages || typeof messages !== 'object') return []
    return Object.keys(messages).map((code) => ({
      value: code,
      label: t(`rmaConfig.rma_support_contact.${code}`, code),
    }))
  })

  const handleAddItem = async (formData: any) => {
    if (!props.rmaId || !selectedItem.value) return

    adding.value = true
    await rmaStore.addRmaItem(props.rmaId, {
      productId: selectedItem.value.productId,
      quantity: formData.quantity || 1,
      reason: formData.reason,
      reasonAlt: formData.reasonAlt || undefined,
      serialnumbers: formData.serialnumbers || undefined,
      productName: selectedItem.value.productName || undefined,
      remarks: formData.remarks || undefined,
      frequency: formData.frequency || undefined,
      supportContacted: formData.supportContacted || undefined,
      orderNo: selectedItem.value.orderNo ? Number(selectedItem.value.orderNo) : undefined,
      orderDate: selectedItem.value.orderDate || undefined,
      loanRef: formData.loanRef || undefined,
    })
    addedProductIds.value.push(selectedItem.value.productId)
    adding.value = false
    clearSelection()
    emit('item-added')
  }
</script>
