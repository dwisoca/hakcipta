import { useMainStore } from '~/store/index'


export default defineNuxtRouteMiddleware((to, from) => {

    
    const store = useMainStore()

    // store.init()
    // console.log(store.user.email)
    if (store.user.email==''){
        return navigateTo('/login')
    } else {
        // return navigateTo('/dashboard')
    }
})