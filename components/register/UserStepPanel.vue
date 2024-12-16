<script setup lang="ts">
import { ref } from 'vue'

import NikkInputText from '@/components/forms/NikkInputText.vue'
import NikkInputPassword from '@/components/forms/NikkInputPassword.vue'
import { RadioButton } from 'primevue'
import User from '@/app/models/user.model'

const accountStore = useAccountStore()
const state = ref({
  user: ref(User.initEmpty()),
  password_confirmation: '',
})

function submit() {
  //FIXME: Validate form values
  const registerPayload = accountStore.registerPayload

  registerPayload.email = state.value.user.email
  registerPayload.firstName = state.value.user.firstName
  registerPayload.gender = state.value.user.gender
  registerPayload.lastName = state.value.user.lastName
  registerPayload.password = state.value.user.password
  registerPayload.phone = state.value.user.phone
  registerPayload.password_confirmation = state.value.password_confirmation

  accountStore.setRegisterPayload(registerPayload)
}
</script>

<template>
  <PrimeStepPanel v-slot="{ activateCallback }">
    <form class="py-3 flex flex-col gap-5">
      <NikkInputText
        id="first-name"
        v-model="state.user.firstName"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.firstName"
        type="text"
      />

      <NikkInputText
        id="last-name"
        v-model="state.user.lastName"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.lastName"
        type="text"
      />

      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="state.user.gender"
            input-id="gender-male"
            :value="User.GENDERS['MALE']"
          />
          <label for="gender-male">{{ $t('labels.male') }}</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="state.user.gender"
            input-id="gender-female"
            :value="User.GENDERS['FEMALE']"
          />
          <label for="gender-female">{{ $t('labels.female') }}</label>
        </div>
      </div>

      <NikkInputText
        id="email"
        v-model="state.user.email"
        error-help-label="errors.validation.email"
        :is-error="false"
        label="labels.email"
        type="email"
      />

      <NikkInputText
        id="phone"
        v-model="state.user.phone"
        error-help-label="errors.validation.requiredField"
        :is-error="false"
        label="labels.phone"
        type="tel"
      />

      <NikkInputPassword
        id="password"
        v-model="state.user.password"
        error-help-label="errors.validation.passwords.minCount"
        :is-error="false"
        label="labels.password"
        :toggle-mask="true"
      />

      <NikkInputPassword
        id="password-confirmation"
        v-model="state.password_confirmation"
        error-help-label="errors.validation.passwords.minCount"
        :is-error="false"
        label="labels.passwordConfirm"
        :toggle-mask="true"
      />

      <div class="py-6">
        <PrimeButton
          :label="$t('labels.next')"
          @click="
            () => {
              submit()
              activateCallback('2')
            }
          "
        />
      </div>
    </form>
  </PrimeStepPanel>
</template>
