<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { HttpError } from '~/app/@types/common.interface'
import { useI18n } from 'vue-i18n'
import DeleteDialog from '~/components/crud/DeleteDialog.vue'

definePageMeta({
  layout: 'vendors',
  pageTransition: false,
  middleware: ['sanctum:auth'],
})

const objStore = useProductStore()
const appStore = useAppStore()
const { t } = useI18n()

const activeRowId = ref('')
const isDeleteDialog = ref(false)
const isDeleteDialogLoading = ref(false)
const menu = ref()
const rowActionsItems = ref([
  {
    label: t('labels.action', 2),
    items: [
      {
        label: t('labels.edit'),
        icon: 'pi pi-pencil',
        route: `/vendors/products/update`
      },
      {
        label: t('labels.delete'),
        icon: 'pi pi-trash',
        command: () => { isDeleteDialog.value = true; }
      },
    ],
  },
])
const selectedObjects = ref([])

try {
  await objStore.getAll()
} catch (e) {
  appStore.toastAPIError(e as HttpError)
}

function closeDeleteDialog() {
  isDeleteDialogLoading.value = false
  isDeleteDialog.value = false
}

async function onConfirmDelete() {
  isDeleteDialogLoading.value = true
  try {
    await objStore.destroy(activeRowId.value)
    isDeleteDialog.value = false
    appStore.toastSuccess('features.product.deleteSuccessMessage')
  } catch(e) {
    appStore.toastAPIError(e as HttpError)
  } finally {
    isDeleteDialogLoading.value = false
  }
}

const toggle = (event: Event, id: string) => {
  activeRowId.value = id
  menu.value.toggle(event)
}

/* const products = ref([
  {
    image: 'https://via.placeholder.com/100',
    name: 'Wireless Headphones',
    sku: 'WH12345',
    category: 'Audio',
    brand: 'TechBrand',
    type: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
    cost: 120.0,
    price: 199.99,
    status: 'in stock',
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'Smartphone',
    sku: 'SP67890',
    category: 'Mobile',
    brand: 'PhoneCo',
    type: 'Electronics',
    description: 'Latest smartphone with cutting-edge features.',
    cost: 750.0,
    price: 999.99,
    status: 'out of stock',
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'Coffee Maker',
    sku: 'CM54321',
    category: 'Kitchen Appliances',
    brand: 'HomeBrew',
    type: 'Home Appliance',
    description: 'Automatic coffee maker with customizable brew settings.',
    cost: 50.0,
    price: 79.99,
    status: 'backordered',
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'Gaming Chair',
    sku: 'GC09876',
    category: 'Furniture',
    brand: 'GamerSeat',
    type: 'Furniture',
    description: 'Ergonomic gaming chair with lumbar support.',
    cost: 100.0,
    price: 149.99,
    status: 'in stock',
  },
]) */
/**
 * Get the CSS class for the status tag.
 * @param {string} status - The status of the product (e.g., in stock, out of stock, backordered)
 * @return {string} - The class to style the tag.
 */
const getStatusClass = (status: string) => {
  switch (status) {
    case 'in stock':
      return 'bg-green-100 text-green-800'
    case 'out of stock':
      return 'bg-red-100 text-red-800'
    case 'backordered':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <h3 class="text-2xl font-normal">{{ $t('labels.product', 2) }}</h3>
      <span class="block text-slate-400 font-light">{{
        $t('features.vendors.productInventoryDesc')
      }}</span>
    </div>

    <div class="py-6">
      <PrimeCard class="shadow-none">
        <template #title>
          <div class="flex">
            <div class="ml-auto">
              <NuxtLink to="/vendors/products/create">
                <PrimeButton icon="pi pi-plus" :label="$t('labels.add')" />
              </NuxtLink>
            </div>
          </div>
        </template>
        <template #content>
          <DataTable
            v-model:selection="selectedObjects"
            :value="objStore.objects"
            data-key="id"
            class="shadow-none rounded-lg text-sm border-none"
            scrollable
            table-style="min-width: 50rem"
            scroll-height="flex"
          >
            <Column selection-mode="multiple" header-style="width: 3rem" />

            <!-- Image Column -->
            <Column field="image" header="Image" style="width: 40px">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.image"
                  alt="Product Image"
                  class="w-6 h-6 object-cover rounded-md"
                >
              </template>
            </Column>

            <!-- Name Column -->
            <Column field="name" header="Name" class="max-w-[12rem]">
              <template #body="slotProps">
                <span class="block truncate" :title="slotProps.data.name">
                  {{ slotProps.data.name }}
                </span>
              </template>
            </Column>

            <!-- SKU Column -->
            <Column field="sku" header="SKU" class="min-w-[10rem]" />

            <!-- Category Column -->
            <Column field="categories" header="Category" />

            <!-- Brand Column -->
            <Column field="brand" header="Brand" />

            <!-- Type Column -->
            <Column field="type" header="Type" />

            <!-- Description Column -->
            <!-- Description Column -->
            <Column
              field="description"
              header="Description"
              class="max-w-[12rem]"
            >
              <template #body="slotProps">
                <span
                  class="block truncate"
                  :title="slotProps.data.description"
                >
                  {{ slotProps.data.description }}
                </span>
              </template>
            </Column>

            <!-- Cost Column -->
            <Column field="cost" header="Cost">
              <template #body="slotProps">
                <span class="text-sm font-semibold text-gray-600">
                  ${{ slotProps.data.cost }}
                  <!-- ${{ slotProps.data.cost.toFixed(2) }} -->
                </span>
              </template>
            </Column>

            <!-- Price Column -->
            <Column field="price" header="Price">
              <template #body="slotProps">
                <span class="text-sm font-bold text-gray-800">
                  <!-- ${{ slotProps.data.price.toFixed(2) }} -->
                  ${{ slotProps.data.price }}
                </span>
              </template>
            </Column>

            <!-- Status Column -->
            <Column field="status" header="Status" class="min-w-[8rem]">
              <template #body="slotProps">
                <span
                  :class="getStatusClass(slotProps.data.status)"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ slotProps.data.status }}
                </span>
              </template>
            </Column>

            <Column
              key="actions"
              field="actions"
              :header="$t('labels.action', 2)"
            >
              <template #body="{ data }">
                <div class="card flex justify-center">
                  <PrimeButton
                    type="button"
                    text
                    plain
                    icon="pi pi-ellipsis-v"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                    @click="
                      (event: Event) => {
                        toggle(event, data.id)
                      }
                    "
                  />
                  <PrimeMenu
                    id="overlay_menu"
                    ref="menu"
                    :model="rowActionsItems"
                    :popup="true"
                  >
                    <template #item="{ item }">
                      <NuxtLink v-if="item.route" :to="`${item.route}?id=${activeRowId}`">
                        <PrimeButton
                          class="w-full justify-start"
                          small
                          text
                          plain
                          :icon="item.icon"
                          :label="`${item.label}`"
                        />
                      </NuxtLink>
                      <PrimeButton
                        v-else
                        class="w-full justify-start"
                        severity="danger"
                        small
                        text
                        :icon="item.icon"
                        :label="`${item.label}`"
                      />
                    </template>
                  </PrimeMenu>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </PrimeCard>
    </div>

    <DeleteDialog v-model="isDeleteDialog" :loading="isDeleteDialogLoading" @cancel="closeDeleteDialog" @confirmed="onConfirmDelete" />
  </div>
</template>
