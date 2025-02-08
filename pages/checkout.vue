<script setup lang="ts">
import DeliveryAddressForm from '@/components/account/DeliveryAddressForm.vue'
import NikkInputText from '@/components/forms/NikkInputText.vue'

const email = ref('')
</script>

<template>
  <div class="flex gap-8 px-12 lg:px-24 py-16">
    <div class="w-1/2 flex flex-col gap-6">
      <div>
        <span class="text-bold text-xl">{{ $t('labels.contact') }}</span>
        <NikkInputText
          id="name"
          v-model="email"
          class="mt-4 mb-2"
          error-help-label="errors.validation.requiredField"
          :is-error="false"
          label="labels.email"
          type="email"
        />
        <span>{{ $t('labels.emailNewsAndOffers') }}</span>
      </div>

      <div class="mt-5">
        <span class="text-bold text-xl">{{ $t('labels.delivery') }}</span>
        <DeliveryAddressForm class="mt-6 mb-2" />
        <span class="mt-4">{{ $t('labels.emailNewsAndOffers') }}</span>
      </div>
    </div>

  </div>
</template>
