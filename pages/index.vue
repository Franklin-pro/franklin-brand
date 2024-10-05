<template>
  <div>
      <LandingPage />
      <AboutMe />
      <Works />
      <Experience />
      <Blogs />
      <Contactme />
  </div>
</template>

<script lang="ts" setup>
import Contactme from '~/components/contactme.vue';
import Experience from '~/components/experience.vue';
import Map from '~/components/Map.vue';
definePageMeta({
  middleware: 'authentication'
})

</script>

<style></style>