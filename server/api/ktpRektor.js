export default defineEventHandler(async (event) => { 
    const config = useRuntimeConfig()

    const data = config.KTP_REKTOR_SERVER
    // console.log('data from api rektor: ', data)
    const body = await readBody(event)
    // console.log('body', body.domain)
    if (body.domain == 'hakciptav2.vercel.app') {
        return data
    }
})