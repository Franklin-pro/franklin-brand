<template>
  <div>
    <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex justify-between">
          <div class="flex max-sm:flex-col items-center justify-between gap-5 lg:text-left py-4">
            <div>
              <h2 class="text-3xl font-bold leading-tight text-blue-500 sm:text-4xl lg:text-5xl">Our Blogs</h2>
              <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">my all blogs i posted you can know me better.</p>
            </div>
            <div>
              <div class="mt-2.5 relative">
                <input type="text" placeholder="Search..." v-model="searchQuery"
                  class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div class="lg:max-w-full">
          <div class="overflow-hidden grid lg:grid-cols-3 gap-4 rounded">
            <div v-if="filteredBlogs.length > 0" v-for="item in filteredBlogs" :key="item.id">
              <div class="p-5 bg-white rounded-xl">
                <div class="relative">
                  <a href="#" title="" class="block aspect-w-4 aspect-h-3">
                    <img class="object-cover w-full h-full" :src="item.blogImage?.url" alt="" />
                  </a>

                  <div class="absolute top-4 left-4">
                    <span
                      class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">{{ item.blogStatus }}</span>
                  </div>
                </div>
                <p class="mt-5 text-2xl font-semibold">
                  <a href="#" title="" class="text-black">{{ item.blogName }}</a>
                </p>
                <p class="mt-4 text-base truncate text-gray-600">{{ item.blogDescription }}</p>
                <a :href="item._id" title=""
                  class="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                  Continue Reading
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <template v-else-if="filteredBlogs">
              <div v-for="n in 6" :key="n" class="p-5 bg-white rounded-xl">
                <div class="relative lg:mb-12">
                  <USkeleton class="h-[300px] w-[400px]" :ui="{ rounded: 'rounded-md' }" />
                </div>
                <div class="space-y-4">
                  <USkeleton class="h-8 w-[300px]" />
                  <USkeleton class="h-4 w-[250px]" />
                  <USkeleton class="h-4 w-[280px]" />
                  <USkeleton class="h-4 w-[120px]" />
                </div>
              </div>
            </template>
            <div v-else>
<h1>no data here</h1>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mt-8 space-x-3 lg:hidden">
          <button type="button"
            class="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button type="button"
            class="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const blogStore = useBlogStore();

const filteredBlogs = computed(() => {
  if (!blogStore.blogs) return [];
  return blogStore.blogs
    .filter((blog) => {
      return (
        blog.blogName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blog.blogStatus.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    })
    .reverse();
});

onMounted(async () => {
  await blogStore.fetchBlogs();
});
</script>

<style scoped></style>
