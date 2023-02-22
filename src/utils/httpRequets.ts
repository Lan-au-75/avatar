import axios from 'axios'

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
})

export default httpRequest
