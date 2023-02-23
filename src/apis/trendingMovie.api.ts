import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number
}

const getTrendingMovie = async ({ page }: Props) => {
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
