<template>
    <div>
        <!-- Modal Detail Pencipta -->
        <input type="checkbox" id="my-modal-4" class="modal-toggle" />
        <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative max-h-64 overflow-y-auto overflow-x-hidden" for="" >
            <h3 class="text-lg font-bold">Detail pencipta:</h3>
            <ol class="list-decimal bg-base-100 w-full max-h-64  mx-2">
                <li v-for="item in listPencipta" class="text-left">
                    <label class="font-bold">{{ item.nama }}</label> <br>
                    <label>{{ item.prodi }}</label>
                    <div class="divider -my-1"></div>
                </li>
            </ol>
        </label>
        </label>
    </div>
</template>

<script setup>

const {listPencipta} = defineProps(['listPencipta'])

</script>

<style lang="scss" scoped>

</style>