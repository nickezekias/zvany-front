<script setup lang="ts">
import { ref } from 'vue'
import Product from '~/app/models/product.model'
import productTypes from '@/assets/data/productTypes.json'

import NikkInputText from '@/components/forms/NikkInputText.vue'
import NikkInputNumber from '@/components/forms/NikkInputNumber.vue'
import NikkSelect from '~/components/forms/NikkSelect.vue';
import type { HttpError } from '~/app/@types/common.interface';

definePageMeta({
  layout: 'vendors',
  middleware: ['sanctum:auth'],
})

const loading = ref(false)
const obj = ref(Product.initEmpty())
const appStore = useAppStore()
const accountStore = useAccountStore()
const objStore = useProductStore()

async function submit() {
  loading.value = true
  try {
    const isFormValid = true
    if (isFormValid) {
      await objStore.create(obj.value, `${accountStore.user?.value?.business?.id}`)
      appStore.toastSuccess('messages.productCreated')
      navigateTo('/vendors/products')
    }
  } catch (error) {
    console.error(error)
    appStore.toastAPIError(error as HttpError)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <h3 class="text-2xl font-normal">{{ $t('labels.productCreate') }}</h3>
      <span class="block text-slate-400 font-light">{{
        $t('features.vendors.productCreateDesc')
      }}</span>
    </div>

    <div class="py-6">
      <form @submit.prevent="submit">
        <PrimeCard>
          <template #title/>
          <template #content>
            <div>
              <div class="flex gap-4">
                <div class="w-full lg:w-4/12">
                  <img
                  src="https://via.placeholder.com/100"
                  :alt="$t('labels.productImage')"
                  class="w-full object-cover rounded-md"
                >
                </div>
  
                <div class="w-full lg:w-8/12 gap-4">
                  <NikkInputText
                    id="name"
                    v-model="obj.name"
                    class="mb-4"
                    error-help-label="errors.validation.requiredField"
                    :is-error="false"
                    label="labels.name"
                    type="text"
                  />
  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NikkInputText
                      id="sku"
                      v-model="obj.sku"
                      error-help-label="errors.validation.requiredField"
                      :is-error="false"
                      label="labels.sku"
                      type="text"
                    />
  
                    <NikkInputText
                      id="barcode"
                      v-model="obj.barcode"
                      error-help-label="errors.validation.requiredField"
                      :is-error="false"
                      label="labels.barcode"
                      type="text"
                    />
  
                    <NikkSelect
                      id="type"
                      v-model="obj.type"
                      error-help-label="errors.validation.requiredField"
                      :is-error="false"
                      label="labels.productType"
                      :options="productTypes"
                    />
  
                    <NikkInputText
                      id="brand"
                      v-model="obj.brand"
                      error-help-label="errors.validation.requiredField"
                      :is-error="false"
                      label="labels.brand"
                      type="text"
                    />

                    <!-- FIXME: Create a select Object for categories that allows to custom add categories -->
                    <NikkInputText
                      id="categories"
                      v-model="obj.categories"
                      error-help-label="errors.validation.requiredField"
                      :is-error="false"
                      label="labels.categories"
                      type="text"
                    />

                    <NikkInputNumber
                      id="quantity"
                      v-model="obj.quantity"
                      error-help-label="errors.validation.requiredField"
                      :is-error="false"
                      label="labels.quantity"
                      :min="0"
                      :show-buttons="true"
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-end pt-6 gap-4">
                <NuxtLink to="/vendors/products">
                  <PrimeButton text :label="$t('labels.cancel')" />
                </NuxtLink>
                <PrimeButton type="submit" :loading="loading" :label="$t('labels.save')" />
              </div>
            </div>
          </template>
        </PrimeCard>
      </form>
    </div>
  </div>
</template>
