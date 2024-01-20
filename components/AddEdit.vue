<template>
    <div class="card bg-base-100 " @keydown.esc="resetPencipta(); addModal=false" tabindex="0">
        
        <progress v-show="route.params.id && !ciptaanModel.id" class="progress w-full  mt-6" ></progress>
        <div class="card-body form-control" :class="addModal || modalDelete || alertModal? 'blur-xs' : 'blur-none'" v-show="(route.params.id && ciptaanModel.id) || !route.params.id">
            <!-- Area Status Ciptaan -->
            <div class="alert alert-info shadow-lg" v-show="ciptaanModel['statusCiptaan']=='Submit ke DJKI' && !isAdmin">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Ciptaan ini sedang proses submit ke DJKI</span>
                </div>
            </div>
            <div class="alert alert-warning shadow-lg font-bold" v-show="ciptaanModel['statusCiptaan']=='Revisi' && ciptaanModel['catatan'] && !isAdmin">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Catatan Revisi: {{ ciptaanModel['catatan'] }}</span>
                </div>
            </div>
            <div class="alert alert-error shadow-lg font-bold" v-show="ciptaanModel['statusCiptaan']=='Ditolak' && ciptaanModel['catatan'] != '' && !isAdmin">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Catatan Ditolak: {{ ciptaanModel['catatan'] }}</span>
                </div>
            </div>
            <!-- START OF ADMIN AREA -->
            <div v-if="isAdmin">
                <label class="text-lg font-bold mr-2">Status:</label>
                <select 
                    class="select select-bordered  max-w-lg text-lg font-bold"
                    id="status" 
                    v-model="ciptaanModel['statusCiptaan']">
                        <option>Verifikasi</option>
                        <option>Revisi</option>
                        <option>Ditolak</option>
                        <option>Cetak Formulir</option>
                        <option>Submit ke DJKI</option>
                        <option>Selesai</option>
                </select>
            </div>
            <label class="font-bold" v-if="isAdmin">Pengajuan: <label class="font-normal">{{ formatDate.format(ciptaanModel['id'].slice(0, -4)) }}</label> </label>
            <!-- Opsi Selesai -->
            <div class="card border w-fit p-2 pr-8 -ml-1 border-dashed border-green-500 gap-2" v-show="isAdmin && ciptaanModel['statusCiptaan'] == 'Selesai' ">
                <label class="font-bold" >Link Sertifikat:</label>
                <input                    
                    class=" input input-bordered max-w-lg text-base font-normal input-sm"
                    placeholder="Link sertifikat dari g-drive"
                    v-model="ciptaanModel['sertifikat']"
                    />
                <label class="font-bold" >No. Sertifikat:</label>
                <input                    
                    class=" input input-bordered max-w-lg text-base font-normal input-sm"
                    placeholder="Masukkan no. sertifikat" 
                    v-model="ciptaanModel['noSertifikat']"
                    />
                <label class="font-bold" >No. Aplikasi:</label>
                <input                    
                    class=" input input-bordered max-w-lg text-base font-normal input-sm"
                    placeholder="Masukkan no. aplikasi" 
                    v-model="ciptaanModel['noAplikasi']"
                    />
            </div>
            <!-- Opsi Revisi -->
            <div class="card border w-full max-w-lg  p-2 pr-8 -ml-1 border-dashed border-yellow-500 gap-2" v-show="isAdmin && ciptaanModel['statusCiptaan'] == 'Revisi' || isAdmin && ciptaanModel['statusCiptaan'] == 'Verifikasi' && ciptaanModel['catatan']">
                <label class="font-bold" 
                    >Catatan Revisi:
                </label>
                <textarea 
                    class="textarea textarea-bordered text-lg bg-amber-200" 
                    placeholder="Ketik catatan" 
                    v-model="ciptaanModel['catatan']"
                    >
                </textarea>
                <!-- <NotificationNotifPencipta :data="ciptaanModel"/> -->
            </div>
            <!-- Opsi Ditolak -->
            <div class="card border w-full max-w-lg  p-2 pr-8 -ml-1 border-dashed border-error gap-2" v-show="isAdmin && ciptaanModel['statusCiptaan'] == 'Ditolak' ">
                <label class="font-bold" 
                    >Catatan Ditolak:
                </label>
                <textarea 
                    class="textarea textarea-bordered text-lg bg-error" 
                    placeholder="Ketik catatan" 
                    v-model="ciptaanModel['catatan']"
                    >
                </textarea>
            </div>
            <!-- Opsi Cetak Formulir -->
            <!-- <div class="card border w-full max-w-lg  p-2 pr-8 -ml-1 border-dashed border-orange-500 gap-2" v-show="isAdmin && ciptaanModel['statusCiptaan'] == 'Cetak Formulir' ">
                <NotificationNotifPencipta :data="ciptaanModel"/>
            </div> -->
            <!-- Opsi Submit -->
            <div class="card border w-fit p-4 -ml-1 border-dashed border-blue-500 gap-2" v-show="isAdmin && ciptaanModel['statusCiptaan'] == 'Submit ke DJKI' ">
                <label class="font-bold" >No. Billing:</label>
                <input                    
                    class=" input input-bordered max-w-lg text-base font-normal input-sm"
                    placeholder="Masukkan kode billing" 
                    v-model="ciptaanModel['noBilling']"
                    />
                <label class="font-bold">Tarif:
                </label>
                <select class="select select-sm select-bordered" v-model="ciptaanModel['tarifBilling']">
                    <option disabled selected>Pilih tarif</option>
                    <option >200000</option>
                    <option >300000</option>
                </select>
                <!-- Tombol DJKI -->
                <a :href="`http://localhost:5000?id=`+ciptaanModel['id']" target="_blank" v-show="!ciptaanModel['noAplikasi']">
                    <div class=" btn btn-sm no-animation btn-info bg-gradient-to-r from-cyan-300 to-sky-400 gap-2 font-bold w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>
                        Send to DJKI
                    </div>
                </a> 
            </div>
            <!-- END OF ADMIN AREA -->

            <div class="divider">DETAIL CIPTAAN</div>
            <label class="text-lg font-medium">Judul ciptaan:</label>
            <input 
                type="text" 
                placeholder="Ketik judul" 
                id="inputJudul" 
                :class="errorCiptaan['judul'] ? inputClassError : inputClassOk"
                @input="errorCiptaan['judul'] = false"
                @blur="ciptaanModel['judul'] != '' ? errorCiptaan['judul'] = false : errorCiptaan['judul'] = true" 
                v-model="ciptaanModel['judul']" />
            
            <label class="text-lg font-medium">Jenis ciptaan:</label>
            <select 
                :class="errorCiptaan['jenis'] ? 
                'select select-bordered w-full max-w-lg text-lg font-normal select-error' :
                'select select-bordered w-full max-w-lg text-lg font-normal '"
                @input="errorCiptaan['jenis'] = false"
                @blur="ciptaanModel['jenis'] != '' ? errorCiptaan['jenis'] = false : errorCiptaan['jenis'] = true"
                id="selectJenis" 
                v-model="ciptaanModel['jenis']">
                    <option disabled selected>Pilih jenis ciptaan</option>
                    <option>Karya Tulis</option>
                    <option>Karya Seni</option>
                    <option>Komposisi Musik</option>
                    <option>Karya Audio Visual</option>
                    <option>Karya Fotografi</option>
                    <option>Karya Drama & Koreografi</option>
                    <option>Karya Lainnya</option>
                </select>
            
            <label class="text-lg font-medium">Sub Jenis Ciptaan:</label>
            <select 
                :class="errorCiptaan['subJenis'] ? 
                'select select-bordered w-full max-w-lg text-lg font-normal select-error' :
                'select select-bordered w-full max-w-lg text-lg font-normal '"
                @input="errorCiptaan['subJenis'] = false" 
                @blur="ciptaanModel['subJenis'] != '' ? errorCiptaan['subJenis'] = false : errorCiptaan['subJenis'] = true"
                id="selectSubJenis" 
                v-model="ciptaanModel['subJenis']">
                    <option v-for="item in subJenisCiptaan">{{item}}</option>
                </select>
            
            <label class="text-lg font-medium">Produk Hasil:</label>
            <select 
                :class="errorCiptaan['sumberDana'] ? 
                'select select-bordered w-full max-w-lg text-lg font-normal select-error' :
                'select select-bordered w-full max-w-lg text-lg font-normal '"
                @input="errorCiptaan['sumberDana'] = false"  
                @blur="ciptaanModel['sumberDana'] != '' ? errorCiptaan['sumberDana'] = false : errorCiptaan['sumberDana'] = true"
                id="selectSubJenis" 
                v-model="ciptaanModel['sumberDana']">
                    <option disabled selected>Produk Hasil:</option>
                    <option>Penelitian</option>
                    <option>Pengabdian</option>
                    <option>Inobel</option>
                    <option>PKM</option>
                    <option>KKN</option>
                    <option>Tugas</option>
                    <option>Lainnya</option>
                </select>
            
            <label class="text-lg font-medium">Nilai aset karya:</label>
            <input 
                type="number" 
                placeholder="Biaya dalam rupiah" 
                id="inputBiaya" 
                :class="errorCiptaan['biaya'] ? inputClassError : inputClassOk"
                @input="errorCiptaan['biaya'] = false"
                @blur="ciptaanModel['biaya'] != '' ? errorCiptaan['biaya'] = false : errorCiptaan['biaya'] = true" 
                v-model="ciptaanModel['biaya']" />

            <label class="text-lg font-medium">Kota pertama diumumkan:</label>
            <SimpleTypeahead
                :class="errorCiptaan['kotaCiptaan'] ? inputClassError : inputClassOk"
                id="city"
                placeholder="Pilih kota"
                ref="inputKota"
                :items=daftarKota
                :minInputLength="1"
                @selectItem="selectItemKota"
                @onInput="onInputKota"
                @compositionupdate="compositionUpdate($event)"
                @onBlur="onBlurKota"
                autocomplete="nope"
                :value="ciptaanModel['kotaCiptaan']"
            >
            </SimpleTypeahead>
            
            <label class="text-lg font-medium">Tanggal pertama diumumkan: </label>
            <label class=" italic -mt-2">(bukan tanggal pengajuan)</label>
            <Datepicker 
                id="selectTanggal" 
                v-model="ciptaanModel['tanggal']" 
                :enable-time-picker="false" 
                locale="id-ID"
                format="dd - MMMM - yyyy"
                month-name-format="long"
                position="left" 
                auto-apply 
                placeholder="Pilih tanggal" 
                :class="errorCiptaan['tanggal'] ? inputClassError : inputClassOk"
                @focus="errorCiptaan['tanggal'] = false"
                @blur="ciptaanModel['tanggal'] != '' ? errorCiptaan['tanggal'] = false : errorCiptaan['tanggal'] = true"
                ></Datepicker>
            
            <label class="text-lg font-medium">Deskripsi singkat:</label>
            <textarea 
                :class="errorCiptaan['deskripsi'] ? 'textarea textarea-bordered textarea-error w-full max-w-lg text-lg' : 'textarea textarea-bordered w-full max-w-lg text-lg'" 
                placeholder="Ketik deskripsi" 
                v-model="ciptaanModel['deskripsi']"
                @input="errorCiptaan['deskripsi'] = false"
                @blur="deskripsiValidation > 100 ? errorCiptaan['deskripsi'] = false : errorCiptaan['deskripsi'] = true"
                ></textarea>
            <label :class="deskripsiValidation <100 ? 'text-error' : ''">{{ deskripsiValidation }}/100</label>
            
            <div class="divider">DATA PENCIPTA</div>
            
            <!-- The button to open modal -->
            <div>
                <label for="addModal" class="btn btn-sm gap-2 no-animation mr-5 mb-2" @click="newPencipta">
                    Tambah Pencipta
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
                <label for="copyModal" class="btn btn-sm gap-2 no-animation mr-5 mb-2" >
                    Copy Pencipta
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                </label>
                <label for="sortModal" class="btn btn-sm gap-2 no-animation ">
                    Urutkan pencipta
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                </label>
            </div>

            <!-- Table Here / Table Pencipta -->
            <div class="overflow-x-auto w-full">
                <table class="table table-compact w-full">
                <!-- head -->
                <thead>
                    <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Prodi</th>
                    <th>Alamat</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="items, index in ciptaanModel['pencipta']">
                        <th>{{ items.id }}</th>
                        <td class="font-bold">{{items.nama}}</td>
                        <td>{{items.email}}</td>
                        <td>{{items.prodi}}</td>
                        <td class="min-w-[10rem] max-w-[20rem] whitespace-normal">{{items.alamat}}</td>
                    <th>                        
                        <!-- kecamtan button -->
                        <label for="addModal" class="btn btn-warning btn-xs mr-2" @click="editPencipta(items)" v-if="!items.kecamatan">edit kecamatan !</label>
                        
                        <!-- edit button -->
                        <label for="addModal" class="btn btn-sm btn-circle mr-2 no-animation" @click="editPencipta(items)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </label>
                        <!-- delete button -->
                        <label for="deleteModal" class="btn btn-sm btn-circle btn-error no-animation" @click="itemsTobeDelete = items">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </label>
                                            
                    </th>
                    </tr>
                </tbody>
                <!-- foot -->
                <tfoot>
                    <tr>
                        <th> </th>
                        <th>Total Pencipta: {{ciptaanModel.pencipta.length}}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                
                </table>
            </div>   
            
            <div class="divider">LAMPIRAN PRODUK</div>
            <label class="text-base font-medium mt-5">Upload lampiran:</label>
            <div>
                <input 
                :accept="acceptType" 
                ref="inputLampiran" 
                name="image" 
                type="file" 
                class="file-input w-full max-w-xs" 
                @input="setFile" 
                :disabled="ciptaanModel.lampiran == '' || ciptaanModel.lampiran.includes('base64') ? false : true"/>
            </div>
            <div class="indicator w-full max-w-xs mt-5" 
                v-show="ciptaanModel.lampiran.includes('base64') || ciptaanModel.lampiran == '' ? false : true">

            <span class="indicator-item ">
                <button class="btn btn-sm btn-error btn-circle text-white no-animation" @click="ciptaanModel.lampiran=''">X</button>
            </span> 
            <a class=" w-full max-w-xs" :href="ciptaanModel.lampiran" target="_blank">
                <button class="btn btn-outline w-full max-w-xs no-animation">File Lampiran</button>
            </a>
            </div>
            
            <div class="divider"></div>
            <!-- Button Here -->
            <div class="card-actions justify-center ">
                <button v-if="ciptaanModel.statusCiptaan != 'Ditolak' && 
                ciptaanModel.pengusul[0] == store.user.email || !params ||
                isAdmin" class="btn btn-primary w-full" 
                :disabled="formEdited" @click="confirmSubmit()">Submit</button>
            </div>
            
        </div>

        <!-- Modal Copy -->
        <ModalCopy :data="route.params.id" @items-pencipta="callback"/>
        <!-- Modal Sort -->
        <ModalSort :data="ciptaanModel['pencipta']" />

        <!-- Modal Pencipta Delete -->
        <input type="checkbox" id="deleteModal" class="modal-toggle" v-model="modalDelete"  />
        <div class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Konfirmasi Hapus</h3>
            <p class="py-4">Anda yakin ingin menghapus?</p>
            <div class="modal-action">
                <label for="deleteModal" class="btn btn-sm" >Batal</label>
                <label for="deleteModal" class="btn btn-sm btn-ghost" @click="deletePencipta()">Yakin</label>
            </div>
        </div>
        </div>
        
        <!-- Modal Tambah / Edit Pencipta -->
        <input type="checkbox" id="addModal" class="modal-toggle" v-model="addModal"/>
        <div class="modal" >
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-5">{{ labelPencipta2 }}</h3>
                <label class="text-base font-medium">Nama:</label>
                <input autocomplete="nope" type="text" placeholder="Ketik nama" id="inputJudul" v-model="penciptaModel['nama']" :class="error['nama'] ? inputClassError : inputClassOk"
                @blur="validateInputPencipta('nama')" @input="error['nama']=false" />
                
                <label class="text-base font-medium">NIP/NIM:</label>
                <input autocomplete="nope" placeholder="Ketik NIP/NIM" id="inputNIP" v-model="penciptaModel['nip']" :class="error['nip'] ? inputClassError : inputClassOk"
                @blur="validateInputPencipta('nip')" @input="error['nip']=false" />
                
                <label class="text-base font-medium">Email:</label>
                <input type="email" placeholder="Ketik email" id="inputEmail" v-model="penciptaModel['email']" :class="error['email'] ? inputClassError : inputClassOk" 
                @blur="validateInputPencipta('email')" @input="error['email']=false"/>
                
                <label class="text-base font-medium">No. HP/WA:</label>
                <input maxlength="12" placeholder="Ketik HP/WA" id="inputHP" v-model="penciptaModel['hp']" :class="error['hp'] ? inputClassError : inputClassOk" 
                @blur="validateInputPencipta('hp')" @input="error['hp']=false"/>
                
                <label class="text-base font-medium">Kewarganegaraan:</label>
                <SimpleTypeahead
                    :class="error['kewarganegaraan'] ? inputClassError : inputClassOk"
                    id="kewarganegaraanPencipta"
                    placeholder="Pilih kewarnganegaraan"
                    ref="inputKewarganegaraanPencipta"
                    :items=daftarNegara
                    :minInputLength="1"
                    @selectItem="selectItemKewarganegaraan"
                    @onInput="onInputKewarganegaraan"
                    @onBlur="onBlurKewarganegaraan"
                    @compositionupdate="compositionUpdateKewarganegaraan($event)"
                    autocomplete="nope" 
                    :value="penciptaModel['kewarganegaraan']"
                >
                </SimpleTypeahead>
                
                <label class="text-base font-medium">Negara Domisili:</label>
                <SimpleTypeahead
                    :class="error['negara'] ? inputClassError : inputClassOk"
                    id="negaraPencipta"
                    placeholder="Pilih negara"
                    ref="inputNegaraPencipta"
                    :items=daftarNegara
                    :minInputLength="1"
                    @selectItem="selectItemNegara"
                    @onInput="onInputNegara"
                    @onBlur="onBlurNegara"
                    @compositionupdate="compositionUpdateNegara($event)"
                    autocomplete="nope"
                    :value="penciptaModel['negara']"
                >
                </SimpleTypeahead>
                
                <label class="text-base font-medium">Provinsi:</label>
                <SimpleTypeahead
                    :class="error['provinsi'] ? inputClassError : inputClassOk"
                    id="provinsiPencipta"
                    placeholder="Pilih provinsi"
                    ref="inputProvinsiPencipta"
                    :items=daftarProvinsi
                    :minInputLength="1"
                    @selectItem="selectItemProvinsi"
                    @onInput="onInputProvinsi"
                    @onBlur="validateProvinsi"
                    @compositionupdate="compositionUpdateProvinsi($event)"
                    autocomplete="nope"
                    :value="penciptaModel['provinsi']"
                    :disabled="penciptaModel['negara'] != 'Indonesia' ? true : false"
                >
                </SimpleTypeahead>
                    
                <label class="text-base font-medium">Kota:</label>
                <SimpleTypeahead
                    :class="error['kota'] ? inputClassError : inputClassOk"
                    id="kotaPencipta"
                    placeholder="Pilih kota"
                    ref="inputKotaPencipta"
                    :items=daftarKota
                    :minInputLength="1"
                    @selectItem="selectItemKotaPencipta"
                    @onInput="onInputKotaPencipta"
                    @onBlur="validateKotaPencipta"
                    @compositionupdate="compositionUpdateKota($event)"
                    :value="penciptaModel['kota']"
                    autocomplete="nope"
                    :disabled="penciptaModel['negara'] != 'Indonesia' ? true : false"
                >
                </SimpleTypeahead>
                    
                <label class="text-base font-medium">Kecamatan:</label>
                <!-- <span class="indicator-item indicator-start badge badge-sm badge-warning mt-2 ml-2">wajib diisi</span>  -->
                <SimpleTypeahead
                    :class="inputKecamatanClass"
                    id="kecamatanPencipta"
                    placeholder="Pilih kecamatan"
                    ref="inputKecamatanPencipta"
                    :items=daftarKecamatan
                    :minInputLength="1"
                    @selectItem="selectItemKecamatanPencipta"
                    @onInput="onInputKecamatanPencipta"
                    @onBlur="validateKecamatanPencipta"
                    @compositionupdate="compositionUpdateKecamatan($event)"
                    :value="penciptaModel['kecamatan']"
                    autocomplete="nope"
                    :disabled="penciptaModel['negara'] != 'Indonesia' ? true : false"
                >
                </SimpleTypeahead>

                <label class="text-base font-medium">Alamat:</label>
                <input type="address" placeholder="Ketik alamat (tanpa kota/kecamatan/kodepos/provinsi)" id="inputPenciptaAlamat" v-model="penciptaModel['alamat']" :class="error['alamat'] ? inputClassError : inputClassOk" 
                @blur="validateInputPencipta('alamat')" @input="error['alamat']=false"/>
                
                <label class="text-base font-medium">Kode Pos:</label>
                <input type="postal" placeholder="Ketik kode pos" id="inputPenciptaPos" v-model="penciptaModel['kodepos']" :class="error['kodepos'] ? inputClassError : inputClassOk"
                @blur="validateInputPencipta('kodepos')" maxlength="6" @input="error['kodepos']=false"/>
                
                <label class="text-base font-medium">Fakultas:</label>
                <SimpleTypeahead
                    :class="error['fakultas'] ? inputClassError : inputClassOk"
                    id="fakultasPencipta"
                    placeholder="Pilih fakultas"
                    ref="inputFakultas"
                    :items=daftarFakultas
                    :minInputLength="1"
                    @selectItem="selectItemFakultas"
                    @onInput="onInputFakultas"
                    @onBlur="validateFakultas"
                    @compositionupdate="compositionUpdateFakultas($event)"
                    :value="penciptaModel['fakultas']"
                    autocomplete="nope"
                >
                </SimpleTypeahead>
                    
                <label class="text-base font-medium">Program Studi:</label>
                <SimpleTypeahead
                    :class="error['prodi'] ? inputClassError : inputClassOk"
                    id="prodiPencipta"
                    placeholder="Pilih prodi"
                    ref="inputProdi"
                    :items=daftarProdi
                    :minInputLength="1"
                    @selectItem="selectItemProdi"
                    @onInput="onInputProdi"
                    @onBlur="validateProdi"
                    @compositionupdate="compositionUpdateProdi($event)"
                    autocomplete="nope"
                    :value="penciptaModel['prodi']"
                    :disabled="daftarProdi == '-' ? true : false"
                >
                </SimpleTypeahead>

                <label class="text-base font-medium mt-5">Foto KTP: (Maks. 1MB)</label>
                <div>
                    <input accept="image/jpeg" ref="inputKTP" name="image" type="file" class="file-input w-full max-w-xs" @input="setImage" :disabled="imgSrc || penciptaModel['ktp'] ? true : false" />
                </div>

            <div class="content">
            <section class="cropper-area" v-show="imgSrc">
                <!-- <div class="card border w-full max-w-lg  p-2 pr-8 -ml-1 border-dashed border-orange-500 gap-2" v-show="isAdmin && ciptaanModel['statusCiptaan'] == 'Cetak Formulir' ">
                <NotificationNotifPencipta :data="ciptaanModel"/>
            </div> -->
                <div class="img-cropper items-center card border w-full max-w-lg p-3 border-dashed border-primary mt-2 ">
                    <p class="font-bold mb-2">Crop KTP (Landscape)</p>
                    <div class="card-actions justify-center items-center mb-2">
                        <div @click="zoom(0.2)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                        </div>
                        <div @click="zoom(-0.2)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                            </svg>
                        </div>
                        <div @click="rotate(-90)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6.56 7.98C6.1 7.52 5.31 7.6 5 8.17c-.28.51-.5 1.03-.67 1.58-.19.63.31 1.25.96 1.25h.01c.43 0 .82-.28.94-.7.12-.4.28-.79.48-1.17.22-.37.15-.84-.16-1.15zM5.31 13h-.02c-.65 0-1.15.62-.96 1.25.16.54.38 1.07.66 1.58.31.57 1.11.66 1.57.2.3-.31.38-.77.17-1.15-.2-.37-.36-.76-.48-1.16-.12-.44-.51-.72-.94-.72zm2.85 6.02c.51.28 1.04.5 1.59.66.62.18 1.24-.32 1.24-.96v-.03c0-.43-.28-.82-.7-.94-.4-.12-.78-.28-1.15-.48-.38-.21-.86-.14-1.16.17l-.03.03c-.45.45-.36 1.24.21 1.55zM13 4.07v-.66c0-.89-1.08-1.34-1.71-.71L9.17 4.83c-.4.4-.4 1.04 0 1.43l2.13 2.08c.63.62 1.7.17 1.7-.72V6.09c2.84.48 5 2.94 5 5.91 0 2.73-1.82 5.02-4.32 5.75-.41.12-.68.51-.68.94v.02c0 .65.61 1.14 1.23.96C17.57 18.71 20 15.64 20 12c0-4.08-3.05-7.44-7-7.93z"/></svg>
                        </div>
                        <div @click="rotate(90)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14.83 4.83L12.7 2.7c-.62-.62-1.7-.18-1.7.71v.66C7.06 4.56 4 7.92 4 12c0 3.64 2.43 6.71 5.77 7.68.62.18 1.23-.32 1.23-.96v-.03c0-.43-.27-.82-.68-.94C7.82 17.03 6 14.73 6 12c0-2.97 2.16-5.43 5-5.91v1.53c0 .89 1.07 1.33 1.7.71l2.13-2.08c.4-.38.4-1.02 0-1.42zm4.84 4.93c-.16-.55-.38-1.08-.66-1.59-.31-.57-1.1-.66-1.56-.2l-.01.01c-.31.31-.38.78-.17 1.16.2.37.36.76.48 1.16.12.42.51.7.94.7h.02c.65 0 1.15-.62.96-1.24zM13 18.68v.02c0 .65.62 1.14 1.24.96.55-.16 1.08-.38 1.59-.66.57-.31.66-1.1.2-1.56l-.02-.02c-.31-.31-.78-.38-1.16-.17-.37.21-.76.37-1.16.49-.41.12-.69.51-.69.94zm4.44-2.65c.46.46 1.25.37 1.56-.2.28-.51.5-1.04.67-1.59.18-.62-.31-1.24-.96-1.24h-.02c-.44 0-.82.28-.94.7-.12.4-.28.79-.48 1.17-.21.38-.13.86.17 1.16z"/></svg>
                        </div>
                        <div class="card-actions justify-right">
                            <button class="btn btn-sm bg-success" @click="cropImage">Set KTP</button>
                        </div>
                    </div>
                    <vue-cropper
                    ref="cropper"
                    :src="imgSrc"
                    :zoomOnWheel=false
                    :zoomOnTouch=false
                    />
                </div>
            </section>
            <section class="preview-area" v-show="penciptaModel['ktp']">
                <p class="font-bold">Preview KTP</p>
                <div class="carousel w-full">
                    <div id="slide1" class="carousel-item relative w-full">
                    <img
                        v-if="penciptaModel['ktp']"
                        :src="penciptaModel['ktp']"
                        alt="Cropped Image"
                    />
                    <div class="absolute flex right-0 top-0">
                    <a @click="resetCrop" class="btn btn-circle">X</a>
                    </div>
                </div> 
                </div>
            </section>
            </div>
                
                <div class="modal-action">
                <label 
                    for="addModal" 
                    class="btn btn-ghost" 
                    @click="resetPencipta"
                    >Batal</label>
                <label 
                    class="btn" 
                    @click="tambahPencipta"
                    >{{labelPencipta}}</label>
                </div>
            </div>
        </div>

        <!-- Modal Alert -->
        <input type="checkbox" id="alertModal" class="modal-toggle" v-model="alertModal" />
        <label class="modal ">
        <label class="modal-box relative" >
            <label for="alertModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="font-bold text-lg">{{ teksAlert.judul }}</h3>
            <p class="pt-4">{{ teksAlert.deskripsi }}</p>
            <a class="text-primary" v-show="teksAlert.link" :href="teksAlert.link" target="blank">{{ teksAlert.link }}</a>
            <p class="pt-4" v-show="teksAlert.link">Terima kasih</p>
        </label>
        </label>

        <!-- Modal Confirmation -->
        <input type="checkbox" id="confirmModal" class="modal-toggle" v-model="confirmModal" />
        <label for="confirmModal" class="modal ">
        <label class="modal-box relative" for="">
            <h3 class="font-bold text-lg">Anda yakin seluruh data telah sesuai?</h3>
            <p class="py-4">Kesalahan input data oleh pencipta bukan tanggung jawab Sentra HKI UM</p>
            <div class="modal-action">
                <label for="confirmModal" class="btn btn-sm" @click="submit()">Yakin</label>
            </div>
        </label>
        </label>

        <!-- Modal Progress -->
        <input type="checkbox" id="progressModal" class="modal-toggle" v-model="progressModal" />
        <label class="modal ">
        <label class="modal-box relative" for="">
            <h3 class="font-bold text-lg" v-show="progress.value<100">Mohon tunggu</h3>
            <progress class="progress progress-success w-full" :value="progress.value" max="100"></progress>
            <p class="text-sm">{{ progress.value }}%</p>
            <p class="text-sm" v-if="progress.value <= 99">Memproses {{ progress.state }}</p>
            <div class="modal-action" v-if="progress.value >= 100">
                <NotificationNotifPencipta :data="ciptaanModel" v-if="isAdmin && (ciptaanModel.statusCiptaan == 'Revisi' || ciptaanModel.statusCiptaan == 'Ditolak' || ciptaanModel.statusCiptaan == 'Cetak Formulir')"/>
                <SendSertifikat :data="ciptaanModel" v-if="isAdmin && ciptaanModel.statusCiptaan == 'Selesai'"/>
                <label for="progressModal" class="btn btn-sm" @click="!isAdmin ? finishSubmit() : ''">Selesai</label>
            </div>
            <div class="modal-action" v-if="progress.value < 100">
                <label for="progressModal" class="btn btn-xs" @click="copyLog()">Copy Logs</label>
            </div>
        </label>
        </label>
    </div>

  </template>

<script setup>
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import SimpleTypeahead from 'vue3-simple-typeahead';
    import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
    import VueCropper from 'vue-cropperjs';
    import 'assets/cropper.css';
    import { ref as databaseRef, set, update} from 'firebase/database'
    import { ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";
    import { doc, setDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore"; 
    import { useMainStore } from '~/store/index'
    // import {nodemailer} from 'nodemailer'
    import daftarKecamatan from '~/assets/kecamatan.json'

    const urlAftersubmit = ref('/dashboard')
    const store = useMainStore()
    let isAdmin = store.user.isAdmin
    if (isAdmin){
        urlAftersubmit.value = '/admin'
    } else {
        urlAftersubmit.value = '/dashboard'
    }

    const progress = ref({
        value: 0,
        state: ''
    })
    const progressModal = ref(false)
    const nuxtApp = useNuxtApp()
    const database = nuxtApp.$database
    const { $databaseFirestore } = useNuxtApp()

    const storage = nuxtApp.$storage
    const databaseFirestore = nuxtApp.$databaseFirestore

    const emailPengusul = ref([])
    const namaPencipta = ref([])
    const route = useRoute()
    let params

    let belumSimpanNoBilling = true
    onBeforeRouteLeave(()=>{
        // console.log(!ciptaanStatic['tanggal'])
        if (isAdmin && ciptaanModel.value['statusCiptaan']=='Submit ke DJKI' && !ciptaanStatic['noBilling'] && ciptaanModel.value['noBilling'] && belumSimpanNoBilling){
            showAlert('Ups, ada yg salah', 'No. billing belum disimpan')
            navigateTo(route.fullPath)
        }
    })

    const inputClassOk = 'input input-bordered w-full max-w-lg text-base font-normal'
    const inputClassError = 'input input-bordered w-full max-w-lg text-base font-normal input-error'
    const inputKecamatanClass = computed(()=>{
        if (penciptaModel.value.ktp && !penciptaModel.value.kecamatan){
            return 'input input-bordered w-full max-w-lg text-base font-normal input-warning border-2'
        } else {
            return inputClassOk
        }
    })

    const formatDate = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long"
    })

    const ciptaanModel = ref({
        sertifikat: '',
        id: '',
        judul:'',
        jenis:'',
        subJenis: '',
        sumberDana: '',
        kotaCiptaan: '',
        tanggal: '',
        lampiran: '',
        deskripsi: '',
        statusCiptaan: 'Verifikasi',
        pencipta: [],
        pengusul: '',
        biaya: '',
        catatan: '',
        noAplikasi:'',
        noBilling:'',
    })
    
    const kumpulanSubJenisCiptaan = {
        KaryaTulis: ['Cerita Bergambar', 'Diktat', 'Kamus', 'Karya Ilmiah', 'Komik', 'Naskah Drama / Pertunjukan', 'Naskah Film', 'Naskah Karya Sinematografi', 'Novel', 'Puisi'],
        KaryaSeni: ['Alat Peraga', 'Arsitektur', 'Diorama', 'Kaligrafi', 'Karya Seni Batik', 'Karya Seni Rupa', 'Motif Sasirangan', 'Motif Tapis', 'Motif Tenun Ikat', 'Motif Ulos', 'Peta', 'Seni Gambar', 'Seni Ilustrasi', 'Seni Lukis', 'Seni Motif', 'Seni Motif Lainnya', 'Seni Pahat', 'Seni Patung', 'Seni Rupa', 'Seni Songket', 'Seni Terapan', 'Senjata Tradisional', 'Sketsa', 'Ukiran'],
        KomposisiMusik: ['Aransemen', 'Lagu (Musik Dengan Teks)', 'Musik Blues', 'Musik Country', 'Musik Dangdut', 'Musik Jazz', 'Musik Elektronik', 'Musik Funk', 'Musik Gospel', 'Musik Hip Hop', 'Musik Rap', 'Musik Karawitan', 'Musik Klasik', 'Musik Latin', 'Musik Metal', 'Musik Pop', 'Musik Rhythm and Blues', 'Musik Rock', 'Musik Ska, Reggae, Dub', 'Musik Tanpa Teks', 'Musik Tradisional' ],
        KaryaAudioVisual: ['Film Dokumenter', 'Film Iklan', 'Film Kartun', 'Karya Sinematografi' ],
        KaryaFotografi: ['Karya Fotografi'],
        KaryaDramaKoreografi: ['Drama / Pertunjukan', 'Drama Musikal', 'Ketoprak', 'Komedi/Lawak', 'Koreografi', 'Lenong', 'Ludruk', 'Opera', 'Pantomim', 'Pentas Musik', 'Pewayangan', 'Seni Akrobat', 'Seni Pertunjukan', 'Sirkus', 'Sulap', 'Tari (Sendra Tari)'],
        KaryaLainnya: ['Basis data','Kompilasi Ciptaan / Data','Permainan Video','Program Komputer']
    }
    const subJenisCiptaan = computed(() => {
        const newString = ciptaanModel.value['jenis'].replace('&','').replace(' ', '').replace(' ','').replace(' ','')
        return kumpulanSubJenisCiptaan[newString]
    })

    //Kota Pertama Di umumkan
    const daftarKota = ["PIDIE JAYA", "SIMEULUE", "BIREUEN", "ACEH TIMUR", "ACEH UTARA", "PIDIE", "ACEH BARAT DAYA", "GAYO LUES", "ACEH SELATAN", "ACEH TAMIANG", "ACEH BESAR", "ACEH TENGGARA", "BENER MERIAH", "ACEH JAYA", "LHOKSEUMAWE", "ACEH BARAT", "NAGAN RAYA", "LANGSA", "BANDA ACEH", "ACEH SINGKIL", "SABANG", "ACEH TENGAH", "SUBULUSSALAM", "NIAS SELATAN", "MANDAILING NATAL", "DAIRI", "LABUHAN BATU UTARA", "TAPANULI UTARA", "SIMALUNGUN", "LANGKAT", "SERDANG BEDAGAI", "TAPANULI SELATAN", "ASAHAN", "PADANG LAWAS UTARA", "PADANG LAWAS", "LABUHAN BATU SELATAN", "PADANG SIDEMPUAN", "TOBA SAMOSIR", "TAPANULI TENGAH", "HUMBANG HASUNDUTAN", "SIBOLGA", "BATU BARA", "SAMOSIR", "PEMATANG SIANTAR", "LABUHAN BATU", "DELI SERDANG", "GUNUNGSITOLI", "NIAS UTARA", "NIAS", "KARO", "NIAS BARAT", "MEDAN", "PAKPAK BHARAT", "TEBING TINGGI", "BINJAI", "TANJUNG BALAI", "DHARMASRAYA", "SOLOK SELATAN", "SIJUNJUNG (SAWAH LUNTO SIJUNJUNG)", "PASAMAN BARAT", "SOLOK", "PASAMAN", "PARIAMAN", "TANAH DATAR", "PADANG PARIAMAN", "PESISIR SELATAN", "PADANG", "SAWAH LUNTO", "LIMA PULUH KOTO / KOTA", "AGAM", "PAYAKUMBUH", "BUKITTINGGI", "PADANG PANJANG", "KEPULAUAN MENTAWAI", "INDRAGIRI HILIR", "KUANTAN SINGINGI", "PELALAWAN", "PEKANBARU", "ROKAN HILIR", "BENGKALIS", "INDRAGIRI HULU", "ROKAN HULU", "KAMPAR", "KEPULAUAN MERANTI", "DUMAI", "SIAK", "TEBO", "TANJUNG JABUNG BARAT", "MUARO JAMBI", "KERINCI", "MERANGIN", "BUNGO", "TANJUNG JABUNG TIMUR", "SUNGAIPENUH", "BATANG HARI", "JAMBI", "SAROLANGUN", "PALEMBANG", "LAHAT", "OGAN KOMERING ULU TIMUR", "MUSI BANYUASIN", "PAGAR ALAM", "OGAN KOMERING ULU SELATAN", "BANYUASIN", "MUSI RAWAS", "MUARA ENIM", "OGAN KOMERING ULU", "OGAN KOMERING ILIR", "EMPAT LAWANG", "LUBUK LINGGAU", "PRABUMULIH", "OGAN ILIR", "BENGKULU TENGAH", "REJANG LEBONG", "MUKO MUKO", "KAUR", "BENGKULU UTARA", "LEBONG", "KEPAHIANG", "BENGKULU SELATAN", "SELUMA", "BENGKULU", "LAMPUNG UTARA", "WAY KANAN", "LAMPUNG TENGAH", "MESUJI", "PRINGSEWU", "LAMPUNG TIMUR", "LAMPUNG SELATAN", "TULANG BAWANG", "TULANG BAWANG BARAT", "TANGGAMUS", "LAMPUNG BARAT", "PESISIR BARAT", "PESAWARAN", "BANDAR LAMPUNG", "METRO", "BELITUNG", "BELITUNG TIMUR", "BANGKA", "BANGKA SELATAN", "BANGKA BARAT", "PANGKAL PINANG", "BANGKA TENGAH", "KEPULAUAN ANAMBAS", "BINTAN", "NATUNA", "BATAM", "TANJUNG PINANG", "KARIMUN", "LINGGA", "JAKARTA UTARA", "JAKARTA BARAT", "JAKARTA TIMUR", "JAKARTA SELATAN", "JAKARTA PUSAT", "KEPULAUAN SERIBU", "DEPOK", "KARAWANG", "CIREBON", "BANDUNG", "SUKABUMI", "SUMEDANG", "INDRAMAYU", "MAJALENGKA", "KUNINGAN", "TASIKMALAYA", "CIAMIS", "SUBANG", "PURWAKARTA", "BOGOR", "BEKASI", "GARUT", "PANGANDARAN", "CIANJUR", "BANJAR", "BANDUNG BARAT", "CIMAHI", "PURBALINGGA", "KEBUMEN", "MAGELANG", "CILACAP", "BATANG", "BANJARNEGARA", "BLORA", "BREBES", "BANYUMAS", "WONOSOBO", "TEGAL", "PURWOREJO", "PATI", "SUKOHARJO", "KARANGANYAR", "PEKALONGAN", "PEMALANG", "BOYOLALI", "GROBOGAN", "SEMARANG", "DEMAK", "REMBANG", "KLATEN", "KUDUS", "TEMANGGUNG", "SRAGEN", "JEPARA", "WONOGIRI", "KENDAL", "SURAKARTA (SOLO)", "SALATIGA", "SLEMAN", "BANTUL", "YOGYAKARTA", "GUNUNG KIDUL", "KULON PROGO", "GRESIK", "KEDIRI", "SAMPANG", "BANGKALAN", "SUMENEP", "SITUBONDO", "SURABAYA", "JEMBER", "PAMEKASAN", "JOMBANG", "PROBOLINGGO", "BANYUWANGI", "PASURUAN", "BOJONEGORO", "BONDOWOSO", "MAGETAN", "LUMAJANG", "MALANG", "BLITAR", "SIDOARJO", "LAMONGAN", "PACITAN", "TULUNGAGUNG", "MOJOKERTO", "MADIUN", "PONOROGO", "NGAWI", "NGANJUK", "TUBAN", "TRENGGALEK", "BATU", "TANGERANG", "SERANG", "PANDEGLANG", "LEBAK", "TANGERANG SELATAN", "CILEGON", "KLUNGKUNG", "KARANGASEM", "BANGLI", "TABANAN", "GIANYAR", "BADUNG", "JEMBRANA", "BULELENG", "DENPASAR", "MATARAM", "DOMPU", "SUMBAWA BARAT", "SUMBAWA", "LOMBOK TENGAH", "LOMBOK TIMUR", "LOMBOK UTARA", "LOMBOK BARAT", "BIMA", "TIMOR TENGAH SELATAN", "FLORES TIMUR", "ALOR", "ENDE", "NAGEKEO", "KUPANG", "SIKKA", "NGADA", "TIMOR TENGAH UTARA", "BELU", "LEMBATA", "SUMBA BARAT DAYA", "SUMBA BARAT", "SUMBA TENGAH", "SUMBA TIMUR", "ROTE NDAO", "MANGGARAI TIMUR", "MANGGARAI", "SABU RAIJUA", "MANGGARAI BARAT", "LANDAK", "KETAPANG", "SINTANG", "KUBU RAYA", "PONTIANAK", "KAYONG UTARA", "BENGKAYANG", "KAPUAS HULU", "SAMBAS", "SINGKAWANG", "SANGGAU", "MELAWI", "SEKADAU", "KOTAWARINGIN TIMUR", "SUKAMARA", "KOTAWARINGIN BARAT", "BARITO TIMUR", "KAPUAS", "PULANG PISAU", "LAMANDAU", "SERUYAN", "KATINGAN", "BARITO SELATAN", "MURUNG RAYA", "BARITO UTARA", "GUNUNG MAS", "PALANGKA RAYA", "TAPIN", "BANJAR", "HULU SUNGAI TENGAH", "TABALONG", "HULU SUNGAI UTARA", "BALANGAN", "TANAH BUMBU", "BANJARMASIN", "KOTABARU", "TANAH LAUT", "HULU SUNGAI SELATAN", "BARITO KUALA", "BANJARBARU", "KUTAI BARAT", "SAMARINDA", "PASER", "KUTAI KARTANEGARA", "BERAU", "PENAJAM PASER UTARA", "BONTANG", "KUTAI TIMUR", "BALIKPAPAN", "MALINAU", "NUNUKAN", "BULUNGAN (BULONGAN)", "TANA TIDUNG", "TARAKAN", "BOLAANG MONGONDOW (BOLMONG)", "BOLAANG MONGONDOW SELATAN", "MINAHASA SELATAN", "BITUNG", "MINAHASA", "KEPULAUAN SANGIHE", "MINAHASA UTARA", "KEPULAUAN TALAUD", "KEPULAUAN SIAU TAGULANDANG BIARO (SITARO)", "MANADO", "BOLAANG MONGONDOW UTARA", "BOLAANG MONGONDOW TIMUR", "MINAHASA TENGGARA", "KOTAMOBAGU", "TOMOHON", "BANGGAI KEPULAUAN", "TOLI-TOLI", "PARIGI MOUTONG", "BUOL", "DONGGALA", "POSO", "MOROWALI", "TOJO UNA-UNA", "BANGGAI", "SIGI", "PALU", "MAROS", "WAJO", "BONE", "SOPPENG", "SIDENRENG RAPPANG / RAPANG", "TAKALAR", "BARRU", "LUWU TIMUR", "SINJAI", "PANGKAJENE KEPULAUAN", "PINRANG", "JENEPONTO", "PALOPO", "TORAJA UTARA", "LUWU", "BULUKUMBA", "MAKASSAR", "SELAYAR (KEPULAUAN SELAYAR)", "TANA TORAJA", "LUWU UTARA", "BANTAENG", "GOWA", "ENREKANG", "PAREPARE", "KOLAKA", "MUNA", "KONAWE SELATAN", "KENDARI", "KONAWE", "KONAWE UTARA", "KOLAKA UTARA", "BUTON", "BOMBANA", "WAKATOBI", "BAU-BAU", "BUTON UTARA", "GORONTALO UTARA", "BONE BOLANGO", "GORONTALO", "BOALEMO", "POHUWATO", "MAJENE", "MAMUJU", "MAMUJU UTARA", "POLEWALI MANDAR", "MAMASA", "MALUKU TENGGARA BARAT", "MALUKU TENGGARA", "SERAM BAGIAN BARAT", "MALUKU TENGAH", "SERAM BAGIAN TIMUR", "MALUKU BARAT DAYA", "AMBON", "BURU", "BURU SELATAN", "KEPULAUAN ARU", "TUAL", "HALMAHERA BARAT", "TIDORE KEPULAUAN", "TERNATE", "PULAU MOROTAI", "KEPULAUAN SULA", "HALMAHERA SELATAN", "HALMAHERA TENGAH", "HALMAHERA TIMUR", "HALMAHERA UTARA", "YALIMO", "DOGIYAI", "ASMAT", "JAYAPURA", "PANIAI", "MAPPI", "TOLIKARA", "PUNCAK JAYA", "PEGUNUNGAN BINTANG", "JAYAWIJAYA", "LANNY JAYA", "NDUGA", "BIAK NUMFOR", "KEPULAUAN YAPEN (YAPEN WAROPEN)", "PUNCAK", "INTAN JAYA", "WAROPEN", "NABIRE", "MIMIKA", "BOVEN DIGOEL", "YAHUKIMO", "SARMI", "MERAUKE", "DEIYAI (DELIYAI)", "KEEROM", "SUPIORI", "MAMBERAMO RAYA", "MAMBERAMO TENGAH", "RAJA AMPAT", "MANOKWARI SELATAN", "MANOKWARI", "KAIMANA", "MAYBRAT", "SORONG SELATAN", "FAKFAK", "PEGUNUNGAN ARFAK", "TAMBRAUW", "SORONG", "TELUK WONDAMA", "TELUK BINTUNI"]
    const inputKota = ref('')
    function selectItemKota(item){
        ciptaanModel.value['kotaCiptaan'] = item
        errorCiptaan.value['kota'] = false
    }
    function onInputKota(event){
        ciptaanModel.value['kotaCiptaan'] = event.input
    }
    function compositionUpdate(event) {
        inputKota.value.input = event.data
        
    }
    function onBlurKota(event){
        // console.log(daftarKota.value.includes(ciptaanModel.value['kotaCiptaan']))
        if (!daftarKota.includes(event.input)){
            ciptaanModel.value['kotaCiptaan'] = ''
            errorCiptaan.value['kotaCiptaan'] = true
        } else {
            errorCiptaan.value['kotaCiptaan'] = false
        }
    }

    // Deskripsi
    const deskripsiValidation = computed(()=>{
        // remove leading/trailing white space
        let str = ciptaanModel.value['deskripsi'].trim();
        
        // split the string into words using one or more white spaces as delimiter
        const words = str.split(/\s+/);
        
        // return the number of words
        return words.length;
    })

    /////Pencipta
    const alertModal = ref()
    const teksAlert = ref({
        judul: '',
        deskripsi: '', 
        link: '',
    })
    const addModal = ref()
    const modalDelete = ref()
    const labelPencipta = ref('')
    const labelPencipta2 = ref('')
    // const daftarPencipta = ref([])
    const indexPencipta = ref(-1)
    const penciptaModel = ref({
        id: '',
        nama: '',
        nip: '',
        email: '',
        hp: '',
        kewarganegaraan: '',
        negara: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        alamat: '',
        kodepos: '',
        fakultas: '',
        prodi: '',
        ktp:'',
    })

    //Negara dan KEwargananegaraan Pencipta
    const daftarNegara= ["Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Netherlands Antilles", "Angola", "ARIPO", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Bengal", "Bermuda", "Brunei Darussalam", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Burma", "Bouvet Island", "Botswana", "Belarus", "Belize", "Canada", "Cocos Islands", "Democratic Republic of the Congo", "Central African Republic", "Congo", "Switzerland", "Côte d'ivoire", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Czechoslovakia", "Cuba", "Cape Verde", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "OHIM", "European Patent Office", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands (Malvinas)", "Micronesia", "Faroe Islands", "France", "France Metropol", "Gabon", "United Kingdom", "Grenada", "Georgia", "French Guiana", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Honduras", "Croatia", "Haiti", "Hungary", "International Bureau", "Indonesia", "Ireland", "Israel", "ISLE OF MAN", "India", "Isle of Man", "Iraq", "Iran (Islamic Republic of)", "Iceland", "Italy", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "Democratic People's Republic of Korea", "Republic of Korea", "Kuwait", "Cayman Islands", "Kazakhstan", "Lao People's Democratic Republic", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libyan Arab Jamahiriya", "Morocco", "Monaco", "Republic of Moldova", "Madagascar", "Marshall Island", "Macedonia", "Mali", "Myanmar", "Mongolia", "Macao", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "New Zealand", "Oman", "Panama", "Peru", "French Polynesi", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "St.Pierre&amp;Mique", "Pitcairn", "Puerto Rico", "Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "South Rodesia", "Romania", "Serbia", "Russian Federation", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Svalbard&amp;Jan Ma", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "St.Thomas &amp; Pr.", "Suriname", "Sao Tome and Principe", "El Salvador", "Syrian Arab Republic", "Swaziland", "Turks and Caicos Islands", "Chad", "French S. Territories", "Togo", "Thailand", "Tajikistan", "Timor Leste", "Turkmenistan", "Tunisia", "Tonga", "East Timor", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Province of China", "United Republic of Tanzania", "Ukraine", "Uganda", "US Minor island", "United States of America", "Uruguay", "Uzbekistan", "Saint Vincent and the Grenadines", "Venezuela", "Virgin Islands (British)", "US Virgin Islands", "Viet Nam", "Vanuatu", "Wallis&amp;Futana I", "WIPO", "Samoa", "Dem.Yemen", "Yemen", "Mayotte", "Serbia and Montenegro", "South Africa", "Zambia", "Zaire", "Zimbabwe"]
    const inputKewarganegaraanPencipta = ref('')
    const inputNegaraPencipta = ref('')
    function selectItemKewarganegaraan(item){
        penciptaModel.value['kewarganegaraan'] = item
    }
    function onInputKewarganegaraan(event){
        penciptaModel.value['kewarganegaraan'] = event.input
    }
    function compositionUpdateKewarganegaraan(event) {
        inputKewarganegaraanPencipta.value.input = event.data        
    }
    function onBlurKewarganegaraan(event){
        if (!daftarNegara.includes(event.input)){
            penciptaModel.value['kewarganegaraan'] = ''
            error.value['kewarganegaraan'] = true
        } else {
            error.value['kewarganegaraan'] = false
        }
    }
    function selectItemNegara(item){
        penciptaModel.value['negara'] = item
        penciptaModel.value['provinsi'] = ''
        if (item!='Indonesia'){
            penciptaModel.value['provinsi'] = '-'
            penciptaModel.value['kecamatan'] = '-'
            penciptaModel.value['kota'] = '-'
        }
        penciptaModel.value['kota'] = ''
        daftarKotaPencipta.value = ['']
    }
    function onInputNegara(event){
        penciptaModel.value['negara'] = event.input
    }
    function compositionUpdateNegara(event) {
        inputNegaraPencipta.value.input = event.data        
    }
    function onBlurNegara(event){
        if (!daftarNegara.includes(event.input)){
            penciptaModel.value['negara'] = ''
            error.value['negara'] = true
        } else {
            error.value['negara'] = false
        }
    }
    
    //Provinsi Pencipta
    const daftarProvinsi = ['BALI', 'BANGKA BELITUNG', 'BANTEN', 'BENGKULU', 'DI ACEH', 'DI YOGYAKARTA', 'DKI JAKARTA', 'GORONTALO', 'JAMBI', 'JAWA BARAT', 'JAWA TENGAH', 'JAWA TIMUR', 'KALIMANTAN BARAT', 'KALIMANTAN SELATAN', 'KALIMANTAN TENGAH', 'KALIMANTAN TIMUR', 'KALIMANTAN UTARA', 'KEPULAUAN RIAU', 'LAMPUNG', 'MALUKU', 'MALUKU UTARA', 'NUSA TENGGARA BARAT', 'NUSA TENGGARA TIMUR', 'PAPUA', 'PAPUA BARAT', 'RIAU', 'SULAWESI BARAT', 'SULAWESI SELATAN', 'SULAWESI TENGAH', 'SULAWESI TENGGARA', 'SULAWESI UTARA', 'SUMATERA BARAT', 'SUMATERA SELATAN', 'SUMATERA UTARA']
    const inputProvinsiPencipta = ref('')
    function selectItemProvinsi(item){
        penciptaModel.value['provinsi'] = item
        //prepare item kota pencipta
        daftarKotaPencipta.value = kumpulanKotaPencipta[item.replace(' ', '_')]
    }
    function onInputProvinsi(event){
        error.value['provinsi'] = false
        penciptaModel.value['provinsi'] = event.input
        //reset item Kota pencipta  <-- UPDATE DJKI: Tidak perlu reset, list kota dibuat sama
        // inputKotaPencipta.value.clearInput()
        // penciptaModel.value['kota'] = ''
    }
    function compositionUpdateProvinsi(event) {
        inputProvinsiPencipta.value.input = event.data        
    }
    function validateProvinsi(event){
        if (!daftarProvinsi.includes(event.input)){
            penciptaModel.value['provinsi'] = ''
            error.value['provinsi'] = true
        } else {
            error.value['provinsi'] = false
        }
    }
    
    // Kota Pencipta
    const kumpulanKotaPencipta = {
        BALI: ['KOTA DENPASAR', 'KAB. BULELENG', 'KAB. KARANGASEM', 'KAB. BANGLI', 'KAB. KLUNGKUNG', 'KAB. GIANYAR', 'KAB. BADUNG', 'KAB. TABANAN', 'KAB. JEMBRANA'],
        GORONTALO: ['GORONTALO', 'KOTA GORONTALO', 'KAB. POHUWATO', 'KAB. BONE BOLANGO', 'KAB. BOALEMO', 'KAB. GORONTALO', 'KAB. GORONTALO UTARA'],
        DI_ACEH: ['KOTA BANDA ACEH', 'KOTA SABANG', 'KOTA LHOKSEUMAWE', 'KOTA LANGSA', 'KOTA SUBULUSSALAM', 'KAB. ACEH SELATAN', 'KAB. ACEH TENGGARA', 'KAB. ACEH TIMUR', 'KAB. ACEH TENGAH', 'KAB. ACEH BARAT', 'KAB. ACEH BESAR', 'KAB. PIDIE', 'KAB. ACEH UTARA', 'KAB. SIMEULUE', 'KAB. ACEH SINGKIL', 'KAB. BIREUN', 'KAB. ACEH BARAT DAYA', 'KAB. GAYO LUES', 'KAB. ACEH JAYA', 'KAB. NAGAN RAYA', 'KAB. ACEH TAMIANG', 'KAB. BENER MERIAH', 'KAB. PIDIE JAYA'],
        SUMATERA_UTARA: ['KOTA MEDAN', 'KOTA PEMATANG SIANTAR', 'KOTA SIBOLGA', 'KOTA TANJUNG BALAI', 'KOTA BINJAI', 'KOTA TEBING TINGGI', 'KOTA PADANG SIDEMPUAN', 'KOTA GUNUNG SITOLI', 'KAB. SERDANG BEDAGAI', 'KAB. SAMOSIR ', 'KAB. HUMBANG HASUNDUTAN', 'KAB. PAKPAK BHARAT', 'KAB. NIAS SELATAN', 'KAB. MANDAILING NATAL', 'KAB. TOBA SAMOSIR', 'KAB. DAIRI', 'KAB. LABUHAN BATU', 'KAB. ASAHAN', 'KAB. SIMALUNGUN', 'KAB. DELI SERDANG', 'KAB. KARO', 'KAB. LANGKAT', 'KAB. NIAS', 'KAB. TAPANULI SELATAN', 'KAB. TAPANULI UTARA', 'KAB. TAPANULI TENGAH', 'KAB. BATU BARA', 'KAB. PADANG LAWAS UTARA', 'KAB. PADANG LAWAS', 'KAB. LABUHANBATU SELATAN', 'KAB. LABUHANBATU UTARA', 'KAB. NIAS UTARA', 'KAB. NIAS BARAT' ],
        SUMATERA_BARAT: ['KOTA PADANG', 'KOTA SOLOK', 'KOTA SAWHLUNTO', 'KOTA PADANG PANJANG', 'KOTA BUKITTINGGI', 'KOTA PAYAKUMBUH', 'KOTA PARIAMAN', 'KAB. PASAMAN BARAT', 'KAB. SOLOK SELATAN', 'KAB. DHARMASRAYA', 'KAB. KEPULAUAN MENTAWAI', 'KAB. PASAMAN', 'KAB. LIMA PULUH KOTA', 'KAB. AGAM', 'KAB. PADANG PARIAMAN', 'KAB. TANAH DATAR', 'KAB. SIJUNJUNG', 'KAB. SOLOK', 'KAB. PESISIR SELATAN'],
        BALI: ['KOTA DENPASAR', 'KAB. BULELENG', 'KAB. KARANGASEM', 'KAB. BANGLI', 'KAB. KLUNGKUNG', 'KAB. GIANYAR', 'KAB. BADUNG', 'KAB. TABANAN', 'KAB. JEMBRANA'],
        BANGKA_BELITUNG: ['KOTA PANGKAL PINANG', 'KAB. BELITUNG TIMUR', 'KAB. BANGKA BARAT', 'KAB. BANGKA TENGAH', 'KAB. BANGKA SELATAN', 'KAB. BELITUNG', 'KAB. BANGKA'],
        BANTEN: ['KOTA SERANG', 'KOTA CILEGON', 'KOTA TANGERANG', 'KOTA TANGERANG SELATAN', 'KAB. SERANG', 'KAB. TANGERANG', 'KAB. LEBAK', 'KAB. PANDEGLANG'],
        BENGKULU: ['KOTA BENGKULU', 'KAB. BENGKULU TENGAH', 'KAB. KEPAHIANG ', 'KAB. LEBONG', 'KAB. MUKO MUKO', 'KAB. SELUMA', 'KAB. KAUR', 'KAB. BENGKULU UTARA', 'KAB. REJANG LEBONG', 'KAB. BENGKULU SELATAN'],
        DI_YOGYAKARTA: ['KOTA YOGYAKARTA', 'KAB. SLEMAN', 'KAB. GUNUNG KIDUL', 'KAB. BANTUL', 'KAB. KULON PROGO'],
        DKI_JAKARTA: ['KOTA JAKARTA TIMUR', 'KOTA JAKARTA SELATAN', 'KOTA JAKARTA BARAT', 'KOTA JAKARTA UTARA', 'KOTA JAKARTA PUSAT', 'KAB. KEPULAUAN SERIBU'],
        GORONTALO: ['GORONTALO', 'KOTA GORONTALO', 'KAB. POHUWATO', 'KAB. BONE BOLANGO', 'KAB. BOALEMO', 'KAB. GORONTALO', 'KAB. GORONTALO UTARA'],
        JAMBI: ['KOTA JAMBI', 'KOTA SUNGAI PENUH', 'KAB. TEBO', 'KAB. BUNGO', 'KAB. TANJUNG JABUNG TIMUR', 'KAB. TANJUNG JABUNG BARAT', 'KAB. MUARO JAMBI', 'KAB. BATANGHARI', 'KAB. SAROLANGUN', 'KAB. MERANGIN', 'KAB. KERINCI'],
        JAWA_BARAT: ['KOTA BANDUNG', 'KOTA BANJAR', 'KOTA TASIKMALAYA', 'KOTA CIMAHI', 'KOTA DEPOK', 'KOTA BEKASI', 'KOTA CIREBON', 'KOTA SUKABUMI', 'KOTA BOGOR', 'KAB. PANGANDARAN', 'KAB. BANDUNG BARAT', 'KAB. BEKASI', 'KAB. KARAWANG', 'KAB. PURWAKARTA', 'KAB. SUBANG', 'KAB. INDRAMAYU', 'KAB. SUMEDANG', 'KAB. MAJALENGKA', 'KAB. CIREBON', 'KAB. KUNINGAN', 'KAB. CIAMIS', 'KAB. TASIKMALAYA', 'KAB. GARUT', 'KAB. BANDUNG', 'KAB. CIANJUR', 'KAB. SUKABUMI', 'KAB. BOGOR'],
        JAWA_TENGAH: ['KOTA SEMARANG', 'KOTA TEGAL', 'KOTA PEKALONGAN', 'KOTA SALATIGA', 'KOTA SURAKARTA', 'KOTA MAGELANG', 'KAB. BREBES', 'KAB. TEGAL', 'KAB. PEMALANG', 'KAB. PEKALONGAN', 'KAB. BATANG', 'KAB. KENDAL', 'KAB. TEMANGGUNG', 'KAB. SEMARANG', 'KAB. DEMAK', 'KAB. JEPARA', 'KAB. KUDUS', 'KAB. PATI', 'KAB. REMBANG', 'KAB. BLORA', 'KAB. GROBOGAN', 'KAB. SRAGEN', 'KAB. KARANGANYAR', 'KAB. WONOGIRI', 'KAB. SUKOHARJO', 'KAB. KLATEN', 'KAB. BOYOLALI', 'KAB. MAGELANG', 'KAB. WONOSOBO', 'KAB. PURWOREJO', 'KAB. KEBUMEN', 'KAB. BANJARNEGARA', 'KAB. PURBALINGGA', 'KAB. BANYUMAS', 'KAB. CILACAP'],
        JAWA_TIMUR: ['KOTA SURABAYA', 'KOTA BATU', 'KOTA MADIUN', 'KOTA MOJOKERTO', 'KOTA PASURUAN', 'KOTA PROBOLINGGO', 'KOTA MALANG', 'KOTA BLITAR', 'KOTA KEDIRI', 'KAB. SUMENEP', 'KAB. PAMEKASAN', 'KAB. SAMPANG', 'KAB. BANGKALAN', 'KAB. GRESIK', 'KAB. LAMONGAN', 'KAB. TUBAN', 'KAB. BOJONEGORO', 'KAB. NGAWI', 'KAB. MAGETAN', 'KAB. MADIUN', 'KAB. NGANJUK', 'KAB. JOMBANG', 'KAB. MOJOKERTO', 'KAB. SIDOARJO', 'KAB. PASURUAN', 'KAB. PROBOLINGGO', 'KAB. SITUBONDO', 'KAB. BONDOWOSO', 'KAB. BANYUWANGI', 'KAB. JEMBER', 'KAB. LUMAJANG', 'KAB. MALANG', 'KAB. KEDIRI', 'KAB. BLITAR', 'KAB. TULUNGAGUNG', 'KAB. TRENGGALEK', 'KAB. PONOROGO', 'KAB. PACITAN'],
        KALIMANTAN_BARAT: ['KOTA PONTIANAK', 'KOTA SINGKAWANG', 'KAB. KUBU RAYA', 'KAB. KAYONG UTARA', 'KAB. SEKADAU', 'KAB. MELAWI', 'KAB. LANDAK', 'KAB. BENGKAYANG', 'KAB. KAPUAS HULU', 'KAB. SINTANG ', 'KAB. KETAPANG', 'KAB. SANGGAU ', 'KAB. MEMPAWAH', 'KAB. SAMBAS'],
        KALIMANTAN_SELATAN: ['KOTA BANJARMASIN', 'KOTA BANJARBARU', 'KAB. BALANGAN', 'KAB. TANAH BAMBU', 'KAB. TABALONG', 'KAB. HULU SUNGAI UTARA', 'KAB. HULU SUNGAI TENGAH', 'KAB. HULU SUNGAI SELATAN', 'KAB. TAPIN', 'KAB. BARITO KUALA', 'KAB. BANJAR', 'KAB. KOTABARU', 'KAB. TANAH LAUT'],
        KALIMANTAN_TENGAH: ['KOTA PALANGKARAYA', 'KAB. BARITO TIMUR', 'KAB. MURUNG RAYA', 'KAB. PULANG PISAU', 'KAB. GUNUNG MAS', 'KAB. LAMANDAU', 'KAB. SUKAMARA', 'KAB. SERUYAN', 'KAB. KATINGAN', 'KAB. BARITO UTARA', 'KAB. BARITO SELATAN', 'KAB. KAPUAS', 'KAB. KOTAWARINGIN TIMUR', 'KAB. KOTAWARINGIN BARAT'],
        KALIMANTAN_TIMUR: ['KOTA SAMARINDA', 'KOTA BONTANG', 'KOTA BALIKPAPAN', 'KAB. MAHAKAM ULU', 'KAB. PENAJAM PASER UTARA', 'KAB. KUTAI TIMUR', 'KAB. KUTAI BARAT', 'KAB. BERAU', 'KAB. KUTAI KERTANEGARA', 'KAB. PASER'],
        KALIMANTAN_UTARA: ['KOTA TARAKAN', 'KAB. TANA TIDUNG', 'KAB. NUNUKAN', 'KAB. MALINAU', 'KAB. BULUNGAN'],
        KEPULAUAN_RIAU: ['KOTA BATAM', 'KOTA TANJUNG PINANG', 'KAB. KEPULAUAN ANAMBAS', 'KAB. LINGGA ', 'KAB. NATUNA', 'KAB. KARIMUN', 'KAB. BINTAN'],
        LAMPUNG: ['KOTA BANDAR LAMPUNG', 'KOTA METRO', 'KAB. PESISIR BARAT', 'KAB. TULANGBAWANG BARAT', 'KAB. MESUJI', 'KAB. PRINGSEWU', 'KAB. PESAWARAN', 'KAB. WAY KANAN', 'KAB. LAMPUNG TIMUR', 'KAB. TANGGAMUS', 'KAB. TULANG BAWANG', 'KAB. LAMPUNG BARAT', 'KAB. LAMPUNG UTARA', 'KAB. LAMPUNG TENGAH', 'KAB. LAMPUNG SELATAN'],
        MALUKU: ['KOTA AMBON', 'KOTA TUAL', 'KAB. BURU SELATAN', 'KAB. MALUKU BARAT DAYA', 'KAB. KEPULAUAN ARU', 'KAB. SERAM BAGIAN BARAT ', 'KAB. SERAM BAGIAN TIMUR', 'KAB. BURU', 'KAB. MALUKU TENGGARA BARAT', 'KAB. MALUKU TENGGARA', 'KAB. MALUKU TENGAH'],
        MALUKU_UTARA: ['KOTA TERNATE', 'KOTA TIDORE KEPULAUAN', 'KAB. PULAU TALIABU', 'KAB. PULAU MOROTAI', 'KAB. HALMAHERA TIMUR', 'KAB. KEPULAUAN SULA', 'KAB. HALMAHERA SELATAN', 'KAB. HALMAHERA UTARA', 'KAB. HALMAHERA TENGAH', 'KAB. HALMAHERA BARAT'],
        NUSA_TENGGARA_BARAT: ['KOTA MATARAM', 'KOTA BIMA', 'KAB. LOMBOK UTARA', 'KAB. SUMBAWA BARAT', 'KAB. BIMA', 'KAB. DOMPU', 'KAB. SUMBAWA ', 'KAB. LOMBOK TIMUR', 'KAB. LOMBOK TENGAH', 'KAB. LOMBOK BARAT'],
        NUSA_TENGGARA_TIMUR: ['KOTA KUPANG', 'KAB. MALAKA', 'KAB. SABU RAIJUA', 'KAB. MANGGARAI TIMUR', 'KAB. SUMBA BARAT DAYA', 'KAB. SUMBA TENGAH', 'KAB. NAGEKEO', 'KAB. MANGGARAI BARAT', 'KAB. ROTE NDAO', 'KAB. LEMBATA', 'KAB. SUMBA BARAT', 'KAB. SUMBA TIMUR', 'KAB. MANGGARAI', 'KAB. NGADA', 'KAB. ENDE', 'KAB. SIKKA', 'KAB. FLORES TIMUR', 'KAB. ALOR', 'KAB. BELU', 'KAB. TIMOR TENGAH UTARA', 'KAB. TIMOR TENGAH SELATAN', 'KAB. KUPANG'],
        PAPUA: ['KOTA JAYAPURA', 'KAB. DEIYAI', 'KAB. INTAN JAYA', 'KAB. DOGIYAI', 'KAB. PUNCAK', 'KAB. NDUGA', 'KAB. LANNY JAYA', 'KAB. YALIMO', 'KAB. MAMBERAMO TENGAH', 'KAB. MAMBERAMO RAYA', 'KAB. SUPIORI', 'KAB. ASMAT', 'KAB. MAPPI', 'KAB. BOVEN DIGOEL', 'KAB. WAROPEN', 'KAB. TOLIKARA', 'KAB. YAHUKIMO', 'KAB. PEGUNUNGAN BINTANG', 'KAB. KEEROM', 'KAB. SARMI', 'KAB. MIMIKA', 'KAB. PANIAI', 'KAB. PUNCAK JAYA', 'KAB. BIAK NUMFOR', 'KAB. KEPULAUAN YAPEN', 'KAB. NABIRE', 'KAB. JAYAPURA', 'KAB. JAYAWIJAYA', 'KAB. MERAUKE'],
        PAPUA_BARAT: ['KOTA SORONG', 'KAB. PEGUNUNGAN ARFAK', 'KAB. MANOKWARI SELATAN', 'KAB. MAYBRAT', 'KAB. TAMBRAUW', 'KAB. KAIMANA', 'KAB. TELUK WONDAMA', 'KAB. TELUK BINTUNI', 'KAB. RAJA AMPAT', 'KAB. SORONG SELATAN', 'KAB. FAK FAK', 'KAB. MANOKWARI', 'KAB. SORONG'],
        RIAU: ['KOTA PEKAN BARU', 'KOTA DUMAI', 'KAB. KEPULAUAN MERANTI', 'KAB. KUANTAN SINGINGI', 'KAB. SIAK', 'KAB. ROKAN HILIR', 'KAB. ROKAN HULU', 'KAB. PELALAWAN', 'KAB. INDRAGIRI HILIR', 'KAB. BENGKALIS', 'KAB. INDRAGIRI HULU', 'KAB. KAMPAR'],
        SULAWESI_BARAT: ['KAB. MAJENE', 'KAB. POLOWALI MANDAR', 'KAB. MAMASA', 'KAB. MAMUJU', 'KAB. MAMUJU UTARA', 'KAB. MAMUJU TENGAH'],
        SULAWESI_SELATAN: ['KOTA MAKASAR', 'KOTA PALOPO', 'KOTA PARE PARE', 'KAB. TORAJA UTARA', 'KAB. LUWU TIMUR', 'KAB. LUWU UTARA', 'KAB. TANA TORAJA', 'KAB. LUWU', 'KAB. ENREKANG', 'KAB. PINRANG', 'KAB. SIDENRENG RAPPANG', 'KAB. WAJO', 'KAB. SOPPENG', 'KAB. BARRU', 'KAB. PANGKAJENE KEPULAUAN', 'KAB. MAROS', 'KAB. BONE', 'KAB. SINJAI', 'KAB. GOWA', 'KAB. TAKALAR', 'KAB. JENEPONTO', 'KAB. BANTAENG', 'KAB. BULUKUMBA', 'KAB. KEPULAUAN SELAYAR'],
        SULAWESI_TENGAH: ['KOTA PALU', 'KAB. MOROWALI UTARA', 'KAB. BANGGAI LAUT', 'KAB. SIGI', 'KAB. TOJO UNA-UNA', 'KAB. PARIGI MOUTONG', 'KAB. BANGGAI KEPULAUAN', 'KAB. MOROWALI', 'KAB. BUOL', 'KAB. TOLI-TOLI', 'KAB. DONGGALA', 'KAB. POSO', 'KAB. BANGGAI'],
        SULAWESI_TENGGARA: ['KOTA KENDARI', 'KOTA BAU BAU', 'KAB. BUTON SELATAN', 'KAB. BUTON TENGAH', 'KAB. MUNA BARAT', 'KAB. KONAWE KEPULAUAN', 'KAB. KOLAKA TIMUR', 'KAB. BUTON UTARA', 'KAB. KONAWE UTARA', 'KAB. KOLAKA UTARA', 'KAB. WAKATOBI', 'KAB. BOMBANA', 'KAB. KONAWE SELATAN', 'KAB. BUTON', 'KAB. MUNA', 'KAB. KONAWE', 'KAB. KOLAKA'],
        SULAWESI_UTARA: ['KOTA MANADO', 'KOTA TOMOHON', 'KOTA BITUNG', 'KOTA KOTAMOBAGU', 'KAB. BOLAANG MANGONDOW SELATAN', 'KAB. BOLAANG MANGONDOW TIMUR', 'KAB. KEPULAUAN SIAU TAGULANDANG BIARO', 'KAB. BOLAANG MANGONDOW UTARA', 'KAB. MINAHASA TENGGARA', 'KAB. MINAHASA UTARA', 'KAB. MINAHASA SELATAN', 'KAB. KEPULAUAN TALAUD', 'KAB. KEPULAUAN SANGIHE', 'KAB. MINAHASA', 'KAB. BOLAANG MANGONDOW'],
        SUMATERA_SELATAN: ['KAB. BANYUASIN', 'KAB. EMPAT LAWANG', 'KAB. LAHAT', 'KAB. MUARA ENIM', 'KAB. MUSI BANYUASIN', 'KAB. MUSI RAWAS', 'KAB. MUSI RAWAS UTARA', 'KAB. OGAN ILIR', 'KAB. OGAN KOMERING ILIR', 'KAB. OGAN KOMERING ULU', 'KAB. OGAN KOMERING ULU SELATAN', 'KAB. OGAN KOMERING ULU TIMUR', 'KAB. PENUKAL ABAB LEMATANG ILIR', 'KOTA LUBUK LINGGAU', 'KOTA PAGAR ALAM', 'KOTA PALEMBANG', 'KOTA PRABUMULIH']
    }    
    const daftarKotaPencipta = ref([])
    const inputKotaPencipta = ref('')
    function selectItemKotaPencipta(item){
        penciptaModel.value['kota'] = item
    }
    function onInputKotaPencipta(event){
        penciptaModel.value['kota'] = event.input
    }
    function compositionUpdateKota(event) {
        inputKotaPencipta.value.input = event.data        
    }
    function validateKotaPencipta(event){
        // if (!daftarKotaPencipta.value.includes(event.input)){
        //     if(penciptaModel.value['negara']!='Indonesia'){
        //         penciptaModel.value['kota'] = event.input 
        //     } else {
        //         penciptaModel.value['kota'] = ''
        //         error.value['kota'] = true
        //     }
        // } else {
        //     error.value['kota'] = false
        // }

        // UPDATE DJKI: Tidak perlu reset, list kota dibuat sama
        if (!daftarKota.includes(event.input)){
            penciptaModel.value['kota'] = ''
            error.value['kota'] = true
        } else {
            error.value['kota'] = false
        }
    }

    // Kecamatan Pencipta
    // console.log(daftarKecamatan)
    // console.log(Array.from(new Set(daftarKecamatan)))
    

    const daftarKecamatanPencipta = ref([])
    const inputKecamatanPencipta = ref('')
    function selectItemKecamatanPencipta(item){
        penciptaModel.value['kecamatan'] = item
    }
    function onInputKecamatanPencipta(event){
        penciptaModel.value['kecamatan'] = event.input
    }
    function compositionUpdateKecamatan(event) {
        inputKecamatanPencipta.value.input = event.data        
    }
    function validateKecamatanPencipta(event){
        // if (!daftarKotaPencipta.value.includes(event.input)){
        //     if(penciptaModel.value['negara']!='Indonesia'){
        //         penciptaModel.value['kota'] = event.input 
        //     } else {
        //         penciptaModel.value['kota'] = ''
        //         error.value['kota'] = true
        //     }
        // } else {
        //     error.value['kota'] = false
        // }

        // UPDATE DJKI: Tidak perlu reset, list kota dibuat sama
        if (!daftarKecamatan.includes(event.input)){
            penciptaModel.value['kecamatan'] = ''
            error.value['kecamatan'] = true
        } else {
            error.value['kecamatan'] = false
        }
    }

    //Fakultas Pencipta
    const daftarFakultas = ['FIP', 'FS', 'FMIPA', 'FEB', 'FT', 'FIK', 'FIS', 'FPPSI', 'PASCASARJANA', 'FV', 'FK', 'Tendik Non Fakultas', 'Non UM']
    const inputFakultas = ref('')
    function selectItemFakultas(item){
        penciptaModel.value['fakultas'] = item
        //prepare item prodi
        daftarProdi.value = kumpulanProdi[item]
        if(item=='Tendik Non Fakultas' || item=='Non UM'){
            penciptaModel.value['prodi'] = item
            daftarProdi.value = ['-']
        } else {
            error.value['provinsi'] = false
        }
    }
    function onInputFakultas(event){
        error.value['fakultas'] = false
        penciptaModel.value['fakultas'] = event.input
        //reset item prodi
        inputProdi.value.clearInput()
        penciptaModel.value['prodi'] = ''
    }
    function compositionUpdateFakultas(event) {
        inputFakultas.value.input = event.data        
    }
    function validateFakultas(event){
        if(!daftarFakultas.includes(event.input)){
            penciptaModel.value['fakultas'] = ''
            error.value['fakultas'] = true
        } else {
            error.value['fakultas'] = false
        }
    }

    //Prodi Pencipta
    const kumpulanProdi = {
        FIP: ['S1 Administrasi Pendidikan', 'S1 Bimbingan dan Konseling', 'S1 Pendidikan Guru Pendidikan Anak Usia Dini', 'S1 Pendidikan Guru Sekolah Dasar', 'S1 Pendidikan Luar Biasa', 'S1 Pendidikan Luar Sekolah', 'S1 Teknologi Pendidikan', 'S2 Bimbingan dan Konseling', 'S2 Teknologi Pembelajaran', 'S2 Manajemen Pendidikan', 'S2 Pendidikan Luar Sekolah', 'S2 Pendidikan Anak Usia Dini', 'S2 Pendidikan Khusus', 'S3 Bimbingan dan Konseling', 'S3 Teknologi Pembelajaran', 'S3 Manajemen Pendidikan (Jalur Perkuliahan dan Jalur Penelitian)', 'S3 Pendidikan Luar Sekolah'],
        FS: ['S1 Bahasa dan Sastra Indonesia', 'S1 Pendidikan Bahasa Sastra Indonesia dan Daerah', 'S1 Bahasa dan Sastra Inggris', 'S1 Pendidikan Bahasa Inggris', 'S1 Ilmu Perpustakaan', 'S1 Pendidikan Bahasa Arab', 'S1 Pendidikan Bahasa Jerman', 'S1 Pendidikan Bahasa Mandarin', 'S1 Pendidikan Seni Rupa', 'S1 Desain Komunikasi Visual', 'S1 Pendidikan Seni Tari dan Musik', 'S2 Pendidikan Bahasa Indonesia', 'S2 Keguruan Bahasa', 'S2 Pendidikan Bahasa Inggris', 'S2 Keguruan Bahasa Arab', 'S2 Keguruan Seni Rupa', 'S3 Pendidikan Bahasa Indonesia', 'S3 Pendidikan Bahasa Inggris'],
        FMIPA: ['S1 Biologi', 'S1 Pendidikan Biologi', 'S1 Bioteknologi', 'S1 Fisika', 'S1 Pendidikan Fisika', 'S1 Kimia', 'S1 Pendidikan Kimia', 'S1 Matematika', 'S1 Pendidikan Matematika', 'S1 Pendidikan Ilmu Pengetahuan Alam', 'S2 Pendidikan Matematika', 'S2 Matematika', 'S2 Pendidikan Fisika', 'S2 Fisika', 'S2 Pendidikan Kimia', 'S2 Kimia', 'S2 Pendidikan Biologi', 'S2 Biologi', 'S3 Pendidikan Matematika', 'S3 Pendidikan Fisika', 'S3 Pendidikan Kimia', 'S3 Pendidikan Biologi'],
        FEB: ['S1 Akuntansi', 'S1 Pendidikan Akuntansi', 'S1 Pendidikan Ekonomi', 'S1 Ekonomi Pembangunan', 'S1 Manajemen', 'S1 Pendidikan Administrasi Perkantoran', 'S1 Pendidikan Tata Niaga', 'S2 Manajemen', 'S2 Pendidikan Bisnis dan Manajemen', 'S2 Akuntansi', 'S2 Pendidikan Ekonomi', 'S2 Ilmu Ekonomi', 'S3 Pendidikan Ekonomi', 'S3 llmu Manajemen'],
        FT: ['S1 Teknik Mesin', 'S1 Pendidikan Teknik Mesin', 'S1 Teknik Industri', 'S1 Pendidikan Teknik Otomotif', 'S1 Teknik Sipil', 'S1 Pendidikan Teknik Bangunan', 'S1 Teknik Elektro', 'S1 Pendidikan Teknik Elektro', 'S1 Teknik Informatika', 'S1 Pendidikan Teknik Informatika', 'S1 Pendidikan Tata Busana', 'S1 Pendidikan Tata Boga', 'S2 Teknik Mesin', 'S2 Teknik Sipil', 'S2 Teknik Elektro', 'S2 Pendidikan Kejuruan', 'S3 Pendidikan Kejuruan'],
        FIK: ['S1 Pendidikan Jasmani dan Kesehatan', 'S1 Pendidikan Kepelatihan Olahraga', 'S1 Ilmu Keolahragaan', 'S1 Ilmu Kesehatan Masyarakat', 'S2 Pendidikan Olahraga'],
        FIS: ['S1 Geografi', 'S1 Pendidikan Geografi', 'S1 Ilmu Sejarah', 'S1 Pendidikan Sejarah', 'S1 Pendidikan Pancasila dan Kewarganegaraan (PPKn)', 'S1 Pendidikan Ilmu Pengetahuan Sosial', 'S1 Pendidikan Sosiologi', 'S2 Pendidikan Pancasila dan Kewarganegaraan', 'S2 Pendidikan Geografi', 'S2 Pendidikan Sejarah', 'S3 Pendidikan Geografi'],
        FPPSI: ['S1 Psikologi', 'S2 Psikologi Pendidikan'],
        PASCASARJANA: ['S2 Pendidikan Dasar', 'S3 Pendidikan Dasar'],
        FV: ['D4 Perpustakaan Digital', 'D4 Animasi', 'D4 Manajemen Pemasaran', 'D4 Akuntansi', 'D4 Teknologi Rekayasa Manufaktur', 'D4 Teknologi Rekayasa Otomotif', 'D4 Teknologi Rekayasa dan Pemeliharaan Bangunan Sipil', 'D4 Teknologi Rekayasa Pembangkit Energi', 'D4 Teknologi Rekayasa Sistem Elektronika', 'D4 Tata Boga', 'D4 Desain Mode'],
        FK: ['S1 Kedokteran', 'S1 Keperawatan', 'S1 Kebidanan']
    }
    const daftarProdi = ref([])
    const inputProdi = ref('')
    function selectItemProdi(item){
        penciptaModel.value['prodi'] = item
    }
    function onInputProdi(event){
        penciptaModel.value['prodi'] = event.input
        error.value['prodi'] = false
    }
    function compositionUpdateProdi(event) {
        inputProdi.value.input = event.data        
    }
    function validateProdi(event){
        if(!daftarProdi.value.includes(event.input)){
            // inputProdi.value.clearInput()
            penciptaModel.value['prodi'] = ''
            error.value['prodi'] = true
        } else {
            error.value['prodi'] = false
        }
    }

    function newPencipta(){
        indexPencipta.value = -1
        labelPencipta.value = 'Tambahkan'
        labelPencipta2.value = 'Pencipta Baru'
        penciptaModel.value.id = ciptaanModel.value['pencipta'].length + 1
        penciptaModel.value.kewarganegaraan = 'Indonesia'
        penciptaModel.value.negara = 'Indonesia'
    }
    
    let itemsTobeDelete
    function deletePencipta(){
        const itemID = ciptaanModel.value['pencipta'].indexOf(itemsTobeDelete)
        ciptaanModel.value['pencipta'].splice(itemID, 1)
        ciptaanModel.value['pencipta'].forEach((element, index) => {
            element.id = index+1
        });
    }
    
    function editPencipta(item){
        labelPencipta.value = 'Simpan'
        labelPencipta2.value = 'Edit Pencipta'
        const itemID = ciptaanModel.value['pencipta'].indexOf(item)
        indexPencipta.value = itemID
        penciptaModel.value = Object.assign({}, ciptaanModel.value['pencipta'][itemID])
    }

    // KTP Pencipta
    const cropper = ref('')
    const imgSrc =  ref('')
    const inputKTP = ref('')
    function resetCrop() {
      cropper.value.reset();
      penciptaModel.value['ktp'] = ''
      inputKTP.value.value = null

    }
    function cropImage() {
      penciptaModel.value['ktp'] = cropper.value.getCroppedCanvas().toDataURL('image/jpeg', 0.7)
    //   console.log(penciptaModel.value['ktp'])
      imgSrc.value =''
    }
    function setImage(event) {
        if (event.target.files[0].type != 'image/jpeg'){
            inputKTP.value.value = ''
            showAlert('Ups! Format filenya harus .jpg', '')
            return
        }
        if (event.target.files[0].size > 1100000){
            inputKTP.value.value = ''
            showAlert('Ups! Filenya terlalu besar', 'Pilih file maksimal 1MB ya')
            return
        }
        imgSrc.value = URL.createObjectURL(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
          imgSrc.value = event.target.result;
          // rebuild cropperjs with the updated source
          cropper.value.replace(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    function rotate(deg) {
      cropper.value.rotate(deg);
    }
    function zoom(percent) {
      cropper.value.relativeZoom(percent);
    }

    let sizeLimit
    let alertSize
    const inputLampiran = ref()
    const acceptType = computed(() => {
        if (ciptaanModel.value['jenis'] == 'Karya Audio Visual'){
            sizeLimit = 11000000
            alertSize = '10MB'
            return 'video/mp4'
        } else if (ciptaanModel.value['jenis'] == 'Komposisi Musik')  {
            sizeLimit = 3500000
            alertSize = '3MB'
            return 'audio/mp3'
        }
        else {
            sizeLimit = 2500000
            alertSize = '2MB'
            return 'application/pdf'
        } 
    })
    function setFile(event) {
        // console.log(event.target.files[0])
        // const file = URL.createObjectURL(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            const blob = e.target.result
            // console.log(blob);

            ciptaanModel.value['lampiran'] = blob
        };
        reader.readAsDataURL(event.target.files[0])
        // console.log(event.target.files[0].size)
        const fileSize = event.target.files[0].size
        if (fileSize > sizeLimit){
            inputLampiran.value.value = null
            // alert('File maksimum: ' + alertSize)
            showAlert('Ups! Filenya terlalu besar', 'Pilih file maksimal ' + alertSize + ' ya')
        }
    }

    //Tombol tambah pencipta
    function tambahPencipta(){
        //validate first
        if (validatePencipta() == false) {
            showAlert('Ups! Data tidak lengkap', 'Mohon pastikan seluruh data telah terisi dengan benar')
        }
        else {
            // simpan data pencipta
            if (indexPencipta.value<0){
                ciptaanModel.value['pencipta'].push(penciptaModel.value)
            } else {
                Object.assign(ciptaanModel.value['pencipta'][indexPencipta.value], penciptaModel.value)
            }
            //reset before close modal
            resetPencipta()
            //close modal
            addModal.value = false
        }
    }
    
    //copy pencipta
    const callback = async data => {
        await data.forEach(element => {
            if (ciptaanModel.value['pencipta'].indexOf(element) == -1){
                //ganti id dulu
                const newID = ciptaanModel.value['pencipta'].length+1
                element.id = newID
                //tambahkan ke daftar pencipta
                ciptaanModel.value['pencipta'].push(element)
            } else {
                showAlert('Data sudah ada', '')
            }
        });
    } 

    //Reset semua form pencipta
    function resetPencipta(){
        imgSrc.value = ''
        penciptaModel.value = {
        id: '',
        nama: '',
        nip: '',
        email: '',
        hp: '',
        kewarganegaraan: 'Indonesia',
        negara: 'Indonesia',
        provinsi: '',
        kota: '',
        alamat: '',
        kodepos: '',
        fakultas: '',
        prodi: '',
        ktp: ''
        }
        daftarKotaPencipta.value = []
        daftarProdi.value = []
        inputKewarganegaraanPencipta.value.clearInput()
        inputNegaraPencipta.value.clearInput()
        inputProvinsiPencipta.value.clearInput()
        inputKotaPencipta.value.clearInput()
        inputFakultas.value.clearInput()
        inputProdi.value.clearInput()
        error.value = {
            nama: false,
            nip: false,
            email: false,
            hp: false,
            alamat: false,
            kodepos: false,
            kewarganegaraan: false,
            negara: false,
            provinsi: false,
            kota: false,
            fakultas: false,
            prodi: false,
        }
        resetCrop()
    }
    
    //validasi  pencipta
    const error = ref({
        nama: false,
        nip: false,
        email: false,
        hp: false,
        alamat: false,
        kodepos: false,
        kewarganegaraan: false,
        negara: false,
        provinsi: false,
        kota: false,
        kecamatan: false,
        fakultas: false,
        prodi: false,
    })
    function validateInputPencipta(target){
        if (penciptaModel.value[target]==''){
            error.value[target] = true
        }
    }
    function validatePencipta(){
        let hasil = true
        if (penciptaModel.value['negara']!='Indonesia'){
            penciptaModel.value['kota']='-'
        }
        for (let i = 0; i < Object.keys(penciptaModel.value).length; i++){
            const idObject = Object.keys(penciptaModel.value)[i]
            if (penciptaModel.value[idObject] == '' || penciptaModel.value[idObject] == null){
                console.error(Object.keys(penciptaModel.value)[i] + ' <- belum diisi')
                error.value[Object.keys(penciptaModel.value)[i]] = true
                
                hasil = false
            }
        }
        return hasil
    }
    //validasi detail ciptaan
    const errorCiptaan = ref({
        judul: false,
        jenis: false,
        subJenis: false,
        sumberDana: false,
        kotaCiptaan: false,
        tanggal: false,
        deskripsi: false,
        biaya: false,
    })
    function validateDetailCiptaan(){
        let hasil = true
        for (let i = 0; i < Object.keys(ciptaanModel.value).length; i++){
            const idObject = Object.keys(ciptaanModel.value)[i]
            if (idObject == 'sertifikat' || idObject == 'catatan' || idObject == 'noAplikasi' || idObject == 'noBilling' || idObject == 'tarifBilling'|| idObject == 'noSertifikat' || idObject == 'tanggalBayar'){
                // console.log("Pengecualian: " + idObject)
            } else if (idObject == 'deskripsi') {
                if (deskripsiValidation.value < 100 && !isAdmin){
                    console.error('Deskripsi minimal 100 kata')
                    errorCiptaan.value['deskripsi'] = true

                    hasil = false
                }
            }else {
                if (ciptaanModel.value[idObject] == '' || ciptaanModel.value[idObject] == null){
                    console.error(Object.keys(ciptaanModel.value)[i] + ' <- belum diisi')
                    errorCiptaan.value[Object.keys(ciptaanModel.value)[i]] = true
                    
                    hasil = false
                }
            }
        }
        return hasil
    }
    const formEdited = computed(()=>{
        if (JSON.stringify(ciptaanStatic) === JSON.stringify(ciptaanModel.value)) {
            console.log('no change')
            return true
        }
    })
    /////Submit Confirmation
    const confirmModal = ref(false)
    function confirmSubmit(){ 
        if (isAdmin || ciptaanModel.value.statusCiptaan != 'Submit ke DJKI'){
            if (validateDetailCiptaan() == false){
                // console.log('validasi sukses')
                showAlert('Ups! Data tidak lengkap', 'Mohon pastikan seluruh data telah terisi dengan benar')
            } else {
                // show confirmation
                confirmModal.value = true
            }
        } else {
            showAlert('Ups! Ciptaan ini tidak bisa diedit', 'Ajuan anda saat ini sedang proses submit ke DJKI')
        }
    }

    // Submit
    function submit(){
        progressModal.value = true
        // ciptaanModel.value['tanggal'] = ciptaanModel.value['tanggal']
        // if (paramsValid == true){
        //     console.log('params valid')
        // } else {
        //     console.log('params no valid')                
        // }
        
        progress.value.value = 10
        progress.value.state = 'upload ktp'
        uploadKTP(ciptaanModel.value['id']).then((statusUpload) => {
            // console.log(statusUpload)
            if(statusUpload == 'selesai'){
                progress.value.value = 50
                progress.value.state = 'upload lampiran'
                uploadLampiran().then((statusUpload2) => {
                    if(statusUpload2 == 'selesai'){
                        progress.value.value = 80
                        progress.value.state = 'data ciptaan'
                        writeUserData().then((statusWrite) => {
                            if(statusWrite == 'selesai'){
                                progress.value.value = 100
                                // console.log(statusWrite)
                            }
                        })
                    }
                })
            }
        })

        // reset error
        errorCiptaan.value = {
            judul: false,
            jenis: false,
            subJenis: false,
            sumberDana: false,
            kota: false,
            tanggal: false,
            deskripsi: false,
            biaya: false
        }
    }

    //////Firebase storage
    // async function uploadKTP(idParent, idPencipta){
    //     if (ciptaanModel.value['pencipta'][idPencipta]['ktp'].includes('base64')){
    //         // console.log('Upload KTP pencipta: ' + idPencipta)
    //         // const storage = getStorage();
    //         const storagePathRef = storageRef(storage, 'ktp/' + idParent + ' - ' + idPencipta)
    //         const file = ciptaanModel.value['pencipta'][idPencipta]['ktp']
    //         let hasilSnapshot
    //         const result = await uploadString(storagePathRef, file, 'data_url').then((snapshot) => {
    //             hasilSnapshot = snapshot
    //             // console.log('1')
    //             return 'sukses'
    //         }).catch((error) => {
    //             console.error(error)
    //         })
    //         const tes = await getDownloadURL(hasilSnapshot.ref).then((url) => {
    //             ciptaanModel.value['pencipta'][idPencipta]['ktp'] = url
    //             // console.log('2')
    //             // return 'sukses'
    //             if (idPencipta == Object.keys(ciptaanModel.value['pencipta']).length - 1){
    //                 return 'selesai'
    //             } else {
    //                 idPencipta++
    //                 return uploadKTP(idParent, idPencipta)
    //             }
    //         })
    //         // console.log('3')
    //         return tes
    //     } else {
    //         // console.log('Skip! KTP pencipta: ' + idPencipta +' sudah terupload')
    //         if (idPencipta == Object.keys(ciptaanModel.value['pencipta']).length - 1){
    //             return 'selesai'
    //         } else {
    //             idPencipta++
    //             return uploadKTP(idParent, idPencipta)
    //         }
    //     }
    // }
    async function uploadKTP(idParent){
    const penciptaKeys = Object.keys(ciptaanModel.value['pencipta']);
    for(let i = 0; i < penciptaKeys.length; i++){
        const idPencipta = penciptaKeys[i];
        const pencipta = ciptaanModel.value['pencipta'][idPencipta];
        if(pencipta['ktp'].includes('base64')){
            console.log('Upload KTP pencipta: ' + idPencipta);
            try{
                const storagePathRef = storageRef(storage, 'ktp/' + idParent + ' - ' + idPencipta);
                const file = pencipta['ktp'];
                const snapshot = await uploadString(storagePathRef, file, 'data_url');
                const url = await getDownloadURL(snapshot.ref);
                ciptaanModel.value['pencipta'][idPencipta]['ktp'] = url;
            } catch (error){
                console.error(error);
            }
        } else {
            console.log('Skip! KTP pencipta: ' + idPencipta +' sudah terupload');
        }
    }
    return 'selesai';
}

    async function uploadLampiran(){
        if (ciptaanModel.value['lampiran'].includes('base64')){
            const storagePathRef = storageRef(storage, 'lampiran/' + ciptaanModel.value['id'] + ' - ' + ciptaanModel.value['id'])
            const file = ciptaanModel.value['lampiran']
            let hasilSnapshot
            const upload = await uploadString(storagePathRef, file, 'data_url').then((snapshot) => {
                hasilSnapshot = snapshot
                // console.log('1')
                return 'sukses'
            }).catch((error) => {
                console.error(error)
            })
            const getUrl = await getDownloadURL(hasilSnapshot.ref).then((url) => {
                ciptaanModel.value['lampiran'] = url
                return 'selesai'
            }).catch((error) => {
                console.error(error)
            })
            return getUrl
        } else {
            return 'selesai'
        }
    }
    
    //////Firebase Database
    //Write Data to firebase
    async function writeUserData() {
        // Get all email pencipta and store to pengusul
        ciptaanModel.value['pencipta'].forEach(element => {
            emailPengusul.value.push(element.email)
            namaPencipta.value.push(element.nama.toLowerCase())
        });
        // WRITE TO FIRESTORE
        try {
            const docRef = setDoc(doc(databaseFirestore, "ciptaan2", ciptaanModel.value['id']), {
                id: ciptaanModel.value['id'],
                judul: ciptaanModel.value['judul'],
                jenis: ciptaanModel.value['jenis'],
                subJenis: ciptaanModel.value['subJenis'],
                sumberDana: ciptaanModel.value['sumberDana'],
                kotaCiptaan: ciptaanModel.value['kotaCiptaan'],
                tanggal: ciptaanModel.value['tanggal'].getTime()*1,
                deskripsi: ciptaanModel.value['deskripsi'],
                pencipta: ciptaanModel.value['pencipta'],
                lampiran: ciptaanModel.value['lampiran'],
                statusCiptaan: ciptaanModel.value['statusCiptaan'] == 'Revisi' && !isAdmin ? 'Verifikasi*' : ciptaanModel.value['statusCiptaan'],
                pengusul: emailPengusul.value,
                biaya: ciptaanModel.value['biaya'],
                catatan: ciptaanModel.value['catatan'] || '',
                sertifikat: ciptaanModel.value['sertifikat']|| '',
                noAplikasi: ciptaanModel.value['noAplikasi'] || '',
                noBilling: ciptaanModel.value['noBilling'] || '',
                tarifBilling: ciptaanModel.value['tarifBilling'] ? parseInt(ciptaanModel.value['tarifBilling']) : '',
                noSertifikat: ciptaanModel.value['noSertifikat'] || '',
                tanggalBayar: ciptaanModel.value['tanggalBayar'] || null,
            });
            if (isAdmin && ciptaanModel.value['statusCiptaan'] == 'Submit ke DJKI'){
                // Only update if ciptaanModel.value['tanggalBayar'] doesn't have a value
                if (!ciptaanModel.value['tanggalBayar']) {
                await updateDoc(doc(databaseFirestore, "ciptaan2", ciptaanModel.value['id']), {
                    tanggalBayar: new Date().getTime(),
                });
                }
            }
            progress.value.value = 85
            // return 'selesai'

            // WRITE TO REALTIME DATABASE
            try {
                set(databaseRef(database, 'ciptaan/' + ciptaanModel.value['id']), {
                    id: ciptaanModel.value['id'],
                    judul: ciptaanModel.value['judul'].toLowerCase() +' ~ '+namaPencipta.value.join(', '),
                    pengusul: ciptaanModel.value['pengusul'].join(', '),
                    statusCiptaan: ciptaanModel.value['statusCiptaan']
                })
                progress.value.value = 100
            } catch (e) {
                console.error("Error 1504: ", e);
                // console.error("Error adding document to RealtimeDB: ", e);
            }
            return 'selesai'
        } catch (e) {
            console.error("Error 1490: ", e);
        }
    }

    function finishSubmit(){
        belumSimpanNoBilling = false
        const router = useRouter()
        const hasHistory = router.options.history.state.back
        if (hasHistory!=null){
            router.back()
            return
        } else{
            navigateTo(urlAftersubmit.value)
        }
    }

    async function copyLog(){
        await navigator.clipboard.writeText(JSON.stringify(ciptaanModel.value, null, "\t"))
    }

    onMounted(() => {
        // Baca query URL
        params = route.params.id
        if (params == undefined){
            showAlert('PENGUMUMAN', `Untuk mempercepat proses verifikasi, mohon mencermati jenis dan syarat lampiran yang diperbolehkan pada laman:`, 'https://sentrahki.um.ac.id/lampiran-hak-cipta')
            // Jika query tidak ditentukan (/tambah)
            emailPengusul.value.push(store.user.email)
            ciptaanModel.value['pengusul'] = emailPengusul.value.toString()
            ciptaanModel.value['id'] = new Date().getTime()+ '-' + Math.random().toString(36).substr(2, 3).toUpperCase()
        } else {
            // Jika query ditentukan (/tambah/*id ciptaan*/) 
            readDatabase()
        }
    })

    let ciptaanStatic
    async function readDatabase(){
        
        // READ FROM FIRESTORE
        const qLimit = query(collection($databaseFirestore, "ciptaan2"), where('id', '==', params))
        const querySnapshot = await getDocs(qLimit)
        
        if(querySnapshot.docs.length>0){
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                if(data.pengusul.includes(store.user.email) || isAdmin){
                    emailPengusul.value.push(data.pengusul[0])
                    ciptaanModel.value = data
                    ciptaanModel.value['tanggal']= new Date (ciptaanModel.value['tanggal'])
                    ciptaanModel.value['statusCiptaan'] = ciptaanModel.value['statusCiptaan'].replace('*', '')
                    ciptaanStatic = JSON.parse(JSON.stringify(ciptaanModel.value))
                } else{
                    // Bukan Pencipta / Pengusul
                    navigateTo('/dashboard')
                    return
                }
            });
        } else{
            console.log("No data available");
            ciptaanModel.value['id'] = new Date().getTime()+ '-' + Math.random().toString(36).substr(2, 3).toUpperCase()
        }

        // READ FROM REALTIME DATABASE
        // get(child(databaseRef(database), 'ciptaan/' + params)).then((snapshot) => {
        // if (snapshot.exists()) {
        //     const data = snapshot.val();
        //     emailPengusul.value.push(data.pengusul[0])
        //     ciptaanModel.value = data
        //     ciptaanModel.value['tanggal']= new Date (ciptaanModel.value['tanggal'])
        //     ciptaanModel.value['statusCiptaan'] = ciptaanModel.value['statusCiptaan'].replace('*', '')
        //     ciptaanStatic = JSON.parse(JSON.stringify(ciptaanModel.value))
        // } else {
        //     console.log("No data available");
        //     ciptaanModel.value['id'] = new Date().getTime()+ '-' + Math.random().toString(36).substr(2, 3).toUpperCase()
        // }
        // }).catch((error) => {
        //     console.error(error);
        // });
    }

    function showAlert(judul, deskripsi, link){
        teksAlert.value.deskripsi = deskripsi
        teksAlert.value.judul = judul
        teksAlert.value.link = link
        alertModal.value = true
    }

 
</script>


<style >
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
</style>
