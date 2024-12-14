<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { LoginRequest } from "@/app/@types/account.interface";

import NikkInputText from '@/components/forms/NikkInputText.vue'
import NikkInputPassword from '@/components/forms/NikkInputPassword.vue'

const objStore = useAccountStore()
const router = useRouter()
const { t } = useI18n()
const toast = useToast()

const loading: Ref<boolean> = ref(false);
const state: Ref<LoginRequest> = ref({
  email: "",
  password: "",
});

async function submit() {
  loading.value = true;
  await objStore.login(state.value);
  router.push('/dashboard')
  toast.add({ severity: "info", summary: t("messages.loading"), life: 3000 });
}
</script>

<template>
  <div class="w-full p-3 md:py-3 md:p-0 overflow-y-auto">
    <div
      class="border w-full md:w-4/12 2xl:w-3/12 p-2 md:p-8 rounded-lg mx-auto"
    >
      <form class="py-3 flex flex-col gap-5" @submit.prevent="submit">
        <NikkInputText
          id="email"
          v-model="state.email"
          error-help-label="errors.validation.email"
          :is-error="false"
          label="labels.email"
          type="email"
        />

        <NikkInputPassword
          id="password"
          v-model="state.password"
          error-help-label="errors.validation.passwords.minCount"
          :is-error="false"
          label="labels.password"
          :toggle-mask="true"
          :feedback="false"
        />

        <PrimeButton
          type="submit"
          :loading="loading"
          :label="$t('labels.login')"
        />
      </form>
    </div>
  </div>
</template>
