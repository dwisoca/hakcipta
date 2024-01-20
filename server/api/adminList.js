// import CryptoJS from 'crypto-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const data = config.ADMIN_LIST_SERVER
    // console.log('data from api admin: ', event)
    // const body = await readBody(event)
    // console.log('body', body.domain)

    // const encrypt = await CryptoJS.AES.encrypt(data, '#Makan1tanaman')
    // const decrypt = await CryptoJS.AES.decrypt(encrypt, '#Makan1tanaman')
    // console.log('hasil encrypt', encrypt.toString())
    // console.log('hasil decrypt', decrypt.toString(CryptoJS.enc.Utf8))

    return data
    // return data
})