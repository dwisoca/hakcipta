<template>
    <div class="text-center sm:text-left">
      <p class="sm:pt-12 sm:ml-10 z-40 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl ">Dashboard (Admin)</p>
      <ListUsulan reader="admin" class="-mt-4 sm:-mt-20 z-0"/>
      <!-- <code class="block whitespace-pre overflow-x-scroll">
        {{ user }}
      </code> -->
    </div>
    <div class="toast z-30" v-if="store.user.email == 'meirismawati@' && showSecret">
      <div class="chat chat-end">
        <a @click="showSecret = false" class="btn btn-xs btn-success btn-circle">X</a>

        <div class="chat-bubble chat-bubble-success">{{message}}</div>
        <img src="https://lh3.googleusercontent.com/5Q3cZ2QYBmXvfFC5-gZUUziCFutQpBoVlxrIahB5LTssZVZLyukUo4RNnbwQTD84MHe3E0rUTFFMggaAmklEcCdGFMyT7go4fR-HwL7ltLl585g7c-UrJe6zOWCX1aKHEEEWXUkidd0P1Br2j-2UTEEaoL6IhDU2iGwctga39kU65tGpgvdv4s7mUMdLQA7LX4s1tOmQl-liWvJCZMeYLby7tVwaKHsIx-aERCsRGQlidmqVJR9LezFTEKPLVmWB4WkYR-GocayIg6ZxU5iqPKpovRvAZQZRsWl7gT-alSq9Sv6pE7TwI84wrNPRwNe8fky38YBBvrxvgcmcNDY-meX1YD33lrJHgXoF5V4WNNfHJZBInYWcpkLKurdnRc5RdlWKiyicksUbwQ7AMLyPsGJj2p0en0E18nlhqCpgI7yXN_dcpx-4oUAjAMMAX0oTAmlXzgAjR2qXJcDuK9bx91e2r_CFegKJLnzx8XebTemJC7YaRH1Oig4kHm4aKBuM3UKc7NpPILCTm8Fe48RZUt1foM_AmzEhQ9jy1FOepckMcsOm6KrmI79M7JDqZM-1v_MOqvoadY_cYU_Zi7wVNWJYL8pWpgqgqj24gDuph6e0JD4RcW9y51kErpb988Uv4sCnTm5z78buGae_ZyOmuwjDog61aPBcjDv1tqFS9gJFG4ZyqY-ZDBiSE8x1w-jXUJN5tUc10v3Pu6-XbY40hMPD6aQBkvt4kZf6wiGL0SJrRCqYHU52Y4WKfOtA9OjvhHsPs7jvR-Ik7MI9q9e4iYlztd2_LO_kgpsDY94WWmjnVZ5mJhV_Xrf1F2aR6h_Cq_U2ohr_D0HBWzVNcVd-IwE6_sKoNkmGGGSTxBBEBpdAsRshXB5pEHnKILsYFIGpgKDJcIy9v9EYX2l5vBfuvz_ATGqE6fYoeHIWNK5Ei_Cc=w495-h880-no?authuser=0" 
        class="max-w-sm rounded-lg chat-bubble mt-2" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '~/store/index'
  
  useHead({
      title: 'Hak Cipta UM | Admin Dashboard',
      meta: [
          { name: 'description', content: 'Dashboard Aplikasi Hak Cipta Universitas Negeri Malang' }
      ],
  })

  //store.init()
  
  definePageMeta({
    middleware: ["admin"],
    layout: 'admin-layout'
  })
  const message = 'Semangat ibu ☺'
  const showSecret = ref(true)
  const store = useMainStore()
  onBeforeMount(() => {
    // store.init('')
    // if (!store.statusAdmin){
    //   navigateTo('/')
    // }
  })
  
  </script>
  
