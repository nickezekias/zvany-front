<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type User from '@/app/models/user.model'

const accountStore = useAccountStore()
const { t } = useI18n()

const { logout } = useSanctumAuth<User>()

const items = ref([
  {
    label: t('labels.logout'),
    icon: 'pi pi-sign-out',
    command: async () => {
      await onLogout()
    },
  },
])

const menu = ref()

const toggle = (event: Event) => {
  menu.value.toggle(event)
}

async function onLogout() {
  await logout()
  navigateTo(accountStore.getLoginRoute, { replace: true })
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
        :label="accountStore.user?.initials"
        shape="circle"
        class="text-primary bg-[#0099ff10] border-2 border-primary"
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
