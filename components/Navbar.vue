<template>
  <div>
    <header class="pb-6 lg:pb-0 bg-gray-50">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav class=" flex items-center px-9 justify-between h-16 lg:h-20">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-extrabold text-blue-600">Franklin.</h1>
          </div>
          <div class="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <div v-for="item in items" class="flow-root">
              <div class="flex flex-col px-6 -my-2 space-y-1">
                <a :href="item.path" title=""
                  class="inline-flex py-2 font-semibold text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                  {{ item.label }} </a>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-10">
            <div class="flex items-center gap-3">
              <UTooltip :text="userName">
                <UPopover>
                <div class=" flex items-center gap-4">
                    <div class="w-[40px] relative">
                      <img src="../assets/iconxx.png" alt="" class="w-full object-coverrounded-full  rounded-full ">
                    </div>
                 
                  <h1 class="text-xl text-blue-500 font-bold">{{userName}}</h1>
              </div>

              <template #panel>
      <div class="p-4">
        <p class="text-gray-500 pb-3">{{ userEmail }}</p>
        <a href="/loginAccount" title=""
          @click="logout"
            class="items-center justify-center hover:text-red-500 hidden text-base font-semibold transition-all duration-200border border-transparent rounded-md lg:inline-flex focus:bg-blue-700"
            role="button">Log-Out <UIcon name="i-heroicons-arrow-right-start-on-rectangle" class="text-xl"/></a>
      </div>
    </template>
              </UPopover>
              </UTooltip>
            
            
            </div>
          </div>
     
        </nav>
        <nav class="pt-4 pb-6  lg:hidden">
          <div v-for="item in items" class="flow-root">
            <div class="flex flex-col px-6 -my-2 space-y-1">
              <a :href="item.path" title=""
                class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                {{ item.label }} </a>

            </div>
          </div>


          <div class="px-6 mt-6">
            <a href="/loginAccount" title=""
            @click="logout"
              class="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
              role="button">Log-Out </a>
          </div>
        </nav>
      </div>
    </header>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
  {
    label: "Home",
    icon: "i-heroicons-home",
    path:"/franklin"
  },
  {
    label: "About Us",
    icon: "i-heroicons-book-open",
    path:"/abouts"
  },
  {
    label: "Contact Us",
    icon: "i-heroicons-chat-bubble-left-ellipsis",
    path:"/contactme"
  },

  {
    label: "Blogs",
    icon: "i-heroicons-bookmark",
    path:"/blogs/blogs"
  },
]);

const userStore = useAuthStore()

const isClient = typeof window !== 'undefined'

const userName = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.userName : ''
  }
  return ''
})
const userEmail = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.email : ''
  }
  return ''
})
const userAuth = useAuthStore()
const logout = async() =>{
  await userAuth.logout()
}
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
  /* Ensure the navbar stays on top */
}

.navbar.scrolled {
  background-color: black;
  color: white;
}
</style>
