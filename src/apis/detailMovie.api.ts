import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

const getDetailMovie = async (id: number, category: string) => {
    try {
        const response = await getHttpRequest(requests.requestDetail(id, category))

        return response
    } catch (error) {
        console.log(error)
    }
}

export { getDetailMovie }
