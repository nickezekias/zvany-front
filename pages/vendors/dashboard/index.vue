<script setup lang="ts">
definePageMeta({
  layout: 'vendors',
  middleware: ['sanctum:auth']
})
</script>
<template>
  <h1>Vendor Dashboard</h1>
</template>
