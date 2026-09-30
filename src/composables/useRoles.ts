import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import type { Role } from '@/types/Role'

export function useRoles() {
  const { user } = storeToRefs(useAuthStore())

  const getRoleNames = computed(() => {
    if (!user.value?.roles || !Array.isArray(user.value.roles)) {
      return []
    }
    return user.value.roles.map((role: Role) => role.name)
  })

  const hasRole = (roleName: string): boolean => {
    return getRoleNames.value.includes(roleName)
  }

  const hasAnyRole = (roleNames: string[]): boolean => {
    return roleNames.some((roleName) => getRoleNames.value.includes(roleName))
  }

  const isManager = computed(() => hasRole('manager'))
  const isAdmin = computed(() => hasRole('admin'))
  const isManagerOrAdmin = computed(() => hasAnyRole(['manager', 'admin']))

  return {
    getRoleNames,
    hasRole,
    hasAnyRole,
    isManager,
    isAdmin,
    isManagerOrAdmin,
  }
}
