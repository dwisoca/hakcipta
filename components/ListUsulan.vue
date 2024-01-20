<template>
    <div class="card max-h-full">
        <div class="card-body">
            <div class="flex justify-left sm:justify-end items-end sm:items-left "> 
                <label for="my-modal" class="btn btn-warning text-white no-animation mr-2 gap-2" v-if="isAdmin">Pending Ciptaan</label>
                <ModalTutup/>
                <div class="tooltip tooltip-success" data-tip="Download Excel" v-if="isAdmin">
                    <button class="btn btn-square btn-success text-white no-animation mr-2 gap-2" @click="downloadExel()" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </button>
                </div> 
                <div class="dropdown" v-if="isAdmin">
                    <button class="btn no-animation btn-outline gap-2 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                        </svg>
                        Filter Status
                    </button>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a @click="filterStatus='Verifikasi'; readDatabase()">Verifikasi</a></li>
                        <li><a @click="filterStatus='Verifikasi*'; readDatabase()">Verifikasi*</a></li>
                        <li><a @click="filterStatus='Revisi'; readDatabase()">Revisi</a></li>
                        <li><a @click="filterStatus='Ditolak'; readDatabase()">Ditolak</a></li>
                        <li><a @click="filterStatus='Selesai'; readDatabase()">Selesai</a></li>
                        <li><a @click="filterStatus='Cetak Formulir'; readDatabase()">Cetak Formulir</a></li>
                        <li><a @click="filterStatus='Submit'; readDatabase()">Submit</a></li>
                    </ul>
                </div>
                <div class="form-control">
                    <button class="btn no-animation" v-show="slideSearch != 100" @click="prepareSearch(); slideSearch = 100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        Tap To Search
                    </button>
                    <div class="input-group" v-show="slideSearch == 100">
                        <button class="btn btn-square no-animation">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <input 
                        type="search" 
                        placeholder="Ketik judul atau nama" 
                        id="inputJudul"  
                        v-model="keyword"
                        class="input input-bordered" 
                        @input="keyword !='' ? search2() : readDatabase()" />
                        <!-- <button v-show="searchJudul['judul']!=''" @click="searchJudul['judul']=''; cari(); updateRouter()" class="btn btn-square btn-outline no-animation">X</button> -->
                    </div>
                </div>
            </div>
            <div class="flex justify-start space-x-4 items-center">
            </div>
            <!-- Table Here -->
            <!-- <div class="overflow-auto w-full"> -->
            <div class="overflow-x-auto table-wrp block ">
                <progress v-show="progressLoad" class="progress w-full"></progress>
                <table class="table table-zebra w-full ">
                  <!-- head -->
                  <thead class="sticky top-0 z-20 ">
                    <tr>
                      <th>
                        <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('judul')" :disabled="keyword != ''">
                            Judul
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                      </th>
                      <th>Pencipta</th>
                      <th>Sub-Jenis</th>
                      <th>
                          <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('id')" :disabled="keyword != ''">
                            Tanggal Pengajuan
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                        </th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click=" isAdmin ? sortTable('pengusul') : undefined" :disabled="keyword != ''">
                            Pengusul
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" v-show="isAdmin">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                        </th>
                      <th>
                        <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="filterStatus ? '' : sortTable('statusCiptaan')" :disabled="keyword != ''">
                            Status
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto">
                    <!-- Tampilan Row dengan data -->
                    <tr v-for="(items, key) in filterUsulan" :class="{'border-2 border-red-700' : key === selectedRow}">
                      <th class="font-medium min-w-[12rem] max-w-[20rem] whitespace-normal">
                          {{items.judul}}
                      </th>
                      <td class="min-w-[8rem] max-w-[30rem] whitespace-normal">                            
                            <div class="text-normal font-bold">
                                <span class="font-bold block -mb-1">{{items.pencipta[0].nama}}</span>
                                <span class="text-xs italic">{{'('+ items.pencipta[0].fakultas +')'}}</span>
                            </div>
                            
                            <label for="my-modal-4" class="btn btn-xs btn-outline" @click="pencipta = items.pencipta" v-show="items.pencipta.length>1">{{ items.pencipta.length }} pencipta</label>
                        </td>
                      <td class="">{{ items.subJenis }}</td>
                      <td class="">{{ formatDate.format(items.id.slice(0, -4)) }}</td>
                      <td class="">{{ items.pengusul[0] }}</td>
                      <td >
                        <div class="indicator block" v-if="!items.statusCiptaan2">                       
                            <div class="indicator-item badge badge-sm bg-amber-400 text-black" v-if="items.statusCiptaan =='Verifikasi*'"></div>
                            <div :class="classStatus(items.statusCiptaan)" class="w-[8rem]" >{{ items.statusCiptaan.replace('*','') }}</div>
                        </div>
                        <div class="indicator-item badge bg-black-200 text-white w-[8rem]" v-if="items.statusCiptaan2">*{{items.statusCiptaan2}}</div>
                        <!-- TODO FIXIT -->
                        <div class="text-sm italic text-amber-600 font-semibold" v-if="(items.statusCiptaan != 'Ditolak' && items.statusCiptaan != 'Selesai') && statusKecamatan(items.pencipta)">Update Kecamatan Pencipta</div>
                        
                        </td>
                      <!-- tombol aksi -->
                      <td class="w-[12rem] min-w-[11rem]" >
                        <div v-if="!items.statusCiptaan2 || isAdmin" >
                            <!-- TOMBOL Detail (Khusus Pengusul Anggota)  -->
                            <NuxtLink :to="'/tambah/'+ items.id" v-if=" items.statusCiptaan == 'Ditolak' || items.pengusul[0] != store.user.email && !isAdmin">
                                <div class="btn btn-outline btn-sm no-animation gap-2 w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Lihat
                                </div>
                                <br/>
                            </NuxtLink> 
                            <!-- TOMBOL Edit  -->
                            <NuxtLink :to="'/tambah/'+ items.id" @click="isAdmin ? selectedRow = key : ''" target="_blank" v-if="items.statusCiptaan != 'Selesai' && items.statusCiptaan != 'Submit ke DJKI' && items.statusCiptaan != 'Cetak Formulir' && items.statusCiptaan != 'Ditolak' && items.pengusul[0] == store.user.email || isAdmin">
                                <div class="btn btn-outline btn-sm no-animation gap-2 w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    Edit
                                </div>
                                <br/>
                            </NuxtLink> 
                            <!-- TOMBOL Formulir  -->
                            <a @click="createPdf(items)" class="cursor-pointer" v-if="items.statusCiptaan == 'Cetak Formulir' || isAdmin">
                                <div class="btn btn-outline btn-sm no-animation gap-2 w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Formulir
                                </div>
                                <br/>
                            </a> 
                          <!-- TOMBOL LAMPIRAN -->
                            <a :href="items.lampiran" target="_blank" v-if="items.statusCiptaan != 'Selesai' && items.statusCiptaan != 'Ditolak'">
                                <div class="btn btn-outline btn-sm no-animation gap-2 w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                    </svg>
                                    Lampiran
                                </div>
                                <br/>
                            </a> 
                            <!-- TOMBOL KTP  -->
                            <div class="dropdown w-full" v-if="items.statusCiptaan !='Selesai' && isAdmin">
                                <a tabindex="0"  class="cursor-pointer" >
                                    <div class="btn btn-outline btn-sm no-animation gap-2 w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                            </svg>
                                        KTP
                                    </div>
                                    <br/>
                                </a> 
                                <ul tabindex="0" class="dropdown-content p-2 menu shadow bg-base-100 rounded-box w-full">
                                    <li><a @click="createPdfKTP(items, 'preview')" >Preview</a></li>
                                    <li><a @click="createPdfKTP(items, 'download')" >Download</a></li>
                                </ul>
                            </div>
                            <!-- TOMBOL Sertifikat  -->
                            <div class="indicator my-1 w-full" v-if="items.sertifikat">
                                <a :href="items.sertifikat" target="_blank" class="w-full">
                                    <div class="btn btn-sm no-animation btn-success gap-2 font-bold w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-warning">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                        Sertifikat
                                    </div>
                                </a>                                
                            </div>
                            <!-- TOMBOL Send Sertifikat  -->
                            <SendSertifikat :data="items" v-if="isAdmin && items.sertifikat"/>
                        </div>
                        <div v-if="items.statusCiptaan2">
                            <label for="alertModal" class="btn btn-outline btn-sm no-animation gap-2 w-full" @click="store.switchAlert(true)">Detail</label>
                            <NotificationNotifPengumuman class="w-full" :teks-judul="'Pengumuman'" :teks-deskripsi="`Pengajuan Hak Cipta di Aplikasi Hak Cipta UM telah ditutup.
                            Ciptaan ini dapat diajukan kembali pada tahun 2024 sesuai syarat & ketentuan yang berlaku.
                            Terima Kasih`">
                            </NotificationNotifPengumuman>
                        </div>
                      </td>
                      
                    </tr>
                    <!-- Tampilan tanpa data -->
                    <tr v-if="!progressLoad && filterUsulan.length == 0">
                        <td colspan="6" class="text-center">
                            {{ labelNoData }}<br/>
                            <NuxtLink to="/tambah">
                                <button class="btn btn-square btn-lg btn-outline mt-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </NuxtLink>
                        </td>
                    </tr>
                  </tbody>
                  <!-- foot -->
                  <tfoot class="sticky bottom-0 z-30">
                    <tr>
                        <th>Total Usulan: {{ jumlahUsulan }}
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                  </tfoot>
                  
                </table>
            </div>

            <!-- Button Here -->
            <div class="flex justify-center space-x-4 ">
                <div class="card-actions items-center text-center">
                    <label class="label">Show:
                    </label>
                    <select class="select select-primary" v-model="pageLimit"  @change="currentPage=1; progressLoad=true; !keyword ? readDatabase() : search2(keyword)">
                        <option disabled selected>Jumlah item:</option>
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                        <option :disabled="keyword != ''">20</option>
                        <option :disabled="keyword != ''">50</option>
                        <!-- <option v-if="isAdmin">400</option> -->
                    </select>
                </div>
            </div>
            <div class="flex justify-center space-x-4">
                <div class="card-actions">
                    <div class="btn-group">
                        <button class="btn" @click="progressLoad=true; !keyword ? prevPage() : prevPageBySearch()" :disabled="currentPage == 1">«</button>
                        <button class="btn cursor-default no-animation">Halaman {{ currentPage }}</button>
                        <button class="btn" @click="progressLoad=true; !keyword ? nextPage() : nextPageBySearch()" :disabled="currentPage >= totalPage">»</button>
                        <!-- <button class="btn" @click="backupRealtimeDatabase()" v-if="isAdmin">Backup</button> -->
                    </div>
                </div>
            </div>
        </div>    

        <ModalDetailPencipta :list-pencipta="pencipta"/>

        <!-- Modal Alert -->
        <input type="checkbox" id="ktpModal" class="modal-toggle" v-model="ktpModal" />
        <label for="ktpModal" class="modal ">
        <label class="modal-box relative" for="">
            <div id="holderKTP" ref="refKTP" class="carousel-item relative w-full">
                <!-- image generate by script ktp -->
            </div>
            <div class="w-full">
                <label > Memproses KTP </label>
            </div>
            <div class="modal-action">
                <a @click="createPdfKTP()" class="cursor-pointer" >Tes</a>
            </div>
        </label>
        </label>
    </div>
</template>

<script setup>
    import xlsx from "json-as-xlsx"
    import { get, set, ref as databaseRef, query as queryRealTimeDB, orderByChild, startAt, endAt } from 'firebase/database'
    import { doc, setDoc, updateDoc, getDocs, collection, query, where, getCountFromServer, limit, startAfter, limitToLast, endBefore, orderBy } from "firebase/firestore"; 
    import { useMainStore } from '~/store/index'
    import { jsPDF } from "jspdf"
    import autoTable from 'jspdf-autotable' // Wajib Ada!!!
    import QRCode from 'qrcode';

    function statusKecamatan (items){
        let listKecamatan = []
        let warningKecamatan = false
        Object.values(items).forEach(element => {
            // console.log(element)
            if (!element.kecamatan){
                listKecamatan.push('warning')
            } 
            if (listKecamatan.includes('warning')){
                warningKecamatan = true
            }
        });
        return warningKecamatan
    }

    const progressLoad = ref(true)
    
    const store = useMainStore()
    process.server && store.cekAdmin()
    let isAdmin = store.user.isAdmin

    const { $database } = useNuxtApp()

    const labelNoData = ref('Belum ada data')
    const jumlahUsulan = ref(0)
    const pencipta = ref([])
    const selectedRow = ref()
    
    const { $databaseFirestore } = useNuxtApp()
    const filterUsulan = ref([])
    const fullUsulan = ref([])
    let pageLimit = 5
    let lastVisible
    let firstVisible
    let currentPage
    let totalPage
    let fullSnapshot
    let q
    let qLimit
    const sortStatus = ref("id")
    const sortDirection = ref("asc")
    const keyword = ref('')
    const filterStatus = ref()
    const slideSearch = ref(0)
    let searchSnapshot
    let searchData
    let searchCount = ref(0)
    let searchIdList = ref([])
    
    async function readDatabase(){
        selectedRow.value = -1
        filterUsulan.value = []

        if (isAdmin){
            q = query(collection($databaseFirestore, "ciptaan2"));
        } else {
            q = query(collection($databaseFirestore, "ciptaan2"), 
            where('pengusul', 'array-contains', store.user.email));
        }
        !isAdmin && prepareSearch()

        // READ WITH LIMIT
        if (isAdmin){
            qLimit = query(collection($databaseFirestore, "ciptaan2"),
            filterStatus.value ? where('statusCiptaan', '==', filterStatus.value) : '',
            orderBy(sortStatus.value, sortDirection.value), 
            limit(pageLimit));
        } else {
            qLimit = query(collection($databaseFirestore, "ciptaan2"), 
            where('pengusul', 'array-contains', store.user.email),
            orderBy(sortStatus.value, sortDirection.value), 
            limit(pageLimit));
        }   
        const querySnapshot = await getDocs(qLimit);
        fullSnapshot = querySnapshot

        // Get the last visible document
        lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
        
        querySnapshot.forEach((doc) => {
            filterUsulan.value.push(doc.data())
            progressLoad.value = false
        });

        // Get Page
        currentPage = 1
        const counter = await getCountFromServer(q);
        jumlahUsulan.value = counter.data().count
        totalPage = jumlahUsulan.value / pageLimit
    }
    
    async function sortTable(kolom){
        sortStatus.value = kolom
        sortDirection.value = (sortDirection.value === 'asc') ? 'desc' : 'asc';
        // keyword.value ? search2(keyword.value) : readDatabase()
        readDatabase()
    }

    async function nextPage(){
        selectedRow.value = -1
        if (currentPage >= totalPage ){
            return
        }
        else{
            currentPage++
            if(keyword.value){
                paginateArray()                
            } 
            else {
                filterUsulan.value = []
                // Construct a new query starting at this document,
                let next
                    if (isAdmin){
                        next = query(collection($databaseFirestore, "ciptaan2"),
                            filterStatus.value ? where('statusCiptaan', '==', filterStatus.value) : '',
                            orderBy(sortStatus.value, sortDirection.value),
                            startAfter(lastVisible),
                            limit(pageLimit));
                    } else {
                        next = query(collection($databaseFirestore, "ciptaan2"), 
                            where('pengusul', 'array-contains', store.user.email),
                            orderBy(sortStatus.value, sortDirection.value), 
                            startAfter(lastVisible),
                            limit(pageLimit));
                    }
                const nextSnapshot = await getDocs(next);
                fullSnapshot = nextSnapshot
    
                nextSnapshot.forEach((doc) => {
                    filterUsulan.value.push(doc.data())
                    progressLoad.value = false
                });
    
                // Get the last visible document
                lastVisible = nextSnapshot.docs[nextSnapshot.docs.length-1];
                firstVisible = nextSnapshot.docs[0]
            }
        }
    }

    async function prevPage(){
        selectedRow.value = -1
        if (currentPage == 1){
            return
        }
        else{
            currentPage--
            if(keyword.value){
                paginateArray()
            } else {
                filterUsulan.value = []
                // Construct a new query starting at this document,
                let prev 
                    if (isAdmin){
                        prev = query(collection($databaseFirestore, "ciptaan2"),
                            filterStatus.value ? where('statusCiptaan', '==', filterStatus.value) : '',
                            orderBy(sortStatus.value, sortDirection.value),
                            endBefore(firstVisible),
                            limitToLast(pageLimit));
                    } else {
                        prev = query(collection($databaseFirestore, "ciptaan2"), 
                            where('pengusul', 'array-contains', store.user.email),
                            orderBy(sortStatus.value, sortDirection.value), 
                            endBefore(firstVisible),
                            limitToLast(pageLimit));
                    }
                const prevSnapshot = await getDocs(prev);
                // console.log(nextSnapshot)
    
                prevSnapshot.forEach((doc) => {
                    filterUsulan.value.push(doc.data())
                    progressLoad.value = false
                });
    
                // Get the last visible document
                lastVisible = prevSnapshot.docs[prevSnapshot.docs.length-1];
                firstVisible = prevSnapshot.docs[0];
            }
        }
    }

    function paginateArray() {
        filterUsulan.value = fullUsulan.value.slice((currentPage-1) * pageLimit, (currentPage) * pageLimit)
    }

    async function prepareSearch(){ 
        // Prepare Search Firestore
        // fullSnapshot = await getDocs(q)
        // console.log('fullSnapshot size = ', fullSnapshot.size) 

        // Prepare Search Realtime Database
        if (isAdmin){
            searchSnapshot = queryRealTimeDB(databaseRef($database, 'ciptaan/'))
        } else{
            searchSnapshot = queryRealTimeDB(databaseRef($database, 'ciptaan/'),
                orderByChild('pengusul'),
                startAt(store.user.email),
                endAt(store.user.email + '\uf8ff'),)
        }
        get(searchSnapshot).then((snapshot) => {
            if (snapshot.exists()) {
                searchData = snapshot.val()
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });
    }

    async function search(){
        currentPage = 1
        fullUsulan.value = []
        let itemsFounded = 0
        // Filter by keyword
        fullSnapshot.forEach((doc) => {
            if(doc.data().judul.toLowerCase().includes(keyword.value.toLowerCase())){
                itemsFounded++
                filterUsulan.value.push(doc.data())
                fullUsulan.value.push(doc.data())
            }
        })
        // Paginate item: 1 - pageLimit
        filterUsulan.value = fullUsulan.value.slice(0, pageLimit)
        totalPage = itemsFounded / pageLimit
    }

    async function search2(){
        searchIdList.value = []
        filterUsulan.value = []

        // Prepare search if first input
        if(pageLimit>10){
            pageLimit=10
        }        

        Object.keys(searchData).forEach(key => {
            const item = searchData[key];
            if (item.judul.includes(keyword.value.toLowerCase())){
                searchIdList.value.push(item.id)
            }
        });
           
        if (searchIdList.value.length > 0 && searchIdList.value.length < 60) { 
            // pageLimit = 10
            
            qLimit = query(collection($databaseFirestore, "ciptaan2"), 
                where('id', 'in', searchIdList.value.slice((currentPage-1)*pageLimit, currentPage*pageLimit)),
                orderBy(sortStatus.value, sortDirection.value), 
                limit(pageLimit));
            const querySnapshot = await getDocs(qLimit);

            if(keyword.value == ''){
                return
            }                
            querySnapshot.forEach((doc) => {
                filterUsulan.value.push(doc.data())
            });

            // Get Page
            currentPage = 1
            jumlahUsulan.value = searchIdList.value.length
            totalPage = jumlahUsulan.value / pageLimit
            // console.log('Total page: ' + totalPage)
        } else if (searchIdList.value.length > 60) {
            console.warn('Too many data, please give more detail keyword')
        }
        
    }

    async function nextPageBySearch(){
        selectedRow.value = -1
        if (currentPage >= totalPage ){
            return
        }
        else{
            currentPage++
            filterUsulan.value = []
            // Construct a new query starting at this document,
            let next
            next = query(collection($databaseFirestore, "ciptaan2"), 
                    where('id', 'in', searchIdList.value.slice((currentPage-1)*pageLimit, currentPage*pageLimit)),
                    limit(pageLimit));
            const nextSnapshot = await getDocs(next);

            nextSnapshot.forEach((doc) => {
                filterUsulan.value.push(doc.data())
                progressLoad.value = false
            });
        }
    }

    async function prevPageBySearch(){
        selectedRow.value = -1
        if (currentPage == 1 ){
            return
        }
        else{
            currentPage--
            filterUsulan.value = []
            // Construct a new query starting at this document,
            let prev
            prev = query(collection($databaseFirestore, "ciptaan2"), 
                    where('id', 'in', searchIdList.value.slice((currentPage-1)*pageLimit, currentPage*pageLimit)),
                    limit(pageLimit));
            const prevSnapshot = await getDocs(prev);

            prevSnapshot.forEach((doc) => {
                filterUsulan.value.push(doc.data())
                progressLoad.value = false
            });
        }
    }

    async function backupRealtimeDatabase(){
        let i = 1
        filterUsulan.value.forEach(element => {
            let pencipta = []
            element['pencipta'].forEach(elementPencipta => {
                // console.log(elementPencipta.nama)
                pencipta.push(elementPencipta.nama.toLowerCase())
            });
            try {   
                set(databaseRef($database, 'ciptaan/' + element['id']), {
                    id: element['id'],
                    judul: element['judul'].toLowerCase() +' ~ '+pencipta.join(', '),
                    pengusul: element['pengusul'].join(', '),
                    statusCiptaan: element['statusCiptaan']
                })
                console.log(i++ + " Backup to RealtimeDB");
            } catch (e) {
                console.error("Error adding document to RealtimeDB: ", e);
            }
        });
    }

    // function updateRouter(){
    //     router.replace(`${route.path}?page=${currentPage.value}&show=${limitPerPage.value}&sort=${currentSort.value}&search=${searchJudul.value.judul}`)
    //     // if(searchJudul.value.judul){
    //     // } else{
    //     //     router.replace(`${route.path}?page=${currentPage.value}&show=${limitPerPage.value}`)
    //     // }
    // }

    function classStatus (status) {
        switch (status){
            case 'Verifikasi':
                return 'badge'
                break;
            case 'Verifikasi*':
                return 'badge'
                break;
            case 'Revisi':
                return 'badge bg-amber-400 text-black'
                break;
            case 'Ditolak':
                return 'badge bg-red-500'
                break;
            case 'Cetak Formulir':
                return 'badge bg-purple-400 '
                break;
            case 'Submit ke DJKI':
                return 'badge bg-sky-600'
                break;
            case 'Selesai':
                return 'badge bg-green-700'
                break;
        }
    }
    
    const {reader} = defineProps(['reader'])
    onMounted(() => {
        readDatabase()        
    })

    const formatDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
    })
    let includeArabic
    let includeChinese
    async function createPdf(item) {
        // console.log(item)
        const doc = new jsPDF()
        // Test arabic
        const arabic = /[\u0600-\u06FF]/
        const chinese = /[\u3400-\u9FBF]/
        includeArabic = arabic.test(item.judul)
        includeChinese = chinese.test(item.judul)
        if(includeArabic){
            doc.addFont('/Amiri-Regular.ttf', "Amiri", "normal");
        } else if (includeChinese){
            doc.addFont('/DengXian.ttf', "DengXian", "normal");
        }
        let lastPDFPage = 0
        let currentPage = 0
        await pdfFormulir(doc, item)
        await insertQrCode(doc, item.id, 'formulir', lastPDFPage)
        lastPDFPage = await doc.internal.getNumberOfPages()
        
        await pdfPengalihan(doc, item)
        await insertQrCode(doc, item.id, 'pengalihan', lastPDFPage)
        lastPDFPage = await doc.internal.getNumberOfPages()
        
        await pdfPernyataan(doc, item)
        currentPage = await doc.internal.getNumberOfPages()
        await insertQrCode(doc, item.id, 'pernyataan', lastPDFPage)
        
        doc.output('dataurlnewwindow', {filename: "Formulir "+item.id})
    }

    async function pdfFormulir(doc, item){
        let Pencipta = []
        doc.setFontSize(12)
        doc.setFont('times', 'normal')
        doc.text('Hasil '+ item.sumberDana, 15, 15);
        doc.text('Biaya produksi karya: ', 15, 20);
        doc.text('Rp. '+item.biaya, 15, 25);
        // doc.text("200,4", 200, 4)
        doc.text("Lampiran I \nPeraturan Menteri Kehakiman R.I.\nNomor : M.01-HC.03.01 Tahun 1987", 130, 10);
        doc.setLineWidth(0,5);
        doc.line(130, 22, 200, 22);
        doc.setFont('times','normal')
        doc.text('Kepada Yth. :\nDirektur Jenderal HKI\nmelalui Direktur Hak Cipta,\nDesain Industri, Desain Tata Letak,\nSirkuit Terpadu dan Rahasia Dagang\ndi Jakarta', 130, 30)
        doc.setFontSize(16)
        doc.setFont('times', 'bold')
        doc.text('PERMOHONAN PENDAFTARAN CIPTAAN', doc.internal.pageSize.width/2, 67, null, null, 'center')
        doc.setLineWidth(0,5);
        doc.line(49, 70, 162, 70);
        //Detail Ciptaan
        //Jenis
        Pencipta.push(
            [{ content: 'Detail', colSpan: 3, rowSpan: 1, styles: { fontStyle: 'bold' } }],
            ['Jenis Permohonan', ':', 'UMK, Lembaga Pendidikan, Lembaga Litbang Pemerintah'],
            ['Jenis Ciptaan', ':',item.jenis],
            ['Sub-Jenis Ciptaan', ':',item.subJenis],
            includeArabic ? [{ content: 'Judul Ciptaan                      :  ' + item.judul, colSpan: 3, rowSpan: 1,  styles: { font: 'Amiri' } }] : 
                includeChinese ? [{ content: 'Judul Ciptaan                      :  ' + item.judul, colSpan: 3, rowSpan: 1,  styles: { font: 'DengXian' } }] : 
                ['Judul Ciptaan', ':', item.judul] ,
            ['Uraian Singkat Ciptaan',':', item.deskripsi], 
            ['Tanggal', ':', formatDate.format(item.tanggal)],
            ['Kota Pertama Kali Diumumkan', ':', item.kotaCiptaan],
            ['','',''],
            )
        //Data Pencipta
        Pencipta.push(
            [{ content: 'Data Pencipta', colSpan: 3, rowSpan: 1, styles: { fontStyle: 'bold' } }],
        )
        for (let i = 0; i < Object.keys(item.pencipta).length; i++){
            let urutanPencipta = i+1
            Pencipta.push(['Pencipta ' + urutanPencipta, '',''])
            Pencipta.push(['\t1. Nama', ':', item.pencipta[i].nama])
            Pencipta.push(['\t2. Email', ':', item.pencipta[i].email])
            Pencipta.push(['\t3. No. HP/Telepon', ':', item.pencipta[i].hp])
            Pencipta.push(['\t4. Kewarganegaraan', ':', item.pencipta[i].kewarganegaraan])
            Pencipta.push(['\t5. Alamat', ':', item.pencipta[i].alamat])
            Pencipta.push(['\t6. Provinsi', ':', item.pencipta[i].provinsi])
            Pencipta.push(['\t7. Kota', ':', item.pencipta[i].kota])
            Pencipta.push(['\t8. Kecamatan', ':', item.pencipta[i].kecamatan])
            Pencipta.push(['\t9. Negara', ':', item.pencipta[i].negara])
            Pencipta.push(['\t10. Kode pos', ':', item.pencipta[i].kodepos])
            Pencipta.push(['','',''])        
        }
        //Pemegang Hak cipta
        Pencipta.push(
            [{ content: 'Data Pemegang Hak Cipta', colSpan: 3, rowSpan: 1, styles: { fontStyle: 'bold' } }],
        )
        Pencipta.push(
            ['\t1. Nama', ':','Universitas Negeri Malang'],
            ['\t2. E-mail', ':','sentrahki@um.ac.id'],
            ['\t3. No. Telepon', ':','0341-551312'],
            ['\t4. Kewarganegaraan', ':','Indonesia'],
            ['\t5. Alamat', ':','Jalan Semarang 5'],
            ['\t6. Provinsi', ':','Jawa Timur'],
            ['\t7. Kota', ':','Malang'],
            ['\t8. Kecamatan', ':','Lowokwaru'],
            ['\t9. Negara', ':','Indonesia'],
            ['\t10. Kode pos', ':','65145'],
            ['','','']
        )
        //Kuasa
        Pencipta.push(
            [{ content: 'Data Kuasa', colSpan: 3, rowSpan: 1, styles: { fontStyle: 'bold' } }],
        )
        Pencipta.push(
            ['\t1. Nama', ':','-'],
            ['\t2. Kewarganegaraan', ':','-'],
            ['\t3. Alamat', ':','-'],
            ['\t4. Telepon', ':','-'],
            ['\t5. No. HP & E-mail', ':','-'],
            ['','','']
        )
        //TTD
        Pencipta.push(
            [{ content: 'Malang, '+ formatDate.format(item.id.slice(0,-4)) +'\nDirektur Inovasi\n\n\n\nProf. Dr. Nandang Mufti, S.Si, M.T.\nNIP 197208152005011001', colSpan: 3, styles: {cellPadding: {left: 115}} }],
        )
        doc.autoTable({ 
            styles: { font: 'times', fontSize: 12, cellPadding: 1},
            columnStyles: { 0: { cellWidth: 50 }, 2: {cellWidth: 'auto'} },
            startY: 75,
            theme: 'plain',
            body: Pencipta,
            rowPageBreak: 'avoid',
            margin: { bottom: 30 },
        })
    }

    async function pdfPengalihan(doc, item){
        //--Halaman Baru
        doc.addPage('a4', 'portrait')
        doc.setFontSize(12)
        doc.setFont('times', 'bold')
        doc.text('SURAT PENGALIHAN HAK CIPTA', doc.internal.pageSize.width/2, 25, null, null, 'center')
        var pengalihan = []
        pengalihan.push([{ content: 'Yang bertanda tangan di bawah ini', colSpan: 3 }]) 
        pengalihan.push(['','',''])
        pengalihan.push(['Nama', ':', item.pencipta[0].nama])
        pengalihan.push(['Alamat', ':', `${item.pencipta[0].alamat}, ${item.pencipta[0].kota}, ${item.pencipta[0].provinsi}, Kode Pos: ${item.pencipta[0].kodepos}`])
        pengalihan.push(['','',''])
        pengalihan.push([{ content: 'Adalah Pihak I selaku pencipta, dengan ini menyerahkan karya ciptaan saya kepada :', colSpan: 3 }]) 
        pengalihan.push(['','',''])
        pengalihan.push(['Nama', ':', 'Universitas Negeri Malang (UM)'])
        pengalihan.push(['Alamat', ':', 'Jalan Semarang 5 Malang 65145'])
        pengalihan.push(['','',''])
        // pengalihan.push([{ content: 'Adalah Pihak II selaku Pemegang Hak Cipta berupa '+ item.judul+ ' untuk didaftarkan di Direktorat Hak Cipta, Desain Industri, Desain Tata Letak dan Sirkuit Terpadu dan Rahasia Dagang, Direktorat Jenderal Hak Kekayaan Intelektual, Kementerian Hukum dan Hak Asasi Manusia R.I.', colSpan: 3 }]) 
        includeArabic ? pengalihan.push([{ content: 'Adalah Pihak II selaku Pemegang Hak Cipta berupa '+ item.judul+ ' untuk didaftarkan di Direktorat Hak Cipta, Desain Industri, Desain Tata Letak dan Sirkuit Terpadu dan Rahasia Dagang, Direktorat Jenderal Hak Kekayaan Intelektual, Kementerian Hukum dan Hak Asasi Manusia R.I.', colSpan: 3, styles: { font: 'Amiri' } }])
        : includeChinese ? pengalihan.push([{ content: 'Adalah Pihak II selaku Pemegang Hak Cipta berupa '+ item.judul+ ' untuk didaftarkan di Direktorat Hak Cipta, Desain Industri, Desain Tata Letak dan Sirkuit Terpadu dan Rahasia Dagang, Direktorat Jenderal Hak Kekayaan Intelektual, Kementerian Hukum dan Hak Asasi Manusia R.I.', colSpan: 3, styles: { font: 'DengXian' } }])
        : pengalihan.push([{ content: 'Adalah Pihak II selaku Pemegang Hak Cipta berupa '+ item.judul+ ' untuk didaftarkan di Direktorat Hak Cipta, Desain Industri, Desain Tata Letak dan Sirkuit Terpadu dan Rahasia Dagang, Direktorat Jenderal Hak Kekayaan Intelektual, Kementerian Hukum dan Hak Asasi Manusia R.I.', colSpan: 3 }])
        ,
        pengalihan.push(['','',''])
        pengalihan.push([{ content: 'Demikianlah surat pengalihan hak ini kami buat, agar dapat dipergunakan sebagaimana mestinya.', colSpan: 3 }]) 
        var pengalihan2 = []
        pengalihan2.push(['', 'Malang, '+ formatDate.format(item.id.slice(0,-4))]) 
        pengalihan2.push(['UNTUK DAN ATAS NAMA', '']) 
        pengalihan2.push(['UNIVERSITAS NEGERI MALANG', 'PENCIPTA 1']) 
        // pengalihan2.push(['a.n. Rektor', '']) 
        pengalihan2.push(['Direktur Inovasi', '']) 
        pengalihan2.push(['','\n\n\n\n'])
        pengalihan2.push(['Prof. Dr. Nandang Mufti, S.Si, M.T.\nNIP 197208152005011001', item.pencipta[0].nama +'\n'+item.pencipta[0].nip]) 
        for (let i = 1; i < Object.keys(item.pencipta).length; i++){
            let urutanPencipta = i+1   
            pengalihan2.push(['', '\nPENCIPTA '+urutanPencipta +'\n\n\n\n\n'+item.pencipta[i].nama +'\n'+item.pencipta[i].nip])   
        }
        doc.autoTable({ 
            styles: { font: 'times', fontSize: 12, cellPadding: 1},
            startY: 30,
            theme: 'plain',
            body: pengalihan,
        })
        doc.autoTable({ 
            styles: { font: 'times', fontSize: 12, cellPadding: 0},
            columnStyles: { 0: { cellWidth: 110 }},
            startY: doc.lastAutoTable.finalY + 10,
            theme: 'plain',
            rowPageBreak: 'avoid',
            body: pengalihan2,            
            // margin: { bottom: 20 },
            didDrawCell: (data) => {
            if (data.section === 'body' && data.row.index === 5 && data.column.index === 0) {
                doc.setFontSize(6)
                doc.setTextColor('red')
                doc.text('METERAI \nRp. 10.000', data.cell.x + 95, data.cell.y + 0,0,5)
            }
            },
        })
    }

    async function pdfPernyataan(doc, item){
        //--Halaman Baru
        doc.addPage('a4', 'portrait')
        doc.setFontSize(12)
        doc.setFont('times', 'bold')
        doc.text('SURAT PERNYATAAN', doc.internal.pageSize.width/2, 25, null, null, 'center')
        var pernyataan = []
        pernyataan.push([{ content: 'Yang bertanda tangan di bawah ini', colSpan: 3 }]) 
        pernyataan.push([
            { content: 'Nama', styles:{cellPadding:{bottom: 0, left: 2}, cellWidth: 35}},
            { content: ':', styles:{cellPadding:{bottom: 0}} },
            { content: 'Universitas Negeri Malang (UM)', styles:{cellPadding:{bottom: 0}} }
        ])
        pernyataan.push([
            { content: 'Kewarganegaraan', styles:{cellPadding:{bottom: 0, left: 2}} },
            { content: ':', styles:{cellPadding:{bottom: 0}} },
            { content: 'Indonesia', styles:{cellPadding:{bottom: 0}} }
        ])
        pernyataan.push([
            { content: 'Alamat', styles:{cellPadding:{bottom: 0, left: 2}} },
            { content: ':', styles:{cellPadding:{bottom: 0}} },
            { content: 'Jalan Semarang 5 Malang 65145', styles:{cellPadding:{bottom: 0}} }
        ])
        pernyataan.push([{ content: 'Dengan ini menyatakan bahwa :', colSpan: 3 }]) 
        pernyataan.push([{ content: '1. Karya Cipta yang saya mohonkan :', colSpan: 3, styles:{cellPadding:{bottom: 0}}  }])
        pernyataan.push([
            { content: 'Berupa', styles:{cellPadding:{bottom: 0, left: 4}} },
            { content: ':', styles:{cellPadding:{bottom: 0}} },
            { content: item.subJenis, styles:{cellPadding:{bottom: 0}} }
        ])
        pernyataan.push([
            { content: 'Berjudul', styles:{cellPadding:{bottom: 0, left: 4}} },
            { content: ':', styles:{cellPadding:{bottom: 0}} },
            includeArabic ? { content: item.judul, styles:{cellPadding:{bottom: 0}, font: 'Amiri' } } :
                includeChinese ? { content: item.judul, styles:{cellPadding:{bottom: 0}, font: 'DengXian' } } :
                { content: item.judul, styles:{cellPadding:{bottom: 0}} }
        ])
        pernyataan.push([{ content: 
        '• Tidak meniru dan tidak sama secara esensial dengan Karya Cipta milik pihak lain atau obyek kekayaan intelektual lainnya sebagaimana dimaksud dalam Pasal 68 ayat (2);\n• Bukan merupakan Ekspresi Budaya Tradisional sebagaimana dimaksud dalam Pasal 38;\n• Bukan merupakan Ciptaan yang tidak diketahui penciptanya sebagaimana dimaksud dalam Pasal 39;\n• Bukan merupakan hasil karya yang tidak dilindungi Hak Cipta sebagaimana dimaksud dalam Pasal 41 dan 42;\n• Bukan merupakan Ciptaan seni lukis yang berupa logo atau tanda pembeda yang digunakan sebagai merek dalam perdagangan barang/jasa atau digunakan sebagai lambang organisasi, badan usaha, atau badan hukum sebagaimana dimaksud dalam Pasal 65 dan;\n• Bukan merupakan Ciptaan yang melanggar norma agama, norma susila, ketertiban umum, pertahanan dan keamanan negara atau melanggar peraturan perundang-undangan sebagaimana dimaksud dalam Pasal 74 ayat (1) huruf d Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta',
        colSpan: 3, styles:{cellPadding:{left: 5}} }]
        )
        pernyataan.push([{ content: '2. Sebagai pemohon mempunyai kewajiban untuk menyimpan asli contoh ciptaan yang dimohonkan dan harus memberikan apabila dibutuhkan untuk kepentingan penyelesaian sengketa perdata maupun pidana sesuai dengan ketentuan perundang-undangan.', colSpan: 3, styles:{cellPadding:{bottom: 1, top:1, left: 2}} }]
        )
        pernyataan.push([{ content: '3. Karya Cipta yang saya mohonkan pada Angka 1 tersebut di atas tidak pernah dan tidak sedang dalam sengketa pidana dan/atau perdata di Pengadilan.', colSpan: 3, styles:{cellPadding:{bottom: 1, top:1, left: 2}} }])
        pernyataan.push([{ content: '4. Dalam hal ketentuan sebagaimana dimaksud dalam Angka 1 dan Angka 3 tersebut di atas saya / kami langgar, maka saya / kami bersedia secara sukarela bahwa:', colSpan: 3, styles:{cellPadding:{bottom: 0, left: 2}}}])
        pernyataan.push([{ content: 
        'a. Permohonan karya cipta yang saya ajukan dianggap ditarik kembali; atau\nb. Karya Cipta yang telah terdaftar dalam Daftar Umum Ciptaan Direktorat Hak Cipta, Direktorat Jenderal Hak Kekayaan Intelektual, Kementerian Hukum Dan Hak Asasi Manusia R.I dihapuskan sesuai dengan ketentuan perundang-undangan yang berlaku.\nc. Dalam hal kepemilikan Hak Cipta yang dimohonkan secara elektronik sedang dalam berperkara dan/atau sedang dalam gugatan di Pengadilan maka status kepemilikan surat pencatatan elektronik tersebut ditangguhkan menunggu putusan Pengadilan yang berkekuatan hukum tetap.', colSpan: 3, styles:{cellPadding:{left: 5}} }]
        )
        pernyataan.push([{ content: 
        'Demikian Surat pernyataan ini saya/kami buat dengan sebenarnya dan untuk dipergunakan sebagimana mestinya.',
        colSpan: 3}])
        pernyataan.push(
            [{ content: '\nMalang, '+ formatDate.format(item.id.slice(0,-4)) +'\nYang menyatakan,\n\n\n\n\n\nProf. Dr. Nandang Mufti, S.Si, M.T.\nNIP 197208152005011001', colSpan: 3, styles: {cellPadding: {left: 115}} }]
            )
        doc.autoTable({ 
            styles: { font: 'times', fontSize: 12, cellPadding: 2},
            startY: 30,
            theme: 'plain',
            rowPageBreak: 'avoid',
            body: pernyataan,
            // margin: { bottom: 20 },
            didDrawCell: (data) => {
            if (data.section === 'body' && data.row.index === 14) {
                doc.setFontSize(6)
                doc.setTextColor('red')
                doc.text('METERAI \nRp. 10.000', data.cell.x + 100, data.cell.y + 20,0,0)
            }
            },
        })
    }

    async function insertQrCode(doc, id, category, pageStart){
        const pdfPages = await doc.internal.getNumberOfPages()

        console.log('Total page', pdfPages)
        console.log(category, 'start from', pageStart+1)
        
        for ( let i = pageStart+1; i <= pdfPages; i++) {
            console.log('In page', i, 'of', pdfPages)
            doc.setPage(i)

            const pageNumber = i-pageStart
            const qrCodeDataURL = await generateQrCode(`${id}/${category}(${pageNumber})`)
            console.log(`${id}/${category}(${pageNumber})`)
            
            // Position QR code in the footer section
            const qrCodeWidth = 20; // Adjust according to your needs
            const qrCodeHeight = 20; // Adjust according to your needs
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            let qrCodeX
            if (category!='formulir'){
                qrCodeX = 10
            } else {
                qrCodeX = pageWidth - qrCodeWidth - 10
            }
            const qrCodeY = pageHeight - qrCodeHeight - 15; 

            await doc.addImage(qrCodeDataURL, 'PNG', qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight); // Adjust the parameters accordingly
        
            if (i == pdfPages){
                return
            }
        }
    }

    const ktpModal = ref(false)
    const refKTP = ref('')
    async function createPdfKTP(item, req) {
        const doc = new jsPDF()
        
        doc.setFontSize(12)
        doc.setFont('times', 'normal')
        doc.text('KTP Pemohon (Rektor)', 15, 20)

        await getRektor(doc)
        await getKTP(doc,item)
        
        if (req == 'download'){
            doc.save(`KTP - ${item.id}`);
        } else if (req == 'preview'){
            doc.output('dataurlnewwindow', {filename: `KTP - ${item.id}`})
        }


        // ktpModal.value = false
    }
    async function getRektor(doc){
        const { data: serverData } = await useFetch('/api/ktpRektor' , { method: 'post', body: { domain: 'hakciptav2.vercel.app' } });
        // console.log(serverData.value)
        // const config = useRuntimeConfig()
        const ktpRektor = serverData.value
        var img = document.createElement('img')
        img.id = `rektor`
        img.src = ktpRektor
        refKTP.value.appendChild(img)
        doc.addImage(document.getElementById(`rektor`), "JPEG", 15, 40, 125, 83, 'Rektor', 'SLOW')

    }
    
    async function getKTP(doc,item){
        refKTP.value.innerHTML = ''
        //ambil ktp setiap pencipta dan masukkan ke pdf
        for(let i= 0; i < Object.keys(item.pencipta).length; i++){            
            doc.addPage('a4', 'portrait')
            const penciptaKe = i+1
            doc.text(`KTP Pencipta ${penciptaKe} - ${item.pencipta[i].nama}`, 15, 20)
            // console.log(item.pencipta[i])
            // console.log(item.pencipta[i].ktp)

            // Buat alert untuk menampung sementara ktp sebelum dicetak
            var imgElement = document.createElement("img")
            imgElement.id = `pencipta${penciptaKe}`
            imgElement.src = item.pencipta[i].ktp;
            imgElement.className = 'hidden'
            refKTP.value.appendChild(imgElement);
            doc.addImage(document.getElementById(`pencipta${penciptaKe}`), "JPEG", 15, 40, 125, 83, penciptaKe), 'SLOW';
            
        }        
    }

    let dataExcel = ref(
        [
        {
            sheet: `Rekap Hak Cipta`,
            columns: [
            { label: "Tanggal Pengajuan", value: "tglPengajuan" },
            { label: "Judul", value: "judul" },
            { label: "Produk Hasil", value: "produkHasil" },
            { label: "Nilai Aset", value: "biaya" },
            { label: "Status", value: "status" },
            { label: "Catatan", value: "catatan" },
            ],
            content: [
            
            ],
        },
        ] 
    )
    // console.log(dataExcel.value[0].columns)
    let settings = {
        fileName: `Hak Cipta UM - ${formatDate.format(new Date())}`, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    }
    async function prepareDataExcel(){
        fullUsulan.value = []

        // READ QUERY
        qLimit = query(collection($databaseFirestore, "ciptaan2"), 
            orderBy('id', 'desc'));

        const querySnapshotExcel = await getDocs(qLimit);

        querySnapshotExcel.forEach((doc) => {
            fullUsulan.value.push(doc.data())
        })

        fullUsulan.value.forEach((doc, index) => {
            let isiPencipta = []
            for (let x = 0; x < doc['pencipta'].length; x++){
                isiPencipta.push({
                    ['pencipta'+x]: doc['pencipta'][x]['nama']
                })

                // Add pencipta column
                dataExcel.value[0].columns.push(
                    {
                        label: "Pencipta "+(x+1), value: "pencipta"+x
                    }
                )
                
            }
            dataExcel.value[0].content.push(
                { 
                    tglPengajuan: formatDate.format(doc.id.slice(0, -4)),
                    judul: doc.judul, 
                    produkHasil: doc.sumberDana,
                    biaya: doc.biaya,
                    status: doc.statusCiptaan,
                    catatan: doc.catatan || '-'
                },
            )
        })
    }
    async function downloadExel(){

        await prepareDataExcel()

        for(let i = 0; i < fullUsulan.value.length; i++){
            for (let x = 0; x < fullUsulan.value[i]['pencipta'].length; x++){
                Object.assign(dataExcel.value[0].content[i], {
                    ['pencipta'+x]: fullUsulan.value[i]['pencipta'][x]['nama']
                })
            }
        }
        // Download excell
        xlsx(dataExcel.value, settings)
    }

    async function tutupBuku(){
        const qLimit = query(collection($databaseFirestore, "ciptaan2"),
            where('statusCiptaan', 'in', ['Verifikasi']),
            limit(10)
            );
        const querySnapshot = await getDocs(qLimit);
        querySnapshot.forEach(async (doc) => {
            console.log(doc.data())
            await updateStatusOnly(doc.data().id, 'Pending')
        });
    }

    async function updateStatusOnly(id, status){
        await updateDoc(doc($databaseFirestore, "ciptaan2", id), {
            statusCiptaan: status,
        });
    }

    async function generateQrCode(content){
        try {
            return await QRCode.toDataURL(content);
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw error;
        }
    }


</script>

<style scoped>

</style>
