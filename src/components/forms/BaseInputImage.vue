<template>
  <div>
    <div :class="props.width">
      <!-- <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
        >Cover photo</label
      > -->
      <div
        class="flex items-center justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-zinc-900/20 dark:border-white/20"
      >
        <div class="text-center">
          <span
            v-if="!previewImage"
            class="mx-auto text-3xl text-zinc-900/40 dark:text-white/40 pi pi-image"
            aria-hidden="true"
          />
          <div
            v-if="previewImage"
            class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${previewImage})` }"
            @click="selectImage"
          ></div>
          <div
            :class="{ hidden: previewImage }"
            class="mt-4 text-sm leading-6 text-zinc-900/40 dark:text-white/40"
          >
            <label
              for="file-upload"
              class="relative font-semibold rounded-md cursor-pointer text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
            >
              <span>{{ $t('forms.select_image') }}</span>
              <input
                id="file-upload"
                name="file-upload"
                ref="fileInputRef"
                type="file"
                @input="pickFile"
                class="sr-only"
              />
            </label>
            <p class="pl-1">{{ $t('forms.or_drag_and_drop') }}</p>
          </div>
          <p v-if="previewImage" class="py-2 text-xs leading-5">
            {{ $t('forms.click_to_change_image') }}
          </p>
          <p v-else class="py-2 text-xs leading-5">PNG, JPG {{ $t('forms.up_to') }} 10MB</p>
        </div>
      </div>
    </div>

    <!-- <Button
      @click="uploadImage"
      severity="secondary"
      :disabled="!previewImage"
      label="Upload Image"
    ></Button> -->

  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useImagesStore } from '@/stores/images'

const props = defineProps({
  type: {
    type: String
  },
  width: {
    type: String,
    default: 'col-span-full'
  }
})
const emit = defineEmits(['setImage'])
const fileInputRef = ref(null)
const file = ref(null)
const previewImage = ref(null)
const isUploading = ref(false)
const imagesStore = useImagesStore()
const { storeImages } = imagesStore
const { images } = storeToRefs(imagesStore)

const selectImage = () => {
  fileInputRef.value.click()
}

const pickFileOld = () => {
  const input = fileInputRef.value
  const file = input.files[0]
  console.log('file', file);

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const pickFile = () => { 
  const input = fileInputRef.value
  file.value = input.files[0]
  if (file.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file.value)
  }
}

const uploadImage = async () => {
  if (file.value) {
    isUploading.value = true
    const formData = new FormData()
    formData.append('name', file.value);
    formData.append('image_collection_id', '1');
    formData.append('folder', prop.type);
  /*  axios.post('images', formData, { 
      headers: { 
        Accept: "application/json", 
        "X-Requested-With": "XMLHttpRequest", 
        "Content-Type": "multipart/form-data" 
      }
    }) */
    await storeImages(formData)

    emit('setImage', images.value)

    isUploading.value = false
  }
}
</script>

<style scoped>
.imagePreviewWrapper {
  width: 250px;
  height: 200px;
  /* display: block; */
  cursor: pointer;
  margin: 1px 0px;
  background-size: cover;
  background-position: center center;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
