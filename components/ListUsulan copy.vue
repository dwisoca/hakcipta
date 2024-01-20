<template>
    <div class="card max-h-full">
        <div class="card-body">
            <div class="flex justify-left sm:justify-end items-end sm:items-left ">                
                <div class="form-control">
                <div class="input-group">
                    <button class="btn btn-square no-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <input 
                    type="search" 
                    placeholder="Ketik judul" 
                    id="inputJudul"  
                    v-model="searchJudul['judul']"
                    class="input input-bordered" 
                    @input="cari(); updateRouter()" />
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
                        <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('judul')">
                            Judul
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                      </th>
                      <th>Pencipta</th>
                      <th>Sub-Jenis</th>
                      <th>
                          <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('id')">
                            Tanggal Pengajuan
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                        </th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('pengusul')">
                            Pengusul
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                        </th>
                      <th>
                        <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('statusCiptaan')">
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
                    <tr v-for="(items, key) in filterUsulan">
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
                      <td class="">{{ items.pengusul.split(', ')[0] }}</td>
                      <td >
                        <div class="indicator block">                            
                            <div class="indicator-item badge badge-sm bg-amber-400 text-black" v-if="items.statusCiptaan =='Verifikasi*'"></div>
                            <div :class="classStatus(items.statusCiptaan)" class="w-[8rem]">{{ items.statusCiptaan.replace('*','') }}</div>
                        </div>
                        <div class="text-sm italic text-amber-600 font-semibold" v-if="(items.statusCiptaan != 'Ditolak' && items.statusCiptaan != 'Selesai') && statusKecamatan(items)">Update Kecamatan Pencipta</div>
                        </td>
                      <!-- tombol aksi -->
                      <td class="w-[12rem] min-w-[11rem]">
                            <!-- TOMBOL Detail (Khusus Pengusul Anggota)  -->
                            <NuxtLink :to="'/tambah/'+ items.id" v-if=" items.statusCiptaan == 'Ditolak' || items.pengusul.split(', ')[0] != store.user.email && !isAdmin">
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
                            <NuxtLink :to="'/tambah/'+ items.id" v-if="items.statusCiptaan != 'Selesai' && items.statusCiptaan != 'Submit ke DJKI' && items.statusCiptaan != 'Cetak Formulir' && items.statusCiptaan != 'Ditolak' && items.pengusul.split(', ')[0] == store.user.email || isAdmin">
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
                        <th>Total Usulan: {{ daftarUsulan.length }}<br/>
                            Selesai: {{ jumlahSelesai }} <br/>
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
                    <select class="select select-primary" v-model="limitPerPage" @change="(currentPage=1); filter2(); halaman2(); updateRouter()">
                        <option disabled selected>Jumlah item:</option>
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>All</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center space-x-4">
                <div class="card-actions">
                    <div class="btn-group">
                        <button class="btn" @click="currentPage--; filter2(); halaman2(); updateRouter()" :disabled="currentPage==1 ? true : false">«</button>
                        <button class="btn cursor-default no-animation">Halaman: {{currentPage}}</button>
                        <button class="btn" @click="currentPage++; filter2(); halaman2(); updateRouter()" :disabled="(currentPage==halaman ? true : false)">»</button>
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
    import * as array from 'alga-js/array'
    import { ref as databaseRef, get, query, orderByChild, equalTo } from 'firebase/database'
    import { useMainStore } from '~/store/index'
    import { jsPDF } from "jspdf"
    // Wajib Ada!!!
    import autoTable from 'jspdf-autotable'     
    import { getDate } from 'date-fns'

    function statusKecamatan (items){
        let listKecamatan = []
        let warningKecamatan = false
        Object.values(items)[11].forEach(element => {
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

    let daftarUsulanStatic = []
    const daftarUsulan = ref([])
    const jumlahSelesai = ref(0)
    const pencipta = ref()

    const router = useRouter()
    const route = useRoute()
    const queryPage = ref(route.query.page)
    const queryShow = ref(route.query.show)
    const querySearch = ref(route.query.search)
    const querySort = ref(route.query.sort)
    const currentPage = ref(1)
    const limitPerPage = ref(5)
    const searchJudul = ref({
        judul: ''
    })
    const currentSort = ref('')
    if (queryPage.value){currentPage.value=queryPage.value}
    if (queryShow.value){limitPerPage.value=queryShow.value}
    if (querySearch.value){Object.assign(searchJudul.value, {judul: querySearch.value})}

    const labelNoData = ref('Belum ada data')

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

    const filterUsulan = ref([])
    const halaman = ref()
    function updateRouter(){
        router.replace(`${route.path}?page=${currentPage.value}&show=${limitPerPage.value}&sort=${currentSort.value}&search=${searchJudul.value.judul}`)
        // if(searchJudul.value.judul){
        // } else{
        //     router.replace(`${route.path}?page=${currentPage.value}&show=${limitPerPage.value}`)
        // }
    }
    function filter2(){
        if(limitPerPage.value == 'All'){
            filterUsulan.value = daftarUsulan.value
            return
        }
        filterUsulan.value = array.paginate(daftarUsulan.value, currentPage.value, limitPerPage.value)
    }
    function halaman2(){
        if(limitPerPage.value == 'All'){
            halaman.value = 1
            return
        }
        if (searchJudul.value.judul){
            filterUsulan.value = array.filter(store.daftarUsulan, searchJudul.value)
        }
        halaman.value = array.pages(daftarUsulan.value, limitPerPage.value)
    }
    function cari(){
        filterUsulan.value = array.filter(store.daftarUsulan, searchJudul.value)
        currentPage.value = 1
        filterUsulan.value = array.paginate(filterUsulan.value, currentPage.value, limitPerPage.value)
        // filter2()
        // halaman2()
        if(searchJudul.value.judul){
            labelNoData.value = `Tidak ditemukan judul "${searchJudul.value.judul}"`
        } else{
            labelNoData.value = `Belum ada data`
        }
    }  
    const sortStatus = ref(true)
    function sortTable(kolom){
        currentSort.value = kolom
        sortStatus.value = !sortStatus.value
        if (sortStatus.value){
            daftarUsulan.value = array.sort(daftarUsulan.value, kolom, 'asc')
        } else {
            daftarUsulan.value = array.sort(daftarUsulan.value, kolom, 'desc')
        }
        filter2()
        halaman2()
        updateRouter()
    }
    
    async function readDatabase(){
        store.daftarUsulan = []
        const queryRef = ref()        
        queryRef.value = databaseRef($database, '/ciptaan')
        
        get(queryRef.value).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (reader == 'admin'){
                    store.daftarUsulan = Object.values(data)
                    Object.assign(daftarUsulan.value, Object.values(data))
                }
                else{
                    Object.values(data).forEach(element => {
                        const listPengusul = element.pengusul.split(', ')
                        if(listPengusul.includes(store.user.email)){
                            store.daftarUsulan.push(element)
                        }
                    });
                    Object.assign(daftarUsulan.value, store.daftarUsulan)
                }
    
                filter2()
                halaman2()
                if (querySort.value){sortTable(querySort.value)}

    
                jumlahSelesai.value=0
                for(let i=0; i<Object.keys(daftarUsulan.value).length; i++){
                    const value = Object.values(daftarUsulan.value[i])[11]
                    if(value == 'Selesai'){
                        jumlahSelesai.value++
                    }
                    progressLoad.value = false
                }
                progressLoad.value = false
                
                if(searchJudul.value.judul){
                    cari()
                    labelNoData.value = `Tidak ditemukan judul "${searchJudul.value.judul}"`
                }
            } else {
                progressLoad.value = false
                labelNoData.value = `Belum ada data`
            }
        });     

    }
    
    const {reader} = defineProps(['reader'])
    onMounted(() => {
        readDatabase()        
    })

    const formatDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
    })
    async function createPdf(item) {
        // console.log(item)
        const doc = new jsPDF()
        
        await pdfFormulir(doc, item)
        await pdfPengalihan(doc, item)
        await pdfPernyataan(doc, item)
        doc.output('dataurlnewwindow', {filename: "Formulir"})
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
            ['Judul Ciptaan', ':', item.judul],
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
            [{ content: 'Malang, '+ formatDate.format(item.id.slice(0,-4)) +'\na.n. Rektor\nDirektur Inovasi\n\n\n\n\n\nProf. Dr. Nandang Mufti, S.Si, M.T.\nNIP 197208152005011001', colSpan: 3, styles: {cellPadding: {left: 115}} }],
        )
        doc.autoTable({ 
            styles: { font: 'times', fontSize: 12, cellPadding: 1},
            columnStyles: { 0: { cellWidth: 50 }, 2: {cellWidth: 'auto'} },
            startY: 75,
            theme: 'plain',
            body: Pencipta,
            rowPageBreak: 'avoid'
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
        pengalihan.push([{ content: 'Adalah Pihak II selaku Pemegang Hak Cipta berupa '+ item.judul+ ' untuk didaftarkan di Direktorat Hak Cipta, Desain Industri, Desain Tata Letak dan Sirkuit Terpadu dan Rahasia Dagang, Direktorat Jenderal Hak Kekayaan Intelektual, Kementerian Hukum dan Hak Asasi Manusia R.I.', colSpan: 3 }]) 
        pengalihan.push(['','',''])
        pengalihan.push([{ content: 'Demikianlah surat pengalihan hak ini kami buat, agar dapat dipergunakan sebagaimana mestinya.', colSpan: 3 }]) 
        var pengalihan2 = []
        pengalihan2.push(['', 'Malang, '+ formatDate.format(item.id.slice(0,-4))]) 
        pengalihan2.push(['UNTUK DAN ATAS NAMA', '']) 
        pengalihan2.push(['UNIVERSITAS NEGERI MALANG', 'PENCIPTA 1']) 
        pengalihan2.push(['a.n. Rektor', '']) 
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
            didDrawCell: (data) => {
            if (data.section === 'body' && data.row.index === 14) {
                doc.setFontSize(6)
                doc.setTextColor('red')
                doc.text('METERAI \nRp. 10.000', data.cell.x + 100, data.cell.y + 20,0,0)
            }
            },
        })
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


</script>

<style scoped>

</style>
