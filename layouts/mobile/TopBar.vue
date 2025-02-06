<script setup lang="ts">
import MobileSearchInput from '~/components/forms/MobileSearchInput.vue';

const search = ref('')
</script>

<template>
  <div class="py-1 px-4 m-0 border-b bg-primary text-white">
    <MobileSearchInput v-model="search" class="w-full"/>
  </div>
</template>
