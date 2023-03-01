import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    category: string
    page?: number | string
}

const getTrendingMovie = async ({ category, page = 1 }: Props) => {
    try {
        const response = await getHttpRequest(requests.requestTrending(category), {
            params: {
                page,
            },
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export { getTrendingMovie }
