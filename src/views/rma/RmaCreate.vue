<template>
  <RightLayout :title="$t('rma.create.title')" :subtitle="$t('rma.create.subtitle')">
    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="10" />
    </div>

    <div v-else>
      <Stepper v-model:value="activeStep" linear>
        <StepList>
          <Step :value="1">{{ $t('rma.create.step1') }}</Step>
          <Step :value="2">{{ $t('rma.create.step2') }}</Step>
          <Step :value="3">{{ $t('rma.create.step3') }}</Step>
          <Step :value="4">{{ $t('rma.create.step4') }}</Step>
        </StepList>

        <StepPanels>
          <!-- STEP 1: Add Products -->
          <StepPanel :value="1">
            <div class="flex flex-col gap-6">
              <div
                class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-6"
              >
                <h3 class="mb-4 text-lg font-semibold">{{ $t('rma.create.addProducts') }}</h3>
                <RmaItemForm
                  :rma-id="currentRmaId"
                  :added-product-ids="addedProductIds"
                  @item-added="handleItemAdded"
                />
              </div>

              <div v-if="currentRma && currentRma.items && currentRma.items.length > 0">
                <h3 class="mb-4 text-lg font-semibold">
                  {{ $t('rma.create.basket') }} ({{ currentRma.items.length }})
                </h3>
                <DataTable :value="currentRma.items" dataKey="id" size="small">
                  <Column field="articleNo" :header="$t('rma.fields.sku')" />
                  <Column field="productName" :header="$t('rma.fields.productName')" />
                  <Column
                    field="quantity"
                    :header="$t('rma.fields.quantity')"
                    style="width: 80px"
                  />
                  <Column field="serialnumbers" :header="$t('rma.fields.serialnumbers')" />
                  <Column :header="$t('rma.fields.reason')">
                    <template #body="{ data }">
                      {{ getReasonLabel(data.reason) }}
                    </template>
                  </Column>
                  <Column field="remarks" :header="$t('rma.fields.remarks')" />
                  <Column style="width: 60px">
                    <template #body="{ data }">
                      <Button size="small" severity="danger" text @click="removeItem(data.id)">
                        <i class="pi pi-trash"></i>
                      </Button>
                    </template>
                  </Column>
                </DataTable>
              </div>

              <div class="flex justify-between">
                <router-link :to="{ name: 'RmaDashboard' }">
                  <Button severity="secondary" outlined>
                    <i class="pi pi-arrow-left mr-2"></i>
                    {{ $t('rma.create.backToDashboard') }}
                  </Button>
                </router-link>
                <Button :disabled="!currentRma?.items?.length" @click="activeStep = 2">
                  {{ $t('rma.create.goToStep2') }}
                  <i class="pi pi-arrow-right ml-2"></i>
                </Button>
              </div>
            </div>
          </StepPanel>

          <!-- STEP 2: Review -->
          <StepPanel :value="2">
            <div class="flex flex-col gap-6">
              <div
                class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-6"
              >
                <h3 class="mb-4 text-lg font-semibold">{{ $t('rma.create.reviewItems') }}</h3>
                <p class="text-surface-500 dark:text-surface-400 mb-4 text-sm">
                  {{ $t('rma.create.reviewNote') }}
                </p>
                <DataTable :value="currentRma?.items || []" dataKey="id" size="small">
                  <Column field="articleNo" :header="$t('rma.fields.sku')" style="width: 100px" />
                  <Column field="productName" :header="$t('rma.fields.productName')" />
                  <Column
                    field="quantity"
                    :header="$t('rma.fields.quantity')"
                    style="width: 70px"
                  />
                  <Column field="serialnumbers" :header="$t('rma.fields.serialnumbers')" />
                  <Column :header="$t('rma.fields.reason')">
                    <template #body="{ data }">
                      {{ getReasonLabel(data.reason) }}
                    </template>
                  </Column>
                  <Column :header="$t('rma.fields.retourvoorwaarden')">
                    <template #body="{ data }">
                      <span class="text-sm">{{ getReturnCondition(data.reason) }}</span>
                    </template>
                  </Column>
                  <Column :header="$t('rma.fields.garantieIndicatie')">
                    <template #body="{ data }">
                      <div class="text-sm">
                        <div
                          v-if="getWarrantyIndication(data).type === 'na'"
                          class="text-surface-400"
                        >
                          {{ $t('rma.warranty.notApplicable') }}
                        </div>
                        <div
                          v-else-if="getWarrantyIndication(data).type === 'within'"
                          class="text-green-700 dark:text-green-400"
                        >
                          <i class="pi pi-check-circle mr-1"></i>
                          {{ $t('rma.warranty.withinWarranty') }}
                          <div class="text-surface-400 mt-1 text-xs">
                            {{ $t('rma.warranty.withinNote') }}
                          </div>
                        </div>
                        <div
                          v-else-if="getWarrantyIndication(data).type === 'outside'"
                          class="text-orange-700 dark:text-orange-400"
                        >
                          <i class="pi pi-exclamation-triangle mr-1"></i>
                          {{ $t('rma.warranty.outsideWarranty') }}
                          <div class="text-surface-400 mt-1 text-xs">
                            {{ $t('rma.warranty.outsideNote') }}
                          </div>
                        </div>
                        <div
                          v-else-if="getWarrantyIndication(data).type === 'recall'"
                          class="text-blue-700 dark:text-blue-400"
                        >
                          <i class="pi pi-megaphone mr-1"></i>
                          {{ $t('rma.warranty.recall') }}
                        </div>
                        <div v-else class="text-surface-400 italic">
                          {{ $t('rma.warranty.noData') }}
                        </div>
                      </div>
                    </template>
                  </Column>
                  <Column :header="$t('rma.fields.replacementOrdered')">
                    <template #body="{ data }">
                      <Select
                        v-model="itemReplacements[data.id]"
                        :options="replacementOptions"
                        optionLabel="label"
                        optionValue="value"
                        :placeholder="$t('rma.fields.selectReplacement')"
                        class="w-full text-sm"
                        size="small"
                      />
                    </template>
                  </Column>
                  <Column style="width: 60px">
                    <template #body="{ data }">
                      <Button size="small" severity="danger" text @click="removeItem(data.id)">
                        <i class="pi pi-trash"></i>
                      </Button>
                    </template>
                  </Column>
                </DataTable>
              </div>

              <div class="flex justify-between">
                <Button severity="secondary" outlined @click="activeStep = 1">
                  <i class="pi pi-arrow-left mr-2"></i>
                  {{ $t('common.back') }}
                </Button>
                <Button @click="activeStep = 3">
                  {{ $t('rma.create.goToStep3') }}
                  <i class="pi pi-arrow-right ml-2"></i>
                </Button>
              </div>
            </div>
          </StepPanel>

          <!-- STEP 3: Submit + Address -->
          <StepPanel :value="3">
            <div class="flex flex-col gap-6">
              <div
                class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-6"
              >
                <h3 class="mb-4 text-lg font-semibold">{{ $t('rma.create.returnAddress') }}</h3>

                <div v-if="addressStore.loading" class="flex justify-center py-4">
                  <LoaderForm :columns="2" :rows="3" />
                </div>

                <div v-else class="flex flex-col gap-4">
                  <!-- Existing addresses grid -->
                  <div
                    v-if="myAddresses.length > 0 && !showNewAddressForm"
                    class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    <ShippingAddressCard
                      v-for="addr in myAddresses"
                      :key="addr.id"
                      :address="addr"
                      :is-selected="selectedAddressId === addr.id"
                      @select="onSelectAddress"
                    />
                  </div>

                  <div v-if="!showNewAddressForm">
                    <Button
                      type="button"
                      severity="secondary"
                      outlined
                      size="small"
                      @click="showNewAddressForm = true"
                    >
                      <i class="pi pi-plus mr-2"></i>
                      {{ $t('rma.create.enterNewAddress') }}
                    </Button>
                  </div>

                  <!-- Inline new-address form (Option B) -->
                  <vee-form
                    v-if="showNewAddressForm"
                    :validation-schema="newAddressSchema"
                    @submit="handleCreateAddress"
                    class="border-surface-200 dark:border-surface-700 flex flex-col gap-4 rounded-lg border p-4"
                  >
                    <h4 class="font-semibold">{{ $t('rma.create.newAddressHeading') }}</h4>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="flex flex-col gap-2">
                        <label for="companyName">{{ $t('rma.fields.companyName') }} *</label>
                        <vee-field
                          as="InputText"
                          name="companyName"
                          id="companyName"
                          class="w-full"
                        />
                        <ErrorMessage class="error text-sm text-red-500" name="companyName" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="firstname">{{ $t('rma.fields.firstname') }}</label>
                        <vee-field as="InputText" name="firstname" id="firstname" class="w-full" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="lastname">{{ $t('rma.fields.lastname') }}</label>
                        <vee-field as="InputText" name="lastname" id="lastname" class="w-full" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="street">{{ $t('rma.fields.street') }} *</label>
                        <vee-field as="InputText" name="street" id="street" class="w-full" />
                        <ErrorMessage class="error text-sm text-red-500" name="street" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="number">{{ $t('rma.fields.number') }} *</label>
                        <vee-field as="InputText" name="number" id="number" class="w-full" />
                        <ErrorMessage class="error text-sm text-red-500" name="number" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="numberExt">{{ $t('rma.fields.numberExt') }}</label>
                        <vee-field as="InputText" name="numberExt" id="numberExt" class="w-full" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="zipcode">{{ $t('rma.fields.zipcode') }} *</label>
                        <vee-field as="InputText" name="zipcode" id="zipcode" class="w-full" />
                        <ErrorMessage class="error text-sm text-red-500" name="zipcode" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="city">{{ $t('rma.fields.city') }} *</label>
                        <vee-field as="InputText" name="city" id="city" class="w-full" />
                        <ErrorMessage class="error text-sm text-red-500" name="city" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="country">{{ $t('rma.fields.country') }} *</label>
                        <vee-field as="InputText" name="country" id="country" class="w-full" />
                        <ErrorMessage class="error text-sm text-red-500" name="country" />
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="phone">{{ $t('rma.fields.phone') }}</label>
                        <vee-field as="InputText" name="phone" id="phone" class="w-full" />
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <Button
                        type="button"
                        severity="secondary"
                        outlined
                        size="small"
                        @click="showNewAddressForm = false"
                      >
                        {{ $t('common.cancel') }}
                      </Button>
                      <Button type="submit" size="small" :loading="creatingAddress">
                        <i class="pi pi-save mr-2"></i>
                        {{ $t('rma.create.saveAddress') }}
                      </Button>
                    </div>
                  </vee-form>

                  <!-- RMA reference + submit -->
                  <vee-form
                    :validation-schema="referenceSchema"
                    @submit="handleSubmit"
                    class="mt-2 flex flex-col gap-4"
                  >
                    <div class="grid grid-cols-2 gap-4">
                      <div class="flex flex-col gap-2">
                        <label for="reference">{{ $t('rma.fields.reference') }}</label>
                        <vee-field
                          as="InputText"
                          name="reference"
                          id="reference"
                          class="w-full"
                          maxlength="50"
                          :model-value="rmaReference"
                          @update:model-value="(value: any) => (rmaReference = value)"
                        />
                      </div>
                    </div>

                    <div class="bg-surface-100 dark:bg-surface-800 mt-2 rounded-lg p-4">
                      <h4 class="mb-2 font-semibold">{{ $t('rma.create.shippingAddress') }}</h4>
                      <p class="text-surface-600 dark:text-surface-400 text-sm">
                        Osec B.V., t.a.v. afd. Reparatie, Netwerk 120, 1446 WR Purmerend, Nederland
                      </p>
                    </div>

                    <div class="mt-4 flex justify-between">
                      <Button type="button" severity="secondary" outlined @click="activeStep = 2">
                        <i class="pi pi-arrow-left mr-2"></i>
                        {{ $t('common.back') }}
                      </Button>
                      <Button type="submit" :loading="submitting" :disabled="!selectedAddressId">
                        <i class="pi pi-check mr-2"></i>
                        {{ $t('rma.create.submitRma') }}
                      </Button>
                    </div>
                  </vee-form>
                </div>
              </div>
            </div>
          </StepPanel>

          <!-- STEP 4: Confirmation -->
          <StepPanel :value="4">
            <div class="mx-auto max-w-3xl py-6">
              <!-- Success banner -->
              <div
                class="mb-6 flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20"
              >
                <i class="pi pi-check-circle mt-0.5 text-3xl text-green-500"></i>
                <div>
                  <h2 class="mb-1 text-xl font-bold text-green-800 dark:text-green-200">
                    {{ $t('rma.create.whatHappensNext') }}
                  </h2>
                  <p class="font-medium text-green-700 dark:text-green-300">
                    {{ $t('rma.create.thankYou') }}
                  </p>
                </div>
              </div>

              <!-- Info block -->
              <div
                class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 mb-6 rounded-lg border p-5"
              >
                <div
                  class="text-surface-700 dark:text-surface-300 flex flex-col gap-3 text-sm leading-relaxed"
                >
                  <p>{{ $t('rma.create.confirmationLine1') }}</p>
                  <p>{{ $t('rma.create.confirmationLine2') }}</p>
                  <p>{{ $t('rma.create.confirmationLine3') }}</p>
                  <p>
                    {{ $t('rma.create.confirmationContactPrefix') }}
                    <a href="mailto:rma@osec.nl" class="text-primary font-medium underline"
                      >rma@osec.nl</a
                    >
                    {{ $t('rma.create.confirmationContactOr') }}
                    <a href="tel:+31299666662" class="text-primary font-medium underline"
                      >0299 66 66 62</a
                    >
                    {{ $t('rma.create.optie4') }}
                  </p>
                  <p class="font-semibold">{{ $t('rma.create.confirmationThanks') }}</p>
                </div>
              </div>

              <!-- Tips -->
              <div
                class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-900/20"
              >
                <div class="mb-4 flex items-center gap-3">
                  <i class="pi pi-lightbulb text-xl text-amber-500"></i>
                  <span class="text-surface-800 dark:text-surface-200 text-sm font-semibold">
                    {{ $t('rma.create.shippingTips') }}
                  </span>
                </div>
                <div
                  class="text-surface-600 dark:text-surface-400 flex flex-col gap-3 text-sm leading-relaxed italic"
                >
                  <p>-{{ $t('rma.create.tip1') }}</p>
                  <p>-{{ $t('rma.create.tip2') }}</p>
                  <p>-{{ $t('rma.create.tip3') }}</p>
                  <p>-{{ $t('rma.create.tip4') }}</p>
                  <p>-{{ $t('rma.create.tip5') }}</p>
                </div>
                <Divider class="my-3" />
                <div
                  class="text-surface-600 dark:text-surface-400 flex flex-col gap-3 text-sm leading-relaxed italic"
                >
                  <p>-{{ $t('rma.create.tip6') }}</p>
                  <p>-{{ $t('rma.create.tip7', { password: '888888pp' }) }}</p>
                  <p>-{{ $t('rma.create.tip8') }}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col gap-3 sm:flex-row">
                <a :href="rmaPdfUrl" target="_blank" class="flex-1">
                  <Button size="large" class="w-full justify-center">
                    <i class="pi pi-print mr-2"></i>
                    {{ $t('rma.create.printRmaForm') }}
                  </Button>
                </a>
                <router-link :to="{ name: 'RmaDashboard' }" class="flex-1">
                  <Button severity="secondary" outlined size="large" class="w-full justify-center">
                    <i class="pi pi-th-large mr-2"></i>
                    {{ $t('rma.create.backToDashboard') }}
                  </Button>
                </router-link>
              </div>
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRmaStore } from '@/stores/rmas'
  import { useAddressStore } from '@/stores/addresses'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import RmaItemForm from '@/components/rma/RmaItemForm.vue'
  import ShippingAddressCard from '@/components/shipping/ShippingAddressCard.vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Select from 'primevue/select'
  import Stepper from 'primevue/stepper'
  import StepList from 'primevue/steplist'
  import Step from 'primevue/step'
  import StepPanels from 'primevue/steppanels'
  import StepPanel from 'primevue/steppanel'
  import dayjs from 'dayjs'

  const route = useRoute()
  const { t } = useI18n()
  const rmaStore = useRmaStore()
  const addressStore = useAddressStore()
  const notifyStore = useNotifyStore()
  const { currentRma } = storeToRefs(rmaStore)
  const { myAddresses } = storeToRefs(addressStore)

  const loading = ref(false)
  const submitting = ref(false)
  const creatingAddress = ref(false)
  const activeStep = ref(1)
  const currentRmaId = ref<string | null>(null)
  const itemReplacements = ref<Record<string, string>>({})
  const selectedAddressId = ref<number | null>(null)
  const showNewAddressForm = ref(false)
  const rmaReference = ref<string>('')

  const addedProductIds = computed(() => {
    if (!currentRma.value?.items) return []
    return currentRma.value.items.map((item: any) => Number(item.productId)).filter(Boolean)
  })

  const rmaPdfUrl = computed(() => {
    if (!currentRma.value?.hash) return '#'
    return `${import.meta.env.VITE_API_URL}/rmas/pdf/${currentRma.value.hash}`
  })

  const getReasonLabel = (reason: string | number | null): string => {
    if (!reason) return '-'
    return t(`rmaConfig.rma_reasons.${reason}`, String(reason))
  }

  const getReturnCondition = (reason: string | null): string => {
    if (!reason) return '-'
    if (reason === 'wrong_order' || reason === 'not_as_expected') {
      return t('rma.create.returnConditionWrongOrder')
    }
    if (reason === 'defect' || reason === 'defect_delivery') {
      return t('rma.create.returnConditionDefect')
    }
    if (reason === 'loan_consignment') {
      return t('rma.create.returnConditionLoan')
    }
    return '-'
  }

  const getWarrantyIndication = (item: any): { type: string } => {
    if (!item.reason) return { type: 'unknown' }
    const code = item.reason

    if (
      code === 'wrong_order' ||
      code === 'not_as_expected' ||
      code === 'wrong_product' ||
      code === 'loan_consignment'
    ) {
      return { type: 'na' }
    }

    if (code === 'recall') {
      return { type: 'recall' }
    }

    const purchaseDate = item.invoiceDate || item.orderDate
    if (!purchaseDate) {
      return { type: 'unknown' }
    }

    const purchase = dayjs(purchaseDate)
    const now = dayjs()
    const yearsElapsed = now.diff(purchase, 'year', true)

    if (yearsElapsed <= 3) {
      return { type: 'within' }
    }
    return { type: 'outside' }
  }

  const replacementOptions = computed(() => {
    const codes = [
      'not_applicable',
      'yes_credit',
      'yes_repair_return',
      'no_replacement',
      'no_repair_return',
      'see_recall',
    ]
    return codes.map((code) => ({
      value: code,
      label: t(`rmaConfig.rma_replacement.${code}`),
    }))
  })

  const newAddressSchema = reactive({
    companyName: 'required|max:100',
    street: 'required|max:255',
    number: 'required|max:6',
    numberExt: 'max:6',
    zipcode: 'required|max:7',
    city: 'required|max:75',
    country: 'required|max:2',
    phone: 'max:15',
  })

  const referenceSchema = reactive({
    reference: 'max:50',
  })

  const onSelectAddress = (addressId: number) => {
    selectedAddressId.value = addressId
  }

  const handleCreateAddress = async (formData: any) => {
    creatingAddress.value = true
    const created = await addressStore.createAddress({
      companyName: formData.companyName,
      firstname: formData.firstname || undefined,
      lastname: formData.lastname || undefined,
      street: formData.street,
      number: formData.number,
      numberExt: formData.numberExt || undefined,
      zipcode: formData.zipcode,
      city: formData.city,
      country: formData.country,
      phone: formData.phone || undefined,
    })
    await addressStore.fetchMyAddresses()
    if (created?.id) {
      selectedAddressId.value = created.id
    }
    showNewAddressForm.value = false
    creatingAddress.value = false
    notifyStore.notify(t('rma.create.addressCreated'), NotificationType.Success)
  }

  onMounted(async () => {
    loading.value = true
    await addressStore.fetchMyAddresses()
    const rmaId = route.params.id as string
    if (rmaId) {
      currentRmaId.value = rmaId
      await rmaStore.fetchRmaById(rmaId)
    } else {
      const newRma = await rmaStore.createNewRma({})
      if (newRma) {
        currentRmaId.value = newRma.id
      }
    }
    if (currentRma.value) {
      selectedAddressId.value = currentRma.value.addressId ?? null
      rmaReference.value = currentRma.value.reference || ''
    }
    loading.value = false
  })

  const handleItemAdded = async () => {
    if (currentRmaId.value) {
      await rmaStore.fetchRmaById(currentRmaId.value)
    }
  }

  const removeItem = async (itemId: string) => {
    if (currentRmaId.value) {
      await rmaStore.removeRmaItem(currentRmaId.value, itemId)
      await rmaStore.fetchRmaById(currentRmaId.value)
    }
  }

  const handleSubmit = async (formData: any) => {
    if (!currentRmaId.value || !selectedAddressId.value) return

    submitting.value = true
    await rmaStore.updateExistingRma(currentRmaId.value, {
      addressId: selectedAddressId.value,
      reference: formData.reference || rmaReference.value || undefined,
    })
    await rmaStore.submitExistingRma(currentRmaId.value)
    await rmaStore.fetchRmaById(currentRmaId.value)
    submitting.value = false
    notifyStore.notify(t('rma.messages.submitSuccess'), NotificationType.Success)
    activeStep.value = 4
  }
</script>
