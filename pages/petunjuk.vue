    <template>
        <section class="">
            <div class="container mx-auto flex flex-col p-6">
                <h2 class="py-4 text-3xl font-bold text-center">6 Langkah Mudah Pengajuan Hak Cipta</h2>
                <div class="divide-y divide-gray-700">
                    <div class="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                        <div class="flex items-center justify-center lg:col-span-1 col-span-full text-9xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="60px" height="60px" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span class="text-xs tracking-wider uppercase ">Langkah 1</span>
                            <span class="text-xl font-bold md:text-2xl">Pendaftaran</span>
                            <span class="mt-4 text-gray-500">
                                Pencipta masuk ke Aplikasi Hak Cipta dan Login menggunakan akun Gmail (mohon mengingat akun email yang digunakan saat login, untuk memantau progress ajuan)
                            </span>
                        </div>
                    </div>
                    <div class="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                        <div class="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="60px" height="60px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span class="text-xs tracking-wider uppercase ">Langkah 2</span>
                            <span class="text-xl font-bold md:text-2xl">Isi Data</span>
                            <span class="mt-4 text-gray-500">
                                Pencipta mengajukan ciptaan baru dengan klik tombol 
                                <button class="btn btn-primary btn-xs gap-2 no-animation md:mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <label class="hidden md:block"> Ciptaan Baru</label>
                                </button>
                                di pojok kanan atas
                                dan mengisi detail ciptaan beserta lampiran. <br/>
                                <a class="text-blue-700 cursor-pointer font-bold underline" @click="scrollTo('detail')"> Klik disini untuk petunjuk pengisian lebih detail</a>
                            </span>
                        </div>
                    </div>
                    <div class="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                        <div class="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="60px" height="60px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span class="text-xs tracking-wider uppercase ">Langkah 3</span>
                            <span class="text-xl font-bold md:text-2xl">Verifikasi Data</span>
                            <span class="mt-4 text-gray-500">
                                Status ajuan <div class="badge">Verifikasi</div> :
                                pencipta menunggu proses verifikasi oleh Admin Hak Cipta. Mohon periksa secara berkala status ajuan anda pada menu dashboard.
                                <br/>-Apabila status ajuan berubah menjadi 
                                <div class="badge bg-amber-400 text-black">Revisi</div>
                                silahkan memperbaiki sesuai catatan revisi yang diberikan dengan cara klik tombol
                                <div class="btn btn-outline btn-xs no-animation gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    Edit
                                </div>
                                pada menu dashboard.
                                <br/>-Namun, apabila status ajuan 
                                <div class="badge bg-red-500">Ditolak</div> maka ajuan anda tidak bisa dilanjutkan.
                            </span>
                        </div>
                    </div>
                    <div class="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                        <div class="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="60px" height="60px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span class="text-xs tracking-wider uppercase ">Langkah 4</span>
                            <span class="text-xl font-bold md:text-2xl">Cetak Formulir</span>
                            <span class="mt-4 text-gray-500">
                                Setelah status ajuan berubah menjadi <div class="badge bg-purple-400">Cetak Formulir</div>,
                                silahkan mencetak formulir dengan cara klik tombol 
                                <div class="btn btn-outline btn-xs no-animation gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Formulir
                                </div>.
                                <br/>Lalu lengkapi materai dan TTD setiap pencipta. Kemudian serahkan formulir cetak ke Admin Hak Cipta pada jam kerja.
                                <br/>
                                <div class="badge badge-warning gap-2 mt-1 font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Perhatian: 
                                </div>
                                Apabila status sudah "Cetak Formulir" pengajuan tidak dapat diubah
                            </span>
                        </div>
                    </div>
                    <div class="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                        <div class="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="60px" height="60px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span class="text-xs tracking-wider uppercase ">Langkah 5</span>
                            <span class="text-xl font-bold md:text-2xl">Submit DJKI</span>
                            <span class="mt-4 text-gray-500">
                                Jika status ajuan berubah menjadi <div class="badge bg-sky-600">Submit DJKI</div>,
                                ajuan anda sedang dalam proses sumbit ke DJKI oleh Admin Hak Cipta.
                                Mohon periksa secara berkala status ajuan anda.
                            </span>
                        </div>
                    </div>
                    <div class="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                        <div class="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="60px" height="60px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span class="text-xs tracking-wider uppercase ">Langkah 6</span>
                            <span class="text-xl font-bold md:text-2xl">Selesai</span>
                            <span class="mt-4 text-gray-500">
                                Jika status ajuan berubah menjadi <div class="badge bg-green-700">Selesai</div>,
                                ajuan anda telah diterima DJKI. 
                                Namun akan memerlukan waktu untuk sertifikat terbit.
                                Mohon periksa secara berkala status ajuan anda.
                                <br/>Jika sertifikat telah terbit, pada menu dashboard akan muncul tombol
                                <div class="btn btn-xs no-animation btn-success gap-2 font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 fill-warning">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                                    Sertifikat
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-4 bg-base-200" id="detail">
            <div class="container max-w-5xl px-4 py-12 mx-auto">
                <div class="grid gap-4 mx-4 sm:grid-cols-12">
                    <div class="col-span-12 sm:col-span-3">
                        <div class="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-accent">
                            <h3 class="text-3xl font-semibold">Petunjuk Pengisian Formulir</h3>
                            <span class="text-sm font-bold tracking-wider uppercase dark:text-gray-400">Ajuan Hak Cipta</span>
                        </div>
                    </div>
                    <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                        <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Siapkan berkas penunjang </h3>
                                <p class="mt-3">
                                    Sebelum mengajukan siapkan KTP masing-masing pencipta secara terpisah (tidak digabung dengan pencipta lainnya) dalam format JPG, serta siapkan lampiran sesuai format dan size masing-masing jenis ciptaan.
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Lengkapi data</h3>
                                <p class="mt-3">
                                    Lengkapi semua form yang tersedia, form tidak boleh kosong
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Tambah pencipta</h3>
                                <p class="mt-3">
                                    Untuk menambah pencipta, klik tombol
                                    <label class="btn btn-xs gap-2 no-animation mr-5 mb-2" @click="newPencipta">
                                        Tambah Pencipta
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </label>
                                    <br/>-Isi data pencipta sesuai dengan KTP masing-masing pencipta.
                                    <br/>-Nama dosen wajib menggunakan gelar.
                                    <br/>-KTP pencipta mohon di crop sesuai ukuran KTP dengan cara klik tombol
                                    <button class="btn btn-xs bg-success" >Set KTP</button>
                                    <br/>-Jika seluruh data telah terisi, klik tombol 
                                    <label 
                                    class="btn btn-xs" 
                                    @click="tambahPencipta"
                                    >Tambahkan</label>
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Copy pencipta</h3>
                                <p class="mt-3">
                                    Untuk meng-copy pencipta, klik tombol
                                    <label class="btn btn-xs gap-2 no-animation mr-5 mb-2" >
                                        Copy Pencipta
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                    </label>
                                    lalu pilih judul ciptaan yang akan di copy data penciptanya.
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Urutkan pencipta</h3>
                                <p class="mt-3">
                                    Untuk mengubah urutan pencipta, klik tombol
                                    <label class="btn btn-xs gap-2 no-animation ">
                                        Urutkan pencipta
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </label>
                                    lalu drag and drop nama peserta sesuai urutan yang diinginkan,
                                    jika sudah klik selesai.
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Edit atau hapus pencipta</h3>
                                <p class="mt-3">
                                    Untuk mengedit pencipta, klik tombol
                                    <label class="btn btn-sm btn-circle mr-2 no-animation">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </label>
                                    di sebelah kanan nama pencipta.
                                    <br/>Untuk menghapus pencipta, klik tombol
                                    <label class="btn btn-sm btn-circle btn-error no-animation">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </label>
                                    di sebelah kanan nama pencipta.
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Upload lampiran</h3>
                                <p class="mt-3">
                                    Setelah seluruh detail ciptaan dan pencipta selesai diinput,
                                    upload lampiran anda sesuai ketentuan berikut:
                                    <br/>-Karya Audio Visual, jenis file: video format .mp4 (max 10MB)
                                    <br/>-Komposisi Musik, jenis file: audio format .mp3 (max 3MB)
                                    <br/>-Selain kedua jenis karya diatas, jenis file: pdf (max 2MB)
                                </p>
                            </div>
                            <div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-accent">
                                <h3 class="text-xl font-semibold tracking-wide">Submit ciptaan</h3>
                                <p class="mt-3">
                                    Setelah seluruh data lengkap klik tombol 
                                    "submit" 
                                    untuk menyimpan ciptaan anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="dark:bg-gray-800 dark:text-gray-100 -mb-4">
            <div class="container p-6 mx-auto space-y-6 text-center lg:p-8 lg:space-y-8">
                <h2 class="text-3xl font-bold">Siap mengajukan?</h2>
                <div class="flex flex-wrap justify-center lg:justify-between">
                    <button class="btn btn-primary w-full" @click="navigateTo(targetURL)" >Masuk</button>
                </div>
            </div>
        </section>

    </template>

    <script setup>

    import { useMainStore } from '~/store/index'
    
    const store = useMainStore()

    definePageMeta({
        layout: 'admin-layout'
    })
    useHead({
        title: 'Hak Cipta UM | Petunjuk',
        meta: [
            { name: 'description', content: 'Petunjuk Penggunaan Aplikasi Hak Cipta Universitas Negeri Malang' }
        ],
    })

    function scrollTo(id){
        document.getElementById('detail').scrollIntoView({
            behavior: "smooth"
        })
    }

    const targetURL = ref()

    let isAdmin = store.user.isAdmin
    if (isAdmin){
        targetURL.value = '/admin'
    } else {
        targetURL.value = '/dashboard'
    }

    </script>

    <style>

    .html {
    scroll-behavior: smooth;
    }

    </style>