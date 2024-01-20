<template>
    <div class="text-center sm:text-left">
      <p class="sm:pt-12 sm:ml-10 z-40 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Dashboard</p>
      <ListUsulan class="-mt-4 sm:-mt-20 z-0"/>
      <!-- <code class="block whitespace-pre overflow-x-scroll">
        {{ user }}
      </code> -->
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '~/store/index'
  
  useHead({
      title: 'Hak Cipta UM | Dashboard',
      meta: [
          { name: 'description', content: 'Dashboard Aplikasi Hak Cipta Universitas Negeri Malang' }
      ],
  })

  //store.init()
  
  definePageMeta({
    middleware: ["admin"]
  })
  
  </script>
  
