<script setup lang="ts">
import Stepper from 'primevue/stepper';
import Step from 'primevue/step';
import StepItem from 'primevue/stepitem';

import UserStepPanel from '@/components/register/UserStepPanel.vue'
import BusinessStepPanel from '@/components/register/BusinessStepPanel.vue';
import type { HttpError } from '~/app/@types/common.interface';
import User from '~/app/models/user.model';

const accountStore = useAccountStore()
const appStore = useAppStore()
const router = useRouter()

async function submit() {
  accountStore.setLoading(true)

  try {
    const isFormValid = true
    if (isFormValid) {

      const registerPayload = accountStore.registerPayload
      //FIXME: Create different register views for vendors, admin & customers
      registerPayload.accountType = User.ROLES_LIST['VENDOR']

      await accountStore.register(accountStore.registerPayload)
      appStore.toastSuccess('labels.operationSuccess', 'features.account.registerSuccessMessage')
      router.push(accountStore.getPostAuthRoute())
    }
  } catch (e: unknown) {
    console.error(e)
    appStore.toastAPIError(e as HttpError)
  } finally {
    accountStore.setLoading(false)
  }
}
</script>
<template>
  <div class="w-full p-3 md:py-3 md:p-0 overflow-y-auto">
    <div class="border w-full md:w-4/12 2xl:w-3/12 p-2 md:p-8 rounded-lg mx-auto">
      <Stepper value="1">
        <StepItem value="1">
          <Step>{{ $t('labels.user') }}</Step>
          <UserStepPanel class="dark:bg-transparent" />
        </StepItem>

        <StepItem value="2">
          <Step>{{ $t('labels.business') }}</Step>
          <BusinessStepPanel class="dark:bg-transparent" @submit="submit"/>
        </StepItem>
      </Stepper>
    </div>
  </div>
</template>
