import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number | string
    query: string
}

const getSearch = async ({ query, page = 1 }: Props) => {
    try {
        const response = await getHttpRequest(requests.requestSearch(query), {
            params: {
                page,
            },
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export { getSearch }
