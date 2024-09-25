<template>
  <div>
    <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex flex-col lg:flex-row justify-between gap-5 items-center py-4">
          <div>
            <h2 class="text-3xl font-bold text-center lg:text-left leading-tight text-blue-500 sm:text-4xl lg:text-5xl">Our Blogs</h2>
            <p class="max-w-xl mx-auto mt-4 text-center lg:text-left text-base leading-relaxed text-gray-600">My all blogs I posted so you can know me better.</p>
          </div>
          <div class="w-full lg:w-auto mt-2.5 relative">
            <input
              type="text"
              placeholder="Search..."
              v-model="searchQuery"
              class="block w-full px-4 py-4 placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
            />
          </div>
        </div>

        <div class="lg:max-w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded">
            <div v-if="filteredBlogs.length > 0" v-for="item in filteredBlogs" :key="item.id">
              <div class="p-5 bg-white rounded-xl">
                <div class="relative">
                  <a href="#" title="" class="block aspect-w-4 aspect-h-3">
                    <img class="object-cover w-full h-full" :src="item.blogImage?.url" alt="" />
                  </a>
                  <div class="absolute top-4 left-4">
                    <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                      {{ item.blogStatus }}
                    </span>
                  </div>
                </div>
                <p class="mt-5 text-xl lg:text-2xl font-semibold truncate">
                  <a href="#" title="" class="text-black">{{ item.blogName }}</a>
                </p>
                <p class="mt-4 text-base text-gray-600 truncate">{{ item.blogDescription }}</p>
                <div class="flex items-center gap-4 text-xl py-2">
                  <UIcon name="i-heroicons-hand-thumb-up" @click="handleLike(item._id)" />
                  <span>{{ likeCounts[item._id] || 0 }}</span>
                  <UIcon name="i-heroicons-hand-thumb-down" @click="handleDislike(item._id)" />
                  <span>{{ dislikeCounts[item._id] || 0 }}</span>
                </div>
                <a :href="item._id" class="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">
                  Continue Reading
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <template v-else-if="filteredBlogs.length === 0">
              <div>
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
              <span>no blogs found</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const likeCounts = ref<{ [key: string]: number }>({});
const dislikeCounts = ref<{ [key: string]: number }>({});
const likedBlogs = ref<{ [key: string]: boolean }>({});
const dislikedBlogs = ref<{ [key: string]: boolean }>({});

const searchQuery = ref('');
const blogStore = useBlogStore();

const loadInteractionData = () => {
  const storedLikes = localStorage.getItem('likeCounts');
  const storedDislikes = localStorage.getItem('dislikeCounts');
  const storedLikedBlogs = localStorage.getItem('likedBlogs');
  const storedDislikedBlogs = localStorage.getItem('dislikedBlogs');
  
  likeCounts.value = storedLikes ? JSON.parse(storedLikes) : {};
  dislikeCounts.value = storedDislikes ? JSON.parse(storedDislikes) : {};
  likedBlogs.value = storedLikedBlogs ? JSON.parse(storedLikedBlogs) : {};
  dislikedBlogs.value = storedDislikedBlogs ? JSON.parse(storedDislikedBlogs) : {};
};

const saveInteractionData = () => {
  localStorage.setItem('likeCounts', JSON.stringify(likeCounts.value));
  localStorage.setItem('dislikeCounts', JSON.stringify(dislikeCounts.value));
  localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs.value));
  localStorage.setItem('dislikedBlogs', JSON.stringify(dislikedBlogs.value));
};

const handleLike = (blogId: string) => {
  if (!likedBlogs.value[blogId] && !dislikedBlogs.value[blogId]) {
    likeCounts.value[blogId] = (likeCounts.value[blogId] || 0) + 1;
    likedBlogs.value[blogId] = true;
    saveInteractionData();
  } else {
    alert('You have already liked or disliked this blog');
  }
};

const handleDislike = (blogId: string) => {
  if (!likedBlogs.value[blogId] && !dislikedBlogs.value[blogId]) {
    dislikeCounts.value[blogId] = (dislikeCounts.value[blogId] || 0) + 1;
    dislikedBlogs.value[blogId] = true;
    saveInteractionData();
  } else {
    alert('You have already liked or disliked this blog');
  }
};

const filteredBlogs = computed(() => {
  if (!blogStore.blogs) return [];
  return blogStore.blogs
    .filter((blog) => blog.blogName.toLowerCase().includes(searchQuery.value.toLowerCase()) || blog.blogStatus.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .reverse();
});

onMounted(async () => {
  await blogStore.fetchBlogs();
  loadInteractionData();
});
</script>

<style scoped>
</style>
