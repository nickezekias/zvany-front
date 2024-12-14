import type { LoginRequest } from "~/app/@types/account.interface"
import User from "~/app/models/user.model"
import useApiFetch from "~/composables/useApiFetch"

export const useAccountStore = defineStore('accountStore', () => {
  const user: Ref<User | null> = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  async function getAuthenticatedUser() {
    const { data } = await useApiFetch('/api/auth/user')
    user.value = User.fromObject(data as never)
  }

  async function login(data: LoginRequest) {

    loading.value = true
    try {
      await useApiFetch('/sanctum/csrf-cookie')
      await useApiFetch('/login', {
        method: 'POST',
        body: data
      })

      await useAccountStore().getAuthenticatedUser()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function logout()
  {
    try {
      await useApiFetch('/logout', {
        method: 'POST'
      })

      user.value = null
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function resetPassword() {
    loading.value = true
    try {
      await useApiFetch('/reset-password', {
        method: 'POST'
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function forgotPassword(email: string) {
    loading.value = true
    try {
      await useApiFetch(`/forgot-password?email=${email}`, {
        method: 'POST',
        body: { email }
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    isAuthenticated,
    loading,
    user,
    forgotPassword,
    getAuthenticatedUser,
    login,
    logout,
    resetPassword
  }
})