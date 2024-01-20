<template>
    <div class="card max-h-full">
        <div class="card-body ">
            <div class="block sm:flex justify-between sm:justify-left  items-end sm:items-left ">  
                <div>
                    <!-- <label class="text-lg font-medium">Tanggal pertama diumumkan:</label> -->
                    <!-- <Datepicker 
                        id="selectTanggal" 
                        v-model="tanggal" 
                        @update:model-value="readDatabase()"
                        :enable-time-picker="false" 
                        locale="id-ID"
                        format="dd - MMMM - yyyy"
                        month-name-format="long"
                        position="left" 
                        auto-apply 
                        placeholder="Pilih tanggal" 
                        class="mb-4 sm:mb-0 w-fit"
                        ></Datepicker>  -->
                        <VueDatePicker 
                        uid="demo"
                        id="selectTanggal" 
                        v-model="tanggal" 
                        @update:model-value="readDatabase()"
                        :enable-time-picker="false" 
                        locale="id-ID"
                        format="dd - MMMM - yyyy"
                        month-name-format="long"
                        position="left" 
                        auto-apply 
                        placeholder="Pilih tanggal" 
                        class="mb-4 sm:mb-0 w-fit" />

                    <div class="mt-2">Rumah aset</div>
                    <div class="input-group mt-2">
                        <input 
                        type="search" 
                        placeholder="Ketik URL folder" 
                        id="inputURL"  
                        v-model="inputURL"
                        class="input input-bordered"
                        />
                        <input 
                        type="number" 
                        placeholder="start from" 
                        id="inputStart"  
                        v-model="inputStart"
                        class="input input-bordered w-40"
                        />
                        <div class="tooltip tooltip-warning ml-2 z-20" data-tip="Upload Rumah Aset">
                        <button class="btn btn-square bg-orange-400 no-animation" @click="uploadRumahAset()" :disabled="!inputURL || !tanggal">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                        </button>
                        </div>
                    </div>

                    <div class="mt-2">Get Sertifikat:</div>
                    <div class="input-group mt-2">
                        <input 
                        type="search" 
                        placeholder="URL Folder G-Drive" 
                        id="inputURLDrive"  
                        v-model="inputURLDrive"
                        class="input input-bordered"
                        />
                        <input 
                        type="number" 
                        placeholder="start from" 
                        id="inputStartDrive"  
                        v-model="inputStartDrive"
                        class="input input-bordered w-40"
                        />
                        <div class="tooltip tooltip-success ml-2 z-20" data-tip="Get Sertifikat (Bulk Mode)">
                        <button class="btn btn-square bg-green-700 no-animation" @click="getSertifikat()" :disabled="!inputURLDrive || !tanggal">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>  

                <div class="flex gap-2">
                    <div class="tooltip tooltip-success" data-tip="Download Excel">
                    <!-- <button class="btn btn-square btn-success text-white no-animation  gap-2" @click="deleteAll0">
                        Delete 0
                    </button> -->
                    <button class="btn btn-square btn-success text-white no-animation  gap-2" @click="downloadExel" >
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
                        v-model="keyword"
                        class="input input-bordered" 
                        @input="search()" />
                    </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-start space-x-4 items-center">
            </div>
            <!-- Table Here -->
            <div class="overflow-x-auto table-wrp block ">
                <progress v-show="progressLoad" class="progress w-full"></progress>
                <table class="table table-compact table-zebra w-full ">
                  <!-- head -->
                  <thead class="sticky top-0 z-20 ">
                    <tr>
                        <th >No.</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('tanggalBayar')">
                                Tanggal Bayar
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>
                        <th>Kode Billing</th>
                        <th>
                            <button class="btn btn-ghost btn-xs no-animation gap-2 font-bold" @click="sortTable('judul')">
                                Judul
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                        </th>
                        <th>Jenis Usulan</th>                        
                        <th>Sub-Jenis</th>                        
                        <th>Biaya</th>
                        <th>Bot</th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto">
                    <!-- Tampilan tabel dengan data -->
                    <tr v-for="(items, key) in filterUsulan">
                        <th class="">{{ key+1 + ((currentPage-1) * pageLimit) }}</th>
                        <td class="">{{ items.tanggalBayar ? formatDate.format(items.tanggalBayar) : '-'}}</td>
                        <td class="">{{ items.noBilling }}</td>
                        <td class="font-medium min-w-[12rem] max-w-[20rem] whitespace-normal">
                            {{items.judul}} <br/> <a :href="'/tambah/'+items.id" class="text-blue-700 text-xs underline" target="_blank">{{ items.id }}</a>
                        </td>
                        <td class="">{{ items.jenis || '-' }}</td>
                        <td class="">{{ items.subJenis || '-' }}</td>
                        <td class="">{{ items.tarifBilling ? items.tarifBilling.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits:0}) : 0 }}</td>
                        <td class="">
                            <div class="tooltip tooltip-warning z-20" data-tip="Upload Rincian Aset">
                            <button class="btn btn-square btn-sm bg-orange-400 no-animation" @click="uploadRincianAset(items.id)" :disabled="!tanggal">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                </svg>
                            </button>
                            </div>
                            <div class="tooltip tooltip-success ml-2 z-20" data-tip="Get Sertifikat (Single Mode)">
                            <button class="btn btn-square btn-sm bg-green-700 no-animation" @click="getSertifikatSingle(items.id)" :disabled="!inputURLDrive || items.statusCiptaan == 'Selesai'">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </button>
                            </div>
                            <div class="tooltip tooltip-success ml-2 z-20" data-tip="Lihat Sertifikat'" v-show="items.sertifikat">
                                <NuxtLink :to="items.sertifikat" target="blank">
                                    <button class="btn btn-square btn-sm bg-green-700 no-animation" :disabled="!items.sertifikat">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                    </button>
                                </NuxtLink>
                            </div>
                            <SendSertifikat :data="items" origin="billing" />
                            <div class="tooltip tooltip-error ml-2 z-20" data-tip="Reset Sertifikat'" v-show="items.sertifikat">
                                <button class="btn btn-square btn-sm bg-error no-animation" :disabled="!items.sertifikat" @click="resetSertif(items.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <!-- Tampilan tabel tanpa data -->
                    <tr v-if="!progressLoad && filterUsulan.length == 0">
                        <td colspan="6" class="text-center" v-if="tanggal">
                            Tidak ada data pada tanggal: {{ tanggal.toDateString().toLocaleString() }}<br/>
                        </td>
                    </tr>
                  </tbody>
                  <!-- foot -->
                  <tfoot class="sticky bottom-0 z-30">
                    <tr>
                        <th></th>
                        <th></th>
                        <th>
                            <button class="btn btn-sm btn-outline" @click="copyToClipboard()">Copy billing</button>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th class="">Total Usulan: {{ jumlahSelesai }}<br/>
                            <label v-show="tanggal">
                                Total Bayar: {{ jumlahBayar.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits:0}) }} <br/>
                            </label>
                        </th>
                        <th><div class="badge badge-warning">Data Realtime</div></th>
                    </tr>
                  </tfoot>
                  
                </table>
            </div>

            <!-- Button Here -->
            <div class="flex justify-center space-x-4 ">
                <div class="card-actions items-center text-center">
                    <label class="label">Show:
                    </label>
                    <select class="select select-primary" v-model="pageLimit"  @change="currentPage=1; keyword=''; readDatabase()">
                        <option disabled selected>Jumlah item:</option> 
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center space-x-4">
                <div class="card-actions">
                    <div class="btn-group">
                        <button class="btn" @click="prevPage()" :disabled="currentPage == 1">«</button>
                        <button class="btn cursor-default no-animation">Halaman {{ currentPage }}</button>
                        <button class="btn" @click="nextPage()" :disabled="currentPage >= totalPage">»</button>
                    </div>
                </div>
            </div>
        </div> 
        
        <!-- Modal Detail Pencipta -->
        <ModalDetailPencipta :list-pencipta="pencipta"/>
    </div>
</template>

<script setup>
    // import { ref as databaseRef, get, query, orderByChild, equalTo } from 'firebase/database'
    import { getDocs, onSnapshot, collection, query, where, getCountFromServer, limit, startAfter, limitToLast, endBefore, orderBy } from "firebase/firestore"; 
    import { doc, updateDoc, deleteField } from "firebase/firestore";
    import xlsx from "json-as-xlsx"
    // import Datepicker from '@vuepic/vue-datepicker';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    const tanggal = ref()
    // tanggal.value = new Date()
    const formatDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
    })

    let dataExcel = ref(
        [
        {
            sheet: `Rekap Hak Cipta`,
            columns: [
            { label: "No.", value: "no" },
            { label: "Tanggal Bayar", value: "tglBayar" },
            { label: "Kode Billing", value: "noBilling" },
            { label: "Judul", value: "judul" },
            { label: "Jenis Usulan", value: "jenis" },
            { label: "Sub-Jenis", value: "subJenis" },
            { label: "Biaya", value: "tarifBilling", format: "Rp #,##0" },
            ],
            content: [
            
            ],
        },
        ] 
    )
    
    let settings = {
        fileName: `Billing Harian Hak Cipta UM - ${formatDate.format(new Date())}`, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    }
    function downloadExel(){
        // Download excell
        xlsx(dataExcel.value, settings)
    }

    const progressLoad = ref(true)
    const pencipta = ref([])
    
    const { $databaseFirestore } = useNuxtApp()
    const jumlahSelesai = ref(0)
    const filterUsulan = ref([])
    const fullUsulan = ref([])
    let pageLimit = 5
    let lastVisible
    let firstVisible
    let currentPage
    let totalPage
    let fullSnapshot
    const keyword = ref()
    let q
    let qLimit
    const sortStatus = ref("tanggalBayar")
    const sortDirection = ref("asc")
    const filterStatus = ref()
    const slideSearch = ref(0)
    let date
    const startOfDay = ref()
    const endOfDay = ref()

    async function deleteAll0(){
        const q0 = query(collection($databaseFirestore, 'ciptaan2'), where('tanggalBayar', '==', '0'));

        const q0Count = await getCountFromServer(q0)
        console.log(q0Count.data().count)

        // getDocs(q0).then((querySnapshot) => {
        //     querySnapshot.forEach((document) => {
        //         updateDoc(doc($databaseFirestore, 'ciptaan2', document.id), {
        //         'tanggalBayar': deleteField() 
        //         });
        //         // console.log(document)
        //     });
        // });
    }
    
    let querySnapshot
    let prevSnapshot
    let nextSnapshot
    async function readDatabase(){
        filterUsulan.value = []
        dataExcel.value[0].content = []


        // !isAdmin && prepareSearch()

        q = query(collection($databaseFirestore, "ciptaan2"), where('tanggalBayar', '!=', ""));

        // console.log(sortStatus.value, sortDirection.value)
        
        // READ WITH LIMIT
        if (tanggal.value){
            date = new Date(tanggal.value);
            startOfDay.value = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            endOfDay.value = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            endOfDay.value.setMilliseconds(endOfDay.value.getMilliseconds() - 1);
            
            qLimit = query(collection($databaseFirestore, "ciptaan2"),
            where('tanggalBayar', '>=', startOfDay.value.getTime()),
            where('tanggalBayar', '<=', endOfDay.value.getTime()),
            orderBy(sortStatus.value, sortDirection.value), 
            limit(pageLimit));
        } else {
            qLimit = query(collection($databaseFirestore, "ciptaan2"), 
            where('tanggalBayar', '!=', ""), limit(pageLimit),
            orderBy(sortStatus.value, sortDirection.value),  );
        } 

        // FireStore Realtime
        querySnapshot = onSnapshot(qLimit, (snapshot) => {
            dataExcel.value[0].content = []
            filterUsulan.value = []
            // Get the last visible document
            lastVisible = snapshot.docs[snapshot.docs.length-1]
            let counter = 1;
            if(snapshot.docs.length>0){
                snapshot.forEach((doc) => {
                    filterUsulan.value.push(doc.data())
                    progressLoad.value = false
                    dataExcel.value[0].content.push(
                        { 
                            no: counter++, 
                            noAplikasi: doc.data().noAplikasi, 
                            tglBayar: formatDate.format(doc.data().tanggalBayar),
                            noBilling: doc.data().noBilling, 
                            judul: doc.data().judul, 
                            jenis: doc.data().jenis,
                            subJenis: doc.data().subJenis,
                            tarifBilling: doc.data().tarifBilling
                        },
                    )
                });
            } else{
                console.log("No data available")
                progressLoad.value = false
            }

        });

        // FireStore Non-Realtime
        // const querySnapshot = await getDocs(qLimit);
        // // Get the last visible document
        // lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
        // let counter = 1;
        // if(querySnapshot.docs.length>0){
        //     querySnapshot.forEach((doc) => {
        //         filterUsulan.value.push(doc.data())
        //         progressLoad.value = false
        //         dataExcel.value[0].content.push(
        //             { 
        //                 no: counter++, 
        //                 noAplikasi: doc.data().noAplikasi, 
        //                 tglBayar: formatDate.format(doc.data().tanggalBayar),
        //                 noBilling: doc.data().noBilling, 
        //                 judul: doc.data().judul, 
        //                 jenis: doc.data().jenis,
        //                 subJenis: doc.data().subJenis,
        //                 tarifBilling: doc.data().tarifBilling
        //             },
        //         )
        //     });
        // } else{
        //     console.log("No data available")
        //     progressLoad.value = false
        // }

        // Get Page
        currentPage = 1
        let counterBilling
        if (tanggal.value){
            const qLimit2 = query(collection($databaseFirestore, "ciptaan2"),
            where('tanggalBayar', '>=', startOfDay.value.getTime()),
            where('tanggalBayar', '<=', endOfDay.value.getTime()));
            counterBilling = await getCountFromServer(qLimit2);
        } else {
            counterBilling = await getCountFromServer(q);
        }
        
        jumlahSelesai.value = counterBilling.data().count
        totalPage = jumlahSelesai.value / pageLimit
    }
    
    async function sortTable(kolom){
        sortStatus.value = kolom
        sortDirection.value = (sortDirection.value === 'asc') ? 'desc' : 'asc';
        readDatabase()
    }

    async function nextPage(){
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
                    if (tanggal.value){
                        next = query(collection($databaseFirestore, "ciptaan2"),
                        where('tanggalBayar', '>=', startOfDay.value.getTime()),
                        where('tanggalBayar', '<=', endOfDay.value.getTime()),
                        startAfter(lastVisible),
                        limit(pageLimit));
                    } else {
                        next = query(collection($databaseFirestore, "ciptaan2"), 
                        where('tanggalBayar', '!=', ""), 
                        startAfter(lastVisible),
                        limit(pageLimit));
                    }   
                
                // const nextSnapshot = await getDocs(next);    
                // nextSnapshot.forEach((doc) => {
                //     filterUsulan.value.push(doc.data())
                //     progressLoad.value = false
                // });

                // Get the last visible document
                // lastVisible = nextSnapshot.docs[nextSnapshot.docs.length-1];
                // firstVisible = nextSnapshot.docs[0]

                // FireStore Realtime
                querySnapshot ? querySnapshot() : '' //unsubscribe first
                prevSnapshot ? prevSnapshot() : ''
                nextSnapshot ? nextSnapshot() : ''
                // Get realtimedata
                nextSnapshot = onSnapshot(next, (snapshot) => {
                    dataExcel.value[0].content = []
                    filterUsulan.value = []
                    // Get the last visible document
                    lastVisible = snapshot.docs[snapshot.docs.length-1]
                    firstVisible = snapshot.docs[0]
                    let counter = 1;
                    if(snapshot.docs.length>0){
                        snapshot.forEach((doc) => {
                            filterUsulan.value.push(doc.data())
                            progressLoad.value = false
                            dataExcel.value[0].content.push(
                                { 
                                    no: counter++, 
                                    noAplikasi: doc.data().noAplikasi, 
                                    tglBayar: formatDate.format(doc.data().tanggalBayar),
                                    noBilling: doc.data().noBilling, 
                                    judul: doc.data().judul, 
                                    jenis: doc.data().jenis,
                                    subJenis: doc.data().subJenis,
                                    tarifBilling: doc.data().tarifBilling
                                },
                            )
                        });
                    } else{
                        console.log("No data available")
                        progressLoad.value = false
                    }

                });
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
                let prev 
                    if (tanggal.value){
                        prev = query(collection($databaseFirestore, "ciptaan2"),
                        where('tanggalBayar', '>=', startOfDay.value.getTime()),
                        where('tanggalBayar', '<=', endOfDay.value.getTime()),
                        orderBy('tanggalBayar'), 
                        endBefore(firstVisible),
                        limitToLast(pageLimit));
                    } else {
                        prev = query(collection($databaseFirestore, "ciptaan2"), 
                        where('tanggalBayar', '!=', ""), 
                        orderBy('tanggalBayar'), 
                        endBefore(firstVisible),
                        limitToLast(pageLimit));
                    } 
                // const prevSnapshot = await getDocs(prev);
                // prevSnapshot.forEach((doc) => {
                //     filterUsulan.value.push(doc.data())
                //     progressLoad.value = false
                // });
    
                // // Get the last visible document
                // lastVisible = prevSnapshot.docs[prevSnapshot.docs.length-1];
                // firstVisible = prevSnapshot.docs[0];

                // FireStore Realtime
                querySnapshot ? querySnapshot() : '' //unsubscribe first
                prevSnapshot ? prevSnapshot() : ''
                nextSnapshot ? nextSnapshot() : ''
                prevSnapshot = onSnapshot(prev, (snapshot) => {
                    dataExcel.value[0].content = []
                    filterUsulan.value = []
                    // Get the last visible document
                    lastVisible = snapshot.docs[snapshot.docs.length-1]
                    firstVisible = snapshot.docs[0]
                    let counter = 1;
                    if(snapshot.docs.length>0){
                        snapshot.forEach((doc) => {
                            filterUsulan.value.push(doc.data())
                            progressLoad.value = false
                            dataExcel.value[0].content.push(
                                { 
                                    no: counter++, 
                                    noAplikasi: doc.data().noAplikasi, 
                                    tglBayar: formatDate.format(doc.data().tanggalBayar),
                                    noBilling: doc.data().noBilling, 
                                    judul: doc.data().judul, 
                                    jenis: doc.data().jenis,
                                    subJenis: doc.data().subJenis,
                                    tarifBilling: doc.data().tarifBilling
                                },
                            )
                        });
                    } else{
                        console.log("No data available")
                        progressLoad.value = false
                    }

                });
            }
        }
    }

    function paginateArray() {
        filterUsulan.value = fullUsulan.value.slice((currentPage-1) * pageLimit, (currentPage) * pageLimit)
    }

    async function prepareSearch(){ 
        fullSnapshot = await getDocs(q)
        // console.log('fullSnapshot size = ', fullSnapshot.size) 
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
        jumlahSelesai.value = itemsFounded
    }

    const inputURL = ref() 
    const inputStart = ref() 
    const inputURLDrive = ref() 
    const inputStartDrive = ref() 
    async function uploadRumahAset(){
        console.log(startOfDay.value.getTime())
        console.log(endOfDay.value.getTime())
        console.log(inputURL.value)
        if (!inputStart.value){
            inputStart.value = 1
        }

        window.open(`http://localhost:4444?type=rumahaset&folderPath=${inputURL.value}&startOfDay=${startOfDay.value.getTime()}&endOfDay=${endOfDay.value.getTime()}&limitCiptaan=${inputStart.value}`);
    }
    async function uploadRincianAset(id){
        window.open(`http://localhost:4444?type=rincianaset&idCiptaan=${id}`);
    }
    async function getSertifikat(){
        console.log(startOfDay.value.getTime())
        console.log(endOfDay.value.getTime())
        console.log(inputURL.value)
        if (!inputStartDrive.value){
            inputStartDrive.value = 1
        }
        // http://localhost:5000/getsertifikat/?id=1678931768044-6E4&folderID=https://drive.google.com/drive/folders/1-f5qTMAboiN4nGNhWYJFTHQ71YsfzRxJ
        window.open(`http://localhost:5000/getsertifikat?folderID=${inputURLDrive.value}&startOfDay=${startOfDay.value.getTime()}&endOfDay=${endOfDay.value.getTime()}&limitCiptaan=${inputStartDrive.value}`);
    }
    async function getSertifikatSingle(id){
        // http://localhost:5000/getsertifikat/?id=1678931768044-6E4&folderID=https://drive.google.com/drive/folders/1-f5qTMAboiN4nGNhWYJFTHQ71YsfzRxJ
        window.open(`http://localhost:5000/getsertifikat?folderID=${inputURLDrive.value}&id=${id}`);
    }
    
    async function resetSertif(id){
        await updateDoc(doc($databaseFirestore, "ciptaan2", id), {
            sertifikat: null,
            noAplikasi: null,
            noSertifikat: null,
            statusCiptaan: 'Submit ke DJKI'
        }).then(console.log('reset done'));
    }
    onMounted(() => {
        readDatabase() 
        prepareSearch()       
    })
    
    function copyToClipboard(){
        // console.log(listBilling.value)
        navigator.clipboard.writeText(listBilling.value.join('\n'));
    }
    const listBilling = computed(()=>{
        let listNoBilling = []
        Object.values(filterUsulan.value).forEach(element => {
            listNoBilling.push(element.noBilling)
        });
        return listNoBilling
        // return Object.values(filterUsulan.value)
    })
    const jumlahBayar = computed(()=>{
        let total = 0
        filterUsulan.value.forEach(element => {
            total = total + element.tarifBilling || 0
        });
        return total
    })

</script>

<style scoped>

</style>
