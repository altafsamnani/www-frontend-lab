import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMobileMenuStore = defineStore('mobileMenu', () => {
  const isOpen = ref(false)

  const openMenu = () => {
    isOpen.value = true
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden'
  }

  const closeMenu = () => {
    isOpen.value = false
    // Restore body scroll
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    if (isOpen.value) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu
  }
})