// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();

  if (!accountStore.user.value?.isVendor()) {
    return navigateTo('/404', { replace: true });
  }
});