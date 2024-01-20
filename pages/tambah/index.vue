  <template>
    <div>
      <!-- <AddEdit/> -->
      <!-- TEMPORARY CLOSED -->
      <AddEditClosed/>
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '~/store/index'
import AddEditClosed from '~~/components/AddEditClosed.vue'

  useHead({
      title: 'Hak Cipta UM | Usulan Baru',
      meta: [
          { name: 'description', content: 'Usulan baru Aplikasi Hak Cipta Universitas Negeri Malang' }
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

  <script setup>
  
  
  </script>
  