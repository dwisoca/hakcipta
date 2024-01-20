import { defineStore } from 'pinia'
import { ref as databaseRef, query, get, orderByChild, equalTo } from 'firebase/database'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { isAdmin } from '@firebase/util'

export const useMainStore = defineStore('main', {
  id: 'main-store',
  state: () => {
    return{
      user: {
        email: '',
        photoURL: '',
        displayName: '',
        uid: '',
        isAdmin: false
      },
      currentPage : 1,
      limitPerPage: 5,
      daftarUsulan: [],
      jumlahSelesai: 0,
      alertModal: false
    }
  },
  // persist: true,
  getters:{
  },
  actions:{
    async cekAdmin(){
      // console.log('cek admin from pinia')
      const { data: adminData } = await useFetch('/api/adminList')
      const adminList = adminData.value.split(", ")
      const isAdmin = adminList.includes(this.user.uid)

      this.user.isAdmin = isAdmin
    },

    async getListCiptaan(){
      const { $database } = useNuxtApp()
      // await store.init('')
      let queryRef
      // console.log('database2',database2.value)
      if (this.user.isAdmin){
          queryRef = databaseRef($database, '/ciptaan')
      } else {
          queryRef = query(databaseRef($database, '/ciptaan'), orderByChild('pengusul'), equalTo(this.user.email))
      }
      
      get(queryRef).then((snapshot) => {
          if (snapshot.exists()) {
              const data = snapshot.val();
              this.daftarUsulan = Object.values(data)
              // daftarUsulan.value = daftarUsulanStatic
  
              this.jumlahSelesai=0
              for(let i=0; i<Object.keys(this.daftarUsulan).length; i++){
              const key = Object.keys(this.daftarUsulan[i])
              const value = Object.values(this.daftarUsulan[i])[11]
              // console.log(key)
                if(value == 'Selesai'){
                    this.jumlahSelesai++
                }
              }
          }
      });
    },
    async googleLogin(){
      const { $auth } = useNuxtApp()
      const provider = new GoogleAuthProvider();

      signInWithPopup($auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log(result.user)
        // The signed-in user info.
        this.user = result.user
        // Get Admin status
        this.cekAdmin().then(()=>{
          if(this.user.isAdmin){
            navigateTo('/admin')
          } else{
            navigateTo('/dashboard')
          }
        })
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode + errorMessage)
      });
    },

    async logout(){
      const { $auth } = useNuxtApp()
      signOut($auth).then(() => {
        // Sign-out successful.
        // console.log('Sign-out successful.')
        this.user = {
          email: '',
          photoURL: '',
          displayName: '',
          uid: '',
          isAdmin: false,
        }
        navigateTo('/')
      }).catch((error) => {
        // An error happened.
      });
    },

    async init(target){
      // console.log('start init')
      // console.log(this.user.uid)
      const { $auth } = useNuxtApp()
      const config = useRuntimeConfig()
      // fetch data from api adminList
      let adminList
      $fetch("/api/adminList").then((adminListValue)=>{
        adminList = adminListValue
      })
      
      process.client && onAuthStateChanged($auth, (userData) => {
        if (userData) {
          // User is signed in, 
          this.user = userData
          // Get Admin status
          const isAdmin = adminList.includes(this.user.uid)

          // console.log(this.user.isAdmin)
          // navigateTo('/admin')
        } else {
          // User is signed out
          this.user = {
            email: '',
            photoURL: '',
            displayName: '',
            uid: '',
            isAdmin: false,
          }
          navigateTo(target)
        }
      });
      // return ('login')
    },

    async switchAlert(boolean){
      this.alertModal = boolean
    }
  },
  persist: true,

})