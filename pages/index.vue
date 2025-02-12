<script setup lang="ts">
import MobileIndexContent from '~/components/pages/home/MobileIndexContent.vue';
import IndexContent from '~/components/pages/home/IndexContent.vue';

</script>
<template>
  <div>
    <MobileIndexContent class="md:hidden" />
    <IndexContent class="hidden md:flex" />
  </div>
</template>