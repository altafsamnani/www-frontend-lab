<template>
  <RightLayout :title="$t('rma.title')" :subtitle="$t('rma.subtitle')">
    <template #actions>
      <router-link :to="{ name: 'RmaCreate' }">
        <Button>
          <i class="pi pi-plus mr-2"></i>
          {{ $t('rma.createNew') }}
        </Button>
      </router-link>
    </template>

    <div v-if="loading" class="flex justify-center py-4">
      <LoaderForm :columns="1" :rows="10" />
    </div>

    <div v-else-if="rmas.length === 0" class="py-8 text-center">
      <i class="pi pi-inbox text-surface-300 dark:text-surface-600 mb-4 text-6xl"></i>
      <p class="text-surface-500 dark:text-surface-400 mb-4 text-lg">{{ $t('rma.noRmas') }}</p>
      <p class="text-surface-400 dark:text-surface-500 mb-4">{{ $t('rma.noRmasMessage') }}</p>
    </div>

    <div v-else class="flex flex-col gap-6">
      <!-- Stats cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-primary cursor-pointer rounded-lg border p-4 text-center transition-colors"
          :class="{ 'border-primary ring-primary ring-1': activeTab === 'drafts' }"
          @click="activeTab = 'drafts'"
        >
          <div class="text-2xl font-bold text-orange-500">{{ draftRmas.length }}</div>
          <div class="text-surface-500 dark:text-surface-400 mt-1 text-sm">
            {{ $t('rma.sections.drafts') }}
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-primary cursor-pointer rounded-lg border p-4 text-center transition-colors"
          :class="{ 'border-primary ring-primary ring-1': activeTab === 'active' }"
          @click="activeTab = 'active'"
        >
          <div class="text-2xl font-bold text-blue-500">{{ activeRmas.length }}</div>
          <div class="text-surface-500 dark:text-surface-400 mt-1 text-sm">
            {{ $t('rma.sections.active') }}
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 hover:border-primary cursor-pointer rounded-lg border p-4 text-center transition-colors"
          :class="{ 'border-primary ring-primary ring-1': activeTab === 'completed' }"
          @click="activeTab = 'completed'"
        >
          <div class="text-2xl font-bold text-green-500">{{ completedRmas.length }}</div>
          <div class="text-surface-500 dark:text-surface-400 mt-1 text-sm">
            {{ $t('rma.sections.completed') }}
          </div>
        </div>
      </div>

      <!-- Filtered table (full width) -->
      <div
        class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 w-full rounded-lg border"
      >
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center justify-between border-b p-4"
        >
          <h3 class="text-surface-900 dark:text-surface-0 font-semibold">
            {{ $t(`rma.sections.${activeTab}`) }}
          </h3>
          <Tag
            :value="filteredRmas.length.toString()"
            :severity="
              activeTab === 'drafts' ? 'warn' : activeTab === 'active' ? 'info' : 'success'
            "
            rounded
          />
        </div>
        <div class="p-2" style="min-height: 200px">
          <RmaListTable v-if="filteredRmas.length > 0" :rmas="filteredRmas" />
          <div
            v-else
            class="text-surface-400 dark:text-surface-500 flex flex-col items-center justify-center py-12"
          >
            <i class="pi pi-inbox mb-2 text-3xl"></i>
            <p>{{ $t('rma.noRmasInSection') }}</p>
          </div>
        </div>
      </div>

      <!-- Help & resources -->
      <section class="flex flex-col gap-4 pt-2">
        <h3 class="text-surface-900 dark:text-surface-0 text-base font-semibold">
          {{ $t('rma.resourcesTitle') }}
        </h3>

        <!-- Warranty checker (interactive utility bar) -->
        <div
          class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 rounded-lg border p-4"
        >
          <div class="flex flex-col gap-4 md:flex-row md:items-center">
            <div class="min-w-0 md:flex-1">
              <h4 class="text-surface-900 dark:text-surface-0 mb-1 font-semibold">
                <i class="pi pi-shield mr-1"></i>
                {{ $t('rma.sidebar.warrantyTitle') }}
              </h4>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                {{ $t('rma.sidebar.warrantyText') }}
              </p>
            </div>
            <div class="flex w-full gap-2 md:w-auto">
              <InputText
                v-model="warrantySerial"
                :placeholder="$t('rma.sidebar.warrantyPlaceholder')"
                class="flex-1 md:w-64"
                @keyup.enter="checkWarranty"
              />
              <Button
                icon="pi pi-search"
                :label="$t('rma.sidebar.warrantyTitle')"
                :loading="checkingWarranty"
                class="shrink-0 whitespace-nowrap"
                @click="checkWarranty"
              />
            </div>
          </div>
          <div
            v-if="warrantyResult"
            class="mt-3 rounded p-3 text-sm"
            :class="
              warrantyResult.inWarranty
                ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                : 'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
            "
          >
            {{ warrantyResult.message }}
          </div>
        </div>

        <!-- Info cards grid -->
        <div class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          <!-- Product niet nodig? -->
          <div
            class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 h-full rounded-lg border p-4"
          >
            <h4 class="text-surface-900 dark:text-surface-0 mb-2 font-semibold">
              <i class="pi pi-undo mr-1"></i>
              {{ $t('rma.sidebar.notNeededTitle') }}
            </h4>
            <p class="text-surface-600 dark:text-surface-400 mb-2 text-sm">
              {{ $t('rma.sidebar.notNeededText') }}
            </p>
            <ul
              class="text-surface-500 dark:text-surface-400 flex list-inside list-disc flex-col gap-1 text-xs"
            >
              <li>{{ $t('rma.sidebar.condition1') }}</li>
              <li>{{ $t('rma.sidebar.condition2') }}</li>
              <li>{{ $t('rma.sidebar.condition3') }}</li>
            </ul>
          </div>

          <!-- Product defect? -->
          <div
            class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 h-full rounded-lg border p-4"
          >
            <h4 class="text-surface-900 dark:text-surface-0 mb-2 font-semibold">
              <i class="pi pi-wrench mr-1"></i>
              {{ $t('rma.sidebar.defectTitle') }}
            </h4>
            <p class="text-surface-600 dark:text-surface-400 text-sm">
              {{ $t('rma.sidebar.defectText') }}
            </p>
            <p class="text-primary mt-2 text-sm font-medium">
              <i class="pi pi-phone mr-1"></i>
              0299 66 66 62 {{ $t('rma.info.contactOption') }} 2
            </p>
          </div>

          <!-- Firmware links -->
          <div
            class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 h-full rounded-lg border p-4"
          >
            <h4 class="text-surface-900 dark:text-surface-0 mb-2 font-semibold">
              <i class="pi pi-download mr-1"></i>
              {{ $t('rma.sidebar.firmwareTitle') }}
            </h4>
            <p class="text-surface-600 dark:text-surface-400 text-sm">
              {{ $t('rma.sidebar.firmwareText') }}
            </p>
          </div>

          <!-- Contact -->
          <div
            class="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 h-full rounded-lg border p-4"
          >
            <h4 class="text-primary-900 dark:text-primary-100 mb-2 font-semibold">
              <i class="pi pi-question-circle mr-1"></i>
              {{ $t('rma.sidebar.contactTitle') }}
            </h4>
            <p class="text-primary-800 dark:text-primary-200 text-sm">
              <i class="pi pi-envelope mr-1"></i>
              <a href="mailto:rma@osec.nl" class="underline">rma@osec.nl</a>
            </p>
            <p class="text-primary-800 dark:text-primary-200 mt-1 text-sm">
              <i class="pi pi-phone mr-1"></i>
              0299 66 66 62 {{ $t('rma.info.contactOption') }} 4
            </p>
          </div>
        </div>
      </section>
    </div>
  </RightLayout>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRmaStore } from '@/stores/rmas'
  import RightLayout from '@/layouts/RightLayout.vue'
  import LoaderForm from '@/components/icons/LoaderForm.vue'
  import RmaListTable from '@/components/rma/RmaListTable.vue'
  import Tag from 'primevue/tag'
  import InputText from 'primevue/inputtext'

  const { t } = useI18n()
  const rmaStore = useRmaStore()
  const { rmas } = storeToRefs(rmaStore)

  const loading = ref(false)
  const activeTab = ref<'drafts' | 'active' | 'completed'>('active')
  const warrantySerial = ref('')
  const checkingWarranty = ref(false)
  const warrantyResult = ref<{ inWarranty: boolean; message: string } | null>(null)

  const draftRmas = computed(() => rmas.value.filter((r) => r.isDraft))
  const completedRmas = computed(() =>
    rmas.value.filter((r) => !r.isDraft && r.status === 'completed')
  )
  const activeRmas = computed(() =>
    rmas.value.filter((r) => !r.isDraft && r.status !== 'completed')
  )

  const filteredRmas = computed(() => {
    if (activeTab.value === 'drafts') return draftRmas.value
    if (activeTab.value === 'active') return activeRmas.value
    return completedRmas.value
  })

  const checkWarranty = async () => {
    if (!warrantySerial.value.trim()) return
    checkingWarranty.value = true
    warrantyResult.value = {
      inWarranty: true,
      message: t('rma.sidebar.warrantyCheckPending'),
    }
    checkingWarranty.value = false
  }

  onMounted(async () => {
    loading.value = true
    await rmaStore.fetchUserRmas({ page: { size: 250 } })
    loading.value = false
  })
</script>
