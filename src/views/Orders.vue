<template>
  <RightLayout :title="$t('menu.orders')" :subtitle="$t('orders.subtitle')">

    <!-- Loading State -->
    <div v-if="orderStore.loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="15" />
    </div>

    <!-- Empty State - No Orders -->
    <div v-else-if="orderStore.orders.length === 0" class="text-center py-4">
      <i class="pi pi-inbox text-6xl text-surface-300 dark:text-surface-600 mb-4"></i>
      <p class="text-surface-500 dark:text-surface-400 text-lg mb-4">{{ $t('orders.noOrders') }}</p>
      <p class="text-surface-400 dark:text-surface-500 mb-4">{{ $t('orders.noOrdersMessage') }}</p>
      <router-link :to="{ name: 'Search' }">
        <Button>
          <i class="pi pi-search mr-2"></i>
          {{ $t('orders.startShopping') }}
        </Button>
      </router-link>
    </div>

    <!-- Orders DataTable -->
    <div v-else class="card">
      <DataTable :value="orderStore.orders" :paginator="orderStore.orders.length > 10" :rows="10" dataKey="id"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 20]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :totalRecords="orderStore.orders.length" v-model:expandedRows="expandedRows" @rowExpand="onRowExpand"
        class="orders-datatable">

        <!-- Single Column Layout for Card Display -->
        <Column field="orderCard" header="" class="order-card-column">
          <template #body="{ data }">
            <!-- Unified Order Card -->
            <div
              class="order-card bg-surface-0 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              <!-- Main Order Content -->
              <div class="p-6">
                <!-- Unified Order Row - Order Number Left, Details Right -->
                <div class="flex items-center justify-between gap-6 mb-4 min-w-0">
                  <!-- Left side: Order Number -->
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <i class="pi pi-box text-primary text-lg"></i>
                    <span class="text-xl font-bold text-surface-900 dark:text-surface-0">
                      #{{ data.id }}
                    </span>
                  </div>

                  <!-- Right side: All other details -->
                  <div class="flex items-center gap-4 flex-1 min-w-0 justify-end">
                    <!-- Order Date -->
                    <div class="flex items-center flex-shrink-0">
                      <span class="text-sm text-surface-600 dark:text-surface-400">
                        {{ formatDate(data.createdAt || data.created_at) }}
                      </span>
                    </div>

                    <!-- Status Badge with icon and lighter colors -->
                    <div class="flex items-center flex-shrink-0">
                      <div
                        class="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                        <i :class="getStatusIcon(data.statusName || data.status_name || 'pending')"
                          class="text-xs text-surface-600 dark:text-surface-400"></i>
                        <span class="text-xs font-medium text-surface-700 dark:text-surface-300">
                          {{ $t(`orders.status.${data.statusName || data.status_name || 'pending'}`) }}
                        </span>
                      </div>
                    </div>

                    <!-- Items Count -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                      <i class="pi pi-shopping-bag text-surface-500 text-sm"></i>
                      <span class="font-medium text-surface-900 dark:text-surface-0">
                        {{ data.totalItems || data.total_items || 0 }}
                      </span>
                    </div>

                    <!-- Delivery Type - Icon with Label -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                      <i :class="data.pickup ? 'pi pi-warehouse' : 'pi pi-truck'" class="text-surface-500 text-sm"></i>
                      <span class="text-sm font-medium text-surface-700 dark:text-surface-300">
                        {{ data.pickup ? $t('orders.pickup') : $t('orders.delivery') }}
                      </span>
                    </div>

                    <!-- Total Amount -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                      <span class="font-bold text-lg text-surface-900 dark:text-surface-0">
                        €{{ formatPrice(data.totalAmount || data.total_amount) }}
                      </span>
                      <span v-if="(data.totalDiscount || data.total_discount || 0) > 0"
                        class="text-xs text-green-600 dark:text-green-400">
                        (-€{{ formatPrice(data.totalDiscount || data.total_discount) }})
                      </span>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                      <!-- Download Invoice Button -->
                      <button 
                        @click="downloadInvoice(data)"
                        class="p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
                        v-tooltip.top="$t('orders.downloadInvoice')">
                        <i class="pi pi-download text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300 text-sm"></i>
                      </button>

                      <!-- View Details Button -->
                      <button 
                        @click="toggleRowExpansion(data)"
                        class="p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
                        v-tooltip.top="expandedRows[data.id] ? $t('orders.hideDetails') : $t('orders.viewDetails')">
                        <i :class="expandedRows[data.id] ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
                           class="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300 text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Reference if available -->
                <div v-if="data.reference" class="text-xs text-surface-500 dark:text-surface-400">
                  {{ $t('orders.reference') }}: {{ data.reference }}
                </div>
              </div>

              <!-- Expandable Details Section -->
              <div v-if="expandedRows[data.id]"
                class="border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50">
                <div class="p-6">
                  <!-- Loading State -->
                  <div v-if="loadingDetails[data.id]" class="flex items-center justify-center py-8">
                    <LoaderForm :columns="1" :rows="4" />
                  </div>

                  <!-- Order Details Content -->
                  <div v-else-if="orderDetails[data.id]">
                    <!-- Order Progress Indicator -->
                    <div class="mb-6">
                      <h5 class="font-semibold mb-4 text-surface-900 dark:text-surface-0">{{ $t('orders.orderProgress')
                      }}</h5>
                      <div class="flex items-center justify-between relative">
                        <!-- Progress Line -->
                        <div class="absolute top-4 left-0 right-0 h-0.5 bg-surface-200 dark:bg-surface-700 z-0"></div>
                        <div class="absolute top-4 left-0 h-0.5 bg-primary z-0 transition-all duration-300"
                          :style="{ width: getProgressWidth(orderDetails[data.id].statusName || orderDetails[data.id].status_name || orderDetails[data.id].status) }">
                        </div>

                        <!-- Progress Steps -->
                        <div v-for="step in orderSteps" :key="step.value"
                          class="flex flex-col items-center relative z-10">
                          <div :class="[
                            'w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300',
                            isStepActive(step.value, orderDetails[data.id].statusName || orderDetails[data.id].status_name || orderDetails[data.id].status)
                              ? 'bg-primary text-white'
                              : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-300'
                          ]">
                            <i :class="step.icon" class="text-sm"></i>
                          </div>
                          <span :class="[
                            'text-xs text-center font-medium',
                            isStepActive(step.value, orderDetails[data.id].statusName || orderDetails[data.id].status_name || orderDetails[data.id].status)
                              ? 'text-primary'
                              : 'text-surface-600 dark:text-surface-400'
                          ]">
                            {{ $t(`orders.steps.${step.value}`) }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Order Products -->
                    <div class="mb-6">
                      <h5 class="font-semibold mb-4 text-surface-900 dark:text-surface-0">{{ $t('orders.orderItems') }}
                      </h5>
                      <div class="space-y-3 overflow-hidden">
                        <div
                          v-for="item in (orderDetails[data.id].products || orderDetails[data.id].orderItems || orderDetails[data.id].order_items || [])"
                          :key="item.id"
                          class="flex items-center gap-4 p-4 bg-surface-0 dark:bg-surface-900 rounded-lg border border-surface-200 dark:border-surface-700 min-w-0">
                          <!-- Product Thumbnail -->
                          <div
                            class="w-16 h-16 rounded-lg overflow-hidden bg-surface-100 dark:bg-surface-800 flex-shrink-0">
                            <img v-if="item.thumbnail || (item.product && item.product.image)"
                              :src="item.thumbnail || item.product.image"
                              :alt="item.name || (item.product && item.product.name)"
                              class="w-full h-full object-cover" />
                            <div v-else class="w-full h-full flex items-center justify-center">
                              <i class="pi pi-image text-surface-400 text-xl"></i>
                            </div>
                          </div>

                          <!-- Product Details -->
                          <div class="flex-1 min-w-0 overflow-hidden">
                            <h6 class="font-semibold text-surface-900 dark:text-surface-0 mb-1 break-words"
                              style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;">
                              {{ item.name || (item.product && item.product.name) }}
                            </h6>
                            <p class="text-sm text-surface-600 dark:text-surface-400 mb-1 truncate">
                              {{ $t('orders.articleNumber') }}: {{ item.articleNr || item.article_nr }}
                            </p>
                            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                              <span class="text-surface-600 dark:text-surface-400 truncate">
                                {{ $t('orders.quantity') }}: {{ item.quantity }}
                              </span>
                              <span class="text-surface-600 dark:text-surface-400 truncate">
                                {{ $t('orders.unitPrice') }}: €{{ formatPrice(item.price) }}
                              </span>
                            </div>
                          </div>

                          <!-- Product Total -->
                          <div class="text-right flex-shrink-0">
                            <div class="font-semibold text-surface-900 dark:text-surface-0">
                              €{{ formatPrice(item.totalPrice || item.total_price) }}
                            </div>
                            <div v-if="(item.discountPercentage || item.discount_percentage || 0) > 0"
                              class="text-sm text-green-600 dark:text-green-400">
                              -{{ item.discountPercentage || item.discount_percentage }}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Order Summary -->
                    <div
                      :class="hasOrderDetails(orderDetails[data.id]) ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'grid grid-cols-1 gap-6'">
                      <div v-if="hasOrderDetails(orderDetails[data.id])">
                        <h5 class="font-semibold mb-3 text-surface-900 dark:text-surface-0">{{ $t('orders.orderDetails')
                        }}</h5>
                        <div class="space-y-2">
                          <div class="flex justify-between">
                            <span class="text-surface-600 dark:text-surface-400">{{ $t('orders.reference') }}:</span>
                            <span class="text-surface-900 dark:text-surface-0">{{ orderDetails[data.id].reference || '-'
                            }}</span>
                          </div>
                          <div v-if="orderDetails[data.id].remarks" class="flex justify-between">
                            <span class="text-surface-600 dark:text-surface-400">{{ $t('orders.remarks') }}:</span>
                            <span class="text-surface-900 dark:text-surface-0">{{ orderDetails[data.id].remarks
                            }}</span>
                          </div>
                          <div v-if="orderDetails[data.id].deliveryBefore || orderDetails[data.id].delivery_before"
                            class="flex justify-between">
                            <span class="text-surface-600 dark:text-surface-400">{{ $t('orders.deliveryBefore')
                            }}:</span>
                            <span class="text-surface-900 dark:text-surface-0">{{
                              formatDate(orderDetails[data.id].deliveryBefore || orderDetails[data.id].delivery_before)
                            }}</span>
                          </div>
                          <div v-if="orderDetails[data.id].deliveryDate || orderDetails[data.id].delivery_date"
                            class="flex justify-between">
                            <span class="text-surface-600 dark:text-surface-400">{{ $t('orders.deliveryDate') }}:</span>
                            <span class="text-surface-900 dark:text-surface-0">{{
                              formatDate(orderDetails[data.id].deliveryDate || orderDetails[data.id].delivery_date)
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 class="font-semibold mb-3 text-surface-900 dark:text-surface-0">{{ $t('orders.orderSummary')
                        }}</h5>
                        <div class="space-y-2">
                          <div class="flex justify-between">
                            <span class="text-surface-600 dark:text-surface-400">{{ $t('orders.subtotal') }}:</span>
                            <span class="text-surface-900 dark:text-surface-0">€{{
                              formatPrice((orderDetails[data.id].totalAmount || orderDetails[data.id].total_amount || 0)
                                + (orderDetails[data.id].totalDiscount || orderDetails[data.id].total_discount || 0))
                            }}</span>
                          </div>
                          <div
                            v-if="(orderDetails[data.id].totalDiscount || orderDetails[data.id].total_discount || 0) > 0"
                            class="flex justify-between">
                            <span class="text-surface-600 dark:text-surface-400">{{ $t('orders.discount') }}:</span>
                            <span class="text-green-600 dark:text-green-400">-€{{
                              formatPrice(orderDetails[data.id].totalDiscount || orderDetails[data.id].total_discount)
                            }}</span>
                          </div>
                          <Divider />
                          <div class="flex justify-between font-semibold text-lg">
                            <span class="text-surface-900 dark:text-surface-0">{{ $t('orders.total') }}:</span>
                            <span class="text-surface-900 dark:text-surface-0">€{{
                              formatPrice(orderDetails[data.id].totalAmount || orderDetails[data.id].total_amount)
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Error State -->
                  <div v-else class="text-center py-8">
                    <p class="text-red-600 dark:text-red-400">{{ $t('orders.errorLoadingDetails') }}</p>
                    <Button @click="loadOrderDetails(data.id)" icon="pi pi-refresh" :label="$t('orders.retry')"
                      severity="secondary" size="small" class="mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Column>


        <template #empty>
          <div class="text-center py-12">
            <i class="pi pi-inbox text-6xl text-surface-300 dark:text-surface-600 mb-4"></i>
            <p class="text-surface-500 dark:text-surface-400 text-lg">{{ $t('orders.noMatchingOrders') }}</p>
          </div>
        </template>
      </DataTable>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useOrderStore } from '@/stores/orders'
import RightLayout from '@/layouts/RightLayout.vue'
import LoaderForm from '@/components/icons/LoaderForm.vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Divider from 'primevue/divider'
import type { Order } from '@/types/Order'
const orderStore = useOrderStore()

const expandedRows = ref({})
const orderDetails = ref<Record<string, any>>({})
const loadingDetails = ref<Record<string, boolean>>({})

const orderSteps = [
  { value: 'pending', icon: 'pi pi-clock' },
  { value: 'processing', icon: 'pi pi-cog' },
  { value: 'shipped', icon: 'pi pi-truck' },
  { value: 'delivered', icon: 'pi pi-check' }
]



const getStatusIcon = (status: string): string => {
  const step = orderSteps.find(step => step.value === status.toLowerCase())
  return step ? step.icon : 'pi pi-info-circle'
}

const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return '0.00'
  }
  return price.toFixed(2)
}

const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) {
    return '-'
  }
  return new Date(dateString).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getProgressWidth = (status: string | number | undefined | null): string => {
  if (!status) return '0%'

  // Convert status to string if it's a number
  let statusString = typeof status === 'number' ? status.toString() : status.toLowerCase()

  // Map numeric status to string status
  const statusMap: Record<string, string> = {
    '1': 'pending',
    '2': 'processing',
    '3': 'shipped',
    '4': 'delivered'
  }

  if (statusMap[statusString]) {
    statusString = statusMap[statusString]
  }

  const stepIndex = orderSteps.findIndex(step => step.value === statusString)
  if (stepIndex === -1) return '0%'
  return `${((stepIndex + 1) / orderSteps.length) * 100}%`
}

const isStepActive = (stepValue: string, currentStatus: string | number | undefined | null): boolean => {
  if (!currentStatus) return false

  // Convert status to string if it's a number
  let statusString = typeof currentStatus === 'number' ? currentStatus.toString() : currentStatus.toLowerCase()

  // Map numeric status to string status
  const statusMap: Record<string, string> = {
    '1': 'pending',
    '2': 'processing',
    '3': 'shipped',
    '4': 'delivered'
  }

  if (statusMap[statusString]) {
    statusString = statusMap[statusString]
  }

  const stepIndex = orderSteps.findIndex(step => step.value === stepValue)
  const currentIndex = orderSteps.findIndex(step => step.value === statusString)
  return stepIndex <= currentIndex
}

const loadOrderDetails = async (orderId: string | number) => {
  try {
    loadingDetails.value[orderId] = true
    const orderDetail = await orderStore.fetchOrderById(Number(orderId))
    orderDetails.value[orderId] = orderDetail
  } catch (error) {
    console.error('Error loading order details:', error)
    // Error state will be shown in template
  } finally {
    loadingDetails.value[orderId] = false
  }
}

const onRowExpand = (event: any) => {
  const orderId = event.data.id
  if (!orderDetails.value[orderId] && !loadingDetails.value[orderId]) {
    loadOrderDetails(orderId)
  }
}

const hasOrderDetails = (order: any): boolean => {
  if (!order) return false

  // Check if any meaningful details exist
  const hasReference = order.reference && order.reference.trim() !== ''
  const hasRemarks = order.remarks && order.remarks.trim() !== ''
  const hasDeliveryBefore = order.deliveryBefore || order.delivery_before
  const hasDeliveryDate = order.deliveryDate || order.delivery_date

  return hasReference || hasRemarks || hasDeliveryBefore || hasDeliveryDate
}

const expandFirstRow = () => {
  if (orderStore.orders.length > 0) {
    const firstOrder = orderStore.orders[0]
    expandedRows.value = { [firstOrder.id]: true }

    // Load details for the first order if not already loaded
    if (!orderDetails.value[firstOrder.id] && !loadingDetails.value[firstOrder.id]) {
      loadOrderDetails(firstOrder.id)
    }
  }
}


const downloadInvoice = (order: Order) => {
  // TODO: Implement invoice download
  console.log('Download invoice for order:', order)
}

const toggleRowExpansion = (order: any) => {
  const isExpanded = expandedRows.value[order.id]
  if (isExpanded) {
    delete expandedRows.value[order.id]
  } else {
    expandedRows.value[order.id] = true
    // Load details if not already loaded
    if (!orderDetails.value[order.id] && !loadingDetails.value[order.id]) {
      loadOrderDetails(order.id)
    }
  }
}

onMounted(async () => {
  await orderStore.fetchUserOrders()
  expandFirstRow()
})

// Watch for changes in orders to expand first row when data loads
watch(() => orderStore.orders, (newOrders) => {
  if (newOrders.length > 0 && Object.keys(expandedRows.value).length === 0) {
    expandFirstRow()
  }
}, { immediate: true })
</script>

<style scoped>
.orders-datatable :deep(.p-datatable-thead) {
  display: none;
}

.orders-datatable :deep(.p-datatable-tbody tr td) {
  border: none;
  padding: 0.5rem;
  background: transparent;
}

.orders-datatable :deep(.p-datatable-tbody tr:hover) {
  background: transparent;
}

.orders-datatable :deep(.p-datatable-tbody tr) {
  background: transparent;
}

/* Remove DataTable row expansion functionality since we're handling it manually */
.orders-datatable :deep(.p-datatable-row-expansion) {
  display: none;
}

.order-card {
  margin-bottom: 0.5rem;
}

.order-detail-item {
  min-width: 0;
}

.orders-datatable :deep(.p-paginator) {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-200);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.dark .orders-datatable :deep(.p-paginator) {
  background: var(--p-surface-950);
  border-color: var(--p-surface-800);
}

/* Smooth transitions for expansion */
.order-card {
  transition: all 0.3s ease;
}

/* Ensure seamless expansion appearance */
.order-card .border-t {
  border-color: inherit;
}


/* Single line order details optimization */
@media (max-width: 640px) {
  .order-details-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .order-details-row>div {
    width: 100%;
    justify-content: space-between;
  }
}
</style>