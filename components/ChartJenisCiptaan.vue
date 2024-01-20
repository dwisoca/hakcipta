<template>
  <div class="flex flex-row gap-4 justify-items-center">
    <div class=" col-start-2 basis-1/3 ">
      <Doughnut
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        class=""
      />
      </div>
      <div class="col-start-1 w-full">
        <p class="text-xl tracking-tight text-gray-900 mb-5 ml-5 font-bold">Rekapitulasi Jenis Ciptaan Tahun 2023</p>
        
        <div class="grid grid-cols-2 grid-rows-1 ">
            <div>
              <StatusJenis :jumlah="totalPenelitian" :status-label="`Penelitian`" class="-my-2"/>
              <StatusJenis :jumlah="totalPengabdian" :status-label="`Pengabdian`" class="-my-2"/>
              <StatusJenis :jumlah="totalInobel" :status-label="`Inobel`" class="-my-2"/>
              <StatusJenis :jumlah="totalPKM" :status-label="`PKM`" class="-my-2"/>
            </div>
            <div>
              <StatusJenis :jumlah="totalKKN" :status-label="`KKN`" class="-my-2"/>
              <StatusJenis :jumlah="totalTugas" :status-label="`Tugas`" class="-my-2"/>
              <StatusJenis :jumlah="totalLainnya" :status-label="`Lainnya`" class="-my-2"/>
            </div>
        </div>
    
      </div> 

  </div>
</template>

<script setup>
// const { ciptaan2023 } = defineProps(['ciptaan2023'])
import { collection, query, where, getCountFromServer} from "firebase/firestore"; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const { $databaseFirestore } = useNuxtApp()

const ciptaan2023 = ref(0)
const totalPenelitian = ref(0)
const totalPengabdian = ref(0)
const totalInobel = ref(0)
const totalPKM = ref(0)
const totalKKN = ref(0)
const totalTugas = ref(0)
const totalLainnya = ref(0)


async function readDatabase(){
  const q = query(collection($databaseFirestore, "ciptaan2"), where('sertifikat', '!=', ""));
  const counterSertifikat = await getCountFromServer(q);
  ciptaan2023.value = counterSertifikat.data().count

  totalPenelitian.value = await counter("Penelitian")
  totalPengabdian.value = await counter("Pengabdian")
  totalInobel.value = await counter("Inobel")
  totalPKM.value = await counter("PKM")
  totalKKN.value = await counter("KKN")
  totalTugas.value = await counter("Tugas")
  totalLainnya.value = await counter("Lainnya")
}


const chartData = computed(()=>{
    const data = { 
        labels: ['Penelitian', 'Pengabdian', 'Inobel', 'PKM', 'KKN', 'Tugas', 'Lainnya'],
        datasets: [
          {
            backgroundColor: ['#323ede', '#29ADB2', '#325ade', '#6a9bf0', '#e9d83f', '#C5E898', '#ffd662ff'],
            data: [
              totalPenelitian.value,
              totalPengabdian.value, 
              totalInobel.value, 
              totalPKM.value,
              totalKKN.value,
              totalTugas.value,
              totalLainnya.value
            ],
            weight: 200
          }
        ]
    }
    
    return data
})

const chartOptions = {
  responsive: false,
  plugins: {
      legend: {
        "display": false,
        "fullWidth": true,
        "position": "bottom"
      }
   }
}

async function counter(target){
        const queue = query(collection($databaseFirestore, "ciptaan2"), where('statusCiptaan', '==', 'Selesai'), where('sumberDana', '==', target));
        const counter1 = await getCountFromServer(queue)
        return counter1.data().count
    }

onMounted(()=>{
  readDatabase()
})

</script>