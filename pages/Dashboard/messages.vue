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
          <div>
            <div class="flex py-4 gap-4">
              <h1 class="text-md font-bold text-gray-500">Email: <span>{{ item.email }}</span></h1> |
            </div>
            <div    :class="[
                'border flex justify-between p-4 border-gray-300 rounded-xl',
                index === 0 ? 'border-green-500 border-4' : ''
              ]">
              <div>
                <h3 class="font-extrabold text-xl pb-4"><span>{{ item.fullName }}</span></h3>
                <p class="py-2">{{ item.message }}</p> 
              </div>
              <div>
                <UTooltip text="delete message">
                  <UIcon name="i-heroicons-trash" class="text-xl cursor-pointer hover:bg-orange-600 duration-500" @click="deleteMessage(item._id)" />
                </UTooltip>
              </div>
            </div>
          </div>
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
