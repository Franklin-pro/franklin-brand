<template>
  <div>
    <section class="py-10 bg-gray-700 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex flex-col lg:flex-row justify-between gap-5 items-center py-4">
          <div>
            <h2 class="text-3xl font-bold text-center lg:text-left leading-tight text-blue-500 sm:text-4xl lg:text-5xl">
              Our Blogs
            </h2>
            <p class="max-w-xl mx-auto mt-4 text-center lg:text-left text-base leading-relaxed text-gray-600">
              My all blogs I posted so you can know me better.
            </p>
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
                    <iframe 
                      width="560" 
                      height="315" 
                      :src="`https://www.youtube.com/embed/${item.video?.url}`" 
                      title="YouTube video player" 
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </a>
                </div>
                <p class="mt-5 text-xl lg:text-2xl font-semibold truncate">
                  <a href="#" title="" class="text-black">{{ item.videoTitle }}</a>
                </p>
                <p class="mt-4 text-base text-gray-600 truncate">{{ item.videoDescription }}</p>
                <div class="flex items-center gap-4 text-xl py-2">
                  <UIcon name="i-heroicons-hand-thumb-up" class="bg-gray-700" @click="handleLike(item._id)" />
                  <span class="text-gray-700">{{ likeCounts[item._id] || 0 }}</span>
                  <UIcon name="i-heroicons-hand-thumb-down" class="bg-black" @click="handleDislike(item._id)" />
                  <span class="text-gray-700">{{ dislikeCounts[item._id] || 0 }}</span>
                </div>
                <a :href="`/blogs/${item._id}`"
                  class="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600">
                  Continue Reading
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd" />
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
              <span>No blogs found</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Upload Form -->
      <div>
        <UForm :validate="validate" :state="videoForm" class="space-y-4" @submit="onSubmit">
          <label for="video">Video File</label>
          <input type="file" @change="handleVideoUpload" />

          <label for="videoTitle">Video Title</label>
          <input type="text" v-model="videoForm.videoTitle" placeholder="Enter video title" />

          <label for="videoDescription">Video Description</label>
          <input type="text" v-model="videoForm.videoDescription" placeholder="Enter video description" />

          <label for="videoLink">Video YouTube Link</label>
          <input type="text" v-model="videoForm.videoLink" placeholder="Paste YouTube link" />

          <button type="submit">Submit</button>
        </UForm>
      </div>
    </section>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useBlogStore } from '@/stores/blogs';
import { useVideoStore } from '~/stores/video.store';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { VideoFormState } from '~/types';

const videoStore = useVideoStore();
const blogStore = useBlogStore();

const videoForm = ref<VideoFormState>({
  video: null, 
  videoTitle: '',
  videoDescription: '',
  videoLink: '',
  url:''
});

const handleVideoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validVideoTypes.includes(file.type)) {
      alert('Please upload a valid video file');
      return;
    }
    videoForm.value.video = file;
  } else {
    alert('Please upload a video file');
  }
};

const validate = (state: VideoFormState): FormError[] => {
  const errors: FormError[] = [];
  if (!state.videoTitle) errors.push({ path: 'videoTitle', message: 'Required' });
  if (!state.videoDescription) errors.push({ path: 'videoDescription', message: 'Required' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  event.preventDefault();

  const errors = validate(videoForm.value);
  if (errors.length) {
    console.error(errors);
    return;
  }

  await videoStore.uploadVideo(videoForm.value);
}

const likeCounts = ref<{ [key: string]: number }>({});
const dislikeCounts = ref<{ [key: string]: number }>({});
const likedBlogs = ref<{ [key: string]: boolean }>({});
const dislikedBlogs = ref<{ [key: string]: boolean }>({});

const loadInteractionData = () => {
  likeCounts.value = JSON.parse(localStorage.getItem('likeCounts') || '{}');
  dislikeCounts.value = JSON.parse(localStorage.getItem('dislikeCounts') || '{}');
  likedBlogs.value = JSON.parse(localStorage.getItem('likedBlogs') || '{}');
  dislikedBlogs.value = JSON.parse(localStorage.getItem('dislikedBlogs') || '{}');
};

const saveInteractionData = () => {
  localStorage.setItem('likeCounts', JSON.stringify(likeCounts.value));
  localStorage.setItem('dislikeCounts', JSON.stringify(dislikeCounts.value));
  localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs.value));
  localStorage.setItem('dislikedBlogs', JSON.stringify(dislikedBlogs.value));
};

const handleLike = (blogId: string) => {
  if (likedBlogs.value[blogId]) {
    likeCounts.value[blogId] = Math.max((likeCounts.value[blogId] || 1) - 1, 0);
    likedBlogs.value[blogId] = false;
  } else {
    if (dislikedBlogs.value[blogId]) {
      dislikeCounts.value[blogId] = Math.max((dislikeCounts.value[blogId] || 1) - 1, 0);
      dislikedBlogs.value[blogId] = false;
    }
    likeCounts.value[blogId] = (likeCounts.value[blogId] || 0) + 1;
    likedBlogs.value[blogId] = true;
  }
  saveInteractionData();
};

const handleDislike = (blogId: string) => {
  if (dislikedBlogs.value[blogId]) {
    dislikeCounts.value[blogId] = Math.max((dislikeCounts.value[blogId] || 1) - 1, 0);
    dislikedBlogs.value[blogId] = false;
  } else {
    if (likedBlogs.value[blogId]) {
      likeCounts.value[blogId] = Math.max((likeCounts.value[blogId] || 1) - 1, 0);
      likedBlogs.value[blogId] = false;
    }
    dislikeCounts.value[blogId] = (dislikeCounts.value[blogId] || 0) + 1;
    dislikedBlogs.value[blogId] = true;
  }
  saveInteractionData();
};

const searchQuery = ref('');
const filteredBlogs = computed(() =>
  videoStore.videos.filter(blog => blog.videoTitle.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

onMounted(async () => {
  await videoStore.fetchVideos();
  loadInteractionData();
});
</script>


<style scoped>

</style>
