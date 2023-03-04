import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

const getReview = async (id: number) => {
    try {
        const response = await getHttpRequest(requests.requestReview(id))

        return response.results
    } catch (error) {
        console.log(error)
    }
}

export { getReview }
