<script setup lang="ts">
import NikkInputText from '@/components/forms/NikkInputText.vue'
import NikkSelect from '~/components/forms/NikkSelect.vue'

const state = ref({
  address: '',
  apartment: '',
  city: '',
  country: '',
  firstName: '',
  lastName: '',
})
</script>

<template>
  <form class="flex flex-col gap-4">
    <NikkSelect
      id="type"
      v-model="state.country"
      error-help-label="errors.validation.requiredField"
      :is-error="false"
      label="labels.country"
      :options="['France', 'Gabon', 'Rwanda', 'USA']"
    />
    <div class="flex gap-4">
      <NikkInputText
        id="first-name"
        v-model="state.firstName"
        class="w-full"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.firstName"
        type="text"
      />

      <NikkInputText
        id="last-name"
        v-model="state.lastName"
        class="w-full"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.lastName"
        type="text"
      />
    </div>

    <NikkInputText
      id="address"
      v-model="state.address"
      error-help-label="errors.validation.requiredField"
      :is-error="false"
      label="labels.address"
      type="text"
    />

    <NikkInputText
      id="apartment-or-room-number"
      v-model="state.apartment"
      error-help-label="errors.validation.requiredField"
      :is-error="false"
      label="labels.apartment"
      type="text"
    />

    <div class="flex gap-4">
      <NikkSelect
        id="type"
        v-model="state.city"
        class="w-full"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.city"
        :options="['Kigali', 'Libreville', 'Sacramento']"
      />
    </div>
  </form>
</template>
