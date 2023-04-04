import { ListUser, FormState, DetailUser } from '@/types/users.type'
import axios from 'axios'
import { getSearchAPI } from './searchAPI'

interface Props {
    page: string
    result: ListUser[]
    total_pages: number
    total_results: number
}

const getAllUser = async (page: number) => {
    const res = await axios.get<Props>(`${import.meta.env.VITE_SERVER_AVATAR_API}?page=${page}`)

    return res.data
}

const getQuery = async (debounce: string, page: number) => {
    if (!debounce.trim()) {
        return
    }

    const res: Props = await getSearchAPI({ query: debounce, page })
    return res.result
}

// CRUD

const detailUser = async (id: string) => {
    const res = await axios.get<DetailUser>(`${import.meta.env.VITE_SERVER_AVATAR_API}/${id}`)
    return res.data
}

const createUser = (newTodo: FormState) => {
    return axios.post(`${import.meta.env.VITE_SERVER_AVATAR_API}`, newTodo)
}

const updateUser = async (id: string | number, data: DetailUser | FormState) => {
    return await axios.put(`${import.meta.env.VITE_SERVER_AVATAR_API}/${id}`, data)
}

const deleteUser = (id: number | string) => {
    return axios.delete<{}>(`${import.meta.env.VITE_SERVER_AVATAR_API}/${id}`)
}

export { getAllUser, getQuery, detailUser, createUser, updateUser, deleteUser }
