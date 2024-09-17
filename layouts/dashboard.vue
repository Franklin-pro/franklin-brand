<template>
  <div class="flex flex-col md:flex-row">
    <div :class="colorMode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'"
      class="sidebar md:w-64 w-full fixed md:h-screen px-3 py-2 h-screen shadow-xl flex flex-col justify-between transition-colors duration-700 ease-in-out">
      <div>
        <h1
          class="p-4 text-primary font-bold text-center text-3xl md:text-left transition-colors duration-700 ease-in-out">
          Franklin.</h1>
        <NuxtLink to="/Dashboard/admin"
          class="bg-green-400 text-white font-bold flex p-2 rounded-lg items-center gap-4 transition-colors duration-700 ease-in-out">
          <UIcon name="i-ic-baseline-dashboard" /> Dashboard
        </NuxtLink>
        <div>
          <div @click="toggleDropdown" class="cursor-pointer py-2">
            <NuxtLink
            to="/Dashboard/users"
              class="font-semibold py-1 px-2 flex items-center justify-between w-full transition-colors duration-700 ease-in-out"
              :class="colorMode === 'light' ? 'hover:bg-gray-200 rounded-lg' : 'hover:bg-gray-500'">
              <span class="flex items-center gap-4">
                <UIcon name="heroicons-user-group" />Users
              </span>
            </NuxtLink>
          </div>
        </div>

        <div>
          <div @click="toggleDroping" class="cursor-pointer py-2">
            <span
              class="font-semibold py-1 px-2 flex items-center justify-between w-full transition-colors duration-700 ease-in-out"
              :class="colorMode === 'light' ? 'hover:bg-gray-200 rounded-lg' : 'hover:bg-gray-500'">
              <span class="flex items-center gap-4">
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" /> Messages
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-700"
                :class="{ 'rotate-180': dropdownOpens }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdownOpens" class="flex flex-col">
            <NuxtLink to="/Dashboard/messages/"
              class="py-1 px-4 hover:text-primary flex justify-between items-center gap-3 transition-colors duration-700 ease-in-out">
              <span class="flex items-center gap-3">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis" />Message Clients
              </span><span class="bg-orange-500 px-1.5 rounded-full text-sm">{{ messageStore.messages.length }}</span>
            </NuxtLink>
          </ul>
        </div>
  
        <div>
          <div @click="toggleBlogs" class="cursor-pointer py-2">
            <span
              class="font-semibold py-1 px-2 flex items-center justify-between w-full transition-colors duration-700 ease-in-out"
              :class="colorMode === 'light' ? 'hover:bg-gray-200 rounded-lg' : 'hover:bg-gray-500'">
              <span class="flex items-center gap-4">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis" /> Blogs
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-700"
                :class="{ 'rotate-180': dropdownBlog }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdownBlog" class="flex flex-col">
            <NuxtLink to="/Dashboard/Blogs/createBlogs"
              class="py-1 px-4 hover:text-primary flex justify-between items-center gap-3 transition-colors duration-700 ease-in-out">
              <span class="flex items-center gap-3">
                <UIcon name="i-heroicons-plus-circle" />Create Blogs
              </span>
            </NuxtLink>
            <NuxtLink to="/Dashboard/Blogs/viewBlogs"
              class="py-1 px-4 hover:text-primary flex justify-between items-center gap-3 transition-colors duration-700 ease-in-out">
              <span class="flex items-center gap-3">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis" />View Blogs
              </span><span class="bg-orange-500 px-1.5 rounded-full text-sm">{{ blogStore.blogs.length }}</span>
            </NuxtLink>
          </ul>
        </div>
        <NuxtLink :to="`/Dashboard/Profile/${memberId}`"
          class="font-semibold flex p-2 items-center gap-4 transition-colors duration-700 ease-in-out"
          :class="colorMode === 'light' ? 'hover:bg-gray-200 rounded-lg' : 'hover:bg-gray-500'">
          <UIcon name="i-ic-round-person-2" /> Profile
        </NuxtLink>
      </div>

      <div class="p-4 flex flex-col gap-4">
        <button @click="logout"
          class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors duration-700 ease-in-out">
          Logout
        </button>
      </div>
    </div>
    <div class="w-full md:ml-64 relative transition-colors duration-700 ease-in-out">
      <div :class="colorMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'"
        class="w-full sticky top-0 z-50 shadow-md p-4 flex justify-between items-center transition-colors duration-700 ease-in-out">
        <h1 class="text-center md:text-left font-bold text-xl transition-colors duration-700 ease-in-out"
          :class="colorMode === 'dark' ? ' text-green-100' : ' text-orange-500'">Dashboard</h1>
        <div>
          <div class="flex items-center gap-4">
            <UTooltip text="messages">
              <NuxtLink to="/Dashboard/messages" class="border-gray-200 border p-2 rounded-full flex items-center">
                <UIcon name="i-heroicons-envelope" class="text-2xl transition-colors duration-700 ease-in-out"
                  :class="colorMode === 'dark' ? ' text-green-100' : ' text-orange-500'" />
              </NuxtLink>
            </UTooltip>
            <NuxtLink :to="`/Dashboard/Profile/${memberId}`" class="relative flex items-center gap-4">
              <UChip position="bottom-right" class="absolute z-50 top-2 right-1"></UChip>
              <UTooltip text="profile setting">
                <img :src="memberImage || defaultImage" alt="Profile Image"
                  class="h-10 w-10 border border-gray-200 object-contain rounded-full transition-transform duration-700 ease-in-out" />
              </UTooltip>
            </NuxtLink>
            <UTooltip text="change theme">
              <button @click="toggleTheme"
                class="p-3 flex items-center border border-gray-200 dark:bg-gray-800 rounded-full transition-colors duration-700 ease-in-out">
                <UIcon :name="colorMode === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
                  class="text-xl transition-colors duration-700 ease-in-out" />
              </button>
            </UTooltip>
          </div>
        </div>
      </div>

      <div class="pt-4 px-4 min-h-screen mb-6">
        <slot />
      </div>

      <div :class="colorMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'"
        class="w-full p-3 sticky bottom-0 mb-0 text-primary shadow-xl transition-colors duration-700 ease-in-out">
        <h1 class="text-center font-semibold text-md">
          &copy; {{ new Date().getFullYear() }} All rights reserved
        </h1>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useAuthStore} from '@/stores/auth'
import defaultImage from '../assets/cel.jpeg'

const dropdownOpen = ref(false)
const dropdownOpenx = ref(false)
const dropdownOpens = ref(false)
const dropdownBlog = ref(false)

const memberStore = useAuthStore()
const messageStore = useMessageStore()
const blogStore = useBlogStore()
const memberId = ref<string>('')

const isClient = typeof window !== 'undefined'

const userName = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.userName : ''
  }
  return ''
})


const memberImage = computed(() => {
  if (isClient) {
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    return user ? user.memberImage?.url : ''
  }
  return ''
})


const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const toggleDrop = () => {
  dropdownOpenx.value = !dropdownOpenx.value
}
const toggleDroping = () => {
  dropdownOpens.value = !dropdownOpens.value
}
const toggleBlogs = () =>{
  dropdownBlog.value = !dropdownBlog.value
}


const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}


const logout = () => {
  memberStore.logout()
}

onMounted(() => {
  if (isClient) {
    const userInfo = JSON.parse(localStorage.getItem("user") || '{}')
    console.log('User Info:', userInfo)
    memberId.value = userInfo._id || ''

    memberStore.fetchUser(memberId.value)
      .then(() => {
      })
      .catch(error => {
        console.error('Failed to fetch members', error)
      })
  }

})
</script>

<style scoped></style>
