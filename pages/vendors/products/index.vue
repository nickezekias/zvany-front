<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

definePageMeta({
  layout: 'vendors',
  middleware: ['sanctum:auth'],
})

const products = ref([
  { 
    image: 'https://via.placeholder.com/100', 
    name: 'Wireless Headphones', 
    sku: 'WH12345', 
    category: 'Audio', 
    brand: 'TechBrand', 
    type: 'Electronics', 
    description: 'High-quality wireless headphones with noise cancellation.', 
    cost: 120.00, 
    price: 199.99, 
    status: 'in stock' 
  },
  { 
    image: 'https://via.placeholder.com/100', 
    name: 'Smartphone', 
    sku: 'SP67890', 
    category: 'Mobile', 
    brand: 'PhoneCo', 
    type: 'Electronics', 
    description: 'Latest smartphone with cutting-edge features.', 
    cost: 750.00, 
    price: 999.99, 
    status: 'out of stock' 
  },
  { 
    image: 'https://via.placeholder.com/100', 
    name: 'Coffee Maker', 
    sku: 'CM54321', 
    category: 'Kitchen Appliances', 
    brand: 'HomeBrew', 
    type: 'Home Appliance', 
    description: 'Automatic coffee maker with customizable brew settings.', 
    cost: 50.00, 
    price: 79.99, 
    status: 'backordered' 
  },
  { 
    image: 'https://via.placeholder.com/100', 
    name: 'Gaming Chair', 
    sku: 'GC09876', 
    category: 'Furniture', 
    brand: 'GamerSeat', 
    type: 'Furniture', 
    description: 'Ergonomic gaming chair with lumbar support.', 
    cost: 100.00, 
    price: 149.99, 
    status: 'in stock' 
  }
]);

/**
 * Get the CSS class for the status tag.
 * @param {string} status - The status of the product (e.g., in stock, out of stock, backordered)
 * @return {string} - The class to style the tag.
 */
const getStatusClass = (status: string) => {
  switch (status) {
    case 'in stock':
      return 'bg-green-100 text-green-800';
    case 'out of stock':
      return 'bg-red-100 text-red-800';
    case 'backordered':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
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
      <DataTable :value="products" class="shadow-sm rounded-lg bg-white text-sm">
      <!-- Image Column -->
      <Column field="image" header="Image" style="width: 80px">
        <template #body="slotProps">
          <img :src="slotProps.data.image" alt="Product Image" class="w-12 h-12 object-cover rounded-md" />
        </template>
      </Column>

      <!-- Name Column -->
      <Column field="name" header="Name"></Column>

      <!-- SKU Column -->
      <Column field="sku" header="SKU"></Column>

      <!-- Category Column -->
      <Column field="category" header="Category"></Column>

      <!-- Brand Column -->
      <Column field="brand" header="Brand"></Column>

      <!-- Type Column -->
      <Column field="type" header="Type"></Column>

      <!-- Description Column -->
      <Column field="description" header="Description"></Column>

      <!-- Cost Column -->
      <Column field="cost" header="Cost">
        <template #body="slotProps">
          <span class="text-sm font-semibold text-gray-600">
            ${{ slotProps.data.cost.toFixed(2) }}
          </span>
        </template>
      </Column>

      <!-- Price Column -->
      <Column field="price" header="Price">
        <template #body="slotProps">
          <span class="text-sm font-bold text-gray-800">
            ${{ slotProps.data.price.toFixed(2) }}
          </span>
        </template>
      </Column>

      <!-- Status Column -->
      <Column field="status" header="Status">
        <template #body="slotProps">
          <span :class="getStatusClass(slotProps.data.status)" class="px-3 py-1 rounded-full text-xs font-medium">
            {{ slotProps.data.status }}
          </span>
        </template>
      </Column>
    </DataTable>
    </div>
  </div>
</template>
