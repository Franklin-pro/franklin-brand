<template>
  <div>
    <section class="relative py-10 overflow-hidden bg-black sm:py-16 lg:py-24 xl:py-32">
      <div class="absolute inset-0">
        <img class="object-cover w-full h-full md:object-left md:scale-150 md:origin-top-left"
          src="../assets/lone.jpeg" alt="" />
      </div>

      <div class="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>

      <div class="absolute inset-0 block bg-black/60 md:hidden"></div>

      <div class="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 md:text-left">
          <h2 class="text-3xl font-bold leading-tight text-blue-500 sm:text-4xl lg:text-5xl">Franklin Developer 💸🥷</h2>
          <p class="mt-4 text-base text-gray-200">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation veniam.</p>
            <div class="py-5">
              <UButton label="Visit My Github" to="https://github.com/Franklin-pro" class="inline-flex items-center 
            justify-center flex-shrink-0 w-auto
             px-6 py-2 mt-4 font-semibold text-white 
             transition-all duration-200 bg-blue-600 border
              border-transparent rounded-md sm:mt-0 sm:rounded-l-none 
              sm:w-auto hover:bg-blue-700 focus:bg-blue-700" />
            </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>