<template>
  <div>
    <div class="grid lg:grid-cols-2 md:grid-cols-1 sm:gap-20 justify-between min-h-screen items-center">
      <div class="h-[65%] w-[80%] p-5 mx-auto">
        <div class="py-6">
          <div class="text-4xl text-primary pb-4">Login Account</div>
          <p class="font-light">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <UCard class="">
          <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" size="lg" aria-describedby="email-error"/>
              <span id="email-error" class="text-red-500" v-if="errors.email">{{ errors.email }}</span>
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" size="lg" aria-describedby="password-error"/>
              <span id="password-error" class="text-red-500" v-if="errors.password">{{ errors.password }}</span>
            </UFormGroup>

            <UButton type="submit" class="px-8 text-[18px]" :disabled="loading">Sign-In</UButton>
            <div v-if="loading" class="text-center">Logging in...</div>
          </UForm>
        </UCard>
      </div>
      <div class="w-[80%]">
        <img src="/assets/login.avif" alt="Login Image" class="w-full h-auto"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useMemberStore } from '~/stores/members'; 
import type { FormError, FormSubmitEvent } from '#ui/types';

const state = reactive({
  email: '',
  password: '',
});

const errors = reactive<{ email?: string, password?: string }>({});
const loading = ref(false);

const validate = (state: any): FormError[] => {
  const validationErrors: FormError[] = [];
  errors.email = '';
  errors.password = '';

  if (!state.email) {
    validationErrors.push({ path: 'email', message: 'Email is required' });
    errors.email = 'Email is required';
  }
  if (!state.password) {
    validationErrors.push({ path: 'password', message: 'Password is required' });
    errors.password = 'Password is required';
  }
  return validationErrors;
};

// Get the store instance
const memberStore = useMemberStore();

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault(); 

  const validationErrors = validate(state);
  if (validationErrors.length > 0) {
    console.log('Validation errors:', validationErrors);
    return;
  }

  loading.value = true;
  try {
    await memberStore.signIn({ email: state.email, password: state.password });
  } catch (error) {
    console.error('Login failed:', error);
    alert('Failed to login. Please check your credentials and try again.');
  } finally {
    loading.value = false;
  }
}
</script>

<style>
/* Add any additional styling here */
</style>
