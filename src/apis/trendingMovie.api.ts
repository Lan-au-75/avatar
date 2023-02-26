import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number | string
}

const getTrendingMovie = async ({ page = 1 }: Props = {}) => {
    try {
        const response = await getHttpRequest(requests.requestTrending, {
            params: {
                page,
            },
        })

        return response.results
    } catch (error) {
        console.log(error)
    }
}

export { getTrendingMovie }
