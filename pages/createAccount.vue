<template>
  <div>
    <section class="bg-white">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex items-center justify-center px-4 py-10 bg-blue-50 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up to Celebration</h2>
            <p class="mt-2 text-base text-gray-600">Already have an account? 
              <a href="/loginAccount" class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Login</a>
            </p>

            <UForm :validate="validate" :state="state" class="mt-8" @submit="onSubmit">
              <div class="space-y-5">
                <div>
                  <label for="" class="text-base font-medium text-gray-900">User Name</label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      name="userName"
                      v-model="state.userName"
                      placeholder="Enter your user name"
                      class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">Email address</label>
                  <div class="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      v-model="state.email"
                      placeholder="Enter email to get started"
                      class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">Password</label>
                  <div class="mt-2.5 relative">
                    <input :type="isVisiblePassword ? 'text' : 'password'" v-model="state.password"
                      placeholder="Enter Password"
                      class="block relative w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                    <UIcon :name="isVisiblePassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" @click="passwordVisibility" class="absolute top-5 right-4"/>
                  </div>
                  <!-- Password Strength Indicator -->
                  <p :class="passwordStrengthClass" class="mt-1 text-sm">{{ passwordStrength }}</p>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">Retype Password</label>
                  <div class="mt-2.5 relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      v-model="state.confirmPassword"
                      placeholder="Retype password"
                      class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                    <UIcon name="i-heroicons-eye-slash" class="absolute top-5 right-4" disable/>
                  </div>
                </div>

                <div>
                  <UButton type="submit" :loading="isLoading" :disabled="isLoading"
                    class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                    <span v-if="!isLoading">Create Account</span>
                    <span v-else>Creating...</span>
                  </UButton>
                </div>
              </div>
            </UForm>
          </div>
        </div>
        <div class="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-white sm:px-6 lg:px-8">
            <div>
              <img class="w-[400px] mx-auto" src="https://img.freepik.com/premium-vector/boy-is-creating-account_118167-6336.jpg?w=740" alt="" />
  
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

        <!-- Rest of your layout... -->
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { UserFormState } from '~/types';

const state = reactive<UserFormState>({
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
});

definePageMeta({
  layout:'auth'
})
const isVisiblePassword = ref(false);
const isLoading = ref(false);

const passwordVisibility = () => {
  isVisiblePassword.value = !isVisiblePassword.value;
};

// Function to check password strength
const checkPasswordStrength = (password: string): string => {
  if (password.length < 8) return 'Make Strong Password';
  if (/^[A-Z]/.test(password) && /[\d\W]/.test(password)) return 'Strong';
  if (/[\W]/.test(password)) return 'Medium';
  return 'Weak';
};

// Computed property for password strength and class
const passwordStrength = computed(() => checkPasswordStrength(state.password));

const passwordStrengthClass = computed(() => {
  switch (passwordStrength.value) {
    case 'Weak':
      return 'text-red-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Strong':
      return 'text-green-500';
    default:
      return '';
  }
});

// Validation function
const validate = (state: UserFormState): FormError[] => {
  const errors: FormError[] = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.userName) errors.push({ path: 'userName', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  if (!state.confirmPassword) errors.push({ path: 'confirmPassword', message: 'Required' });
  if (state.password !== state.confirmPassword) errors.push({ path: 'confirmPassword', message: 'Passwords do not match' });
  return errors;
};

const memberStore = useAuthStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();
  const errors = validate(state);
  if (errors.length) {
    console.error(errors);
    return;
  }
  isLoading.value = true;
  await memberStore.createAccount(state);
  isLoading.value = false;
  navigateTo('/loginAccount');
 

}
</script>

