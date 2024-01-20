import { useMainStore } from '~/store/index'


export default defineNuxtRouteMiddleware((to, from) => {

    
    const store = useMainStore()
    const config = useRuntimeConfig()
    const adminList = config.ADMIN_LIST_SERVER

    const maintenance = config.MAINTENANCE_SERVER
    const statusAdmin = process.server && adminList.includes(store.user.uid)

    if(maintenance == 'true' && !statusAdmin){
        return navigateTo('/maintenance')
    }

    if (store.user.email == ''){
        return navigateTo('/login')
    } else {
        // TESTME: cara baru cek admin
        process.server && cekAdminDisini()
    }

    function cekAdminDisini(){
    //    console.log(to.path.toString().includes('admin'))
       if (!statusAdmin && (to.path.toString().includes('admin') || to.path.toString().includes('rekapbilling'))){
        console.warn(`${store.user.email} try access admin`)
           return navigateTo('/')
       } else {
        store.user.isAdmin = statusAdmin
       }
    }

})