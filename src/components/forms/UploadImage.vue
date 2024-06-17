<template>
  <div class="card">
    <Toast />
    <div class="flex flex-wrap gap-6">
      <div class="flex-auto">
        <vee-field type="hidden" name="imageIds" v-model="uploadedImages" id="imageIds" />
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
                <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                <Button
                  @click="uploadEvent(uploadCallback)"
                  icon="pi pi-cloud-upload"
                  rounded
                  outlined
                  severity="success"
                  :disabled="!files || files.length === 0"
                ></Button>
                <Button
                  @click="clearCallback()"
                  icon="pi pi-times"
                  rounded
                  outlined
                  severity="danger"
                  :disabled="!files || files.length === 0"
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
            <div class="bg-surface-0 text-surface-700 dark:bg-surface-900 dark:text-white/80">
              <draggable
                tag="div"
                class="dragArea list-group flex w-full flex-wrap gap-6"
                handle=".handle"
                ghostClass="ghost"
                direction="horizontal"
                v-model="imageUrls"
                :list="imageUrls"
                item-key="id"
                @change="onDraggableChange"
                :disabled="isDisabled"
              >
                <template #item="{ element }">
                  <ImageCard
                    :key="element.id"
                    :image="element"
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
                      <i class="pi pi-images text-100 min-h-56 p-10 text-9xl" />
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePrimeVue } from 'primevue/config'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useImagesStore } from '@/stores/images'
import { useConfirm } from 'primevue/useconfirm'
import draggable from 'vuedraggable'
import type Images from '@/types/Images'
import ImageCard from '@/components/ImageCard.vue'
import LoaderCard from '@/components/icons/LoaderCard.vue'

const props = withDefaults(
  defineProps<{
    multiple: boolean
    type: string
    images: Images[]
    width?: string
    maxFileSize: number
  }>(),
  {
    multiple: false,
    width: 'col-span-full',
    maxFileSize: 250000000
  }
)

const emit = defineEmits(['setUploadImages'])
const formHasChanges = defineModel<boolean>({ default: false })
const $primevue = usePrimeVue()
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()

const imagesStore = useImagesStore()
const { storeImages } = imagesStore
const { storedImages } = storeToRefs(imagesStore)

const totalSize = ref(0)
const totalSizePercent = ref(0)
const files = ref<File[]>([])
const imageId = ref()
const isDisabled = ref(false)
const multiple = ref(props.multiple)
const imageUrls = ref(props.images ?? [])
const uploadedImages = computed(() =>
  imageUrls.value ? imageUrls.value.map((image) => image.id) : []
)
const maxFileSizeMb = ref(props.maxFileSize / 1000000)
const isUploading = ref(false)
const confirmed = ref(false)
const hasError = ref('')
const loader = ref(0)
const acceptedFileTypes = import.meta.env.VITE_ALLOWED_IMAGE_TYPES.split(',')

const onSelectedFiles = (event) => {
  totalSize.value = 0
  hasError.value = ''
  files.value = event.files
  if (files.value.length > 1 && !multiple.value) {
    hasError.value = t('file_upload.allowed_files')
    return
  }
  files.value.map((file) => {
    if (!acceptedFileTypes.includes(file.type)) {
      hasError.value = t('file_upload.file_invalid_type', { fileType: file.type })
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
  files.value = event.files
  loader.value = files.value.length
  for (let i = 0; i < files.value.length; i++) {
    isUploading.value = true
    const formData = new FormData()
    formData.append('name', files.value[i])
    formData.append('type', props.type)
    await storeImages(formData)
    if (!multiple.value) {
      imageUrls.value = []
    }
    imageUrls.value.push(storedImages.value)
    loader.value -= 1
  }
  emit('setUploadImages', imageUrls)
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
  /* let productImages = []
  if (event.moved) {
    for (let i = 0; i < imageUrls.value.length; i++) {
      if (imageUrls.value[i].order !== i) {
        isDisabled.value = false
        imageUrls.value[i].order = i
        //updateProduct(form.images[i].id, form.images[i])
        productImages.push(imageUrls.value[i])
      }
    }
    console.log('new order', productImages)
    isDisabled.value = false

    toast.add({
      severity: 'success',
      detail: t('notification.images_reorder'),
      life: 5000
    })
  } */
}

const showdeleteImageConfirmation = (id) => {
  imageId.value = id
  confirmDeleteImage()
}

const confirmDeleteImage = () => {
  confirm.require({
    message: t('modals.delete_item_text'),
    header: t('modals.delete_item_title'),
    acceptLabel: t('modals.yes_delete'),
    rejectLabel: t('modals.cancel'),
    accept: () => {
      confirmed.value = true
      imageUrls.value = []
      // uploadedImages.value = [];
    },
    reject: () => {
      cancelDeleteImage()
      console.log('canceled')
    }
  })
}

const cancelDeleteImage = () => {
  confirmed.value = false
}
</script>
