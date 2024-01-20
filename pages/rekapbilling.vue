<template>
    <div class="text-center sm:text-left">
    <p class="pt-10 sm:ml-10 z-40 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Rekap Billing</p>
    <p class="sm:ml-10 z-40 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Hak Cipta UM</p>
    <p class="sm:ml-10 pt-2 text-3xl  tracking-tight text-gray-900 sm:text-2xl">Tahun 2023</p>
    <BillingHarian class="-mt-4 sm:-mt-4 z-0"/>
  </div>
</template>

<script setup>

definePageMeta({
    middleware: ["admin"],
    layout: 'admin-layout'
  })

  useHead({
      title: 'Hak Cipta UM | Billing',
      meta: [
          { name: 'description', content: 'Billing Aplikasi Hak Cipta Universitas Negeri Malang' }
      ],
  })

</script>

<style lang="scss" scoped>

</style>