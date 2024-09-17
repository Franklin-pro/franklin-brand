<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import icons from '~/assets/me.png';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { BlogFormState } from '~/types';

const state = reactive<BlogFormState>({
  blogName: '',
  blogStatus: '',
  blogDescription: '',
  blogImage: null,
  url:''
});

definePageMeta({
  layout: 'dashboard',
});

const validate = (state: BlogFormState): FormError[] => {
  const errors: FormError[] = [];
  if (!state.blogName) errors.push({ path: 'blogName', message: 'Required' });
  if (!state.blogDescription) errors.push({ path: 'blogDescription', message: 'Required' });
  if (!state.blogStatus) errors.push({ path: 'blogStatus', message: 'Required' });
  return errors;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    state.blogImage = target.files[0];
  }
};

const router = useRouter();
const blogStore = useBlogStore()

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();

  const errors = validate(state);
  if (errors.length) {
    console.error(errors);
    return;
  }

  await blogStore.createBlog(state);
}

const imagePreview = computed(() => {
  return state.blogImage ? URL.createObjectURL(state.blogImage) : icons;
});
</script>

<template>
  <div class="py-4">
    <h1 class="font-bold text-2xl text-primary">Creating New Blogs</h1>
  </div>
  <div class="flex justify-center">
    <UCard class="w-[80%]">
      <div class="relative flex flex-col justify-center items-center">
        <div class="relative">
          <img :src="imagePreview" alt="User Image" class="w-20 h-20 rounded-full object-cover bg-gray-200" />
          <label for="image-upload"
            class="absolute inset-0 flex justify-center items-center text-3xl text-white bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
            <UIcon name="heroicons-camera" />
          </label>
        </div>
        <input id="image-upload" type="file" class="hidden" @change="onFileChange" accept="image/*" />
        <span class="text-orange-500">Upload Blogs Image</span>
      </div>

      <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">


          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="Enter Blog Name" v-model="state.blogName"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="mt-2.5 relative">
            <input type="text" name="" id="" placeholder="Enter Blog Status" v-model="state.blogStatus"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>

          <div class="sm:col-span-2">
            <label for="" class="text-base font-medium text-gray-900"> Message </label>
            <div class="mt-2.5 relative">
              <textarea name="" id="" placeholder="Blog Description ..." v-model="state.blogDescription"
                class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                rows="4"></textarea>
            </div>
          </div>
          <div class="sm:col-span-2">
            <button type="submit"
              class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
              Create Blogs
            </button>
          </div>
        </div>



      </UForm>
    </UCard>
  </div>
</template>
