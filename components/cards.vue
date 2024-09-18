<template>
  <div class="grid px-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols gap-4">
    <div v-for="item in items" :key="item.path" class="w-full">
      <UCard class="w-full flex flex-col">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="font-light text-xl text-orange-400">{{ item.text }}</h1>
            <h2 class="font-bold text-2xl text-primary">{{ item.number }}</h2>
          </div>
          <div>
            <UTooltip :text="item.view">
              <NuxtLink :to="item.path">
              <UIcon name="i-heroicons-eye-20-solid" class="hover:text-primary" />
            </NuxtLink>
            </UTooltip>
       
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const member = useAuthStore();
const message = useMessageStore();
const blog = useBlogStore();
const items = ref([]);

onMounted(async () => {
  await member.fetchMembers();
  await blog.fetchBlogs();
  await message.fetchMessages();
  await teacher.fetchChats();
  const memberCount = member.users.length; 
  const messageCount = message.messages.length;
  const blogCount = blog.blogs.length;

  items = [
    {
      text: "Users",
      number: "30",
      view : "veiw Members",
      path: "/Dashboard/members/view-members"
    },
    {
      text: "Client Messages",
      number: "30",
      view : "veiw messages",
      path: "/Dashboard/messages"
    },
    {
      text: "All Blogs",
      number: "30",
      view : "veiw messages",
      path: "/Dashboard/chats"
    }

  ];
});
</script>
