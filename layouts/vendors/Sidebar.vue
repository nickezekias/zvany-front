<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const accountStore = useAccountStore()
const route = useRoute()
const { t } = useI18n()

interface MenuItem {
  label: string
  icon?: string
  route?: string
  children?: Array<MenuItem>
  command?: () => void
}

const activeItem: Ref<MenuItem | null> = ref(null)
const currentUrl = ref(route.path)
const openMenus: Ref<Record<string, boolean>> = ref({}) // Tracks open menus at multiple levels

const menuItems = ref([
  { label: t('labels.dashboard'), icon: 'pi pi-home', route: '/vendors/' },
  // { label: 'Profile', icon: 'pi pi-user' },
  {
    label: t('labels.product', 2),
    icon: 'pi pi-box',
    children: [
      {
        label: t('labels.list'),
        // icon: 'pi pi-user-edit',
        /* children: [
          { label: 'Change Password', icon: 'pi pi-key' },
          { label: 'Two-Factor Authentication', icon: 'pi pi-shield' },
        ], */
        route: '/vendors/products',
      },
      { label: t('labels.inventoryAdjustment', 2) },
    ],
  },
  // { label: 'Messages', icon: 'pi pi-envelope' },
  {
    label: t('labels.license'),
    icon: 'pi pi-file',
    children: [
      { label: t('labels.payment', 2), route: '/admin/payments' },
      // { label: 'Logout', icon: 'pi pi-sign-out' },
    ],
  },
])

onMounted(() => {
  openAndActivateMenuItems()
})

watch(
  currentUrl,
  () => {
    openAndActivateMenuItems()
  },
  { deep: true, immediate: true }
)


function openAndActivateMenuItems() {
  menuItems.value.forEach((item) => {
    openMenus.value[`${0}-${item.label}`] = false
    if (item.route) {
      //FIXME: see best ways to get current route with nuxt
      if (item.route === currentUrl.value) {
        activeItem.value = item
        return
      }
    }
    if (item.children) {
      item.children.forEach((child: MenuItem) => {
        openMenus.value[`${1}-${child.label}`] = false
        if (child.route) {
          if (child.route === currentUrl.value) {
            activeItem.value = child
            openMenus.value[`${0}-${item.label}`] = true
            return
          }
        }
        if (child.children) {
          child.children.forEach((subChild) => {
            if (subChild.route) {
              if (subChild.route === currentUrl.value) {
                activeItem.value = subChild
                openMenus.value[`${1}-${child.label}`] = true
                return
              }
            }
          })
        }
      })
    }
  })
}

function toggleSubMenu(item: MenuItem, level: number) {
  // Close all other toggled menu items
  Object.keys(openMenus.value).forEach(key => {
    if (key != `${level}-${item.label}` && !item.route) {
      openMenus.value[key] = false
    }
  })

  if (!item.children) {
    setActiveItem(item)
    if (item.route) {
      navigateTo(item.route)
    }
  }
  const key = `${level}-${item.label}`
  openMenus.value[key] = !openMenus.value[key]
}

function isOpen(item: MenuItem, level: number) {
  const key = `${level}-${item.label}`
  return !!openMenus.value[key]
}

function setActiveItem(item: MenuItem) {
  activeItem.value = item
}
</script>
<template>
  <div class="w-64 shadow-sm bg-white dark:bg-[#18181b]">
    <h1 class="text-2xl font-bold py-4 px-3">
      {{ accountStore.user?.business?.name }}
    </h1>
    <ul class="p-2">
      <li v-for="item in menuItems" :key="item.label" class="mb-1">
        <button
          :class="[
            'w-full flex items-center p-3 py-2 rounded-md transition-all text-sm font-bold',
            activeItem === item
              ? 'text-[#0099ff] bg-gray-50 dark:bg-[#ffffff08] border border-[#ffffff12]'
              : 'hover:bg-gray-50 dark:hover:bg-[#ffffff08] font-normal hover:font-semibold dark:hover:text-primary',
          ]"
          @click="toggleSubMenu(item, 0)"
        >
          <i :class="item.icon" class="mr-2" />
          {{ item.label }}
          <i
            v-if="item.children"
            class="text-xs"
            :class="
              isOpen(item, 0) ? 'pi pi-minus ml-auto' : 'pi pi-plus ml-auto'
            "
          />
        </button>
        <ul v-if="item.children && isOpen(item, 0)" class="ml-4">
          <li v-for="child in item.children" :key="child.label" class="mb-1">
            <button
              :class="[
                'w-full flex items-center p-3 py-2 rounded-md transition-all text-sm font-bold',
                activeItem === child
                  ? 'text-[#0099ff] bg-gray-50 dark:bg-[#ffffff08] border border-[#ffffff12]'
                  : 'hover:bg-gray-50 dark:hover:bg-[#ffffff08] font-normal hover:font-semibold dark:hover:text-primary',
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
                    'w-full flex items-center p-3 py-2 rounded-md transition-all text-sm font-bold',
                    activeItem === subChild
                      ? 'text-[#0099ff] bg-gray-50 dark:bg-[#ffffff08] border border-[#ffffff12]'
                      : 'hover:bg-gray-50 dark:hover:bg-[#ffffff08] font-normal hover:font-semibold dark:hover:text-primary',
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
</template>
