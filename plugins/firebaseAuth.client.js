
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: 'e-hakcipta.firebaseapp.com',
    projectId: 'e-hakcipta',
    storageBucket: 'e-hakcipta.appspot.com',
    messagingSenderId: '1016499350990',
    appId: '1:1016499350990:web:50f38f264515560dc88f9f',
    databaseURL: 'https://e-hakcipta-default-rtdb.asia-southeast1.firebasedatabase.app',
    measurementId: "G-ED6N9RBZ9N"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app);
  
  // initUser()
  const auth = getAuth(app)


  const database = getDatabase(app)
  const storage = getStorage(app)
  const databaseFirestore = getFirestore(app)

  // nuxtApp.provide('hello', (name) => `Hello ${name}!`)
  nuxtApp.provide('auth', auth)
  nuxtApp.provide('database', database)
  nuxtApp.provide('databaseFirestore', databaseFirestore)
  nuxtApp.provide('storage', storage)

})
