<script setup lang="ts">
import HeroComponent from './HeroComponent.vue';
import DefaultProductCard from '~/components/products/DefaultCard.vue';

import type { HttpError } from '~/app/@types/common.interface'

const objStore = useProductStore()
const appStore = useAppStore()

try {
  await objStore.getAll()
} catch (e) {
  appStore.toastAPIError(e as HttpError)
}
</script>

<template>
  <div class="flex flex-col gap-24 px-12 lg:px-24 py-16">
    <HeroComponent />

    <div class="flex gap-8 product-section">
      <div class="w-[14rem]">
        <div class="zvany-vintage-card p-4 py-6 border">
          <div class="absolute top-0 left-0 h-100 w-100 bg-black opacity-45" />

          <div class="flex flex-col items-center h-100 w-100 text-white">
            <span class="text-2xl font-bold"> Zvany Vinted </span>

            <div class="flex justify-center items-center p-8 rounded-full mt-6 bg-green-500">
              <span class="pi pi-camera text-6xl"/>
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
      <div class="flex-grow">
        <PrimeDivider class="mt-0" />
        <h3 class="text-xl font-medium mb-4">Featured Phones</h3>
        <div class="flex-grow flex gap-6">
          <NuxtLink v-for="obj in objStore.objects" :key="obj.id" class="w-full" :to="`/p?id=${obj.id}`">
            <DefaultProductCard :obj="obj" />
          </NuxtLink>
        </div>
        <PrimeDivider class="mb-0" />
      </div>
    </div>
  </div>
</template>
