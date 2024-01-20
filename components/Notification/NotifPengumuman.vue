<template>
    <div>
        <!-- Modal Alert -->
        <input type="checkbox" id="alertModal" class="modal-toggle" />
        <label class="modal ">
        <label class="modal-box w-11/12 max-w-3xl h-fit" >
            <label @click="store.switchAlert(false)" for="alertModal" class="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
            <h3 class="font-bold text-lg">{{ teksJudul }}</h3>
            <div class="pt-4 whitespace-pre-line break-normal">{{ teksDeskripsi }}</div>
            <a class="text-primary" v-show="teksLink" :href="teksLink" target="blank">{{ teksLink }}</a>
            <p class="pt-4" v-show="teksLink">Terima kasih</p>
        </label>
        </label>
    </div>
</template>

<script setup>
import { useMainStore } from '~/store/index'

const store = useMainStore()
const {teksJudul, teksDeskripsi, teksLink} = defineProps(['teksJudul', 'teksDeskripsi', 'teksLink'])

</script>

<style lang="scss" scoped>

</style>