<template>
  <div class="h-screen w-screen flex-col">
    <PrimeToast />
    <PrimeToolbar class="py-0 rounded-none border-b">
      <template #start>
        <div class="logo">
          <span>Zvany</span>
        </div>
      </template>

      <template #end>
        <router-link to="/register" active-class="border-b border-primary" class="py-2">
          <PrimeButton text plain class="" :label="$t('labels.register')" />
        </router-link>

        <router-link to="/login" active-class="border-b border-primary" class="ml-3 py-2">
          <PrimeButton text plain class="" :label="$t('labels.login')" />
        </router-link>
      </template>
    </PrimeToolbar>

    <main class="mt-4 md:mt-16">
      <slot />
    </main>
  </div>
</template>