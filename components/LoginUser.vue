<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body" >
          
          <h1 class="text-5xl font-bold text-center">Sign in please</h1>

          <!-- <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" class="input input-bordered" id="email" v-model="currenUser['email']"/>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="text" placeholder="password" class="input input-bordered" id="password"/>
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div> -->
          <div class="form-control mt-6">
            <!-- <button class="btn btn-primary cursor-not-allowed no-animation" >Login</button>
            <div class="divider">or</div> -->
            <button class="btn gap-2 bg-white text-black hover:text-white normal-case mt-2 no-animation" @click="googleLogin">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" class="w-6 h-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { useMainStore } from '~/store/index'
  
    const store = useMainStore()
    const currenUser = ref({
      email: ''
    })

    const googleLogin = async () => {
      store.googleLogin()
    }
  
  
</script>

<style scoped>

</style>