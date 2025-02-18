<script setup lang="ts">
import UserAvatarMenu from '@/components/user/UserAvatarMenu.vue'
</script>
<template>
  <PrimeToolbar class="py-0 rounded-none">
    <template #start>
      <div class="logo">
        <router-link to="/">
          <span class="font-bold text-xl">Zvany</span>
        </router-link>
      </div>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <UserAvatarMenu />
      </div>
    </template>
  </PrimeToolbar>
</template>
