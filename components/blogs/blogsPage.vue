<template>
  <div>
    <section class="py-10 bg-gray-50 dark:bg-gray-900 sm:py-16 lg:py-24">
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
            <div v-if="filteredBlogs.length > 0" v-for="item in filteredBlogs" :key="item._id">
              <div class="p-5 dark:bg-gray-800 bg-white rounded-xl">
                <div class="relative">
                  <a :href="'/blogs/' + item._id" class="block aspect-w-4 aspect-h-3">
                    <img class="object-cover w-full h-full" :src="item.blogImage?.url" alt="" />
                  </a>
                  <div class="absolute top-4 left-4">
                    <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                      {{ item.blogStatus }}
                    </span>
                  </div>
                </div>
                <p class="mt-5 text-xl lg:text-2xl font-semibold truncate">
                  <a :href="'/blogs/' + item._id">{{ item.blogName }}</a>
                </p>
                <p class="mt-4 text-base truncate">{{ item.blogDescription }}</p>
                <div class="flex items-center gap-4 text-xl py-2">
                  <UIcon name="i-heroicons-hand-thumb-up" class="" @click="handleLikes(item._id)" />
                  <span >{{ likeCounts[item._id] || 0 }}</span>
                   <UIcon name="i-heroicons-hand-thumb-down" class="" @click="handledisLikes(item._id)" />
                  <span>{{ dislikeCounts[item._id] || 0 }}</span> 
                </div>
                <a :href="'/blogs/' + item._id" class="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useBlogStore } from '~/stores/blogs';
import { useAuthStore } from '~/stores/auth';

const blogStore = useBlogStore();
const authStore = useAuthStore();
const searchQuery = ref('');
const likeCounts = ref<{ [key: string]: number }>({});
const dislikeCounts = ref<{ [key: string]: number }>({});
const likedBlogs = ref<{ likes: { [key: string]: boolean } }>({ likes: {} });

const handleLikes = async (blogId: string) => {
  try {
    const userId = authStore.user?.id;

    if (!likedBlogs.value.likes[blogId]) {
      await blogStore.handleLike(blogId);

      likeCounts.value[blogId] = (likeCounts.value[blogId] || 0) + 1;
      likedBlogs.value.likes[blogId] = true;

      console.log('User ID:', userId, 'liked blog ID:', blogId);
    } else {
      await blogStore.handleDislike(blogId);

      likeCounts.value[blogId] = Math.max(likeCounts.value[blogId] - 1, 0);
      likedBlogs.value.likes[blogId] = false;

      console.log('User ID:', userId, 'unliked blog ID:', blogId);
    }
  } catch (error) {
    console.error('Error liking/unliking the blog:', error);
  }
};

const handledisLikes = async (blogId: string) => {
  try {
    const userId = authStore.user?.id;

    if (likedBlogs.value.likes[blogId]) {
      await blogStore.handleDislike(blogId);


      likeCounts.value[blogId] = Math.max((likeCounts.value[blogId] || 0) - 1, 0);
      likedBlogs.value.likes[blogId] = false;

      console.log('User ID:', userId, 'disliked blog ID:', blogId);
    } else {

      await blogStore.handleLike(blogId);

  
      likeCounts.value[blogId] = (likeCounts.value[blogId] || 0) + 1;
      likedBlogs.value.likes[blogId] = true;

      console.log('User ID:', userId, 'liked blog ID:', blogId);
    }
  } catch (error) {
    console.error('Error liking/disliking the blog:', error);
  }
};

const filteredBlogs = computed(() =>
  blogStore.blogs.filter(blog =>
    blog.blogName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  .reverse()
);
onMounted(() => {
  blogStore.fetchBlogs();
});
</script>

<style scoped>

</style>
