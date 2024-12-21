<script setup lang="ts">
import Sidebar from '@/layouts/vendors/Sidebar.vue'
import TopBar from '@/layouts/vendors/TopBar.vue'
</script>

<template>
  <div class="flex">
    <PrimeToast />
    <div id="app" class="w-full">
      <div
        class="flex bg-surface-50 dark:bg-[#121212] w-screen overflow-hidden"
      >
        <!-- Sidebar -->
        <sidebar class="w-[250px] hidden md:block" />

        <!-- Content -->
        <div class="main-content">
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

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 250px);
  height: 100vh;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main-content {
    width: 100%;
  }
}
</style>
