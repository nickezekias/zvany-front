<script setup lang="ts">
import DesktopSearchInput from '~/components/forms/DesktopSearchInput.vue'

const accountStore = useAccountStore()

const search = ref('')
</script>

<template>
  <PrimeToolbar class="py-2 px-12 lg:px-24 rounded-none border-b">
    <template #start>
      <div class="logo">
        <router-link to="/">
          <span class="font-bold text-xl">Zvany</span>
        </router-link>
      </div>
    </template>

    <template #center>
      <DesktopSearchInput v-model="search" class="w-96" />
    </template>

    <template #end>
      <div class="flex me-12 gap-2 items-center">
        <span class="pi pi-phone"/>
        <div class="flex flex-col flex-grow">
          <span class="text-xs text-gray-500">Call us</span>
          <span class="font-bold">+1 234 567 890</span>
        </div>
      </div>
      <div class="flex align-items-center items-center gap-1">
        <!-- User Profile Button -->
        <PrimeButton size="small" text plain aria-label="User Profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="6" r="4" />
              <path
                d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"
                opacity="0.5"
              />
            </g>
          </svg>
        </PrimeButton>

        <PrimeButton size="small" text plain aria-label="Favorites">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.5"
            >
              <path
                d="M12 5.5C7.5.826 2 4.275 2 9.138s4.02 7.454 6.962 9.774C10 19.729 11 20.5 12 20.5"
              />
              <path
                d="M12 5.5C16.5.826 22 4.275 22 9.138s-4.02 7.454-6.962 9.774C14 19.729 13 20.5 12 20.5"
                opacity="0.5"
              />
            </g>
          </svg>
        </PrimeButton>

        <PrimeButton size="small" text plain aria-label="Cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                d="M3.742 20.555C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445m-16.516 0c-1.2-1.446-.789-3.64.034-8.03c.586-3.12.878-4.681 1.99-5.603M3.741 20.555Zm16.516 0c1.2-1.446.788-3.64-.034-8.03c-.586-3.12-.878-4.681-1.99-5.603m2.024 13.633ZM18.235 6.922C17.124 6 15.536 6 12.36 6h-.722c-3.175 0-4.763 0-5.874.922m12.47 0Zm-12.47 0Z"
              />
              <path
                stroke-linecap="round"
                d="m15 11l1 6m-7-6l-1 6M9 6V5a3 3 0 1 1 6 0v1"
                opacity="0.5"
              />
            </g>
          </svg>
        </PrimeButton>
      </div>

      <router-link
        v-if="!accountStore.isAuthenticated"
        to="/login"
        active-class="border-b border-primary"
        class="ml-3 py-2"
      >
        <PrimeButton text plain class="" :label="$t('labels.login')" />
      </router-link>

      <router-link
        v-if="!accountStore.isAuthenticated"
        to="/register"
        active-class="border-b border-primary"
        class="py-2"
      >
        <PrimeButton text plain class="" :label="$t('labels.register')" />
      </router-link>
    </template>
  </PrimeToolbar>
</template>
