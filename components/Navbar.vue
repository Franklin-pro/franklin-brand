<template>
  <div :class="{ 'dark': switchMode }">
    <header class="pb-6 lg:pb-0 bg-gray-50 dark:bg-gray-800">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav class="flex items-center px-9 justify-between h-16 lg:h-20">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-extrabold text-blue-600">Franklin.</h1>
          </div>
          <div class="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <div v-for="item in items" class="flow-root">
              <div class="flex flex-col px-6 -my-2 space-y-1">
                <a :href="item.path" class="inline-flex py-2 font-semibold text-base text-black dark:text-gray-100 transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                  {{ item.label }}
                </a>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-10">
            <div class="flex items-center gap-3">
              <UTooltip :text="userName">
                <UPopover>
                  <div class="flex items-center gap-4">
                    <div class="w-[40px] relative">
                      <img src="../assets/iconxx.png" alt="" class="w-full object-cover rounded-full">
                    </div>
                    <h1 class="text-xl text-blue-500 font-bold">{{ userName }}</h1>
                  </div>
                  <template #panel>
                    <div class="p-4">
                      <p class="text-gray-500 pb-3">{{ userEmail }}</p>
                      <a href="/loginAccount" @click="logout" class="items-center justify-center hover:text-red-500 hidden text-base font-semibold transition-all duration-200 lg:inline-flex focus:bg-blue-700">
                        Log-Out <UIcon name="i-heroicons-arrow-right-start-on-rectangle" class="text-xl"/>
                      </a>
                    </div>
                  </template>
                </UPopover>
              </UTooltip>
              <div class="border p-2 flex cursor-pointer items-center rounded-full" @click="toggleMode">
                <UIcon :name="switchMode ? 'i-heroicons-sun' : 'i-heroicons-moon'"/>
              </div>
            </div>
          </div>
        </nav>
        <nav class="pt-4 pb-6 lg:hidden">
          <div v-for="item in items" class="flow-root">
            <div class="flex flex-col px-6 -my-2 space-y-1">
              <a :href="item.path" class="inline-flex py-2 text-base font-medium text-black dark:text-gray-100 transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                {{ item.label }}
              </a>
            </div>
          </div>
          <div class="px-6 mt-6">
            <a href="/loginAccount" @click="logout" class="inline-flex justify-center px-4 py-3 text-base font-semibold text-white bg-red-600 transition-all duration-200 rounded-md hover:bg-blue-700 focus:bg-blue-700">
              Log-Out
            </a>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';


const items = ref([
  { label: "Home", icon: "i-heroicons-home", path: "/franklin" },
  { label: "About Us", icon: "i-heroicons-book-open", path: "/abouts" },
  { label: "Contact Us", icon: "i-heroicons-chat-bubble-left-ellipsis", path: "/contactme" },
  { label: "Blogs", icon: "i-heroicons-bookmark", path: "/blogs/blogs" },
]);

const switchMode = ref(false);

const userStore = useAuthStore();

const isClient = typeof window !== 'undefined';

const userName = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    return user ? user.userName : '';
  }
  return '';
});

const userEmail = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    return user ? user.email : '';
  }
  return '';
});

const logout = async () => {
  await userStore.logout();
};

// Function to toggle the theme mode
const toggleMode = () => {
  switchMode.value = !switchMode.value;
  document.documentElement.classList.toggle('dark', switchMode.value);
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.navbar {
  width: 100%;
  position: sticky;
  top: 0;
  transition: background-color 0.3s ease;
  padding: 1rem;
  background-color: transparent;
  z-index: 1000;
}

.navbar.scrolled {
  background-color: black;
  color: white;
}

.dark .text-black {
  color: white;
}

.dark .bg-gray-50 {
  background-color: #1f2937;
}

.dark .text-gray-500 {
  color: #9ca3af;
}

.dark .text-blue-600 {
  color: #3b82f6;
}
</style>
