<template>
    <div>
      <!-- Existing code -->
      <section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-blue-600 sm:text-4xl lg:text-5xl">Contact us</h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
          </div>
          <div class="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div class="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
              <div v-for="item in items" :key="item.id">
                <div class="overflow-hidden bg-white rounded-xl">
                  <div class="p-6">
                    <UIcon class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" :name="item.icon"/>
                    <p class="mt-6 text-lg font-medium text-gray-900">{{ item.phoneNumber }}</p>
                    <p class="mt-1 text-lg font-medium text-gray-900">{{ item.email }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 overflow-hidden bg-white rounded-xl">
              <div class="px-6 py-12 sm:p-12">
                <h3 class="text-3xl font-semibold text-center text-gray-900">Send us a message</h3>
                <form @submit.prevent="handleSubmit" class="mt-14">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <label for="name" class="text-base font-medium text-gray-900"> Your name </label>
                      <div class="mt-2.5 relative">
                        <input v-model="formData.fullName" id="name" placeholder="Enter your full name" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                      </div>
                    </div>
                    <div>
                      <label for="email" class="text-base font-medium text-gray-900"> Email address </label>
                      <div class="mt-2.5 relative">
                        <input v-model="formData.email" id="email" type="email" placeholder="Enter your email address" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                      </div>
                    </div>
                    <div>
                      <label for="phone" class="text-base font-medium text-gray-900"> Phone number </label>
                      <div class="mt-2.5 relative">
                        <input v-model="formData.phoneNumber" id="phone" type="tel" placeholder="Enter your phone number" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                      </div>
                    </div>
                    <div>
                      <label for="company" class="text-base font-medium text-gray-900"> Company name </label>
                      <div class="mt-2.5 relative">
                        <input v-model="formData.campanyName" id="company" placeholder="Enter your company name" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                      </div>
                    </div>
                    <div class="sm:col-span-2">
                      <label for="message" class="text-base font-medium text-gray-900"> Message </label>
                      <div class="mt-2.5 relative">
                        <textarea v-model="formData.message" id="message" placeholder="Enter your message" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600" rows="4"></textarea>
                      </div>
                    </div>
                    <div class="sm:col-span-2">
                      <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useMessageStore } from '~/stores/message'; // Adjust the import path as needed
import type { MessageFormState } from '~/types';
  
  const items = [
    {
      id: 1,
      icon: "i-heroicons:phone",
      phoneNumber: "+123 456 789",
      email: "info@example.com"
    },
    // Add more items if needed
  ];
  
  const formData = ref<MessageFormState>({
  fullName: '',
  email: '',
  phoneNumber: '',
  campanyName: '', // Ensure this matches your type
  message: ''
});

  
  const messageStore = useMessageStore();
  
  const handleSubmit = async () => {
  try {
    await messageStore.sendmessage(formData.value);
    formData.value = {
      fullName: '',
      email: '',
      phoneNumber: '',
      campanyName: '', // Ensure this matches your type
      message: ''
    };
  } catch (error) {
    console.error('Failed to send message', error);
  }
};

  </script>
  