<template>
  <div class="relative">
    <OverlayBadge
      v-if="cartStore.cartItemCount > 0"
      :value="cartStore.cartItemCount > 99 ? '99+' : cartStore.cartItemCount.toString()"
      severity="secondary" @click="$emit('click')" size="small">
      <i class="pi pi-shopping-cart text-2xl" />
    </OverlayBadge>
    <i v-else class="pi pi-shopping-cart text-2xl" @click="$emit('click')" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import OverlayBadge from 'primevue/overlaybadge'

defineEmits<{
  click: []
}>()

const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCartSummary()
})
</script>

<style scoped>
.cart-badge-enter-active,
.cart-badge-leave-active {
  transition: all 0.3s ease;
}

.cart-badge-enter-from,
.cart-badge-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>