<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputTextarea from 'primevue/textarea'
import NikkSelect from '~/components/forms/NikkSelect.vue';
import type { HttpError } from '~/app/@types/common.interface'

definePageMeta({
  layout: 'vendors',
  middleware: ['sanctum:auth'],
})

const appStore = useAppStore()
const accountStore = useAccountStore()
const objStore = useProductStore()

const loading = ref(false)

try {
  await accountStore.getUsers()
} catch (error) {
  appStore.toastAPIError(error as HttpError)
}

const payments = ref([
  {
    user: 'John Doe',
    amount: 100.0,
    description: 'Payment for order #12345',
  },
  {
    user: 'Jane Smith',
    amount: 250.5,
    description: 'Refund for order #54321',
  },
])

const paymentDialogVisible = ref(false)
const newPayment = ref({
  user: '',
  amount: 0,
  description: '',
})

const openPaymentDialog = () => {
  newPayment.value = { user: '', amount: 0, description: '' }
  paymentDialogVisible.value = true
}

const closePaymentDialog = () => {
  paymentDialogVisible.value = false
}

const addPayment = async () => {
  if (newPayment.value.user && newPayment.value.amount > 0) {
    loading.value = true
    try {
      await objStore.createPayment({...newPayment.value, user_id: newPayment.value.user})
      appStore.toastSuccess('Payment added successfully')
    } catch (error) {
      appStore.toastAPIError(error as HttpError)
    } finally {
      loading.value = false
    }
    payments.value.push({ ...newPayment.value })
    closePaymentDialog()
  } else {
    console.error("new payment", newPayment.value)
    appStore.toastError('Please fill in all required fields')
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <h3 class="text-2xl font-normal">{{ $t('labels.dashboard') }}</h3>
      <span class="block text-slate-400 font-light">{{
        $t('features.vendors.dashboardDesc')
      }}</span>
    </div>

    <div class="py-6">
      <!-- Payments Table -->
      <PrimeCard>
        <template #title>
          <div class="flex">
            <div class="ml-auto">
              <PrimeButton
                :label="$t('labels.add')"
                @click="openPaymentDialog()"
              />
            </div>
          </div>
        </template>

        <template #content>
          <DataTable
            :value="payments"
            responsive-layout="scroll"
            class="text-sm"
          >
            <!-- User Column -->
            <Column field="user" header="User" />

            <!-- Amount Column -->
            <Column field="amount" header="Amount">
              <template #body="slotProps">
                <span class="text-sm font-semibold text-gray-600">
                  ${{ slotProps.data.amount }}
                  <!-- ${{ slotProps.data.amount.toFixed(2) }} -->
                </span>
              </template>
            </Column>

            <!-- Description Column -->
            <Column field="description" header="Description">
              <template #body="slotProps">
                <span
                  class="block truncate"
                  title="{{ slotProps.data.description }}"
                >
                  {{ slotProps.data.description }}
                </span>
              </template>
            </Column>
          </DataTable>
        </template>
      </PrimeCard>

      <!-- Add Payment Dialog -->
      <Dialog
        v-model:visible="paymentDialogVisible"
        header="Add Payment"
        :modal="true"
        :closable="true"
        class="w-1/3"
      >
        <div class="p-4 space-y-4">
          <div>
            <NikkSelect
              id="type"
              v-model="newPayment.user"
              error-help-label="errors.validation.requiredField"
              :is-error="false"
              label="labels.name"
              :options="accountStore.users"
              option-label="fullName"
              option-value="id"
            />
          </div>

          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700"
              >Amount</label
            >
            <InputText
              id="amount"
              v-model="newPayment.amount"
              type="number"
              class="w-full mt-1"
            />
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <InputTextarea
              id="description"
              v-model="newPayment.description"
              rows="3"
              class="w-full mt-1"
            />
          </div>

          <div class="flex justify-end space-x-4">
            <button
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              @click="closePaymentDialog"
            >
              Cancel
            </button>
            <PrimeButton
              :loading="loading"
              label="Add Payment"
              @click="addPayment"
            />
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.DataTable .p-datatable {
  font-size: 0.875rem;
}
</style>
