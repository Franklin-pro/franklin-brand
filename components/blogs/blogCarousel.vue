<template>
  <div class="carousel-container relative overflow-hidden rounded-lg">
    <div
      class="carousel-wrapper flex transition-transform duration-500"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }" 
    >
      <div
      v-if="filteredBlogs.length > 0"
        v-for="(item, index) in filteredBlogs"
        :key="item.id"
        class="carousel-item w-full lg:w-1/3 flex-shrink-0 p-4"
      >
        <img :src="item.blogImage?.url" class="w-full h-60 object-cover rounded-lg" draggable="false" />
        <div class="carousel-content p-4 dark:bg-gray-700 bg-white">
          <span class="carousel-status text-gray-500 text-xs uppercase">{{ item.blogStatus }}</span>
          <h3 class=" text-lg text-black font-bold mt-2">{{ item.blogName}}</h3>
          <p class="carousel-description text-sm truncate text-gray-600">{{ item.blogDescription}}</p>
        </div>
      </div>
      <template v-else>
              <div v-for="n in 6" :key="n" class="p-5 dark:bg-gray-700 bg-white rounded-xl">
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
    <!-- Previous and Next buttons -->
    <UButton @click="prevSlide" icon="i-heroicons-chevron-left" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2 text-white bg-black/30 hover:bg-black/50"/>
    <UButton @click="nextSlide"  icon="i-heroicons-chevron-right"  class="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2 text-white bg-black/30 hover:bg-black/50"/>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const blogStore = useBlogStore()

const filteredBlogs = computed(() => {
  if (!blogStore.blogs) return [];
  return blogStore.blogs
    .filter(blogs => {
      return (
        blogs.blogName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blogs.blogStatus.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    })
    .reverse();
});

onMounted(async () => {
  await blogStore.fetchBlogs();
});

// Active index to control the current slide
const activeIndex = ref(0);

// Calculate the total number of slides based on filtered blogs
const totalItems = computed(() => filteredBlogs.value.length);
const itemsPerPage = 1; // Slide one card at a time
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// Move to the next slide
const nextSlide = () => {
  if (activeIndex.value < totalItems.value - 1) {
    activeIndex.value++;
  } else {
    activeIndex.value = 0; // Reset to the first slide if at the end
  }
};

// Move to the previous slide
const prevSlide = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  } else {
    activeIndex.value = totalItems.value - 1; // Go to the last slide if at the beginning
  }
};
</script>


<style scoped>
.carousel-container {
  max-width: 1200px;
  margin: auto;
  position: relative;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
}

.carousel-item {
  flex-shrink: 0;
}

.carousel-content {
  background-color: white;
  padding: 16px;
}

button {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  position: absolute;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
