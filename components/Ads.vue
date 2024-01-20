<!-- components/Ads.vue -->

<template>
    <div :id="adId" :data-7pub="adId"></div>
  </template>
  
  <script>
  export default {
    props: {
      adId: {
        type: String,
        required: true,
      },
    },
    mounted() {
      this.initAd();
    },
    methods: {
      initAd() {
        if (window.initNativeAd) {
            console.log('initAds')
          window.initNativeAd([this.adId, 'native']);
        }
      },
    },
  };
  </script>
  