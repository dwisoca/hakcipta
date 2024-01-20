<template>
    <div class="card max-h-full">
        <div class="card-body ">
            <div class="stats stats-vertical lg:stats-horizontal border block lg:hidden ">
                <StatusRekap 
                    :total-usulan="totalUsulan"
                    :jumlah-selesai="jumlahSelesai"
                    :jumlah-verifikasi="jumlahVerifikasi"
                    :jumlah-revisi="jumlahRevisi"
                    :jumlah-cetak="jumlahCetak"
                    :jumlah-ditolak="jumlahDitolak"
                    :jumlah-submit="jumlahSubmit"
                    :top-sub-jenis-ciptaan="topSubJenisCiptaan"
                    :top-fakultas-pencipta="topFakultasPencipta"/>
            </div> 
            <div class="flex justify-between sm:justify-left  items-end sm:items-left ">    
                <div class="stats border -my-2 -my-2 hidden lg:flex ">
                    <StatusRekap 
                    :total-usulan="totalUsulan"
                    :jumlah-selesai="jumlahSelesai"
                    :jumlah-verifikasi="jumlahVerifikasi"
                    :jumlah-revisi="jumlahRevisi"
                    :jumlah-cetak="jumlahCetak"
                    :jumlah-ditolak="jumlahDitolak"
                    :jumlah-submit="jumlahSubmit"
                    :top-sub-jenis-ciptaan="topSubJenisCiptaan"
                    :top-fakultas-pencipta="topFakultasPencipta"/>                
                </div> 

                <div class="flex">
                    <div class="tooltip tooltip-success" data-tip="Download Excel">
                    <button class="btn btn-square btn-success text-white no-animation mr-2 gap-2" @click="downloadExel">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </button>
                    </div>
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
                        <th>No. Aplikasi</th>
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
                            Pencipta ke-1
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </button>
                        </th>
                        <th>Pemegang Hak Cipta</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('judul')">
                                Judul
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>
                        <th>Nomor Sertifikat</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('sumberDana')">
                                Produk Hasil
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>                        
                        <th>Estimasi Biaya</th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto">
                    <!-- Tampilan tabel dengan data -->
                    <tr v-for="(items, key) in filterUsulan">
                        <th class="">{{ items.noAplikasi || '-' }}</th>
                        <td class="">{{ formatDate.format(items.id.slice(0, -4)) }}</td>
                        <td class="min-w-[8rem] max-w-[30rem] whitespace-normal">                            
                            <div class="text-normal font-bold">
                                <span class="font-bold block -mb-1">{{items.pencipta[0].nama}}</span>
                                <span class="text-xs italic">{{'('+ items.pencipta[0].fakultas +')'}}</span>
                            </div>
                            
                            <label for="my-modal-4" class="btn btn-xs btn-outline" @click="pencipta = items.pencipta" v-show="items.pencipta.length>1">{{ items.pencipta.length }} pencipta</label>
                        </td>
                        <td class="min-w-[12rem] max-w-[20rem] whitespace-normal">Universitas Negeri Malang</td>
                        <td class="font-medium min-w-[12rem] max-w-[20rem] whitespace-normal">
                            {{items.judul}}
                        </td>
                        <td class="">{{ items.noSertifikat || '-' }}</td>
                        <td class="">{{ items.sumberDana }}</td>
                        <td class="">{{ items.biaya.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits:0}) || '-' }}</td>
                    </tr>
                    <!-- Tampilan tabel tanpa data -->
                    <tr v-if="!progressLoad && filterUsulan.length == 0">
                        <td colspan="6" class="text-center">
                            {{ labelNoData }}<br/>
                        </td>
                    </tr>
                  </tbody>
                  <!-- foot -->
                  <tfoot class="sticky bottom-0 z-30">
                    <tr>
                        <th>Total Usulan: {{ totalUsulan }}<br/>
                            Selesai: {{ jumlahSelesai }} <br/>
                        </th>
                        <th></th>
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
        
        <!-- Modal Detail Pencipta -->
        <ModalDetailPencipta :list-pencipta="pencipta"/>
    </div>
</template>

<script setup>
    import * as array from 'alga-js/array'
    import { ref as databaseRef, get, query, orderByChild, equalTo } from 'firebase/database'
    import xlsx from "json-as-xlsx"
    
    const formatDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
    })

    let dataExcel = ref(
        [
        {
            sheet: `Rekap Hak Cipta`,
            columns: [
            { label: "No. Aplikasi", value: "noAplikasi" },
            { label: "Tanggal Pengajuan", value: "tglPengajuan" },
            { label: "Pemegang Hak Cipta", value: "pemegang" },
            { label: "Judul", value: "judul" },
            { label: "No. Sertifikat", value: "noSertifikat" },
            { label: "Produk Hasil", value: "produkHasil" },
            { label: "Estimasi Biaya", value: "biaya" },
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
    function downloadExel(){
        // Add Pencipta 1 - n
        for(let i = 0; i < daftarUsulanStatic.length; i++){
            console.log(i)
            for (let x = 0; x < daftarUsulanStatic[i]['pencipta'].length; x++){
                Object.assign(dataExcel.value[0].content[i], {
                    ['pencipta'+x]: daftarUsulanStatic[i]['pencipta'][x]['nama']
                })
            }
        }
        // Download excell
        xlsx(dataExcel.value, settings)
    }

    const progressLoad = ref(true)

    const { $database } = useNuxtApp()

    let daftarUsulanStatic = []
    const daftarUsulan = ref([])
    const totalUsulan = ref(0)
    const jumlahVerifikasi = ref(0)
    const jumlahRevisi = ref(0)
    const jumlahCetak = ref(0)
    const jumlahSubmit = ref(0)
    const jumlahDitolak = ref(0)
    const jumlahSelesai = ref(0)
    const pencipta = ref([])

    const router = useRouter()
    const route = useRoute()
    const queryPage = ref(route.query.page)
    const queryShow = ref(route.query.show)
    const querySearch = ref(route.query.search)
    const currentPage = ref(1)
    const limitPerPage = ref(5)
    const searchJudul = ref({
        judul: ''
    })
    if (queryPage.value){currentPage.value=queryPage.value}
    if (queryShow.value){limitPerPage.value=queryShow.value}
    if (querySearch.value){Object.assign(searchJudul.value, {judul: querySearch.value})}

    const labelNoData = ref('Belum ada data')

    const filterUsulan = ref([])
    const halaman = ref()
    function updateRouter(){
        if(searchJudul.value.judul){
            router.replace(`${route.path}?page=${currentPage.value}&show=${limitPerPage.value}&search=${searchJudul.value.judul}`)
        } else{
            router.replace(`${route.path}?page=${currentPage.value}&show=${limitPerPage.value}`)
        }
    }
    function filter2(){
        if(limitPerPage.value == 'All'){
            filterUsulan.value = daftarUsulanStatic
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
            filterUsulan.value = array.filter(daftarUsulanStatic, searchJudul.value)
        }
        halaman.value = array.pages(daftarUsulan.value, limitPerPage.value)
    }
    function cari(){
        filterUsulan.value = array.filter(daftarUsulan.value, searchJudul.value)
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
        sortStatus.value = !sortStatus.value
        if (sortStatus.value){
            daftarUsulan.value = array.sort(daftarUsulan.value, kolom, 'asc')
        } else {
            daftarUsulan.value = array.sort(daftarUsulan.value, kolom, 'desc')
        }
        filter2()
        halaman2()
    }

    
    async function readDatabase(){
        const queryRef = ref()        
        queryRef.value = databaseRef($database, '/ciptaan') 
        
        get(queryRef.value).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
    
                jumlahSelesai.value=0
                totalUsulan.value = Object.values(data).length
                
                let listNamaPencipta = []
                let listSubjenis = []
                let listFakultasPencipta = []
                for(let i=0; i< Object.values(data).length; i++){
                    const status = Object.values(data)[i].statusCiptaan
                    // console.log(status)
                    if (status == 'Selesai'){
                        jumlahSelesai.value++
                        
                        daftarUsulanStatic.push(Object.values(data)[i])

                        listSubjenis.push(Object.values(data)[i]['subJenis'])

                        pencipta.value = Object.values(data)[i].pencipta
                        pencipta.value.forEach((element, index) => {
                            listNamaPencipta.push(element.nama)
                            listFakultasPencipta.push(element.fakultas)

                            // Add pencipta column
                            dataExcel.value[0].columns.push(
                                {
                                    label: "Pencipta "+(index+1), value: "pencipta"+index
                                }
                            )
                        });
                        dataExcel.value[0].content.push(
                            { 
                                noAplikasi: Object.values(data)[i].noAplikasi, 
                                tglPengajuan: formatDate.format(Object.values(data)[i].tanggal),
                                pemegang: 'Universitas Negeri Malang', 
                                judul: Object.values(data)[i].judul, 
                                noSertifikat: Object.values(data)[i].noSertifikat,
                                produkHasil: Object.values(data)[i].sumberDana,
                                biaya: Object.values(data)[i].biaya
                            },
                        )
                        listNamaPencipta = []
                    } else if(status == 'Verifikasi'){
                        jumlahVerifikasi.value++
                    } else if(status == 'Verifikasi*'){
                        jumlahVerifikasi.value++
                    } else if(status == 'Cetak Formulir'){
                        jumlahCetak.value++
                    } else if(status == 'Revisi'){
                        jumlahRevisi.value++
                    } else if(status == 'Ditolak'){
                        jumlahDitolak.value++
                    } else if(status == 'Submit ke DJKI'){
                        jumlahSubmit.value++
                    }
                    progressLoad.value = false
                }
                // topNamaPencipta = mode(listNamaPencipta)
                topSubJenisCiptaan = mode(listSubjenis)
                topFakultasPencipta = mode(listFakultasPencipta)
                Object.assign(daftarUsulan.value, Object.values(daftarUsulanStatic))
                
                filter2()
                halaman2()
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
    onMounted(() => {
        readDatabase()        
    })
    function mode(arr){
        // return arr.sort((a,b) =>
        //     arr.filter(v => v===a).length
        //     - arr.filter(v => v===b).length
        // ).pop();

        if(arr.length == 0)
        return null;
        var modeMap = {};
        var maxEl = arr[0], maxCount = 1;
        for(var i = 0; i < arr.length; i++)
        {
            var el = arr[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }
    let topNamaPencipta
    let topFakultasPencipta
    let topSubJenisCiptaan

</script>

<style scoped>

</style>
