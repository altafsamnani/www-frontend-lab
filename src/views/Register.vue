<template>
  <AuthLayout :title="$t('register.title')" :subtitle="$t('register.subtitle')" scrollable>
    <vee-form
      class="flex flex-col gap-8"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <!-- Company Details Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-building text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('register.companyDetails') }}
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="companyName" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.companyName') }} *
            </label>
            <vee-field
              as="InputText"
              name="companyName"
              id="companyName"
              class="w-full"
              v-model="form.companyName"
              :placeholder="$t('register.companyNamePlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="companyName" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="companyEmail" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.companyEmail') }} *
            </label>
            <vee-field
              as="InputText"
              name="companyEmail"
              id="companyEmail"
              type="email"
              class="w-full"
              v-model="form.companyEmail"
              :placeholder="$t('register.companyEmailPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="companyEmail" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="kvk" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.kvk') }}
            </label>
            <vee-field
              as="InputText"
              name="kvk"
              id="kvk"
              class="w-full"
              v-model="form.kvk"
              :placeholder="$t('register.kvkPlaceholder')"
              maxlength="12"
            />
            <ErrorMessage class="error text-sm text-red-500" name="kvk" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="taxId" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.taxId') }}
            </label>
            <vee-field
              as="InputText"
              name="taxId"
              id="taxId"
              class="w-full"
              v-model="form.taxId"
              :placeholder="$t('register.taxIdPlaceholder')"
              maxlength="14"
            />
            <ErrorMessage class="error text-sm text-red-500" name="taxId" />
          </div>
        </div>
      </div>

      <!-- Contact Details Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-user text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('register.contactDetails') }}
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="firstname" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.firstName') }} *
            </label>
            <vee-field
              as="InputText"
              name="firstname"
              id="firstname"
              class="w-full"
              v-model="form.firstname"
              :placeholder="$t('register.firstNamePlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="firstname" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="lastname" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.lastName') }} *
            </label>
            <vee-field
              as="InputText"
              name="lastname"
              id="lastname"
              class="w-full"
              v-model="form.lastname"
              :placeholder="$t('register.lastNamePlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="lastname" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="position" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.position') }} *
            </label>
            <vee-field
              as="InputText"
              name="position"
              id="position"
              class="w-full"
              v-model="form.position"
              :placeholder="$t('register.positionPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="position" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="email" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.email') }} *
            </label>
            <vee-field
              as="InputText"
              name="email"
              id="email"
              type="email"
              class="w-full"
              v-model="form.email"
              :placeholder="$t('register.emailPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="email" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="phone" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.phone') }}
            </label>
            <vee-field
              as="InputText"
              name="phone"
              id="phone"
              class="w-full"
              v-model="form.phone"
              :placeholder="$t('register.phonePlaceholder')"
              maxlength="20"
            />
            <ErrorMessage class="error text-sm text-red-500" name="phone" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="mobile" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.mobile') }}
            </label>
            <vee-field
              as="InputText"
              name="mobile"
              id="mobile"
              class="w-full"
              v-model="form.mobile"
              :placeholder="$t('register.mobilePlaceholder')"
              maxlength="20"
            />
            <ErrorMessage class="error text-sm text-red-500" name="mobile" />
          </div>
        </div>
      </div>

      <!-- Address Details Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-map-marker text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('register.addressDetails') }}
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 flex flex-col gap-2 md:col-span-6">
            <label for="street" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.street') }} *
            </label>
            <vee-field
              as="InputText"
              name="street"
              id="street"
              class="w-full"
              v-model="form.street"
              :placeholder="$t('register.streetPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="street" />
          </div>

          <div class="col-span-6 flex flex-col gap-2 md:col-span-3">
            <label for="number" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.number') }} *
            </label>
            <vee-field
              as="InputText"
              name="number"
              id="number"
              class="w-full"
              v-model="form.number"
              :placeholder="$t('register.numberPlaceholder')"
              maxlength="6"
            />
            <ErrorMessage class="error text-sm text-red-500" name="number" />
          </div>

          <div class="col-span-6 flex flex-col gap-2 md:col-span-3">
            <label for="numberExt" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.numberExt') }}
            </label>
            <vee-field
              as="InputText"
              name="numberExt"
              id="numberExt"
              class="w-full"
              v-model="form.numberExt"
              :placeholder="$t('register.numberExtPlaceholder')"
              maxlength="6"
            />
            <ErrorMessage class="error text-sm text-red-500" name="numberExt" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
            <label for="zipcode" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.zipcode') }} *
            </label>
            <vee-field
              as="InputText"
              name="zipcode"
              id="zipcode"
              class="w-full"
              v-model="form.zipcode"
              :placeholder="$t('register.zipcodePlaceholder')"
              maxlength="7"
            />
            <ErrorMessage class="error text-sm text-red-500" name="zipcode" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
            <label for="city" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.city') }} *
            </label>
            <vee-field
              as="InputText"
              name="city"
              id="city"
              class="w-full"
              v-model="form.city"
              :placeholder="$t('register.cityPlaceholder')"
              maxlength="255"
            />
            <ErrorMessage class="error text-sm text-red-500" name="city" />
          </div>

          <div class="col-span-12 flex flex-col gap-2 md:col-span-4">
            <label for="country" class="text-surface-900 dark:text-surface-0 font-medium">
              {{ $t('register.country') }} *
            </label>
            <vee-field name="country" v-model="form.country" v-slot="{ value, setValue }">
              <CountrySelect
                :model-value="value || 'NL'"
                @update:model-value="setValue"
                :placeholder="$t('register.countryPlaceholder')"
                class="w-full"
              />
            </vee-field>
            <ErrorMessage class="error text-sm text-red-500" name="country" />
          </div>
        </div>
      </div>

      <!-- Additional Information Section -->
      <div class="flex flex-col gap-6">
        <div
          class="border-surface-200 dark:border-surface-700 flex items-center gap-3 border-b pb-3"
        >
          <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <i class="pi pi-info-circle text-primary text-lg"></i>
          </div>
          <h2 class="text-surface-900 dark:text-surface-0 text-xl font-semibold">
            {{ $t('register.additionalInfo') }}
          </h2>
        </div>

        <div class="flex flex-col gap-2">
          <label for="comments" class="text-surface-900 dark:text-surface-0 font-medium">
            {{ $t('register.comments') }}
          </label>
          <vee-field
            as="Textarea"
            name="comments"
            id="comments"
            class="w-full"
            rows="4"
            v-model="form.comments"
            :placeholder="$t('register.commentsPlaceholder')"
            maxlength="255"
          />
          <ErrorMessage class="error text-sm text-red-500" name="comments" />
        </div>
      </div>

      <!-- Form Actions -->
      <div class="border-surface-200 dark:border-surface-700 flex flex-col gap-4 border-t pt-4">
        <Button
          type="submit"
          :loading="submitting"
          :label="$t('register.submit')"
          class="w-fit !px-12"
          :disabled="submitting"
        />

        <div class="border-surface-200 dark:border-surface-700 border-t pt-4 text-center">
          <p class="text-surface-600 dark:text-surface-400">
            {{ $t('register.alreadyHaveAccount') }}
            <router-link to="/login" class="text-primary ml-1 font-medium hover:underline">
              {{ $t('register.loginHere') }}
            </router-link>
          </p>
        </div>
      </div>
    </vee-form>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useNotifyStore, NotificationType } from '@/stores/notify'
  import { registerClient } from '@/http/applications'
  import type { ApplicationInput } from '@/types/Application'
  import AuthLayout from '@/layouts/AuthLayout.vue'
  import Button from '@/volt/Button.vue'
  import CountrySelect from '@/components/forms/CountrySelect.vue'

  const { t } = useI18n()
  const router = useRouter()
  const notifyStore = useNotifyStore()

  const submitting = ref(false)

  const validationSchema = reactive({
    companyName: 'required|min:2|max:255',
    companyEmail: 'required|email|max:255',
    firstname: 'required|min:2|max:255',
    lastname: 'required|min:2|max:255',
    position: 'required|min:2|max:255',
    email: 'required|email|max:255',
    phone: 'phone|max:255',
    mobile: 'phone|max:255',
    street: 'required|min:2|max:255',
    number: 'required|min:1|max:6',
    numberExt: 'max:6',
    zipcode: 'required|min:4|max:7',
    city: 'required|min:2|max:255',
    country: 'required|max:255',
    kvk: 'max:12',
    taxId: 'max:14',
    comments: 'max:255',
  })

  const form = reactive<ApplicationInput>({
    type: 'create',
    companyName: '',
    companyEmail: '',
    firstname: '',
    lastname: '',
    position: '',
    email: '',
    phone: '',
    mobile: '',
    street: '',
    number: '',
    numberExt: '',
    zipcode: '',
    city: '',
    country: 'NL',
    kvk: '',
    taxId: '',
    comments: '',
  })

  const handleSubmit = async () => {
    submitting.value = true
    try {
      await registerClient(form)
      notifyStore.notify(t('register.messages.submitSuccess'), NotificationType.Success)
      router.push('/login')
    } catch (error) {
      notifyStore.notify(t('register.messages.submitError'), NotificationType.Error)
    } finally {
      submitting.value = false
    }
  }
</script>
