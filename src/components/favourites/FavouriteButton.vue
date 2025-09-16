<template>
  <Button :icon="isFavourited ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'" severity="contrast" variant="text" raised
    aria-label="Bookmark" @click="toggleFavourite" :loading="loading" size="large" :style="{ fontSize: '1.5rem' }"
    icon-class="text-2xl"
    v-tooltip.top="isFavourited ? $t('favourites.removeFromFavourites') : $t('favourites.addToFavourites')" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFavouritesStore } from '@/stores/favourites'
import { useNotifyStore, NotificationType } from '@/stores/notify'
import { isLoggedIn } from '@/stores/auth'
import Button from '@/volt/Button.vue'

interface Props {
  productId: string
  size?: 'sm' | 'md'
  variant?: 'text' | 'filled' | 'outlined'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'text'
})

const { t } = useI18n()
const favouritesStore = useFavouritesStore()
const notifyStore = useNotifyStore()

const loading = ref(false)

// Initialize favourites store if user is logged in
onMounted(async () => {
  if (isLoggedIn() && !favouritesStore.isInitialized) {
    try {
      await favouritesStore.initializeStore()
    } catch (error) {
      console.error('Failed to initialize favourites:', error)
    }
  }
})

const isFavourited = computed(() => {
  // Only check favourite status if user is logged in
  if (!isLoggedIn()) return false
  return favouritesStore.isFavourite(props.productId)
})

const toggleFavourite = async () => {
  loading.value = true
  try {
    if (isFavourited.value) {
      await favouritesStore.removeFromFavourites(props.productId)
      notifyStore.notify(
        t('favourites.messages.removeSuccess'),
        NotificationType.Success
      )
    } else {
      await favouritesStore.addToFavourites(props.productId)
      notifyStore.notify(
        t('favourites.messages.addSuccess'),
        NotificationType.Success
      )
    }
  } catch (error) {
    notifyStore.notify(
      isFavourited.value ? t('favourites.messages.removeError') : t('favourites.messages.addError'),
      NotificationType.Error
    )
  } finally {
    loading.value = false
  }
}
</script>