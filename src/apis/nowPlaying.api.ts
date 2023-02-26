import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number | string
}

const getNowPlaying = async ({ page = 1 }: Props = {}) => {
    try {
        const response = await getHttpRequest(requests.requestNowPlaying, {
            params: {
                page,
            },
        })

        return response.results
    } catch (error) {
        console.log(error)
    }
}

export { getNowPlaying }
