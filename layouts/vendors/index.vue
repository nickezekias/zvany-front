<script setup lang="ts">
import Sidebar from '@/layouts/vendors/Sidebar.vue'
import TopBar from '@/layouts/vendors/TopBar.vue'
</script>

<template>
  <div class="flex">
    <div id="app" class="w-full">
      <div class="flex h-screen bg-surface-50 dark:bg-[#121212]">

        <!-- Sidebar -->
        <sidebar />
        
        <!-- Content -->
        <div class="flex-1">
          <div class="flex flex-col h-screen">
            
            <!-- Top Bar -->
            <TopBar />

            <div class="flex-1 p-8 overflow-y-auto">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
