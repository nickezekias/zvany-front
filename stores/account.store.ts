import type { LoginRequest, RegisterRequest } from "~/app/@types/account.interface";
import User from "~/app/models/user.model";
import useApiFetch from "~/composables/useApiFetch";
import { $api } from '@/composables/api'

export const useAccountStore = defineStore("accountStore", () => {
  const isAuthenticated = computed(() => {
    return user.value != null &&  user.value.id
  });
  const loading = ref(false)
  const users: Ref<User[]> = ref([])
  const registerPayload: Ref<RegisterRequest> = ref({
    //business
    businessAddress: '',
    businessDescription: '',
    businessEmail: '',
    businessName: '',
    businessPhone: '',
    businessWebsite: '',
    
    //user
    accountType: '',
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    password: '',
    phone: '',
    password_confirmation: '',
  })
  // const user: Ref<User | null> = ref(null);

  const clearAuthenticatedUser = (): void => {
    user.value = null
  }

  const getPostAuthRoute = computed((): string => {
    return '/'
  })

  const getLoginRoute = computed((): string => {
    return '/login'
  })

  const user = computed({
    get: (): User|null => {
      const sanctumUser = useSanctumUser<Record<string, User>>().value
      if (sanctumUser) {
        return sanctumUser.data
        // return User.fromObject(sanctumUser.data)
      }
      return null
    },
    set: (value: User | null) => {
      console.log("User_value_account_store", value)
      /* if (value != null) {
        user.value = value
        // return user.value = User.fromObject(value)
      }
      user.value = null */
    }
  })

  const setLoading = (val: boolean) => {
    loading.value = val;
  }

  const setAuthenticatedUser = (data: User): void => {
    user.value = data
  }

  const setRegisterPayload = (data: RegisterRequest): void => {
    registerPayload.value = data
  }


  /*
  *  ACTIONS
  */
  async function getAuthenticatedUser() {
    const { error, data } = await useApiFetch("/api/v1/users/");
    
    if (!error.value && data.value) {
    // @ts-expect-error not yet assigned type for response
      setAuthenticatedUser(User.fromObject(data.value.data))
    } 
  }

  async function getUsers() {
    const { error, data } = await useApiFetch("/api/v1/users");

    if (!error.value && data.value) {
    // @ts-expect-error not yet assigned type for response
      users.value = data.value.data
    }
  }

  async function login(data: LoginRequest): Promise<void> {
    await $api("/sanctum/csrf-cookie");
    await $api("/login", {
      method: "POST",
      body: data,
    });

    // await getAuthenticatedUser();
  }

  async function logout() {
    await $api("/logout", {
      method: "POST",
    });

    clearAuthenticatedUser()
  }

  async function register(payload: RegisterRequest) {
    await $api("/sanctum/csrf-cookie");
    const response = await useApiFetch('/register', {
      method: 'POST',
      body: payload
    })

    console.log("RESPONSE.DATA", response.data.value)

    if (response.error.value) {
      throw response.error
    }
    // setAuthenticatedUser(response.data.value as User)
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
    getLoginRoute,
    getPostAuthRoute,
    registerPayload,
    loading,
    user,
    users,

    setLoading,
    setRegisterPayload,

    forgotPassword,
    getAuthenticatedUser,
    getUsers,
    login,
    logout,
    register,
    resetPassword,
  };
});
