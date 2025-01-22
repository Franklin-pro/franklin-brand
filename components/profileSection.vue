<template>
  <div class="min-h-screen bg-white relative flex items-center justify-center">
    <img src="../assets/Polygon.svg" class="z-0 absolute right-0 top-0 w-[700px] h-[700px]" />
    <img src="../assets/Rectangle.svg" class="z-0 absolute left-0 bottom-0 w-[700px] h-[700px]" />
    <div class="bg-opacity z-50 rounded-lg shadow-lg p-8 max-w-4xl">
      <!-- Logo -->
      <div class="text-center flex items-center justify-center mb-6">
        <img src="../assets/leazi.png" alt="">
      </div>

      <div class="text-center mb-8">
        <h2 class="text-lg font-light text-gray-700">Welcome back, Franklin</h2>
        <p class="text-sm text-gray-500 font-light">Select a profile to continue managing your properties.</p>
      </div>

      <!-- Profile Cards -->
      <div class="flex gap-5 w-full justify-center">
        <div v-for="item in items" :key="item.slot" class="w-80">
          <div class="bg-white hover:bg-green-100 transition-all duration-300 cursor-pointer rounded-lg p-4 shadow-md text-center">
            <div class="text-black flex items-center justify-between pb-4">
              <span>{{ item.label }}</span>
              <UIcon name="i-heroicons-ellipsis-vertical" class="cursor-pointer text-xl" />
            </div>
            <img
              src="../assets/cel.jpeg"
              alt="Company Avatar"
              class="w-16 h-16 rounded-full object-cover mx-auto mb-4"
            />
            <p class="text-md font-light text-gray-700">{{ item.slot }}</p>
            <p class="text-xs font-light text-gray-500">{{ item.label }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-500">
        Having trouble? <a href="#" class="text-green-600 underline">Contact Support</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    label: 'Account type',
    icon: 'i-heroicons-inbox',
    slot: 'account',
    disabled: true,
  },
  {
    label: 'Campany',
    avatar: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    icon: 'i-heroicons-check-circle',
    slot: 'company',
    disabled: true,
  },
  {
    label: 'Personal',
    avatar: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    icon: 'i-heroicons-check-circle',
    slot: 'personal',
  },
];

</script>

<style>
.bg-opacity {
  background-color: rgba(197, 197, 197, 0.37);
}
</style>
