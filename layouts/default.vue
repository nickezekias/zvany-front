<script setup lang="ts">
import TopBar from '~/layouts/TopBar.vue'
import MobileTopBar from '~/layouts/mobile/TopBar.vue'
import MobileBottomBar from '~/layouts/mobile/BottomBar.vue'
import { useScreenSize } from '~/composables/useScreenSize'

const { isMobile } = useScreenSize()
</script>
<template>
  <div class="h-screen w-screen flex-col">
    <PrimeToast />
  
    <MobileTopBar v-if="isMobile" />
    <TopBar v-else/>
    
    <MobileBottomBar v-if="isMobile" />

    <main class="mt-4 md:mt-16">
      <slot />
    </main>
  </div>
</template>