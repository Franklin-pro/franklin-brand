<template>
  <div>
      <section class="py-10 bg-white sm:py-16 lg:py-24">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div class="max-w-2xl mx-auto text-center">
                  <h2 class="text-2xl font-bold text-blue-600 sm:text-4xl sm:leading-tight">Trusted by world class
                      companies, Franklin Project</h2>
              </div>

              <div
                  class="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
                  <div v-for="item in campany">
                      <div>
                          <img class="object-contain w-full h-6 mx-auto" :src="item.logo" alt="" />
                      </div>
                  </div>

              </div>

              <div class="flex items-center justify-center mt-10 space-x-3 md:hidden">
                  <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
              </div>

              <p class="mt-10 text-base text-center text-gray-500 md:mt-20">and, 1000+ more companies</p>
          </div>
      </section>

  </div>
</template>

<script lang="ts" setup>
const campany = [
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png"
  },
  {
      logo: "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png"
  }
]
</script>

<style></style>