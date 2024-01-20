<template>
  <!-- HERO WITH BLOB AT CENTER PAGE -->
  <div class="flex min-h-screen bg-gradient-to-r from-cyan-300 to-sky-400 items-center justify-center ">
    <img src="~/assets/img/blobanimation-white.svg" class="absolute w-full h-full p-0 sm:p-12 -top-8 sm:-top-10 z-20 opacity-60"/>
    <img src="~/assets/img/blobanimation-white2.svg" class="absolute w-full h-full p-0 sm:p-20 -top-8 sm:-top-10 z-10 opacity-60"/>
    <img src="~/assets/img/blobanimation-white3.svg" class="absolute w-full h-full p-0 sm:p-24 -top-8 sm:-top-10 z-0 opacity-60"/>
    <div class="hero-content text-center z-30">
      <div class="w-full">
        <h1 class="sm:text-5xl text-3xl font-bold">{{error.statusCode}}</h1>
        <h1 class="sm:text-xl text-xl my-2">Oops, {{error.message}}</h1>
        <div class="divider before:bg-slate-200 after:bg-slate-200"></div>
        <button class="btn btn-primary w-full mb-2" @click="navigateTo('/')">Home</button>
      </div>
    </div>
  </div>
  
  </template>
  
  <script setup>

  // default props available on error.vue
  const error = useError();
  </script>
  