<template>
  <div class="p-5">
    <div class="flex items-center justify-between py-5">
      <h1 class="font-bold text-5xl text-primary">Blogs List</h1>
      <UTooltip text="search member...">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="xl"
          color="white"
          :trailing="false"
          placeholder="Search..."
          v-model="searchQuery"
        />
      </UTooltip>
      <button class="w-[20%] bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
        <UTooltip text="create new member">
          <a href="/Dashboard/Blogs/createBlogs">Create New</a>
        </UTooltip>
      </button>
    </div>

    <div class="flex gap-4" :class="{ 'flex-col': !showForm, 'flex-row': showForm }">
      <div :class="showForm ? 'w-1/2' : 'w-full'">
        <UCard>
          <UTable :columns="columns" :rows="paginatedMembers">
            <template #memberImage-data="{ row }">
              <img :src="row.memberImage.url" alt="Blog Image" class="h-10 w-10 object-cover rounded-full" />
            </template>

            <!-- Blog Description with Tailwind truncate class -->
            <template #blogDescription-data="{ row }">
              <span class="truncate block w-48">{{ row.blogDescription }}</span>
            </template>

            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="red" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

          <div class="flex justify-between items-center mt-4">
            <span class="text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="flex gap-3 items-center">
              <UButton @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 rounded-md" icon="i-heroicons-chevron-left" color="orange" />
              <UButton @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 rounded-md" icon="i-heroicons-chevron-right" color="orange" />
            </div>
          </div>
        </UCard>
      </div>

      <div v-if="showForm" class="w-1/2 px-4">
        <BlogsUpdateBlogs  :blog="selectedMember" v-if="selectedMember" @close="closeCard"/>
        <!-- <UpdateBlogs /> -->
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useBlogStore } from '~/stores/blogs'; 
import type { Blogs } from '~/types';

definePageMeta({
  layout: 'dashboard'
});

const items = (row: any) => [
  [
    {
      label: 'Edit Blog',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        selectedMember.value = row;
        showForm.value = true;
      }
    },
    {
      label: 'Delete Blog',
      icon: 'i-heroicons-trash',
      click: async () => {
        try {
          const confirmation = confirm('Are you sure you want to delete this blog?');
          if (confirmation) {
            const voice = new SpeechSynthesisUtterance('blog already deleted');
            window.speechSynthesis.speak(voice);
            await blogStore.deleteBlog(row._id);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting member:', error);
          alert('Failed to delete member.');
        }
      }
    },
  ]
];

const columns = [
  { key: 'blogName', label: 'Blog Name' },
  { key: 'blogStatus', label: 'BlogStatus' },
  { key: 'blogDescription', label: 'Blog Description' },
  { key: 'actions', label: 'Action' }
];

const searchQuery = ref('');
const showForm = ref(false);
const selectedMember = ref<Blogs | null>(null); 
const blogStore = useBlogStore(); 

const selectMember = (blog: Blogs) => {
  selectedMember.value = blog;
};

function closeCard() {
  showForm.value = false; 
  selectedMember.value = null; 
}


const currentPage = ref(1);
const itemsPerPage = ref(5); 


const totalPages = computed(() => {
  return Math.ceil(filteredBlog.value.length / itemsPerPage.value);
});

const filteredBlog = computed(() => {
  if (!blogStore.blogs) return [];
  return blogStore.blogs.filter(blog => {
    return (
      blog.blogName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      blog.blogDescription.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      blog.blogStatus.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    
  })
.reverse()
});

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredBlog.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(async () => {
  await blogStore.fetchBlogs(); 
});
</script>

<style>

</style>
