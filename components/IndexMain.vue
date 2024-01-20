<template>
    <!-- HERO WITH BLOB AT CENTER PAGE -->
    <div class="flex min-h-screen bg-gradient-to-r from-cyan-300 to-sky-400 items-center justify-center -my-24" :class="store.alertModal ? 'blur-sm' : 'blur-none'">
      <img src="~/assets/img/blobanimation-white.svg" class="absolute w-full h-full p-0 sm:p-12 -top-8 sm:-top-10 z-20 opacity-60"/>
      <img src="~/assets/img/blobanimation-white2.svg" class="absolute w-full h-full p-0 sm:p-20 -top-8 sm:-top-10 z-10 opacity-60"/>
      <img src="~/assets/img/blobanimation-white3.svg" class="absolute w-full h-full p-0 sm:p-24 -top-8 sm:-top-10 z-0 opacity-60"/>
      <div class="hero-content text-center z-30">
        <div class="w-full">
          <h1 class="sm:text-5xl text-3xl font-bold">Aplikasi Hak Cipta</h1>
          <h1 class="sm:text-3xl text-2xl font-bold sm:mt-5 mt-2">Universitas Negeri Malang</h1>
          <div class="divider before:bg-slate-200 after:bg-slate-200"></div>
          <div class="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-black flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="font-bold -ml-32">Pengumuman!</h3>
                <div class="text-xs">Pengajuan ditutup pada: 30 November 2023</div>
              </div>
            </div>
            <div class="flex-none">
              <label for="alertModal" class="btn btn-sm" @click="store.switchAlert(true)">Detail</label>

            </div>
          </div>
          <div class="divider before:bg-slate-200 after:bg-slate-200"></div>
          <button class="btn btn-primary w-full mb-2" @click="navigateTo(targetURL)" v-if="store.user.email!=''">Dashboard</button>
          <button class="btn btn-primary w-full mb-2" @click="navigateTo('/rekap')" v-if="!store.user.email">Rekapitulasi</button>
          <button class="btn bg-white sm:btn-outline btn-outline font-bold w-full" @click="navigateTo('/petunjuk')">Petunjuk</button>
          <!-- <Ads adId="7SAD156591140A1BD70" /> -->
        </div>
      </div>
    </div>
    <NotificationNotifPengumuman class="w-full" :teks-judul="'Pengumuman'" :teks-deskripsi="`Pengajuan Hak Cipta di Aplikasi Hak Cipta UM ditutup pada tanggal 30 November 2023.
    Penyerahan Formulir Hak Cipta ke Sentra HKI (Grarek Lt. 7) ditutup pada tanggal 5 Desember 2023.
    Seluruh ajuan yang Formulirnya tidak diserahkan pada batas tanggal di atas, akan dibatalkan dan dapat diajukan kembali pada tahun 2024 sesuai syarat & ketentuan yang berlaku.

    Terima Kasih`">
    </NotificationNotifPengumuman>
    
    </template>
    
    <script setup>  
    import { useMainStore } from '~/store/index'
  
    const store = useMainStore()
    process.server && store.cekAdmin()  
  
    const targetURL = ref()
  
    if (store.user.isAdmin){
      targetURL.value = '/admin'
    } else {
      targetURL.value = '/dashboard'
    }

    // const alertModal = ref(store.alertModal)
    function showAlert(){
      store.alertModal = true
    }

    </script>
    