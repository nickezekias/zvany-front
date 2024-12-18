<script setup lang="ts">
import UserAvatarMenu from '@/components/user/UserAvatarMenu.vue'
</script>
<template>
  <PrimeToolbar class="py-0 rounded-none">
    <template #start>
      <div class="logo">
        <span class="font-bold">Zvany</span>
      </div>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <UserAvatarMenu />
      </div>
    </template>
  </PrimeToolbar>
</template>
