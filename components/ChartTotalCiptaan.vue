<template>
  <div class="w-auto">
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />

  </div>
</template>

<script setup>
// const { ciptaan2023 } = defineProps(['ciptaan2023'])
import { collection, query, where, getCountFromServer} from "firebase/firestore"; 
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const { $databaseFirestore } = useNuxtApp()

const ciptaan2023 = ref(0)
async function readDatabase(){
  const q = query(collection($databaseFirestore, "ciptaan2"), where('sertifikat', '!=', ""));
  const counterSertifikat = await getCountFromServer(q);
  ciptaan2023.value = counterSertifikat.data().count
}


const chartData = computed(()=>{
    const data = { 
        labels: [ '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023' ],
        datasets: [ 
            { 
                data: [4, 52, 153, 670, 1101, 1301, 1797, ciptaan2023.value],
                label: 'Hak Cipta Granted',
                borderColor: '#6a9bf0',
                tension: 0.5,
                fill: 'start',
                pointRadius: 7
            } 
        ]
    }
    
    return data
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Jumlah Ciptaan",
      position: "bottom",
      fullWidth: true,
      fontColor: "#000000",
      fontSize: 16
    },
  }
}

onMounted(()=>{
  readDatabase()
})

</script>