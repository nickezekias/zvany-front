<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAccountStore } from '@/stores/account.store'

const accountStore = useAccountStore()
const { t } = useI18n()

const items = ref([
  {
    label: t('labels.logout'),
    icon: 'pi pi-sign-out',
    command: async () => {
      logout()
    },
  },
])

const menu = ref()

const toggle = (event: Event) => {
  menu.value.toggle(event)
}

async function logout() {
  await accountStore.logout()
}
</script>

<template>
  <div>
    <PrimeButton
      type="button"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      text
      rounded
      class="p-1"
      @click="toggle"
    >
      <PrimeAvatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        style="width: 2.5rem; height: 2.5rem"
      />

      <PrimeMenu
        id="overlay_menu"
        ref="menu"
        class="bg-white dark:bg-surface-950"
        :model="items"
        :popup="true"
      />
    </PrimeButton>
  </div>
</template>
