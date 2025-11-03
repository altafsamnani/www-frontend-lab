<template>
  <RightLayout :title="$t('menu.favourites')" :subtitle="$t('favourites.subtitle')">
    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="15" />
    </div>

    <div v-else-if="favourites.length === 0" class="text-center py-4">
      <i class="pi pi-heart text-6xl text-surface-300 dark:text-surface-600 mb-4"></i>
      <p class="text-surface-500 dark:text-surface-400 text-lg mb-4">{{ $t('favourites.noFavourites') }}</p>
      <router-link :to="{ name: 'Search' }">
        <Button>
          <i class="pi pi-search mr-2"></i>
          {{ $t('favourites.startShopping') }}
        </Button>
      </router-link>
    </div>

    <div v-else class="card">
      <DataTable :value="favourites" :paginator="favourites.length > 10" :rows="10" dataKey="id" :rowHover="true"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" class="p-datatable-sm"
        :globalFilterFields="['name', 'articleNr']" :totalRecords="favourites.length">

        <Column :exportable="false" style="width:5rem">
          <template #body="slotProps">
            <img :src="slotProps.data.thumbnail" :alt="slotProps.data.name" class="w-16 h-16 object-contain rounded" />
          </template>
        </Column>

        <Column field="articleNr" :header="$t('favourites.articleNumber')" :sortable="true" style="width:10rem">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.data.articleNr || '-' }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('favourites.productName')" :sortable="true">
          <template #body="slotProps">
            <router-link :to="{ name: 'Products', params: { id: slotProps.data.productId } }"
              class="text-primary hover:underline font-medium">
              {{ slotProps.data.name }}
            </router-link>
          </template>
        </Column>

        <Column field="createdAt" :header="$t('favourites.addedDate')" :sortable="true" style="width:12rem">
          <template #body="slotProps">
            <span class="text-sm text-surface-600 dark:text-surface-400">
              {{ formatDate(slotProps.data.createdAt) }}
            </span>
          </template>
        </Column>

        <Column :exportable="false" style="width:10rem" bodyClass="text-center" :header="$t('common.actions')">
          <template #body="slotProps">
            <div class="flex justify-center gap-2">
              <Button icon="pi pi-shopping-cart" class="p-button-rounded p-button-text p-button-sm"
                @click="addToCart(slotProps.data)" v-tooltip.top="$t('favourites.addToCart')" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger p-button-sm"
                @click="confirmRemove(slotProps.data)" v-tooltip.top="$t('common.remove')" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showRemoveDialog" :header="$t('favourites.removeConfirm')" :modal="true">
      <p>{{ $t('favourites.removeMessage') }}</p>
      <template #footer>
        <SecondaryButton @click="showRemoveDialog = false">
          {{ $t('common.cancel') }}
        </SecondaryButton>
        <DangerButton @click="handleRemove">
          {{ $t('common.remove') }}
        </DangerButton>
      </template>
    </Dialog>
  </RightLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useFavouritesStore } from '@/stores/favourites'
import { useAuthStore, isLoggedIn } from '@/stores/auth'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { useAddToCart } from '@/composables/useAddToCart'
import RightLayout from '@/layouts/RightLayout.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from '@/volt/Button.vue'
import SecondaryButton from '@/volt/SecondaryButton.vue'
import DangerButton from '@/volt/DangerButton.vue'
import Dialog from '@/volt/Dialog.vue'
import type { Favourite } from '@/types/Favourite'
import LoaderForm from '@/components/icons/LoaderForm.vue'

const { t } = useI18n()
const router = useRouter()
const favouritesStore = useFavouritesStore()
const authStore = useAuthStore()
const notifyStore = useNotifyStore()

const { favourites, favouritesExtra } = storeToRefs(favouritesStore)

// Use the common addToCart composable
const { addToCart: addItemToCart } = useAddToCart({
  showToast: true
})

// Create a reactive authentication state
const isUserLoggedIn = computed(() => {
  if (authStore.user) return true
  if (authStore.accessToken) return true
  return isLoggedIn()
})

const loading = ref(true)
const showRemoveDialog = ref(false)
const favouriteToRemove = ref<Favourite | null>(null)

onMounted(async () => {
  try {
    // Check if data is already loaded from localStorage
    if (!favouritesStore.isInitialized) {
      await favouritesStore.fetchFavourites()
    }
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const goToLogin = () => {
  router.push({
    name: 'login',
    query: { redirect: router.currentRoute.value.fullPath }
  })
}

const addToCart = (favourite: Favourite) => {
  if (!isUserLoggedIn.value) {
    goToLogin()
    return
  }

  // Create product object with required fields for addToCart
  const product = {
    id: parseInt(favourite.productId),
    name: favourite.name,
    price: 0 // Price will be fetched from backend
  }

  // Call the common addToCart function
  addItemToCart(product)
}

const confirmRemove = (favourite: Favourite) => {
  favouriteToRemove.value = favourite
  showRemoveDialog.value = true
}

const handleRemove = async () => {
  if (!favouriteToRemove.value) return

  try {
    await favouritesStore.removeFromFavourites(favouriteToRemove.value.productId)
    notifyStore.notify(
      t('favourites.messages.removeSuccess'),
      NotificationType.Success
    )
    showRemoveDialog.value = false
  } catch (error) {
    notifyStore.notify(
      t('favourites.messages.removeError'),
      NotificationType.Error
    )
  }
}
</script>