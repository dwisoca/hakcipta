<template>
    <div class="card max-h-full ml-2">
        <div class="card-body ">
            <!-- <div class="stats stats-vertical lg:stats-horizontal border block lg:hidden ">
                <StatusRekap 
                    :total-usulan="totalUsulan"
                    :jumlah-selesai="jumlahSelesai"
                    :jumlah-verifikasi="jumlahVerifikasi"
                    :jumlah-revisi="jumlahRevisi"
                    :jumlah-ditolak="jumlahDitolak"
                    :jumlah-submit="jumlahSubmit"
                    :jumlah-cetak="jumlahCetak"
                    /> 
            </div>  -->
            <!-- <div class="flex justify-between sm:justify-left  items-end sm:items-left ">    
                <div class="stats border -my-2 -my-2 hidden lg:flex mr-4 ">
                    <StatusRekap 
                    :total-usulan="totalUsulan"
                    :jumlah-selesai="jumlahSelesai"
                    :jumlah-verifikasi="jumlahVerifikasi"
                    :jumlah-revisi="jumlahRevisi"
                    :jumlah-ditolak="jumlahDitolak"
                    :jumlah-submit="jumlahSubmit"
                    :jumlah-cetak="jumlahCetak"
                    />               
                </div> 
                <div class="card w-1/2 bg-base-100 shadow p-5 hidden lg:flex">
                    <ChartTotalCiptaan class="w-full"/>
                </div>
            </div> -->
            
            <div class="grid grid-cols-2 grid-rows-3 gap-4">
                <div class="rounded-lg p-5 shadow">
                    <p class="text-xl tracking-tight text-gray-900 mb-5 font-bold">Rekapitulasi Status Ciptaan Tahun 2023</p>

                    <div class="stats border w-full">
                    <StatusRekap 
                    :total-usulan="totalUsulan"
                    :jumlah-selesai="jumlahSelesai"
                    :jumlah-verifikasi="jumlahVerifikasi"
                    :jumlah-revisi="jumlahRevisi"
                    :jumlah-ditolak="jumlahDitolak"
                    :jumlah-submit="jumlahSubmit"
                    :jumlah-cetak="jumlahCetak"
                    />               
                    </div> 
                </div>
                <div class="row-span-2 col-start-1 row-start-2 card bg-base-100 shadow p-5 ">
                    <ChartJenisCiptaan class="w-full h-full"/>
                </div>
                <div class="row-span-3 col-start-2 row-start-1">
                    <div class="card bg-base-100 shadow p-5 h-full">
                    <ChartTotalCiptaan class="w-full h-full"/>
                    </div>
                </div>
            </div>
    
            <div class="flex justify-end ">
                <p class="text-xl text-gray-900 mt-5 font-bold">Daftar Ciptaan Granted </p>

                <div class="tooltip tooltip-success" data-tip="Download Excel">
                    <button class="btn btn-square btn-success text-white no-animation mr-2 gap-2" @click="downloadExel()" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </button>
                </div>
                <!-- <div class="tooltip" data-tip="Update Data Manual">
                    <button class="btn no-animation mr-2 gap-2" @click="writeToFirestore(filterUsulan)" v-if="isAdmin">Data Syncing</button>
                </div> -->
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
                        @input="search2(keyword)" />
                        <!-- <button v-show="searchJudul['judul']!=''" @click="searchJudul['judul']=''; cari(); updateRouter()" class="btn btn-square btn-outline no-animation">X</button> -->
                    </div>
                </div>
            </div>
            <div class="flex justify-start space-x-4 items-center">
            </div>
            
            <!-- Table Here -->
            <!-- <div class="overflow-auto w-full"> -->
            <progress v-show="progressLoad" class="progress w-full"></progress>
            <div class="overflow-x-auto table-wrp block ">
                <table class="table table-zebra w-full ">
                  <!-- head -->
                  <thead class="sticky top-0 z-20 ">
                    <tr>
                        <th>No. Aplikasi</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('tanggalBayar')" :disabled="keyword != ''">
                                Tanggal Pengajuan DJKI
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>
                        <th>Pencipta ke-1</th>
                        <th>Pemegang Hak Cipta</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('judul')" :disabled="keyword != ''">
                                Judul
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>
                        <th>Nomor Sertifikat</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('sumberDana')" :disabled="keyword != ''">
                                Produk Hasil
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>                        
                        <th>Nilai Aset</th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto">
                    <!-- Tampilan tabel dengan data -->
                    <tr v-for="(items, key) in filterUsulan">
                        <th class="">
                        {{ items.noAplikasi || '-' }}
                        </th>
                        <td class="">{{ formatDate.format(items.tanggalBayar) }}</td>
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
                    
                  </tbody>
                  <!-- foot -->
                  <tfoot class="sticky bottom-0 z-30">
                    <tr>
                        <th></th>
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
                    <select class="select select-primary" v-model="pageLimit" @change="currentPage=1; keyword=''; readDatabase()">
                        <option disabled selected>Jumlah item:</option>
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                        <option :disabled="keyword != ''">20</option>
                        <option :disabled="keyword != ''">50</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center space-x-4">
                <div class="card-actions">
                    <div class="btn-group">
                        <button class="btn" @click="progressLoad=true; !keyword ? prevPage() : prevPageBySearch()" :disabled="currentPage == 1">«</button>
                        <button class="btn cursor-default no-animation">Halaman {{ currentPage }}</button>
                        <button class="btn" @click="progressLoad=true; !keyword ? nextPage() : nextPageBySearch()" :disabled="currentPage >= totalPage">»</button>
                    </div>
                </div>
            </div>
        </div> 
        
        <!-- Modal Detail Pencipta -->
        <ModalDetailPencipta :list-pencipta="pencipta"/>
    </div>
</template>

<script setup>
    import xlsx from "json-as-xlsx"
    import { doc, setDoc, getDocs, collection, query, where, orderBy, getCountFromServer, limit, startAfter, limitToLast, endBefore } from "firebase/firestore"; 
    import { get, set, ref as databaseRef, query as queryRealTimeDB, orderByChild, startAt, endAt, equalTo } from 'firebase/database'
    
    import { useMainStore } from '~/store/index'

    const totalUsulan = ref(0)
    const jumlahVerifikasi = ref(0)
    const jumlahRevisi = ref(0)
    const jumlahCetak = ref(0)
    const jumlahSubmit = ref(0)
    const jumlahDitolak = ref(0)
    const jumlahSelesai = ref(0)
    const jumlahUsulan = ref(0)
    let topFakultasPencipta
    let topSubJenisCiptaan

    const store = useMainStore()
    let isAdmin = store.user.isAdmin
    const formatDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
    })

    const progressLoad = ref(true)
    const pencipta = ref([])

    let usulanFull
    const { $database } = useNuxtApp()
    
    const { $databaseFirestore } = useNuxtApp()
    const filterUsulan = ref([])
    const fullUsulan = ref([])
    let pageLimit = 5
    let lastVisible
    let firstVisible
    let currentPage
    let totalPage = ref()
    let q
    let qLimit
    let fullSnapshot
    let querySnapshot
    const sortStatus = ref("tanggalBayar")
    const sortDirection = ref("desc")
    const keyword = ref('')
    const filterStatus = ref()
    const slideSearch = ref(0)
    let searchSnapshot
    let searchData
    let searchIdList = ref([])

    async function readDatabase(){

        filterUsulan.value = []
        q = query(collection($databaseFirestore, "ciptaan2"), 
            where('sertifikat', '!=', ""));

        // READ QUERY
        qLimit = query(collection($databaseFirestore, "ciptaan2"), 
            where('statusCiptaan', '==', "Selesai"), 
            orderBy(sortStatus.value, sortDirection.value), 
            limit(pageLimit));
        querySnapshot = await getDocs(qLimit);

        // Get the last visible document
        lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

        querySnapshot.forEach((doc) => {
            filterUsulan.value.push(doc.data())
            progressLoad.value = false
        });

        // Get Page
        currentPage = 1
        const counterSertifikat = await getCountFromServer(q);
        jumlahSelesai.value = counterSertifikat.data().count
        totalPage.value = jumlahSelesai.value / pageLimit

        await counter("Total")
        await counter("Verifikasi")
        await counter("Revisi")
        await counter("Ditolak")
        await counter("Cetak Formulir")
        await counter("Submit ke DJKI")
    }

    async function sortTable(kolom){
        sortStatus.value = kolom
        sortDirection.value = (sortDirection.value === 'asc') ? 'desc' : 'asc'
        // console.log(sortStatus.value, sortDirection.value)
        readDatabase()
    }

    async function nextPage(){
        if (currentPage >= totalPage.value ){
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
                const next = query(collection($databaseFirestore, "ciptaan2"), 
                    where('statusCiptaan', '==', "Selesai"),
                    orderBy(sortStatus.value, sortDirection.value), 
                    startAfter(lastVisible),
                    limit(pageLimit));
                const nextSnapshot = await getDocs(next);
                // console.log(nextSnapshot)
    
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
                const prev = query(collection($databaseFirestore, "ciptaan2"), 
                    where('statusCiptaan', '==', "Selesai"),
                    orderBy(sortStatus.value, sortDirection.value),
                    endBefore(firstVisible),
                    limitToLast(pageLimit));
                const prevSnapshot = await getDocs(prev);
                // console.log(nextSnapshot)
    
                prevSnapshot.forEach((doc) => {
                    filterUsulan.value.push(doc.data())
                    progressLoad.value = false
                });

                lastVisible = prevSnapshot.docs[prevSnapshot.docs.length-1];
                firstVisible = prevSnapshot.docs[0];
            }
        }
    }

    function paginateArray() {
        filterUsulan.value = fullUsulan.value.slice((currentPage-1) * pageLimit, (currentPage) * pageLimit)
    }

    async function search(){
        filterUsulan.value = []

        const searchQuery = query(collection($databaseFirestore, "ciptaan2"), 
            where('judulLowerCase', '>=', keyword.value.toLowerCase()), 
            where('judulLowerCase', '<=', keyword.value.toLowerCase()+ '\uf8ff'),
            where('statusCiptaan', '==', "Selesai"), 
        );
        const counterSertifikat = await getCountFromServer(searchQuery);
        console.log(counterSertifikat.data().count)

        if (counterSertifikat.data().count < 5 && keyword.value != ''){
            fullSnapshot = await getDocs(searchQuery)  
            currentPage = 1
            filterUsulan.value = []
            
            fullSnapshot.forEach((doc) => {
                filterUsulan.value.push(doc.data())
            })
        } else if(counterSertifikat.data().count > 5 && keyword.value == ''){
            readDatabase()
        }

    }
    
    async function counter(target){
        const queue = query(collection($databaseFirestore, "ciptaan2"), where('statusCiptaan', '==', target));
        const counter1 = await getCountFromServer(queue)
        switch (target) {
            case "Verifikasi":
                const queue2 = query(collection($databaseFirestore, "ciptaan2"), where('statusCiptaan', '==', 'Verifikasi*'));
                const counter2 = await getCountFromServer(queue2)
                jumlahVerifikasi.value = counter1.data().count + counter2.data().count
                break;
            case "Revisi":
                jumlahRevisi.value = counter1.data().count
                break;
            case "Ditolak":
                jumlahDitolak.value = counter1.data().count
                break;
            case "Cetak Formulir":
                jumlahCetak.value = counter1.data().count
                break;
            case "Submit ke DJKI":
                jumlahSubmit.value = counter1.data().count > 0 ? counter1.data().count : '0'
                break;
            case "Total":
                const queue3 = query(collection($databaseFirestore, "ciptaan2"));
                const counter3 = await getCountFromServer(queue3)
                // console.log(counter3)  
                totalUsulan.value = counter3.data().count
                break;
        }
    }

    async function prepareSearch(){ 
        // Prepare Search Firestore
        // fullSnapshot = await getDocs(q)
        // console.log('fullSnapshot size = ', fullSnapshot.size) 

        // Prepare Search Realtime Database
        searchSnapshot = queryRealTimeDB(databaseRef($database, 'ciptaan/'),
            orderByChild('statusCiptaan'),
            equalTo('Selesai'))

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
            totalPage.value = jumlahUsulan.value / pageLimit

        } else if (searchIdList.value.length > 60) {
            console.warn('Too many data, please give more detail keyword')
        }
    }

    async function nextPageBySearch(){
        if (currentPage >= totalPage.value ){
            return
        }
        else{
            currentPage++
            filterUsulan.value = []
            // Construct a new query starting at this document,
            let next
            next = query(collection($databaseFirestore, "ciptaan2"),
            where('id', 'in', searchIdList.value.slice((currentPage-1)*pageLimit, currentPage*pageLimit)),
                where('statusCiptaan', '==', "Selesai"), 
                limit(pageLimit));
            const nextSnapshot = await getDocs(next);

            nextSnapshot.forEach((doc) => {
                filterUsulan.value.push(doc.data())
                progressLoad.value = false
            });
        }
    }

    async function prevPageBySearch(){
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
                where('statusCiptaan', '==', "Selesai"), 
                limit(pageLimit));
            const prevSnapshot = await getDocs(prev);

            prevSnapshot.forEach((doc) => {
                filterUsulan.value.push(doc.data())
                progressLoad.value = false
            });
        }
    }

    onMounted(() => {
        readDatabase()
        // readRealtimeDatabase()        
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

    let dataExcel = ref(
        [
        {
            sheet: `Rekap Hak Cipta`,
            columns: [
            { label: "No. Aplikasi", value: "noAplikasi" },
            { label: "Tanggal Pengajuan DJKI", value: "tglPengajuan" },
            { label: "Pemegang Hak Cipta", value: "pemegang" },
            { label: "Judul", value: "judul" },
            { label: "No. Sertifikat", value: "noSertifikat" },
            { label: "Produk Hasil", value: "produkHasil" },
            { label: "Nilai Aset", value: "biaya" },
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
            where('statusCiptaan', '==', "Selesai"), 
            orderBy('tanggalBayar', 'desc'));

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
                    noAplikasi: doc.noAplikasi, 
                    tglPengajuan: formatDate.format(doc.tanggalBayar),
                    pemegang: 'Universitas Negeri Malang', 
                    judul: doc.judul, 
                    noSertifikat: doc.noSertifikat,
                    produkHasil: doc.sumberDana,
                    biaya: doc.biaya
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

    // async function readRealtimeDatabase(){
    //     const queryRef = ref()        
    //     queryRef.value = databaseRef($database, '/ciptaan') 
        
    //     get(queryRef.value).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             const data = snapshot.val()
    //             usulanFull = Object.values(data)
    //         } 
    //     });     

    // }
    // async function writeToFirestore(){
    //     console.log(usulanFull.length)
    //     // console.log(items)
    //     usulanFull.forEach(element => {
    //         // console.log(element.id) 
    //         try {
    //             const docRef = setDoc(doc($databaseFirestore, "ciptaan2", element.id), {
    //                 id: element.id,
    //                 judul: element.judul,
    //                 jenis: element.jenis,
    //                 subJenis: element.subJenis,
    //                 sumberDana: element.sumberDana,
    //                 kotaCiptaan: element.kotaCiptaan,
    //                 tanggal: element.tanggal,
    //                 deskripsi: element.deskripsi,
    //                 pencipta: element.pencipta,
    //                 lampiran: element.lampiran,
    //                 statusCiptaan: element.statusCiptaan,
    //                 pengusul: element.pengusul,
    //                 biaya: element.biaya,
    //                 catatan: element.catatan,
    //                 sertifikat: element.sertifikat,
    //                 noAplikasi: element.noAplikasi,
    //                 noBilling: element.noBilling,
    //                 tarifBilling: element.tarifBilling,
    //                 tanggalBayar: element.tanggalBayar,
    //                 noSertifikat: element.noSertifikat,
    //             });
    //             console.log("Document written ");
    //         } catch (e) {
    //             console.error("Error adding document: ", e);
    //         }
    //     });
    //     console.log("Finish");
    //     readDatabase()
    // }

</script>

<style scoped>

</style>
