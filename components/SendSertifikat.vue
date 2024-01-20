<template>
    <div v-show="origin!='billing'">
        <label class="btn btn-sm btn-success gap-2 no-animation w-full" 
            @click="kirimSertifikat()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Send Sertif
        </label>
    </div>
    <div class="tooltip ml-2 z-20" data-tip="Kirim Notifikasi" v-show="origin=='billing'">
    <button class="btn btn-square btn-sm no-animation" @click="kirimSertifikat()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    </button>
    </div>
    <!-- TEMPLATE HTML EMAIL -->
    <div v-show="false" ref="templateEmail">    
        <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #fff">
                <table class="sm-w-full" style="width: 600px" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                    <td class="sm-py-4 sm-px-6" style="padding: 48px; text-align: center">
                        <a href="https://hakciptav2.vercel.app">
                        <img src="https://upload.wikimedia.org/wikipedia/id/archive/7/73/20171123143356%21Lambang_Universitas_Negeri_Malang.jpg" width="70" alt="Universitras Negeri Malang" style="border: 0; max-width: 100%; vertical-align: middle">
                        </a>
                    </td>
                    </tr>
                    <tr>
                    <td align="center" class="sm-px-6">
                        <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="sm-px-6" style="border-radius: 4px; background-color: #f8fafc; padding: 48px; text-align: left; font-size: 16px; line-height: 24px; color: #334155; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                            <p style="margin-bottom: 24px">
                                Berikut adalah link sertifikat Hak Cipta dengan judul:
                            </p>
                            <p style="font-size: 24px; font-weight: 600; color: #000">
                                {{ data.judul }}
                            </p>
                            <div style="margin-top: 24px; margin-bottom: 32px; line-height: 100%">
                                <a :href="data.sertifikat" class="hover-bg-indigo-500" style="text-decoration: none; display: inline-block; border-radius: 4px; background-color: #1d4ed8; padding-left: 16px; padding-right: 16px; padding-top: 14px; padding-bottom: 14px; text-align: center; font-size: 16px; font-weight: 600; color: #fff">
                                <!--[if mso]>
                                    <i style="mso-text-raise: 30px; letter-spacing: 24px">&#8202;</i>
                                <![endif]-->
                                <span style="mso-text-raise: 16px">Link Sertifikat &rarr;</span>
                                <!--[if mso]>
                                    <i style="letter-spacing: 24px">&#8202;</i>
                                <![endif]-->
                                </a>
                            </div>
                            <p style="margin: 0; font-size: 14px; font-style: italic">
                                Jika Anda pencipta/pengusul judul di atas, Anda juga bisa mengakses sertifikat melalui laman berikut:
                            </p>
                            <a href="https://hakciptav2.vercel.app/dashboard"><button style="margin-top: 8px; margin-bottom: 8px; display: inline-block; padding: 8px">Dashboard</button></a>                      <table role="separator" style="width: 100%" cellpadding="0" cellspacing="0">
                                <tr>
                                <td style="padding-top: 32px; padding-bottom: 32px">
                                    <div style="height: 1px; background-color: #e2e8f0; line-height: 1px">&zwnj;</div>
                                </td>
                                </tr>
                            </table>
                            <p style="margin: 0; margin-bottom: 16px">
                                Terima kasih telah mendaftarkan Hak Cipta dan turut mendukung peningkatan kinerja Universitas Negeri Malang.
                            </p>                      <p style="margin: 0; margin-bottom: 16px">
                                Sentra HKI Universitas Negeri Malang.
                            </p>
                            </td>
                        </tr>
                        <tr role="separator">
                            <td style="height: 48px"></td>
                        </tr>
                        <tr>
                            <td style="padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #475569">
                            <p style="margin: 0; margin-bottom: 5px; text-transform: uppercase">
                                Sentra HKI
                            </p>
                            <p style="margin: 0; margin-bottom: 5px; text-transform: uppercase">
                                Graha Rektorat Lt. 7 - Universitas Negeri Malang
                            </p>
                            <p style="margin: 0; font-style: italic">
                                Powered by
                                <a href="http://ahapixel.id/" target="_blank" class="hover-text-decoration-underline" style="text-decoration: none; color: #4338ca">Aha Pixel</a>
                            </p>
                            <p style="cursor: default">
                            </p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
        </table>  
    </div>
</template>

<script setup>
const props = defineProps(['data','origin'])
const templateEmail = ref()

async function kirimSertifikat(){
    //copy template html email to clipboard
    await navigator.clipboard.writeText(templateEmail.value.innerHTML);
    // open gmail compose
    let listEmail=[]
    props.data.pencipta.forEach(element => {
        listEmail.push(element.email)
    });
    //generate plain text in email body
    // window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${listEmail}&su=SERTIFIKAT HAK CIPTA&body=Dengan hormat kami lampirkan sertifikat Hak Cipta dengan judul "${props.data.judul}".%0d%0aTerima kasih telah mendaftarkan Hak Cipta Anda dan turut mendukung peningkatan kinerja Universitas Negeri Malang.%0d%0a%0d%0aSalam.`);
    // empty body
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${listEmail}&su=SERTIFIKAT HAK CIPTA`);
}


</script>

<style lang="scss" scoped>

</style>