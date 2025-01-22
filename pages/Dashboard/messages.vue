<template>
  <div>
    <div class="p-3 flex justify-between items-center">
        <h1 class="py-5 text-3xl font-semibold text-primary-500">Messages From Clients</h1>
        <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        color="white"
        :trailing="false"
        placeholder="Search..."
        v-model="searchQuery"
      />
      </div>
    <div class=" rounded-xl p-4">
      <div class="grid lg:grid-cols-2 gap-4">
        <div v-if="filteredMembers.length">
          <div v-for="(item, index) in filteredMembers" :key="item.id">
         
<ol class="relative border-s border-gray-200 dark:border-gray-700">                  
    <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {{ item.email }} from {{ item.campanyName }}
        </time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.fullName }}</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{{ item.message }}</p>
   
    </li>
    
</ol>


        </div>
        </div>
        <div v-else>
          <div class="flex justify-center flex-col">
            <span class="text-center text-4xl ">no message yet</span>
            <img src="https://img.freepik.com/premium-vector/ban-message-icon-logo-label-vector-illustration_213497-2289.jpg?semt=ais_hybrid" alt="">
          </div>
         
        </div>
      
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useMessageStore } from '~/stores/message';
import { onMounted } from 'vue'; 
const colorMode = useColorMode(); 
 definePageMeta({
  layout:'dashboard',
  middleware:'authentication'
 })
 const searchQuery = ref('');
const messageStore = useMessageStore();

const filteredMembers = computed(() => {
  if (!messageStore.messages) return [];
  return messageStore.messages
    .filter(message => {
      return (
        message.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        message.campanyName.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    })
    .reverse()
});


const deleteMessage =async (id:string)=>{
  await messageStore.deleteMessage(id)
}

const messages = computed(() => messageStore.messages);

onMounted(async () => {
  await messageStore.fetchMessages();
});
</script>

<style></style>
