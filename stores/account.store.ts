import type { LoginRequest } from "~/app/@types/account.interface";
import User from "~/app/models/user.model";
import useApiFetch from "~/composables/useApiFetch";
import { $api } from '@/composables/api'

export const useAccountStore = defineStore("accountStore", () => {
  const user: Ref<User | null> = ref(null);

  const isAuthenticated = computed(() => !!user.value);

  async function getAuthenticatedUser() {
    const response = await useApiFetch("/api/auth/user");
    if (response.error) {
      throw response.error;
    }
    console.log("GET_AUTH_USER_RESPONSE", response)
    // @ts-expect-error not yet assigned type for response
    user.value = User.fromObject(response.data.value?.data as never);
    console.log("USER_VALUE", user)
  }

  async function login(data: LoginRequest): Promise<void> {
    await $api("/sanctum/csrf-cookie");
    await $api("/login", {
      method: "POST",
      body: data,
    });

    await useAccountStore().getAuthenticatedUser();
  }

  async function logout() {
    await $api("/logout", {
      method: "POST",
    });

    user.value = null;
  }

  async function resetPassword() {
    await $api("/reset-password", {
      method: "POST",
    });
  }

  async function forgotPassword(email: string) {
    await $api(`/forgot-password?email=${email}`, {
      method: "POST",
      body: { email },
    });
  }

  return {
    isAuthenticated,
    user,
    forgotPassword,
    getAuthenticatedUser,
    login,
    logout,
    resetPassword,
  };
});
