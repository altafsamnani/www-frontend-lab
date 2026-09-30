import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

/**
 * Composable for checking user permissions
 * Permissions are nested inside the roles array from the user object
 */
export function usePermissions() {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  /**
   * Check if user has a specific permission
   * @param permissionName - The permission name to check (e.g., 'view orders', 'edit users')
   * @returns boolean
   */
  const hasPermission = (permissionName: string): boolean => {
    return (
      user.value?.roles?.some((role) => role.permissions?.some((p) => p.name === permissionName)) ||
      false
    )
  }

  /**
   * Check if user can view a resource type
   * @param resourceType - The resource type (e.g., 'orders', 'users', 'offers')
   * @returns boolean
   */
  const canView = (resourceType: string): boolean => {
    return hasPermission(`view ${resourceType}`)
  }

  /**
   * Check if user can edit a resource type
   * @param resourceType - The resource type (e.g., 'orders', 'users', 'offers')
   * @returns boolean
   */
  const canEdit = (resourceType: string): boolean => {
    return hasPermission(`edit ${resourceType}`)
  }

  /**
   * Check if user can create a resource type
   * @param resourceType - The resource type (e.g., 'orders', 'offers', 'rma')
   * @returns boolean
   */
  const canCreate = (resourceType: string): boolean => {
    return hasPermission(`create ${resourceType}`)
  }

  /**
   * Check if user can delete a resource type
   * @param resourceType - The resource type (e.g., 'orders', 'offers')
   * @returns boolean
   */
  const canDelete = (resourceType: string): boolean => {
    return hasPermission(`delete ${resourceType}`)
  }

  // Computed properties for common permission checks
  const canViewOrders = computed(() => canView('orders'))
  const canViewOffers = computed(() => canView('offers'))
  const canViewUsers = computed(() => canView('users'))
  const canViewRma = computed(() => canView('rma'))
  const canViewDownloads = computed(() => canView('downloads'))
  const canViewInvoices = computed(() => canView('invoices'))
  const canViewProducts = computed(() => canView('products'))
  const canViewPrices = computed(() => canView('prices'))
  const canViewDiscounts = computed(() => canView('discounts'))

  const canEditUsers = computed(() => canEdit('users'))
  const canCreateOrders = computed(() => canCreate('orders'))
  const canCreateOffers = computed(() => canCreate('offers'))
  const canCreateRma = computed(() => canCreate('rma'))
  const canCreateTraining = computed(() => canCreate('training'))

  return {
    // Methods
    hasPermission,
    canView,
    canEdit,
    canCreate,
    canDelete,

    // Computed properties for common checks
    canViewOrders,
    canViewOffers,
    canViewUsers,
    canViewRma,
    canViewDownloads,
    canViewInvoices,
    canViewProducts,
    canViewPrices,
    canViewDiscounts,
    canEditUsers,
    canCreateOrders,
    canCreateOffers,
    canCreateRma,
    canCreateTraining,
  }
}
