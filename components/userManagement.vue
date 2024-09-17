<template>
  <div class="p-5">
    <div class="flex items-center justify-between py-5">
      <h1 class="font-bold text-2xl text-primary">Members List</h1>
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
        <button class=" w-[20%] bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
          <UTooltip text="create new member">
            <a href="/Dashboard/members/createMember">Create New</a>
          </UTooltip>

        </button>

    </div>

    <div class="flex gap-4" :class="{ 'flex-col': !showForm, 'flex-row': showForm }">
      <div :class="showForm ? 'w-1/2' : 'w-full'">
        <UCard>
          <UTable :columns="columns" :rows="paginatedMembers">
            <template #memberImage-data="{ row }">
              <img :src="row.memberImage.url" alt="Product Image" class="h-10 w-10 object-cover rounded-full" />
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
              <UButton
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded-md"
            icon="i-heroicons-chevron-left"
            color="orange"
          />

          <UButton
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 rounded-md"
          icon="i-heroicons-chevron-right"
          color="orange"
          />
            </div>
        </div>
        </UCard>
    
      </div>

      <div v-if="showForm" class="w-1/2 px-4">
        <UpdateMember :member="selectedMember" v-if="selectedMember" @close="closeCard" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore} from '~/stores/auth'; 
import type { User } from '~/types';

definePageMeta({
  layout: 'dashboard'
});

const items = (row: any) => [
  [
    {
      label: 'Edit User',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        selectedMember.value = row;
        showForm.value = true;
      }
    },
    {
      label: 'Delete User',
      icon: 'i-heroicons-trash',
      click: async () => {
        try {
          const confirmation = confirm('Are you sure you want to delete this user?');
          if (confirmation) {
            const voice = new SpeechSynthesisUtterance('user already deleted');
            window.speechSynthesis.speak(voice);
            await userStore.deleteUser(row._id);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      }
    },
  ]
];

const columns = [
  { key: 'userName', label: 'User Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'Action' }
];

const searchQuery = ref('');
const showForm = ref(false);
const selectedMember = ref<User | null>(null); 
const userStore = useAuthStore(); 

const selectMember = (member: User) => {
  selectedMember.value = member;
};

function closeCard() {
  showForm.value = false; 
  selectedMember.value = null; 
}


const currentPage = ref(1);
const itemsPerPage = ref(5); 


const totalPages = computed(() => {
  return Math.ceil(filteredMembers.value.length / itemsPerPage.value);
});

const filteredMembers = computed(() => {
  if (!userStore.users) return [];
  return userStore.users.filter(user => {
    return (
      user.userName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    
  })
.reverse()
});

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMembers.value.slice(start, end);
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
  await userStore.fetchUsers(); 
});
</script>

<style>

</style>