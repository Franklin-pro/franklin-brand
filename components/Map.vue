<template>
  <div>
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

const mapContainer = ref(null);

onMounted(() => {
  const { $loadGoogleMaps } = useNuxtApp(); // Use the plugin function

  $loadGoogleMaps().then((google) => {
    // Initialize the Google Map targeting OKG MUSIC
    const map = new google.maps.Map(mapContainer.value, {
      center: { lat: -1.9738659803894874, lng: 30.10960735108956 },  // Replace with OKG MUSIC's actual coordinates
      zoom: 16,
    });

    // Optionally, add a marker at OKG MUSIC
    new google.maps.Marker({
      position: { lat:-1.9738659803894874, lng: 30.10960735108956 },  // Replace with OKG MUSIC's actual coordinates
      map,
      title: 'OKG MUSIC',
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
