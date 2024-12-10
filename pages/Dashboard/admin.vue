<template>
  <div>
    <Cards/>
    <div class="grid grid-cols-2">
      <UserManagement/>
      <ViewBlogs/>
    </div>
 


  </div>
</template>

<script lang="ts" setup>
import ViewBlogs from './blogs/viewBlogs.vue';

definePageMeta({
  layout:'dashboard',
  middleware:'authentication'
})
</script>

<style>

</style>