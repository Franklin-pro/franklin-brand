<template>
  <div>
    <UCard>
      <div>
        <div class="pb-5 flex justify-between">
          <div>
            <div class="text-primary font-medium text-xl">UPDATE {{ blogs.blogName }}</div>
            <div class="text-[13px]">{{ blogs.blogStatus }}</div>
          </div>
          <div class="flex justify-end cursor-pointer hover:text-red-400">
            <UIcon name="i-heroicons-x-mark-20-solid" class="text-3xl" @click="closeCard" />
          </div>
        </div>

        <div class="justify-between">

          <div class="grid gap-3 lg:grid-cols-2 pb-6">
            <div class="mt-2.5 relative">
              <input type="text" name="" id="" placeholder="Blog Name" v-model="blogs.blogName"
                class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
            </div>
            <div class="mt-2.5 relative">
              <input type="text" name="" id="" placeholder="Blog Status" v-model="blogs.blogStatus"
                class="block w-full p-3 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
            </div>
            <div class="sm:col-span-2">
              <label for="" class="text-base font-medium text-gray-900"> Message </label>
              <div class="mt-2.5 relative">
                <textarea name="" id="" placeholder="Blog Description ..." v-model="blogs.blogDescription"
                  class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                  rows="4"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-2 flex gap-3">
        <button type="button" @click="updateBlog"
          class="w-full bg-blue-500  flex items-center gap-3 justify-center text-white py-2 rounded hover:bg-blue-600">
          <UIcon name="i-heroicons-pencil-square-16-solid" class="text-2xl" /> Update Member
        </button>
        <button type="button" @click="closeCard"
          class="w-full flex items-center gap-3 justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600">
          <UIcon name="i-heroicons-x-mark-16-solid" class="text-2xl" /> Cancel Action
        </button>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useBlogStore } from '~/stores/blogs';
import type { Blogs, UpdateBlog as UpdateBlogType } from '~/types';

const props = defineProps<{ blog: Blogs | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const blogs = ref<Blogs>({
  id: '',
  _id: '',
  blogName: '',
  blogStatus: '',
  blogDescription: '',
  blogImage: undefined,
  url: ''
});

watch(() => props.blog, (newBlog) => {
  if (newBlog) {
    blogs.value = { ...newBlog };
  }
}, { immediate: true });

const blogStore = useBlogStore();

const updateBlog = async () => {
  if (blogs.value) {
    try {
      await blogStore.updateBlog(blogs.value._id, blogs.value as UpdateBlogType);
      emit('close');
      window.location.reload();
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  }
};

function closeCard() {
  emit('close');
}
</script>