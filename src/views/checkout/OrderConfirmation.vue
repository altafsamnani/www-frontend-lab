<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="mb-2 flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
        >
          <i class="pi pi-check text-xl text-green-600 dark:text-green-400"></i>
        </div>
        <h1
          class="text-surface-900 dark:text-surface-0 text-2xl leading-7 font-bold sm:text-3xl sm:tracking-tight"
        >
          {{ $t('checkout.confirmationTitle') }}
        </h1>
      </div>
      <p class="text-surface-600 dark:text-surface-400 text-lg">
        {{ $t('checkout.confirmationSubtitle') }}
        <span class="text-surface-900 dark:text-surface-0 font-semibold"
          >#{{ confirmedOrder.id }}</span
        >
      </p>
    </div>

    <div class="space-y-6">
      <!-- Order Details Card - Only show if there are order details -->
      <div
        v-if="confirmedOrder.reference || confirmedOrder.deliveryDate || confirmedOrder.comments"
        class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div class="mb-6 flex items-center">
          <div
            class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30"
          >
            <i class="pi pi-info-circle text-purple-600 dark:text-purple-400"></i>
          </div>
          <h3 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('checkout.orderDetails') }}
          </h3>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div v-if="confirmedOrder.createdAt" class="space-y-2">
            <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
              $t('checkout.confirmation.date')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">
                {{ formatDate(confirmedOrder.createdAt) }}
              </p>
            </div>
          </div>

          <div v-if="confirmedOrder.reference" class="space-y-2">
            <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
              $t('checkout.reference')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">{{ confirmedOrder.reference }}</p>
            </div>
          </div>

          <div v-if="confirmedOrder.deliveryDate" class="space-y-2">
            <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
              $t('checkout.deliveryDate')
            }}</label>
            <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
              <p class="text-surface-900 dark:text-surface-0">
                {{ formatDate(confirmedOrder.deliveryDate) }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="confirmedOrder.comments" class="mt-6 space-y-2">
          <label class="text-surface-700 dark:text-surface-300 text-sm font-medium">{{
            $t('checkout.comments')
          }}</label>
          <div class="bg-surface-50 dark:bg-surface-800 rounded-lg p-3">
            <p class="text-surface-900 dark:text-surface-0 whitespace-pre-wrap">
              {{ confirmedOrder.comments }}
            </p>
          </div>
        </div>
      </div>

      <!-- Address Cards Row -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Billing Address Card -->
        <div
          v-if="confirmedOrder.billingAddress"
          class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div class="mb-4 flex items-center">
            <div
              class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30"
            >
              <i class="pi pi-credit-card text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
              {{ $t('checkout.billingAddress') }}
            </h3>
          </div>

          <div class="space-y-2">
            <p
              v-if="confirmedOrder.billingAddress.companyName"
              class="text-surface-900 dark:text-surface-0 font-semibold"
            >
              {{ confirmedOrder.billingAddress.companyName }}
            </p>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ getFullName(confirmedOrder.billingAddress) }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ getFullAddress(confirmedOrder.billingAddress) }}
            </p>
            <div
              v-if="confirmedOrder.billingAddress.email || confirmedOrder.billingAddress.phone"
              class="border-surface-200 dark:border-surface-700 mt-3 border-t pt-3"
            >
              <p
                v-if="confirmedOrder.billingAddress.email"
                class="text-surface-500 dark:text-surface-500 flex items-center text-sm"
              >
                <i class="pi pi-envelope mr-2 text-xs"></i>{{ confirmedOrder.billingAddress.email }}
              </p>
              <p
                v-if="confirmedOrder.billingAddress.phone"
                class="text-surface-500 dark:text-surface-500 flex items-center text-sm"
              >
                <i class="pi pi-phone mr-2 text-xs"></i>{{ confirmedOrder.billingAddress.phone }}
              </p>
            </div>
          </div>
        </div>

        <!-- Delivery/Pickup Address Card -->
        <div
          v-if="confirmedOrder.pickup || confirmedOrder.shippingAddress"
          class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div class="mb-4 flex items-center">
            <div
              class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg"
              :class="
                confirmedOrder.pickup
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-orange-100 dark:bg-orange-900/30'
              "
            >
              <i
                :class="
                  confirmedOrder.pickup
                    ? 'pi pi-map-marker text-green-600 dark:text-green-400'
                    : 'pi pi-truck text-orange-600 dark:text-orange-400'
                "
              ></i>
            </div>
            <h3 class="text-surface-900 dark:text-surface-0 text-lg font-semibold">
              {{
                confirmedOrder.pickup
                  ? $t('checkout.pickupAddress')
                  : $t('checkout.deliveryAddress')
              }}
            </h3>
          </div>

          <!-- Pickup Address -->
          <div v-if="confirmedOrder.pickup" class="space-y-2">
            <div class="mb-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">
                {{ $t('checkout.pickupAtStore') }}
              </p>
            </div>
            <p class="text-surface-900 dark:text-surface-0 font-semibold">
              {{ $t('config.pickup_address.companyName') }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ $t('config.pickup_address.street') }} {{ $t('config.pickup_address.number') }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ $t('config.pickup_address.zipcode') }} {{ $t('config.pickup_address.city') }}
            </p>
            <div class="border-surface-200 dark:border-surface-700 mt-3 border-t pt-3">
              <p class="text-surface-500 dark:text-surface-500 flex items-center text-sm">
                <i class="pi pi-phone mr-2 text-xs"></i>{{ $t('config.pickup_address.phone') }}
              </p>
            </div>
          </div>

          <!-- Shipping Address -->
          <div v-else-if="confirmedOrder.shippingAddress" class="space-y-2">
            <div class="mb-3 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
              <p class="text-sm font-medium text-orange-800 dark:text-orange-200">
                {{ $t('checkout.weWillDeliverHere') }}
              </p>
            </div>
            <p
              v-if="confirmedOrder.shippingAddress.companyName"
              class="text-surface-900 dark:text-surface-0 font-semibold"
            >
              {{ confirmedOrder.shippingAddress.companyName }}
            </p>
            <p class="text-surface-900 dark:text-surface-0 font-medium">
              {{ getFullName(confirmedOrder.shippingAddress) }}
            </p>
            <p class="text-surface-600 dark:text-surface-400">
              {{ getFullAddress(confirmedOrder.shippingAddress) }}
            </p>
            <div
              v-if="confirmedOrder.shippingAddress.email || confirmedOrder.shippingAddress.phone"
              class="border-surface-200 dark:border-surface-700 mt-3 border-t pt-3"
            >
              <p
                v-if="confirmedOrder.shippingAddress.email"
                class="text-surface-500 dark:text-surface-500 flex items-center text-sm"
              >
                <i class="pi pi-envelope mr-2 text-xs"></i
                >{{ confirmedOrder.shippingAddress.email }}
              </p>
              <p
                v-if="confirmedOrder.shippingAddress.phone"
                class="text-surface-500 dark:text-surface-500 flex items-center text-sm"
              >
                <i class="pi pi-phone mr-2 text-xs"></i>{{ confirmedOrder.shippingAddress.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items Card -->
      <div
        class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('checkout.confirmation.orderItems') }}
          </h3>
          <div class="flex items-center space-x-2">
            <span
              class="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1 text-sm font-medium"
            >
              {{ confirmedOrder.products?.length || 0 }} {{ $t('cart.orderSummary.items') }}
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="item in confirmedOrder.products"
            :key="item.id"
            class="bg-surface-50 dark:bg-surface-800 rounded-lg p-4 transition-shadow hover:shadow-sm"
          >
            <div class="flex items-start gap-4">
              <div
                class="dark:bg-surface-700 h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <img
                  v-if="item.thumbnail"
                  :src="item.thumbnail"
                  :alt="item.name"
                  class="h-full w-full object-contain p-2"
                />
                <div
                  v-else
                  class="text-surface-400 dark:text-surface-500 flex h-full w-full items-center justify-center"
                >
                  <i class="pi pi-image text-xl"></i>
                </div>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="text-surface-900 dark:text-surface-0 mb-1 font-semibold">
                      {{ item.name }}
                    </h4>
                    <div class="mb-2 flex items-center space-x-4">
                      <span class="text-surface-600 dark:text-surface-400 text-sm">
                        <i class="pi pi-hashtag mr-1 text-xs"></i>{{ item.articleNr }}
                      </span>
                    </div>

                    <div class="flex items-center space-x-4">
                      <div
                        class="dark:bg-surface-700 border-surface-200 dark:border-surface-600 flex items-center rounded-lg border bg-white px-3 py-1"
                      >
                        <span class="text-surface-700 dark:text-surface-300 text-sm font-medium">
                          {{ $t('products.quantity') }}:
                        </span>
                        <span class="text-surface-900 dark:text-surface-0 ml-2 font-semibold">{{
                          item.quantity
                        }}</span>
                      </div>

                      <div
                        v-if="item.discountActionName"
                        class="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      >
                        <i class="pi pi-percentage mr-1"></i>{{ item.discountActionName }}
                      </div>
                    </div>
                  </div>

                  <div class="ml-4 text-right">
                    <div class="space-y-1">
                      <p class="text-surface-900 dark:text-surface-0 text-lg font-bold">
                        {{
                          formatPrice(
                            item.totalNetPrice || item.totalPrice || item.price * item.quantity
                          )
                        }}
                      </p>
                      <div
                        v-if="item.discountPercentage && item.discountPercentage > 0"
                        class="space-y-1"
                      >
                        <p class="text-surface-500 dark:text-surface-400 text-sm line-through">
                          {{ formatPrice(item.totalPrice || item.price * item.quantity) }}
                        </p>
                        <p class="text-sm font-medium text-green-600 dark:text-green-400">
                          -{{ item.discountPercentage }}% {{ $t('orders.saved') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-surface-200 dark:border-surface-700 mt-6 border-t pt-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-surface-700 dark:text-surface-300 flex items-center">
                  <i class="pi pi-shopping-cart mr-2 text-sm"></i>
                  {{ $t('checkout.orderSummary.items') }} ({{
                    confirmedOrder.products?.length || 0
                  }})
                </span>
                <span class="text-surface-900 dark:text-surface-0 font-medium">
                  {{ formatPrice(orderTotals.grossTotal) }}
                </span>
              </div>

              <div v-if="orderTotals.totalDiscount > 0" class="flex items-center justify-between">
                <span class="text-surface-700 dark:text-surface-300 flex items-center">
                  <i class="pi pi-percentage mr-2 text-sm"></i>
                  {{ $t('checkout.orderSummary.discount') }}
                </span>
                <div class="flex items-center">
                  <span
                    class="mr-2 rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200"
                  >
                    {{ $t('checkout.orderSummary.youSaved') }}
                  </span>
                  <span class="font-medium text-green-600 dark:text-green-400"
                    >-{{ formatPrice(orderTotals.totalDiscount) }}</span
                  >
                </div>
              </div>

              <div class="border-surface-200 dark:border-surface-700 border-t pt-3">
                <div class="flex items-center justify-between">
                  <span class="text-surface-900 dark:text-surface-0 text-xl font-bold">
                    {{ $t('checkout.orderSummary.total') }}
                  </span>
                  <div class="text-right">
                    <span class="text-primary-600 dark:text-primary-400 text-2xl font-bold">
                      {{ formatPrice(orderTotals.netTotal) }}
                    </span>
                    <p class="text-surface-500 dark:text-surface-400 text-sm">
                      {{ $t('checkout.orderSummary.includingTaxes') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Card -->
      <div
        class="dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Button
            :label="$t('checkout.confirmation.continueShopping')"
            @click="$emit('continue-shopping')"
            severity="secondary"
            outlined
            class="w-full sm:w-auto"
          />
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              :label="$t('checkout.confirmation.downloadInvoice')"
              icon="pi pi-download"
              outlined
              class="w-full sm:w-auto"
            />
            <Button
              :label="$t('checkout.confirmation.viewOrderDetails')"
              @click="$emit('viewOrder')"
              class="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import Button from 'primevue/button'

  interface Props {
    confirmedOrder: any
  }

  const props = defineProps<Props>()

  defineEmits<{
    viewOrder: []
    'continue-shopping': []
  }>()

  // Calculate totals from products or use backend values
  const orderTotals = computed(() => {
    const order = props.confirmedOrder
    const products = order?.products || []

    // If backend provides totalAmount and totalDiscount, use them
    // totalAmount = gross total (before discount)
    // netTotal = totalAmount - totalDiscount
    if (order?.totalAmount !== undefined && order?.totalAmount !== null) {
      const grossTotal = order.totalAmount || 0
      const totalDiscount = order.totalDiscount || 0
      const netTotal = grossTotal - totalDiscount

      return {
        grossTotal,
        netTotal,
        totalDiscount,
      }
    }

    // Fallback: Calculate from products if backend doesn't provide totals
    // Use totalPrice (gross) and totalNetPrice (net) from items
    const grossTotal = products.reduce((sum: number, item: any) => {
      // totalPrice is the gross total for the item (price * quantity)
      return sum + (item.totalPrice || (item.price || 0) * (item.quantity || 1))
    }, 0)

    const netTotal = products.reduce((sum: number, item: any) => {
      // totalNetPrice is the net total for the item (netPrice * quantity)
      return (
        sum + (item.totalNetPrice || item.totalPrice || (item.price || 0) * (item.quantity || 1))
      )
    }, 0)

    const totalDiscount = grossTotal - netTotal

    return {
      grossTotal,
      netTotal,
      totalDiscount,
    }
  })

  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number): string => {
    return '€' + (price || 0).toFixed(2)
  }

  // Helper function to get full name from address object
  const getFullName = (address: any): string => {
    if (!address) return ''
    const parts: string[] = []
    if (address.firstname) parts.push(address.firstname)
    if (address.lastname) parts.push(address.lastname)
    return parts.join(' ') || ''
  }

  // Helper function to get full address from address object
  const getFullAddress = (address: any): string => {
    if (!address) return ''
    let addressStr = address.street || ''
    if (address.number) {
      addressStr += ` ${address.number}`
    }
    if (address.numberExt) {
      addressStr += ` ${address.numberExt}`
    }
    // If no street/number available, use generic address field
    if (!addressStr && address.address) {
      addressStr = address.address
    }
    return `${addressStr}, ${address.zipcode || ''} ${address.city || ''}, ${address.country || ''}`
  }
</script>
