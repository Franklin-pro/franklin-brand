<template>
  <div>
      <section class="py-10 bg-white dark:bg-gray-900 sm:py-16 lg:py-24">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div class="max-w-2xl mx-auto text-center">
                  <h2 class="text-2xl font-bold text-blue-600 sm:text-4xl sm:leading-tight">Trusted by world class
                      companies, Franklin Project</h2>
              </div>

              <div
                  class="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
                  <div v-for="item in campany">
                      <div>
                          <img class="object-contain w-full mx-auto" :src="item.logo" alt="" />
                      </div>
                  </div>

              </div>
          </div>
      </section>

  </div>
</template>

<script lang="ts" setup>
const campany = [
  {
      logo: "https://amarebe.com/wp-content/uploads/2021/04/Alight-Rwanda.png"
  },
  {
      logo: "https://wekraft.org/static/media/craftlogo.a566dde98854d8422958.jpeg"
  },
  {
      logo: "https://www.rootfoundation.org.rw/wp-content/uploads/2020/09/rflogo.png"
  },
  {
      logo: "https://github.com/KAYITARES/KUHI/blob/main/src/assets/KUHI.png?raw=true"
  },
  
]
</script>

<style></style>