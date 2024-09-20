export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  const user = authStore.user;

  if (!user) {
    return navigateTo('/loginAccount');
  }

  if (to.path.startsWith('/dashboard/admin') && user.role !== 'admin') {
    return navigateTo('/');
  }

  if (to.path.startsWith('/contactme') && !['user', 'admin'].includes(user.role)) {
    return navigateTo('/');
  }
});
