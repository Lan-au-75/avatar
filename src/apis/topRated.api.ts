import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    category: string
    page?: number | string
}

const getTopRated = async ({ category, page = 1 }: Props) => {
    try {
        const response = await getHttpRequest(requests.requestTopRated(category), {
            params: {
                page,
            },
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export { getTopRated }
