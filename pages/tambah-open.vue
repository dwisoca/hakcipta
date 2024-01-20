<template>
    <div>
      <AddEdit/>
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '~/store/index'

  const config = useRuntimeConfig()
  const bypass = config.BYPASS_TAMBAH

  useHead({
      title: 'Hak Cipta UM | Edit Usulan',
      meta: [
          { name: 'description', content: 'Edit usulan Aplikasi Hak Cipta Universitas Negeri Malang' }
      ],
  })

  definePageMeta({
    middleware: ["admin"],
    layout: 'admin-layout'
  })

  onMounted(() => {
    console.log('bypass', bypass)
    if (bypass == 'false'){
        navigateTo('/tambah')
    }
  })
  
  </script>
  