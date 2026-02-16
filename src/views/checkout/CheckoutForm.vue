<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-2">{{ $t('checkout.title') }}</h1>
      <p class="text-lg text-surface-600 dark:text-surface-400">{{ $t('checkout.subtitle') }}</p>
    </div>

    <div v-if="orderStore.loading" class="flex justify-center py-12">
      <LoaderForm :columns="1" :rows="5" />
    </div>

    <div v-else-if="orderStore.error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600 dark:text-red-400 mr-3"></i>
        <p class="text-red-800 dark:text-red-200">{{ orderStore.error }}</p>
      </div>
    </div>

    <vee-form class="space-y-6" :validation-schema="validationSchema" @submit="handleSubmit">
      <!-- Order Details -->
      <div class="flex flex-col gap-6">
        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">{{ $t('checkout.orderDetails') }}
        </h3>

        <div class="grid grid-cols-12 gap-7">
          <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
            <label for="reference" class="font-medium text-surface-900 dark:text-surface-0">
              {{ $t('checkout.reference') }}
            </label>
            <vee-field as="InputText" name="reference" id="reference" class="w-full" v-model="formData.reference"
              placeholder="Your reference number" />
            <ErrorMessage class="error text-red-500 text-sm" name="reference" />
          </div>

          <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
            <label for="deliveryDate" class="font-medium text-surface-900 dark:text-surface-0">
              {{ $t('checkout.deliveryDate') }}
            </label>
            <vee-field as="InputText" name="deliveryDate" id="deliveryDate" type="date" class="w-full"
              v-model="formData.deliveryDate" />
            <ErrorMessage class="error text-red-500 text-sm" name="deliveryDate" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="comments" class="font-medium text-surface-900 dark:text-surface-0">
            {{ $t('checkout.comments') }}
          </label>
          <vee-field as="Textarea" name="comments" id="comments" rows="3" class="w-full" v-model="formData.comments"
            placeholder="Any special instructions or comments" />
          <ErrorMessage class="error text-red-500 text-sm" name="comments" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2">
            <Checkbox v-model="pickupField" :binary="true" />
            <span class="font-medium text-surface-900 dark:text-surface-0">{{ $t('checkout.pickupInStore') }}</span>
          </label>
        </div>
      </div>

      <!-- Delivery/Pickup Address Card -->
      <div
        class="bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
            :class="pickupField ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'">
            <i
              :class="pickupField ? 'pi pi-map-marker text-green-600 dark:text-green-400' : 'pi pi-truck text-orange-600 dark:text-orange-400'"></i>
          </div>
          <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            {{ pickupField ? $t('checkout.pickupAddress') : $t('checkout.shippingAddress') }}
          </h3>
        </div>

        <!-- Pickup Address Display -->
        <div v-if="formData.pickup" class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-map-marker text-primary-600 dark:text-primary-400 mt-1"></i>
            <div class="text-sm flex-1">
              <p class="font-medium text-surface-700 dark:text-surface-300 mb-2">{{ $t('checkout.pickupAtStore') }}:
              </p>
              <p class="font-semibold text-surface-900 dark:text-surface-0 mb-1">{{
                $t('config.pickup_address.companyName') }}</p>
              <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.street }} {{ pickupAddress.number
              }}</p>
              <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.zipcode }} {{ pickupAddress.city }}
              </p>
              <p class="text-surface-600 dark:text-surface-400">{{ pickupAddress.country }}</p>
              <div class="pt-2 mt-2 border-t border-surface-200 dark:border-surface-700">
                <p class="text-surface-500 dark:text-surface-500">{{ pickupAddress.email }}</p>
                <p class="text-surface-500 dark:text-surface-500">Tel: {{ pickupAddress.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Address Selection -->
        <div v-else>
          <div v-if="addressStore.loading" class="flex justify-center py-4">
            <LoaderForm :columns="2" :rows="4" />
          </div>

          <div v-else-if="myAddresses.length === 0"
            class="bg-white dark:bg-surface-950 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-8 text-center">
            <div class="mb-4">
              <i class="pi pi-map-marker text-4xl text-surface-400 dark:text-surface-500"></i>
            </div>
            <h4 class="text-lg font-medium text-surface-900 dark:text-surface-0 mb-2">No shipping address found</h4>
            <p class="text-surface-600 dark:text-surface-400 mb-6">Add your first shipping address to continue with
              checkout</p>
            <router-link :to="{ name: 'addresses-create' }">
              <Button>
                <i class="pi pi-plus mr-2"></i>
                Add Address
              </Button>
            </router-link>
          </div>

          <div v-else class="flex flex-col gap-4">
            <vee-field v-model="formData.shippingId" name="shippingId" as="input" type="hidden" />

            <!-- Shipping Address Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              <ShippingAddressCard v-for="address in myAddresses" :key="address.id" :address="address"
                :is-selected="formData.shippingId === address.id" @select="selectShippingAddress" />

              <!-- Add New Address Card -->
              <AddNewAddressCard />
            </div>

            <ErrorMessage class="error text-red-500 text-sm" name="shippingId" />
          </div>
        </div>
      </div>

      <!-- Billing Address -->
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">{{ $t('checkout.billingAddress') }}
          </h3>
        </div>

        <div v-if="addressStore.loading" class="flex justify-center py-4">
          <LoaderForm :columns="2" :rows="4" />
        </div>

        <div v-else-if="myAddresses.length === 0"
          class="bg-white dark:bg-surface-950 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-8 text-center">
          <div class="mb-4">
            <i class="pi pi-credit-card text-4xl text-surface-400 dark:text-surface-500"></i>
          </div>
          <h4 class="text-lg font-medium text-surface-900 dark:text-surface-0 mb-2">No billing address found</h4>
          <p class="text-surface-600 dark:text-surface-400 mb-6">Add your billing address to complete your order</p>
          <router-link :to="{ name: 'addresses-create' }">
            <Button>
              <i class="pi pi-plus mr-2"></i>
              Add Address
            </Button>
          </router-link>
        </div>

        <div v-else class="flex flex-col gap-4">
          <vee-field v-model="formData.billingId" name="billingId" as="input" type="hidden" />

          <!-- Selected Billing Address Display -->
          <div v-if="selectedBillingAddress || defaultBillingAddress">
            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h5 class="font-semibold text-sm text-surface-900 dark:text-surface-0 mb-1">
                    {{ (selectedBillingAddress || defaultBillingAddress)?.companyName }}
                  </h5>
                  <p class="text-xs text-surface-700 dark:text-surface-300">
                    {{ getBillingFullName(selectedBillingAddress || defaultBillingAddress) }}
                  </p>
                  <p class="text-xs text-surface-600 dark:text-surface-400">
                    {{ getBillingFullAddress(selectedBillingAddress || defaultBillingAddress) }}
                  </p>
                  <p class="text-xs text-surface-600 dark:text-surface-400">
                    {{ (selectedBillingAddress || defaultBillingAddress)?.zipcode }} {{ (selectedBillingAddress ||
                      defaultBillingAddress)?.city }}, {{ (selectedBillingAddress || defaultBillingAddress)?.country
                    }}
                  </p>
                </div>
                <div v-if="(selectedBillingAddress || defaultBillingAddress)?.defaultBilling" class="ml-2">
                  <span
                    class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded">
                    {{ $t('shipping.addresses.badges.defaultBilling') }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Select Different Address Link -->
            <div class="mt-2">
              <button type="button" @click="showBillingDialog = true"
                class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                {{ $t('checkout.selectDifferentBillingAddress') }}
              </button>
            </div>
          </div>

          <ErrorMessage class="error text-red-500 text-sm" name="billingId" />
        </div>
      </div>

      <!-- Order Items & Total Card -->
      <CheckoutCart :items="cartItems" :loading="cartStore.loading" :is-order-items="false"
        :total-amount="cartSummary.totalAmount" :total-discount="cartSummary.totalDiscount" />

      <!-- Actions Card -->
      <CheckoutActionCard mode="checkout" :primary-loading="loading" :primary-disabled="isReviewDisabled"
        primary-button-type="submit" :is-cart-empty="cartItems.length === 0" @cancel="handleCancel" @submit="() => { }"
        @continue-shopping="handleContinueShopping" />
    </vee-form>

    <!-- Billing Address Selection Dialog -->
    <Dialog v-model:visible="showBillingDialog" :header="$t('checkout.selectBillingAddress')" :modal="true"
      class="w-full max-w-4xl" :dismissableMask="true">
      <div v-if="addressStore.loading" class="flex justify-center py-8">
        <LoaderForm :columns="2" :rows="3" />
      </div>

      <div v-else class="flex flex-col gap-4">
        <p class="text-surface-700 dark:text-surface-300 text-sm mb-4">
          {{ $t('checkout.selectBillingAddressNote') }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ShippingAddressCard v-for="address in myAddresses" :key="address.id" :address="address"
            :is-selected="formData.billingId === address.id" @select="selectBillingAddress" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { useOrderStore } from '@/stores/orders'
import { useAddressStore } from '@/stores/addresses'
import { useCartStore } from '@/stores/cart'
import { storeConfig } from '@/config/store'
import LoaderForm from '@/components/icons/LoaderForm.vue'
import Button from '@/volt/Button.vue'
import Checkbox from '@/volt/Checkbox.vue'
import ShippingAddressCard from '@/components/shipping/ShippingAddressCard.vue'
import AddNewAddressCard from '@/components/shipping/AddNewAddressCard.vue'
import CheckoutCart from './CheckoutCart.vue'
import CheckoutActionCard from './CheckoutActionCard.vue'
import Dialog from 'primevue/dialog'
import type { PlaceOrderPayload } from '@/types/Order'

interface Props {
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  cancel: []
  submit: [orderData: PlaceOrderPayload]
}>()

const router = useRouter()
const orderStore = useOrderStore()
const addressStore = useAddressStore()
const cartStore = useCartStore()

// Get reactive store data
const { myAddresses } = storeToRefs(addressStore)
const { cartItems, cartSummary } = storeToRefs(cartStore)

// Get pickup address from config
const pickupAddress = computed(() => storeConfig.pickup.defaultAddress)

// Use useField for pickup checkbox to ensure proper reactivity
const { value: pickupField } = useField<boolean>('pickup', undefined, {
  initialValue: false
})

// Validation schema - conditional based on pickup
const validationSchema = computed(() => {
  const schema: any = {
    reference: 'max:100',
    deliveryDate: '',
    comments: 'max:500',
    pickup: '',
    billingId: 'required',
    remarks: 'max:500'
  }

  if (!pickupField.value) {
    schema.shippingId = 'required'
  }

  return schema
})

const formData = reactive({
  reference: '',
  comments: '',
  pickup: false,
  deliveryDate: '',
  shippingId: null as number | null,
  billingId: null as number | null,
  remarks: ''
})

// Initialize form with vee-validate
const { resetField, setFieldValue } = useForm({
  validationSchema,
  initialValues: formData
})

// Dialog state for billing address selection
const showBillingDialog = ref(false)

// Handle shipping address selection
const selectShippingAddress = (addressId: number) => {
  formData.shippingId = addressId
  setFieldValue('shippingId', addressId)
}

// Handle billing address selection
const selectBillingAddress = (addressId: number) => {
  formData.billingId = addressId
  setFieldValue('billingId', addressId)
  showBillingDialog.value = false
}

// Get selected billing address
const selectedBillingAddress = computed(() => {
  return myAddresses.value.find(addr => addr.id === formData.billingId)
})

// Get default billing address or first address as fallback
const defaultBillingAddress = computed(() => {
  const defaultAddr = myAddresses.value.find(addr => addr.defaultBilling)
  return defaultAddr || myAddresses.value[0] || null
})

// Get default shipping address or first address as fallback
const defaultShippingAddress = computed(() => {
  const defaultAddr = myAddresses.value.find(addr => addr.defaultShipping)
  return defaultAddr || myAddresses.value[0] || null
})

// Helper functions for billing address display
const getBillingFullName = (address: any) => {
  if (!address) return '-'
  const parts: string[] = []
  if (address.firstname) {
    parts.push(address.firstname)
  }
  if (address.lastname) {
    parts.push(address.lastname)
  }
  return parts.join(' ') || '-'
}

const getBillingFullAddress = (address: any) => {
  if (!address) return ''
  let addr = `${address.street || ''} ${address.number || ''}`
  if (address.numberExt) {
    addr += ` ${address.numberExt}`
  }
  return addr
}


// Initialize data and setup watchers
onMounted(async () => {
  // Load addresses first
  await addressStore.fetchMyAddresses()

  if (defaultShippingAddress.value) {
    formData.shippingId = defaultShippingAddress.value.id
    setFieldValue('shippingId', defaultShippingAddress.value.id)
  }

  if (defaultBillingAddress.value) {
    formData.billingId = defaultBillingAddress.value.id
    setFieldValue('billingId', defaultBillingAddress.value.id)
  }

  // Load cart if not already loaded
  await cartStore.fetchCart()

  // Setup watchers after initial setup is complete
  // Sync pickupField with formData.pickup for reactivity
  watch(pickupField, (newValue) => {
    formData.pickup = newValue

    if (newValue) {
      formData.shippingId = null
      setFieldValue('shippingId', null)
      resetField('shippingId')
    }
  }, { immediate: true })
})

const handleSubmit = async (validatedData: any) => {
  if (!pickupField.value && !formData.shippingId) {
    return
  }

  if (!formData.billingId) {
    return
  }

  const orderData = {
    shippingId: pickupField.value ? undefined : formData.shippingId,
    billingId: formData.billingId,
    pickup: pickupField.value || false,
    reference: validatedData.reference || '',
    remarks: formData.remarks || '',
    comments: validatedData.comments || '',
    deliveryDate: validatedData.deliveryDate || ''
  }

  emit('submit', orderData)
}

// Check if Review Order should be disabled
const isReviewDisabled = computed(() => {
  return cartItems.value.length === 0 || (!pickupField.value && !formData.shippingId)
})

const handleCancel = () => {
  emit('cancel')
}

const handleContinueShopping = () => {
  router.push({ name: 'Search' })
}
</script>