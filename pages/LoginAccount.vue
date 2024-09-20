<template>
  <section class="bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="flex items-center justify-center px-4 py-10 bg-blue-50 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <div class="pb-5">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">Hey 👋 Welcome Back !!</h2>
            <p class="mt-2 text-base text-gray-600">You don't have an account? <a href="/createAccount" title=""
                class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create Account</a>
            </p>
          </div>
          <span class="text-red-500">{{ errorMesage }}</span>
          <span class="text-green-500">{{ successMessage }}</span>
          <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <div class="space-y-5">
              <div>
                <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                <div class="mt-2.5 relative">
                  <input type="email" name="" id="" placeholder="Enter Email" v-model="state.email"
                    class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="" class="text-base font-medium text-gray-900"> Password </label>
                </div>
                <div class="mt-2.5 relative">
                  <input :type="isPasswordVisible ? 'text' : 'password'" name="" id="" placeholder="Enter Password" v-model="state.password"
                    class="block relative w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                    <UIcon :name="isPasswordVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" @click="togglePasswordVisibility" class="absolute top-5 right-4"/>
                </div>
              </div>

              <div>
                <UButton type="submit" :loading="isLoading" :disabled="isLoading"
                  class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                  <span v-if="!isLoading">Log in</span>
                  <span v-else>Logging in...</span>
                </UButton>
              </div>
            </div>
          </UForm>
        </div>
      </div>

      <div class="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-white sm:px-6 lg:px-8">
            <div>
              <img class="w-[400px] mx-auto" src="../assets/login.avif" alt="" />
  
              <div class="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 class="text-2xl font-bold text-center text-black">Franklin Programmer</h3>
                <p class="leading-relaxed text-center text-gray-500 mt-2.5">
                  create account in my website if you're intrested you can hire me.
                </p>
  
                <div class="flex items-center justify-center mt-10 space-x-3">
                  <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/editorial-darkmode/24/editorial_html-512.png" alt="" width="100" height="100">
                  </div>
                  <div>
                    <img src="../assets/java.png" alt="" width="100" height="100">
                  </div>
                  <div>
                    <img src="../assets/vuejs.png" alt="" width="100" height="100">
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { FormError, FormSubmitEvent } from '#ui/types';


const state = reactive({
  email: '',
  password: '',
  userName: ''
});

definePageMeta({
  layout:'auth'
})

const isLoading = ref(false);
const errorMesage = ref()
const successMessage = ref()
const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

const memberStore = useAuthStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();

  const errors = validate(state);
  if (errors.length > 0) {
    console.log('Validation errors:', errors);
    return;
  }

  isLoading.value = true;

  try {
    if (await memberStore.login({ email: state.email, password: state.password })) {
      successMessage.value = "Login successful ✔️";
      setTimeout(() => {
        successMessage.value = null
      }, 3000)
    } else {
      errorMesage.value = "fail to login plz check your cridential and try again ❌";
      setTimeout(() => {
        errorMesage.value = null
      }, 3000)
    }

  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
