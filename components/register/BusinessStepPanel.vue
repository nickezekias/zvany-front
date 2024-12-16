<script setup lang="ts">
import NikkInputText from '@/components/forms/NikkInputText.vue'
import Business from '~/app/models/business.model'

const accountStore = useAccountStore()
const emit = defineEmits(['submit'])

const business = ref(Business.initEmpty())

function submit() {
  const registerPayload = accountStore.registerPayload
  registerPayload.businessAddress = business.value.address
  registerPayload.businessDescription = business.value.description
  registerPayload.businessEmail = business.value.email
  registerPayload.businessName = business.value.name
  registerPayload.businessPhone = business.value.phone
  registerPayload.businessWebsite = business.value.website
  accountStore.setRegisterPayload(registerPayload)
  emit('submit')
}
</script>

<template>
  <PrimeStepPanel v-slot="{ activateCallback }">
    <form class="py-3 flex flex-col gap-5">
      <NikkInputText
        id="business-name"
        v-model="business.name"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.name"
        type="text"
      />

      <NikkInputText
        id="business-description"
        v-model="business.description"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.description"
        type="text"
      />

      <NikkInputText
        id="business-address"
        v-model="business.address"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.address"
        type="text"
      />

      <NikkInputText
        id="business-email"
        v-model="business.email"
        error-help-label="errors.validation.email"
        :is-error="false"
        label="labels.email"
        type="email"
      />

      <NikkInputText
        id="business-phone"
        v-model="business.phone"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.phone"
        type="tel"
      />

      <NikkInputText
        id="business-website"
        v-model="business.website"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.website"
        type="text"
      />

      <div class="py-6">
        <PrimeButton
          text
          plain
          class="mr-3"
          :label="$t('labels.previous')"
          @click="activateCallback('1')"
        />
        <PrimeButton
        type="button"
          :label="$t('labels.register')"
          :loading="accountStore.loading"
          @click="submit"
        />
      </div>
    </form>
  </PrimeStepPanel>
</template>
