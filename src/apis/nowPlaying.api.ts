import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number
}

const getNowPlaying = async ({ page }: Props) => {
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
