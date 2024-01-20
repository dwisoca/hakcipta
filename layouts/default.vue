<template >
    <Navbar/>
    <div class="mt-14 sm:mt-8">
        <slot class="z-0"/>
    </div>
    <Footer class="z-50"/>
</template>

<script setup>
    import { useMainStore } from '~/store/index'

    const store = useMainStore()
    onBeforeMount(() => {
        // store.init('login')
    })
    
</script>

<style lang="scss" scoped>

</style>