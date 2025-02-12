<script setup lang="ts">
import TopBar from '~/layouts/TopBar.vue'
import MobileTopBar from '~/layouts/mobile/TopBar.vue'
import MobileBottomBar from '~/layouts/mobile/BottomBar.vue'
</script>
<template>
  <div class="h-screen w-screen flex-col">
    <PrimeToast />
  
    <MobileTopBar class="md:hidden" />
    <TopBar class="hidden md:flex"/>
    
    <MobileBottomBar class="md:hidden" />

    <main>
      <slot />
    </main>
  </div>
</template>