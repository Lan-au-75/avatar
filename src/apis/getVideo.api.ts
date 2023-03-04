import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

const getVideo = async (id: number, category: string) => {
    try {
        const response = await getHttpRequest(requests.requestGetVideo(id, category))

        return response.results
    } catch (error) {
        console.log(error)
    }
}

export { getVideo }
