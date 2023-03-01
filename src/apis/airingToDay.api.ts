import requests from '@/requests'
import { getHttpRequest } from '@/utils/httpRequets'

interface Props {
    page?: number | string
}

const getAiringToDay = async ({ page = 1 }: Props = {}) => {
    try {
        const response = await getHttpRequest(requests.requestAiringToDay, {
            params: {
                page,
            },
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export { getAiringToDay }
