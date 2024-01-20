<template>
    <div>
        <input type="checkbox" id="copyModal" class="modal-toggle" v-model="copyModal"/>
        <div class="modal ">
            <div class="modal-box ">
                <h3 class="font-bold text-lg mb-5">Copy pencipta</h3>
                <!-- <p class="py-4">Pilih dari ciptaan:</p> -->
                <div class="input-group mb-2">
                    <button @click="cari" class="btn btn-square btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <input 
                    type="search" 
                    autocomplete="off"
                    placeholder="Ketik judul" 
                    id="inputJudul"  
                    v-model="keyword"
                    class="input input-bordered input-sm" 
                    @input="search()" />
                </div>
                <button class="btn btn-sm btn-square mb-5" @click="readDatabase()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>

                <div class="overflow-auto max-h-[12rem]">
                    <table class="table table-compact w-full">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Judul</th> 
                            <th>Pencipta 1</th> 
                            <th>Jml Pencipta</th>
                        </tr>
                        </thead> 
                        <tbody>
                            <tr v-for="items in filterUsulan">
                                <th>
                                    <button 
                                    class="btn btn-xs"
                                    @click="copyPencipta(items)"
                                    for="copyModal"> Copy</button>
                                </th>
                                <td class="min-w-[8rem] max-w-[20rem] whitespace-normal">{{ items.judul }}</td>
                                <td class="min-w-[8rem] max-w-[20rem] whitespace-normal">{{ items.pencipta[0].nama }}</td>
                                <td>{{ items.pencipta.length }}</td>
                                
                            </tr>
                        </tbody> 
                        <tfoot>
                        <tr>
                            <th></th> 
                            <th></th> 
                            <th></th>
                            <th></th>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            
                <div class="modal-action">
                    <label 
                        for="copyModal" 
                        class="btn btn-ghost" 
                        >Batal</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { getDocs, collection, query, where } from "firebase/firestore"; 
    // import { ref as databaseRef, get, query, orderByChild, equalTo } from 'firebase/database'
    import { useMainStore } from '~/store/index'
    import * as array from 'alga-js/array'

    const copyModal = ref(false)

    const props = defineProps(['data'])
    const emits = defineEmits(['itemsPencipta'])

    const { $databaseFirestore } = useNuxtApp()
    const { $database } = useNuxtApp()
    const store = useMainStore()

    let daftarUsulanStatic =[]
    const daftarUsulan = ref()
    const searchJudul = ref({judul: ''})
    const filterUsulan = ref([])
    let q
    let querySnapshot
    const keyword = ref()

    // async function readDatabase(){
    //     const queryRef = ref()
    //     queryRef.value = databaseRef($database, '/ciptaan')
        
    //     get(queryRef.value).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             const data = snapshot.val()
    //             if (store.user.isAdmin){
    //                 store.daftarUsulan = Object.values(data)
    //                 daftarUsulan.value = Object.values(data)
    //                 daftarUsulanStatic = Object.values(data)
    //             } else {
    //                 Object.values(data).forEach(element => {
    //                     const pengusul1 = element.pengusul[0]
    //                     if(pengusul1 == store.user.email){
    //                         daftarUsulanStatic.push(element)
    //                     }
    //                 });
    //                 daftarUsulan.value = daftarUsulanStatic
    //             }
    //         } else {
    //             // progressLoad.value = false
    //             // console.log('Belum ada data')
    //         }
    //     });     

    // }
    // function prepareData(){
    //     if(store.daftarUsulan.length<1){
    //         // console.log('get new data from fbase')
    //         readDatabase()
    //     } else {
    //         // console.log('get stored data')
    //         if (store.user.isAdmin){
    //             daftarUsulanStatic = store.daftarUsulan
    //             daftarUsulan.value = daftarUsulanStatic
    //         } else {
    //             daftarUsulanStatic = []
    //             store.daftarUsulan.forEach(element => {
    //                 const pengusul1 = element.pengusul[0]
    //                 if(pengusul1 == store.user.email){
    //                     daftarUsulanStatic.push(element)
    //                 }
    //             })
    //             daftarUsulan.value = daftarUsulanStatic
    //         }
    //     }
    // }
    // function cari(){
    //     daftarUsulan.value = daftarUsulanStatic
    //     daftarUsulan.value = array.filter(daftarUsulan.value, searchJudul.value)
    // } 
    async function readDatabase(){
        filterUsulan.value = []

        if (isAdmin){
            q = query(collection($databaseFirestore, "ciptaan2"),
            );
        } else {
            q = query(collection($databaseFirestore, "ciptaan2"), 
                where('pengusul', 'array-contains', store.user.email)
                );
        }
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            filterUsulan.value.push(doc.data())
        });
    }
    async function search(){
        filterUsulan.value = []
        querySnapshot.forEach((doc) => {
            if(doc.data().judul.toLowerCase().includes(keyword.value.toLowerCase())){
                filterUsulan.value.push(doc.data())
            }
        })
    }

    function copyPencipta(items){
        // console.log(items)
        if (items.id != props.data){
            emits('itemsPencipta', items.pencipta)
        }
        copyModal.value = false
    }

    let isAdmin = store.user.isAdmin

    
    onMounted(()=>{
        // console.log(data)
        // readDatabase()
        // daftarUsulan.value = store.daftarUsulan
        // prepareData()
    })

</script>

<style lang="scss" scoped>

</style>