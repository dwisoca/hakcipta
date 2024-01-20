<template>
    <div>
      <AddEdit/>
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '~/store/index'

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

  const store = useMainStore()
  onBeforeMount(() => {
    // store.init('login')
  })
  
  </script>
  