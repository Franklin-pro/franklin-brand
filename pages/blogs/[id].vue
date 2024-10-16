<template>
  <div>
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- If blog data is available -->
        <div v-if="blog" class="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
          <div class="relative lg:mb-12">
            <img
              class="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg"
              alt=""
            />
            <div class="pl-12 pr-6">
              <img
                class="relative"
                :src="blog?.blogImage?.url"
                alt="Blog Image"
              />
            </div>
          </div>

          <div class="2xl:pl-16">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
              {{ blog?.blogName }} 
            </h2>
            <p class="text-xl leading-relaxed text-gray-900 mt-9">
              {{ blog?.blogDescription }}  
            </p>
            <p class="mt-6 text-xl font-semibold leading-relaxed text-blue-500">
              {{ blog?.blogStatus }} 
            </p>
            <div class="flex items-center gap-4 text-xl py-2">
                  <UIcon name="i-heroicons-hand-thumb-up" class="bg-gray-700" @click="handleLike(blog._id)"/>
                  <span class="text-gray-700">{{ likeCounts[blog._id] || 0 }}</span>
                  <UIcon name="i-heroicons-hand-thumb-down" class="bg-black" @click="handleDislike(blog._id)"/>
                  <span class="text-gray-700">{{ dislikeCounts[blog._id] || 0 }}</span>
                </div>
          </div>
        </div>

        <div v-else class="flex justify-center items-center gap-x-4">
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
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '~/stores/blogs'; 
import type { Blogs } from '~/types';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const blogStore = useBlogStore();
const blogId = ref<string>(id); 
const blog = ref<Blogs | null>(null);
  const likeCounts = ref<{ [key: string]: number }>({});
const dislikeCounts = ref<{ [key: string]: number }>({});
const likedBlogs = ref<{ [key: string]: boolean }>({});
const dislikedBlogs = ref<{ [key: string]: boolean }>({}); 

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
  if (likedBlogs.value[blogId]) {
    // If already liked, remove the like
    likeCounts.value[blogId] = Math.max((likeCounts.value[blogId] || 1) - 1, 0);
    likedBlogs.value[blogId] = false;
  } else {
    // If disliked, remove the dislike
    if (dislikedBlogs.value[blogId]) {
      dislikeCounts.value[blogId] = Math.max((dislikeCounts.value[blogId] || 1) - 1, 0);
      dislikedBlogs.value[blogId] = false;
    }
    // Add the like
    likeCounts.value[blogId] = (likeCounts.value[blogId] || 0) + 1;
    likedBlogs.value[blogId] = true;
  }
  saveInteractionData();
};

const handleDislike = (blogId: string) => {
  if (dislikedBlogs.value[blogId]) {
    // If already disliked, remove the dislike
    dislikeCounts.value[blogId] = Math.max((dislikeCounts.value[blogId] || 1) - 1, 0);
    dislikedBlogs.value[blogId] = false;
  } else {
    // If liked, remove the like
    if (likedBlogs.value[blogId]) {
      likeCounts.value[blogId] = Math.max((likeCounts.value[blogId] || 1) - 1, 0);
      likedBlogs.value[blogId] = false;
    }
    // Add the dislike
    dislikeCounts.value[blogId] = (dislikeCounts.value[blogId] || 0) + 1;
    dislikedBlogs.value[blogId] = true;
  }
  saveInteractionData();
};


onMounted(async () => {
  if (blogId.value) {
    blog.value = await blogStore.fetchBlog(blogId.value);  
  }
});
</script>

<style scoped>

</style>