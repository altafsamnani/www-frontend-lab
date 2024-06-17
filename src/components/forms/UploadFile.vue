<template>
  <div class="card">
    <Toast />
    <div class="flex flex-wrap gap-6">
      <div class="flex-auto">
        <vee-field type="hidden" name="fileIds" v-model="uploadedFiles" id="fileIds" />
        <FileUpload
          name="fileUpload[]"
          customUpload
          :auto="true"
          :multiple="true"
          @select="onSelectedFiles"
          @uploader="onTemplatedUpload"
          @upload="onTemplatedUpload($event)"
        >
          <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="justify-content-between align-items-center flex flex-1 flex-wrap gap-2">
              <div class="flex gap-2">
                <Button
                  v-if="!externalLink"
                  @click="chooseCallback()"
                  icon="pi pi-file-import"
                  rounded
                  outlined
                ></Button>
                <Button
                  v-if="externalLink"
                  @click="externalLink = false"
                  :icon="'pi pi-cloud-upload'"
                  rounded
                  outlined
                  severity="secondary"
                ></Button>
                <Button
                  v-if="!externalLink"
                  @click="externalLink = true"
                  :icon="'pi pi-link'"
                  rounded
                  outlined
                  severity="secondary"
                ></Button>

                <Button
                  v-if="false"
                  @click="clearCallback()"
                  icon="pi pi-times"
                  rounded
                  outlined
                  severity="danger"
                  :disabled="!files || docFiles.length === 0"
                ></Button>
              </div>
            </div>
          </template>
          <template
            #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }"
          >
            <div v-if="hasError">
              <Message severity="error"> {{ hasError }}</Message>
            </div>
            <span v-if="externalLink" class="relative">
              <InputGroup>
                <InputText
                  v-model="externalLinkForm.url"
                  class="w-full gap-6"
                  :placeholder="$t('documents.external_link')"
                />
                <Button @click="onExternalLinkUpload" icon="pi pi-check" severity="success" />
                <Button icon="pi pi-times" severity="danger" @click="externalLink = false" />
              </InputGroup>
            </span>
            <div
              v-else
              class="bg-surface-0 text-surface-700 dark:bg-surface-900 dark:text-white/80"
            >
              <draggable
                tag="div"
                class="dragArea list-group flex w-full flex-wrap gap-6"
                handle=".handle"
                ghostClass="ghost"
                direction="horizontal"
                v-model="fileUrls"
                :list="fileUrls"
                item-key="id"
                @change="onDraggableChange"
                :disabled="isDisabled"
              >
                <template #item="{ element }">
                  <FileCard
                    :key="element.id"
                    :file="element"
                    v-if="multiple || (!multiple && !loader)"
                  />
                </template>
                <template #footer>
                  <LoaderCard :count="loader" v-if="loader" class="flex flex-wrap gap-6">
                  </LoaderCard>
                  <div
                    class="list-group-item relative w-full place-content-between rounded-md bg-zinc-900/5 shadow-md transition-shadow dark:bg-white/10 sm:w-56 lg:max-w-64"
                  >
                    <figure class="text-center">
                      <i class="pi pi-file-pdf text-100 min-h-56 p-10 text-9xl" />
                    </figure>
                    <div class="bottom-0 flex w-full p-3 text-center text-sm">
                      {{ $t('file_upload.drag_and_drop') }}
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </template>
          <template #empty> </template>
        </FileUpload>
      </div>
    </div>
  </div>
  <small id="externallink-help">{{ $t('documents.external_link_help') }}</small>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePrimeVue } from 'primevue/config'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useFilesStore } from '@/stores/files'
import { useConfirm } from 'primevue/useconfirm'
import draggable from 'vuedraggable'
import type Files from '@/types/Files'
import FileCard from '@/components/FileCard.vue'
import LoaderCard from '@/components/icons/LoaderCard.vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'

const props = withDefaults(
  defineProps<{
    multiple: boolean
    type: string
    files: Files[]
    width?: string
    maxFileSize: number
  }>(),
  {
    multiple: false,
    width: 'col-span-full',
    maxFileSize: 250000000
  }
)

const emit = defineEmits(['setUploadFiles'])
const formHasChanges = defineModel<boolean>({ default: false })
const $primevue = usePrimeVue()
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()

const filesStore = useFilesStore()
const { storeFiles, storeLinks } = filesStore
const { storedFiles, storedLinks } = storeToRefs(filesStore)

const totalSize = ref(0)
const totalSizePercent = ref(0)
const docFiles = ref<File[]>([])
const fileId = ref()
const isDisabled = ref(false)
const multiple = ref(props.multiple)
const fileUrls = ref(props.files ?? [])
const uploadedFiles = computed(() => (fileUrls.value ? fileUrls.value.map((file) => file.id) : []))
const maxFileSizeMb = ref(props.maxFileSize / 1000000)
const isUploading = ref(false)
const confirmed = ref(false)
const hasError = ref('')
const loader = ref(0)
const externalLink = ref(false)
const externalLinkForm = ref<{ type: string; url: string }>({})
const acceptedFileTypes = import.meta.env.VITE_ALLOWED_FILE_TYPES.split(',')

const onSelectedFiles = (event) => {
  totalSize.value = 0
  hasError.value = ''
  docFiles.value = event.files
  if (docFiles.value.length > 1 && !multiple.value) {
    hasError.value = t('file_upload.allowed_files')
    return
  }

  docFiles.value.map((file) => {
    console.log('fileType', file.type)
    if (!acceptedFileTypes.includes(file.type)) {
      hasError.value = t('file_upload.file_invalid_type', { fileType: acceptedFileTypes })
      return
    }
    totalSize.value += parseFloat(formatSize(file.size, 'MB'))
    if (totalSize.value > maxFileSizeMb.value) {
      totalSize.value = 0
      hasError.value = t('file_upload.file_too_big', { maxFileSize: maxFileSizeMb.value })
      return
    }
  })
}

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10
  callback()
}

const onTemplatedUpload = async (event) => {
  if (hasError.value) {
    toast.add({ severity: 'error', summary: 'File upload', detail: hasError.value, life: 3000 })
    return
  }

  toast.add({
    severity: 'info',
    summary: 'File upload',
    detail: t('file_upload.file_upload_progress'),
    life: 3000
  })
  docFiles.value = event.files
  loader.value = docFiles.value.length
  for (let i = 0; i < docFiles.value.length; i++) {
    isUploading.value = true
    const formData = new FormData()
    formData.append('name', docFiles.value[i])
    formData.append('type', props.type)
    await storeFiles(formData)
    if (!multiple.value) {
      fileUrls.value = []
    }
    console.log('storedFiles', storedFiles.value)
    fileUrls.value.push(storedFiles.value)
    loader.value -= 1
  }
  emit('setUploadFiles', fileUrls)
  formHasChanges.value = true
  isUploading.value = false
  toast.add({
    severity: 'success',
    summary: 'File upload',
    detail: t('file_upload.file_upload_success'),
    life: 3000
  })
}

const onExternalLinkUpload = async (event) => {
  externalLink.value = false
  toast.add({
    severity: 'info',
    summary: 'File upload',
    detail: t('file_upload.file_upload_progress'),
    life: 3000
  })
  loader.value = 1
  isUploading.value = true
  externalLinkForm.value.type = props.type
  await storeLinks(externalLinkForm.value)
  fileUrls.value.push(storedLinks.value)

  loader.value -= 1

  formHasChanges.value = true
  isUploading.value = false
  toast.add({
    severity: 'success',
    summary: 'File upload',
    detail: t('file_upload.file_upload_success'),
    life: 3000
  })
}

const formatSize = (bytes, only) => {
  const k = 1024
  const dm = 3
  const sizes = $primevue.config.locale.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes[0]}`
  }

  if (only === 'MB') return (bytes / (k * k)).toFixed(dm) + ' MB'

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes[i]}`
}

const onDraggableChange = (event) => {
  /* let productFiles = []
if (event.moved) {
  for (let i = 0; i < fileUrls.value.length; i++) {
    if (fileUrls.value[i].order !== i) {
      isDisabled.value = false
      fileUrls.value[i].order = i
      //updateProduct(form.files[i].id, form.files[i])
      productFiles.push(fileUrls.value[i])
    }
  }
  console.log('new order', productFiles)
  isDisabled.value = false

  toast.add({
    severity: 'success',
    detail: t('notification.files_reorder'),
    life: 5000
  })
} */
}

const showdeleteFileConfirmation = (id) => {
  fileId.value = id
  confirmDeleteFile()
}

const confirmDeleteFile = () => {
  confirm.require({
    message: t('modals.delete_item_text'),
    header: t('modals.delete_item_title'),
    acceptLabel: t('modals.yes_delete'),
    rejectLabel: t('modals.cancel'),
    accept: () => {
      confirmed.value = true
      fileUrls.value = []
      // uploadedFiles.value = [];
    },
    reject: () => {
      cancelDeleteFile()
      console.log('canceled')
    }
  })
}

const cancelDeleteFile = () => {
  confirmed.value = false
}
</script>
