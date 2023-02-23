import axios from 'axios'

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

const getHttpRequest = async (path: string, option: object = {}) => {
    const response = await httpRequest.get(path, option)
    return response.data
}

export { getHttpRequest }

export default httpRequest
