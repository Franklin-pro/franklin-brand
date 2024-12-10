<template>
  <div>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(item, index) in items" :key="index" class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4">
          <h2 class="text-xl font-semibold mb-2">{{ item.text }}</h2>
          <p>{{ item.number }}</p>
          <div class="flex items-center gap-2">
            <UIcon :name="item.increase ? 'i-heroicons-arrow-trending-down' : 'i-heroicons-arrow-trending-up'" />
            <NuxtLink 
              :to="item.path" 
              :class="item.percentage < 50 ? 'text-red-500' : 'text-green-500'"
            >
              {{ item.percentage }}% (Week {{ item.week }})
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>


const increase = ref(0);
const member = useAuthStore();
const message = useMessageStore();
const blog = useBlogStore();

onMounted(async () => {
  // Fetch data
  await member.fetchMembers();
  await blog.fetchBlogs();
  await message.fetchMessages();
  await teacher.fetchChats();

  // Calculate counts


});
const memberCount = member.users.length;
  const messageCount = message.messages.length;
  const blogCount = blog.blogs.length;

const items = ref([
  { text: 'Members', number: memberCount,percentage:40, path: '/admin/members' },
  { text: 'Messages', number: messageCount,percentage:50, path: '/admin/messages' },
  { text: 'Blogs', number: blogCount,percentage:70, path: '/admin/blogs' },
]);
</script>

