<template>
  <div>
    <header class="pb-6 bg-white lg:pb-0">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between h-16 lg:h-20">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-extrabold text-blue-600">Franklin.</h1>
          </div>
          <div class="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <div v-for="item in items" class="flow-root">
              <div class="flex flex-col px-6 -my-2 space-y-1">
                <a :href="item.path" title=""
                  class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                  {{ item.label }} </a>
              </div>
            </div>
          </div>
          <a href="/loginAccount" title=""
            class="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
            role="button">Login-In</a>
        </nav>
        <nav class="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
          <div v-for="item in items" class="flow-root">
            <div class="flex flex-col px-6 -my-2 space-y-1">
              <a :href="item.path" title=""
                class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                {{ item.label }} </a>

            </div>
          </div>


          <div class="px-6 mt-6">
            <a href="/loginAccount" title=""
              class="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
              role="button">Login-In </a>
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
    path:"/"
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
