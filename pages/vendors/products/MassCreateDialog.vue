<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { HttpError } from '~/app/@types/common.interface'

import productTypes from '@/assets/data/productTypes.json'

import Obj from '~/app/models/product.model'
import NikkInputNumber from '~/components/forms/NikkInputNumber.vue'
import NikkInputText from '~/components/forms/NikkInputText.vue'
import NikkSelect from '~/components/forms/NikkSelect.vue'

const accountStore = useAccountStore()
const appStore = useAppStore()
const emit = defineEmits(['close', 'massCreated'])
const model = defineModel() as Ref<boolean | undefined>
const objStore = useProductStore()
const { t } = useI18n()

const componentLoading = ref(false)
const editingRows = ref([])
const loading = ref(false)
const objects: Ref<Array<Obj>> = ref([])
const rowCount = ref(1)

onMounted(async () => {
  componentLoading.value = true
  fillTableRows(rowCount.value)
  componentLoading.value = false
})

watch(rowCount, (oldVal, newVal) => {
  if (newVal && newVal > oldVal) {
    fillTableRows(newVal-oldVal)
  }
}, { deep: true, immediate: true })

function clearRows() {
  objects.value = []
  fillTableRows(rowCount.value)
}

function closeDialog() {
  emit('close')
  clearRows()
}

function fillTableRows(numberOfRows: number) {
  for (let i = 0; i < numberOfRows; i++) {
    const obj = Obj.initEmpty()
    obj.id = `${i}`
    objects.value.push(obj)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRowEditSave = (event: any) => {
  const { newData, index } = event

  objects.value[index] = newData
}

function removeEmptyObjects(payload: Array<Obj>): Array<Obj> {
  return payload.filter((val) => {
    return (
      val.name != '' && val.type != '' && val.sku != '' && val.barcode != ''
    )
  })
}

async function submit() {
  loading.value = true
  try {
    const payload = removeEmptyObjects(objects.value)

    const data = await objStore.massCreate(
      payload,
      `${accountStore.user?.value?.business?.id}`
    )
    appStore.toastSuccess(t('messages.productCreated', 2))
    navigateTo('/vendors/products')

    emit('massCreated', data)
    closeDialog()
  } catch (error) {
    appStore.toastAPIError(error as HttpError)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PrimeDrawer
    v-model:visible="model"
    class="overflow-y-auto pb-4"
    :dismissable="false"
    position="full"
  >
    <template #container>
      <div v-if="componentLoading" class="h-full w-full">
        <PrimeProgressBar mode="indeterminate" style="height: 4px" />
      </div>

      <!-- MAIN -->
      <div v-else class="content w-full px-4 pt-4">
        <!-- HEADER -->
        <div class="mb-5 flex">
          <span class="text-xl md:text-3xl font-bold">{{
            t('labels.massCreateProducts')
          }}</span>
          <NikkInputNumber
            id="row-count"
            v-model="rowCount"
            mode="decimal"
            class="ml-auto"
            :show-buttons="true"
            :is-error="false"
            error-help-label=""
            label=""
            @input="() => { fillTableRows(rowCount); console.log(rowCount) }"
          />
        </div>

        <!-- CONTENT -->
        <form class="m-0 w-full">
          <PrimeDataTable
            v-model:editing-rows="editingRows"
            :value="objects"
            edit-mode="row"
            data-key="id"
            :pt="{
              table: { style: 'min-width: 50rem' },
              column: {
                bodycell: ({ state }: any) => ({
                  style: state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem'
                })
              }
            }"
            @row-edit-save="onRowEditSave"
          >
            <PrimeColumn
              field="name"
              :header="$t('labels.name')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkInputText
                  id="mpc-name"
                  v-model="data[field]"
                  :is-error="false"
                  label=""
                  error-help-label=""
                  type="text"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              field="sku"
              :header="$t('labels.sku')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkInputText
                  id="mpc-sku"
                  v-model="data[field]"
                  :is-error="false"
                  label=""
                  error-help-label=""
                  type="text"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              field="barcode"
              :header="$t('labels.barcode')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkInputText
                  id="mpc-barcode"
                  v-model="data[field]"
                  :is-error="false"
                  label=""
                  error-help-label=""
                  type="text"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              field="type"
              :header="$t('labels.productType')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkSelect
                  id="type"
                  v-model="data[field]"
                  error-help-label="errors.validation.requiredField"
                  :is-error="false"
                  label="labels.productType"
                  :options="productTypes"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              field="brand"
              :header="$t('labels.brand')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkInputText
                  id="mpc-brand"
                  v-model="data[field]"
                  :is-error="false"
                  label=""
                  error-help-label=""
                  type="text"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              field="categories"
              :header="$t('labels.categories')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkInputText
                  id="mpc-categories"
                  v-model="data[field]"
                  :is-error="false"
                  label=""
                  error-help-label=""
                  type="text"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              field="quantity"
              :header="$t('labels.quantity')"
              style="min-width: 20%"
            >
              <template #editor="{ data, field }">
                <NikkInputNumber
                  id="mpc-quantity"
                  v-model="data[field]"
                  error-help-label=""
                  :is-error="false"
                  label=""
                  :min="0"
                  :show-buttons="true"
                />
              </template>
            </PrimeColumn>

            <PrimeColumn
              :row-editor="true"
              style="width: 10%; min-width: 8rem"
              body-style="text-align:center"
            />
          </PrimeDataTable>
        </form>

        <!-- FOOTER -->
        <footer id="footer" class="flex gap-4 shadow-4">
          <PrimeButton
            size="large"
            severity="secondary"
            :label="$t('labels.cancel')"
            @click="closeDialog"
          />
          <PrimeButton
            size="large"
            :label="$t('labels.save')"
            :loading="loading"
            @click="submit"
          />
        </footer>
      </div>
    </template>
  </PrimeDrawer>
</template>

<style lang="css" scoped>
table.mass-create-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}
th,
td {
  text-align: left;
  padding: 0.3rem;
  border: 1px solid #ddd;
}
td {
  padding: 0 0.2rem;
}

#footer {
  align-items: center;
  background-color: inherit;
  border-top: 1px solid inherit;
  padding: 0.5rem 1rem;
  bottom: 0;
  display: flex;
  justify-content: end;
  left: 0;
  position: fixed;
  width: 100%;
}
</style>
