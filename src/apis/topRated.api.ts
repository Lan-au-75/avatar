import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number | string
}

const getTopRated = async ({ page = 1 }: Props = {}) => {
    try {
        const response = await getHttpRequest(requests.requestTopRated, {
            params: {
                page,
            },
        })

        return response.results
    } catch (error) {
        console.log(error)
    }
}

export { getTopRated }
