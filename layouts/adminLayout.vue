<template>
    <Navbar/>
    <div class="mt-14 sm:mt-8">
        <slot />
    </div>
    <Footer/>

</template>

<script setup>
    import { useMainStore } from '~/store/index'

    const store = useMainStore()
    onBeforeMount(() => {
        // store.init('login')
        // if (store.user == null){
        //     navigateTo('/login')
        // }
    })
    
</script>

<style lang="scss" scoped>

</style>