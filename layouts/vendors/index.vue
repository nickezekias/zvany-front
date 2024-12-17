<script setup lang="ts">
import { ref } from 'vue'
import UserAvatarMenu from '@/components/user/UserAvatarMenu.vue'

const accountStore = useAccountStore()

const activeItem = ref(null)
const openMenus = ref({}) // Tracks open menus at multiple levels

const menuItems = ref([
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Profile', icon: 'pi pi-user' },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    children: [
      {
        label: 'Account',
        icon: 'pi pi-user-edit',
        children: [
          { label: 'Change Password', icon: 'pi pi-key' },
          { label: 'Two-Factor Authentication', icon: 'pi pi-shield' },
        ],
      },
      { label: 'Privacy', icon: 'pi pi-lock' },
    ],
  },
  { label: 'Messages', icon: 'pi pi-envelope' },
  {
    label: 'More',
    icon: 'pi pi-ellipsis-h',
    children: [
      { label: 'Help', icon: 'pi pi-question-circle' },
      { label: 'Logout', icon: 'pi pi-sign-out' },
    ],
  },
])

function toggleSubMenu(item, level) {
  console.log()
  if (!item.children) {
    setActiveItem(item)
    return
  }
  const key = `${level}-${item.label}`
  openMenus.value[key] = !openMenus.value[key]
}

function isOpen(item, level) {
  const key = `${level}-${item.label}`
  return !!openMenus.value[key]
}

function setActiveItem(item) {
  activeItem.value = item
}
</script>

<template>
  <div class="flex">
    <div id="app" class="w-full">
      <div class="flex h-screen bg-surface-50 dark:bg-[#121212]">
        <!-- Sidebar -->
        <div class="w-64 shadow-sm bg-white dark:bg-[#18181b]">
          <h1 class="text-2xl font-bold py-4 px-3">{{ accountStore.user.value.business.name }}</h1>
          <ul class="p-2">
            <li v-for="item in menuItems" :key="item.label" class="mb-1">
              <button
                :class="[
                  'w-full flex items-center p-3 rounded-md transition-all text-sm font-normal',
                  activeItem === item
                    ? 'text-[#0099ff] bg-gray-50'
                    : 'hover:bg-gray-50',
                ]"
                @click="toggleSubMenu(item, 0)"
              >
                <i :class="item.icon" class="mr-2" />
                {{ item.label }}
                <i
                  v-if="item.children"
                  class="text-xs"
                  :class="
                    isOpen(item, 0)
                      ? 'pi pi-minus ml-auto'
                      : 'pi pi-plus ml-auto'
                  "
                />
              </button>
              <ul v-if="item.children && isOpen(item, 0)" class="ml-4">
                <li
                  v-for="child in item.children"
                  :key="child.label"
                  class="mb-1"
                >
                  <button
                    :class="[
                      'w-full flex items-center p-3 rounded-md transition-all text-sm',
                      activeItem === child
                        ? 'text-[#0099ff] bg-gray-50'
                        : 'hover:bg-gray-50',
                    ]"
                    @click="toggleSubMenu(child, 1)"
                  >
                    <i :class="child.icon" class="mr-2" />
                    {{ child.label }}
                    <i
                      v-if="child.children"
                      class="text-xs"
                      :class="
                        isOpen(child, 1)
                          ? 'pi pi-minus ml-auto'
                          : 'pi pi-plus ml-auto'
                      "
                    />
                  </button>
                  <ul v-if="child.children && isOpen(child, 1)" class="ml-6">
                    <li
                      v-for="subChild in child.children"
                      :key="subChild.label"
                      class="mb-1"
                    >
                      <button
                        :class="[
                          'w-full flex items-center p-3 rounded-md transition-all text-sm',
                          activeItem === subChild
                            ? 'text-[#0099ff] bg-gray-50'
                            : 'hover:bg-gray-50',
                        ]"
                        @click="setActiveItem(subChild)"
                      >
                        <i :class="subChild.icon" class="mr-2" />
                        {{ subChild.label }}
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Content -->
        <div class="flex-1">
          <div class="flex flex-col">
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

            <div class="flex-1 p-8">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
