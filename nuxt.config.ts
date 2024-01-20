// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    app: {
        head: {
          charset: 'utf-16',
          title: 'Hak Cipta UM',
          meta: [
            { name: 'description', content: 'Aplikasi Hak Cipta Universitas Negeri Malang' }
          ],
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/logo-UM.webp' },
          ],
          // script: [
          //   {
          //     src: 'https://code.adclickppc.com/7s-native-ad.js',
          //     async: true,
          //   },
          // ],
        }
      },
    build: {
      transpile: ['@vuepic/vue-datepicker']
    },

    
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    
    runtimeConfig: {
        // The private keys which are only available within server-side
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        ADMIN_LIST_SERVER: process.env.ADMIN_LIST,
        KTP_REKTOR_SERVER: process.env.KTP_REKTOR,
        MAINTENANCE_SERVER: process.env.MAINTENANCE,
        // Keys within public, will be also exposed to the client-side
        public: {
          FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
          MAINTENANCE: process.env.MAINTENANCE,
          BYPASS_TAMBAH: process.env.BYPASS_TAMBAH,

          // ADMIN_LIST: process.env.ADMIN_LIST,
          // KTP_REKTOR: process.env.KTP_REKTOR,
        }
    },
    
    plugins:[
        // '~/plugins/firebaseAuth.client.js'
    ],
    
    // meta: {
    //     title: 'ROAST',
    //   },

})
