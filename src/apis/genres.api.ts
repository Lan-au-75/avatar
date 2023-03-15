import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

const getGenres = async () => {
    try {
        const response = await getHttpRequest(requests.requestGenres)

        return response
    } catch (error) {
        console.log(error)
    }
}

export { getGenres }
