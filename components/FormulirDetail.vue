<template>
    <div>
        Judul: 
        {{ ciptaan[0].text }}
    </div>
</template>

<script setup>
    const { ciptaan } = defineProps(['ciptaan'])
</script>

<style>

</style>