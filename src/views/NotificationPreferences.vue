<template>
  <RightLayout
    :title="$t('messagePreferences.title')"
    :subtitle="$t('messagePreferences.subtitle')"
  >
    <template #actions>
      <div class="flex items-center gap-2 text-sm" aria-live="polite">
        <template v-if="saveStatus === 'saving'">
          <i class="pi pi-spinner pi-spin text-surface-400"></i>
          <span class="text-surface-500">{{ $t('messagePreferences.saving') }}</span>
        </template>
        <template v-else-if="saveStatus === 'saved'">
          <i class="pi pi-check-circle text-green-500"></i>
          <span class="text-green-600 dark:text-green-400">{{
            $t('messagePreferences.saved')
          }}</span>
        </template>
      </div>
    </template>

    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="2" :rows="4" />
    </div>

    <div v-else class="space-y-6">
      <div
        class="border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-950/40 space-y-3 rounded-xl border p-4"
      >
        <p class="text-surface-700 dark:text-surface-200 text-sm">
          {{ $t('messagePreferences.explanation') }}
          <template v-if="userEmail">
            {{ $t('messagePreferences.sentTo') }} <strong>{{ userEmail }}</strong
            >.
          </template>
        </p>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span class="flex items-center gap-2">
            <span
              class="bg-surface-600 dark:bg-surface-500 inline-flex h-7 w-7 items-center justify-center rounded-full text-white"
            >
              <i class="pi pi-wrench text-xs"></i>
            </span>
            {{ $t('messagePreferences.legendTechnical') }}
          </span>
          <span class="flex items-center gap-2">
            <span
              class="bg-surface-600 dark:bg-surface-500 inline-flex h-7 w-7 items-center justify-center rounded-full text-white"
            >
              <i class="pi pi-euro text-xs"></i>
            </span>
            {{ $t('messagePreferences.legendCommercial') }}
          </span>
          <span class="flex items-center gap-2">
            <span
              class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white"
            >
              <i class="pi pi-whatsapp text-xs"></i>
            </span>
            {{ $t('messagePreferences.legendWhatsappOn') }}
          </span>
          <span class="flex items-center gap-2">
            <span
              class="bg-primary inline-flex h-7 w-7 items-center justify-center rounded-full text-white"
            >
              <i class="pi pi-envelope text-xs"></i>
            </span>
            {{ $t('messagePreferences.legendEmailOn') }}
          </span>
          <span class="text-surface-500 flex items-center gap-2">
            <span
              class="bg-surface-200 dark:bg-surface-700 text-surface-400 inline-flex h-7 w-7 items-center justify-center rounded-full"
            >
              <i class="pi pi-wrench text-xs"></i>
            </span>
            {{ $t('messagePreferences.legendOff') }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div
          v-for="group in groups"
          :key="group.categoryId"
          class="border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 overflow-hidden rounded-xl border"
        >
          <div
            class="bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b px-4 py-3"
          >
            <span
              class="bg-primary inline-flex h-9 w-9 items-center justify-center rounded-lg text-white"
            >
              <i :class="[group.icon, 'text-base']"></i>
            </span>
            <span class="text-surface-900 dark:text-surface-0 flex-1 truncate font-semibold">
              {{ group.label }}
            </span>
          </div>

          <div class="px-4 pt-3">
            <div class="flex items-center">
              <span class="flex-1"></span>
              <div class="flex">
                <span
                  class="flex w-[5.5rem] items-center justify-center gap-1 text-center text-xs font-semibold text-green-600 dark:text-green-400"
                >
                  <i class="pi pi-whatsapp"></i> WhatsApp
                </span>
                <span
                  class="text-primary-600 dark:text-primary-400 border-surface-200 dark:border-surface-700 flex w-[5.5rem] items-center justify-center gap-1 border-l text-center text-xs font-semibold"
                >
                  <i class="pi pi-envelope"></i> E-mail
                </span>
              </div>
            </div>
          </div>

          <div class="divide-surface-100 dark:divide-surface-800 divide-y px-4 pb-3">
            <div v-for="row in group.rows" :key="row.categoryId" class="flex items-center py-2.5">
              <span class="text-surface-800 dark:text-surface-100 min-w-0 flex-1 truncate text-sm">
                <template v-if="row.isGroup">
                  <strong>{{ $t('messagePreferences.allAbout', { group: group.label }) }}</strong>
                </template>
                <template v-else>{{ row.label }}</template>
              </span>
              <div class="flex">
                <div class="flex w-[5.5rem] items-center justify-center gap-1.5">
                  <button
                    type="button"
                    :class="toggleClass(row.categoryId, TYPE_WHATSAPP, 'technical')"
                    :aria-pressed="isOn(row.categoryId, TYPE_WHATSAPP, 'technical')"
                    v-tooltip.top="$t('messagePreferences.tooltipWhatsappTechnical')"
                    @click="toggle(row.categoryId, TYPE_WHATSAPP, 'technical')"
                  >
                    <i class="pi pi-wrench text-xs"></i>
                  </button>
                  <button
                    type="button"
                    :class="toggleClass(row.categoryId, TYPE_WHATSAPP, 'commercial')"
                    :aria-pressed="isOn(row.categoryId, TYPE_WHATSAPP, 'commercial')"
                    v-tooltip.top="$t('messagePreferences.tooltipWhatsappCommercial')"
                    @click="toggle(row.categoryId, TYPE_WHATSAPP, 'commercial')"
                  >
                    <i class="pi pi-euro text-xs"></i>
                  </button>
                </div>
                <div
                  class="border-surface-100 dark:border-surface-800 flex w-[5.5rem] items-center justify-center gap-1.5 border-l"
                >
                  <button
                    type="button"
                    :class="toggleClass(row.categoryId, TYPE_EMAIL, 'technical')"
                    :aria-pressed="isOn(row.categoryId, TYPE_EMAIL, 'technical')"
                    v-tooltip.top="$t('messagePreferences.tooltipEmailTechnical')"
                    @click="toggle(row.categoryId, TYPE_EMAIL, 'technical')"
                  >
                    <i class="pi pi-wrench text-xs"></i>
                  </button>
                  <button
                    type="button"
                    :class="toggleClass(row.categoryId, TYPE_EMAIL, 'commercial')"
                    :aria-pressed="isOn(row.categoryId, TYPE_EMAIL, 'commercial')"
                    v-tooltip.top="$t('messagePreferences.tooltipEmailCommercial')"
                    @click="toggle(row.categoryId, TYPE_EMAIL, 'commercial')"
                  >
                    <i class="pi pi-euro text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 pb-3">
            <button
              type="button"
              class="text-primary-600 dark:text-primary-400 flex items-center gap-1 text-sm hover:underline"
              @click="openTopicDialog(group)"
            >
              <i class="pi pi-plus text-xs"></i>
              {{ $t('messagePreferences.addTopic') }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <Button
          severity="danger"
          outlined
          size="small"
          icon="pi pi-bell-slash"
          :label="$t('messagePreferences.unsubscribeAll')"
          @click="confirmUnsubscribeAll"
        />
      </div>
    </div>

    <Dialog
      v-model:visible="topicDialogVisible"
      :header="$t('messagePreferences.topicDialogTitle', { group: activeGroup?.label ?? '' })"
      :modal="true"
      :style="{ width: '28rem' }"
    >
      <p class="text-surface-500 mb-3 text-sm">{{ $t('messagePreferences.topicDialogHint') }}</p>
      <Listbox
        :options="availableTopics"
        optionLabel="label"
        :filter="true"
        :filterPlaceholder="$t('messagePreferences.topicSearch')"
        listStyle="max-height: 280px"
        class="w-full"
        @update:model-value="addTopic"
      />
    </Dialog>

    <ConfirmDialog />
  </RightLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import Dialog from 'primevue/dialog'
  import Listbox from 'primevue/listbox'
  import ConfirmDialog from 'primevue/confirmdialog'
  import { useConfirm } from 'primevue/useconfirm'
  import Button from '@/volt/Button.vue'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import { useMessagePreferencesStore } from '@/stores/messagePreferences'
  import { useCategoryStore } from '@/stores/categories'
  import { useAuthStore } from '@/stores/auth'
  import { useNotifyStore, NotificationType } from '@/stores/notify'

  interface CategoryNode {
    key: string
    label: string
    children?: CategoryNode[]
  }

  interface GroupRow {
    categoryId: number
    label: string
    isGroup: boolean
  }

  interface GroupCard {
    categoryId: number
    label: string
    icon: string
    node: CategoryNode
    rows: GroupRow[]
  }

  const TYPE_EMAIL = 1
  const TYPE_WHATSAPP = 2

  const { t } = useI18n()
  const confirm = useConfirm()
  const notifyStore = useNotifyStore()
  const messagePreferencesStore = useMessagePreferencesStore()
  const categoryStore = useCategoryStore()
  const authStore = useAuthStore()
  const { preferences } = storeToRefs(messagePreferencesStore)
  const { treeCategories } = storeToRefs(categoryStore)
  const { user } = storeToRefs(authStore)
  const { fetchPreferences, savePreferences } = messagePreferencesStore
  const { fetchTreeCategories } = categoryStore

  const loading = ref(false)
  const saveStatus = ref<'idle' | 'saving' | 'saved'>('idle')
  const prefs = ref<Record<string, { technical: boolean; commercial: boolean }>>({})
  const extraRows = ref<Record<number, GroupRow[]>>({})
  const topicDialogVisible = ref(false)
  const activeGroup = ref<GroupCard | null>(null)
  let saveTimer: ReturnType<typeof setTimeout> | null = null

  const userEmail = computed(() => user.value?.email ?? null)

  const groupIcon = (label: string): string => {
    const normalized = label.toLowerCase()
    if (normalized.includes('inbraak') || normalized.includes('burglary')) return 'pi pi-shield'
    if (normalized.includes('video')) return 'pi pi-video'
    if (normalized.includes('intercom')) return 'pi pi-phone'
    if (normalized.includes('toegang') || normalized.includes('access')) return 'pi pi-key'
    if (normalized.includes('brand') || normalized.includes('fire'))
      return 'pi pi-exclamation-triangle'
    if (normalized.includes('netwerk') || normalized.includes('network')) return 'pi pi-wifi'
    if (normalized.includes('building')) return 'pi pi-building'
    if (normalized.includes('outlet')) return 'pi pi-tag'
    return 'pi pi-tag'
  }

  const countDescendants = (node: CategoryNode): number => {
    return (node.children ?? []).reduce((total, child) => total + 1 + countDescendants(child), 0)
  }

  const groupNodes = computed<CategoryNode[]>(() => {
    const roots = treeCategories.value as CategoryNode[]
    if (!roots.length) return []

    const productsRoot =
      roots.find((root) => ['products', 'producten'].includes((root.label ?? '').toLowerCase())) ??
      [...roots].sort((rootA, rootB) => countDescendants(rootB) - countDescendants(rootA))[0]

    return productsRoot.children ?? []
  })

  const subtreeIds = (node: CategoryNode): number[] => {
    const ids = [Number(node.key)]
    for (const child of node.children ?? []) {
      ids.push(...subtreeIds(child))
    }
    return ids
  }

  const findNode = (node: CategoryNode, categoryId: number): CategoryNode | null => {
    if (Number(node.key) === categoryId) return node
    for (const child of node.children ?? []) {
      const match = findNode(child, categoryId)
      if (match) return match
    }
    return null
  }

  const subscribedCategoryIds = computed(() => {
    const ids = new Set<number>()
    for (const key of Object.keys(prefs.value)) {
      ids.add(Number(key.split(':')[0]))
    }
    return ids
  })

  const groups = computed<GroupCard[]>(() => {
    return groupNodes.value.map((node) => {
      const groupId = Number(node.key)
      const descendantIds = subtreeIds(node).filter((categoryId) => categoryId !== groupId)

      const subscribedRows: GroupRow[] = descendantIds
        .filter((categoryId) => subscribedCategoryIds.value.has(categoryId))
        .map((categoryId) => ({
          categoryId,
          label: findNode(node, categoryId)?.label ?? `#${categoryId}`,
          isGroup: false,
        }))

      const manualRows = (extraRows.value[groupId] ?? []).filter(
        (row) => !subscribedRows.some((subscribed) => subscribed.categoryId === row.categoryId)
      )

      const childRows = [...subscribedRows, ...manualRows].sort((rowA, rowB) =>
        rowA.label.localeCompare(rowB.label)
      )

      return {
        categoryId: groupId,
        label: node.label,
        icon: groupIcon(node.label),
        node,
        rows: [{ categoryId: groupId, label: node.label, isGroup: true }, ...childRows],
      }
    })
  })

  const availableTopics = computed<GroupRow[]>(() => {
    if (!activeGroup.value) return []
    const shownIds = new Set(activeGroup.value.rows.map((row) => row.categoryId))
    return subtreeIds(activeGroup.value.node)
      .filter((categoryId) => !shownIds.has(categoryId))
      .map((categoryId) => ({
        categoryId,
        label: findNode(activeGroup.value!.node, categoryId)?.label ?? `#${categoryId}`,
        isGroup: false,
      }))
      .sort((rowA, rowB) => rowA.label.localeCompare(rowB.label))
  })

  const prefKey = (categoryId: number, typeId: number) => `${categoryId}:${typeId}`

  const isOn = (categoryId: number, typeId: number, field: 'technical' | 'commercial') => {
    return Boolean(prefs.value[prefKey(categoryId, typeId)]?.[field])
  }

  const toggleClass = (categoryId: number, typeId: number, field: 'technical' | 'commercial') => {
    const base =
      'inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer '
    if (!isOn(categoryId, typeId, field)) {
      return (
        base +
        'bg-surface-100 dark:bg-surface-800 text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
      )
    }
    return typeId === TYPE_WHATSAPP
      ? base + 'bg-green-500 text-white hover:bg-green-600'
      : base + 'bg-primary text-white hover:opacity-85'
  }

  const toggle = (categoryId: number, typeId: number, field: 'technical' | 'commercial') => {
    const key = prefKey(categoryId, typeId)
    const current = prefs.value[key]

    if (!current) {
      prefs.value[key] = {
        technical: field === 'technical',
        commercial: field === 'commercial',
      }
    } else {
      current[field] = !current[field]
      if (!current.technical && !current.commercial) {
        delete prefs.value[key]
      }
    }

    scheduleSave()
  }

  const scheduleSave = () => {
    saveStatus.value = 'saving'
    if (saveTimer) {
      clearTimeout(saveTimer)
    }
    saveTimer = setTimeout(() => {
      persist()
    }, 800)
  }

  const persist = async () => {
    const payload = Object.entries(prefs.value).map(([key, flags]) => {
      const [categoryId, typeId] = key.split(':')
      return {
        categoryId: Number(categoryId),
        typeId: Number(typeId),
        technical: flags.technical,
        commercial: flags.commercial,
      }
    })
    await savePreferences(payload)
    saveStatus.value = 'saved'
  }

  const openTopicDialog = (group: GroupCard) => {
    activeGroup.value = group
    topicDialogVisible.value = true
  }

  const addTopic = (topic: GroupRow | null) => {
    if (!topic || !activeGroup.value) return
    const groupId = activeGroup.value.categoryId
    extraRows.value[groupId] = [...(extraRows.value[groupId] ?? []), topic]
    prefs.value[prefKey(topic.categoryId, TYPE_EMAIL)] = { technical: true, commercial: true }
    topicDialogVisible.value = false
    scheduleSave()
  }

  const confirmUnsubscribeAll = () => {
    confirm.require({
      message: t('messagePreferences.confirmUnsubscribe'),
      header: t('messagePreferences.unsubscribeAll'),
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-danger',
      accept: () => unsubscribeAll(),
      reject: () => {},
    })
  }

  const unsubscribeAll = async () => {
    prefs.value = {}
    extraRows.value = {}
    if (saveTimer) {
      clearTimeout(saveTimer)
    }
    saveStatus.value = 'saving'
    await persist()
    notifyStore.notify(t('messagePreferences.messages.unsubscribed'), NotificationType.Success)
  }

  const buildStateFromStore = () => {
    const state: Record<string, { technical: boolean; commercial: boolean }> = {}
    for (const preference of preferences.value) {
      state[prefKey(preference.categoryId, preference.typeId)] = {
        technical: preference.technical,
        commercial: preference.commercial,
      }
    }
    prefs.value = state
  }

  onMounted(async () => {
    loading.value = true
    if (!treeCategories.value.length) {
      await fetchTreeCategories()
    }
    await fetchPreferences()
    buildStateFromStore()
    loading.value = false
  })
</script>
