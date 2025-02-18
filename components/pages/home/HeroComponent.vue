<script setup lang="ts">
const accountStore = useAccountStore()
</script>

<template>
  <div class="flex gap-8">
    <div class="w-[14rem]">
      <div class="auth-card border p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-24 h-24 mx-auto"
        >
          <circle cx="12" cy="6" r="4" fill="currentColor" />
          <path
            fill="currentColor"
            d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
            opacity="0.5"
          />
        </svg>

        <div
          v-if="!accountStore.isAuthenticated"
          class="flex justify-between w-full mt-8"
        >
          <router-link to="/register">
            <PrimeButton rounded class="" :label="$t('labels.register')" />
          </router-link>

          <router-link to="/login">
            <PrimeButton text rounded class="" :label="$t('labels.login')" />
          </router-link>
        </div>

        <div class="flex justify-center" v-else>
          <router-link to="/vendors">
            <PrimeButton
              icon="pi pi-th-large"
              text
              fluid
              rounded
              class=""
              :label="$t('labels.vendorDashboard')"
            />
          </router-link>
        </div>
      </div>

      <div class="zen-card relative p-4 py-6 border border-t-0">
        <div class="absolute top-0 left-0 h-100 w-100 bg-black opacity-45" />

        <div class="flex flex-col items-center h-100 w-100">
          <span class="font-thin"> Discover </span>
          <span class="text-2xl font-bold"> Zen Shopping </span>

          <div class="flex justify-between w-full mt-8">
            <PrimeButton
              size="small"
              rounded
              severity="contrast"
              :label="$t('labels.shopNow')"
            />
            <PrimeButton
              size="small"
              text
              rounded
              severity="contrast"
              :label="$t('labels.learnMore')"
            />
          </div>
        </div>
      </div>

      <div class="some-zen-card relative mt-8 p-4 py-12 border">
        <div class="absolute top-0 left-0 h-100 w-100 bg-black opacity-45" />

        <div class="flex flex-col items-center h-100 w-100">
          <span class="font-thin"> Discover </span>
          <span class="text-2xl font-bold"> Zen Shopping </span>

          <div class="flex justify-between w-full mt-8">
            <PrimeButton
              size="small"
              rounded
              severity="contrast"
              :label="$t('labels.shopNow')"
            />
            <PrimeButton
              size="small"
              text
              rounded
              severity="contrast"
              :label="$t('labels.learnMore')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex-grow">
      <div
        id="app-carousel"
        class="min-h-[32rem] flex flex-col justify-center p-8 bg-primary text-white"
      >
        <div>
          <div class="font-light text-4xl">iPhone Season</div>
          <div class="font-bold text-7xl">60% Off</div>
        </div>
      </div>

      <div class="flex mt-8 justify-between gap-8">
        <div
          v-for="i in 3"
          :key="i"
          class="zen-card relative p-4 py-6 w-full border"
        >
          <div class="absolute top-0 left-0 h-100 w-100 bg-black opacity-45" />

          <div class="flex flex-col items-center h-100 w-100">
            <span class="font-thin"> Discover </span>
            <span class="text-2xl font-bold"> Zen Shopping </span>

            <div class="flex justify-between w-full mt-8">
              <PrimeButton
                size="small"
                rounded
                severity="contrast"
                :label="$t('labels.shopNow')"
              />
              <PrimeButton
                size="small"
                text
                rounded
                severity="contrast"
                :label="$t('labels.learnMore')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
