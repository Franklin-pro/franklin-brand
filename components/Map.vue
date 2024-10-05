<template>
  <div>
    <div ref="mapContainer" class="map w-1/2"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

const mapContainer = ref(null);

onMounted(() => {
  const { $loadGoogleMaps } = useNuxtApp();

  $loadGoogleMaps().then((google) => {
    const map = new google.maps.Map(mapContainer.value, {
      center: { lat: -1.9824735012760395, lng: 30.093138653201834 }, 
      zoom: 17,
    });
    new google.maps.Marker({
      position: { lat:-1.9824735012760395, lng: 30.093138653201834 }, 
      map,
      title: 'Franklin programmer',
    });
  }).catch((error) => {
    console.error('Google Maps failed to load', error);
  });
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
