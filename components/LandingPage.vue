<template>
    <div class="w-full h-full bg-gray-100">
      <div class="h-screen w-full mx-auto py-20 xl:px-16 xs:px-8 flex md:flex-row xs:flex-col gap-4 justify-center items-center pb-10 pt-4">
        <div class="w-full">
          <img class="rounded-full md:max-w-[70%] sm:max-w-[50%] xs:max-w-[60%] mx-auto" src="../assets/WhatsApp Image 2024-10-07 at 21.03.50.jpeg" alt="My Image" />
        </div>
        <div class="w-full flex flex-col justify-center gap-4 md:mt-0 sm:mt-8 xs:mt-4">
          <h1 class="text-4xl font-semibold font-serif ">Hello, I'm Franklin ND.</h1>
          <h3 class="capitalize text-blue-400">I'm <span class="typing text-green-500 font-bold dark:text-green-700">Fullstack Developer</span></h3>
          <p>Experienced full-stack developer with 4+ years of expertise in React Js(TS), Nest Js(TS), Nuxt Js(TS), Next Js(TS), Android, and some Flutter experience.</p>
          <div class="sm:mt-4 xs:mt-2">
            <button class="px-6 py-3  bg-blue-500 text-white hover:text-blue-500 duration-300 rounded-xl hover:border-2 hover:border-blue-500 hover:bg-transparent">Get In Touch</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    mounted() {
      new Typed('.typing', {
        strings: ['', 'FullStack Developer,', 'Frontend Developer,', 'Backend Developer,', 'Mobile Apps Developer.'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      });
    }
  }
  </script>
  
  <style scoped>
  /* Add any specific styling here if needed */
  </style>
  