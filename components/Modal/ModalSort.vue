<template>
    <div>
        <input type="checkbox" id="sortModal" class="modal-toggle" v-model="sortModal"/>
        <div class="modal ">
            <div class="modal-box ">
                <h3 class="font-bold text-lg mb-5">Ubah susunan pencipta</h3>

                <draggable class="dragArea list-group w-full" :list="props.data">
                <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="element in props.data"
                    :key="element.id"
                >
                    {{ element.nama }}
                </div>
                </draggable>
            
                <div class="modal-action">
                    <label 
                        for="sortModal" 
                        class="btn btn-ghost"
                        @click="selesai()"
                        >Selesai</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref as databaseRef, get, query, orderByChild, equalTo } from 'firebase/database'
    import { useMainStore } from '~/store/index'
    import * as array from 'alga-js/array'
    import { VueDraggableNext as draggable } from "vue-draggable-next";

    const list= [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ]

    const sortModal = ref(false)
    const drag = ref(false)
    const dragOptions = computed(()=>{
        return{
            animation: 200,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
        }
    })

    const props = defineProps(['data'])
    // const emits = defineEmits(['sortedPencipta'])

    const { $database } = useNuxtApp()
    const store = useMainStore()

    const daftarUsulan = ref()
    async function readDatabase(){
        // await store.init('')
        const queryRef = query(databaseRef($database, '/ciptaan'), orderByChild('pengusul'), equalTo(store.user.email))
        
        get(queryRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                store.daftarUsulan = Object.values(data)
                daftarUsulan.value = store.daftarUsulan
            } else {
                // console.log('Belum ada data')
            }
        });     

    }
    function selesai(){
      props.data.forEach((element, index) => {
        // console.log(element.id)
        element.id = index+1
      });
    }

    onMounted(()=>{
        // console.log(data)
        // readDatabase()
    })

</script>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>