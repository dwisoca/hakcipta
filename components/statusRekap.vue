<template>
    <!-- loading radial -->
    <!-- <svg class="animate-spin h-5 w-5 mr-3" fill="white" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: currentColor;"></path>
    </svg> -->
    <div class="stat ">
        <div class="stat-title">Usulan Masuk</div>
        <div class="stat-value text-xl font-bold" v-show="totalUsulan">{{ totalUsulan }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!totalUsulan">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Verifikasi</div>
        <div class="stat-value text-xl font-bold" v-show="jumlahVerifikasi">{{ jumlahVerifikasi }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlahVerifikasi">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Revisi</div>
        <div class="stat-value text-xl font-bold" v-show="jumlahRevisi">{{ jumlahRevisi }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlahRevisi">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Cetak Formulir</div>
        <div class="stat-value text-xl font-bold" v-show="jumlahCetak">{{ jumlahCetak }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlahCetak">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Submit DJKI</div>
        <div class="stat-value text-xl font-bold"  v-show="jumlahSubmit">{{ jumlahSubmit }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlahSubmit">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Ditolak</div>
        <div class="stat-value text-xl font-bold" v-show="jumlahDitolak">{{ jumlahDitolak }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlahDitolak">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Selesai</div>
        <div class="stat-value text-xl font-bold" v-show="jumlahSelesai">{{ jumlahSelesai }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlahSelesai">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <!-- <div class="stat">
        <div class="stat-title">Top Sub Jenis</div>
        <div class="stat-value text-xl font-bold" v-show="topSubJenisCiptaan">{{ topSubJenisCiptaan }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!topSubJenisCiptaan">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
    
    <div class="stat">
        <div class="stat-title">Top Fakultas</div>
        <div class="stat-value text-xl font-bold" v-show="topFakultasPencipta">{{ topFakultasPencipta }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!topFakultasPencipta">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div> -->
</template>

<script setup>

    const {totalUsulan, jumlahVerifikasi, jumlahRevisi, jumlahCetak, jumlahSubmit, jumlahDitolak, jumlahSelesai, topSubJenisCiptaan, topFakultasPencipta} = defineProps(['totalUsulan', 'jumlahVerifikasi', 'jumlahRevisi', 'jumlahCetak', 'jumlahSubmit', 'jumlahDitolak',  'jumlahSelesai', 'topSubJenisCiptaan', 'topFakultasPencipta'])
</script>

<style lang="scss" scoped>

</style>