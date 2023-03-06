import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

const getReview = async (id: number, category: string) => {
    try {
        const response = await getHttpRequest(requests.requestReview(id, category))

        return response.results
    } catch (error) {
        console.log(error)
    }
}

export { getReview }
