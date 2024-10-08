<template>
  <div>
    <Cards/>
    <UserManagement/>


  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout:'dashboard',
  middleware:'authentication'
})
</script>

<style>

</style>