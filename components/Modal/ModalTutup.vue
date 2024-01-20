<template>
    <div>
        <!-- The button to open modal -->

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal" class="modal-toggle" />
        <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Pending Status</h3>
            <p class="py-4">Pilih status yang akan diubah menjadi pending</p>
            <label class="label cursor-pointer">
                <span class="label-text">Verifikasi</span> 
                <input type="checkbox" checked="checked" class="checkbox" v-model="cekVerifikasi" />
            </label>
            <label class="label cursor-pointer">
                <span class="label-text">Revisi</span> 
                <input type="checkbox" checked="checked" class="checkbox" v-model="cekRevisi" />
            </label>
            <label class="label cursor-pointer">
                <span class="label-text">Cetak Formulir</span> 
                <input type="checkbox" checked="checked" class="checkbox" v-model="cekCetak" />
            </label>
            <div class="modal-action">
            <label for="my-modal" class="btn btn-outline" >Nope</label>
            <label for="my-modal" class="btn" @click="tutupBuku()">Yay!</label>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { collection, doc, setDoc, updateDoc, getDocs, query, where, limit } from "firebase/firestore"; 

const { $databaseFirestore } = useNuxtApp()

const cekRevisi = ref(false)
const cekCetak = ref(false)
const cekVerifikasi = ref(false)

async function tutupBuku(){
    let listStatus = []
    cekRevisi.value ? listStatus.push('Revisi') : ''
    cekCetak.value ? listStatus.push('Cetak Formulir') : ''
    cekVerifikasi.value ? listStatus.push('Verifikasi*') : ''
    console.log(listStatus)

    const qLimit = query(collection($databaseFirestore, "ciptaan2"),
        where('statusCiptaan', 'in', listStatus),
        // limit(10)
        );
    const querySnapshot = await getDocs(qLimit);
    querySnapshot.forEach(async (doc) => {
        console.log(doc.data())
        await updateStatusOnly(doc.data().id, 'Pending')
    });
}

async function updateStatusOnly(id, status){
    await updateDoc(doc($databaseFirestore, "ciptaan2", id), {
        statusCiptaan2: status,
    });
    console.log('status diubah')
}
</script>