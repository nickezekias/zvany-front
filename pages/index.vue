<script setup lang="ts">
import MobileIndexContent from '~/components/pages/home/MobileIndexContent.vue';
import IndexContent from '~/components/pages/home/IndexContent.vue';
import { useScreenSize } from '~/composables/useScreenSize';

const { isMobile } = useScreenSize()
</script>
<template>
  <div>
    <MobileIndexContent v-if="isMobile" />
    <IndexContent v-else />
  </div>
</template>