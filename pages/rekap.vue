<template>
  <div class="w-full px-10">
    <div class="alert alert-info shadow-sm sm:mt-16">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <a href="https://sentrahki.um.ac.id/2022-2/" target="_blank" class="underline font-semibold">Rekapitulasi Hak Cipta sebelum tahun 2023 dapat dilihat disini</a>
      </div>
    </div>

  </div>
  <div class="text-center sm:text-left">
    <p class="pt-10 sm:ml-10 z-40 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Daftar Hak Cipta Universitas Negeri Malang</p>
    <!-- <p class="sm:ml-10 z-40 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Universitas Negeri Malang</p> -->
    <!-- <p class="sm:ml-10 pt-2 text-3xl  tracking-tight text-gray-900 sm:text-2xl">Tahun 2023</p> -->
      <ListUsulanRekap2 class="-mt-4 sm:-mt-4 z-0"/>
  </div>
</template>

<script setup>
import ListUsulanRekap2 from '~~/components/ListUsulanRekap2.vue';
import { useMainStore } from '~/store/index'

useHead({
    title: 'Hak Cipta UM | Rekapitulasi',
    meta: [
        { name: 'description', content: 'Rekapitulasi Hak Cipta Universitas Negeri Malang' }
    ],
})

const store = useMainStore()
process.server && store.cekAdmin()


</script>

<style lang="scss" scoped>

</style>