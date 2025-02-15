<script setup lang="ts">
// import Obj from '~/app/models/product.model'
import type { HttpError } from '~/app/@types/common.interface'

import NikkInputNumber from '@/components/forms/NikkInputNumber.vue'

const appStore = useAppStore()
const objStore = useProductStore()
const route = useRoute()

const id = route.query.id
const loading = ref(false)
const productQuantity = ref(1)
try {
  if (id) {
    await objStore.get(`${id}`)
  }
} catch (e) {
  appStore.toastAPIError(e as HttpError)
}
</script>

<template>
  <div class="flex gap-8 px-12 lg:px-24 py-16">
    <div class="w-4/12">
      <div class="h-96 bg-gray-50" />
    </div>
    <div class="w-6/12 flex flex-col gap-4">
      <h1 class="product-name text-2xl text-primary font-medium">
        {{ objStore.obj?.name }}
      </h1>
      <span>
        {{ $t('labels.share') }}
        <i class="pi pi-facebook ms-5" />
        <i class="pi pi-instagram ms-5" />
        <i class="pi pi-twitter ms-5" />
      </span>
      <span class="text-4xl font-black">{{ objStore.obj?.price }}</span>
      <span>
        <span class="text-gray-300">{{ $t('labels.availability') }}</span>
        <span class="font-normal ms-4">{{ objStore.obj?.quantity }}</span>
      </span>
      <span class="text-primary text-sm">
        {{ $t('features.product.productDetail.availableForFreeShipping') }}
      </span>

      <h6>
        {{ objStore.obj?.description }}
      </h6>

      <div class="flex justify-between gap-4">
        <NikkInputNumber
          id="quantity"
          v-model="productQuantity"
          error-help-label="errors.validation.requiredField"
          :is-error="false"
          label="labels.quantity"
          :min="1"
          :show-buttons="true"
          class="w-36"
        />

        <div class="flex-grow">
          <PrimeButton
            disabled
            :loading="loading"
            :label="$t('labels.addToCart')"
            fluid
            rounded
          />
        </div>

        <PrimeButton outlined rounded icon="pi pi-heart" />
      </div>

      <div class="flex items-center gap-2">
        <PrimeCheckbox input-id="terms-conditions" name="tc" value="1" />
        <label for="terms-conditions">
          {{ $t('labels.agreeTermsConditions') }}
        </label>
      </div>

      <!-- <PrimeButton
        fluid
        :loading="loading"
        :label="$t('labels.buyNow')"
        rounded
        severity="contrast"
        @click="navigateTo('/checkout')"
      /> -->

      <PrimeButton
        fluid
        :loading="loading"
        :label="$t('labels.payWithPaypal')"
        rounded
        severity="contrast"
      />

      <span>
        <span class="text-gray-50 text-sm">{{ $t('labels.categories') }}</span>
        <i class="ms-5">{{ objStore.obj?.categories }}</i>
      </span>

      <!-- <span>
        <span class="text-gray-200">{{ $t('label.tag', 2) }}</span>
        <i class="ms-5">Phone, Mobile, iPhone, Electronics</i>
      </span> -->

      <span>
        <span class="text-gray-200 text-sm">{{ $t('labels.vendor') }}</span>
        <span class="ms-5 font-medium text-primary">IgnisLab</span>
      </span>
    </div>

    <div class="w-[16rem] flex-shrink flex flex-col gap-4">
      <div class="some-zen-card relative p-4 py-12 border">
        <div class="absolute top-0 left-0 h-100 w-100 bg-black opacity-45" />

        <div class="flex flex-col items-center h-100 w-100 text-white">
          <span class="font-thin"> Discover </span>
          <span class="text-2xl font-bold"> Zen Shopping </span>

          <div class="flex justify-between w-full mt-8">
            <PrimeButton
              size="small"
              rounded
              severity="contrast"
              :label="$t('labels.shopNow')"
            />
            <PrimeButton
              size="small"
              text
              rounded
              severity="contrast"
              :label="$t('labels.learnMore')"
            />
          </div>
        </div>
      </div>

      <div class="zvany-vintage-card p-4 py-6 border">
        <div class="absolute top-0 left-0 h-100 w-100 bg-black opacity-45" />

        <div class="flex flex-col items-center h-100 w-100 text-white">
          <span class="text-2xl font-bold"> Zvany Vinted </span>

          <div
            class="flex justify-center items-center p-8 rounded-full mt-6 bg-green-500"
          >
            <span class="pi pi-camera text-6xl" />
          </div>

          <span class="mt-4 font-light text-center">
            Buy and sell your used items here
          </span>

          <div class="flex justify-between w-full mt-8">
            <PrimeButton
              size="small"
              rounded
              severity="contrast"
              :label="$t('labels.shopNow')"
              fluid
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
