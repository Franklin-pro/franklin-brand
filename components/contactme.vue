<template>

  <section class="py-10 bg-gray-100 dark:bg-gray-800 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="flex items-end justify-between">
              <div class="flex-1 text-center lg:text-left py-4">
                  <h2 class="text-3xl font-bold leading-tight text-blue-500 sm:text-4xl lg:text-5xl">Contact Us</h2>
                  <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed dark:text-gray-400 lg:mx-0">You can hire me if you're interested, or you can contact me here with any suggestions you may have.</p>
              </div>
          </div>
  
          <div class="max-w-5xl mx-auto mt-12 sm:mt-16">
              <div class="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                  <div class="overflow-hidden bg-white dark:bg-gray-700 rounded-xl">
                      <div class="p-6">
                          <svg class="flex-shrink-0 w-10 h-10 mx-auto dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="1"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                          </svg>
                          <p class="mt-6 text-lg font-medium ">+250-783-446-449</p>
                          <p class="mt-1 text-lg font-medium ">+250-790-019-543</p>
                      </div>
                  </div>
  
                  <div class="overflow-hidden bg-white dark:bg-gray-900 rounded-xl">
                      <div class="p-6 max-sm:p-3">
                          <svg class="flex-shrink-0 w-10 h-10 mx-auto dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <p class="mt-6 text-lg max-sm:text-sm font-medium ">franklinprogrammer@gmail.com</p>
                      </div>
                  </div>
  
                  <div class="overflow-hidden bg-white dark:bg-gray-600 rounded-xl">
                      <div class="p-6">
                          <svg class="flex-shrink-0 w-10 h-10 mx-auto dark:text-gray-200 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p class="mt-6 text-lg font-medium leading-relaxed ">GATENGA, KK 616 ST, Kigali-Kicukiro, RWANDA</p>
                      </div>
                  </div>
              </div>
  
              <div class="mt-6 overflow-hidden bg-white dark:bg-gray-900 rounded-xl">
                <div>
                    <Map/>
                </div>
                  <div class="px-6 py-12 sm:p-12">
                      <h3 class="text-3xl font-semibold  text-center  dark:text-gray-300">Send us a message</h3>
                      <h2 class="text-xl text-green-600">{{ alertMessage }}</h2>
                      <form @submit.prevent="onSubmit" class="mt-14">
                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                              <div>
                                  <label for="" class="text-base font-medium dark:text-gray-300"> Your name </label>
                                  <div class="mt-2.5 relative">
                                      <input type="text" name="" id="" placeholder="Full Name" v-model="state.fullName" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                  </div>
                              </div>
  
                              <div>
                                  <label for="" class="text-base font-medium dark:text-gray-300"> Email address </label>
                                  <div class="mt-2.5 relative">
                                      <input type="email" name="" id="" placeholder="Email Address" v-model="state.email" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                  </div>
                              </div>
  
                              <div class="sm:col-span-2">
                                <label for="" class="text-base font-medium dark:text-gray-300"> Company name </label>
                                <div class="mt-2.5 relative">
                                    <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Company Name"
                                    v-model="state.campanyName"
                                    class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                </div>
                                </div>
                              <div class="sm:col-span-2">
                                  <label for="" class="text-base font-medium dark:text-gray-300"> Message </label>
                                  <div class="mt-2.5 relative">
                                      <textarea name="" id=""placeholder="Message..." v-model="state.message" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600" rows="4"></textarea>
                                  </div>
                              </div>
  
                              <div>
                                  <div class="sm:col-span-2">
                                  <button :loading="isLoading" :disabled="isLoading" type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                      <span v-if="!isLoading">Send</span>
                                      <span v-else>Sending ...</span>
                                  </button>
                              </div>
           
                </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </section>
  
    
    </template>
    
    <script setup lang="ts">
    import { reactive } from 'vue';
    import { useMessageStore } from '~/stores/message';
    import type { MessageFormState } from '~/types';
  
    const state = reactive<MessageFormState>({
      fullName: '',
      email: '',
      campanyName: '',
      message: '',
  
    });
    definePageMeta({
        middleware:'authentication'
    })
  const isLoading =ref(false)
  const alertMessage = ref()
    const messageStore = useMessageStore();
  
    const validate = (state: MessageFormState): boolean => {
  return (
    state.fullName?.trim() !== '' &&
    state.email?.trim() !== '' &&
    state.campanyName?.trim() !== '' &&
    state.message?.trim() !== ''
  );
};

  
const onSubmit = async () => {
  if (!validate(state)) {
    alert('Please fill in all fields.');
    return;
  }
  isLoading.value = true;
  try {
    await messageStore.createMessage(state);
    alertMessage.value = "Message sent successfully!";
    setTimeout(() => {
      alertMessage.value = null;
    }, 3000);
    Object.keys(state).forEach((key) => (state[key as keyof MessageFormState] = ''));
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    isLoading.value = false;
  }
};

    </script>
    