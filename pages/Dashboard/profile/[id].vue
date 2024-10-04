<template>
  <div>
    <div>
      <h1 class="font-black pb-5 text-3xl text-primary">Profile Setting</h1>
    </div>
    <div class="flex items-center py-7 justify-center w-full">
      <div class="w-[70%]">
        <div class="flex justify-center flex-col items-center">
          <h1 class="py-2 font-semibold text-orange-400 text-xl">{{ user?.userName }}</h1>
        </div>
        <hr>
        <div class="flex gap-4 mb-3 p-4 rounded-xl justify-between">
          <div class="text-xl font-semibold text-primary">Email Address:</div>
          <div class="text-xl font-light">{{ user?.email }}</div>
        </div>
        <div class="flex gap-4 mb-4 p-4 rounded-xl justify-between">
          <div class="text-xl font-semibold text-primary">Username:</div>
          <div class="text-xl font-light">{{ user?.userName }}</div>
        </div>
        <div class="flex mb-4 gap-4 rounded-xl p-4 justify-between">
          <div class="text-xl font-semibold text-primary">Role:</div>
          <div class="text-xl font-light">{{ user?.role }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { User } from '~/types';

const user = ref<User | null>(null);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser); 
  }
});
</script>

<style scoped>
</style>
