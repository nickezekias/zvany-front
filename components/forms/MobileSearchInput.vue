<script setup lang="ts">
const model = defineModel({
  type: String,
  default: ''
})
</script>

<template>
  <div class="w-full flex p-1 rounded-3xl border">
    <PrimeInputText
      v-model="model"
      type="text"
      placeholder="Search"
      class="border-0 py-0 bg-transparent flex-grow text-white"
    />
    <PrimeButton icon="pi pi-search" class="w-8 h-8" severity="contrast" rounded aria-label="Star" />
  </div>
</template>