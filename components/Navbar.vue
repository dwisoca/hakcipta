<template>
  <ClientOnly>

    <div class="navbar #f8fafc sticky top-0 z-50 glass">
      <div class="flex-1">
        <NuxtLink to="/" >
          <div class="flex items-center text-center">
            <label tabindex="0" class="avatar placeholder mx-2 cursor-pointer">
                <div class="w-10 rounded-full">
                  <img src="~/assets/img/logo-UM.webp" />
                </div>
            </label>
            <label class="mx-2 font-medium normal-case text-xl cursor-pointer ">Hak Cipta UM</label>
          </div>
        </NuxtLink>
      </div>
      <div class="flex-none">
        <!-- TEMPORARY CLOSED -->
        <!-- <NuxtLink to="/tambah" v-if="store.user.email!=''">
            <button class="btn btn-sm align-middle btn-primary gap-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <label class="hidden md:block"> Ciptaan Baru</label>
            </button>
        </NuxtLink> -->
  
        <div class="dropdown dropdown-end" v-if="store.user.email!=''">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="store.user.photoURL" />
            </div>
          </label>
          <ul tabindex="0" class="menu  dropdown-content mt-3 p-2 shadow shadow-xl border bg-base-100 rounded-box w-52 ">
            <li class="font-bold " v-if="isAdmin">
              <NuxtLink to="/admin" >
                Dashboard Admin
              </NuxtLink>
            </li>
            <li class="font-bold" v-if="!isAdmin">
              <NuxtLink to="/dashboard" >
                Dashboard
              </NuxtLink>
            </li>
            <li class="font-bold">
              <NuxtLink to="/rekap" >
                Rekapitulasi
              </NuxtLink>
            </li>
            <li class="font-bold" v-if="isAdmin">
              <NuxtLink to="/rekapbilling">
                Billing
              </NuxtLink>
            </li>
            <div class="divider -my-1"></div>
            <li class=""><a  @click="logout">{{ store.user.email }}<br> Logout</a></li>
            <!-- <li><a @click="logout">Logout</a></li> -->
          </ul>
        </div>
  
        <button class="btn gap-2 bg-white text-black hover:text-white normal-case no-animation" @click="googleLogin" v-if="store.user.email==''">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" class="w-6 h-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          <label class="hidden lg:block">Sign in with Google</label>
        </button>
  
      </div>
    </div>
    <div v-if="route.path != '/' && route.path != '/maintenance' " class="fixed top-16 z-40 text-sm breadcrumbs bg-white w-full py-4 pl-10">
      <ul>
          <li v-if="route.path != '/' ">
              <NuxtLink to="/" active-class="text-primary font-bold">Home</NuxtLink>
          </li> 
          <li v-if="route.path != '/' && route.path != '/rekap' && route.path != '/petunjuk' && route.path != '/admin' && !isAdmin ">
              <NuxtLink to="/dashboard" active-class="text-primary font-bold">Dashboard</NuxtLink>
          </li> 
          <li v-if="route.path != '/' && route.path != '/rekap' && route.path != '/petunjuk' && route.path != '/dashboard' && isAdmin">
              <NuxtLink to="/admin" active-class="text-primary font-bold">Admin</NuxtLink>
          </li> 
          <li v-if="route.path == '/rekap'">
              <NuxtLink to="/rekap" active-class="text-primary font-bold">Rekap</NuxtLink>
          </li> 
          <li v-if="show2ndBreadcrumbs(route.path)">
              <NuxtLink :to="route.path" active-class="text-primary font-bold" >{{route.params.id || labelBreadcrumbs}}</NuxtLink>
          </li> 
      </ul>
    </div>
  </ClientOnly>

</template>

<script setup>

  import { useMainStore } from '~/store/index'
  const store = useMainStore()
  // store.init()
  const targetURL = ref()

  let isAdmin 
  if (process.client) {
    // console.log('user from navbar', store.user.isAdmin)
    isAdmin = store.user.isAdmin
    if (isAdmin){
      targetURL.value = '/admin'
    } else {
      targetURL.value = '/dashboard'
    }
  }

  const labelBreadcrumbs = computed(()=>{
    if (process.client) {
      const alamat = route.path.replace('/', '')
      // console.log('Non tambah', alamat.charAt(0).toUpperCase() + alamat.slice(1))
      return alamat.charAt(0).toUpperCase() + alamat.slice(1); 

    }
  })  
  function show2ndBreadcrumbs(rute){
    if (process.client){
      const exception = ['/dashboard', '/admin' ,'/rekap']
      if (exception.includes(rute)){
        return false
      } else {
        return true
      }
    }
  }

  const googleLogin = async () => {
      store.googleLogin()
    }

  const logout = async () => {
    store.logout()
  }
  const route = useRoute()
  // console.log(route)

</script>



<style scoped>

</style>
