<template>
    <div class="stat">
        <div class="stat-title">{{ statusLabel }}</div>
        <div class="stat-value text-xl font-bold" v-show="jumlah">{{ jumlah }}</div>
        <div class="animate-pulse flex space-x-4" v-show="!jumlah">
            <div class="rounded bg-slate-500 h-2 w-10"></div>
        </div>
        <div class="stat-desc"></div>
    </div>
</template>

<script setup>

    const {statusLabel, jumlah} = defineProps(['statusLabel', 'jumlah'])

</script>