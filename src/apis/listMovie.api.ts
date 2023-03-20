import { FormState, ListMovie } from '@/types/mockapi.type'
import axios from 'axios'

const getMovies = async () => {
    const res = await axios.get<ListMovie[]>('http://localhost:3000/movies')
    return res.data
}

// CRUD

const getMovie = async (id: string) => {
    const res = await axios.get<ListMovie>(`http://localhost:3000/movies/${id}`)
    return res.data
}

const addMovie = (newTodo: FormState) => {
    return axios.post('http://localhost:3000/movies', newTodo)
}

const updateMovie = async (id: string | number, data: ListMovie | FormState) => {
    return await axios.put(`http://localhost:3000/movies/${id}`, data)
}

const deleteMovie = (id: number) => {
    return axios.delete<{}>(`http://localhost:3000/movies/${id}`)
}

export { getMovies, addMovie, getMovie, updateMovie, deleteMovie }
